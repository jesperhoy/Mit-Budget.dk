using System;

//** Plausible - v. 1.2 **

// Put this in <head>:
//    <script defer data-domain="domain.com" data-api="/pl/event" src="/pl/script"></script>

using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

public static class Plausible {

  public static void UsePlausible(this WebApplication app) {
    //------------- Plausible.io proxy ------------------
    string PlScript = null;
    DateTime PlScriptTime = default(DateTime);

    app.MapGet("pl/script", (HttpContext ctx) =>
    {
      if (PlScript == null || PlScriptTime < DateTime.UtcNow.AddHours(-1)) {
        System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
        var wc = new System.Net.WebClient();
        PlScript = wc.DownloadString("https://plausible.io/js/script.js");
        PlScriptTime = DateTime.UtcNow;
      }
      ctx.Response.ContentType = "application/javascript";
      return PlScript;
    });

    app.MapPost("pl/event", async (HttpContext ctx) =>
    {
      System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
      System.IO.MemoryStream MemStrm = new System.IO.MemoryStream((int)ctx.Request.ContentLength);
      await ctx.Request.Body.CopyToAsync(MemStrm);
      var wc = new System.Net.WebClient();
      wc.Headers.Add("Content-Type", ctx.Request.Headers["Content-Type"]);
      wc.Headers.Add("User-Agent", ctx.Request.Headers["User-Agent"]);
      wc.Headers.Add("X-Forwarded-For", ctx.Connection.RemoteIpAddress.ToString());
      var RespBA = wc.UploadData("https://plausible.io/api/event", "POST", MemStrm.ToArray());
      ctx.Response.ContentType = wc.ResponseHeaders["Content-Type"];
      await ctx.Response.Body.WriteAsync(RespBA);
    });

  }

}
