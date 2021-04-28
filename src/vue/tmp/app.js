new Vue({render:new Function("with(this){return _c('div',[(this.budgetid === null)?[_c('a',{staticClass:\"btn btn-primary\",attrs:{\"href\":\"#nyt\"}},[_c('b-icon',{attrs:{\"name\":\"new\"}}),_v(\" Nyt budget\")],1)]:(budget===null)?[_m(0)]:[_c('p',[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"disabled\":BudgetJSON===OldJSON || this.budget.items.length===0,\"type\":\"button\"},on:{\"click\":function($event){return KlikSave()}}},[_c('b-icon',{attrs:{\"name\":\"upload\"}}),_v(\" Gem i skyen\")],1),_v(\" \"),(BrowserKanDele && budgetid!=='nyt')?_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return DelUrl()}}},[_c('b-icon',{attrs:{\"name\":\"share\"}}),_v(\" Del\")],1):_e(),_v(\" \"),(budgetid!=='nyt')?_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){$event.preventDefault();return KlikKopi()}}},[_c('b-icon',{attrs:{\"name\":\"copy\"}}),_v(\" Lav kopi\")],1):_e(),_v(\" \"),(budgetid!=='nyt')?_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){$event.preventDefault();return KlikSletSky()}}},[_c('b-icon',{attrs:{\"name\":\"trash\"}}),_v(\" Slet fra skyen\")],1):_e(),_v(\" \"),(budgetid!=='nyt')?_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return KlikNyt()}}},[_c('b-icon',{attrs:{\"name\":\"new\"}}),_v(\" Nyt budget\")],1):_e()]),_v(\" \"),_c('hr'),_v(\" \"),_c('table',{staticClass:\"form\"},[_c('tbody',[(budgetid!=='nyt' || this.budget.items.length>0)?_c('tr',[_c('th',[_v(\"Status:\")]),_v(\" \"),_c('td',[(BudgetJSON===OldJSON)?_c('div',{staticClass:\"alert alert-success d-inline-block p-1 m-0\"},[_c('b-icon',{attrs:{\"name\":\"check\"}}),_v(\" Gemt i skyen\")],1):_c('div',{staticClass:\"alert alert-warning d-inline-block p-1 m-0\"},[_c('b-icon',{attrs:{\"name\":\"warning\"}}),_v(\" Ændringer ikke gemt\")],1)])]):_e(),_v(\" \"),_c('tr',[_c('th',[_v(\"Budget-navn:\")]),_v(\" \"),_c('td',[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(budget.navn),expression:\"budget.navn\"}],staticClass:\"form-control\",staticStyle:{\"max-width\":\"40rem\"},attrs:{\"type\":\"text\",\"required\":\"\"},domProps:{\"value\":(budget.navn)},on:{\"input\":function($event){if($event.target.composing)return;$set(budget, \"navn\", $event.target.value)}}})])]),_v(\" \"),_c('tr',[_c('th',[_v(\"Første måned:\")]),_v(\" \"),_c('td',[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(budget.startmåned),expression:\"budget.startmåned\"}],staticClass:\"form-control\",attrs:{\"type\":\"month\",\"required\":\"\"},domProps:{\"value\":(budget.startmåned)},on:{\"input\":function($event){if($event.target.composing)return;$set(budget, \"startmåned\", $event.target.value)}}})])]),_v(\" \"),_c('tr',[_c('th',[_v(\"Startsaldo:\")]),_v(\" \"),_c('td',[_c('b-amount',{model:{value:(budget.startsaldo),callback:function ($$v) {$set(budget, \"startsaldo\", $$v)},expression:\"budget.startsaldo\"}})],1)])])]),_v(\" \"),_c('hr'),_v(\" \"),(budget.items.length>0)?[_c('p',[_v(\" Visning: \"),_c('select',{directives:[{name:\"model\",rawName:\"v-model\",value:(Visning),expression:\"Visning\"}],staticClass:\"form-select d-inline-block w-auto\",on:{\"change\":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = \"_value\" in o ? o._value : o.value;return val}); Visning=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{\"value\":\"months\"}},[_v(\"Måned-skema\")]),_v(\" \"),_c('option',{attrs:{\"value\":\"ledger\"}},[_v(\"Som kontoudtog\")])]),_v(\" \"),(Visning !=='list')?[_v(\"    Periode: \"),_c('select',{directives:[{name:\"model\",rawName:\"v-model.number\",value:(AntalMåneder),expression:\"AntalMåneder\",modifiers:{\"number\":true}}],staticClass:\"form-select d-inline-block w-auto\",on:{\"change\":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = \"_value\" in o ? o._value : o.value;return _n(val)}); AntalMåneder=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{\"value\":\"12\"}},[_v(\"12 måneder\")]),_v(\" \"),_c('option',{attrs:{\"value\":\"18\"}},[_v(\"18 måneder\")]),_v(\" \"),_c('option',{attrs:{\"value\":\"24\"}},[_v(\"24 måneder\")]),_v(\" \"),_c('option',{attrs:{\"value\":\"36\"}},[_v(\"36 måneder\")])])]:_e()],2),_v(\" \"),(Visning==='months')?_c('table',{staticClass:\"table\",staticStyle:{\"width\":\"auto\"}},[_c('tbody',[_c('tr',[_c('th',{attrs:{\"colspan\":\"3\"}}),_v(\" \"),_l((AntalMåneder),function(md){return _c('th',[_v(_s(BMdNavn(md-1)))])})],2),_v(\" \"),_l((2),function(tp){return [_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\",\"font-weight\":\"bold\"},attrs:{\"colspan\":AntalMåneder+1}},[_v(_s(tp===1?'Udgifter':'Indtægter'))])]),_v(\" \"),_l((ItemsByNavn),function(itm){return [(itm.udgift===(tp===1))?_c('tr',[_c('td',[_c('a',{staticClass:\"link-primary\",attrs:{\"href\":\"#\"},on:{\"click\":function($event){$event.preventDefault();return KlikEdit(itm.id)}}},[_c('b-icon',{attrs:{\"name\":\"edit\"}})],1)]),_v(\" \"),_c('td',[_c('a',{staticClass:\"link-danger\",attrs:{\"href\":\"#\"},on:{\"click\":function($event){$event.preventDefault();return KlikSlet(itm.id)}}},[_c('b-icon',{attrs:{\"name\":\"trash\"}})],1)]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\"}},[_v(_s(itm.beskriv))]),_v(\" \"),_l((AntalMåneder),function(md){return _c('td',{staticStyle:{\"text-align\":\"right\"}},[_v(_s(PostsMd[itm.id + '.' + (md-1)]===undefined ? '' : FormatBeløb(PostsMd[itm.id + '.' + (md-1)])))])})],2):_e()]})]}),_v(\" \"),_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\",\"font-weight\":\"bold\"},attrs:{\"colspan\":AntalMåneder+1}},[_v(\"Nøgletal\")])]),_v(\" \"),_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\"}},[_v(\"Startsaldo\")]),_v(\" \"),_c('td',{staticStyle:{\"text-align\":\"right\"}},[_v(_s(FormatBeløb(budget.startsaldo)))]),_v(\" \"),_l(((AntalMåneder-1)),function(md){return _c('td',[_v(\" \")])})],2),_v(\" \"),_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\"}},[_v(\"Rådighedsbeløb\")]),_v(\" \"),_l((AntalMåneder),function(md){return _c('td',{staticStyle:{\"text-align\":\"right\"},domProps:{\"innerHTML\":_s(BeløbHtml(RådighedMd[md-1],false))}})})],2),_v(\" \"),_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\"}},[_v(\"Ultimosaldo\")]),_v(\" \"),_l((AntalMåneder),function(md){return _c('td',{staticStyle:{\"text-align\":\"right\"},domProps:{\"innerHTML\":_s(BeløbHtml(UltimoMd[md-1],true))}})})],2),_v(\" \"),_c('tr',[_c('td',[_v(\" \")]),_v(\" \"),_c('td',[_v(\" \")]),_v(\" \"),_c('td',{staticStyle:{\"white-space\":\"nowrap\"}},[_v(\"Laveste saldo\")]),_v(\" \"),_l((AntalMåneder),function(md){return _c('td',{staticStyle:{\"text-align\":\"right\"},domProps:{\"innerHTML\":_s(BeløbHtml(LavesteMd[md-1],true))}})})],2)],2)]):_c('table',{staticClass:\"table\",staticStyle:{\"width\":\"auto\"}},[_c('tbody',[_m(1),_v(\" \"),_l((Posts),function(p){return _c('tr',[_c('td',[(p.itemid>0)?_c('a',{staticClass:\"link-primary\",attrs:{\"href\":\"#\"},on:{\"click\":function($event){$event.preventDefault();return KlikEdit(p.itemid)}}},[_c('b-icon',{attrs:{\"name\":\"edit\"}})],1):_e()]),_v(\" \"),_c('td',[(p.itemid>0)?_c('a',{staticClass:\"link-danger\",attrs:{\"href\":\"#\"},on:{\"click\":function($event){$event.preventDefault();return KlikSlet(p.itemid)}}},[_c('b-icon',{attrs:{\"name\":\"trash\"}})],1):_e()]),_v(\" \"),_c('td',[_v(_s(FormatDate(p.dato)))]),_v(\" \"),_c('td',[_v(_s(p.beskriv))]),_v(\" \"),_c('td',{staticStyle:{\"text-align\":\"right\"},domProps:{\"innerHTML\":_s(BeløbHtml(p.beløb,false))}}),_v(\" \"),_c('td',{staticStyle:{\"text-align\":\"right\"},domProps:{\"innerHTML\":_s(BeløbHtml(p.balance,true))}})])})],2)]),_v(\" \"),_c('p',[_c('b',[_v(\"Gns. udgift pr. måned:\")]),_v(\" \"+_s(FormatBeløb(GnsUdgift))),_c('br'),_v(\" \"),_c('b',[_v(\"Gns. indtægt pr. måned:\")]),_v(\" \"+_s(FormatBeløb(GnsIndtægt))),_c('br'),_v(\" \"),_c('b',[_v(\"Gns. rådighedsbeløb måned:\")]),_v(\" \"),_c('span',{domProps:{\"innerHTML\":_s(BeløbHtml(GnsIndtægt-GnsUdgift,true))}})]),_v(\" \"),_c('hr')]:_e(),_v(\" \"),_c('p',[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return KlikEdit(0)}}},[_c('b-icon',{attrs:{\"name\":\"add\"}}),_v(\" Tilføj udgift/indtægt\")],1)])],_v(\" \"),_c('b-item',{ref:\"BItem\",attrs:{\"data\":EditData},on:{\"gem\":function($event){return GemItem()}}}),_v(\" \"),_c('bs-modal',{ref:\"ModalGemt\",attrs:{\"title\":\"Dit budget er nu gemt i skyen\"},scopedSlots:_u([{key:\"footer\",fn:function(){return [_c('button',{staticClass:\"btn btn-primary\",staticStyle:{\"min-width\":\"6rem\"},attrs:{\"type\":\"button\",\"data-bs-dismiss\":\"modal\"}},[_v(\"OK\")])]},proxy:true}])},[[_c('p',[_v(\" Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.\"),_c('br'),_v(\" Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted. \")]),_v(\" \"),_c('p',[_v(\" Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen. Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet. Overvej derfor at sende dem en kopi (brug \\\"Lav kopi\\\" funktionen, gem, og send dem så den nye adresse). \")])]],2),_v(\" \"),_c('bs-modal',{ref:\"ModalKopi\",attrs:{\"title\":\"Lav Kopi\"},scopedSlots:_u([{key:\"footer\",fn:function(){return [_c('button',{staticClass:\"btn btn-primary\",staticStyle:{\"min-width\":\"6rem\"},attrs:{\"type\":\"button\",\"data-bs-dismiss\":\"modal\"}},[_v(\"OK\")])]},proxy:true}])},[[_c('p',[_v(\"Du arbejder nu i en kopi af dit tidligere budget.\")]),_v(\" \"),_c('p',[_v(\"Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.\")])]],2),_v(\" \"),_c('bs-modal',{ref:\"ModalNyt\",attrs:{\"title\":\"Nyt budget\"},scopedSlots:_u([{key:\"footer\",fn:function(){return [_c('button',{staticClass:\"btn btn-primary\",staticStyle:{\"min-width\":\"6rem\"},attrs:{\"type\":\"button\",\"data-bs-dismiss\":\"modal\"}},[_v(\"OK\")])]},proxy:true}])},[[_c('p',[_v(\"Du arbejder nu i et nyt budget.\")]),_v(\" \"),_c('p',[_v(\"Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.\")])]],2),_v(\" \"),_c('bs-modal',{ref:\"ModalSletSky\",attrs:{\"title\":\"Budget er slettet fra skyen\"},scopedSlots:_u([{key:\"footer\",fn:function(){return [_c('button',{staticClass:\"btn btn-primary\",staticStyle:{\"min-width\":\"6rem\"},attrs:{\"type\":\"button\",\"data-bs-dismiss\":\"modal\"}},[_v(\"OK\")])]},proxy:true}])},[[_c('p',[_v(\"Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.\")]),_v(\" \"),_c('p',[_v(\"Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på \\\"Gem i skyen\\\" knappen. Budgettet vil så blive gemt igen på en ny adresse.\")])]],2)],2)}"),
staticRenderFns:[new Function("with(this){return _c('div',{staticClass:\"spinner-border text-primary\",attrs:{\"role\":\"status\"}},[_c('span',{staticClass:\"visually-hidden\"},[_v(\"Loading...\")])])}"),new Function("with(this){return _c('tr',[_c('th',{attrs:{\"colspan\":\"2\"}}),_v(\" \"),_c('th',{staticStyle:{\"text-align\":\"left\"}},[_v(\"Dato\")]),_v(\" \"),_c('th',{staticStyle:{\"text-align\":\"left\"}},[_v(\"Beskrivelse\")]),_v(\" \"),_c('th',{staticStyle:{\"text-align\":\"right\"}},[_v(\"Beløb\")]),_v(\" \"),_c('th',{staticStyle:{\"text-align\":\"right\"}},[_v(\"Saldo\")])])}")],
el: '#app',
    data: {
      budgetid: null,
      budget: null,
      EditData: null,
      EditID:0,
      Visning: "months",
      AntalMåneder: 12,
      FilNavn: 'budget.json',
      OldJSON: null,
    },
    computed: {
      BrowserKanDele() {
        return navigator.share !== undefined;
      },
      BudgetJSON() {
        return JSON.stringify(this.budget);
      },
      ItemsByNavn() {       
        return this.budget.items.sort(function(a, b) {
          let aa = a.beskriv.toLowerCase();
          let bb = b.beskriv.toLowerCase();
          if (aa<bb) return -1;
          if (aa>bb) return 1;
          return 0;
        })
      },
      FraDato() {
        return new Date(parseInt(this.budget.startmåned.substr(0, 4)), parseInt(this.budget.startmåned.substr(5, 2)) - 1, 1);
      },
      Posts() {
        let tilÅr = this.FraDato.getFullYear();
        let tilMd = this.FraDato.getMonth() + this.AntalMåneder - 1;
        while (tilMd > 11) {
          tilÅr += 1;
          tilMd -= 12;
        }
        let tilDato = new Date(tilÅr, tilMd, LastDayOfMonth(tilÅr, tilMd));
        return LavPosteringer(this.budget.items, this.FraDato, tilDato, this.budget.startsaldo);
      },
      PostsMd() {
        let fm = this.FraDato.getFullYear() * 12 + this.FraDato.getMonth();
        let CellID,MIdx;
        rv = {};
        for (p of this.Posts) {
          MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
          CellID = p.itemid + '.' + MIdx;
          rv[CellID] = rv[CellID] === undefined ? p.beløb : rv[CellID] + p.beløb;
        }
        return rv;
      },
      RådighedMd() {
        let fm = this.FraDato.getFullYear() * 12 + this.FraDato.getMonth();
        let MIdx;
        let rv = [];
        for (let i = 0; i < this.AntalMåneder; i++) rv[i] = 0;
        for (p of this.Posts) {
          if (p.itemid === 0) continue;
          MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
          rv[MIdx] = rv[MIdx] === undefined ? p.beløb : rv[MIdx] + p.beløb;
        }
        return rv;
      },
      UltimoMd() {
        let fm = this.FraDato.getFullYear() * 12 + this.FraDato.getMonth();
        let MIdx;
        let rv = [];
        let cm = 0;
        let bal = 0;
        for (let i = 0; i < this.AntalMåneder; i++) rv[i] = 0;
        for (p of this.Posts) {
          MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
          while (MIdx > cm) {
            rv[cm] = bal;
            cm+=1
          }
          bal = p.balance;
        }
        while (this.AntalMåneder > cm) {
          rv[cm] = bal;
          cm += 1
        }
        return rv;
      },
      LavesteMd() {
        let fm = this.FraDato.getFullYear() * 12 + this.FraDato.getMonth();
        let MIdx;
        let rv = [];
        let cm = 0;
        let lav = 0;
        for (let i = 0; i < this.AntalMåneder; i++) rv[i] = 0;
        for (p of this.Posts) {
          if (p.itemid === 0) lav = p.beløb;
          MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
          while (MIdx > cm) {
            rv[cm] = lav;
            lav = this.UltimoMd[cm];
            cm += 1
          }
          if (p.balance < lav) lav = p.balance;
        }
        while (this.AntalMåneder > cm) {
          rv[cm] = lav;
          lav = this.UltimoMd[cm];
          cm += 1
        }
        return rv;
      },
      GnsUdgift() {
        let rv = 0;
        for (p of this.Posts) if (p.udgift) rv += p.beløb;
        return -rv / this.AntalMåneder;
      },
      GnsIndtægt() {
        let rv = 0;
        for (p of this.Posts) if (!p.udgift) rv += p.beløb;
        rv -= this.budget.startsaldo;
        return rv / this.AntalMåneder;
      }
    },
    methods: {
      IkkeÆndret() {
        this.OldJSON = this.BudgetJSON;
      },
      LavNyt() {
        return {
          navn: '',
          startmåned: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 101).toString().substr(1),
          startsaldo: 0,
          items: [],
          nextid: 1,
        };
      },
      FormatBeløb(v) {
        let x = v.toFixed(2).replace('.', ',');
        let rv = x.substr(x.length - 3);
        x = x.substr(0, x.length - 3);
        while (x.length > 4 || (x.length === 4 && x.charAt(0) !== '-')) {
          rv ='.' + x.substr(x.length - 3) + rv;
          x = x.substr(0, x.length - 3);
        }
        return x + rv;
      },
      BeløbHtml(v, redNegtaive) {
        if (v < 0 && redNegtaive) return '<span style="color:red">' + this.FormatBeløb(v) + '</span>';
        return this.FormatBeløb(v, false)
      },
      BMdNavn(mdIdx) {
        let tilÅr = this.FraDato.getFullYear();
        let tilMd = this.FraDato.getMonth() + mdIdx;
        while (tilMd > 11) {
          tilÅr += 1;
          tilMd -= 12;
        }
        return ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'][tilMd] + ' ' + tilÅr.toString().substr(2);
      },
      KlikEdit(id) {
        if (id === 0) {
          this.EditID = 0;
          this.EditData = {
            id:0,
            udgift: true,
            beskriv: '',
            variabelt: false,
            fastbeløb: 0,
            varbeløb: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            hyppighed: 6,
            betalingsmåneder: [false, false, false, false, false, false, false, false, false, false, false, false],
            start: '',
            harslut: false,
            slut: '',
          }
        } else {
          let item = this.budget.items.find(itm => itm.id === id);
          this.EditID = id;
          this.EditData = JSON.parse(JSON.stringify(item));
        }
        this.$refs.BItem.Show();
      },
      KlikSlet(id) {
        let idx = this.budget.items.findIndex(itm => itm.id === id);
        if (idx < 0) return;
        this.budget.items.splice(idx, 1);
      },
      GemItem() {
        if (this.EditID === 0) {
          this.EditID = this.budget.nextid++;
          this.EditData.id = this.EditID;
          this.budget.items.push(this.EditData);
        } else {
          let idx = this.budget.items.findIndex(itm => itm.id === this.EditID);
          Vue.set(this.budget.items, idx, this.EditData);
        }
        this.$refs.BItem.Hide();
      },
      FormatDate(d) {
        return (d.getDate()+100).toString().substr(1) + '.' + (d.getMonth() + 101).toString().substr(1) + '.' + d.getFullYear();
      },
      async KlikSave() {
        if (this.budgetid === 'nyt' || this.BudgetJSON !== this.OldJSON) {
          if (this.budgetid === 'nyt') {
            let r = await fetch('/api/budget', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.budget)
            });
            if (r.status !== 201) {
              alert('Unexpected response status code (' + r.status + ') received');
              return;
            }
            this.budgetid = r.headers.get('Location').substr(1);
            document.location.hash = this.budgetid;
            this.$refs.ModalGemt.Show();
          } else {
            let r = await fetch('/api/budget/' + this.budgetid, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.budget)
            });
            if (!r.ok) {
              alert('Unexpected response (status code ' + r.status + ') received');
              return;
            }
          }
          this.IkkeÆndret();
        }
      },
      async KlikSletSky() {
        if (this.budgetid === 'nyt') return; 
        let r = await fetch('/api/budget/'+this.budgetid, {method: "DELETE"});
        if (r.status !== 204) {
          alert('Unexpected response status code (' + r.status + ') received');
          return;
        }
        this.budgetid = 'nyt';
        document.location.hash = 'nyt';
        this.OldJSON = 'dummy'; //to trigger warning
        this.$refs.ModalSletSky.Show();
      },
      DelUrl() {
        navigator.share({
          title: 'Mit-Budget.dk - ' + this.budget.navn,
          url: window.location.href
        });
      },
      KlikNyt() {
        this.budget = this.LavNyt();
        this.IkkeÆndret();
        this.budgetid = 'nyt';
        document.location.hash = 'nyt';
        this.$refs.ModalNyt.Show();
      },
      KlikKopi() {
        this.budget.navn += ' (kopi)';
        this.budgetid = 'nyt';
        document.location.hash = 'nyt';
        this.$refs.ModalKopi.Show();
      },
      async HashChanged() {
        let h = window.location.hash;
        let NewID = h.length <= 1 ? null : h.substr(1);
        if (NewID === this.budgetid) return;
        document.getElementById('base').style.maxWidth =NewID===null ? '960px' : '';
        document.getElementById('intro').style.display = NewID === null ? 'block' : 'none';
        document.body.style.backgroundColor = NewID === null ? '#ccc' : 'white';
        this.budgetid = NewID;
        if (NewID === null) return;
        if (NewID === 'nyt') {
          this.budget = this.LavNyt();
          this.IkkeÆndret();
          return;
        }
        this.budget = null;
        let r = await fetch('/api/budget/' + NewID);
        if (r.status === 404) {
          alert('Det angive budget findes ikke!');
          this.budgetid = null;
          document.location.hash = '';
          return;
        }
        if (r.status !== 200) {
          alert('Unexpected response status code (' + r.status + ') received');
          this.budgetid = null;
          document.location.hash = '';
          return;
        }
        this.budget = await r.json();
        this.IkkeÆndret();
      }
    },
    mounted() {
      let dette = this;
      window.addEventListener('beforeunload',
        function (e) {
          if (dette.budgetid!==null && dette.OldJSON !== dette.BudgetJSON) e.returnValue = "Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?";
        });
      window.addEventListener('hashchange', this.HashChanged, false);
      this.HashChanged();
    },
    watch: {
      "budget.navn": function (ny, gl) {
        document.title = 'Mit-Budget.dk' + (this.budget === null || this.budget.navn==='' ? '' : ' - ' + this.budget.navn);
      }
    }

});