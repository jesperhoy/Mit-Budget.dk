Option Strict On

Public Class Storage

  Private Shared Function OpenDB() As System.Data.SqlClient.SqlConnection
    Dim rv = New System.Data.SqlClient.SqlConnection(ConfigurationManager.AppSettings("SqlMitBudget"))
    rv.Open()
    Return rv
  End Function

  Public Shared Function Fetch(id As Guid) As Byte()
    Using dbConn = OpenDB()
      Dim ba = dbConn.ExecuteScalar(Of Byte())("SELECT data FROM budget WHERE id=@p1", id)
      If ba Is Nothing Then Return Nothing
      Return ba
    End Using
  End Function

  Public Shared Sub Add(id As Guid, data As Byte())
    Using dbConn = OpenDB()
      dbConn.ExecuteNonQuery("INSERT INTO budget (id,data) VALUES (@p1,@p2)", id, data)
    End Using
  End Sub

  Public Shared Function Update(id As Guid, data As Byte()) As Boolean
    Using dbConn = OpenDB()
      Return dbConn.ExecuteNonQuery("UPDATE budget SET data=@p1 WHERE id=@p2", data, id) = 1
    End Using
  End Function

  Public Shared Function Delete(id As Guid) As Boolean
    Using dbConn = OpenDB()
      Return dbConn.ExecuteNonQuery("DELETE FROM budget WHERE id=@p1", id) = 1
    End Using
  End Function


End Class
