export async function getAssignmentsFromCode(supabase, code) {
	let {data: assignments} = await supabase.rpc('get_assignments_from_code', { param_code: code });
	return formatAssignments(supabase, assignments);
}

export async function getAssignmentsFromClassroomId(supabase, id) {
	let {data: assignments} = await supabase.rpc('get_assignments', { param_classroom_id: id });
	return formatAssignments(supabase, assignments);
}

async function formatAssignments(supabase, assignments) {
	let exerciseData = [];
	if (assignments != null) {
		await Promise.all(assignments.map(async element => {
			let {data: answer} = await supabase.rpc('get_answer', { param_assignment_id: element.assignment_id });
			let text_answer = convertAnswerToText(answer);
			exerciseData = [...exerciseData, {
				id: element.assignment_id,
				exercise: element.assignment_text, 
				hint: element.assignment_hint, 
				explanation: element.assignment_explanation, 
				answer: text_answer,
				isSelected: true}
			];
		}));
		
		return exerciseData.sort(compareID);
	}
}


function compareID(a, b) {
	if (a.id < b.id) {
		return -1;
	}
	if (a.id > b.id) {
		return 1;
	}
	return 0;
}

function convertAnswerToText(answer) {
	let text = "";
	let positions = [];
	for (let i = answer.length-1; i >= 0; i--) {
		const piece = answer[i];
		if (i == answer.length-1) {
			text += piece.piece_name;
			positions.push(piece.piece_position);
		} else if (positions.includes(piece.piece_position)) {
			text += "/" + piece.piece_name;
		} else {
			text += " -> " + piece.piece_name;
			positions.push(piece.piece_position);
		}
		
	}
	return text;
}