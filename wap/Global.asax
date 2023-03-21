<%@ Application Language="VB" %>

<script runat="server">

  Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
    JAH.AddRoute("api/budget/{id}", AddressOf MitBudget.ProcReq)
    JAH.AddRoute("api/budget", AddressOf MitBudget.ProcReq)

    With System.Web.Routing.RouteTable.Routes
      .MapPageRoute("vue-version", "vue", "~/default.aspx")
      .MapPageRoute("svelte-version", "svelte", "~/default.aspx")
      .MapPageRoute("frontview-version", "frontview", "~/default.aspx")
    End With
  End Sub

</script>