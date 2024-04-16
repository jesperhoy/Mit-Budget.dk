import { CmpModal } from "./modal";
import { CmpCheckbox, CmpRadio } from "./checkbox_radio";
import { Icon } from "./icon";
import { CmpAmount } from "./amount";
import { BudgetItem } from "./app";

const MNavn=['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

export class CmpItem {
  #MyModal:CmpModal;
  data:BudgetItem;
  onGem:VoidFunction;
  Show() {
    this.#MyModal.Show();
  }
  Hide() {
    this.#MyModal.Hide();
  }
  #EnBetalingsMånedValgt() {
    for (let i = 0; i < 12; i++) {
      if (this.data.betalingsmåneder[i]) return true;
    }
    return false;
  }
  #EtVarBeløbAnført() {
    for (let i = 0; i < 12; i++) {
      if (this.data.varbeløb[i] !== 0) return true;
    }
    return false;
  }

  #MakeBody() {
    if(!this.data) return null;
    return html`
  <table class="form" style="width:100%">
    <tbody>
      <tr>
        <th>Type:</th>
        <td class="pad">
          ${[CmpRadio,{checked:this.data.udgift,onInput:()=>this.data.udgift=true,inline:true,label:'Udgift'}]}
          &nbsp;
          ${[CmpRadio,{checked:!this.data.udgift,onInput:()=>this.data.udgift=false,inline:true,label:'Indtægt'}]}
        </td>
      </tr>
      <tr>
        <th>Beskrivelse:</th>
        <td><input #bind|trim=${[this.data,"beskriv"]} type="text" class="form-control" required /></td>
      </tr>
      <!--<tr>
  <th>Gruppe:</th>
  <td><select class="form-select"></select></td>
  </tr>-->
      <tr>
        <th>Budgettér med:</th>
        <td class="pad">
          ${[CmpRadio,{checked:!this.data.variabelt,onInput:()=>this.data.variabelt=false,inline:true,label:'Et fast beløb'}]}
          &nbsp;
          ${[CmpRadio,{checked:this.data.variabelt,onInput:()=>this.data.variabelt=true,inline:true,label:'Et variabelt beløb'}]}
        </td>
      </tr>
      <tr>
        <th>Beløb:</th>
        <td>
          ${!this.data.variabelt?
          [CmpAmount,{value:this.data.fastbeløb,onChange:(v:number)=>this.data.fastbeløb=v,required:true}]:
          html`<table>
            ${[1,2,3,4].map(ln=>html`<tr>
              ${[1,2,3].map(rw=>html`
                <td style="padding:2px .5rem 2px 0;text-align:right">${MNavn[ln*3 + rw - 4]}</td>
                <td _style="padding:2px ${rw<3?'2rem':'0'} 2px 0">
                  ${[CmpAmount,{value:this.data.varbeløb[ln*3 + rw - 4],onChange:(v:number)=>this.data.varbeløb[ln*3 + rw - 4]=v,validity:ln===1 && rw===1 && !this.#EtVarBeløbAnført() ? 'Anfør beløb for mindst en måned':''}]}
                </td>`)}
            </tr>`)}
          </table>`}
        </td>
      </tr>
      ${!this.data.variabelt ? html`
      <tr>
        <th>Hyppighed:</th>
        <td>
          <select #bind|number=${this.data}.hyppighed class="form-select">
            <option value="1">Ugentlig</option>
            <option value="2">Hver anden uge</option>
            <option value="3">Hver tredje uge</option>
            <option value="4">Hver fjerde uge</option>
            <option value="5">To gange pr. måned</option>
            <option value="6">Månedlig</option>
            <option value="7">Hver anden måned</option>
            <option value="8">Kvartalsvis</option>
            <option value="9">Tre gange årligt</option>
            <option value="10">Halvårligt</option>
            <option value="11">Årligt</option>
            <option value="12">De anførte måneder</option>
          </select>
        </td>
      </tr>`:null}
      ${!this.data.variabelt && this.data.hyppighed===12?html`
      <tr>
        <th>Betalingsmåneder:</th>
        <td>
          <table>
            ${[1,2].map(ln=>html`
            <tr>
              ${[1,2,3,4,5,6].map(rw=>html`
              <td style="padding: .5rem 1rem 0 0">
                <label>
                  <input type=checkbox #bind=${[this.data.betalingsmåneder,ln*6 + rw - 7]} #validity=${ln===1 && rw===1 && !this.#EnBetalingsMånedValgt() ? 'Vælg mindst en måned':''} />
                  ${MNavn[ln*6 + rw - 7]}
                </label>
              </td>`)}
            </tr>`)}
          </table>
        </td>
      </tr>`:null}
      <tr>
        <th>Første gang:</th>
        <td><input type="date" #bind=${[this.data,"start"]} required class="form-control" /></td>
      </tr>
      <tr>
        <th>Slutter:</th>
        <td class=${this.data.harslut ? null :'pad'}>
          ${[CmpCheckbox,{checked:this.data.harslut,onInput:(v:boolean)=>this.data.harslut=v,inline:true}]}
          ${this.data.harslut?html`
          <input type=date #bind=${[this.data,"slut"]} required class="form-control d-inline-block"
              #validity=${this.data.start.length > 0 && this.data.slut.length > 0 && this.data.start > this.data.slut ? 'Kan ikke være før første betaling' : ''} />
          `:null}
        </td>
      </tr>
    </tbody>
  </table>`;
  }

  #MakeFooter() {
    return html`
    <button @click=${()=>this.Hide()} type="button" class="btn btn-secondary">Annuller</button>
    <button type="submit" class="btn btn-primary">${Icon('check')} Gem</button>`;
  }

  render() {
    return html`
    ${[CmpModal,
       {
          size:'lg',
          title:"Udgift / Indtægt",
          onSubmit:()=>this.onGem(),
          contentBody:this.#MakeBody(),
          contentFooter:this.#MakeFooter()
       },
       (m:CmpModal)=>this.#MyModal=m]}`; 
  }

}
