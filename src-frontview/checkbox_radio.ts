class CmpCheckboxRadio {
  label:any=null;
  checked:boolean=false;
  inline:boolean=false;
  onInput:(checked:boolean)=>void;
  readonly #myid='';
  readonly #isRadio:boolean;
  constructor(isRadio:boolean) {
    this.#isRadio=isRadio;
    for (let i = 0; i < 16; i++) {
      this.#myid += Math.floor(Math.random() * 16).toString(16);
    }  
  }
  #OnInput(e:InputEvent) {
    this.checked=(<any>e.target).checked;
    if(this.onInput) this.onInput(this.checked);
  }
  render() {
    return html`<div class="form-check${this.inline?' form-check-inline':''}">
    <input .checked=${this.checked}
           @input=${(e:InputEvent)=>this.#OnInput(e)}
           class="form-check-input"
           type=${this.#isRadio?'radio':'checkbox'}
           id=${this.#myid}>
    <label class="form-check-label" for=${this.#myid}>${this.label}</label>
  </div>`;
  }
}

export class CmpRadio extends CmpCheckboxRadio {
  constructor() {
    super(true);
  }
}

export class CmpCheckbox extends CmpCheckboxRadio {
  constructor() {
    super(false);
  }
}