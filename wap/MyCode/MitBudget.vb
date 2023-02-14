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
      Dim x = System.Text.Encoding.UTF8.GetString(ba)
      If Not VerifyUpload(x) Then ctx.Response.StatusCode = 400 : Exit Sub
      id = Guid.NewGuid()
      storage.Add(id, x)
      ctx.Response.StatusCode = 201 ' created
      ctx.Response.AddHeader("Location", "/" & id.ToString().Replace("-", ""))
      Exit Sub
    End If
    Const s = "/api/budget/"
    Dim pq = ctx.Request.Url.PathAndQuery
    If Not Guid.TryParse(pq.Substring(s.Length), id) Then ctx.Response.StatusCode = 404 : Exit Sub
    Select Case ctx.Request.HttpMethod
      Case "GET"
        Dim x = storage.Fetch(id)
        If x Is Nothing Then ctx.Response.StatusCode = 404 : Exit Sub
        ctx.Response.ContentType = "application/json"
        ctx.Response.Write(x)

      Case "PUT"
        Dim ba(CInt(ctx.Request.ContentLength) - 1) As Byte
        ctx.Request.InputStream.Read(ba, 0, CInt(ctx.Request.ContentLength))
        Dim x = System.Text.Encoding.UTF8.GetString(ba)
        If Not VerifyUpload(x) Then ctx.Response.StatusCode = 400 : Exit Sub
        If storage.Update(id, x) Then
          ctx.Response.StatusCode = 204 ' ok - no content
        Else
          ctx.Response.StatusCode = 404 ' not found
        End If

      Case "DELETE"
        If storage.Delete(id) Then
          ctx.Response.StatusCode = 204 ' ok - no content
        Else
          ctx.Response.StatusCode = 404 ' not found
        End If

      Case Else
        ctx.Response.StatusCode = 405  ' method not allowed
    End Select
  End Sub

  Private Shared Function VerifyUpload(x As String) As Boolean
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
          If DirectCast(kv.Value, JhJson.Array).Count <> 12 Then Return False
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
