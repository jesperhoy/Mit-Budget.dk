﻿export default {render:new Function('with(this){return _c(\'bs-modal\',{ref:"MyModal",attrs:{"size":"lg","title":"Udgift / Indtægt"},on:{"submit":function($event){return $emit(\'gem\')}},scopedSlots:_u([{key:"footer",fn:function(){return [_c(\'button\',{staticClass:"btn btn-secondary",attrs:{"type":"button"},on:{"click":function($event){return Hide()}}},[_v("Annuller")]),_v(" "),_c(\'button\',{staticClass:"btn btn-primary",attrs:{"type":"submit"}},[_c(\'b-icon\',{attrs:{"name":"check"}}),_v(" Gem")],1)]},proxy:true}])},[[(data)?_c(\'table\',{staticClass:"form"},[_c(\'tbody\',[_c(\'tr\',[_c(\'th\',[_v("Type:")]),_v(" "),_c(\'td\',{staticClass:"pad"},[_c(\'bs-radio\',{attrs:{"checked":data.udgift,"inline":""},on:{"input":function($event){data.udgift=true}}},[_v("Udgift")]),_v("   "),_c(\'bs-radio\',{attrs:{"checked":!data.udgift,"inline":""},on:{"input":function($event){data.udgift=false}}},[_v("Indtægt")])],1)]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Beskrivelse:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model.trim",value:(data.beskriv),expression:"data.beskriv",modifiers:{"trim":true}}],staticClass:"form-control",attrs:{"type":"text","required":""},domProps:{"value":(data.beskriv)},on:{"input":function($event){if($event.target.composing)return;$set(data, "beskriv", $event.target.value.trim())},"blur":function($event){return $forceUpdate()}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Budgettér med:")]),_v(" "),_c(\'td\',{staticClass:"pad"},[_c(\'bs-radio\',{attrs:{"checked":!data.variabelt,"inline":""},on:{"input":function($event){data.variabelt=false}}},[_v("Et fast beløb")]),_v("   "),_c(\'bs-radio\',{attrs:{"checked":data.variabelt,"inline":""},on:{"input":function($event){data.variabelt=true}}},[_v("Et variabelt beløb")])],1)]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Beløb:")]),_v(" "),_c(\'td\',[(!data.variabelt)?_c(\'b-amount\',{attrs:{"required":""},model:{value:(data.fastbeløb),callback:function ($$v) {$set(data, "fastbeløb", $$v)},expression:"data.fastbeløb"}}):_c(\'table\',_l((4),function(ln){return _c(\'tr\',[_l((3),function(rw){return [_c(\'td\',{staticStyle:{"padding":"2px .5rem 2px 0","text-align":"right"}},[_v(_s($options.MNavn[ln*3 + rw - 4]))]),_v(" "),_c(\'td\',{style:(\'padding: 2px \'+(rw<3?\'2rem\':\'0\')+\' 2px 0\')},[_c(\'b-amount\',{attrs:{"validity":ln===1 && rw===1 && !EtVarBeløbAnført() ? \'Anfør beløb for mindst en måned\':\'\'},model:{value:(data.varbeløb[ln*3 + rw - 4]),callback:function ($$v) {$set(data.varbeløb, ln*3 + rw - 4, $$v)},expression:"data.varbeløb[ln*3 + rw - 4]"}})],1)]})],2)}),0)],1)]),_v(" "),(!data.variabelt)?_c(\'tr\',[_c(\'th\',[_v("Hyppighed:")]),_v(" "),_c(\'td\',[_c(\'select\',{directives:[{name:"model",rawName:"v-model.number",value:(data.hyppighed),expression:"data.hyppighed",modifiers:{"number":true}}],staticClass:"form-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return _n(val)}); $set(data, "hyppighed", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_c(\'option\',{attrs:{"value":"1"}},[_v("Ugentlig")]),_v(" "),_c(\'option\',{attrs:{"value":"2"}},[_v("Hver anden uge")]),_v(" "),_c(\'option\',{attrs:{"value":"3"}},[_v("Hver tredje uge")]),_v(" "),_c(\'option\',{attrs:{"value":"4"}},[_v("Hver fjerde uge")]),_v(" "),_c(\'option\',{attrs:{"value":"5"}},[_v("To gange pr. måned")]),_v(" "),_c(\'option\',{attrs:{"value":"6"}},[_v("Månedlig")]),_v(" "),_c(\'option\',{attrs:{"value":"7"}},[_v("Hver anden måned")]),_v(" "),_c(\'option\',{attrs:{"value":"8"}},[_v("Kvartalsvis")]),_v(" "),_c(\'option\',{attrs:{"value":"9"}},[_v("Tre gange årligt")]),_v(" "),_c(\'option\',{attrs:{"value":"10"}},[_v("Halvårligt")]),_v(" "),_c(\'option\',{attrs:{"value":"11"}},[_v("Årligt")]),_v(" "),_c(\'option\',{attrs:{"value":"12"}},[_v("De anførte måneder")])])])]):_e(),_v(" "),(!data.variabelt && data.hyppighed===12)?_c(\'tr\',[_c(\'th\',[_v("Betalingsmåneder:")]),_v(" "),_c(\'td\',[_c(\'table\',_l((2),function(ln){return _c(\'tr\',_l((6),function(rw){return _c(\'td\',{staticStyle:{"padding":".5rem 1rem 0 0"}},[_c(\'label\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.betalingsmåneder[ln*6 + rw - 7]),expression:"data.betalingsmåneder[ln*6 + rw - 7]"},{name:"validity",rawName:"v-validity",value:(ln===1 && rw===1 && !EnBetalingsMånedValgt() ? \'Vælg mindst en måned\':\'\'),expression:"ln===1 && rw===1 && !EnBetalingsMånedValgt() ? \'Vælg mindst en måned\':\'\'"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(data.betalingsmåneder[ln*6 + rw - 7])?_i(data.betalingsmåneder[ln*6 + rw - 7],null)>-1:(data.betalingsmåneder[ln*6 + rw - 7])},on:{"change":function($event){var $$a=data.betalingsmåneder[ln*6 + rw - 7],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_i($$a,$$v);if($$el.checked){$$i<0&&($set(data.betalingsmåneder, ln*6 + rw - 7, $$a.concat([$$v])))}else{$$i>-1&&($set(data.betalingsmåneder, ln*6 + rw - 7, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{$set(data.betalingsmåneder, ln*6 + rw - 7, $$c)}}}}),_v(" "+_s($options.MNavn[ln*6 + rw - 7])+" ")])])}),0)}),0)])]):_e(),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Første gang:")]),_v(" "),_c(\'td\',[_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.start),expression:"data.start"}],staticClass:"form-control",attrs:{"type":"date","required":""},domProps:{"value":(data.start)},on:{"input":function($event){if($event.target.composing)return;$set(data, "start", $event.target.value)}}})])]),_v(" "),_c(\'tr\',[_c(\'th\',[_v("Slutter:")]),_v(" "),_c(\'td\',{class:data.harslut ? null :\'pad\'},[_c(\'bs-checkbox\',{attrs:{"inline":""},model:{value:(data.harslut),callback:function ($$v) {$set(data, "harslut", $$v)},expression:"data.harslut"}}),_v(" "),(data.harslut)?_c(\'input\',{directives:[{name:"model",rawName:"v-model",value:(data.slut),expression:"data.slut"},{name:"validity",rawName:"v-validity",value:(data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? \'Kan ikke være før første betaling\' : \'\'),expression:"data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? \'Kan ikke være før første betaling\' : \'\'"}],staticClass:"form-control d-inline-block",attrs:{"type":"date","required":""},domProps:{"value":(data.slut)},on:{"input":function($event){if($event.target.composing)return;$set(data, "slut", $event.target.value)}}}):_e()],1)])])]):_e()]],2)}'),
staticRenderFns:[],
    props: ['data'],
    MNavn: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    methods: {
      Show() {
        this.$refs.MyModal.Show();
      },
      Hide() {
        this.$refs.MyModal.Hide();
      },
      EnBetalingsMånedValgt() {
        for (let i = 0; i < 12; i++) {
          if (this.data.betalingsmåneder[i]) return true;
        }
        return false;
      },
      EtVarBeløbAnført() {
        for (let i = 0; i < 12; i++) {
          if (this.data.varbeløb[i] !== 0) return true;
        }
        return false;
      }
    }
}