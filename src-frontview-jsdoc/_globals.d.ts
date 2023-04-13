declare var bootstrap:any;

type BudgetItem = {
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
