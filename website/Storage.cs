public static class Storage {

  public static JHSQLiteClient.Connection OpenDB() {
    return JHSQLiteClient.Connection.FromConnString(JHSharedConfig.Get("sqlite", "MitBudget"));
  }

  public static string Fetch(Guid id) {
    using (var dbConn = OpenDB()) {
      var rv= dbConn.ExecuteScalar("SELECT data FROM budget WHERE id=@p1", id.ToString());
      if (rv.IsNull) return null;
      return rv.AsString;
    }
  }

  public static void Add(Guid id, string data) {
    using (var dbConn = OpenDB()) {
      dbConn.ExecuteNonQuery("INSERT INTO budget (id,data) VALUES (@p1,@p2)", id.ToString(), data);
    }
  }

  public static bool Update(Guid id, string data) {
    using (var dbConn = OpenDB()) {
      return dbConn.ExecuteNonQuery("UPDATE budget SET data=@p1 WHERE id=@p2", data, id.ToString()) == 1;
    }
  }

  public static bool Delete(Guid id) {
    using (var dbConn = OpenDB()) {
      return dbConn.ExecuteNonQuery("DELETE FROM budget WHERE id=@p1", id.ToString()) == 1;
    }
  }

}
