<BSModal width=600 title="Udgift / Indtægt" on:submit={()=>dispatch('gem')} bind:this={MyModal}>

    <svelte:fragment slot="default">
    {#if data}
    <table class="form">
        <tbody>
        <tr>
            <th>Type:</th>
            <td class="pad">
            <BSRadio checked={data.udgift} on:input={()=>data.udgift=true} inline>Udgift</BSRadio>
            &nbsp;
            <BSRadio checked={!data.udgift} on:input={()=>data.udgift=false} inline>Indtægt</BSRadio>
            </td>
        </tr>
        <tr>
            <th>Beskrivelse:</th>
            <td><input bind:value={data.beskriv} type="text" class="form-control" required /></td>
        </tr>
        <!--<tr>
    <th>Gruppe:</th>
    <td><select class="form-select"></select></td>
</tr>-->
       <tr>
            <th>Budgettér med:</th>
            <td class="pad">
            <BSRadio checked={!data.variabelt} on:input={()=>data.variabelt=false} inline>Et fast beløb</BSRadio>
            &nbsp;
            <BSRadio checked={data.variabelt} on:input={()=>data.variabelt=true} inline>Et variabelt beløb</BSRadio>
            </td>
        </tr>
         <tr>
            <th>Beløb:</th>
            <td>
            {#if !data.variabelt}
            <Amount bind:value={data.fastbeløb} required />
            {:else}
            <table>
                {#each [1,2,3,4] as ln}
                <tr>
                    {#each [1,2,3] as rw}
                    <td style="padding:2px .5rem 2px 0;text-align:right">{MNavn[ln*3 + rw - 4]}</td>
                    <td style={'padding: 2px '+(rw<3?'2rem':'0')+' 2px 0'}><Amount validity={ln===1 && rw===1 && !EtVarBeløbAnført ? 'Anfør beløb for mindst en måned':''} bind:value={data.varbeløb[ln*3 + rw - 4]} /></td>
                    {/each}
                </tr>
                {/each}
            </table> 
            {/if}
            </td>
        </tr>
        {#if !data.variabelt}
        <tr>
            <th>Hyppighed:</th>
            <td>
            <select bind:value={data.hyppighed} class="form-select">
                <option value={1}>Ugentlig</option>
                <option value={2}>Hver anden uge</option>
                <option value={3}>Hver tredje uge</option>
                <option value={4}>Hver fjerde uge</option>
                <option value={5}>To gange pr. måned</option>
                <option value={6}>Månedlig</option>
                <option value={7}>Hver anden måned</option>
                <option value={8}>Kvartalsvis</option>
                <option value={9}>Tre gange årligt</option>
                <option value={10}>Halvårligt</option>
                <option value={11}>Årligt</option>
                <option value={12}>De anførte måneder</option>
            </select>
            </td>
        </tr>
        {/if}
        {#if !data.variabelt && data.hyppighed===12}
        <tr>
            <th>Betalingsmåneder:</th>
            <td>
            <table>
                {#each [1,2,3] as ln}
                <tr>
                    {#each [1,2,3,4] as rw}
                  <td  style="padding: .5rem 1rem 0 0">
                    <BSCheckbox bind:checked={data.betalingsmåneder[ln*4 + rw - 5]}
                      validity={ln===1 && rw===1 && !EnBetalingsMånedValgt ? 'Vælg mindst en måned':''}>{MNavn[ln*4 + rw - 5]}</BSCheckbox>
                  </td>
                  {/each}
                </tr>
                {/each}
            </table>
            </td>
        </tr>
        {/if}
         <tr>
            <th>Første gang:</th>
            <td><input type="date" bind:value={data.start} required class="form-control" /></td>
        </tr>
        <tr>
            <th>Slutter:</th>
            <td class={data.harslut ? null :'pad'}>
            <BSCheckbox bind:checked={data.harslut} inline />
            {#if data.harslut}
            <input type="date" bind:value={data.slut} required class="form-control d-inline-block"
          use:Validity={data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? 'Kan ikke være før første gang' : ''} />
            {/if}        
            </td>
        </tr>
     
        </tbody>
    </table> 
    {/if}
</svelte:fragment>


    <svelte:fragment slot="footer">
        <button on:click={MyModal.Hide} type="button" class="btn btn-secondary">Annuller</button>
        <button type="submit" class="btn btn-primary"><Icon name="check" /> Gem</button>
    </svelte:fragment>

</BSModal>

<script>
import {Validity} from './shared.js';
import BSModal from './BSModal.svelte';
import BSRadio from './BSRadio.svelte';
import BSCheckbox from './BSCheckbox.svelte';
import Icon from './Icon.svelte';
import Amount from './Amount.svelte';
import { createEventDispatcher } from 'svelte';
const dispatch=createEventDispatcher();
let MyModal;
export function Show() { MyModal.Show() };
export function Hide() { MyModal.Hide() };
export let data=null;

const MNavn=['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

$: EtVarBeløbAnført=(function() {
    if(!data) return false;
    for (let i = 0; i < 12; i++) {
    if (data.varbeløb[i] !== 0) return true;
    }
    return false;})();

$: EnBetalingsMånedValgt=(function() {
    if(!data) return false;
    for (let i = 0; i < 12; i++) {
    if (data.betalingsmåneder[i]) return true;
    }
    return false;})();
   
</script>