#if NET 
using Microsoft.AspNetCore.StaticFiles;
#endif
using System;
using System.Collections.Generic;

//** Opbevar client - v. 1.0 **

using System.Web;

public class OpbevarBucket {

  private readonly string ApiUrl;
  private readonly string ApiToken;
  private readonly string BucketID;

  public OpbevarBucket(string bucketID) {
    this.BucketID = bucketID;
    ApiToken = JHSharedConfig.Get("opbevar", "token");
    var ServerID = JHSharedConfig.Get("opbevar", "SRV-" + bucketID);
    ApiUrl = JHSharedConfig.Get("opbevar", "URL-" + ServerID);
    if (!this.ApiUrl.EndsWith("/")) {
      this.ApiUrl += "/";
    }
  }

  public OpbevarBucket(string apiUrl, string token, string bucketID) {
    this.ApiUrl = apiUrl;
    if (!this.ApiUrl.EndsWith("/")) {
      this.ApiUrl += "/";
    }
    this.ApiToken = token;
    this.BucketID = bucketID;
  }

  public byte[] GetFile(string path) {
    string tempVar = "";
    return GetFile(path, ref tempVar);
  }

  //INSTANT C# NOTE: Overloaded method(s) are created above to convert the following method having optional parameters:
  //ORIGINAL LINE: Public Function GetFile(path As String, Optional ByRef mimeType As String = "") As Byte()
  public byte[] GetFile(string path, ref string mimeType) {
    byte[] ba = null;
    var wc = new System.Net.WebClient();
    wc.Headers.Add("Authorization", "Bearer " + ApiToken);
    try {
      ba = wc.DownloadData(ApiUrl + "getfile?sid=" + BucketID + "&path=" + HttpUtility.UrlEncode(path));
    } catch (System.Net.WebException ex) {
      ProcWebException(wc, ex);
    }
    mimeType = wc.ResponseHeaders["content-type"];
    wc.Dispose();
    return ba;
  }

  public System.IO.Stream GetFileStream(string path) {
    string tempVar = "";
    return GetFileStream(path, ref tempVar);
  }

  //INSTANT C# NOTE: Overloaded method(s) are created above to convert the following method having optional parameters:
  //ORIGINAL LINE: Public Function GetFileStream(path As String, Optional ByRef mimeType As String = "") As IO.Stream
  public System.IO.Stream GetFileStream(string path, ref string mimeType) {
    System.IO.Stream strm = null;
    var wc = new System.Net.WebClient();
    wc.Headers.Add("Authorization", "Bearer " + ApiToken);
    try {
      strm = wc.OpenRead(ApiUrl + "getfile?sid=" + BucketID + "&path=" + HttpUtility.UrlEncode(path));
    } catch (System.Net.WebException ex) {
      ProcWebException(wc, ex);
    }
    mimeType = wc.ResponseHeaders["content-type"];
    return strm;
  }

  public void UploadFile(string path, string contentType, byte[] data) {
    var wc = new System.Net.WebClient();
    wc.Headers.Add("Authorization", "Bearer " + ApiToken);
    wc.Headers.Add("Content-Type", contentType);
    try {
      wc.UploadData(ApiUrl + "uploadfile?sid=" + BucketID + "&path=" + HttpUtility.UrlEncode(path), data);
    } catch (System.Net.WebException ex) {
      ProcWebException(wc, ex);
    }
    wc.Dispose();
  }

  public void UploadFile(string path, byte[] data) {
#if NET 
    var MimeType = path.ToLower().EndsWith(".webp") ? "image/webp" : ((new FileExtensionContentTypeProvider()).TryGetContentType(path, out var rv) ? rv : "application/octet-stream");
#else
    var MimeType = path.ToLower().EndsWith(".webp") ? "image/webp" : System.Web.MimeMapping.GetMimeMapping(path);
#endif
    UploadFile(path, MimeType, data);
  }

  public void UploadFile(string path, string contentType, System.IO.Stream strm, bool close) {
    var ms = new System.IO.MemoryStream();
    strm.CopyTo(ms);
    UploadFile(path, contentType, ms.ToArray());
    if (close) {
      strm.Close();
    }
  }

  public void UploadFile(string path, System.IO.Stream strm, bool close) {
    var ms = new System.IO.MemoryStream();
    strm.CopyTo(ms);
    UploadFile(path, ms.ToArray());
    if (close) {
      strm.Close();
    }
  }

  public void DeleteFile(string path) {
    var wc = new System.Net.WebClient();
    wc.Headers.Add("Authorization", "Bearer " + ApiToken);
    try {
      wc.UploadData(ApiUrl + "deletefile?sid=" + BucketID + "&path=" + HttpUtility.UrlEncode(path),
        "POST", new byte[0]);
    } catch (System.Net.WebException ex) {
      ProcWebException(wc, ex);
    }
    wc.Dispose();
  }

  public List<FileInfo> ListFiles(string path) {
    throw new NotImplementedException();
  }

  public List<string> ListFilesSimple(string path) {
    var wc = new System.Net.WebClient();
    wc.Headers.Add("Authorization", "Bearer " + ApiToken);
    System.IO.Stream strm = null;
    var PathEnd = path.Substring(0, path.Length - 1) + (char)(Convert.ToInt32(path[path.Length - 1]) + 1);
    try {
      strm = wc.OpenRead(ApiUrl + "filelist?sid=" + BucketID + "&simple=1&start=" + HttpUtility.UrlEncode(path) + "&end=" + HttpUtility.UrlEncode(PathEnd));
    } catch (System.Net.WebException ex) {
      ProcWebException(wc, ex);
    }

    var rv = new List<string>();
    string x = null;
    var rdr = new System.IO.StreamReader(strm, System.Text.Encoding.UTF8);
    do {
      x = rdr.ReadLine();
      if (x == null) {
        break;
      }
      rv.Add(x);
    } while (true);
    rdr.Close();
    strm.Close();
    wc.Dispose();
    return rv;
  }

  private void ProcWebException(System.Net.WebClient wc, System.Net.WebException ex) {
    if (ex.Response == null) {
      throw new Exception("WebException with no Response object", ex);
    }
    var resp = (System.Net.HttpWebResponse)ex.Response;
    if (resp.StatusCode == (System.Net.HttpStatusCode)404) {
      wc.Dispose();
      throw new System.IO.FileNotFoundException("Function or file not found", ex);
    }
    var strmErr = new System.IO.StreamReader(resp.GetResponseStream(), System.Text.Encoding.UTF8);
    var x = strmErr.ReadToEnd();
    wc.Dispose();
    throw new Exception("Error response received. Status code " + (int)resp.StatusCode + ". Response: " + "\r\n" + x, ex);
  }

  public class FileInfo {
    public string Name;
    public long Length;
  }

}
