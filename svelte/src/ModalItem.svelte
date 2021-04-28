<BSModal width="40rem" title="Udgift / Indtægt" on:submit={()=>dispatch('gem')} bind:this={MyModal}>

    <svelte:fragment slot="default">
    {#if data}
    <div class="form horizontal-sm">
        <Formfield label="Type">
            <BSRadio checked={data.udgift} on:input={()=>data.udgift=true} inline>Udgift</BSRadio>
            &nbsp;
            <BSRadio checked={!data.udgift} on:input={()=>data.udgift=false} inline>Indtægt</BSRadio>
        </Formfield>

        <Formfield label="Beskrivelse">
            <input bind:value={data.beskriv} type="text" class="form-control" required />
        </Formfield>

        <!--<tr>
         <th>Gruppe:</th>
            <td><select class="form-select"></select></td>
        </tr>-->
        
        <Formfield label="Budgettér med">
            <BSRadio checked={!data.variabelt} on:input={()=>data.variabelt=false} inline>Et fast beløb</BSRadio>
            &nbsp;
            <BSRadio checked={data.variabelt} on:input={()=>data.variabelt=true} inline>Et variabelt beløb</BSRadio>
        </Formfield>

        <Formfield label="Beløb" labeltop>
            {#if !data.variabelt}
            <Amount bind:value={data.fastbeløb} required />
            {:else}
            <div style="display:inline-grid;gap:1rem;" class="rcols-2 rcols-sm-3">
                {#each MNavn as Navn,md}
                <div style="text-align:right">
                {MNavn[md]}
                <Amount validity={md===0 && !EtVarBeløbAnført ? 'Anfør beløb for mindst en måned':''} bind:value={data.varbeløb[md]} style="display:inline-block;width:7rem;" />
                </div>                
                {/each}
            </div>
            {/if}
        </Formfield>

        {#if !data.variabelt}
        <Formfield label="Hyppighed">
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
        </Formfield>
        {/if}

        {#if !data.variabelt && data.hyppighed===12}
        <Formfield label="Betalingsmåneder" labeltop>
            <div style="display:inline-grid;gap:.5rem 1.5rem;" class="rcols-4 rcols-sm-6">
                {#each MNavn as Navn,md}
                <BSCheckbox bind:checked={data.betalingsmåneder[md]}
                      validity={md===0 && !EnBetalingsMånedValgt ? 'Vælg mindst en måned':''}>{Navn}</BSCheckbox>
                {/each}
            </div>
        </Formfield>
        {/if}

        <Formfield label="Første gang">
            <input type="date" bind:value={data.start} required class="form-control" />
        </Formfield>

        <FormField label="Slutter">
            <!-- <td class={data.harslut ? null :'pad'}> -->
            <BSCheckbox bind:checked={data.harslut} inline />
            {#if data.harslut}
            <input type="date" bind:value={data.slut} required class="form-control d-inline-block"
                   use:Validity={data.start.length > 0 && data.slut.length > 0 && data.start > data.slut ? 'Kan ikke være før første gang' : ''} />
            {/if} 
        </FormField>
     
    </div> 
    {/if}
</svelte:fragment>


    <svelte:fragment slot="footer">
        <button on:click={MyModal.Hide} type="button" class="btn btn-secondary">Annuller</button>
        <button type="submit" class="btn btn-primary"><Icon name="check" /> Gem</button>
    </svelte:fragment>

</BSModal>

<script>
import {Validity} from './shared.js';
import BSModal from './Bootstrap/Modal.svelte';
import BSRadio from './Bootstrap/Radio.svelte';
import BSCheckbox from './Bootstrap/Checkbox.svelte';
import Formfield from './JH/FormField.svelte';
import Icon from './Icon.svelte';
import Amount from './Amount.svelte';
import { createEventDispatcher } from 'svelte';
import FormField from './JH/FormField.svelte';
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