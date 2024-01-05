Option Strict On

Public Class storage

  Public Shared Function OpenDB() As JHSQLiteClient.Connection
    Return JHSQLiteClient.Connection.FromConnString(JHSharedConfig.Get("sqlite", "MitBudget"))
  End Function

  Public Shared Function Fetch(id As Guid) As String
    Using dbConn = OpenDB()
      Dim rv = dbConn.ExecuteScalar(Of String)("SELECT data FROM budget WHERE id=@p1", id.ToString())
      If rv Is Nothing Then Return Nothing
      Return rv
    End Using
  End Function

  Public Shared Sub Add(id As Guid, data As String)
    Using dbConn = OpenDB()
      dbConn.ExecuteNonQuery("INSERT INTO budget (id,data) VALUES (@p1,@p2)", id.ToString(), data)
    End Using
  End Sub

  Public Shared Function Update(id As Guid, data As String) As Boolean
    Using dbConn = OpenDB()
      Return dbConn.ExecuteNonQuery("UPDATE budget SET data=@p1 WHERE id=@p2", data, id.ToString()) = 1
    End Using
  End Function

  Public Shared Function Delete(id As Guid) As Boolean
    Using dbConn = OpenDB()
      Return dbConn.ExecuteNonQuery("DELETE FROM budget WHERE id=@p1", id.ToString()) = 1
    End Using
  End Function

End Class
