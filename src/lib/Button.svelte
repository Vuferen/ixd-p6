<script>
	import { goto } from '$app/navigation';
	// Skal have en version med og uden icon
	export let type = "primary";
	export let color = "green1";
	export let icon = "";
	export let iconOnLeft = false;
	export let onclick = null;
	export let formaction = "";
	export let href = null;
	export let navigationReplaceState = false;
	export let disable = false;

	function handleClick() {
		if (onclick != null) {
			onclick();
		}
		if (href != null) {
			goto(`/${href}`, { navigationReplaceState }) 
		}
	}

</script>

<button class="{type} {color}" on:click={handleClick} formaction={formaction} disabled={disable}>
	<div class="content">
		{#if icon != "" && iconOnLeft}
			<iconify-icon icon="{icon}" width="1.5em"></iconify-icon>
		{/if}
		<slot/>
		{#if icon != "" && !iconOnLeft}
			<iconify-icon icon="{icon}" width="1.5em"></iconify-icon>
		{/if}
	</div>
</button>


<style>
	button {
		font-family: var(--font);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		border: 3px solid transparent;
		box-sizing: border-box;
		width: fit-content;
		cursor: pointer;
	}
	.primary {
		font-size: 2.6rem;
		padding: 0.8em;
	}
	.secondary {
		font-size: 2rem;
		padding: 0.4em;
	}
	.green1{
		background-color: var(--green-1);
	}
	.green2{
		background-color: var(--green-2);
	}
	.purple1{
		background-color: var(--purple-1);
	}
	.purple2{
		background-color: var(--purple-2);
	}
	.blue2{
		background-color: var(--blue-2);
	}
	button:hover{
		border: 3px solid rgba(0, 0, 0, 0.3);
	}

	.content{
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		gap: 0.5em;
	}
</style>