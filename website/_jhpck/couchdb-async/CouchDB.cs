#pragma warning disable SYSLIB0014
using System.Net;

public class CouchDB(string server, string database, string userID, string password) {

  private readonly string BaseUrl = "http://" + server + ":5984/" + database;
  private readonly string Auth = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(userID + ':' + password));

  public static CouchDB FromSharedConfig(string dbID) {
    string x = JHSharedConfig.Get("CouchDB", dbID);
    int i;
    Dictionary<string, string> dict = [];
    foreach (string y in x.Split(';')) {
      i = y.IndexOf('=');
      if (i < 0) continue;
      dict.Add(y.Substring(0, i).Trim().ToLower(), y.Substring(i + 1).Trim());
    };
    return new CouchDB(dict["server"], dict["database"], dict["userid"], dict["password"]);
  }

  private System.Net.WebClient PrepWC() {
    var wc = new System.Net.WebClient();
    wc.Headers.Set("Authorization", "Basic " + Auth);
    wc.Headers.Set("Accept", "application/json");
    wc.Headers.Set("Content-Type", "application/json");
    return wc;
  }

 /* private HttpClient PrepHttpClient() {
    var rv = new HttpClient();
    rv.DefaultRequestHeaders.Authorization=new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Auth);
    rv.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    rv.DefaultRequestHeaders.Add("Content-Type", "application/json");
    return rv;
  }*/

  async public Task<string> GetDocRev(string docID) {
    System.Net.WebRequest request = System.Net.WebRequest.Create(BaseUrl + "/" + docID);
    request.Method = "HEAD";
    request.Headers.Set("Authorization", "Basic " + Auth);
    System.Net.WebResponse resp;
    try {
      resp = await request.GetResponseAsync();
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      return null;
    }
    var _rev = resp.Headers["ETag"].Trim();
    if (_rev.StartsWith('"')) _rev = _rev.Substring(1, _rev.Length - 2);
    return _rev;
  }

  async public Task<JhJson.Object> GetDoc(string docID) {
    var wc = PrepWC();
    string x = null;
    try {
      x = await wc.DownloadStringTaskAsync(BaseUrl + "/" + docID);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      return null;
    } finally {
      wc.Dispose();
    }
    return (JhJson.Object)JhJson.Parse(x);
  }

  public class CouchConflictException(Exception ex) : Exception(null, ex) {  }

  public class CouchNotFoundException(Exception ex) : Exception(null, ex) {  }

  async public Task UpdateDoc(string docID, JhJson.Object obj) {
    var _rev=await GetDocRev(docID);
    await UpdateDoc(docID, obj, _rev);
  }

  async public Task<string> UpdateDoc(string docID, JhJson.Object obj, string _rev) {
    var wc = PrepWC();
    if (_rev != null) wc.Headers.Set("If-Match", _rev);
    try {
      await wc.UploadStringTaskAsync(BaseUrl + "/" + docID, "PUT", obj.EncodeJson(false));
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }
    _rev = wc.ResponseHeaders["ETag"].Trim();
    if (_rev.StartsWith('"')) _rev = _rev.Substring(1, _rev.Length - 2);
    return _rev;
  }

  async public Task<string> CreateDoc(string docID, JhJson.Object obj) {
    var wc = PrepWC();
    try {
      await wc.UploadStringTaskAsync(BaseUrl + "/" + docID, "PUT", obj.EncodeJson(false));
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }
    var _rev = wc.ResponseHeaders["ETag"].Trim();
    if (_rev.StartsWith('"')) _rev = _rev.Substring(1, _rev.Length - 2);
    return _rev;
  }

  async public Task DeleteDoc(string docID) {
    var _rev = await GetDocRev(docID);
    await DeleteDoc(docID, _rev);
  }

  async public Task DeleteDoc(string docID, string _rev) {
    var wc = PrepWC();
    wc.Headers.Set("If-Match", _rev);
    try {
      await wc.UploadStringTaskAsync(BaseUrl + "/" + docID, "DELETE", "");
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }
  }

  async public Task DeleteLocalDoc(string docID) {
    var wc = PrepWC();
    try {
      await wc.UploadStringTaskAsync(BaseUrl + "/_local/" + docID, "DELETE", "");
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }
  }

  async public Task<JhJson.Object> Get(string pathAndQuery) {
    var wc = PrepWC();
    string x;
    //try {
    x = await wc.DownloadStringTaskAsync(BaseUrl + "/" + pathAndQuery);
    //} catch(Exception e) {
    //}
    wc.Dispose();
    return (JhJson.Object)JhJson.Parse(x);
  }

  async public Task<QueryResponse.Row> QueryFirst(string ddoc = null, string view = null, bool descending = false,
  JhJson.BaseValue key = null, JhJson.Array keys = null, JhJson.BaseValue startKey = null, JhJson.BaseValue endKey = null,
              bool includeDocs = false, bool inclusiveEnd = true, bool local = false,
              bool sorted = true) {
    var qr = await  Query(ddoc, view, descending, key, keys, startKey, endKey, includeDocs, inclusiveEnd, local, 1, sorted);
    using (qr) {
      var en = qr.rows.GetEnumerator();
      return en.MoveNext() ? en.Current : null;
    }
  }

  async public Task<QueryResponse> Query(string ddoc=null,string view=null,bool descending = false,
    JhJson.BaseValue key = null, JhJson.Array keys=null, JhJson.BaseValue startKey=null ,JhJson.BaseValue endKey=null, 
                bool includeDocs=false, bool inclusiveEnd=true, bool local=false,
                int limit=0, bool sorted=true) {
    string qs = "";
    if (local) {
      if (!string.IsNullOrEmpty(ddoc)) throw new ArgumentException("When 'local' is specified, 'ddoc' cannot be specified");
      if (!string.IsNullOrEmpty(view)) throw new ArgumentException("When 'local' is specified, 'view' cannot be specified");
    }
    if (string.IsNullOrEmpty(ddoc) && !string.IsNullOrEmpty(view)) throw new ArgumentException("When 'view' is specified, 'ddoc' must also be specified");
    if (!string.IsNullOrEmpty(ddoc) && string.IsNullOrEmpty(view)) throw new ArgumentException("When 'ddoc' is specified, 'view' must also be specified");
    if (key != null) {
      if (keys != null) throw new ArgumentException("When 'key' is specified, 'keys' cannot be specified");
      if (startKey != null) throw new ArgumentException("When 'key' is specified, 'startKey' cannot be specified");
      if (endKey != null) throw new ArgumentException("When 'key' is specified, 'endKey' cannot be specified");
      if (local) {
        if (!(key is JhJson.String)) throw new ArgumentException("When 'local' is specified, 'key' must be a string");
        key = "_local/" + ((JhJson.String)key).Value;
      }
      qs += "&key=" + WebUtility.UrlEncode(key.EncodeJson(false));
    } else if (keys != null) {
      if (keys.Count == 0) throw new ArgumentException("'keys' must have one or more values");
      if (startKey != null) throw new ArgumentException("When 'keys' is specified, 'startKey' cannot be specified");
      if (endKey != null) throw new ArgumentException("When 'keys' is specified, 'endKey' cannot be specified");
      if (local) {
        JhJson.Array arr2 = new JhJson.Array();
        foreach (var k in keys) {
          if (!(key is JhJson.String)) throw new ArgumentException("When 'local' is specified, each value of 'keys' must be a string");
          arr2.Add("_local/" + ((JhJson.String)k).Value);
        }
        keys = arr2;
      }
      qs += "&keys=" + WebUtility.UrlEncode(keys.EncodeJson(false));
    } else {
      if (startKey != null) {
        if (local) {
          if (!(startKey is JhJson.String)) throw new ArgumentException("When 'local' is specified, 'startKey' must be a string");
          startKey = "_local/" + ((JhJson.String)startKey).Value;
        }
        qs += "&startkey=" + WebUtility.UrlEncode(startKey.EncodeJson(false));
      }
      if (endKey != null) {
        if (local) {
          if (!(endKey is JhJson.String)) throw new ArgumentException("When 'local' is specified, 'endKey' must be a string");
          endKey = "_local/" + ((JhJson.String)endKey).Value;
        }
        qs += "&endkey=" + WebUtility.UrlEncode(endKey.EncodeJson(false));
        if (!inclusiveEnd) qs += "&inclusive_end=false";
      }
    }
    if (descending) qs += "&descending=true";
    if (includeDocs) qs += "&include_docs=true";
    if (limit > 0) qs += "&limit=" + limit.ToString();
    if (!sorted) qs += "&sorted=false";

    string path;
    if(local) {
      path ="_local_docs";
    } else if(!string.IsNullOrEmpty(view)) {
      path = "_design/" + ddoc + "/_view/" + view;
    } else {
      path = "_all_docs";
    }
    if (qs.Length > 0) path += "?" + qs.Substring(1);

    var wc = PrepWC();
    Stream strm;    
    try {
      strm = await wc.OpenReadTaskAsync(BaseUrl + "/" + path);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    }

    var strm2 = new System.IO.StreamReader(strm, System.Text.Encoding.UTF8);
    var rdr =new JhJson.TextReader(strm2);
    int offset = -1;
    int totalRows = -1;

    var v = rdr.Read();
    if (v.Type != JhJson.TextReader.TokenType.BeginObject) throw new Exception("Unexpected response data");

    JhJson.BaseValue val;
    while (true) {
      v = rdr.Read();
      switch (((JhJson.String)v.Value).Value) {
        case "total_rows":
          val = rdr.ReadValue();
          totalRows = val is JhJson.Null ? -1 : (int)((JhJson.Integer)val).Value;
          break;
        case "offset":
          val = rdr.ReadValue();
          offset = val is JhJson.Null ? -1 : (int)((JhJson.Integer)val).Value;
          break;
        case "rows":
          v = rdr.Read();
          if (v.Type != JhJson.TextReader.TokenType.BeginArray) throw new Exception("Unexpected response data");
          return new QueryResponse(offset, totalRows, rdr, wc);
        default:
          rdr.SkipValue();
          break;
      }
    }
  }


  public class QueryResponse(int offset, int totalRows, JhJson.TextReader rdr, WebClient wc) : IDisposable {
    public class Row {
      public string ID=null;
      public JhJson.BaseValue Key=null;
      public JhJson.BaseValue Value=null;
      public JhJson.Object Doc=null;
    }
    public readonly int offset = offset;
    public readonly int totalRows = totalRows;
    private bool RowsAccessed = false;
    public IEnumerable<Row> rows { get {
        if (RowsAccessed) throw new Exception("Can only access rows once");
        RowsAccessed = true;
        JhJson.TextReader.Token v;
        Row rv;
        while (true) {
          v = rdr.Read();
          if(v.Type== JhJson.TextReader.TokenType.EndArray) break;
          if (v.Type != JhJson.TextReader.TokenType.BeginObject) throw new Exception("Unexpected response data");
          rv= new Row();
          while (true) {
            v = rdr.Read();
            if (v.Type == JhJson.TextReader.TokenType.EndObject) break;
            switch (((JhJson.String)v.Value).Value) {
              case "id":
                rv.ID = ((JhJson.String)rdr.ReadValue()).Value;
                break;
              case "key":
                rv.Key =rdr.ReadValue();
                break;
              case "value":
                rv.Value = rdr.ReadValue();
                break;
              case "doc":
                rv.Doc = rdr.ReadObject();
                break;
              default:
                rdr.SkipValue();
                break;
            }
          }
          yield return rv;
        }
        Dispose();
      }
    }

    private bool disposedValue;
    protected virtual void Dispose(bool disposing) {
      if (!disposedValue) {
        if (disposing) {
          // TODO: dispose managed state (managed objects)
          rdr.Dispose();
          wc.Dispose();
        }
        disposedValue = true;
      }
    }
    public void Dispose() {
      Dispose(disposing: true);
      GC.SuppressFinalize(this);
    }
  }


  async public Task<int> GetLastID(string idPrefix) {
    string pq = $"_all_docs?descending=true&startkey=\"{idPrefix}A\"&endkey=\"{idPrefix}0\"&limit=1";
    var o =await Get(pq);
    var rows = o.GetArray("rows");
    if (rows.Count == 0) return 0;
    var o2 = (JhJson.Object)rows[0];
    var x = o2.GetString("id");
    return int.Parse(x.Substring(x.LastIndexOf('-') + 1));
  }

}
