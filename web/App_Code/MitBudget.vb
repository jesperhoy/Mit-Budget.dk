Option Strict On

Public Class MitBudget

  'Limit access to 1440 API requests / day / ip address = 1 every minute
  'with a burst rate of 60 requests
  Public Shared RateLimit As New JAH.LeakyBuckets(60, New TimeSpan(0, 1, 0))

  Public Shared Sub ProcReq(ctx As HttpContext)
    If Not RateLimit.AddDrop(ctx.Request.UserHostAddress) Then
      ctx.Response.StatusCode = 429 'Too Many Requests
      Exit Sub
    End If

    Dim id As Guid
    If ctx.Request.HttpMethod = "POST" Then
      Dim ba(CInt(ctx.Request.ContentLength) - 1) As Byte
      ctx.Request.InputStream.Read(ba, 0, CInt(ctx.Request.ContentLength))
      id = Guid.NewGuid()
      Storage.Add(id, GZip(ba))
      ctx.Response.StatusCode = 201 ' created
      ctx.Response.AddHeader("Location", "/" & id.ToString().Replace("-", ""))
      Exit Sub
    End If
    Const s = "/api/budget/"
    Dim pq = ctx.Request.Url.PathAndQuery
    If Not Guid.TryParse(pq.Substring(s.Length), id) Then ctx.Response.StatusCode = 404 : Exit Sub
    Select Case ctx.Request.HttpMethod
      Case "GET"
        Dim ba = Storage.Fetch(id)
        If ba Is Nothing Then ctx.Response.StatusCode = 404 : Exit Sub
        ctx.Response.ContentType = "application/json"
        ctx.Response.Headers.Add("Content-Encoding", "GZip")
        ctx.Response.BinaryWrite(ba)

      Case "PUT"
        Dim ba(CInt(ctx.Request.ContentLength) - 1) As Byte
        ctx.Request.InputStream.Read(ba, 0, CInt(ctx.Request.ContentLength))
        If Storage.Update(id, GZip(ba)) Then
          ctx.Response.StatusCode = 204 ' ok - no content
        Else
          ctx.Response.StatusCode = 404 ' not found
        End If

      Case "DELETE"
        If Storage.Delete(id) Then
          ctx.Response.StatusCode = 204 ' ok - no content
        Else
          ctx.Response.StatusCode = 404 ' not found
        End If

      Case Else
        ctx.Response.StatusCode = 405  ' method not allowed
    End Select
  End Sub

  Public Shared Function GZip(ba As Byte()) As Byte()
    Dim strm1 = New System.IO.MemoryStream
    Dim strm2 = New System.IO.Compression.GZipStream(strm1, System.IO.Compression.CompressionLevel.Optimal, True)
    strm2.Write(ba, 0, ba.Length)
    strm2.Close()
    Dim rv As Byte()
    ReDim rv(CInt(strm1.Length) - 1)
    strm1.Position = 0
    strm1.Read(rv, 0, CInt(strm1.Length))
    strm1.Close()
    Return rv
  End Function

End Class
