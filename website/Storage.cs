public static class Storage {

  public static string Fetch(Guid id) {
    if (!TryCouchGetDoc(id.ToString(), out var rv)) return null;
    rv.Members.Remove("_id");
    rv.Members.Remove("_rev");
    return rv.EncodeJson(false);
  }

  public static void Add(Guid id, string data) {
    string Rev = null;
    CouchSaveDoc(id.ToString(), (JhJson.Object)JhJson.Parse(data), ref Rev);
  }

  public static bool Update(Guid id, string data) {
    if (!TryCouchGetDoc(id.ToString(), out var doc)) return false;
    string Rev = doc.GetString("_rev");
    CouchSaveDoc(id.ToString(), (JhJson.Object)JhJson.Parse(data), ref Rev);
    return true;
  }

  public static bool Delete(Guid id) {
    if (!TryCouchGetDoc(id.ToString(), out var doc)) return false;
    string Rev = doc.GetString("_rev");
    CouchDeleteDoc(id.ToString(), Rev);
    return true;
  }

  // -------------------------------------------- couch static -------------------------------------------

  private static string Couch_BaseUrl;
  private static string Couch_Auth;

  public static void GetCouchConfig() {
    string x = JHSharedConfig.Get("CouchDB", "MitBudget");
    int i;
    Dictionary<string, string> dict = new();
    foreach (string y in x.Split(';')) {
      i = y.IndexOf('=');
      if (i < 0) continue;
      dict.Add(y.Substring(0, i).Trim().ToLower(), y.Substring(i + 1).Trim());
    };
    Couch_BaseUrl = "http://" + dict["server"] + ":5984/" + dict["database"];
    Couch_Auth = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(dict["userid"] + ':' + dict["password"]));
  }

  static System.Net.WebClient PrepCouchWC() {
    var wc = new System.Net.WebClient();
    wc.Headers.Set("Authorization", "Basic " + Couch_Auth);
    wc.Headers.Set("Accept", "application/json");
    wc.Headers.Set("Content-Type", "application/json");
    return wc;
  }

  public static bool TryCouchGetDoc(string docID, out JhJson.Object obj) {
    var wc = PrepCouchWC();
    string x = null;
    try {
      x = wc.DownloadString(Couch_BaseUrl + "/" + docID);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      obj = null;
      return false;
    } finally {
      wc.Dispose();
    }
    obj = (JhJson.Object)JhJson.Parse(x);
    return true;
  }

  public class CouchConflictException(Exception ex) : Exception(null, ex) { }
  public class CouchNotFoundException(Exception ex) : Exception(null, ex) { }
  public static void CouchSaveDoc(string docID, JhJson.Object obj, ref string _rev) {
    var wc = PrepCouchWC();
    if (_rev != null) wc.Headers.Set("If-Match", _rev);
    string x = null;
    try {
      x = wc.UploadString(Couch_BaseUrl + "/" + docID, "PUT", obj.EncodeJson(false));
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }

    //{"ok":true,"id":"indstil-1","rev":"3-ccb1f83f5018e034723522c0a8c7904d"}
    var o = (JhJson.Object)JhJson.Parse(x);
    _rev = o.GetString("rev");
  }

  public static void CouchDeleteDoc(string docID, string _rev) {
    var wc = PrepCouchWC();
    if (_rev != null) wc.Headers.Set("If-Match", _rev);
    try {
      wc.UploadString(Couch_BaseUrl + "/" + docID, "DELETE", "");
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 404) {
      throw new CouchNotFoundException(e);
    } catch (System.Net.WebException e) when ((int)((System.Net.HttpWebResponse)e.Response).StatusCode == 409) {
      throw new CouchConflictException(e);
    } finally {
      wc.Dispose();
    }
  }

}
