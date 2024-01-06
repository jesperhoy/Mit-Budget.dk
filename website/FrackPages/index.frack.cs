using System;
using System.Collections.Generic;

[FrackStatic.Route(["/"])]
public partial class PageIndex : FrackStatic.Component {

  public override void Render(System.IO.TextWriter _w1) {
    _w1.Write(@"<!DOCTYPE html><html>
<head>
  <meta name=""viewport"" content=""width=device-width, initial-scale=1"">

  <title>Mit-Budget.dk</title>

  <link");
    _w1.Write(MakeAttr("href", JAH.StaticFileHash("css/mit-budget.css")));
_w1.Write(@" rel=""stylesheet"">
  <script");
    _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/bootstrap.min.js")));
    _w1.Write(@"></script>

  ");
    if(Context.Request.Path.ToString() == "/vue") {
      _w1.Write(@"
  <script");
      _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/vue.runtime.min.js")));
      _w1.Write(@"></script>
  <script defer");
      _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/mit-budget-vue.js")));
      _w1.Write(@"></script>
  ");
    } else if(Context.Request.Path.ToString() == "/svelte") {
      _w1.Write(@"
  <script defer");
      _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/mit-budget-svelte.js")));
      _w1.Write(@"></script>
  ");
    } else {
      _w1.Write(@" ");
      // If Request.RawUrl = "/frontview"
      _w1.Write(@"
  <script");
      _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/frontview.min.js")));
      _w1.Write(@"></script>
  <script defer");
      _w1.Write(MakeAttr("src", JAH.StaticFileHash("scripts/mit-budget-frontview.js")));
      _w1.Write(@"></script>
  ");
    }
    _w1.Write(@"

  <script defer data-domain=""mit-budget.dk"" data-api=""/pl/event"" src=""/pl/script""></script>

</head>
<body style=""background-color:#ccc"">

  <div style=""display:flex;flex-direction:column;max-width:960px;margin:0 auto;background-color:white;min-height:100vh"" id=""base"">

    <div style=""padding: 1rem;flex-grow:1"">

      <div class=""d-flex"">

        <h1 class=""text-primary me-auto"">Mit-Budget.dk</h1>

        <a href=""https://ko-fi.com/jesperhoy"" target=""_blank""><img height=""36"" style=""border:0px;height:36px;"" src=""https://cdn.ko-fi.com/cdn/kofi2.png?v=2"" border=""0"" alt=""Buy Me a Coffee at ko-fi.com""></a>
      </div>

      <hr>

      <div id=""intro"">

        <p>Mit-Budget.dk er en gratis web-applikation (et program som kører i din browser) som gør det nemt at lave og arbejde med et personligt eller virksomheds-relateret budget.</p>

        <p>
          Mit-Budget.dk er smartere end de Excel budget-skabeloner man kan finde på nettet, netop fordi det er et rigtigt program og ikke bare et regneark.
          Et budget på Mit-Budget.dk er også nemmere at dele med andre, fordi modtagere ikke behøver Excel, men bare en browser.
        </p>

        <p>
          Mit-Budget.dk er inspireret af budget-funktionen i diverse netbanker,
          men i modsætning til disse bliver man ikke smidt ud af Mit-Budget.dk efter 10 minutters inaktivitet,
          og man mister ikke sit budget på Mit-Budget.dk når man skifter bank.
        </p>

        <p>På Mit-Budget.dk er man anonym - så længe man ikke taster personlige oplysninger (navn, adresse, CPR-nr., etc.) ind - hvilket der ikke burde være nogen grund til.</p>

        <p>
          Når du gemmer et budget på Mit-Budget.dk, så får budgettet sin helt egen unikke og umulig-at-gætte permanente Internet-adresse (indtil du evt. sletter det).
          Denne adresse kan nemt deles med andre - inkl. bank-rådgiver, revisor, mv.
        </p>

        <p>Mit-budget.dk er Open Source - så hvis du er til den slags, kan du <a href=""https://github.com/jesperhoy/Mit-Budget.dk"" target=""_blank"">se og bidrage til kilde-koden på GitHub</a>.</p>

        <p>Hvis du finder fejl eller mangler i Mit-Budget.dk, kan du rapportere det ved at oprette et <a href=""https://github.com/jesperhoy/Mit-Budget.dk/issues"" target=""_blank"">""Issue"" på GitHub</a></p>

        <p>Klik på knappen ""Nyt budget"" herunder for at komme i gang.</p>

      </div>

      <div id=""app""></div>

    </div>


    <div class=""text-center bg-primary text-white p-2"">
      Mit-Budget.dk
      • © 2021-");
    _w1.Write(he(DateTime.Now.Year));
    _w1.Write(@" <a href=""https://jesperhoy.dev"" target=""blank"" class=""link-light"">Jesper Høy</a>
      • <a href=""https://github.com/jesperhoy/Mit-Budget.dk"" target=""_blank"" class=""link-light"">Kildekode</a>
      • <a href=""https://github.com/jesperhoy/Mit-Budget.dk/issues"" target=""_blank"" class=""link-light"">Rapporter fejl/mangler</a>
    </div>

  </div>

</body>
</html>");
  }

  private string MakeAttr(string name, object value) {
    return value==null ? "" : (value is bool ? ((bool)value ? " " + name : "") : " " + name + "=\"" + he(value) + "\"");
  }

  private string he(object v) {
    return v.ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;");
  }

}
