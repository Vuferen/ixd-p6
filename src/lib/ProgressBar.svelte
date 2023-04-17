<script>
	export let max = 1;
	export let min = 0;
	export let progress = 0;

</script>

<progress max={max} value={progress}></progress>

<style>
	progress { 
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		width: 100%;
		height: 20px;
		border: 1px solid grey;
		/* box-shadow: var(--shadow); */
		border-radius: var(--border-radius);
		overflow: hidden;
	}
	progress, progress[value]::-webkit-progress-bar, progress::-webkit-progress-bar{
		background-color: var(--background);
	}
	progress::-webkit-progress-value {
		background: var(--green-1);
	}
	progress::-moz-progress-bar {
		background: var(--green-1);
	}
</style>