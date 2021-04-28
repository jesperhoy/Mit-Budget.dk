<p>
    <button on:click={KlikSave} :disabled={BudgetJSON===$OldJSON || $Budget.items.length===0} type="button" class="btn btn-primary"><Icon name="upload" /> Gem i skyen</button>

    {#if $BudgetID!=='nyt'}

      {#if BrowserKanDele() }
    <button on:click={DelUrl} type="button" class="btn btn-primary"><Icon name="share" /> Del</button>
      {/if}
  
    <button on:click|preventDefault={KlikKopi} type="button" class="btn btn-primary"><Icon name="copy" /> Lav kopi</button>

    <button on:click|preventDefault={KlikSletSky} type="button" class="btn btn-danger"><Icon name="trash" /> Slet fra skyen</button>

   <button on:click={KlikNyt} type="button" class="btn btn-primary"><Icon name="new" /> Nyt budget</button>  
    {/if}
</p>

<hr />

<div class="form horizontal-sm">
   {#if $BudgetID!=='nyt' || $Budget.items.length>0}
   <Formfield label="Status">
      {#if BudgetJSON===$OldJSON}
      <div class="alert alert-success d-inline-block p-1 m-0"><Icon name="check" /> Gemt i skyen</div>
      {:else} 
      <div class="alert alert-warning d-inline-block p-1 m-0"><Icon name="warning" /> Ændringer ikke gemt</div>
      {/if}
    </Formfield>  
    {/if}

    <Formfield label="Budget-navn">
       <input type="text" bind:value={$Budget.navn} required class="form-control" style="max-width:40rem" />
    </Formfield>       

    <Formfield label="Første måned">
      <input type="month" bind:value={$Budget.startmåned} required class="form-control" />
    </Formfield>  

    <Formfield label="Startsaldo">
      <Amount bind:value={$Budget.startsaldo} />
    </Formfield>  
</div>    

    <hr />



{#if $Budget.items.length>0}

    <p>
        Visning: <select bind:value={Visning} class="form-select d-inline-block w-auto">
        <option value="months">Måned-skema</option>
        <option value="ledger">Som kontoudtog</option>
        </select>

        {#if Visning !=='list'}
        &nbsp;&nbsp;&nbsp;Periode:
        <select bind:value={AntalMåneder} class="form-select d-inline-block w-auto">
            <option value={12}>12 måneder</option>
            <option value={18}>18 måneder</option>
            <option value={24}>24 måneder</option>
            <option value={36}>36 måneder</option>
        </select>
        {/if}

    </p>

    {#if Visning==='months'}
    <table class="table" style="width:auto">
        <tbody>
            <tr>
            <th colspan="3"></th>
            {#each MånedNavn as md}
            <th>{md}</th>
            {/each}
            </tr>
            {#each [1,2] as tp}
            <tr>
                <td colspan="2">&nbsp;</td>
                <td style="white-space:nowrap;font-weight:bold" colspan={AntalMåneder+1}>{tp===1?'Udgifter':'Indtægter'}</td>
            </tr>
            {#each $Budget.items as itm}
            {#if itm.udgift===(tp===1)}
                <tr>
                <!-- svelte-ignore a11y-invalid-attribute -->
                <td><a href="#" on:click|preventDefault={KlikEdit(itm.id)} class="link-primary"><Icon name="edit" /></a></td>
                <!-- svelte-ignore a11y-invalid-attribute -->
                <td><a href="#" on:click|preventDefault={KlikSlet(itm.id)} class="link-danger"><Icon name="trash" /></a></td> 
                <td style="white-space:nowrap">{itm.beskriv}</td>
                {#each MånedNavn as md,i}
                <td style="text-align:right">{PostsMd[itm.id + '.' + i]===undefined ? '' : FormatBeløb(PostsMd[itm.id + '.' + i])}</td> 
                {/each}
                </tr>
            {/if}
            {/each}
            {/each}
            <tr>
            <td colspan="2">&nbsp;</td>
            <td style="white-space:nowrap;font-weight:bold" colspan={AntalMåneder+1}>Nøgletal</td>
            </tr>
            <tr>
            <td colspan="2">&nbsp;</td>
            <td style="white-space:nowrap">Startsaldo</td>
            <td style="text-align:right">{FormatBeløb($Budget.startsaldo)}</td>
            <td colspan={AntalMåneder-1}>&nbsp;</td>
            </tr>
            <tr>
            <td colspan="2">&nbsp;</td>
            <td style="white-space:nowrap">Rådighedsbeløb</td>
            {#each MånedNavn as md,i}
            <td style="text-align:right">{@html BeløbHtml(RådighedMd[i],false)}</td>
            {/each}
            </tr>
            <tr>
            <td colspan="2">&nbsp;</td>
            <td style="white-space:nowrap">Ultimosaldo</td>
            {#each MånedNavn as md,i}
            <td style="text-align:right">{@html BeløbHtml(UltimoMd[i],true)}</td>
            {/each}
            </tr>
            <tr>
            <td colspan="2">&nbsp;</td>
            <td style="white-space:nowrap">Laveste saldo</td>
            {#each MånedNavn as md,i}
            <td style="text-align:right">{@html BeløbHtml(LavesteMd[i],true)}</td>
            {/each}
            </tr>
        </tbody>
        </table>

        {:else}

        <table class="table" style="width:auto">
        <tbody>
            <tr>
            <th colspan="2"></th>
            <th style="text-align:left">Dato</th>
            <th style="text-align:left">Beskrivelse</th>
            <th style="text-align:right">Beløb</th>
            <th style="text-align:right">Saldo</th>
            </tr>
            {#each Posts as p}
            <tr>
            {#if p.itemid===0}
            <td colspan="2">&nbsp;</td>
            {:else}
            <!-- svelte-ignore a11y-invalid-attribute -->
            <td><a href="#" on:click|preventDefault={KlikEdit(p.itemid)} class="link-primary"><Icon name="edit" /></a></td>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <td><a href="#" on:click|preventDefault={KlikSlet(p.itemid)} class="link-danger"><Icon name="trash" /></a></td>
            {/if}
            <td>{FormatDate(p.dato)}</td>
            <td>{p.beskriv}</td>
            <td style="text-align:right">{@html BeløbHtml(p.beløb,false)}</td>
            <td style="text-align:right">{@html BeløbHtml(p.balance,true)}</td>
            </tr>
            {/each}
        </tbody>
        </table>
        {/if}

        <p>
        <b>Gns. udgift pr. måned:</b> {FormatBeløb(GnsUdgift)}<br />
        <b>Gns. indtægt pr. måned:</b> {FormatBeløb(GnsIndtægt)}<br />
        <b>Gns. rådighedsbeløb måned:</b> {@html BeløbHtml(GnsIndtægt-GnsUdgift,true)}
        </p>

        <hr />

{/if}

<p>
    <button on:click={()=>KlikEdit(0)} type="button" class="btn btn-primary"><Icon name="add" /> Tilføj udgift/indtægt</button>
</p>

<ModalItem data={EditData} on:gem={GemItem} bind:this={MyModalItem} />

<BSModal title="Dit budget er nu gemt i skyen" bind:this={ModalGemt}>
    <svelte:fragment slot="default">
    <p>Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.<br />
    Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.</p>
    <p>Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.
    Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.
    Overvej derfor at sende dem en kopi (brug "Lav kopi" funktionen, gem, og send dem så den nye adresse).</p>
    </svelte:fragment>
    <svelte:fragment slot="footer">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
    </svelte:fragment>
</BSModal>

<BSModal title="Lav Kopi" bind:this={ModalKopi}>
    <svelte:fragment slot="default">
    <p>Du arbejder nu i en kopi af dit tidligere budget.</p>
    <p>Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>
    </svelte:fragment>
    <svelte:fragment slot="footer">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
    </svelte:fragment>
</BSModal>

<BSModal title="Nyt budget" bind:this={ModalNyt}>
    <svelte:fragment slot="default">
    <p>Du arbejder nu i et nyt budget.</p>
    <p>Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>
    </svelte:fragment>
    <svelte:fragment slot="footer">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
    </svelte:fragment>
</BSModal>

<BSModal title="Budget er slettet fra skyen" bind:this={ModalSletSky}>
    <svelte:fragment slot="default">
    <p>Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.</p>
    <p>Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på "Gem i skyen" knappen.
    Budgettet vil så blive gemt igen på en ny adresse.</p>
    </svelte:fragment>
    <svelte:fragment slot="footer">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
    </svelte:fragment>
</BSModal>

<script>
import {FormatBeløb,LavNyt,BudgetID,Budget,OldJSON} from './shared.js';
import Formfield from './JH/FormField.svelte';
import Amount from './Amount.svelte';
import Icon from './Icon.svelte';
import BSModal from './Bootstrap/Modal.svelte';
import ModalItem from './ModalItem.svelte';

let MyModalItem;
let ModalGemt;
let ModalNyt;
let ModalKopi;
let ModalSletSky;

let Visning='months';
let AntalMåneder= 12;

let EditID=0;
let EditData=null;

$: BudgetJSON=JSON.stringify($Budget);
$: FraDato=new Date(parseInt($Budget.startmåned.substr(0, 4)), parseInt($Budget.startmåned.substr(5, 2)) - 1, 1);
$: TilDato=(function() {
	let tilÅr = FraDato.getFullYear();
    let tilMd = FraDato.getMonth() + AntalMåneder - 1;
    while (tilMd > 11) {
        tilÅr += 1;
        tilMd -= 12;
    }
    return new Date(tilÅr, tilMd, LastDayOfMonth(tilÅr, tilMd));})();

$: MånedNavn=(function() {
	let År = FraDato.getFullYear();
    let Md = FraDato.getMonth();
	let rv=new Array(AntalMåneder);
	for(let i=0;i<AntalMåneder;i++) {
		rv[i]=['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'][Md] + ' ' + År.toString().substr(2);
		Md+=1;
		if(Md>11) { Md=0; År+=1}
	}
	return rv;})();

$: Posts=(function() {
  let rv = [];
  if($Budget.startsaldo!==0) rv.push({
    itemid: 0,
    dato: FraDato,
    beskriv: "Start saldo",
    beløb: $Budget.startsaldo,
    udgift: false,
  });
  for (let itm of $Budget.items) {
    rv = rv.concat(LavItemPosteringer(itm));
  }
  rv.sort(function (a, b) {
    if (a.dato < b.dato) return -1;
    if (a.dato > b.dato) return 1;
    return 0;
  });
  let bal = 0;
  for (let p of rv) {
    bal += p.beløb;
    p.balance = bal;
  }
  return rv;})();

$: PostsMd=(function() {
	let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
	let CellID,MIdx;
	let rv = {};
	for (let p of Posts) {
		MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
		CellID = p.itemid + '.' + MIdx;
		rv[CellID] = rv[CellID] === undefined ? p.beløb : rv[CellID] + p.beløb;
	}
	return rv;})();

$: RådighedMd=(function() {
	let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
	let MIdx;
	let rv = [];
	for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;
	for (let p of Posts) {
		if (p.itemid === 0) continue;
		MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
		rv[MIdx] = rv[MIdx] === undefined ? p.beløb : rv[MIdx] + p.beløb;
	}
	return rv;})();

$: UltimoMd=(function() {
	let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
	let MIdx;
	let rv = [];
	let cm = 0;
	let bal = 0;
	for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;
	for (let p of Posts) {
		MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
		while (MIdx > cm) {
		rv[cm] = bal;
		cm+=1
		}
		bal = p.balance;
	}
	while (AntalMåneder > cm) {
		rv[cm] = bal;
		cm += 1
	}
	return rv; })();

$: LavesteMd=(function() {
        let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
        let MIdx;
        let rv = [];
        let cm = 0;
        let lav = 0;
        for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;
        for (let p of Posts) {
          if (p.itemid === 0) lav = p.beløb;
          MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
          while (MIdx > cm) {
            rv[cm] = lav;
            lav = UltimoMd[cm];
            cm += 1
          }
          if (p.balance < lav) lav = p.balance;
        }
        while (AntalMåneder > cm) {
          rv[cm] = lav;
          lav = UltimoMd[cm];
          cm += 1
        }
        return rv;})();

$: GnsUdgift=(function() {
	let rv = 0;
	for (let p of Posts) if (p.udgift) rv += p.beløb;
	return -rv / AntalMåneder; })();

$: GnsIndtægt=(function() {
        let rv = 0;
        for (let p of Posts) if (!p.udgift) rv += p.beløb;
        rv -= $Budget.startsaldo;
        return rv / AntalMåneder; })();

 
function LavNyItem() {
	return {
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
		};
}
function IkkeÆndret() {
   $OldJSON = BudgetJSON;
}
function KlikEdit(id) {
	if (id === 0) {
		EditID = 0;
		EditData =LavNyItem();
	} else {
		let item = $Budget.items.find(itm => itm.id === id);
		EditID = id;
		EditData = JSON.parse(JSON.stringify(item));
	}
    MyModalItem.Show();	
}
function GemItem() {
	if (EditID === 0) {
		EditID = $Budget.nextid++;
		EditData.id = EditID;
		$Budget.items.push(EditData);
	} else {
		let idx = $Budget.items.findIndex(itm => itm.id === EditID);
		$Budget.items[idx]=EditData;
	}
	$Budget.items=$Budget.items.sort(function(a, b) {
          let aa = a.beskriv.toLowerCase();
          let bb = b.beskriv.toLowerCase();
          if (aa<bb) return -1;
          if (aa>bb) return 1;
          return 0;
        });
	MyModalItem.Hide();
}

function KlikSlet(id) {
	let idx = $Budget.items.findIndex(itm => itm.id === id);
	if (idx < 0) return;
	$Budget.items.splice(idx, 1);
	$Budget.items=$Budget.items;
}

async function KlikSave() {
	if ($BudgetID !== 'nyt' && BudgetJSON === $OldJSON) return;
	if ($BudgetID === 'nyt') {
		let r = await fetch('/api/budget', {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify($Budget)
		});
		if (r.status !== 201) {
			alert('Unexpected response status code (' + r.status + ') received');
			return;
		}
		$BudgetID = r.headers.get('Location').substr(1);
		document.location.hash = $BudgetID;
		ModalGemt.Show();
	} else {
		let r = await fetch('/api/budget/' + $BudgetID, {
			method: "PUT",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify($Budget)
		});
		if (!r.ok) {
			alert('Unexpected response (status code ' + r.status + ') received');
			return;
		}
	}
	IkkeÆndret();
}
function LastDayOfMonth(year, monthIdx) {
  if (monthIdx !== 1) return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIdx];
  if (year===2100) return 28;
  return year % 4 === 0 ? 29 : 28;
}

function ParseInputDato(x) {
  return new Date(parseInt(x.substr(0, 4)), parseInt(x.substr(5, 2)) - 1, parseInt(x.substr(8, 2)));
}
function FixDato(year, monthIdx, day) {
  let ldm = LastDayOfMonth(year, monthIdx);
  if (day > ldm) day = ldm;
  return new Date(year, monthIdx, day);
}

function LavItemPosteringer(item) {
  let Dato1 = ParseInputDato(item.start);
  let Dato1LDM = Dato1.getDate() === LastDayOfMonth(Dato1.getFullYear(), Dato1.getMonth());
  let Dato2 = item.harslut ? ParseInputDato(item.slut) : new Date(3000, 0, 1);
  let Dag = Dato1.getDate();
  let rv = [];
  let TxDato;
  if (item.variabelt) {
    let CurMd = FraDato.getMonth();
    let CurÅr = FraDato.getFullYear();
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato<=Dato2 && TxDato <=TilDato) {
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
    while (TxDato <= Dato2 && TxDato <= TilDato) {
      if (TxDato >= FraDato) {
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
    let step=1; // 5= to gange pr. md
    if (item.hyppighed === 6) step = 1; // hver md
    if (item.hyppighed === 7) step = 2; // hver anden md
    if (item.hyppighed === 8) step = 3; // kvartal
    if (item.hyppighed === 9) step = 4; // 3 gange årligt
    if (item.hyppighed === 10) step = 6; // halvårligt
    if (item.hyppighed === 11) step = 12; // årligt
    if (item.hyppighed === 12) step = 1; // anførte
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato <= Dato2 && TxDato <= TilDato) {
      if (TxDato>=FraDato && TxDato >= Dato1 && (item.hyppighed!==12 || item.betalingsmåneder[CurMd])) {
        rv.push({
          itemid:item.id,
          dato: TxDato,
          beskriv: item.beskriv,
          beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
          udgift: item.udgift
        });
      }
      if (item.hyppighed === 5) {
        // 2 gange pr. md - skub en mere ind om 15 dage
        TxDato = new Date(TxDato.getTime() + (15 * 86400000)); // 86.400.000 = 24 * 60 * 60 * 1000
        if (TxDato >= FraDato && TxDato <= TilDato && TxDato >= Dato1 && TxDato <= Dato2) {
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

function BeløbHtml(v, redNegtaive) {
	if (v < 0 && redNegtaive) return '<span style="color:red">' + FormatBeløb(v) + '</span>';
	return FormatBeløb(v)
}
function FormatDate(d) {
    return (d.getDate()+100).toString().substr(1) + '.' + (d.getMonth() + 101).toString().substr(1) + '.' + d.getFullYear();
}
function BrowserKanDele() {
    return navigator.share !== undefined;
}
function DelUrl() {
	navigator.share({
		title: 'Mit-Budget.dk - ' + $Budget.navn,
		url: window.location.href	});
}
function KlikNyt() {
    $Budget = LavNyt();
    IkkeÆndret();
    $BudgetID = 'nyt';
    document.location.hash = 'nyt';
    ModalNyt.Show();
 }
function KlikKopi() {
    $Budget.navn += ' (kopi)';
    $BudgetID = 'nyt';
    document.location.hash = 'nyt';
    ModalKopi.Show();
}
async function KlikSletSky() {
    if ($BudgetID === 'nyt') return; 
    let r = await fetch('/api/budget/'+$BudgetID, {method: "DELETE"});
    if (r.status !== 204) {
        alert('Unexpected response status code (' + r.status + ') received');
        return;
    }
    $BudgetID = 'nyt';
    document.location.hash = 'nyt';
    $OldJSON = 'dummy'; 
    ModalSletSky.Show();
}

</script>
