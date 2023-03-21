import { CmpAmount } from "./amount";
import { Icon } from "./icon";
import { CmpItem } from "./item";
import { CmpModal, ModalRender } from "./modal";

type Budget={
  navn:string,
  items: BudgetItem[],
  startmåned:string,
  startsaldo:number,
  nextid:number
}

export type BudgetItem = {
  id:number,
  udgift:boolean,
  betalingsmåneder:boolean[],
  varbeløb:number[],
  variabelt:boolean,
  harslut:boolean,
  fastbeløb:number,
  hyppighed:number,
  start:string,
  slut:string,
  beskriv:string
}

type Postering = {
  itemid: number,
  dato: Date,
  beskriv: string,
  beløb: number,
  balance?: number,
  udgift: boolean
}

let budgetid:string=null;
let budget:Budget=null;
let EditID=0;
let EditData:BudgetItem=null;
let Visning:"months"|"ledger"="months";
let AntalMåneder=12;
let OldJSON:string=null;

let ModalSletSky:CmpModal;
let ModalNyt:CmpModal;
let ModalGemt:CmpModal;
let ModalLavKopi:CmpModal;
let ModalItem:CmpItem;

const BrowserKanDele = navigator.share !== undefined;


function BudgetJSON():string {
  return JSON.stringify(budget);
}

function ItemsByNavn():BudgetItem[] {
  return budget.items.sort(function(a, b) {
    let aa = a.beskriv.toLowerCase();
    let bb = b.beskriv.toLowerCase();
    if (aa<bb) return -1;
    if (aa>bb) return 1;
    return 0;
    });
}

function ParseFraDato():Date {
  return new Date(parseInt(budget.startmåned.substr(0, 4)), parseInt(budget.startmåned.substr(5, 2)) - 1, 1);
}

function IkkeÆndret():void {
  OldJSON = BudgetJSON();
}

function MapRange(start:number,end:number,f:(n:number)=>any):any[] {
  let rv=[];
  let ct=end-start+1; 
  for(let i=0;i<ct;i++) rv.push(f(start+i));
  return rv;
}

function LavNyt():Budget {
  return {
    navn: '',
    startmåned: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 101).toString().substr(1),
    startsaldo: 0,
    items: [],
    nextid: 1,
  };
}

export function FormatBeløb(v:number):string {
  let x = v.toFixed(2).replace('.', ',');
  let rv = x.substr(x.length - 3);
  x = x.substr(0, x.length - 3);
  while (x.length > 4 || (x.length === 4 && x.charAt(0) !== '-')) {
    rv ='.' + x.substr(x.length - 3) + rv;
    x = x.substr(0, x.length - 3);
  }
  return x + rv;
}

function FormatBeløbNegRød(v:number):string {
  if (v < 0) return html`<span style="color:red">${FormatBeløb(v)}</span>`;
  return FormatBeløb(v);
}

function BMdNavn(mdIdx:number):string {
  let fraDato=ParseFraDato();
  let tilÅr = fraDato.getFullYear();
  let tilMd = fraDato.getMonth() + mdIdx;
  while (tilMd > 11) {
    tilÅr += 1;
    tilMd -= 12;
  }
  return ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'][tilMd] + ' ' + tilÅr.toString().substr(2);
}

function KlikEdit(id:number):void {
  if (id === 0) {
    EditID = 0;
    EditData = {
      id:0,
      udgift: true,
      beskriv: '',
      variabelt: false,
      fastbeløb: 0,
      varbeløb: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hyppighed: 6,
      betalingsmåneder: [false, false, false, false, false, false, false, false, false, false, false, false],
      start: '',
      harslut: false,
      slut: '',
    }
  } else {
    let item = budget.items.find(itm => itm.id === id);
    EditID = id;
    EditData = JSON.parse(JSON.stringify(item));
  }
  ModalItem.Show();
}

