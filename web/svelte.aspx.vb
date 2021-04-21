
Partial Class _Default
  Inherits System.Web.UI.Page

  Private Sub _Default_Load(sender As Object, e As EventArgs) Handles Me.Load
    If Request.IsLocal Then Exit Sub
    If Request.Url.Host.ToLower <> "mit-budget.dk" OrElse
       Not Request.IsSecureConnection Then Response.RedirectPermanent("https://mit-budget.dk")
  End Sub

End Class
