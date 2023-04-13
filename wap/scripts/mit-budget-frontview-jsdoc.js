(()=>{var Ct=Object.defineProperty;var Dt=(t,e,n)=>e in t?Ct(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>(Dt(t,typeof e!="symbol"?e+"":e,n),n),tt=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var c=(t,e,n)=>(tt(t,e,"read from private field"),n?n.call(t):e.get(t)),g=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},w=(t,e,n,l)=>(tt(t,e,"write to private field"),l?l.call(t,n):e.set(t,n),n);var y=(t,e,n)=>(tt(t,e,"access private method"),n);var L,D,z,et,A,nt,S=class{constructor(){g(this,z);g(this,A);b(this,"required",!1);b(this,"validity","");b(this,"value",0);b(this,"onChange");g(this,L,!1);g(this,D,void 0)}load(){y(this,z,et).call(this)}render(){return html`
    <input type="text"
      .value=${c(this,D)}
      @input=${e=>y(this,A,nt).call(this,e,!1)} 
      @change=${e=>y(this,A,nt).call(this,e,!0)} 
      #validity=${c(this,L)?"Ugyldig v\xE6rdi":this.validity}
    style="text-align:right;max-width:125px"
    class="form-control"
    required=${this.required}/>`}};L=new WeakMap,D=new WeakMap,z=new WeakSet,et=function(){w(this,D,this.value===0?"":$(this.value))},A=new WeakSet,nt=function(e,n){w(this,D,e.target.value);let l=c(this,D).split(".").join("").split(",").join(".").split(" ").join(""),a=l===""?0:Math.round(parseFloat(l)*100)/100;if(isNaN(a)){n&&w(this,L,!0);return}w(this,L,!1),this.value=a,this.onChange&&this.onChange(a),n&&y(this,z,et).call(this)};function m(t){switch(t){case"add":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>`;case"check":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96" /></svg>`;case"edit":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" fill="currentColor" /></svg>`;case"trash":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" /><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"download":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"upload":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 255.79l-64-64-64 64M256 448.21V207.79" /></svg>`;case"save":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"open":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 192v-72a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H408a40 40 0 0140 40v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M479.9 226.55L463.68 392a40 40 0 01-39.93 40H88.25a40 40 0 01-39.93-40L32.1 226.55A32 32 0 0164 192h384.1a32 32 0 0131.8 34.55z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"new":return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" /><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;case"share":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><circle cx='128' cy='256' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='112' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='400' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94' /></svg>`;case"copy":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32' /><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /></svg>`;case"warning":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z' /></svg>`;case"info":return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88' /><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z' /></svg>`;default:return html`<div class="icon">Icon name '${t}' not found</div>`}}var M,x,E,ut,B=class{constructor(){g(this,E);b(this,"title","");b(this,"size","md");b(this,"contentBody");b(this,"contentFooter");b(this,"onSubmit");g(this,M,null);g(this,x,!1)}Show(){c(this,x)||(w(this,x,!0),c(this,M)&&c(this,M).show())}Hide(){c(this,x)&&(w(this,x,!1),c(this,M)&&c(this,M).hide())}get value(){return c(this,x)}set value(e){e?this.Show():this.Hide()}render(){return html`<div class="modal fade" tabindex="-1" #ref=${e=>y(this,E,ut).call(this,e)}>
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
</div>`}};M=new WeakMap,x=new WeakMap,E=new WeakSet,ut=function(e){setTimeout(()=>{w(this,M,new bootstrap.Modal(e)),c(this,x)&&c(this,M).show()},5)};var F,G,J,ht,T=class{constructor(e){g(this,J);b(this,"label",null);b(this,"checked",!1);b(this,"inline",!1);b(this,"onInput");g(this,F,"");g(this,G,void 0);w(this,G,e);for(let n=0;n<16;n++)w(this,F,c(this,F)+Math.floor(Math.random()*16).toString(16))}render(){return html`<div class="form-check${this.inline?" form-check-inline":""}">
    <input .checked=${this.checked}
           @input=${e=>y(this,J,ht).call(this,e)}
           class="form-check-input"
           type=${c(this,G)?"radio":"checkbox"}
           id=${c(this,F)}>
    <label class="form-check-label" for=${c(this,F)}>${this.label}</label>
  </div>`}};F=new WeakMap,G=new WeakMap,J=new WeakSet,ht=function(e){this.checked=e.target.checked,this.onInput&&this.onInput(this.checked)};var j=class extends T{constructor(){super(!0)}},R=class extends T{constructor(){super(!1)}};var ct=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],H,P,pt,Y,bt,W,gt,_,ft,q=class{constructor(){g(this,P);g(this,Y);g(this,W);g(this,_);g(this,H,void 0);b(this,"data");b(this,"onGem")}Show(){c(this,H).Show()}Hide(){c(this,H).Hide()}render(){return[B,{size:"lg",title:"Udgift / Indt\xE6gt",onSubmit:()=>this.onGem(),contentBody:y(this,W,gt).call(this),contentFooter:y(this,_,ft).call(this)},e=>w(this,H,e)]}};H=new WeakMap,P=new WeakSet,pt=function(){for(let e=0;e<12;e++)if(this.data.betalingsm\u00E5neder[e])return!0;return!1},Y=new WeakSet,bt=function(){for(let e=0;e<12;e++)if(this.data.varbel\u00F8b[e]!==0)return!0;return!1},W=new WeakSet,gt=function(){return this.data?html`
  <table class="form" style="width:100%">
    <tbody>
      <tr>
        <th>Type:</th>
        <td class="pad">
          ${[j,{checked:this.data.udgift,onInput:()=>this.data.udgift=!0,inline:!0,label:"Udgift"}]}
          &nbsp;
          ${[j,{checked:!this.data.udgift,onInput:()=>this.data.udgift=!1,inline:!0,label:"Indt\xE6gt"}]}
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
          ${[j,{checked:!this.data.variabelt,onInput:()=>this.data.variabelt=!1,inline:!0,label:"Et fast bel\xF8b"}]}
          &nbsp;
          ${[j,{checked:this.data.variabelt,onInput:()=>this.data.variabelt=!0,inline:!0,label:"Et variabelt bel\xF8b"}]}
        </td>
      </tr>
      <tr>
        <th>Beløb:</th>
        <td>
          ${this.data.variabelt?html`<table>
            ${[1,2,3,4].map(e=>html`<tr>
              ${[1,2,3].map(n=>html`
                <td style="padding:2px .5rem 2px 0;text-align:right">${ct[e*3+n-4]}</td>
                <td _style="padding:2px ${n<3?"2rem":"0"} 2px 0">
                  ${[S,{value:this.data.varbel\u00F8b[e*3+n-4],onChange:l=>this.data.varbel\u00F8b[e*3+n-4]=l,validity:e===1&&n===1&&!y(this,Y,bt).call(this)?"Anf\xF8r bel\xF8b for mindst en m\xE5ned":""}]}
                </td>`)}
            </tr>`)}
          </table>`:[S,{value:this.data.fastbel\u00F8b,onChange:e=>this.data.fastbel\u00F8b=e,required:!0}]}
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
                  <input type=checkbox #bind=${[this.data.betalingsm\u00E5neder,e*6+n-7]} #validity=${e===1&&n===1&&!y(this,P,pt).call(this)?"V\xE6lg mindst en m\xE5ned":""} />
                  ${ct[e*6+n-7]}
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
          ${[R,{checked:this.data.harslut,onInput:e=>this.data.harslut=e,inline:!0}]}
          ${this.data.harslut?html`
          <input type=date #bind=${[this.data,"slut"]} required class="form-control d-inline-block"
              #validity=${this.data.start.length>0&&this.data.slut.length>0&&this.data.start>this.data.slut?"Kan ikke v\xE6re f\xF8r f\xF8rste betaling":""} />
          `:null}
        </td>
      </tr>
    </tbody>
  </table>`:null},_=new WeakSet,ft=function(){return html`
    <button @click=${()=>this.Hide()} type="button" class="btn btn-secondary">Annuller</button>
    <button type="submit" class="btn btn-primary">${m("check")} Gem</button>`};var f=null,i=null,K=0,O=null,rt="months",v=12,U=null,kt,wt,yt,$t,lt,St=navigator.share!==void 0;function V(){return JSON.stringify(i)}function jt(){return i.items.sort(function(t,e){let n=t.beskriv.toLowerCase(),l=e.beskriv.toLowerCase();return n<l?-1:n>l?1:0})}function it(){return new Date(parseInt(i.startm\u00E5ned.substr(0,4)),parseInt(i.startm\u00E5ned.substr(5,2))-1,1)}function X(){U=V()}function N(t,e,n){let l=[],a=e-t+1;for(let p=0;p<a;p++)l.push(n(t+p));return l}function Mt(){return{navn:"",startm\u00E5ned:new Date().getFullYear()+"-"+(new Date().getMonth()+101).toString().substr(1),startsaldo:0,items:[],nextid:1}}function $(t){let e=t.toFixed(2).replace(".",","),n=e.substr(e.length-3);for(e=e.substr(0,e.length-3);e.length>4||e.length===4&&e.charAt(0)!=="-";)n="."+e.substr(e.length-3)+n,e=e.substr(0,e.length-3);return e+n}function Z(t){return t<0?html`<span style="color:red">${$(t)}</span>`:$(t)}function It(t){let e=it(),n=e.getFullYear(),l=e.getMonth()+t;for(;l>11;)n+=1,l-=12;return["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"][l]+" "+n.toString().substr(2)}function st(t){if(t===0)K=0,O={id:0,udgift:!0,beskriv:"",variabelt:!1,fastbel\u00F8b:0,varbel\u00F8b:[0,0,0,0,0,0,0,0,0,0,0,0],hyppighed:6,betalingsm\u00E5neder:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],start:"",harslut:!1,slut:""};else{let e=i.items.find(n=>n.id===t);K=t,O=JSON.parse(JSON.stringify(e))}lt.Show()}function xt(t){let e=i.items.findIndex(n=>n.id===t);e<0||i.items.splice(e,1)}function Lt(){if(K===0)K=i.nextid++,O.id=K,i.items.push(O);else{let t=i.items.findIndex(e=>e.id===K);i.items[t]=O}lt.Hide()}function Ft(t){return(t.getDate()+100).toString().substr(1)+"."+(t.getMonth()+101).toString().substr(1)+"."+t.getFullYear()}async function Ht(){if(!(f!=="nyt"&&V()===U)){if(f==="nyt"){let t=await fetch("/api/budget",{method:"POST",headers:{"Content-Type":"application/json"},body:V()});if(t.status!==201){alert("Unexpected response status code ("+t.status+") received");return}f=t.headers.get("Location").substr(1),document.location.hash=f,yt.Show()}else{let t=await fetch("/api/budget/"+f,{method:"PUT",headers:{"Content-Type":"application/json"},body:V()});if(!t.ok){alert("Unexpected response (status code "+t.status+") received");return}}X()}}async function Nt(){if(f==="nyt")return;let t=await fetch("/api/budget/"+f,{method:"DELETE"});if(t.status!==204){alert("Unexpected response status code ("+t.status+") received");return}f="nyt",document.location.hash="nyt",U="dummy",kt.Show()}function Kt(){navigator.share({title:"Mit-Budget.dk - "+i.navn,url:window.location.href})}function Ot(){i=Mt(),X(),f="nyt",document.location.hash="nyt",wt.Show()}function Vt(){i.navn+=" (kopi)",f="nyt",document.location.hash="nyt",$t.Show()}async function Bt(){let t=window.location.hash,e=t.length<=1?null:t.substr(1);if(e===f||(document.getElementById("base").style.maxWidth=e===null?"960px":"",document.getElementById("intro").style.display=e===null?"block":"none",document.body.style.backgroundColor=e===null?"#ccc":"white",f=e,e===null))return;if(e==="nyt"){i=Mt(),X(),vt.redraw();return}i=null;let n=await fetch("/api/budget/"+e);n.status===404?(alert("Det angive budget findes ikke!"),f=null,document.location.hash=""):n.status!==200?(alert("Unexpected response status code ("+n.status+") received"),f=null,document.location.hash=""):(i=await n.json(),X()),vt.redraw()}function zt(t,e,n){let l=mt(t.start),a=l.getDate()===I(l.getFullYear(),l.getMonth()),p=t.harslut?mt(t.slut):new Date(3e3,0,1),d=l.getDate(),u=[],r;if(t.variabelt){let o=e.getMonth(),h=e.getFullYear();for(r=a?new Date(h,o,I(h,o)):Q(h,o,d);r<=p&&r<=n;)r>=l&&t.varbel\u00F8b[o]!==0&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.varbel\u00F8b[o]:t.varbel\u00F8b[o],udgift:t.udgift}),o+=1,o>11&&(o-=12,h+=1),r=a?new Date(h,o,I(h,o)):Q(h,o,d)}else if(t.hyppighed<5){let o=7;for(t.hyppighed===2&&(o=14),t.hyppighed===3&&(o=21),t.hyppighed===4&&(o=28),r=l;r<=p&&r<=n;)r>=e&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift}),r=new Date(r.getTime()+o*864e5)}else{let o=l.getFullYear(),h=l.getMonth(),k=1;for(t.hyppighed===6&&(k=1),t.hyppighed===7&&(k=2),t.hyppighed===8&&(k=3),t.hyppighed===9&&(k=4),t.hyppighed===10&&(k=6),t.hyppighed===11&&(k=12),t.hyppighed===12&&(k=1),r=a?new Date(o,h,I(o,h)):Q(o,h,d);r<=p&&r<=n;)r>=e&&r>=l&&(t.hyppighed!==12||t.betalingsm\u00E5neder[h])&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift}),t.hyppighed===5&&(r=new Date(r.getTime()+15*864e5),r>=e&&r<=n&&r>=l&&r<=p&&u.push({itemid:t.id,dato:r,beskriv:t.beskriv,bel\u00F8b:t.udgift?-t.fastbel\u00F8b:t.fastbel\u00F8b,udgift:t.udgift})),h+=k,h>11&&(h-=12,o+=1),r=a?new Date(o,h,I(o,h)):Q(o,h,d)}return u}function At(t,e,n,l){let a=[];l!==0&&a.push({itemid:0,dato:e,beskriv:"Start saldo",bel\u00F8b:l,udgift:!1});for(let d of t)a=a.concat(zt(d,e,n));a.sort(function(d,u){return d.dato<u.dato?-1:d.dato>u.dato?1:0});let p=0;for(let d of a)p+=d.bel\u00F8b,d.balance=p;return a}function I(t,e){return e!==1?[31,0,31,30,31,30,31,31,30,31,30,31][e]:t===2100?28:t%4===0?29:28}function mt(t){return new Date(parseInt(t.substr(0,4)),parseInt(t.substr(5,2))-1,parseInt(t.substr(8,2)))}function Q(t,e,n){let l=I(t,e);return n>l&&(n=l),new Date(t,e,n)}function Gt(){return document.title="Mit-Budget.dk"+(!i||i.navn===""?"":" - "+i.navn),html`<div>
    ${f===null?html` 
      <a href="#nyt" class="btn btn-primary">${m("new")} Nyt budget</a>
    `:i===null?html`
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `:Ut()}
  </div>`}function Ut(){let t=V()!==U,e=it(),n=e.getFullYear(),l=e.getMonth()+v-1;for(;l>11;)n+=1,l-=12;let a=new Date(n,l,I(n,l)),p=At(i.items,e,a,i.startsaldo),d=0,u=0;for(let r of p)r.itemid!==0&&(r.udgift?d-=r.bel\u00F8b:u+=r.bel\u00F8b);return d=d/v,u=u/v,html`<p>
  <button @click=${Ht} disabled=${!t||i.items.length===0} type=button class="btn btn-primary">${m("upload")} Gem i skyen</button>

  ${f!=="nyt"?html`
    ${St?html`<button @click=${Kt} type=button class="btn btn-primary">${m("share")} Del</button>`:null}
    <button @click|prevent=${Vt} type=button class="btn btn-primary">${m("copy")} Lav kopi</button>
    <button @click|prevent=${Nt} type=button class="btn btn-danger">${m("trash")} Slet fra skyen</button>
    <button @click=${Ot} type=button class="btn btn-primary">${m("new")} Nyt budget</button>
    `:null}
</p>

<hr />

<table class="form">
  <tbody>
    ${f!=="nyt"||i.items.length>0?html`
    <tr>
      <th>Status:</th>
      <td>
        ${t?html`<div class="alert alert-warning d-inline-block p-1 m-0">${m("warning")} Ændringer ikke gemt</div>`:html`<div class="alert alert-success d-inline-block p-1 m-0">${m("check")} Gemt i skyen</div>`}
      </td>
    </tr>`:null}
    <tr>
      <th>Budget-navn:</th>
      <td><input type="text" #bind|trim=${i}.navn required class="form-control" style="max-width:40rem" /></td>
    </tr>
    <tr>
      <th>Første måned:</th>
      <td><input type="month" #bind=${i}.startmåned required class="form-control" /></td>
    </tr>
    <tr>
      <th>Startsaldo:</th>
      <td>${[S,{value:i.startsaldo,onChange:r=>i.startsaldo=r}]}</td>
    </tr>
  </tbody>
</table>

<hr />

${i.items.length>0?html`
  <p>
    Visning: <select #bind=${[rt,r=>rt=r]} class="form-select d-inline-block w-auto">
      <option value="months">Måned-skema</option>
      <option value="ledger">Som kontoudtog</option>
    </select>

    &nbsp;&nbsp;&nbsp;Periode:
    <select #bind|number=${[v,r=>v=r]} class="form-select d-inline-block w-auto">
      <option value="12">12 måneder</option>
      <option value="18">18 måneder</option>
      <option value="24">24 måneder</option>
      <option value="36">36 måneder</option>
    </select>

  </p>

  ${rt==="months"?Et(p):Tt(p)}

  <p>
    <b>Gns. udgift pr. måned:</b> ${$(d)}<br />
    <b>Gns. indtægt pr. måned:</b> ${$(u)}<br />
    <b>Gns. rådighedsbeløb måned:</b> ${Z(u-d)}
  </p>
  <hr />

  `:null}


<p>
  <button @click=${()=>st(0)} type=button class="btn btn-primary">${m("add")} Tilføj udgift/indtægt</button>
</p>

${[q,{data:O,onGem:Lt},r=>lt=r]}
${qt()}
${Pt()}
${Jt()}
${Rt()}`}function Et(t){var ot,at;let e=it(),n=new Map,l=[],a=[],p=0,d=[],u=0,r=0,o=e.getFullYear()*12+e.getMonth(),h="",k=0;for(let s=0;s<v;s++)l[s]=0,a[s]=0,d[s]=0;for(let s of t){for(k=s.dato.getFullYear()*12+s.dato.getMonth()-o,h=s.itemid+"."+k,n.set(h,((ot=n.get(h))!=null?ot:0)+s.bel\u00F8b),s.itemid!==0&&(l[k]=((at=l[k])!=null?at:0)+s.bel\u00F8b),s.itemid===0&&(u=s.bel\u00F8b);k>r;)a[r]=p,d[r]=u,u=a[r],r+=1;p=s.balance,s.balance<u&&(u=s.balance)}for(;v>r;)a[r]=p,d[r]=u,u=a[r],r+=1;return html`<table class="table" style="width:auto">
  <tbody>
    <tr>
      <th colspan="3"></th>
      ${N(0,v-1,s=>html`<th>${It(s)}</th>`)}
    </tr>
    ${[1,2].map(s=>html`
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td style="white-space:nowrap;font-weight:bold" colspan=${v+1}>${s===1?"Udgifter":"Indt\xE6gter"}</td>
      </tr>
      ${jt().filter(C=>C.udgift===(s===1)).map(C=>html`
        <tr>
          <td><a href="#" @click|prevent=${()=>st(C.id)} class="link-primary">${m("edit")}</a></td>
          <td><a href="#" @click|prevent=${()=>xt(C.id)} class="link-danger">${m("trash")}</a></td>
          <td style="white-space:nowrap">${C.beskriv}</td>
          ${N(1,v,dt=>html`<td style="text-align:right">${n.get(C.id+"."+(dt-1))===void 0?"":$(n.get(C.id+"."+(dt-1)))}</td>`)}
        </tr>`)}
    `)}
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap;font-weight:bold" colspan=${v+1}>Nøgletal</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Startsaldo</td>
      <td style="text-align:right">${$(i.startsaldo)}</td>
      ${N(2,v,s=>html`<td>&nbsp;</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Rådighedsbeløb</td>
      ${N(1,v,s=>html`<td style="text-align:right">${$(l[s-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Ultimosaldo</td>
      ${N(1,v,s=>html`<td style="text-align:right">${Z(a[s-1])}</td>`)}
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="white-space:nowrap">Laveste saldo</td>
      ${N(1,v,s=>html`<td style="text-align:right">${Z(d[s-1])}</td>`)}
    </tr>
  </tbody>
</table>`}function Tt(t){return html`<table class="table" style="width:auto">
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
      <td>${e.itemid>0?html`<a href="#" @click|prevent=${()=>st(e.itemid)} class="link-primary">${m("edit")}</a>`:null}</td>
      <td>${e.itemid>0?html`<a href="#" @click|prevent=${()=>xt(e.itemid)} class="link-danger">${m("trash")}</a>`:null}</td>
      <td>${Ft(e.dato)}</td>
      <td>${e.beskriv}</td>
      <td style="text-align:right">${$(e.bel\u00F8b)}</td>
      <td style="text-align:right">${Z(e.balance)}</td>
    </tr>`)}
  </tbody>
</table>`}function Rt(){return[B,{title:"Budget er slettet fra skyen",contentBody:html`<p>Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.</p>
    <p>Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på "Gem i skyen" knappen.
    Budgettet vil så blive gemt igen på en ny adresse.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>kt=t]}function Jt(){return[B,{title:"Lav Kopi",contentBody:html`<p>Du arbejder nu i en kopi af dit tidligere budget.</p>
    <p>Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>$t=t]}function qt(){return[B,{title:"Nyt budget",contentBody:html`<p>Du arbejder nu i et nyt budget.</p>
      <p>Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>wt=t]}function Pt(){return[B,{title:"Dit budget er nu gemt i skyen",contentBody:html`
    <p>
      Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.<br />
      Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.
    </p>
    <p>
      Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.
      Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.
      Overvej derfor at sende dem en kopi (brug "Lav kopi" funktionen, gem, og send dem så den nye adresse).
    </p>`,contentFooter:html`<button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>`},t=>yt=t]}var vt=FV.app("#app",Gt);window.addEventListener("beforeunload",function(t){f!==null&&U!==V()&&(t.returnValue="Dine \xE6ndringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?")});window.addEventListener("hashchange",Bt,!1);Bt();})();