function KlikSlet(id:number):void {
  let idx = budget.items.findIndex(itm => itm.id === id);
  if (idx < 0) return;
  budget.items.splice(idx, 1);
}

function GemItem():void {
  if (EditID === 0) {
    EditID = budget.nextid++;
    EditData.id = EditID;
    budget.items.push(EditData);
  } else {
    let idx = budget.items.findIndex(itm => itm.id === EditID);
    budget.items[idx]=EditData;
  }
  ModalItem.Hide();
}

function FormatDate(d:Date):string {
  return (d.getDate()+100).toString().substr(1) + '.' + (d.getMonth() + 101).toString().substr(1) + '.' + d.getFullYear();
}

async function KlikSave():Promise<void> {
  if (budgetid !== 'nyt' && BudgetJSON() === OldJSON) return;
  if (budgetid === 'nyt') {
    let r = await fetch('/api/budget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: BudgetJSON()
    });
    if (r.status !== 201) {
      alert('Unexpected response status code (' + r.status + ') received');
      return;
    }
    budgetid = r.headers.get('Location').substr(1);
    document.location.hash = budgetid;
    ModalGemt.Show();
  } else {
    let r = await fetch('/api/budget/' + budgetid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: BudgetJSON()
    });
    if (!r.ok) {
      alert('Unexpected response (status code ' + r.status + ') received');
      return;
    }
  }
  IkkeÆndret();
}

async function KlikSletSky():Promise<void> {
  if (budgetid === 'nyt') return; 
  let r = await fetch('/api/budget/'+budgetid, {method: "DELETE"});
  if (r.status !== 204) {
    alert('Unexpected response status code (' + r.status + ') received');
    return;
  }
  budgetid = 'nyt';
  document.location.hash = 'nyt';
  OldJSON = 'dummy'; //to trigger warning
  ModalSletSky.Show();
}

function DelUrl():void {
  navigator.share({
    title: 'Mit-Budget.dk - ' + budget.navn,
    url: window.location.href
  });
}

function KlikNyt():void {
  budget = LavNyt();
  IkkeÆndret();
  budgetid = 'nyt';
  document.location.hash = 'nyt';
  ModalNyt.Show();
}

function KlikKopi():void {
  budget.navn += ' (kopi)';
  budgetid = 'nyt';
  document.location.hash = 'nyt';
  ModalLavKopi.Show();
}

async function HashChanged():Promise<void> {
  let h = window.location.hash;
  let NewID = h.length <= 1 ? null : h.substr(1);
  if (NewID === budgetid) return;
  document.getElementById('base').style.maxWidth =NewID===null ? '960px' : '';
  document.getElementById('intro').style.display = NewID === null ? 'block' : 'none';
  document.body.style.backgroundColor = NewID === null ? '#ccc' : 'white';
  budgetid = NewID;
  if (NewID === null) return;
  if (NewID === 'nyt') {
    budget = LavNyt();
    IkkeÆndret();
    app.redraw();
    return;
  }
  budget = null;
  let r = await fetch('/api/budget/' + NewID);
  if (r.status === 404) {
    alert('Det angive budget findes ikke!');
    budgetid = null;
    document.location.hash = '';
  } else if (r.status !== 200) {
    alert('Unexpected response status code (' + r.status + ') received');
    budgetid = null;
    document.location.hash = '';
  } else {
    budget = await r.json();
    IkkeÆndret();
  }
  app.redraw();
};

