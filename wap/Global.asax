<%@ Application Language="VB" %>

<script runat="server">

  Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
    JHRollbar.Init(JHSharedConfig.Get("rollbar", "mitbudget"))

    JAH.AddRoute("api/budget/{id}", AddressOf MitBudget.ProcReq)
    JAH.AddRoute("api/budget", AddressOf MitBudget.ProcReq)

    With System.Web.Routing.RouteTable.Routes
      .MapPageRoute("vue-version", "vue", "~/default.aspx")
      .MapPageRoute("svelte-version", "svelte", "~/default.aspx")
      .MapPageRoute("svelte-ts-version", "svelte-ts", "~/default.aspx")
      .MapPageRoute("frontview-version", "frontview", "~/default.aspx")
      .MapPageRoute("frontview-jsdoc-version", "frontview-jsdoc", "~/default.aspx")
    End With
  End Sub

  Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
    JHRollbar.ApplicationError()
  End Sub

</script>