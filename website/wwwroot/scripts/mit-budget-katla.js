(()=>{var y=class{required=!1;validity="";onChange;#t=!1;#e;#n=0;get value(){return this.#n}set value(e){e!==this.#n&&(this.#n=e,this.#r())}load(){this.#r()}#r(){this.#e=this.#n===0?"":f(this.#n)}#i(e,n){this.#e=e.target.value;let i=this.#e.split(".").join("").split(",").join(".").split(" ").join(""),a=i===""?0:Math.round(parseFloat(i)*100)/100;if(isNaN(a)){n&&(this.#t=!0);return}this.#t=!1,this.#n=a,this.onChange&&this.onChange(a),n&&this.#r()}render(){return html`
    <input type="text"
      .value=${this.#e}
      @input=${e=>this.#i(e,!1)} 
      @change=${e=>this.#i(e,!0)} 
      #validity=${this.#t?"Ugyldig v\xE6rdi":this.validity}
    style="text-align:right;max-width:125px"
    class="form-control"
    required=${this.required}/>`}};function b(t){switch(t){case"add":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>`;case"check":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96" /></svg>`;case"edit":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" fill="currentColor" /></svg>`;case"trash":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" /><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"download":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"upload":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 255.79l-64-64-64 64M256 448.21V207.79" /></svg>`;case"save":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"open":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 192v-72a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H408a40 40 0 0140 40v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M479.9 226.55L463.68 392a40 40 0 01-39.93 40H88.25a40 40 0 01-39.93-40L32.1 226.55A32 32 0 0164 192h384.1a32 32 0 0131.8 34.55z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"new":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" /><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"share":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><circle cx='128' cy='256' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='112' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='400' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94' /></svg>`;case"copy":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32' /><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /></svg>`;case"warning":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z' /></svg>`;case"info":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88' /><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z' /></svg>`;default:return html`<div class="icon">Icon name '${t}' not found</div>`}}var v=class{title="";size="md";contentBody;contentFooter;onSubmit;#t=null;#e=!1;Show(){this.#e||(this.#e=!0,this.#t&&this.#t.show())}Hide(){this.#e&&(this.#e=!1,this.#t&&this.#t.hide())}get value(){return this.#e}set value(e){e?this.Show():this.Hide()}#n(e){setTimeout(()=>{this.#t=new bootstrap.Modal(e,{keyboard:!1,backdrop:"static"}),this.#e&&this.#t.show()},5)}render(){return html`<div class="modal fade" tabindex="-1" #ref=${e=>this.#n(e)}>
  <div class="modal-dialog modal-dialog-centered${this.size==="md"?"":" modal-"+this.size}">
    <div class="modal-content">
      <form @submit|prevent=${()=>{this.onSubmit&&this.onSubmit()}}>
        <div class="modal-header">
          <h5 class="modal-title">${this.title}</h5>
          <button type="button" class="btn-close" @click=${()=>this.Hide()} aria-label="Close"></button>
        </div>
        <div class="modal-body">${this.contentBody}</div>
        <div class="modal-footer">${this.contentFooter}</div>
      </form>
    </div>
  </div>
</div>`}};var I=class{label=null;checked=!1;inline=!1;onInput;#t="";#e;constructor(e){this.#e=e;for(let n=0;n<16;n++)this.#t+=Math.floor(Math.random()*16).toString(16)}#n(e){this.checked=e.target.checked,this.onInput&&this.onInput(this.checked)}render(){return html`<div class="form-check${this.inline?" form-check-inline":""}">
    <input .checked=${this.checked}
           @input=${e=>this.#n(e)}
           class="form-check-input"
           type=${this.#e?"radio":"checkbox"}
           id=${this.#t}>
    <label class="form-check-label" for=${this.#t}>${this.label}</label>
  </div>`}},w=class extends I{constructor(){super(!0)}},S=class extends I{constructor(){super(!1)}};var z=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],j=class{#t;data;onGem;Show(){this.#t.Show()}Hide(){this.#t.Hide()}#e(){for(let e=0;e<12;e++)if(this.data.betalingsm\u00E5neder[e])return!0;return!1}#n(){for(let e=0;e<12;e++)if(this.data.varbel\u00F8b[e]!==0)return!0;return!1}#r(){return this.data?html`
  <table class="form" style="width:100%">
    <tbody>
      <tr>
        <th>Type:</th>
        <td class="pad">
          ${[w,{checked:this.data.udgift,onInput:()=>this.data.udgift=!0,inline:!0,label:"Udgift"}]}
          &nbsp;
          ${[w,{checked:!this.data.udgift,onInput:()=>this.data.udgift=!1,inline:!0,label:"Indt\xE6gt"}]}
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
          ${[w,{checked:!this.data.variabelt,onInput:()=>this.data.variabelt=!1,inline:!0,label:"Et fast bel\xF8b"}]}
          &nbsp;
          ${[w,{checked:this.data.variabelt,onInput:()=>this.data.variabelt=!0,inline:!0,label:"Et variabelt bel\xF8b"}]}
        </td>
      </tr>
      <tr>
        <th>Beløb:</th>
        <td>
          ${this.data.variabelt?html`<table>
            ${[1,2,3,4].map(e=>html`<tr>
              ${[1,2,3].map(n=>html`
                <td style="padding:2px .5rem 2px 0;text-align:right">${z[e*3+n-4]}</td>
                <td _style="padding:2px ${n<3?"2rem":"0"} 2px 0">
                  ${[y,{value:this.data.varbel\u00F8b[e*3+n-4],onChange:i=>this.data.varbel\u00F8b[e*3+n-4]=i,validity:e===1&&n===1&&!this.#n()?"Anf\xF8r bel\xF8b for mindst en m\xE5ned":""}]}
                </td>`)}
            </tr>`)}
          </table>`:[y,{value:this.data.fastbel\u00F8b,onChange:e=>this.data.fastbel\u00F8b=e,required:!0}]}
        </td>
      </tr>
      ${this.data.variabelt?null:html`
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
      </tr>`}
      ${!this.data.variabelt&&this.data.hyppighed===12?html`
      <tr>
        <th>Betalingsmåneder:</th>
        <td>
          <table>
            ${[1,2].map(e=>html`
            <tr>
              ${[1,2,3,4,5,6].map(n=>html`
              <td style="padding: .5rem 1rem 0 0">
                <label>
                  <input type=checkbox #bind=${[this.data.betalingsm\u00E5neder,e*6+n-7]} #validity=${e===1&&n===1&&!this.#e()?"V\xE6lg mindst en m\xE5ned":""} />
                  ${z[e*6+n-7]}
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
        <td class=${this.data.harslut?null:"pad"}>
          ${[S,{checked:this.data.harslut,onInput:e=>this.data.harslut=e,inline:!0}]}
          ${this.data.harslut?html`
          <input type=date #bind=${[this.data,"slut"]} required class="form-control d-inline-block"
              #validity=${this.data.start.length>0&&this.data.slut.length>0&&this.data.start>this.data.slut?"Kan ikke v\xE6re f\xF8r f\xF8rste betaling":""} />
          `:null}
        </td>
      </tr>
    </tbody>
  </table>`:null}#i(){return html`
    <button @click=${()=>this.Hide()} type="button" class="btn btn-secondary">Annuller</button>
    <button type="submit" class="btn btn-primary">${b("check")} Gem</button>`}render(){return html`
    ${[v,{size:"lg",title:"Udgift / Indt\xE6gt",onSubmit:()=>this.onGem(),contentBody:this.#r(),contentFooter:this.#i()},e=>this.#t=e]}`}};var p=null,l=null,x=0,C=null,E="months",g=12,D=null,O,T,G,U,P,W=navigator.share!==void 0;function B(){return JSON.stringify(l)}function _(){return l.items.sort(function(t,e){let n=t.beskriv.toLowerCase(),i=e.beskriv.toLowerCase();return n<i?-1:n>i?1:0})}function R(){return new Date(parseInt(l.startm\u00E5ned.substr(0,4)),parseInt(l.startm\u00E5ned.substr(5,2))-1,1)}function L(){D=B()}function M(t,e,n){let i=[],a=e-t+1;for(let c=0;c<a;c++)i.push(n(t+c));return i}function J(){return{navn:"",startm\u00E5ned:new Date().getFullYear()+"-"+(new Date().getMonth()+101).toString().substr(1),startsaldo:0,items:[],nextid:1}}function f(t){let e=t.toFixed(2).replace(".",","),n=e.substr(e.length-3);for(e=e.substr(0,e.length-3);e.length>4||e.length===4&&e.charAt(0)!=="-";)n="."+e.substr(e.length-3)+n,e=e.substr(0,e.length-3);return e+n}function H(t){return t<0?html`<span style="color:red">${f(t)}</span>`:f(t)}function Q(t){let e=R(),n=e.getFullYear(),i=e.getMonth()+t;for(;i>11;)n+=1,i-=12;return["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"][i]+" "+n.toString().substr(2)}function V(t){if(t===0)x=0,C={id:0,udgift:!0,beskriv:"",variabelt:!1,fastbel\u00F8b:0,varbel\u00F8b:[0,0,0,0,0,0,0,0,0,0,0,0],hyppighed:6,betalingsm\u00E5neder:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],start:"",harslut:!1,slut:""};else{let e=l.items.find(n=>n.id===t);x=t,C=JSON.parse(JSON.stringify(e))}P.Show()}function q(t){let e=l.items.findIndex(n=>n.id===t);e<0||l.items.splice(e,1)}function X(){if(x===0)x=l.nextid++,C.id=x,l.items.push(C);else{let t=l.items.findIndex(e=>e.id===x);l.items[t]=C}P.Hide()}function Z(t){return(t.getDate()+100).toString().substr(1)+"."+(t.getMonth()+101).toString().substr(1)+"."+t.getFullYear()}async function tt(){if(!(p!=="nyt"&&B()===D)){if(p==="nyt"){let t=await fetch("/api/budget",{method:"POST",headers:{"Content-Type":"application/json"},body:B()});if(t.status!==201){alert("Unexpected response status code ("+t.status+") received");return}p=t.headers.get("Location").substr(1),document.location.hash=p,G.Show()}else{let t=await fetch("/api/budget/"+p,{method:"PUT",headers:{"Content-Type":"application/json"},body:B()});if(!t.ok){alert("Unexpected response (status code "+t.status+") received");return}}L()}}async function et(){if(p==="nyt")return;let t=await fetch("/api/budget/"+p,{method:"DELETE"});if(t.status!==204){alert("Unexpected response status code ("+t.status+") received");return}p="nyt",document.location.hash="nyt",D="dummy",await N(),O.Show()}function nt(){navigator.share({title:"Mit-Budget.dk - "+l.navn,url:window.location.href})}function rt(){l=J(),L(),p="nyt",document.location.hash="nyt",T.Show()}function it(){l.navn+=" (kopi)",p="nyt",document.location.hash="nyt",U.Show()}async function Y(){let t=window.location.hash,e=t.length<=1?null:t.substr(1);if(e===p||(document.getElementById("base").style.maxWidth=e===null?"960px":"",document.getElementById("intro").style.display=e===null?"block":"none",document.body.style.backgroundColor=e===null?"#ccc":"white",p=e,e===null))return;if(e==="nyt"){l=J(),L(),await N();return}l=null;let n=await fetch("/api/budget/"+e);n.status===404?(alert("Det angive budget findes ikke!"),p=null,document.location.hash=""):n.status!==200?(alert("Unexpected response status code ("+n.status+") received"),p=null,document.location.hash=""):(l=await n.json(),L()),await N()}function lt(t,e,n){let i=A(t.start),a=i.getDate()===$(i.getFullYear(),i.getMonth()),c=t.harslut?A(t.slut):new Date(3e3,0,1),d=i.getDate(),u=[],r;if(t.variabelt){let s=e.getMonth(),h=e.getFullYear();for(r=a?new Date(h,s,$(h,s)):F(h,s,d);r<=c&&r<=n;)r>=i&&t.varbel\u00F8b[s]!==0&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.varbel\u00F8b[s]:t.varbel\u00F8b[s],udgift:t.udgift}),s+=1,s>11&&(s-=12,h+=1),r=a?new Date(h,s,$(h,s)):F(h,s,d)}else if(t.hyppighed<5){let s=7;for(t.hyppighed===2&&(s=14),t.hyppighed===3&&(s=21),t.hyppighed===4&&(s=28),r=i;r<=c&&r<=n;)r>=e&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift}),r=new Date(r.getTime()+s*864e5)}else{let s=i.getFullYear(),h=i.getMonth(),m=1;for(t.hyppighed===6&&(m=1),t.hyppighed===7&&(m=2),t.hyppighed===8&&(m=3),t.hyppighed===9&&(m=4),t.hyppighed===10&&(m=6),t.hyppighed===11&&(m=12),t.hyppighed===12&&(m=1),r=a?new Date(s,h,$(s,h)):F(s,h,d);r<=c&&r<=n;)r>=e&&r>=i&&(t.hyppighed!==12||t.betalingsm\u00E5neder[h])&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift}),t.hyppighed===5&&(r=new Date(r.getTime()+15*864e5),r>=e&&r<=n&&r>=i&&r<=c&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift})),h+=m,h>11&&(h-=12,s+=1),r=a?new Date(s,h,$(s,h)):F(s,h,d)}return u}function ot(t,e,n,i){let a=[];i!==0&&a.push({itemid:0,dato:e,beskriv:"Start saldo",bel\u00F8b:i,udgift:!1});for(let d of t)a=a.concat(lt(d,e,n));a.sort(function(d,u){return d.dato<u.dato?-1:d.dato>u.dato?1:0});let c=0;for(let d of a)c+=d.bel\u00F8b,d.balance=c;return a}function $(t,e){return e!==1?[31,0,31,30,31,30,31,31,30,31,30,31][e]:t===2100?28:t%4===0?29:28}function A(t){return new Date(parseInt(t.substr(0,4)),parseInt(t.substr(5,2))-1,parseInt(t.substr(8,2)))}function F(t,e,n){let i=$(t,e);return n>i&&(n=i),new Date(t,e,n)}function st(){return document.title="Mit-Budget.dk"+(!l||l.navn===""?"":" - "+l.navn),html`<div>
    ${p===null?html` 
      <a href="#nyt" class="btn btn-primary">${b("new")} Nyt budget</a>
    `:l===null?html`
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `:at()}
  </div>`}function at(){let t=B()!==D,e=R(),n=e.getFullYear(),i=e.getMonth()+g-1;for(;i>11;)n+=1,i-=12;let a=new Date(n,i,$(n,i)),c=ot(l.items,e,a,l.startsaldo),d=0,u=0;for(let r of c)r.itemid!==0&&(r.udgift?d-=r.bel\u00F8b:u+=r.bel\u00F8b);return d=d/g,u=u/g,html`<p>
  <button @click=${tt} disabled=${!t||l.items.length===0} type=button class="btn btn-primary">${b("upload")} Gem i skyen</button>

  ${p!=="nyt"?html`
    ${W?html`<button @click=${nt} type=button class="btn btn-primary">${b("share")} Del</button>`:null}
    <button @click|prevent=${it} type=button class="btn btn-primary">${b("copy")} Lav kopi</button>
    <button @click|prevent=${et} type=button class="btn btn-danger">${b("trash")} Slet fra skyen</button>
    <button @click=${rt} type=button class="btn btn-primary">${b("new")} Nyt budget</button>
    `:null}
</p>

<hr />

<table class="form">
  <tbody>
    ${p!=="nyt"||l.items.length>0?html`
    <tr>
      <th>Status:</th>
      <td>
        ${t?html`<div class="alert alert-warning d-inline-block p-1 m-0">${b("warning")} Ændringer ikke gemt</div>`:html`<div class="alert alert-success d-inline-block p-1 m-0">${b("check")} Gemt i skyen</div>`}
      </td>
    </tr>`:null}
    <tr>
      <th>Budget-navn:</th>
      <td><input type="text" #bind|trim=${l}.navn required class="form-control" style="max-width:40rem" /></td>
    </tr>
    <tr>
      <th>Første måned:</th>
      <td><input type="month" #bind=${l}.startmåned required class="form-control" /></td>
    </tr>
    <tr>
      <th>Startsaldo:</th>
      <td>${[y,{value:l.startsaldo,onChange:r=>l.startsaldo=r}]}</td>
    </tr>
  </tbody>
</table>

<hr />

${l.items.length>0?html`
  <p>
    Visning: <select #bind=${[E,r=>E=r]} class="form-select d-inline-block w-auto">
      <option value="months">Måned-skema</option>
      <option value="ledger">Som kontoudtog</option>
    </select>

    &nbsp;&nbsp;&nbsp;Periode:
    <select #bind|number=${[g,r=>g=r]} class="form-select d-inline-block w-auto">
      <option value="12">12 måneder</option>
      <option value="18">18 måneder</option>
      <option value="24">24 måneder</option>
      <option value="36">36 måneder</option>
    </select>

  </p>

  ${E==="months"?dt(c):ut(c)}

  <p>
    <b>Gns. udgift pr. måned:</b> ${f(d)}<br />
    <b>Gns. indtægt pr. måned:</b> ${f(u)}<br />
    <b>Gns. rådighedsbeløb måned:</b> ${H(u-d)}
  </p>
  <hr />

  `:null}


<p>
  <button @click=${()=>V(0)} type=button class="btn btn-primary">${b("add")} Tilføj udgift/indtægt</button>
</p>

${[j,{data:C,onGem:X},r=>P=r]}
${pt()}
${bt()}
${ct()}
${ht()}`}function dt(t){let e=R(),n=new Map,i=[],a=[],c=0,d=[],u=0,r=0,s=e.getFullYear()*12+e.getMonth(),h,m;for(let o=0;o<g;o++)i[o]=0,a[o]=0,d[o]=0;for(let o of t){for(m=o.dato.getFullYear()*12+o.dato.getMonth()-s,h=o.itemid+"."+m,n.set(h,(n.get(h)??0)+o.bel\u00F8b),o.itemid!==0&&(i[m]=(i[m]??0)+o.bel\u00F8b),o.itemid===0&&(u=o.bel\u00F8b);m>r;)a[r]=c,d[r]=u,u=a[r],r+=1;c=o.balance,o.balance<u&&(u=o.balance)}for(;g>r;)a[r]=c,d[r]=u,u=a[r],r+=1;return html`<table class="table" style="width:auto">
  <tbody>
    <tr>
      <th colspan="3"></th>
      ${M(0,g-1,o=>html`<th>${Q(o)}</th>`)}
    </tr>
    ${[1,2].map(o=>html`
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td style="white-space:nowrap;font-weight:bold" colspan=${g+1}>${o===1?"Udgifter":"Indt\xE6gter"}</td>
      </tr>
      ${_().filter(k=>k.udgift===(o===1)).map(k=>html`
        <tr>
          <td><a href="#" @click|prevent=${()=>V(k.id)} class="link-primary">${b("edit")}</a></td>
          <td><a href="#" @click|prevent=${()=>q(k.id)} class="link-danger">${b("trash")}</a></td>
          <td style="white-space:nowrap">${k.beskriv}</td>
          ${M(1,g,K=>html`<td style="text-align:right">${n.get(k.id+"."+(K-1))===void 0?"":f(n.get(k.id+"."+(K-1)))}</td>`)}
        </tr>`)}
    `)}
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap;font-weight:bold" colspan=${g+1}>Nøgletal</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Startsaldo</td>
      <td style="text-align:right">${f(l.startsaldo)}</td>
      ${M(2,g,o=>html`<td>&nbsp;</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Rådighedsbeløb</td>
      ${M(1,g,o=>html`<td style="text-align:right">${f(i[o-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Ultimosaldo</td>
      ${M(1,g,o=>html`<td style="text-align:right">${H(a[o-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Laveste saldo</td>
      ${M(1,g,o=>html`<td style="text-align:right">${H(d[o-1])}</td>`)}
    </tr>
  </tbody>
</table>`}function ut(t){return html`<table class="table" style="width:auto">
  <tbody>
    <tr>
      <th colspan="2"></th>
      <th style="text-align:left">Dato</th>
      <th style="text-align:left">Beskrivelse</th>
      <th style="text-align:right">Beløb</th>
      <th style="text-align:right">Saldo</th>
    </tr>
    ${t.map(e=>html`
    <tr>
      <td>${e.itemid>0?html`<a href="#" @click|prevent=${()=>V(e.itemid)} class="link-primary">${b("edit")}</a>`:null}</td>
      <td>${e.itemid>0?html`<a href="#" @click|prevent=${()=>q(e.itemid)} class="link-danger">${b("trash")}</a>`:null}</td>
      <td>${Z(e.dato)}</td>
      <td>${e.beskriv}</td>
      <td style="text-align:right">${f(e.bel\u00F8b)}</td>
      <td style="text-align:right">${H(e.balance)}</td>
    </tr>`)}
  </tbody>
</table>`}function ht(){return[v,{title:"Budget er slettet fra skyen",contentBody:html`<p>Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.</p>
    <p>Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på "Gem i skyen" knappen.
    Budgettet vil så blive gemt igen på en ny adresse.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>O=t]}function ct(){return[v,{title:"Lav Kopi",contentBody:html`<p>Du arbejder nu i en kopi af dit tidligere budget.</p>
    <p>Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>U=t]}function pt(){return[v,{title:"Nyt budget",contentBody:html`<p>Du arbejder nu i et nyt budget.</p>
      <p>Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>T=t]}function bt(){return[v,{title:"Dit budget er nu gemt i skyen",contentBody:html`
    <p>
      Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.<br />
      Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.
    </p>
    <p>
      Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.
      Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.
      Overvej derfor at sende dem en kopi (brug "Lav kopi" funktionen, gem, og send dem så den nye adresse).
    </p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>G=t]}var N=Katla.mount("#app",st);window.addEventListener("beforeunload",function(t){p!==null&&D!==B()&&(t.returnValue="Dine \xE6ndringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?")});window.addEventListener("hashchange",Y,!1);Y();})();
