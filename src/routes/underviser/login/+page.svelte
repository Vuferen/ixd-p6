<script>
	// The login page for teachers

	import Button from "$lib/Button.svelte";
	import TextInput from "$lib/TextInput.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";
	
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

	/** @type {import('./$types').PageData} */  
	export let data;

	console.log(data);

	const { form, errors, enhance, constraints } = superForm(data.form);
</script>

<Layout title="Lærer login" showBackButton=true>
	<form slot="body" class="body" method="POST">
		{#if $errors.server}<span class="server-error">{$errors.server}</span>{/if}
		<TextInput type="email" name="email" bind:value={$form.email} {...$constraints.email} bind:error={$errors.email}>Email</TextInput>
		<TextInput type="password" name="password" bind:value={$form.password} {...$constraints.password} bind:error={$errors.password}>Kodeord</TextInput>
		<div class="center">
			<Button type="primary" icon="mdi:chevron-right-circle">Log ind</Button>
		</div>
	</form>

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle" href="underviser/registrer">Opret bruger</Button
	>
</Layout>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: 3em;
		padding: 0 15%;
	}
	.center {
		align-self: center;
	}
	.server-error{
		font-weight: bold;
		font-size: 1.4rem;
	}
</style>
