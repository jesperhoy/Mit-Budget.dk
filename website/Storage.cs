public static class Storage {
  
  public static JAH.OwnCdnClient Bucket = JAH.OwnCdnClient.FromSharedConfig("budget");
  
  public static string Fetch(Guid id) {
    try {
      return System.Text.Encoding.UTF8.GetString(Bucket.GetFile(id.ToString()).Body);
    } catch (System.IO.FileNotFoundException ex) {
      return null;
    }
  }

  public static void Add(Guid id, string data) {
    Bucket.UploadFile(id.ToString(),"application/json",System.Text.Encoding.UTF8.GetBytes(data));
  }

  public static bool Update(Guid id, string data) {
    Add(id, data);
    return true;
  }

  public static bool Delete(Guid id) {
    try {
      Bucket.DeleteFile(id.ToString());
      return true;
    } catch (Exception) { 
      return false;
    }
  }

}
