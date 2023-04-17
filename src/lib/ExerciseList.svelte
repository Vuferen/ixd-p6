<script>
	export let data = [];
	console.log(data);
</script>

<div class="list">
	{#each data as exercise}
		<div class="exercise">
			<input type="checkbox" name="" id="" bind:value={exercise.isSelected} bind:checked={exercise.isSelected}>
			<details>
				<summary>{exercise.exercise}</summary>
				<div class="detail"><p class="name">Hint:</p><p>{exercise.hint}</p></div>
				<div class="detail"><p class="name">Forklaring:</p><p>{exercise.explanation}</p></div>
				<div class="detail"><p class="name">Svar:</p><p>{exercise.answer}</p></div>
			</details>
		</div>
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		font-size: 2rem;
		gap: 15px;
	}
	input{
		height: 2rem;
		width: 1.8rem;
	}
	.exercise{
		display: flex;
		gap: 10px;
	}
	.detail{
		display: flex;
		gap: 5px;
	}
	.name{
		font-weight: bold;
	}
	p {
		margin: 6px 0;
	}
</style>