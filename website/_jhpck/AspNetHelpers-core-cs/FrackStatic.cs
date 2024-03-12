using System.Reflection;

public static class FrackStatic {

  public abstract class Component {
    public HttpContext Context;

    protected virtual Task RenderHtml(System.IO.TextWriter w) { 
      return Task.CompletedTask;
    }
    public virtual Task Render(TextWriter w) {
      return RenderHtml(w);
    }

    async public Task RenderAsPage(HttpContext ctx) {
      ctx.Response.ContentType = "text/html; charset=utf-8";
      ctx.Response.Headers.CacheControl = "no-cache";
      Context = ctx;
      System.IO.StringWriter w = new System.IO.StringWriter();
      await Render(w);
      if (w.GetStringBuilder().Length > 0) {
        await ctx.Response.WriteAsync(w.ToString());
      }
    }

    protected string MakeAttr(string name, object value) {
      return value == null ? "" : (value is bool ? ((bool)value ? " " + name : "") : " " + name + "=\"" + he(value) + "\"");
    }

    protected string he(object v) {
      return v.ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;");
    }

    protected void MyForEach<T>(IEnumerable<T> col, Action<T, int> a) {
      int i = 0;
      foreach (var itm in col) a.Invoke(itm, i++);
    }

  }

  public class Route : Attribute {
    public string[] Patterns;
    public string[] Methods;
    public Route(string[] patterns, string[] methods) {
      this.Patterns = patterns;
      this.Methods = methods;
    }
    public Route(string[] patterns) : this(patterns, new[] { "GET" }) {
    }
    public Route(string pattern) : this(new[] { pattern }) {
    }
  }

  public static void MapFrackPage<T>(this WebApplication app, string pattern, IEnumerable<string> methods = null) where T : FrackStatic.Component, new() {
    UseFrackStatic3(app, pattern, methods ?? new[] { "GET", "POST" }, () => new T());
  }

  public static void UseFrackStatic(this WebApplication app, Assembly assembly = null) {
    if (assembly == null) {
      assembly = Assembly.GetCallingAssembly();
    }
    Func<FrackStatic.Component> MakePage = null;
    foreach (var tp in assembly.GetTypes()) {
      if (tp.IsSubclassOf(typeof(FrackStatic.Component))) {
        var rt = (FrackStatic.Route)tp.GetCustomAttribute(typeof(FrackStatic.Route));
        if (rt == null) {
          continue;
        }
        MakePage = UseFrackStatic2(tp);
        foreach (var ptrn in rt.Patterns) {
          UseFrackStatic3(app, ptrn, rt.Methods, MakePage);
        }
      }
    }
  }

  private static Func<FrackStatic.Component> UseFrackStatic2(Type tp) {
    var CInfo = tp.GetConstructor(Type.EmptyTypes);
    return () => (FrackStatic.Component)CInfo.Invoke(null);
  }

  private static void UseFrackStatic3(WebApplication app, string pattern, IEnumerable<string> methods, Func<FrackStatic.Component> makePage) {
    app.MapMethods(pattern, methods, (HttpContext ctx) =>
    {
      return makePage.Invoke().RenderAsPage(ctx);
    });
  }
}
