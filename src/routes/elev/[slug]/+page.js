import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		title: params.slug,
		content: "Mange opgaver venter på dig",
	};

	// throw error(404, "Siden blev ikke fundet");
}
