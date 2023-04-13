declare var bootstrap:any;

type BudgetType = {
  navn:string,
  items:BudgetItem[],
  startmåned:string,
  startsaldo:number,
  nextid:number
}

type BudgetItem ={
  id:number,
  beskriv:string,
  variabelt:boolean,
  fastbeløb:number,
  varbeløb:number[],
  hyppighed:number,
  betalingsmåneder:boolean[],
  udgift:boolean,
  start:string,
  harslut:boolean,
  slut:string,
}

type Postering={
  itemid:number,
  dato:Date,
  beskriv:string,
  beløb:number,
  balance?:number,
  udgift:boolean
}

