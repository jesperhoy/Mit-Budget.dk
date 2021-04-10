function ParseInputDato(t){return new Date(parseInt(t.substr(0,4)),parseInt(t.substr(5,2))-1,parseInt(t.substr(8,2)))}function LastDayOfMonth(t,e){return 1!==e?[31,0,31,30,31,30,31,31,30,31,30,31][e]:2100===t?28:t%4==0?29:28}function FixDato(t,e,n){let a=LastDayOfMonth(t,e);return n>a&&(n=a),new Date(t,e,n)}function LavItemPosteringer(t,e,n){let a,r=ParseInputDato(t.start),i=r.getDate()===LastDayOfMonth(r.getFullYear(),r.getMonth()),s=t.harslut?ParseInputDato(t.slut):new Date(3e3,0,1),o=r.getDate(),l=[];if(t.variabelt){let d=e.getMonth(),c=e.getFullYear();for(a=i?new Date(c,d,LastDayOfMonth(c,d)):FixDato(c,d,o);a<=s&&a<=n;)a>=r&&0!==t.varbeløb[d]&&l.push({itemid:t.id,dato:a,beskriv:t.beskriv,"beløb":t.udgift?-t.varbeløb[d]:t.varbeløb[d],udgift:t.udgift}),d+=1,d>11&&(d-=12,c+=1),a=i?new Date(c,d,LastDayOfMonth(c,d)):FixDato(c,d,o)}else if(t.hyppighed<5){let i=7;for(2===t.hyppighed&&(i=14),3===t.hyppighed&&(i=21),4===t.hyppighed&&(i=28),a=r;a<=s&&a<=n;)a>=e&&l.push({itemid:t.id,dato:a,beskriv:t.beskriv,"beløb":t.udgift?-t.fastbeløb:t.fastbeløb,udgift:t.udgift}),a=new Date(a.getTime()+864e5*i)}else{let d=r.getFullYear(),c=r.getMonth(),u=1;for(6===t.hyppighed&&(u=1),7===t.hyppighed&&(u=2),8===t.hyppighed&&(u=3),9===t.hyppighed&&(u=4),10===t.hyppighed&&(u=6),11===t.hyppighed&&(u=12),12===t.hyppighed&&(u=1),a=i?new Date(d,c,LastDayOfMonth(d,c)):FixDato(d,c,o);a<=s&&a<=n;)a>=e&&a>=r&&(12!==t.hyppighed||t.betalingsmåneder[c])&&l.push({itemid:t.id,dato:a,beskriv:t.beskriv,"beløb":t.udgift?-t.fastbeløb:t.fastbeløb,udgift:t.udgift}),5===t.hyppighed&&(a=new Date(a.getTime()+1296e6),a>=e&&a<=n&&a>=r&&a<=s&&l.push({itemid:t.id,dato:a,beskriv:t.beskriv,"beløb":t.udgift?-t.fastbeløb:t.fastbeløb,udgift:t.udgift})),c+=u,c>11&&(c-=12,d+=1),a=i?new Date(d,c,LastDayOfMonth(d,c)):FixDato(d,c,o)}return l}function LavPosteringer(t,e,n,a){let r=[];for(itm of(0!==a&&r.push({itemid:0,dato:e,beskriv:"Start saldo","beløb":a,udgift:!1}),t))r=r.concat(LavItemPosteringer(itm,e,n));r.sort((function(t,e){return t.dato<e.dato?-1:t.dato>e.dato?1:0}));let i=0;for(p of r)i+=p.beløb,p.balance=i;return r}Vue.directive("validity",(function(t,e){t.setCustomValidity(e.value)})),Vue.component("bs-checkbox",{render:new Function('with(this){return _c(\'div\',{class:\'form-check\'+(inline?\' form-check-inline\':\'\')},[_c(\'input\',{staticClass:"form-check-input",attrs:{"type":"checkbox","id":myid},domProps:{"checked":checked},on:{"input":function($event){return $emit(\'input\',$event.target.checked)}}}),_v(" "),_c(\'label\',{staticClass:"form-check-label",attrs:{"for":myid}},[_t("default")],2)])}'),staticRenderFns:[],model:{prop:"checked",event:"input"},props:{checked:{type:Boolean,default:!1},inline:{type:Boolean,default:!1}},data(){let t="";for(let e=0;e<16;e++)t+=Math.floor(16*Math.random()).toString(16);return{myid:"checkbox-"+t}}}),Vue.component("bs-radio",{render:new Function('with(this){return _c(\'div\',{class:\'form-check\'+(inline?\' form-check-inline\':\'\')},[_c(\'input\',{staticClass:"form-check-input",attrs:{"type":"radio","id":myid},domProps:{"checked":checked},on:{"input":function($event){return $emit(\'input\',true)}}}),_v(" "),_c(\'label\',{staticClass:"form-check-label",attrs:{"for":myid}},[_t("default")],2)])}'),staticRenderFns:[],model:{prop:"checked",event:"input"},props:{checked:{type:Boolean,default:!1},inline:{type:Boolean,default:!1}},data(){let t="";for(let e=0;e<16;e++)t+=Math.floor(16*Math.random()).toString(16);return{myid:"radio-"+t}}}),Vue.component("bs-modal",{render:new Function('with(this){return _c(\'div\',{staticClass:"modal fade",attrs:{"tabindex":"-1"}},[_c(\'div\',{class:\'modal-dialog modal-dialog-centered\'+(size===\'md\'?\'\':\' modal-\'+size)},[_c(\'div\',{staticClass:"modal-content"},[_c(\'form\',{on:{"submit":function($event){$event.preventDefault();return $emit(\'submit\')}}},[_c(\'div\',{staticClass:"modal-header"},[_t("header",[_c(\'h5\',{staticClass:"modal-title"},[_v(_s(title))])]),_v(" "),_c(\'button\',{staticClass:"btn-close",attrs:{"type":"button","aria-label":"Close"},on:{"click":function($event){return Hide()}}})],2),_v(" "),_c(\'div\',{staticClass:"modal-body"},[_t("default")],2),_v(" "),_c(\'div\',{staticClass:"modal-footer"},[_t("footer")],2)])])])])}'),staticRenderFns:[],MyModal:null,props:{value:{type:Boolean,default:!1},title:{type:String,default:""},size:{type:String,default:"md"}},methods:{Show(){this.$options.MyModal.show()},Hide(){this.$options.MyModal.hide()}},watch:{value(t,e){t?this.$options.MyModal.show():this.$options.MyModal.hide()}},mounted(){let t=this;this.$options.MyModal=new bootstrap.Modal(this.$el),this.$el.addEventListener("shown.bs.modal",(function(e){t.$emit("input",!0)})),this.$el.addEventListener("hidden.bs.modal",(function(e){t.$emit("input",!1)})),this.value&&this.$options.MyModal.show()}}),Vue.component("b-icon",{render:new Function('with(this){return (name===\'add\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32","d":"M256 112v288M400 256H112"}})]):(name===\'check\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32","d":"M416 128L192 384l-96-96"}})]):(name===\'edit\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z","fill":"currentColor"}})]):(name===\'trash\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"stroke":"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32","d":"M80 112h352"}}),_c(\'path\',{attrs:{"d":"M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'download\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'upload\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32","d":"M320 255.79l-64-64-64 64M256 448.21V207.79"}})]):(name===\'save\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'open\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M64 192v-72a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H408a40 40 0 0140 40v40","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M479.9 226.55L463.68 392a40 40 0 01-39.93 40H88.25a40 40 0 01-39.93-40L32.1 226.55A32 32 0 0164 192h384.1a32 32 0 0131.8 34.55z","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'new\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z","fill":"none","stroke":"currentColor","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M256 56v120a32 32 0 0032 32h120","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'share\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'circle\',{attrs:{"cx":"128","cy":"256","r":"48","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'circle\',{attrs:{"cx":"384","cy":"112","r":"48","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'circle\',{attrs:{"cx":"384","cy":"400","r":"48","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32","d":"M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94"}})]):(name===\'copy\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'rect\',{attrs:{"x":"128","y":"128","width":"336","height":"336","rx":"57","ry":"57","fill":"none","stroke":"currentColor","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}})]):(name===\'warning\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}}),_c(\'path\',{attrs:{"d":"M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"}})]):(name===\'info\')?_c(\'svg\',{staticClass:"icon",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 512 512"}},[_c(\'path\',{attrs:{"d":"M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z","fill":"none","stroke":"currentColor","stroke-miterlimit":"10","stroke-width":"32"}}),_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32","d":"M220 220h32v116"}}),_c(\'path\',{attrs:{"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32","d":"M208 340h88"}}),_c(\'path\',{attrs:{"d":"M248 130a26 26 0 1026 26 26 26 0 00-26-26z"}})]):_c(\'div\',{staticClass:"icon"},[_v("Icon name \'"+_s(name)+"\' not found")])}'),staticRenderFns:[],props:{name:{required:!0,type:String}}}),Vue.component("b-amount",{render:new Function('with(this){return _c(\'input\',{directives:[{name:"validity",rawName:"v-validity",value:(BadVal ? \'Ugyldig værdi\' : validity),expression:"BadVal ? \'Ugyldig værdi\' : validity"}],staticClass:"form-control",staticStyle:{"text-align":"right","max-width":"125px"},attrs:{"type":"text"},on:{"input":function($event){return Input(false)},"change":function($event){return Input(true)}}})}'),staticRenderFns:[],props:{value:{required:!0,type:Number},validity:{default:"",type:String}},data:function(){return{BadVal:!1,myval:0}},methods:{UpdateDisplayValue(){this.$el.value=0===this.myval?"":this.$root.FormatBeløb(this.myval)},Input(t){let e=this.$el.value.split(".").join("").split(",").join(".").split(" ").join(""),n=""===e?0:Math.round(100*parseFloat(e))/100;isNaN(n)?t&&(this.BadVal=!0):(this.BadVal=!1,this.myval=n,this.$emit("input",n),t&&this.UpdateDisplayValue())}},watch:{value(t,e){t!==this.myval&&(this.myval=t,this.UpdateDisplayValue())}},mounted(){this.myval=this.value,this.UpdateDisplayValue()}}),Vue.component("b-item",{render:new Function('with(this){return _c(\'bs-modal\',{ref:"MyModal",attrs:{"size":"lg","title":"Udgift / Indtægt"},on:{"submit":function($event){return $emit(\'gem\')}},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-secondary",attrs:{"type":"button"},on:{"click":function($event){return Hide()}}},[_v("Annuller")]),_v(" "),_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"submit"}},[_c(\'b-icon\',{attrs:{"name":"check"}}),_v(" Gem")],1)]},proxy:true}])},[[(data)?_c(\'table\',{staticClass:"form"},[_c(\'tbody\',[_c(\'tr\',[_c(\'th\',[_v("Type:")]),_v(" "),_c(\'td\',{staticClass:"pad"},[_c(\'bs-radio\',{attrs:{"checked":data.udgift,"inline":""},on:{"input":function($event){data.udgift=true}}},[_v("Udgift")]),_v("   "),_c(\'bs-radio\',{attrs:{"checked":!data.udgift,"inline":""},on:{"input":function($event){data.udgift=false}}},[_v("Indtægt")])],1)]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Beskrivelse:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model.trim",value:(data.beskriv),expression:"data.beskriv",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","required":""},domProps:{"value":(data.beskriv)},on:{"input":function($event){if($event.target.composing)return;$set(data, "beskriv", $event.target.value.trim())},"blur":function($event){return $forceUpdate()}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Budgettér med:")]),_v(" "),_c(\'td\',{staticClass:"pad"},[_c(\'bs-radio\',{attrs:{"checked":!data.variabelt,"inline":""},on:{"input":function($event){data.variabelt=false}}},[_v("Et fast beløb")]),_v("   "),_c(\'bs-radio\',{attrs:{"checked":data.variabelt,"inline":""},on:{"input":function($event){data.variabelt=true}}},[_v("Et variabelt beløb")])],1)]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Beløb:")]),_v(" "),_c(\'td\',[(!data.variabelt)?_c(\'b-amount\',{attrs:{"required":""},model:{value:(data.fastbeløb),callback:function ($$v) {$set(data, "fastbeløb", $$v)},expression:"data.fastbeløb"}}):_c(\'table\',_l((4),function(ln){return _c(\'tr\',[_l((3),function(rw){return [_c(\'td\',{staticStyle:{"padding":"2px .5rem 2px 0","text-align":"right"}},[_v(_s($options.MNavn[ln*3 + rw - 4]))]),_v(" "),_c(\'td\',{style:(\'padding: 2px \'+(rw<3?\'2rem\':\'0\')+\' 2px 0\')},[_c(\'b-amount\',{attrs:{"validity":ln===1 && rw===1 && !EtVarBeløbAnført() ? \'Anfør beløb for mindst en måned\':\'\'},model:{value:(data.varbeløb[ln*3 + rw - 4]),callback:function ($$v) {$set(data.varbeløb, ln*3 + rw - 4, $$v)},expression:"data.varbeløb[ln*3 + rw - 4]"}})],1)]})],2)}),0)],1)]),_v(" "),(!data.variabelt)?_c(\'tr\',[_c(\'th\',[_v("Hyppighed:")]),_v(" "),_c(\'td\',[_c(\'select\',{directives:[{name:"model",rawName:"v-model.number",value:(data.hyppighed),expression:"data.hyppighed",modifiers:{"number":true}}],staticClass:"form-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return _n(val)}); $set(data, "hyppighed", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_c(\'option\',{attrs:{"value":"1"}},[_v("Ugentlig")]),_v(" "),_c(\'option\',{attrs:{"value":"2"}},[_v("Hver anden uge")]),_v(" "),_c(\'option\',{attrs:{"value":"3"}},[_v("Hver tredje uge")]),_v(" "),_c(\'option\',{attrs:{"value":"4"}},[_v("Hver fjerde uge")]),_v(" "),_c(\'option\',{attrs:{"value":"5"}},[_v("To gange pr. måned")]),_v(" "),_c(\'option\',{attrs:{"value":"6"}},[_v("Månedlig")]),_v(" "),_c(\'option\',{attrs:{"value":"7"}},[_v("Hver anden måned")]),_v(" "),_c(\'option\',{attrs:{"value":"8"}},[_v("Kvartalsvis")]),_v(" "),_c(\'option\',{attrs:{"value":"9"}},[_v("Tre gange årligt")]),_v(" "),_c(\'option\',{attrs:{"value":"10"}},[_v("Halvårligt")]),_v(" "),_c(\'option\',{attrs:{"value":"11"}},[_v("Årligt")]),_v(" "),_c(\'option\',{attrs:{"value":"12"}},[_v("De anførte måneder")])])])]):_e(),_v(" "),(!data.variabelt && data.hyppighed===12)?_c(\'tr\',[_c(\'th\',[_v("Betalingsmåneder:")]),_v(" "),_c(\'td\',[_c(\'table\',_l((2),function(ln){return _c(\'tr\',_l((6),function(rw){return _c(\'td\',{staticStyle:{"padding":".5rem 1rem 0 0"}},[_c(\'label\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.betalingsmåneder[ln*6 + rw - 7]),expression:"data.betalingsmåneder[ln*6 + rw - 7]"},{name:"validity",rawName:"v-validity",value:(ln===1 && rw===1 && !EnBetalingsMånedValgt() ? \'Vælg mindst en måned\':\'\'),expression:"ln===1 && rw===1 && !EnBetalingsMånedValgt() ? \'Vælg mindst en måned\':\'\'"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(data.betalingsmåneder[ln*6 + rw - 7])?_i(data.betalingsmåneder[ln*6 + rw - 7],null)>-1:(data.betalingsmåneder[ln*6 + rw - 7])},on:{"change":function($event){var $$a=data.betalingsmåneder[ln*6 + rw - 7],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_i($$a,$$v);if($$el.checked){$$i<0&&($set(data.betalingsmåneder, ln*6 + rw - 7, $$a.concat([$$v])))}else{$$i>-1&&($set(data.betalingsmåneder, ln*6 + rw - 7, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{$set(data.betalingsmåneder, ln*6 + rw - 7, $$c)}}}}),_v(" "+_s($options.MNavn[ln*6 + rw - 7])+" ")])])}),0)}),0)])]):_e(),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Første gang:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.start),expression:"data.start"}],staticClass:"form-control",attrs:{"type":"date","required":""},domProps:{"value":(data.start)},on:{"input":function($event){if($event.target.composing)return;$set(data, "start", $event.target.value)}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Slutter:")]),_v(" "),_c(\'td\',{class:data.harslut ? null :\'pad\'},[_c(\'bs-checkbox\',{attrs:{"inline":""},model:{value:(data.harslut),callback:function ($$v) {$set(data, "harslut", $$v)},expression:"data.harslut"}}),_v(" "),(data.harslut)?_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.slut),expression:"data.slut"},{name:"validity",rawName:"v-validity",value:(data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? \'Kan ikke være før første betaling\' : \'\'),expression:"data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? \'Kan ikke være før første betaling\' : \'\'"}],staticClass:"form-control d-inline-block",attrs:{"type":"date","required":""},domProps:{"value":(data.slut)},on:{"input":function($event){if($event.target.composing)return;$set(data, "slut", $event.target.value)}}}):_e()],1)])])]):_e()]],2)}'),staticRenderFns:[],props:["data"],MNavn:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],methods:{Show(){this.$refs.MyModal.Show()},Hide(){this.$refs.MyModal.Hide()},"EnBetalingsMånedValgt"(){for(let t=0;t<12;t++)if(this.data.betalingsmåneder[t])return!0;return!1},"EtVarBeløbAnført"(){for(let t=0;t<12;t++)if(0!==this.data.varbeløb[t])return!0;return!1}}}),new Vue({render:new Function('with(this){return _c(\'div\',[(this.budgetid === null)?[_c(\'a\',{staticClass:"btn btn-primary",attrs:{"href":"#nyt"}},[_c(\'b-icon\',{attrs:{"name":"new"}}),_v(" Nyt budget")],1)]:(budget===null)?[_m(0)]:[_c(\'p\',[_c(\'button\',{staticClass:"btn btn-primary",attrs:{"disabled":BudgetJSON===OldJSON || this.budget.items.length===0,"type":"button"},on:{"click":function($event){return KlikSave()}}},[_c(\'b-icon\',{attrs:{"name":"upload"}}),_v(" Gem i skyen")],1),_v(" "),(BrowserKanDele && budgetid!==\'nyt\')?_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return DelUrl()}}},[_c(\'b-icon\',{attrs:{"name":"share"}}),_v(" Del")],1):_e(),_v(" "),(budgetid!==\'nyt\')?_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();return KlikKopi()}}},[_c(\'b-icon\',{attrs:{"name":"copy"}}),_v(" Lav kopi")],1):_e(),_v(" "),(budgetid!==\'nyt\')?_c(\'button\',{staticClass:"btn btn-danger",attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();return KlikSletSky()}}},[_c(\'b-icon\',{attrs:{"name":"trash"}}),_v(" Slet fra skyen")],1):_e(),_v(" "),(budgetid!==\'nyt\')?_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return KlikNyt()}}},[_c(\'b-icon\',{attrs:{"name":"new"}}),_v(" Nyt budget")],1):_e()]),_v(" "),_c(\'hr\'),_v(" "),_c(\'table\',{staticClass:"form"},[_c(\'tbody\',[(budgetid!==\'nyt\' || this.budget.items.length>0)?_c(\'tr\',[_c(\'th\',[_v("Status:")]),_v(" "),_c(\'td\',[(BudgetJSON===OldJSON)?_c(\'div\',{staticClass:"alert alert-success d-inline-block p-1 m-0"},[_c(\'b-icon\',{attrs:{"name":"check"}}),_v(" Gemt i skyen")],1):_c(\'div\',{staticClass:"alert alert-warning d-inline-block p-1 m-0"},[_c(\'b-icon\',{attrs:{"name":"warning"}}),_v(" Ændringer ikke gemt")],1)])]):_e(),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Budget-navn:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(budget.navn),expression:"budget.navn"}],staticClass:"form-control",staticStyle:{"max-width":"40rem"},attrs:{"type":"text","required":""},domProps:{"value":(budget.navn)},on:{"input":function($event){if($event.target.composing)return;$set(budget, "navn", $event.target.value)}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Første måned:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(budget.startmåned),expression:"budget.startmåned"}],staticClass:"form-control",attrs:{"type":"month","required":""},domProps:{"value":(budget.startmåned)},on:{"input":function($event){if($event.target.composing)return;$set(budget, "startmåned", $event.target.value)}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Startsaldo:")]),_v(" "),_c(\'td\',[_c(\'b-amount\',{model:{value:(budget.startsaldo),callback:function ($$v) {$set(budget, "startsaldo", $$v)},expression:"budget.startsaldo"}})],1)])])]),_v(" "),_c(\'hr\'),_v(" "),(budget.items.length>0)?[_c(\'p\',[_v(" Visning: "),_c(\'select\',{directives:[{name:"model",rawName:"v-model",value:(Visning),expression:"Visning"}],staticClass:"form-select d-inline-block w-auto",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); Visning=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c(\'option\',{attrs:{"value":"months"}},[_v("Måned-skema")]),_v(" "),_c(\'option\',{attrs:{"value":"ledger"}},[_v("Som kontoudtog")])]),_v(" "),(Visning !==\'list\')?[_v("    Periode: "),_c(\'select\',{directives:[{name:"model",rawName:"v-model.number",value:(AntalMåneder),expression:"AntalMåneder",modifiers:{"number":true}}],staticClass:"form-select d-inline-block w-auto",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return _n(val)}); AntalMåneder=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c(\'option\',{attrs:{"value":"12"}},[_v("12 måneder")]),_v(" "),_c(\'option\',{attrs:{"value":"18"}},[_v("18 måneder")]),_v(" "),_c(\'option\',{attrs:{"value":"24"}},[_v("24 måneder")]),_v(" "),_c(\'option\',{attrs:{"value":"36"}},[_v("36 måneder")])])]:_e()],2),_v(" "),(Visning===\'months\')?_c(\'table\',{staticClass:"table table-striped",staticStyle:{"width":"auto"}},[_c(\'tbody\',[_c(\'tr\',[_c(\'th\',{attrs:{"colspan":"3"}}),_v(" "),_l((AntalMåneder),function(md){return _c(\'th\',[_v(_s(BMdNavn(md-1)))])})],2),_v(" "),_l((2),function(tp){return [_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap","font-weight":"bold"},attrs:{"colspan":AntalMåneder+1}},[_v(_s(tp===1?\'Udgifter\':\'Indtægter\'))])]),_v(" "),_l((ItemsByNavn),function(itm){return [(itm.udgift===(tp===1))?_c(\'tr\',[_c(\'td\',[_c(\'a\',{staticClass:"link-primary",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return KlikEdit(itm.id)}}},[_c(\'b-icon\',{attrs:{"name":"edit"}})],1)]),_v(" "),_c(\'td\',[_c(\'a\',{staticClass:"link-danger",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return KlikSlet(itm.id)}}},[_c(\'b-icon\',{attrs:{"name":"trash"}})],1)]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap"}},[_v(_s(itm.beskriv))]),_v(" "),_l((AntalMåneder),function(md){return _c(\'td\',{staticStyle:{"text-align":"right"}},[_v(_s(PostsMd[itm.id + \'.\' + (md-1)]===undefined ? \'\' : FormatBeløb(PostsMd[itm.id + \'.\' + (md-1)])))])})],2):_e()]})]}),_v(" "),_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap","font-weight":"bold"},attrs:{"colspan":AntalMåneder+1}},[_v("Nøgletal")])]),_v(" "),_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap"}},[_v("Startsaldo")]),_v(" "),_c(\'td\',{staticStyle:{"text-align":"right"}},[_v(_s(FormatBeløb(budget.startsaldo)))]),_v(" "),_l(((AntalMåneder-1)),function(md){return _c(\'td\',[_v(" ")])})],2),_v(" "),_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap"}},[_v("Rådighedsbeløb")]),_v(" "),_l((AntalMåneder),function(md){return _c(\'td\',{staticStyle:{"text-align":"right"},domProps:{"innerHTML":_s(BeløbHtml(RådighedMd[md-1],false))}})})],2),_v(" "),_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap"}},[_v("Ultimosaldo")]),_v(" "),_l((AntalMåneder),function(md){return _c(\'td\',{staticStyle:{"text-align":"right"},domProps:{"innerHTML":_s(BeløbHtml(UltimoMd[md-1],true))}})})],2),_v(" "),_c(\'tr\',[_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',[_v(" ")]),_v(" "),_c(\'td\',{staticStyle:{"white-space":"nowrap"}},[_v("Laveste saldo")]),_v(" "),_l((AntalMåneder),function(md){return _c(\'td\',{staticStyle:{"text-align":"right"},domProps:{"innerHTML":_s(BeløbHtml(LavesteMd[md-1],true))}})})],2)],2)]):_c(\'table\',{staticClass:"table table-striped",staticStyle:{"width":"auto"}},[_c(\'tbody\',[_m(1),_v(" "),_l((Posts),function(p){return _c(\'tr\',[_c(\'td\',[(p.itemid>0)?_c(\'a\',{staticClass:"link-primary",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return KlikEdit(p.itemid)}}},[_c(\'b-icon\',{attrs:{"name":"edit"}})],1):_e()]),_v(" "),_c(\'td\',[(p.itemid>0)?_c(\'a\',{staticClass:"link-danger",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return KlikSlet(p.itemid)}}},[_c(\'b-icon\',{attrs:{"name":"trash"}})],1):_e()]),_v(" "),_c(\'td\',[_v(_s(FormatDate(p.dato)))]),_v(" "),_c(\'td\',[_v(_s(p.beskriv))]),_v(" "),_c(\'td\',{staticStyle:{"text-align":"right"},domProps:{"innerHTML":_s(BeløbHtml(p.beløb,false))}}),_v(" "),_c(\'td\',{staticStyle:{"text-align":"right"},domProps:{"innerHTML":_s(BeløbHtml(p.balance,true))}})])})],2)]),_v(" "),_c(\'p\',[_c(\'b\',[_v("Gns. udgift pr. måned:")]),_v(" "+_s(FormatBeløb(GnsUdgift))),_c(\'br\'),_v(" "),_c(\'b\',[_v("Gns. indtægt pr. måned:")]),_v(" "+_s(FormatBeløb(GnsIndtægt))),_c(\'br\'),_v(" "),_c(\'b\',[_v("Gns. rådighedsbeløb måned:")]),_v(" "),_c(\'span\',{domProps:{"innerHTML":_s(BeløbHtml(GnsIndtægt-GnsUdgift,true))}})]),_v(" "),_c(\'hr\')]:_e(),_v(" "),_c(\'p\',[_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return KlikEdit(0)}}},[_c(\'b-icon\',{attrs:{"name":"add"}}),_v(" Tilføj udgift/indtægt")],1)])],_v(" "),_c(\'b-item\',{ref:"BItem",attrs:{"data":EditData},on:{"gem":function($event){return GemItem()}}}),_v(" "),_c(\'bs-modal\',{ref:"ModalGemt",attrs:{"title":"Dit budget er nu gemt i skyen"},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-primary",staticStyle:{"min-width":"6rem"},attrs:{"type":"button","data-bs-dismiss":"modal"}},[_v("OK")])]},proxy:true}])},[[_c(\'p\',[_v(" Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere."),_c(\'br\'),_v(" Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted. ")]),_v(" "),_c(\'p\',[_v(" Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen. Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet. Overvej derfor at sende dem en kopi (brug \\"Lav kopi\\" funktionen, gem, og send dem så den nye adresse). ")])]],2),_v(" "),_c(\'bs-modal\',{ref:"ModalKopi",attrs:{"title":"Lav Kopi"},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-primary",staticStyle:{"min-width":"6rem"},attrs:{"type":"button","data-bs-dismiss":"modal"}},[_v("OK")])]},proxy:true}])},[[_c(\'p\',[_v("Du arbejder nu i en kopi af dit tidligere budget.")]),_v(" "),_c(\'p\',[_v("Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.")])]],2),_v(" "),_c(\'bs-modal\',{ref:"ModalNyt",attrs:{"title":"Nyt budget"},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-primary",staticStyle:{"min-width":"6rem"},attrs:{"type":"button","data-bs-dismiss":"modal"}},[_v("OK")])]},proxy:true}])},[[_c(\'p\',[_v("Du arbejder nu i et nyt budget.")]),_v(" "),_c(\'p\',[_v("Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.")])]],2),_v(" "),_c(\'bs-modal\',{ref:"ModalSletSky",attrs:{"title":"Budget er slettet fra skyen"},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-primary",staticStyle:{"min-width":"6rem"},attrs:{"type":"button","data-bs-dismiss":"modal"}},[_v("OK")])]},proxy:true}])},[[_c(\'p\',[_v("Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.")]),_v(" "),_c(\'p\',[_v("Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på \\"Gem i skyen\\" knappen. Budgettet vil så blive gemt igen på en ny adresse.")])]],2)],2)}'),staticRenderFns:[new Function('with(this){return _c(\'div\',{staticClass:"spinner-border text-primary",attrs:{"role":"status"}},[_c(\'span\',{staticClass:"visually-hidden"},[_v("Loading...")])])}'),new Function('with(this){return _c(\'tr\',[_c(\'th\',{attrs:{"colspan":"2"}}),_v(" "),_c(\'th\',{staticStyle:{"text-align":"left"}},[_v("Dato")]),_v(" "),_c(\'th\',{staticStyle:{"text-align":"left"}},[_v("Beskrivelse")]),_v(" "),_c(\'th\',{staticStyle:{"text-align":"right"}},[_v("Beløb")]),_v(" "),_c(\'th\',{staticStyle:{"text-align":"right"}},[_v("Saldo")])])}')],el:"#app",data:{budgetid:null,budget:null,EditData:null,EditID:0,Visning:"months","AntalMåneder":12,FilNavn:"budget.json",OldJSON:null},computed:{BrowserKanDele:()=>void 0!==navigator.share,BudgetJSON(){return JSON.stringify(this.budget)},ItemsByNavn(){return this.budget.items.sort((function(t,e){let n=t.beskriv.toLowerCase(),a=e.beskriv.toLowerCase();return n<a?-1:n>a?1:0}))},FraDato(){return new Date(parseInt(this.budget.startmåned.substr(0,4)),parseInt(this.budget.startmåned.substr(5,2))-1,1)},Posts(){let t=this.FraDato.getFullYear(),e=this.FraDato.getMonth()+this.AntalMåneder-1;for(;e>11;)t+=1,e-=12;let n=new Date(t,e,LastDayOfMonth(t,e));return LavPosteringer(this.budget.items,this.FraDato,n,this.budget.startsaldo)},PostsMd(){let t,e,n=12*this.FraDato.getFullYear()+this.FraDato.getMonth();for(p of(rv={},this.Posts))e=12*p.dato.getFullYear()+p.dato.getMonth()-n,t=p.itemid+"."+e,rv[t]=void 0===rv[t]?p.beløb:rv[t]+p.beløb;return rv},"RådighedMd"(){let t,e=12*this.FraDato.getFullYear()+this.FraDato.getMonth(),n=[];for(let t=0;t<this.AntalMåneder;t++)n[t]=0;for(p of this.Posts)0!==p.itemid&&(t=12*p.dato.getFullYear()+p.dato.getMonth()-e,n[t]=void 0===n[t]?p.beløb:n[t]+p.beløb);return n},UltimoMd(){let t,e=12*this.FraDato.getFullYear()+this.FraDato.getMonth(),n=[],a=0,r=0;for(let t=0;t<this.AntalMåneder;t++)n[t]=0;for(p of this.Posts){for(t=12*p.dato.getFullYear()+p.dato.getMonth()-e;t>a;)n[a]=r,a+=1;r=p.balance}for(;this.AntalMåneder>a;)n[a]=r,a+=1;return n},LavesteMd(){let t,e=12*this.FraDato.getFullYear()+this.FraDato.getMonth(),n=[],a=0,r=0;for(let t=0;t<this.AntalMåneder;t++)n[t]=0;for(p of this.Posts){for(0===p.itemid&&(r=p.beløb),t=12*p.dato.getFullYear()+p.dato.getMonth()-e;t>a;)n[a]=r,r=this.UltimoMd[a],a+=1;p.balance<r&&(r=p.balance)}for(;this.AntalMåneder>a;)n[a]=r,r=this.UltimoMd[a],a+=1;return n},GnsUdgift(){let t=0;for(p of this.Posts)p.udgift&&(t+=p.beløb);return-t/this.AntalMåneder},"GnsIndtægt"(){let t=0;for(p of this.Posts)p.udgift||(t+=p.beløb);return t-=this.budget.startsaldo,t/this.AntalMåneder}},methods:{"IkkeÆndret"(){this.OldJSON=this.BudgetJSON},LavNyt:()=>({navn:"","startmåned":(new Date).getFullYear()+"-"+((new Date).getMonth()+101).toString().substr(1),startsaldo:0,items:[],nextid:1}),"FormatBeløb"(t){let e=t.toFixed(2).replace(".",","),n=e.substr(e.length-3);for(e=e.substr(0,e.length-3);e.length>4||4===e.length&&"-"!==e.charAt(0);)n="."+e.substr(e.length-3)+n,e=e.substr(0,e.length-3);return e+n},"BeløbHtml"(t,e){return t<0&&e?'<span style="color:red">'+this.FormatBeløb(t)+"</span>":this.FormatBeløb(t,!1)},BMdNavn(t){let e=this.FraDato.getFullYear(),n=this.FraDato.getMonth()+t;for(;n>11;)e+=1,n-=12;return["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"][n]+" "+e.toString().substr(2)},KlikEdit(t){if(0===t)this.EditID=0,this.EditData={id:0,udgift:!0,beskriv:"",variabelt:!1,"fastbeløb":0,"varbeløb":[0,0,0,0,0,0,0,0,0,0,0,0],hyppighed:6,"betalingsmåneder":[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],start:"",harslut:!1,slut:""};else{let e=this.budget.items.find((e=>e.id===t));this.EditID=t,this.EditData=JSON.parse(JSON.stringify(e))}this.$refs.BItem.Show()},KlikSlet(t){let e=this.budget.items.findIndex((e=>e.id===t));e<0||this.budget.items.splice(e,1)},GemItem(){if(0===this.EditID)this.EditID=this.budget.nextid++,this.EditData.id=this.EditID,this.budget.items.push(this.EditData);else{let t=this.budget.items.findIndex((t=>t.id===this.EditID));Vue.set(this.budget.items,t,this.EditData)}this.$refs.BItem.Hide()},FormatDate:t=>(t.getDate()+100).toString().substr(1)+"."+(t.getMonth()+101).toString().substr(1)+"."+t.getFullYear(),async KlikSave(){if("nyt"===this.budgetid||this.BudgetJSON!==this.OldJSON){if("nyt"===this.budgetid){let t=await fetch("/api/budget",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.budget)});if(201!==t.status)return void alert("Unexpected response status code ("+t.status+") received");this.budgetid=t.headers.get("Location").substr(1),document.location.hash=this.budgetid,this.$refs.ModalGemt.Show()}else{let t=await fetch("/api/budget/"+this.budgetid,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.budget)});if(!t.ok)return void alert("Unexpected response (status code "+t.status+") received")}this.IkkeÆndret()}},async KlikSletSky(){if("nyt"===this.budgetid)return;let t=await fetch("/api/budget/"+this.budgetid,{method:"DELETE"});204===t.status?(this.budgetid="nyt",document.location.hash="nyt",this.OldJSON="dummy",this.$refs.ModalSletSky.Show()):alert("Unexpected response status code ("+t.status+") received")},DelUrl(){navigator.share({title:"Mit-Budget.dk - "+this.budget.navn,url:window.location.href})},KlikNyt(){this.budget=this.LavNyt(),this.IkkeÆndret(),this.budgetid="nyt",document.location.hash="nyt",this.$refs.ModalNyt.Show()},KlikKopi(){this.budget.navn+=" (kopi)",this.budgetid="nyt",document.location.hash="nyt",this.$refs.ModalKopi.Show()},async HashChanged(){let t=window.location.hash,e=t.length<=1?null:t.substr(1);if(e===this.budgetid)return;if(document.getElementById("base").style.maxWidth=null===e?"960px":"",document.getElementById("intro").style.display=null===e?"block":"none",document.body.style.backgroundColor=null===e?"#ccc":"white",this.budgetid=e,null===e)return;if("nyt"===e)return this.budget=this.LavNyt(),void this.IkkeÆndret();this.budget=null;let n=await fetch("/api/budget/"+e);return 404===n.status?(alert("Det angive budget findes ikke!"),this.budgetid=null,void(document.location.hash="")):200!==n.status?(alert("Unexpected response status code ("+n.status+") received"),this.budgetid=null,void(document.location.hash="")):(this.budget=await n.json(),void this.IkkeÆndret())}},mounted(){let t=this;window.addEventListener("beforeunload",(function(e){null!==t.budgetid&&t.OldJSON!==t.BudgetJSON&&(e.returnValue="Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?")})),window.addEventListener("hashchange",this.HashChanged,!1),this.HashChanged()},watch:{"budget.navn":function(t,e){document.title="Mit-Budget.dk"+(null===this.budget||""===this.budget.navn?"":" - "+this.budget.navn)}}});