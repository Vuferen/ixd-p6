<!-- src/routes/+layout.svelte -->
<!-- <script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	//import type { LayoutData } from './$types';
  
	export let data;
  
	$: ({ supabase, session } = data);
  
	onMount(() => {
	  const {
		data: { subscription },
	  } = supabase.auth.onAuthStateChange((event, _session) => {
		if (_session?.expires_at !== session?.expires_at) {
		  invalidate('supabase:auth');
		}
	  });
  
	  return () => subscription.unsubscribe();
	});
  </script> -->
  
<div>
	<slot/>
</div>

<style>
	div {
		padding: 3% 4% 4% 4%;
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-sizing: border-box;
	}
</style>