function LavItemPosteringer(item:BudgetItem, fraDato:Date, tilDato:Date):Postering[] {
  let Dato1 = ParseInputDato(item.start);
  let Dato1LDM = Dato1.getDate() === LastDayOfMonth(Dato1.getFullYear(), Dato1.getMonth());
  let Dato2 = item.harslut ? ParseInputDato(item.slut) : new Date(3000, 0, 1);
  let Dag = Dato1.getDate();
  let rv:Postering[] = [];
  let TxDato;
  if (item.variabelt) {
    let CurMd = fraDato.getMonth();
    let CurÅr = fraDato.getFullYear();
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato <= Dato2 && TxDato <= tilDato) {
      if (TxDato >= Dato1 && item.varbeløb[CurMd] !== 0) {
        rv.push({
          itemid: item.id,
          dato: TxDato,
          beskriv: item.beskriv,
          beløb: item.udgift ? -item.varbeløb[CurMd] : item.varbeløb[CurMd],
          udgift: item.udgift
        });
      }
      CurMd += 1;
      if (CurMd > 11) { CurMd -= 12; CurÅr += 1 }
      TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    }
  } else if (item.hyppighed < 5) {
    // dag-baseret frekvens
    let step = 7 // 1=ugentligt
    if (item.hyppighed === 2) step = 14; // hver anden uge
    if (item.hyppighed === 3) step = 21; // hver tredie uge
    if (item.hyppighed === 4) step = 28; // hver fjerde uge
    TxDato = Dato1;
    while (TxDato <= Dato2 && TxDato <= tilDato) {
      if (TxDato >= fraDato) {
        rv.push({
          itemid: item.id,
          dato: TxDato,
          beskriv: item.beskriv,
          beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
          udgift: item.udgift
        });
      }
      TxDato = new Date(TxDato.getTime() + (step * 86400000)); // 86.400.000 = 24 * 60 * 60 * 1000
    }
  } else {
    // måned-baseret frekvens
    let CurÅr = Dato1.getFullYear();
    let CurMd = Dato1.getMonth();
    let step = 1; // 5= to gange pr. md
    if (item.hyppighed === 6) step = 1; // hver md
    if (item.hyppighed === 7) step = 2; // hver anden md
    if (item.hyppighed === 8) step = 3; // kvartal
    if (item.hyppighed === 9) step = 4; // 3 gange årligt
    if (item.hyppighed === 10) step = 6; // halvårligt
    if (item.hyppighed === 11) step = 12; // årligt
    if (item.hyppighed === 12) step = 1; // anførte
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato <= Dato2 && TxDato <= tilDato) {
      if (TxDato >= fraDato && TxDato >= Dato1 && (item.hyppighed !== 12 || item.betalingsmåneder[CurMd])) {
        rv.push({
          itemid: item.id,
          dato: TxDato,
          beskriv: item.beskriv,
          beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
          udgift: item.udgift
        });
      }
      if (item.hyppighed === 5) {
        // 2 gange pr. md - skub en mere ind om 15 dage
        TxDato = new Date(TxDato.getTime() + (15 * 86400000)); // 86.400.000 = 24 * 60 * 60 * 1000
        if (TxDato >= fraDato && TxDato <= tilDato && TxDato >= Dato1 && TxDato <= Dato2) {
          rv.push({
            itemid: item.id,
            dato: TxDato,
            beskriv: item.beskriv,
            beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
            udgift: item.udgift
          });
        }
      }
      CurMd += step;
      if (CurMd > 11) { CurMd -= 12; CurÅr += 1 }
      TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    }
  }
  return rv;
}


function LavPosteringer(items:BudgetItem[], fraDato:Date, tilDato:Date, startSaldo:number):Postering[] {
  let rv:Postering[] = [];
  if (startSaldo !== 0) rv.push({
    itemid: 0,
    dato: fraDato,
    beskriv: "Start saldo",
    beløb: startSaldo,
    udgift: false,
  });

  for (const itm of items) {
    rv = rv.concat(LavItemPosteringer(itm, fraDato, tilDato));
  }
  rv.sort(function (a, b) {
    if (a.dato < b.dato) return -1;
    if (a.dato > b.dato) return 1;
    return 0;
  });
  let bal = 0;
  for (const p of rv) {
    bal += p.beløb;
    p.balance = bal;
  }
  return rv;
}

function LastDayOfMonth(year:number, monthIdx:number):number {
  if (monthIdx !== 1) return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIdx];
  if (year === 2100) return 28;
  return year % 4 === 0 ? 29 : 28;
}

