public static class JAH {

  public static WebApplication App;

  async public static Task<string> BodyAsString(this HttpRequest req) {
    var len = (int)req.ContentLength;
    byte[] buf = new byte[len];
    int p = 0, rl;
    while(p<len) {
      rl=await req.Body.ReadAsync(buf, p, len-p);
      if (rl == 0) throw new Exception("Request body shorter then Content-Length");
      p += rl;
    };
    return System.Text.Encoding.UTF8.GetString(buf);
  }

  public static string MD5EncodeHex(byte[] buffer) {
    var md5=System.Security.Cryptography.MD5.Create();
    var hash = md5.ComputeHash(buffer);
    return System.Convert.ToHexString(hash);
  }
  public static string MD5EncodeHex(string s) {
    return MD5EncodeHex(System.Text.Encoding.UTF8.GetBytes(s));
  }

  public static string SHA256EncodeHex(byte[] buffer) {
    var sha=System.Security.Cryptography.SHA256.Create();
    var hash = sha.ComputeHash(buffer);
    return System.Convert.ToHexString(hash);
  }
  public static string SHA256EncodeHex(string s) {
    return SHA256EncodeHex(System.Text.Encoding.UTF8.GetBytes(s));
  }


  private static Dictionary<string, string> StaticFileHash_FileDict = new Dictionary<string, string>();
  private static System.IO.FileSystemWatcher StaticFileHash_FSW;

  public static string StaticFileHash(string path) {
    if (App == null) throw new Exception("JAH.App has not been set");
    if (path.IndexOf("?") >= 0) throw new Exception("Path cannot include query (?)");
    if (path.IndexOf("//") >= 0) throw new Exception("Path cannot include protocol (//)");
    if (!path.StartsWith("/")) path = "/" + path;

    lock (StaticFileHash_FileDict) {
      if (StaticFileHash_FSW == null) {
        StaticFileHash_FSW = new System.IO.FileSystemWatcher(App.Environment.WebRootPath) {
          NotifyFilter = System.IO.NotifyFilters.LastWrite,
          IncludeSubdirectories = true,
          EnableRaisingEvents = true
        };
        StaticFileHash_FSW.Changed += (sender, e) =>
        {
          lock (StaticFileHash_FileDict) {
            StaticFileHash_FileDict.Remove(e.FullPath.ToLower());
          }
        };
      }
      
      var f = App.Environment.WebRootPath + (path.Replace("/", "\\"));
      var flc = f.ToLower();
      string hash = null;
      if (!StaticFileHash_FileDict.TryGetValue(flc, out hash)) {
        hash = MD5EncodeHex(System.IO.File.ReadAllBytes(f)).ToLower();
        StaticFileHash_FileDict.Add(flc, hash);
      }
      return path + "?" + hash;
    }
  }
}
