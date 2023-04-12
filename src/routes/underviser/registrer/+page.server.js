import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { z } from "zod";
import { superValidate, setError } from "sveltekit-superforms/server";

const registerSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword != password) {
			ctx.addIssue({
				code: "custom",
				message: "Kodeordene er ikke ens",
				path: ["confirmPassword"],
			});
		}
	});

export const load = async (event) => {
	const form = await superValidate(event, registerSchema);
	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase },
		} = event;

		const form = await superValidate(event, registerSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const email = form.data.email;
		const password = form.data.password;

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.log(error);
			if (error instanceof AuthApiError && error.status === 400) {
				return setError(form, "email", error.message);
			}
			return setError(form, "server", "Server fejl. Prøv igen senere.");
		}

		// return { form };

		throw redirect(303, "/underviser");
	},

	//   signout: async ({ locals: { supabase } }) => {
	// 	await supabase.auth.signOut();
	// 	throw redirect(303, '/');
	//   }
};
