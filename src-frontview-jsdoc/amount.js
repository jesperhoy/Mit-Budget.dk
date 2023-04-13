import { FormatBeløb } from "./app.js";

export class CmpAmount {
  required=false;
  validity="";
  value=0;

  /** @type {function(number):void} */
  onChange;

  #BadVal=false;
  /** @type string */
  #DispVal;

  /** @returns void */
  load() {
    this.#UpdateDisplayValue();
  }

  /** @returns void */
  #UpdateDisplayValue() {
    this.#DispVal = this.value === 0 ? '' : FormatBeløb(this.value);
  }

  /**
   * @param {InputEvent} e
   * @param {boolean} changed
   * @returns void */
  #Input(e,changed) {
    this.#DispVal=(/**@type any */(e.target)).value;
    let vs = this.#DispVal.split('.').join('').split(',').join('.').split(' ').join('');
    let v = vs === '' ? 0 : Math.round(parseFloat(vs) * 100) / 100;
    if (isNaN(v)) {
      if(changed) this.#BadVal = true;
      return;
    }
    this.#BadVal = false;
    this.value = v;
    if(this.onChange) this.onChange(v);
    if(changed) this.#UpdateDisplayValue();
  }

  /** @returns any */
  render() {
    return html`
    <input type="text"
      .value=${this.#DispVal}
      @input=${(/**@type InputEvent*/e)=>this.#Input(e,false)} 
      @change=${(/**@type InputEvent*/e)=>this.#Input(e,true)} 
      #validity=${this.#BadVal ? 'Ugyldig værdi' : this.validity}
    style="text-align:right;max-width:125px"
    class="form-control"
    required=${this.required}/>`;
  }

}