function ParseInputDato(x:string):Date {
  return new Date(parseInt(x.substr(0, 4)), parseInt(x.substr(5, 2)) - 1, parseInt(x.substr(8, 2)));
}

function FixDato(year:number, monthIdx:number, day:number):Date {
  let ldm = LastDayOfMonth(year, monthIdx);
  if (day > ldm) day = ldm;
  return new Date(year, monthIdx, day);
}

// ----------------------------------------------------------------------------

function RenderApp() {
  document.title = 'Mit-Budget.dk' + (!budget || budget.navn==='' ? '' : ' - ' + budget.navn);

  return html`<div>
    ${budgetid===null?html` 
      <a href="#nyt" class="btn btn-primary">${Icon("new")} Nyt budget</a>
    `:(budget===null?html`
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `:RenderMain())}
  </div>`;
}

function RenderMain() {
  let Ændret=BudgetJSON()!==OldJSON;

  let fraDato=ParseFraDato();

  let tilÅr = fraDato.getFullYear();
  let tilMd = fraDato.getMonth() + AntalMåneder - 1;
  while (tilMd > 11) {
    tilÅr += 1;
    tilMd -= 12;
  }
  let tilDato = new Date(tilÅr, tilMd, LastDayOfMonth(tilÅr, tilMd));
  let Posts= LavPosteringer(budget.items, fraDato, tilDato, budget.startsaldo);
  
  let GnsUdgift=0,GnsIndtægt=0;
  for (const p of Posts) {
    if(p.itemid===0) continue;
    if (p.udgift) { 
      GnsUdgift -= p.beløb 
    } else {
      GnsIndtægt+=p.beløb;
    }
  }
  GnsUdgift=GnsUdgift / AntalMåneder;
  GnsIndtægt=GnsIndtægt / AntalMåneder;

  return html`<p>
  <button @click=${KlikSave} disabled=${!Ændret || budget.items.length===0} type=button class="btn btn-primary">${Icon("upload")} Gem i skyen</button>

  ${budgetid!=='nyt'?html`
    ${BrowserKanDele?html`<button @click=${DelUrl} type=button class="btn btn-primary">${Icon("share")} Del</button>`:null}
    <button @click|prevent=${KlikKopi} type=button class="btn btn-primary">${Icon("copy")} Lav kopi</button>
    <button @click|prevent=${KlikSletSky} type=button class="btn btn-danger">${Icon("trash")} Slet fra skyen</button>
    <button @click=${KlikNyt} type=button class="btn btn-primary">${Icon("new")} Nyt budget</button>
    `:null}
</p>

<hr />

<table class="form">
  <tbody>
    ${budgetid!=='nyt' || budget.items.length>0?html`
    <tr>
      <th>Status:</th>
      <td>
        ${!Ændret?html`<div class="alert alert-success d-inline-block p-1 m-0">${Icon("check")} Gemt i skyen</div>`:
        html`<div class="alert alert-warning d-inline-block p-1 m-0">${Icon("warning")} Ændringer ikke gemt</div>`}
      </td>
    </tr>`:null}
    <tr>
      <th>Budget-navn:</th>
      <td><input type="text" #bind|trim=${budget}.navn required class="form-control" style="max-width:40rem" /></td>
    </tr>
    <tr>
      <th>Første måned:</th>
      <td><input type="month" #bind=${budget}.startmåned required class="form-control" /></td>
    </tr>
    <tr>
      <th>Startsaldo:</th>
      <td>${[CmpAmount,{value:budget.startsaldo,onChange:(v:number)=>budget.startsaldo=v}]}</td>
    </tr>
  </tbody>
</table>

<hr />

${budget.items.length>0?html`
  <p>
    Visning: <select #bind=${[Visning,(v:"months"|"ledger")=>Visning=v]} class="form-select d-inline-block w-auto">
      <option value="months">Måned-skema</option>
      <option value="ledger">Som kontoudtog</option>
    </select>

    &nbsp;&nbsp;&nbsp;Periode:
    <select #bind|number=${[AntalMåneder,(v:number)=>AntalMåneder=v]} class="form-select d-inline-block w-auto">
      <option value="12">12 måneder</option>
      <option value="18">18 måneder</option>
      <option value="24">24 måneder</option>
      <option value="36">36 måneder</option>
    </select>

  </p>

  ${Visning==='months'?RenderTableMonth(Posts):RenderTableLedger(Posts)}

  <p>
    <b>Gns. udgift pr. måned:</b> ${FormatBeløb(GnsUdgift)}<br />
    <b>Gns. indtægt pr. måned:</b> ${FormatBeløb(GnsIndtægt)}<br />
    <b>Gns. rådighedsbeløb måned:</b> ${FormatBeløbNegRød(GnsIndtægt-GnsUdgift)}
  </p>
  <hr />

  `:null}


<p>
  <button @click=${()=>KlikEdit(0)} type=button class="btn btn-primary">${Icon("add")} Tilføj udgift/indtægt</button>
</p>

${[CmpItem,{data:EditData,onGem:GemItem},(mi:CmpItem)=>ModalItem=mi]}
${RenderModalNyt()}
${RenderModalGemt()}
${RenderModalLavKopi()}
${RenderModalSletSky()}`;
}

