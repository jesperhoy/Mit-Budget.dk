using System.Reflection;

public static class FrackStatic {

  public interface IRenderable {
    Task Render(HttpContext ctx, TextWriter w);
  }
  public static async Task RenderAsPage(this IRenderable r, HttpContext ctx) {
    ctx.Response.ContentType = "text/html; charset=utf-8";
    ctx.Response.Headers.CacheControl = "no-cache";
    System.IO.StringWriter w = new System.IO.StringWriter();
    await r.Render(ctx, w);
    if (w.GetStringBuilder().Length > 0) await ctx.Response.WriteAsync(w.ToString());
  }

  public static Task Render(HttpContext ctx, System.IO.TextWriter w, object renderObj) {
    if (renderObj is IRenderable) {
      return ((IRenderable)renderObj).Render(ctx, w);
    } else {
      w.Write(HtmlEncode(renderObj.ToString()));
      return Task.CompletedTask;
    }
  }

  public static string MakeAttr(string name, object value) {
    return value == null ? "" : (value is bool ? ((bool)value ? " " + name : "") : " " + name + "=\"" + HtmlEncode(value) + "\"");
  }

  public static string HtmlEncode(object v) {
    return v.ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;");
  }

  public static void ForEach<T>(IEnumerable<T> col, Action<T, int> a) {
    int i = 0;
    foreach (var itm in col) a.Invoke(itm, i++);
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

  public static void MapFrackPage<T>(this WebApplication app, string pattern, IEnumerable<string> methods = null) where T : IRenderable, new() {
    app.MapMethods(pattern, methods ?? ["GET"], ctx => (new T()).RenderAsPage(ctx));
  }

  public static void UseFrackStatic(this WebApplication app, Assembly assembly = null) {
    if (assembly == null) assembly = Assembly.GetCallingAssembly();
    FrackStatic.Route rt;
    ConstructorInfo cinfo;
    foreach (var tp in assembly.GetTypes()) {
      rt = (FrackStatic.Route)tp.GetCustomAttribute(typeof(FrackStatic.Route));
      if (rt == null) continue;
      cinfo = tp.GetConstructor(Type.EmptyTypes);
      if (cinfo == null) continue;
      foreach (var ptrn in rt.Patterns) {
        UseFrackStatic2(app, ptrn, rt.Methods, cinfo);
      }
    }
  }
  private static void UseFrackStatic2(WebApplication app, string pattern, string[] methods, ConstructorInfo cinfo) {
    app.MapMethods(pattern, methods, (HttpContext ctx) => ((IRenderable)cinfo.Invoke([])).RenderAsPage(ctx));
  }

}
