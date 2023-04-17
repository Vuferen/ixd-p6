import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		code: params.slug,
	};

	// throw error(404, "Siden blev ikke fundet");
}
