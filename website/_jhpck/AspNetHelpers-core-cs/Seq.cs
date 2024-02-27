using Microsoft.AspNetCore.Http.Extensions;

public static class Seq {

  private const string EventPostUrl = "http://seq.jhsw.dk:5341/api/events/raw";

  public enum Level {
    Trace = 0, Debug = 1, Information = 2, Warning = 3, Error = 4, Fatal = 5
  }
  private static string[] LevelStr = { "Trace", "Debug", "Information", "Warning", "Error", "Fatal" };

  private static string AppID = null;
  private static bool DevEnv;

  private static LeakyBucket LBck = new LeakyBucket(5, new TimeSpan(0, 10, 0)); // max 5 pr. 10 min = max 30 pr hour
  private static int LBSkipped = 0;

  public static void UseSeq(this WebApplication app, string appID) {
    if (string.IsNullOrEmpty(appID)) throw new Exception("Invalid AppID");
    AppID=appID;
    DevEnv = app.Environment.IsDevelopment();

    //Catch errors in secondary threads
    AppDomain.CurrentDomain.UnhandledException += AppUnhandled;

    app.Use(async (ctx, nxt) => {
      try {
        await nxt.Invoke(ctx);
      } catch (Exception ex) {

        if (!LBck.AddDrop()) {
          LBSkipped += 1;
          return;
        }
        var url = (ctx.Request.IsHttps ? "https://" : "http://") + ctx.Request.Host.ToString() + ctx.Request.GetEncodedPathAndQuery();
        await LogError(ex, ctx, "Server error in " + url,("lb_skipped",LBSkipped));
        LBSkipped = 0;
        try {
          ctx.Response.StatusCode = 500;
          await ctx.Response.WriteAsync("Server error! The proper authorities have been alerted, and we will try to get this fixed ASAP!");
        } catch {}
        throw;
      }
    });
  }

  public static Task LogTrace(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Trace, tmpl, null, null, args);
  public static Task LogTrace(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Trace, tmpl,ctx, null, args);

  public static Task LogDebug(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Debug, tmpl, null, null, args);
  public static Task LogDebug(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Debug, tmpl, ctx, null, args);

  public static Task LogInfo(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Information, tmpl, null, null, args);
  public static Task LogInfo(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Information, tmpl, ctx, null, args);

  public static Task LogWarning(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Warning, tmpl, null, null, args);
  public static Task LogWarning(Exception ex, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Warning, tmpl, null, ex, args);
  public static Task LogWarning(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Warning, tmpl,ctx, null, args);
  public static Task LogWarning(Exception ex, HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Warning, tmpl, ctx, ex, args);

  public static Task LogError(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Error, tmpl, null, null, args);
  public static Task LogError(Exception ex, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Error, tmpl, null, ex, args);
  public static Task LogError(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Error, tmpl, ctx, null, args);
  public static Task LogError(Exception ex, HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Error, tmpl, ctx, ex, args);

  public static Task LogFatal(string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Fatal, tmpl, null, null, args);
  public static Task LogFatal(Exception ex, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Fatal, tmpl, null, ex, args);
  public static Task LogFatal(HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Fatal, tmpl, ctx, null, args);
  public static Task LogFatal(Exception ex, HttpContext ctx, string tmpl, params (string, JhJson.BaseValue)[] args) => LogX(Level.Fatal, tmpl, ctx, ex, args);

  private static Task LogX(Level lvl, string tmpl, HttpContext ctx, Exception ex, params (string, JhJson.BaseValue)[] args) {
    var msg = MakeMsg(lvl, tmpl);
    foreach ((string name, object value) kv in args) {
      msg.Add(kv.name, (JhJson.BaseValue)kv.value);
    }
    if (ex != null) AddException(msg, ex);
    if (ctx !=null) AddHttpRequest(msg, ctx);

    var c = new System.Net.Http.HttpClient();
    c.DefaultRequestHeaders.Accept.Clear();
    c.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    var ct = new System.Net.Http.StringContent(msg.EncodeJson(false));
    ct.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.serilog.clef");
    return c.PostAsync(EventPostUrl, ct);
  }

