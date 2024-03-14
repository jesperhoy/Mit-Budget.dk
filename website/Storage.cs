public static class Storage {

  public static CouchDB DB; 

  async public static Task<string> Fetch(Guid id) {
    var rv= await DB.GetDoc(id.ToString());
    if (rv == null) return null;
    rv.Members.Remove("_id");
    rv.Members.Remove("_rev");
    return rv.EncodeJson(false);
  }

  async public static Task<string> Add(Guid id, string data) {
    return await DB.CreateDoc(id.ToString(), (JhJson.Object)JhJson.Parse(data));
  }

  async public static Task Update(Guid id, string data) {
    await DB.UpdateDoc(id.ToString(), (JhJson.Object)JhJson.Parse(data));
  }

  async public static Task Delete(Guid id) {
    await DB.DeleteDoc(id.ToString());
  }

}
