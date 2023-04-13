<%@ Page Language="VB" AutoEventWireup="false" Inherits="_Default" Codebehind="Default.aspx.vb" %>

<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Mit-Budget.dk</title>

  <link href="<%=JAH.StaticFileHash("css/mit-budget.css")%>" rel="stylesheet"/>
  <script src="<%=JAH.StaticFileHash("scripts/bootstrap.min.js")%>"></script>

<% If Request.RawUrl = "/vue" Then %>
  <script src="<%=JAH.StaticFileHash("scripts/vue.runtime.min.js")%>"></script>
  <script defer src="<%=JAH.StaticFileHash("scripts/mit-budget-vue.js")%>"></script>
<% ElseIf Request.RawUrl = "/svelte" Then %>
  <script defer src="<%=JAH.StaticFileHash("scripts/mit-budget-svelte.js")%>">></script>
<% ElseIf Request.RawUrl = "/svelte-ts" Then %>
  <script defer src="<%=JAH.StaticFileHash("scripts/mit-budget-svelte-ts.js")%>">></script>
<% ElseIf Request.RawUrl = "/frontview-jsdoc" Then %>
  <script src="<%=JAH.StaticFileHash("scripts/frontview.min.js")%>"></script>
  <script defer src="<%=JAH.StaticFileHash("scripts/mit-budget-frontview-jsdoc.js")%>"></script>
<% Else %>
  <script src="<%=JAH.StaticFileHash("scripts/frontview.min.js")%>"></script>
  <script defer src="<%=JAH.StaticFileHash("scripts/mit-budget-frontview.js")%>"></script>
<% End If %>

</head>
<body style="background-color:#ccc">

  <div style="display:flex;flex-direction:column;max-width:960px;margin:0 auto;background-color:white;min-height:100vh" id="base">

    <div style="padding: 1rem;flex-grow:1">
    
      <div class="d-flex">

          <h1 class="text-primary me-auto">Mit-Budget.dk</h1>

          <a href='https://ko-fi.com/jesperhoy' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
        </div>

      <hr/>
     
      <div id="intro">

        <p>Mit-Budget.dk er en gratis web-applikation (et program som kører i din browser) som gør det nemt at lave og arbejde med et personligt eller virksomheds-relateret budget.</p>

        <p>Mit-Budget.dk er smartere end de Excel budget-skabeloner man kan finde på nettet, netop fordi det er et rigtigt program og ikke bare et regneark.
        Et budget på Mit-Budget.dk er også nemmere at dele med andre, fordi modtagere ikke behøver Excel, men bare en browser.</p>
        
        <p>Mit-Budget.dk er inspireret af budget-funktionen i diverse netbanker,
          men i modsætning til disse bliver man ikke smidt ud af Mit-Budget.dk efter 10 minutters inaktivitet, 
          og man mister ikke sit budget på Mit-Budget.dk når man skifter bank.</p>

        <p>På Mit-Budget.dk er man anonym - så længe man ikke taster personlige oplysninger (navn, adresse, CPR-nr., etc.) ind - hvilket der ikke burde være nogen grund til.</p>

        <p>Når du gemmer et budget på Mit-Budget.dk, så får budgettet sin helt egen unikke og umulig-at-gætte permanente Internet-adresse (indtil du evt. sletter det).
          Denne adresse kan nemt deles med andre - inkl. bank-rådgiver, revisor, mv.</p>

        <p>Mit-budget.dk er Open Source - så hvis du er til den slags, kan du <a href="https://github.com/jesperhoy/Mit-Budget.dk" target="_blank">se og bidrage til kilde-koden på GitHub</a>.</p>

        <p>Hvis du finder fejl eller mangler i Mit-Budget.dk, kan du rapportere det ved at oprette et <a href="https://github.com/jesperhoy/Mit-Budget.dk/issues" target="_blank">"Issue" på GitHub</a></p>

        <p>Klik på knappen "Nyt budget" herunder for at komme i gang.</p>

        </div>

<div id="app"></div>
  
</div>


<div class="text-center bg-primary text-white p-2">
    Mit-Budget.dk  
  &bull; &copy; 2021-<%=Now.Year%> <a class="link-light" href="https://jesperhoy.dev" target="blank">Jesper Høy</a>
  &bull; <a class="link-light" href="https://github.com/jesperhoy/Mit-Budget.dk" target="_blank">Kildekode</a>
  &bull; <a class="link-light" href="https://github.com/jesperhoy/Mit-Budget.dk/issues" target="_blank">Rapporter fejl/mangler</a>
</div>

    </div>

</body>
</html>