  private static JhJson.Object MakeMsg(Level lvl, string tmpl) {
    var rv = new JhJson.Object();
    rv.Add("@t", DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.sssZ"));
    rv.Add("@l", LevelStr[(int)lvl]);
    rv.Add("@mt", tmpl);
    rv.Add("Environment", DevEnv ? "Development" : "Production");
    rv.Add("Application", AppID);
    return rv;
  }

  private static void AddHttpRequest(JhJson.Object msg, HttpContext ctx) {
    msg.Add("http_from_ip", ctx.Connection.RemoteIpAddress.ToString());
    msg.Add("http_method", ctx.Request.Method);
    msg.Add("http_url", (ctx.Request.IsHttps ? "https://" : "http://") + ctx.Request.Host.ToString() + ctx.Request.GetEncodedPathAndQuery());

    string Hdrs = "";
    foreach (string k in ctx.Request.Headers.Keys) {
      Hdrs += k + ": " + ctx.Request.Headers[k].Aggregate("", (s1, s2) => s1 + (s1.Length > 0 ? "," : "") + s2) + "\n";
    }
    msg.Add("http_headers", Hdrs);

    if (ctx.Request.Method == "POST" && ctx.Request.Form.Count > 0) {
      string Post = "";
      foreach (string k in ctx.Request.Form.Keys) {
        Post += k + ": " + ctx.Request.Form[k].Aggregate("", (s1, s2) => s1 + (s1.Length > 0 ? "," : "") + s2) + "\n";
        var x = ctx.Request.Form[k];
      }
      msg.Add("http_post", Post);
    }
  }

  private static void AddException(JhJson.Object msg, Exception ex) {
    msg.Add("@x", UnwrapException(ex));
  }

  private static string UnwrapException(Exception ex, string title = null) {
    var sb = new System.Text.StringBuilder();
    if (!string.IsNullOrEmpty(title)) sb.AppendLine("--- " + title + ": ---");
    sb.AppendLine("Message: " + ex.Message);
    sb.AppendLine("Source: " + ex.Source);
    sb.AppendLine("Type: " + ex.GetType().ToString());
    sb.AppendLine("Stack Trace:");
    sb.AppendLine(ex.StackTrace);
    if (ex is AggregateException) {
      var ct = 0;
      foreach (var inEx in ((AggregateException)ex).InnerExceptions) {
        ct += 1;
        sb.AppendLine();
        sb.Append(UnwrapException(inEx, "Aggregate inner exception (" + ct + ")"));
      }
    } else {
      if (ex.InnerException != null) {
        sb.AppendLine();
        sb.Append(UnwrapException(ex.InnerException, "Inner exception"));
      }
    }

    return sb.ToString();
  }

  private static void AppUnhandled(object sender, UnhandledExceptionEventArgs args) {
    ExecSync(() => {
      var x = ("terminating", args.IsTerminating);
      if (args.ExceptionObject == null) {
        return LogFatal("Unhandled exception in AppDomain (ExceptionObject = null)", x);
      } else if (args.ExceptionObject is Exception) {
        return LogFatal((Exception)args.ExceptionObject, "Unhandled exception in AppDomain", x);
      } else {
        return LogFatal("Unhandled exception in AppDomain (" + args.ExceptionObject.ToString() + ")", x);
      }
    });
  }

  private static void ExecSync(Func<System.Threading.Tasks.Task> f) {
    var MRE = new System.Threading.ManualResetEvent(false);
    Exception EX = null;
    var t = System.Threading.ThreadPool.QueueUserWorkItem(async dummy => {
      try {
        await f.Invoke();
      } catch (Exception ex2) {
        EX = ex2;
      }
      MRE.Set();
    });
    MRE.WaitOne();
    if (EX != null) throw EX;
  }
}
