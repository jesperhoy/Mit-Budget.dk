function ParseInputDato(x) {
  return new Date(parseInt(x.substr(0, 4)), parseInt(x.substr(5, 2)) - 1, parseInt(x.substr(8, 2)));
}

function LastDayOfMonth(year, monthIdx) {
  if (monthIdx !== 1) return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIdx];
  if (year===2100) return 28;
  return year % 4 === 0 ? 29 : 28;
}
function FixDato(year, monthIdx, day) {
  let ldm = LastDayOfMonth(year, monthIdx);
  if (day > ldm) day = ldm;
  return new Date(year, monthIdx, day);
}

function LavItemPosteringer(item, fraDato, tilDato) {
  let Dato1 = ParseInputDato(item.start);
  let Dato1LDM = Dato1.getDate() === LastDayOfMonth(Dato1.getFullYear(), Dato1.getMonth());
  let Dato2 = item.harslut ? ParseInputDato(item.slut) : new Date(3000, 0, 1);
  let Dag = Dato1.getDate();
  let rv = [];
  let TxDato;
  if (item.variabelt) {
    let CurMd = fraDato.getMonth();
    let CurÅr = fraDato.getFullYear();
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato<=Dato2 && TxDato <=tilDato) {
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
    let step=1; // 5= to gange pr. md
    if (item.hyppighed === 6) step = 1; // hver md
    if (item.hyppighed === 7) step = 2; // hver anden md
    if (item.hyppighed === 8) step = 3; // kvartal
    if (item.hyppighed === 9) step = 4; // 3 gange årligt
    if (item.hyppighed === 10) step = 6; // halvårligt
    if (item.hyppighed === 11) step = 12; // årligt
    if (item.hyppighed === 12) step = 1; // anførte
    TxDato = Dato1LDM ? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd)) : FixDato(CurÅr, CurMd, Dag);
    while (TxDato <= Dato2 && TxDato <= tilDato) {
      if (TxDato>=fraDato && TxDato >= Dato1 && (item.hyppighed!==12 || item.betalingsmåneder[CurMd])) {
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


function LavPosteringer(items, fraDato, tilDato, startSaldo) {
  let rv = [];
  if(startSaldo!==0) rv.push({
    itemid: 0,
    dato: fraDato,
    beskriv: "Start saldo",
    beløb: startSaldo,
    udgift: false,
  });

  for (itm of items) {
    rv = rv.concat(LavItemPosteringer(itm,fraDato, tilDato));
  }
  rv.sort(function (a, b) {
    if (a.dato < b.dato) return -1;
    if (a.dato > b.dato) return 1;
    return 0;
  });
  let bal = 0;
  for (p of rv) {
    bal += p.beløb;
    p.balance = bal;
  }
  return rv;
}
