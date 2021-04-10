Option Strict On

Public Class MitBudget

  'Limit access to 1440 API requests / day / ip address = 1 every minute
  'with a burst rate of 25 requests
  Public Shared RateLimit As New JAH.LeakyBuckets(25, New TimeSpan(0, 1, 0))

  Public Shared Sub ProcReq(ctx As HttpContext)
    If Not RateLimit.AddDrop(ctx.Request.UserHostAddress) Then
      ctx.Response.StatusCode = 429 'Too Many Requests
      Exit Sub
    End If

    Dim id As Guid
    If ctx.Request.HttpMethod = "POST" Then
      Dim ba(CInt(ctx.Request.ContentLength) - 1) As Byte
      ctx.Request.InputStream.Read(ba, 0, CInt(ctx.Request.ContentLength))
      If Not VerifyUpload(ba) Then ctx.Response.StatusCode = 400 : Exit Sub
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
        If Not VerifyUpload(ba) Then ctx.Response.StatusCode = 400 : Exit Sub
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
    Dim rv(CInt(strm1.Length) - 1) As Byte
    strm1.Position = 0
    strm1.Read(rv, 0, CInt(strm1.Length))
    strm1.Close()
    Return rv
  End Function

  Private Shared Function VerifyUpload(ba As Byte()) As Boolean
    Dim x = System.Text.Encoding.UTF8.GetString(ba)
    Dim o = DirectCast(JhJson.Parse(x), JhJson.Object)
    Dim ma = {"navn", "startmåned", "startsaldo", "items", "nextid"}
    If o.Members.Count <> ma.Count Then Return False
    For Each kv In o.Members
      If Not ma.Contains(kv.Key) Then Return False
      If kv.Key <> "items" AndAlso
         (TypeOf kv.Value Is JhJson.Object OrElse TypeOf kv.Value Is JhJson.Array) Then Return False
    Next
    ma = {"id", "udgift", "beskriv", "variabelt", "fastbeløb", "varbeløb", "hyppighed", "betalingsmåneder", "start", "harslut", "slut"}
    Dim Items = o.GetArray("items")
    If Items.Count > 250 Then Return False
    For Each itm As JhJson.Object In Items
      If itm.Members.Count <> ma.Count Then Return False
      For Each kv In itm.Members
        If Not ma.Contains(kv.Key) Then Return False
        If kv.Key = "varbeløb" OrElse kv.Key = "betalingsmåneder" Then
          If Not TypeOf kv.Value Is JhJson.Array Then Return False
          For Each itm2 In DirectCast(kv.Value, JhJson.Array)
            If TypeOf itm2 Is JhJson.Object OrElse TypeOf itm2 Is JhJson.Array Then Return False
          Next
        Else
            If TypeOf kv.Value Is JhJson.Object OrElse TypeOf kv.Value Is JhJson.Array Then Return False
        End If
      Next
    Next
    Return True
  End Function

End Class
