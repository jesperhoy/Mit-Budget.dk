<template>
  <div>

    <template v-if="this.budgetid === null">

      <a href="#nyt" class="btn btn-primary"><b-icon name="new" /> Nyt budget</a>

    </template>

    <template v-else-if="budget===null">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>

    <template v-else>

      <p>
        <button @click="KlikSave()" :disabled="BudgetJSON===OldJSON || this.budget.items.length===0" type="button" class="btn btn-primary"><b-icon name="upload" /> Gem i skyen</button>

        <button v-if="BrowserKanDele && budgetid!=='nyt'" @click="DelUrl()" type="button" class="btn btn-primary"><b-icon name="share" /> Del</button>

        <button v-if="budgetid!=='nyt'" @click.prevent="KlikKopi()" type="button" class="btn btn-primary"><b-icon name="copy" /> Lav kopi</button>

        <button v-if="budgetid!=='nyt'" @click.prevent="KlikSletSky()" type="button" class="btn btn-danger"><b-icon name="trash" /> Slet fra skyen</button>

        <button v-if="budgetid!=='nyt'" @click="KlikNyt()" type="button" class="btn btn-primary"><b-icon name="new" /> Nyt budget</button>
      </p>

      <hr />

      <table class="form">
        <tr v-if="budgetid!=='nyt' || this.budget.items.length>0">
          <th>Status:</th>
          <td>
            <div v-if="BudgetJSON===OldJSON" class="alert alert-success d-inline-block p-1 m-0"><b-icon name="check" /> Gemt i skyen</div>
            <div v-else class="alert alert-warning d-inline-block p-1 m-0"><b-icon name="warning" /> Ændringer ikke gemt</div>
          </td>
        </tr>
        <tr>
          <th>Budget-navn:</th>
          <td><input type="text" v-model="budget.navn" required class="form-control" style="max-width:40rem" /></td>
        </tr>
        <tr>
          <th>Første måned:</th>
          <td><input type="month" v-model="budget.startmåned" required class="form-control w-auto" /></td>
        </tr>
        <tr>
          <th>Startsaldo:</th>
          <td><b-amount v-model="budget.startsaldo" /></td>
        </tr>
      </table>

      <hr />

      <template v-if="budget.items.length>0">

        <p>
          Visning: <select v-model="Visning" class="form-select d-inline-block w-auto">
            <option value="months">Måned-skema</option>
            <option value="ledger">Som kontoudtog</option>
          </select>

          <template v-if="Visning !=='list'">
            &nbsp;&nbsp;&nbsp;Periode:
            <select v-model.number="AntalMåneder" class="form-select d-inline-block w-auto">
              <option value="12">12 måneder</option>
              <option value="18">18 måneder</option>
              <option value="24">24 måneder</option>
              <option value="36">36 måneder</option>
            </select>
          </template>

        </p>

        <table v-if="Visning==='months'" class="table table-striped" style="width:auto">
          <tbody>
            <tr>
              <th colspan="3"></th>
              <th v-for="md in AntalMåneder">{{BMdNavn(md-1)}}</th>
            </tr>
            <template v-for="tp in 2">
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style="white-space:nowrap;font-weight:bold" :colspan="AntalMåneder+1">{{tp===1?'Udgifter':'Indtægter'}}</td>
              </tr>
              <template v-for="itm in ItemsByNavn">
                <tr v-if="itm.udgift===(tp===1)">
                  <td><a href="#" @click.prevent="KlikEdit(itm.id)" class="link-primary"><b-icon name="edit" /></a></td>
                  <td><a href="#" @click.prevent="KlikSlet(itm.id)" class="link-danger"><b-icon name="trash" /></a></td>
                  <td style="white-space:nowrap">{{itm.beskriv}}</td>
                  <td v-for="md in AntalMåneder" style="text-align:right">{{PostsMd[itm.id + '.' + (md-1)]===undefined ? '' : FormatBeløb(PostsMd[itm.id + '.' + (md-1)])}}</td>
                </tr>
              </template>
            </template>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td style="white-space:nowrap;font-weight:bold" :colspan="AntalMåneder+1">Nøgletal</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td style="white-space:nowrap">Startsaldo</td>
              <td style="text-align:right">{{FormatBeløb(budget.startsaldo)}}</td>
              <td v-for="md in (AntalMåneder-1)">&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td style="white-space:nowrap">Rådighedsbeløb</td>
              <td v-for="md in AntalMåneder" style="text-align:right" v-html="BeløbHtml(RådighedMd[md-1],false)"></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td style="white-space:nowrap">Ultimosaldo</td>
              <td v-for="md in AntalMåneder" style="text-align:right" v-html="BeløbHtml(UltimoMd[md-1],true)"></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td style="white-space:nowrap">Laveste saldo</td>
              <td v-for="md in AntalMåneder" style="text-align:right" v-html="BeløbHtml(LavesteMd[md-1],true)"></td>
            </tr>
          </tbody>
        </table>

        <table v-else class="table table-striped" style="width:auto">
          <tbody>
            <tr>
              <th colspan="2"></th>
              <th style="text-align:left">Dato</th>
              <th style="text-align:left">Beskrivelse</th>
              <th style="text-align:right">Beløb</th>
              <th style="text-align:right">Saldo</th>
            </tr>
            <tr v-for="p in Posts">
              <td><a href="#" v-if="p.itemid>0" @click.prevent="KlikEdit(p.itemid)" class="link-primary"><b-icon name="edit" /></a></td>
              <td><a href="#" v-if="p.itemid>0" @click.prevent="KlikSlet(p.itemid)" class="link-danger"><b-icon name="trash" /></a></td>
              <td>{{FormatDate(p.dato)}}</td>
              <td>{{p.beskriv}}</td>
              <td style="text-align:right" v-html="BeløbHtml(p.beløb,false)"></td>
              <td style="text-align:right" v-html="BeløbHtml(p.balance,true)"></td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Gns. udgift pr. måned:</b> {{FormatBeløb(GnsUdgift)}}<br />
          <b>Gns. indtægt pr. måned:</b> {{FormatBeløb(GnsIndtægt)}}<br />
          <b>Gns. rådighedsbeløb måned:</b> <span v-html="BeløbHtml(GnsIndtægt-GnsUdgift,true)"></span>
        </p>
        <hr />

      </template>


      <p>
        <button @click="KlikEdit(0)" type="button" class="btn btn-primary"><b-icon name="add" /> Tilføj udgift/indtægt</button>
      </p>

    </template>

    <b-item :data="EditData" @gem="GemItem()" ref="BItem" />

    <bs-modal title="Dit budget er nu gemt i skyen" ref="ModalGemt">
      <template>
        <p>
          Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.<br />
          Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.
        </p>

        <p>
          Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.
          Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.
          Overvej derfor at sende dem en kopi (brug "Lav kopi" funktionen, gem, og send dem så den nye adresse).
        </p>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
      </template>
    </bs-modal>

    <bs-modal title="Lav Kopi" ref="ModalKopi">
      <template>
        <p>Du arbejder nu i en kopi af dit tidligere budget.</p>
        <p>Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
      </template>
    </bs-modal>

    <bs-modal title="Nyt budget" ref="ModalNyt">
      <template>
        <p>Du arbejder nu i et nyt budget.</p>
        <p>Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.</p>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="min-width:6rem">OK</button>
      </template>

    </bs-modal>

  </div>
</template>

<script>
  export default {
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
        this.$refs.ModalSlet.Show();
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
          if (dette.OldJSON !== dette.BudgetJSON) e.returnValue = "Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?";
        });
      window.addEventListener('hashchange', this.HashChanged, false);
      this.HashChanged();
    },
    watch: {
      "budget.navn": function (ny, gl) {
        document.title = 'Mit-Budget.dk' + (this.budget === null || this.budget.navn==='' ? '' : ' - ' + this.budget.navn);
      }
    }

}
</script>