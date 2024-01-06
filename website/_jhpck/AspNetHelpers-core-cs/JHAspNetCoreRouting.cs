using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Hosting;

public static class JHAspNetCoreRouting {

  public static void UseDomainRedirection(this WebApplication app, string domain, bool https = true) {
    domain = domain.ToLowerInvariant();
    var idn = (new System.Globalization.IdnMapping()).GetAscii(domain);
    if (idn == domain) {
      idn = null;
    }
    app.Use((RequestDelegate nxt) => (HttpContext ctx) => {
      var rDom = ctx.Request.Host.Host.ToLower();
      if (ctx.Request.IsHttps != https || (rDom != domain && (idn == null || rDom != idn))) {
        ctx.Response.Redirect((https ? "https://" : "http://") + domain + ctx.Request.GetEncodedPathAndQuery());
        return System.Threading.Tasks.Task.CompletedTask;
      }
      return nxt.Invoke(ctx);
    });
  }

  public static void MapRedir(this WebApplication app, string pattern, string redirTo) {
    app.Map(pattern, (HttpContext ctx) =>
    {
      ctx.Response.Redirect(redirTo);
      return Task.CompletedTask;
    });
  }

}
