//** ErrorHandler_Core - v. 1.2 **

using System.Runtime.CompilerServices;
using System.Text;
using System.Xml.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

public static class JHErrorHandler {

  private static LeakyBucket LB = new LeakyBucket(3, new TimeSpan(0, 5, 0));

  public static void UseJHErrorHandler(this WebApplication app, string wsName) {
    app.Use(nxt => async ctx => {
      try {
        await nxt.Invoke(ctx);
      } catch (Exception ex) {
        ReportError(ex, ctx, wsName);
        try {
          ctx.Response.StatusCode = 500;
          await ctx.Response.WriteAsync("Server error! The proper authorities have been alerted, and we will try to get this fixed ASAP!");
        } catch {
        }
        throw;
      }
    });
  }

  public static void ReportError(Exception ex, HttpContext ctx, string wsName) {
    if (!LB.AddDrop()) return;
    string r;
    try {
      r= MakeReport(ctx, ex);
    } catch (Exception ex2) {
      r="** Error generating error report: " + ex2.Message; 
    }
    try {
      JHEmail.SendEmail("system@jhsoftware.dk", "admin@jhsoftware.dk", "Web-site Error - " + wsName, r);
    } catch (Exception) {
    }
  }

  private static string MakeReport(HttpContext ctx, Exception ex) {
    StringBuilder sb = new StringBuilder();
    if (ctx != null) {
      sb.AppendLine("Client IP: " + ctx.Connection.RemoteIpAddress.ToString());
      sb.AppendLine("Method: " + ctx.Request.Method);
      sb.AppendLine("URL: " + (ctx.Request.IsHttps ? "https://" : "http://") + ctx.Request.Host.ToString() + ctx.Request.GetEncodedPathAndQuery());
      sb.AppendLine("-- Request headers: --");
      foreach (var h in ctx.Request.Headers) {
        sb.AppendLine(h.Key + ": " + h.Value.ToString());
      }
      sb.AppendLine();

      if (ctx.Request.HasFormContentType && ctx.Request.Form.Count > 0) {
        sb.AppendLine("-- Form data: --");
        foreach(string key in ctx.Request.Form.Keys) {
          sb.AppendLine(key + ": " + ctx.Request.Form[key].ToString());
        }
        sb.AppendLine();
      }
    }

    //   If TypeOf ex Is System.Web.HttpUnhandledException AndAlso ex.InnerException IsNot Nothing Then ex = ex.InnerException

    while (ex != null) {
      sb.AppendLine("Error message: " + ex.Message);
      sb.AppendLine("Exception Source: " + ex.Source);
      sb.AppendLine("Exception type: " + ex.GetType().ToString());
      sb.AppendLine("-- Stack Trace: --");
      sb.AppendLine(ex.StackTrace);
      sb.AppendLine();
      ex = ex.InnerException;
      if (ex != null) {
        sb.AppendLine("-- Inner exception: --");
        sb.AppendLine();
      }
    }

    return sb.ToString();
  }

}
