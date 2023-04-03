<script>
	export let data = [];
</script>

<div class="list">
	{#each data as exercise}
		<div>
			<input type="checkbox" name="" id="" bind:value={exercise.isSelected}>
			<span>{exercise.exercise}</span>
		</div>
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		font-size: 2rem;
	}
	input{
		height: 2rem;
		width: 1.8rem;
	}
</style>