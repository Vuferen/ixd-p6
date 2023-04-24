<script>
	export let data = [];
	console.log(data);
</script>

<div class="list">
	{#each data as exercise}
		<div class="exercise">
			<label class="container">
				<input type="checkbox" name="" id="" bind:value={exercise.isSelected} bind:checked={exercise.isSelected}>
				<span class="checkmark"></span>
			</label>
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
		gap: 30px;
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


	/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: var(--background);
  
  border-radius: var(--border-radius);
  /* border: 1px solid black; */
  /* box-shadow: var(--shadow); */
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #eee;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: rgb(174, 104, 192);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>