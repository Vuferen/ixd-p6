import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
	
		const email = formData.get('email');
		const password = formData.get('password');
	
		const { error } = await supabase.auth.signUp({
		  email,
		  password
		});
	
		if (error) {
		  if (error instanceof AuthApiError && error.status === 400) {
			return fail(400, {
			  error: 'Invalid credentials.',
			  values: {
				email
			  }
			});
		  }
		  return fail(500, {
			error: 'Server error. Try again later.',
			values: {
			  email
			}
		  });
		}
	
		throw redirect(303, '/underviser');
	  },
	
	//   signout: async ({ locals: { supabase } }) => {
	// 	await supabase.auth.signOut();
	// 	throw redirect(303, '/');
	//   }
	};