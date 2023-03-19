<template>

  <bs-modal size="lg" title="Udgift / Indtægt" @submit="$emit('gem')" ref="MyModal">

    <template>

      <table v-if="data" class="form">
        <tbody>
          <tr>
            <th>Type:</th>
            <td class="pad">
              <bs-radio :checked="data.udgift" @input="data.udgift=true" inline>Udgift</bs-radio>
              &nbsp;
              <bs-radio :checked="!data.udgift" @input="data.udgift=false" inline>Indtægt</bs-radio>
            </td>
          </tr>
          <tr>
            <th>Beskrivelse:</th>
            <td><input v-model.trim="data.beskriv" type="text" class="form-control" required /></td>
          </tr>
          <!--<tr>
    <th>Gruppe:</th>
    <td><select class="form-select"></select></td>
  </tr>-->
          <tr>
            <th>Budgettér med:</th>
            <td class="pad">
              <bs-radio :checked="!data.variabelt" @input="data.variabelt=false" inline>Et fast beløb</bs-radio>
              &nbsp;
              <bs-radio :checked="data.variabelt" @input="data.variabelt=true" inline>Et variabelt beløb</bs-radio>
            </td>
          </tr>
          <tr>
            <th>Beløb:</th>
            <td>
              <b-amount v-if="!data.variabelt" v-model="data.fastbeløb" required />
              <table v-else>
                <tr v-for="ln in 4">
                  <template v-for="rw in 3">
                    <td style="padding:2px .5rem 2px 0;text-align:right">{{$options.MNavn[ln*3 + rw - 4]}}</td>
                    <td :style="'padding: 2px '+(rw<3?'2rem':'0')+' 2px 0'"><b-amount :validity="ln===1 && rw===1 && !EtVarBeløbAnført() ? 'Anfør beløb for mindst en måned':''" v-model="data.varbeløb[ln*3 + rw - 4]" /></td>
                  </template>
                </tr>
              </table>
            </td>
          </tr>
          <tr v-if="!data.variabelt">
            <th>Hyppighed:</th>
            <td>
              <select v-model.number="data.hyppighed" class="form-select">
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
          </tr>
          <tr v-if="!data.variabelt && data.hyppighed===12">
            <th>Betalingsmåneder:</th>
            <td>
              <table>
                <tr v-for="ln in 2">
                  <td v-for="rw in 6" style="padding: .5rem 1rem 0 0">
                    <label>
                      <input type="checkbox" v-model="data.betalingsmåneder[ln*6 + rw - 7]" v-validity="ln===1 && rw===1 && !EnBetalingsMånedValgt() ? 'Vælg mindst en måned':''" />
                      {{$options.MNavn[ln*6 + rw - 7]}}
                    </label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th>Første gang:</th>
            <td><input type="date" v-model="data.start" required class="form-control" /></td>
          </tr>
          <tr>
            <th>Slutter:</th>
            <td :class="data.harslut ? null :'pad'">
              <bs-checkbox v-model="data.harslut" inline />
              <input v-if="data.harslut" type="date" v-model="data.slut" required class="form-control d-inline-block"
                     v-validity="data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? 'Kan ikke være før første betaling' : ''" />
            </td>
          </tr>
        </tbody>
      </table>

    </template>

    <template #footer>
        <button @click="Hide()" type="button" class="btn btn-secondary">Annuller</button>
        <button type="submit" class="btn btn-primary"><b-icon name="check" /> Gem</button>
    </template>

  </bs-modal>

</template>

<script>
  export default {
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
</script>