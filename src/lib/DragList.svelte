<script>
	import {dndzone} from "svelte-dnd-action";

	export let items = [];
	export let finalizeCallback;

	function handleDndConsider(e) {
    	items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
		finalizeCallback(items);
    }
</script>

<div use:dndzone="{{items: items}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
	{#each items as item(item.id)}
	<!-- <div style="padding: 5px; margin: 5px; background: rgba(0,0,0,0.1); border: 1px solid black; border-radius: 10px;">{item.name}</div> -->
		<!-- <img src={item.src}> -->
		<span>{item.name}</span>
	{/each}
</div>

<style>
/* img {
  display: block;
  max-width:230px;
  max-height:95px;
  width: auto;
  height: auto;
  margin: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.20);
} */
div {
	border: 1px solid black;
	display: flex; 
	background: rgba(0,0,0,0.1); 
	min-height: 39px; 
	padding: 10px;
	margin-bottom: 10px;
	gap: 10px;
}
span {
	border: 1px solid black;
	font-size: 2rem;
	padding: 0.4em 1em;
	border-radius: var(--border-radius);
	
}
</style>