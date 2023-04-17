import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		id: params.slug,
	};

	// throw error(404, "Siden blev ikke fundet");
}
