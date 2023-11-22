Public Class JHRollbar

  Public Enum RollbarLevel
    Critical = 1
    [Error] = 2
    Warning = 3
    Info = 4
    Debug = 5
  End Enum

  Private Shared Token As String = Nothing

  Public Shared Sub Init(rollbarAccessToken As String)
    If String.IsNullOrEmpty(rollbarAccessToken) Then Throw New Exception("Invalid token")
    Token = rollbarAccessToken
    REM Catch errors in secondary threads
    AddHandler AppDomain.CurrentDomain.UnhandledException, AddressOf AppUnhandled
  End Sub

  Private Shared Sub AppUnhandled(sender As Object, args As UnhandledExceptionEventArgs)
    Dim msg = New JhJson.Object
    msg.Add("is-terminating", args.IsTerminating)
    If args.ExceptionObject Is Nothing Then
      msg.Add("body", "Null")
    ElseIf TypeOf args.ExceptionObject Is Exception Then
      msg.Add("body", UnwrapException(DirectCast(args.ExceptionObject, Exception)))
    Else
      msg.Add("body", args.ExceptionObject.ToString())
    End If
    Dim dataObj = MakeRollbarJsonData("Unhandled exception in AppDomain", msg, RollbarLevel.Error)
    SendItem(dataObj)
  End Sub

  ''' <summary>OBS: message must be "body" member (string) with main message, but can have more fields</summary>
  Public Shared Sub Send(title As String, message As JhJson.Object, lvl As RollbarLevel)
    Dim j = MakeRollbarJsonData(title, message, lvl)
    SendItem(j)
  End Sub

  Public Shared Sub Send(title As String, messageBody As String, lvl As RollbarLevel)
    Dim msg = New JhJson.Object
    msg.Add("body", messageBody)
    Send(title, msg, lvl)
  End Sub

  Private Shared LBck As New JAH.LeakyBuckets(5, New TimeSpan(0, 10, 0)) ' max 5 pr. 10 min = max 30 pr hour
  Private Shared LBSkipped As Integer = 0

  Public Shared Sub ApplicationError()
    Dim ctx = HttpContext.Current
    If ctx Is Nothing Then Exit Sub
    Dim ex = ctx.Server.GetLastError
    If TypeOf ex Is System.Web.HttpUnhandledException AndAlso ex.InnerException IsNot Nothing Then ex = ex.InnerException

    '---- filter out errors we don't want ---
    If TypeOf ex Is System.Web.HttpException AndAlso ex.Message = "The state information is invalid for this page and might be corrupted." Then Exit Sub
    Dim bex = ex.GetBaseException
    If TypeOf bex Is System.Web.HttpException Then
      With DirectCast(bex, System.Web.HttpException)
        If .Message = "Unable to validate data." Then Exit Sub
        If .Message.StartsWith("A potentially dangerous Request.") Then Exit Sub
        If .GetHttpCode = 404 Then Exit Sub
      End With
    End If
    REM catch robots submitting ASP.NET webform
    If TypeOf bex Is System.FormatException AndAlso
      bex.Message = "Invalid length for a Base-64 char array." AndAlso
      bex.StackTrace.Contains("System.Web.UI.ObjectStateFormatter.Deserialize") Then Exit Sub
    If TypeOf bex Is System.ArgumentException AndAlso
        bex.Message.StartsWith("Invalid postback or callback argument") AndAlso
        bex.StackTrace.Contains("ClientScriptManager.ValidateEvent") Then Exit Sub
    If TypeOf bex Is System.Web.UI.ViewStateException Then Exit Sub
    REM WebResource.axd / ScriptResource.axd
    If ctx.Request.Url.AbsolutePath.ToLower = "/webresource.axd" Then Exit Sub
    If ctx.Request.Url.AbsolutePath.ToLower = "/scriptresource.axd" Then Exit Sub
    '---- /filter out errors we don't want ---

    If Not LBck.AddDrop("x") Then LBSkipped += 1 : Exit Sub

    Dim msg = New JhJson.Object
    msg.Add("body", UnwrapException(ex))
    Dim dataObj = MakeRollbarJsonData("Server error in " & ctx.Request.Url.ToString(), msg, RollbarLevel.Error)
    dataObj.Add("request", MakeRequestObj(ctx.Request))
    Dim custObj As New JhJson.Object()
    custObj.Add("lb-skipped", LBSkipped)
    dataObj.Add("custom", custObj)

    LBSkipped = 0

    SendItem(dataObj)
  End Sub

  Private Shared Sub SendItem(dataObj As JhJson.Object)
    Dim o = New JhJson.Object
    o.Add("data", dataObj)
    Dim c = New System.Net.Http.HttpClient
    c.DefaultRequestHeaders.Accept.Clear()
    c.DefaultRequestHeaders.Accept.Add(New Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"))
    Dim ct = New System.Net.Http.StringContent(o.EncodeJson(False))
    ct.Headers.Add("X-Rollbar-Access-Token", Token)
    ct.Headers.ContentType = New Net.Http.Headers.MediaTypeHeaderValue("application/json")
    Dim tsk = c.PostAsync("https://api.rollbar.com/api/1/item/", ct)
    tsk.Wait()
    'Dim res = tsk.Result 'we are not using result - uncomment to debug 
    'Stop 
  End Sub

  Private Shared Function MakeRequestObj(req As HttpRequest) As JhJson.Object
    Dim rv As New JhJson.Object
    rv.Add("url", req.Url.ToString())
    rv.Add("method", req.HttpMethod)
    rv.Add("user_ip", req.UserHostAddress)
    Dim oHdrs = New JhJson.Object
    For i = 0 To req.Headers.Count - 1
      oHdrs.Add(req.Headers.GetKey(i), req.Headers.GetValues(i).Aggregate("", Function(s1, s2) s1 & If(s1.Length > 0, ",", "") & s2))
    Next
    rv.Add("headers", oHdrs)
    If req.HttpMethod = "POST" AndAlso req.Form.Count > 0 Then
      Dim oPost As New JhJson.Object
      For i As Integer = 0 To req.Form.Count - 1
        oPost.Add(req.Form.Keys(i), req.Form(i))
      Next
      rv.Add("POST", oPost)
    End If
    Return rv
  End Function

  ''' <summary>OBS: message must be "body" member (string) with main message, but can have more fields</summary>
  Private Shared Function MakeRollbarJsonData(title As String, message As JhJson.Object, Optional lvl As RollbarLevel = RollbarLevel.Error) As JhJson.Object
    If title.Length > 255 Then title = title.Substring(0, 252).Trim() & "..."
    Dim oData As New JhJson.Object
    oData.Add("environment", If(Web.Hosting.HostingEnvironment.IsDevelopmentEnvironment, "develop", "production"))
    Dim oBody As New JhJson.Object
    oData.Add("body", oBody)
    oBody.Add("message", message)
    oData.Add("level", {"critical", "error", "warning", "info", "debug"}(CInt(lvl) - 1))
    oData.Add("timestamp", CLng(DateTime.UtcNow.Subtract(#1970/1/1#).TotalMilliseconds))
    oData.Add("title", title)
    oData.Add("uuid", Guid.NewGuid.ToString())
    Return oData
  End Function

  Private Shared Function UnwrapException(ex As Exception) As String
    Dim sb As New StringBuilder
    sb.AppendLine("--- Exception: ---")
    While ex IsNot Nothing
      sb.AppendLine("Message: " & ex.Message)
      sb.AppendLine("Source: " & ex.Source)
      sb.AppendLine("Type: " & ex.GetType.ToString)
      sb.AppendLine("Stack Trace:")
      sb.AppendLine(ex.StackTrace)
      ex = ex.InnerException
      If ex IsNot Nothing Then
        sb.AppendLine()
        sb.AppendLine("--- Inner exception: ---")
      End If
    End While
    Return sb.ToString()
  End Function

End Class
