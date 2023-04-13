<BSModal width="41rem" title="Udgift / Indtægt" on:submit={()=>dispatch('gem')} bind:this={MyModal}>

    <svelte:fragment slot="default">
    {#if data}
    <div class="form horizontal-sm">
        <Formfield label="Type">
            <BSRadio checked={data.udgift} on:input={()=>data.udgift=true} inline>Udgift</BSRadio>
            &nbsp;
            <BSRadio checked={!data.udgift} on:input={()=>data.udgift=false} inline>Indtægt</BSRadio>
        </Formfield>

        <Formfield label="Beskrivelse" labelfor="txtBeskriv">
            <input bind:value={data.beskriv} type="text" class="form-control" required id="txtBeskriv" />
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

        <Formfield label="Beløb" labeltop labelfor="amtBeløb">
            {#if !data.variabelt}
            <Amount bind:value={data.fastbeløb} required id="amtBeløb" />
            {:else}
            <div style="margin: 0 -1rem -1rem 0">
                {#each MNavn as Navn,md}
                <div style="text-align:right;display:inline-block;width:9.5rem;margin:0 1rem 1rem 0;">
                {MNavn[md]}
                <Amount validity={md===0 && !EtVarBeløbAnført ? 'Anfør beløb for mindst en måned':''} bind:value={data.varbeløb[md]} style="display:inline-block;width:7rem;" id={md===0?'amtBeløb':null} />
                </div>                
                {/each}
            </div>
            {/if}
        </Formfield>

        {#if !data.variabelt}
        <Formfield label="Hyppighed" labelfor="ddHyp">
            <select bind:value={data.hyppighed} class="form-select" id="ddHyp">
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
            <!-- <div style="display:inline-grid;gap:.5rem 1.5rem;" class="rcols-4 rcols-sm-6"> -->
            <div style="margin: 0 -1rem -1rem 0">
                {#each [0,1,2,3,4,5] as grp}
                <div style="display:inline-block">
                {#each [0,1] as grpidx}
                <BSCheckbox bind:checked={data.betalingsmåneder[grp*2+grpidx]}
                            validity={grp===0 && grpidx===0 && !EnBetalingsMånedValgt ? 'Vælg mindst en måned':''}
                            style="width:4rem;margin: 0 1rem 1rem 0"
                            inline>{MNavn[grp*2+grpidx]}</BSCheckbox>
                {/each}
                </div>
                {/each}
            </div>
        </Formfield>
        {/if}

        <Formfield label="Første gang" labelfor="dtStart">
            <input type="date" bind:value={data.start} required class="form-control" id="dtStart"/>
        </Formfield>

        <FormField label="Slutter" labelfor="chkSlut">
            <BSCheckbox bind:checked={data.harslut} inline id="chkSlut" />
            {#if data.harslut}           
            <input type="date" bind:value={data.slut} required 
                    class="form-control d-inline-block ms-3"
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

<script lang="ts">
import {Validity} from './shared';
import BSModal from './Bootstrap/Modal.svelte';
import BSRadio from './Bootstrap/Radio.svelte';
import BSCheckbox from './Bootstrap/Checkbox.svelte';
import Formfield from './JH/FormField.svelte';
import Icon from './Icon.svelte';
import Amount from './Amount.svelte';
import FormField from './JH/FormField.svelte';
import { createEventDispatcher } from 'svelte';
const dispatch=createEventDispatcher();
let MyModal:BSModal;
export function Show() { MyModal.Show() };
export function Hide() { MyModal.Hide() };
export let data:BudgetItem=null;

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