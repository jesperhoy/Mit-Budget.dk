using System.Net.Http;
using System.Reflection;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Microsoft.Extensions.Hosting;

public static class FrackStatic {

  public abstract class Component {
    public HttpContext Context;
    public abstract void Render(System.IO.TextWriter w);
    public virtual void Load() {
    }

    public Task RenderAsPage(HttpContext ctx) {
      ctx.Response.ContentType = "text/html; charset=utf-8";
      ctx.Response.Headers.CacheControl = "no-cache";
      Context = ctx;
      Load();
      var w = new System.IO.StringWriter();
      Render(w);
      return ctx.Response.WriteAsync(w.ToString());
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
