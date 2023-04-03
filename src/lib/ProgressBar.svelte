<script>
	export let max = 1;
	export let min = 0;
	export let progress = 0;

</script>

<progress max={max} value={progress}></progress>

<style>
	progress{
		width: 100%;
		height: 20px;
		border: 1px solid grey;
		background-color: var(--background);
		/* box-shadow: var(--shadow); */
		border-radius: var(--border-radius);

		-webkit-appearance: none;
		-moz-appearance: none;
   		appearance: none;
	}
	progress::-webkit-progress-value, progress::-moz-progress-bar {
		background-color: var(--green-1);
	}
</style>