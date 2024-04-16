import { FormatBeløb } from "./app";

export class CmpAmount {
  required=false;
  validity="";
  value=0;
  onChange:(v:number)=>void;

  #BadVal=false;
  #DispVal:string;

  load():void {
    this.#UpdateDisplayValue();
  }

  #UpdateDisplayValue():void {
    this.#DispVal = this.value === 0 ? '' : FormatBeløb(this.value);
  }

  #Input(e:InputEvent,changed:boolean):void {
    this.#DispVal=(<any>(e.target)).value;
    let vs = this.#DispVal.split('.').join('').split(',').join('.').split(' ').join('');
    let v = vs === '' ? 0 : Math.round(parseFloat(vs) * 100) / 100;
    if (isNaN(v)) {
      if(changed) this.#BadVal = true;
      return;
    }
    this.#BadVal = false;
    this.value = v;
    if(this.onChange) this.onChange(v);
    if (changed) this.#UpdateDisplayValue();
  }

  render() {
    return html`
    <input type="text"
      .value=${this.#DispVal}
      @input=${(e:InputEvent)=>this.#Input(e,false)} 
      @change=${(e:InputEvent)=>this.#Input(e,true)} 
      #validity=${this.#BadVal ? 'Ugyldig værdi' : this.validity}
    style="text-align:right;max-width:125px"
    class="form-control"
    required=${this.required}/>`;
  }

}

