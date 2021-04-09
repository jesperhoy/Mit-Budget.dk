Vue.component('b-amount',{render:new Function("with(this){return _c('input',{directives:[{name:\"validity\",rawName:\"v-validity\",value:(BadVal ? 'Ugyldig værdi' : validity),expression:\"BadVal ? 'Ugyldig værdi' : validity\"}],staticClass:\"form-control\",staticStyle:{\"text-align\":\"right\",\"max-width\":\"125px\"},attrs:{\"type\":\"text\"},on:{\"input\":function($event){return Input(false)},\"change\":function($event){return Input(true)}}})}"),
staticRenderFns:[],
props: {
      value: {
        required:true,
        type: Number        
      },
      validity: {
        default: '',
        type: String
      }
    },
    data: function () {
      return {
        BadVal: false,
        myval: 0
      }
    },
    methods: {
      UpdateDisplayValue() {
        this.$el.value = this.myval === 0 ? '' : this.$root.FormatBeløb(this.myval);
      },
      Input(changed) {
        let vs = this.$el.value.split('.').join('').split(',').join('.').split(' ').join('');
        let v = vs === '' ? 0 : Math.round(parseFloat(vs) * 100) / 100;
        if (isNaN(v)) {
          if(changed) this.BadVal = true;
          return;
        }
        this.BadVal = false;
        this.myval = v;
        this.$emit('input', v);
        if (changed) this.UpdateDisplayValue();
      },
    },
    watch: {
      value(ny, gl) {
        if (ny === this.myval) return;
        this.myval = ny;
        this.UpdateDisplayValue();
      }
    },
    mounted() {
      this.myval = this.value;
      this.UpdateDisplayValue();
    }
});