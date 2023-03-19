{#if $BudgetID === null}
	<a href="#nyt" class="btn btn-primary"><Icon name="new" /> Nyt budget</a>

{:else if $Budget===null} 
	<div class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div> 

{:else}
    <BudgetPage />

{/if}

<script>
import {LavNyt,BudgetID,Budget,OldJSON} from './shared.js';
import BudgetPage from './BudgetPage.svelte';
import Icon from './Icon.svelte';

async function HashChanged() {
	let h = window.location.hash;
	let NewID = h.length <= 1 ? null : h.substr(1);
	if (NewID === $BudgetID) return;
	document.getElementById('base').style.maxWidth =NewID===null ? '960px' : '';
	document.getElementById('intro').style.display = NewID === null ? 'block' : 'none';
	document.body.style.backgroundColor = NewID === null ? '#ccc' : 'white';
	$BudgetID = NewID;
	if (NewID === null) return;
	if (NewID === 'nyt') {
		$Budget = LavNyt();
		$OldJSON=JSON.stringify($Budget);
		return;
	}
	$Budget = null;
	let r = await fetch('/api/budget/' + NewID);
	if (r.status === 404) {
		alert('Det angive budget findes ikke!');
		$BudgetID = null;
		document.location.hash = '';
		return;
	}
	if (r.status !== 200) {
		alert('Unexpected response status code (' + r.status + ') received');
		$BudgetID = null;
		document.location.hash = '';
		return;
	}
	$Budget = await r.json();
	$OldJSON=JSON.stringify($Budget);
}
window.addEventListener('hashchange', HashChanged, false);
HashChanged();

window.addEventListener('beforeunload',
	function (e) {
		if ($BudgetID!==null && $Budget!==null && $OldJSON !== JSON.stringify($Budget)) e.returnValue = "Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?";
	});

</script>