function RenderTableMonth(Posts:Postering[]) {
  let fraDato=ParseFraDato();

  let PostsMd=new Map<string,number>;
  let RådighedMd:number[]=[];
  let UltimoMd:number[]=[],UltimoBal=0;
  let LavesteMd:number[]=[],LavesteLav=0;
  let cm=0;
  let fm = fraDato.getFullYear() * 12 + fraDato.getMonth();
  let CellID:string,MIdx:number;
  for (let i = 0; i < AntalMåneder; i++) {
     RådighedMd[i] = 0;
     UltimoMd[i]=0;
     LavesteMd[i]=0;
  }
  for (const p of Posts) {
    MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
    CellID = p.itemid + '.' + MIdx;
    PostsMd.set(CellID, (PostsMd.get(CellID) ?? 0) + p.beløb);

    if (p.itemid !== 0) RådighedMd[MIdx] = (RådighedMd[MIdx] ?? 0) + p.beløb;

    if (p.itemid === 0) LavesteLav = p.beløb;

    while (MIdx > cm) {
      UltimoMd[cm] = UltimoBal;
      LavesteMd[cm] = LavesteLav;
      LavesteLav = UltimoMd[cm];
      cm+=1
    }
    UltimoBal = p.balance;
    if (p.balance < LavesteLav) LavesteLav = p.balance;
  }
  while (AntalMåneder > cm) {
    UltimoMd[cm] = UltimoBal;
    LavesteMd[cm] = LavesteLav;
    LavesteLav = UltimoMd[cm];
    cm += 1
  }

  
  return html`<table class="table" style="width:auto">
  <tbody>
    <tr>
      <th colspan="3"></th>
      ${MapRange(0,AntalMåneder-1,md=>html`<th>${BMdNavn(md)}</th>`)}
    </tr>
    ${[1,2].map(tp=>html`
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td style="white-space:nowrap;font-weight:bold" colspan=${AntalMåneder+1}>${tp===1?'Udgifter':'Indtægter'}</td>
      </tr>
      ${ItemsByNavn().filter(itm=>itm.udgift===(tp===1)).map(itm=>html`
        <tr>
          <td><a href="#" @click|prevent=${()=>KlikEdit(itm.id)} class="link-primary">${Icon("edit")}</a></td>
          <td><a href="#" @click|prevent=${()=>KlikSlet(itm.id)} class="link-danger">${Icon("trash")}</a></td>
          <td style="white-space:nowrap">${itm.beskriv}</td>
          ${MapRange(1,AntalMåneder,md=>html`<td style="text-align:right">${PostsMd.get(itm.id + '.' + (md-1))===undefined ? '' : FormatBeløb(PostsMd.get(itm.id + '.' + (md-1)))}</td>`)}
        </tr>`)}
    `)}
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap;font-weight:bold" colspan=${AntalMåneder+1}>Nøgletal</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Startsaldo</td>
      <td style="text-align:right">${FormatBeløb(budget.startsaldo)}</td>
      ${MapRange(2,AntalMåneder,md=>html`<td>&nbsp;</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Rådighedsbeløb</td>
      ${MapRange(1,AntalMåneder,md=>html`<td style="text-align:right">${FormatBeløb(RådighedMd[md-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Ultimosaldo</td>
      ${MapRange(1,AntalMåneder,md=>html`<td style="text-align:right">${FormatBeløbNegRød(UltimoMd[md-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Laveste saldo</td>
      ${MapRange(1,AntalMåneder,md=>html`<td style="text-align:right">${FormatBeløbNegRød(LavesteMd[md-1])}</td>`)}
    </tr>
  </tbody>
</table>`;
}

function RenderTableLedger(Posts:Postering[]) {
  return html`<table class="table" style="width:auto">
  <tbody>
    <tr>
      <th colspan="2"></th>
      <th style="text-align:left">Dato</th>
      <th style="text-align:left">Beskrivelse</th>
      <th style="text-align:right">Beløb</th>
      <th style="text-align:right">Saldo</th>
    </tr>
    ${Posts.map(p=>html`
    <tr>
      <td>${p.itemid>0?html`<a href="#" @click|prevent=${()=>KlikEdit(p.itemid)} class="link-primary">${Icon("edit")}</a>`:null}</td>
      <td>${p.itemid>0?html`<a href="#" @click|prevent=${()=>KlikSlet(p.itemid)} class="link-danger">${Icon("trash")}</a>`:null}</td>
      <td>${FormatDate(p.dato)}</td>
      <td>${p.beskriv}</td>
      <td style="text-align:right">${FormatBeløb(p.beløb)}</td>
      <td style="text-align:right">${FormatBeløbNegRød(p.balance)}</td>
    </tr>`)}
  </tbody>
</table>`;
}

function RenderModalSletSky():ModalRender {
  return [CmpModal,{
    title:"Budget er slettet fra skyen",
    contentBody:html`<p>Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.</p>
    <p>Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på "Gem i skyen" knappen.
    Budgettet vil så blive gemt igen på en ny adresse.</p>`,
    contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`
    },
    (m:CmpModal)=>ModalSletSky=m]; 
}

function RenderModalLavKopi():ModalRender {
  return [CmpModal,{
    title:"Lav Kopi",
    contentBody:html`<p>Du arbejder nu i en kopi af dit tidligere budget.</p>
    <p>Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,
    contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`
  },
  (m:CmpModal)=>ModalLavKopi=m];
}

function RenderModalNyt():ModalRender {
  return [CmpModal,{
    title:"Nyt budget",
    contentBody:html`<p>Du arbejder nu i et nyt budget.</p>
      <p>Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,
    contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`
  },
  (m:CmpModal)=>ModalNyt=m];
}

function RenderModalGemt():ModalRender {
  return [CmpModal,{
    title:"Dit budget er nu gemt i skyen",
    contentBody:html`
    <p>
      Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.<br />
      Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.
    </p>
    <p>
      Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.
      Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.
      Overvej derfor at sende dem en kopi (brug "Lav kopi" funktionen, gem, og send dem så den nye adresse).
    </p>`,
    contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`
  },(m:CmpModal)=>ModalGemt=m]
}




const app=FV.app("#app",RenderApp);

window.addEventListener('beforeunload',
  function (e) {
    if (budgetid!==null && OldJSON !== BudgetJSON()) e.returnValue = "Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?";
  });

window.addEventListener('hashchange', HashChanged, false);

HashChanged();
