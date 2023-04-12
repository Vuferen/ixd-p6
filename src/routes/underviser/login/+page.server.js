import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { z } from "zod";
import { superValidate, setError } from "sveltekit-superforms/server";

const loginSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);
	return { form };
};

export const actions = {
  default: async (event) => {
		const {
			request,
			locals: { supabase },
		} = event;

		const form = await superValidate(event, loginSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const email = form.data.email;
		const password = form.data.password;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return setError(form, "server", "Forkert email eller koderord.");
      }
      return setError(form, "server", "Server fejl. Prøv igen senere.");
    }

    throw redirect(303, '/underviser');
  },

//   signout: async ({ locals: { supabase } }) => {
//     await supabase.auth.signOut();
//     throw redirect(303, '/');
//   }
};
