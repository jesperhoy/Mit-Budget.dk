public static class MitBudgetAPI {

  //Limit access to 1440 API requests / day / ip address = 1 every minute
  //with a burst rate of 25 requests
  public static LeakyBuckets RateLimit = new LeakyBuckets(25, new TimeSpan(0, 1, 0));

  async public static Task ProcReq(HttpContext ctx) {
    if (!RateLimit.AddDrop(ctx.Connection.RemoteIpAddress.ToString())) {
      ctx.Response.StatusCode = 429; //Too Many Requests
      return;
    }

    Guid id = new Guid();
    if (ctx.Request.Method == "POST") {
      var x =await ctx.Request.BodyAsString();
      if (!VerifyUpload(x)) {
        ctx.Response.StatusCode = 400;
        return;
      }
      id = Guid.NewGuid();
      Storage.Add(id, x);
      ctx.Response.StatusCode = 201; // created
      ctx.Response.Headers.Add("Location", "/" + id.ToString().Replace("-", ""));
      return;
    }
    const string s = "/api/budget/";
    var pq = ctx.Request.Path.ToString();
    if (!Guid.TryParse(pq.Substring(s.Length), out id)) {
      ctx.Response.StatusCode = 404;
      return;
    }
    switch (ctx.Request.Method) {
      case "GET": {
          var x = Storage.Fetch(id);
          if (x == null) {
            ctx.Response.StatusCode = 404;
            return;
          }
          ctx.Response.ContentType = "application/json";
          await ctx.Response.WriteAsync(x);
          break;

        }
      case "PUT": {
          var x = await ctx.Request.BodyAsString();
          if (!VerifyUpload(x)) {
            ctx.Response.StatusCode = 400;
            return;
          }
          if (Storage.Update(id, x)) {
            ctx.Response.StatusCode = 204; // ok - no content
          } else {
            ctx.Response.StatusCode = 404; // not found
          }
          break;

        }
      case "DELETE": {
          if (Storage.Delete(id)) {
            ctx.Response.StatusCode = 204; // ok - no content
          } else {
            ctx.Response.StatusCode = 404; // not found
          }
          break;

        }
      default: {
          ctx.Response.StatusCode = 405; // method not allowed
          break;
        }
    }
  }

  private static bool VerifyUpload(string x) {
    var o = (JhJson.Object)JhJson.Parse(x);
    var ma = new[] { "navn", "startmåned", "startsaldo", "items", "nextid" };
    if (o.Members.Count != ma.Count()) {
      return false;
    }
    foreach (var kv in o.Members) {
      if (!ma.Contains(kv.Key)) {
        return false;
      }
      if (kv.Key != "items" && (kv.Value is JhJson.Object || kv.Value is JhJson.Array)) {
        return false;
      }
    }
    ma = new[] { "id", "udgift", "beskriv", "variabelt", "fastbeløb", "varbeløb", "hyppighed", "betalingsmåneder", "start", "harslut", "slut" };
    var Items = o.GetArray("items");
    if (Items.Count > 250) {
      return false;
    }
    foreach (JhJson.Object itm in Items) {
      if (itm.Members.Count != ma.Count()) {
        return false;
      }
      foreach (var kv in itm.Members) {
        if (!ma.Contains(kv.Key)) {
          return false;
        }
        if (kv.Key == "varbeløb" || kv.Key == "betalingsmåneder") {
          if (!(kv.Value is JhJson.Array)) {
            return false;
          }
          if (((JhJson.Array)kv.Value).Count != 12) {
            return false;
          }
          foreach (var itm2 in (JhJson.Array)kv.Value) {
            if (itm2 is JhJson.Object || itm2 is JhJson.Array) {
              return false;
            }
          }
        } else {
          if (kv.Value is JhJson.Object || kv.Value is JhJson.Array) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
