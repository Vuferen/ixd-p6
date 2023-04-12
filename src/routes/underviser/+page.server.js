// src/routes/posts/+page.server.ts
// import type { Actions } from './$types';
// import { error, fail } from '@sveltejs/kit';

// export const actions = {
// 	createClassroom: async ({ request, locals: { supabase, getSession } }) => {
// 	  const session = await getSession();
  
// 	  if (!session) {
// 		// the user is not signed in
// 		throw error(401, { message: 'Unauthorized' });
// 	  }
// 	  // we are save, let the user create the post
// 	  const formData = await request.formData();
// 	  const content = {teacher: session.user.id, name: "Ny klasse"};
  
// 	  const { error: createPostError, data: newClassroom } = await supabase
// 		.from('classrooms')
// 		.insert({ content });
  
// 	  if (createPostError) {
// 		return fail(500, {
// 		  supabaseErrorMessage: createPostError.message
// 		});
// 	  }
// 	  return {
// 		newClassroom
// 	  };
// 	},
// 	updateClassroom: async ({ request, locals: { supabase, getSession } }) => {
// 		const session = await getSession();
	
// 		if (!session) {
// 		  // the user is not signed in
// 		  throw error(401, { message: 'Unauthorized' });
// 		}
// 		// we are save, let the user create the post
// 		const formData = await request.formData();
// 		const content = formData.get('name');
// 		const id = formData.get('id');
  
// 		console.log("here");
// 		const { error: createPostError, data: newClassroom } = await supabase
// 		  .from('classrooms')
// 		  .insert({ content })
// 		  .eq('id', id);
	
// 		if (createPostError) {
// 		  return fail(500, {
// 			supabaseErrorMessage: createPostError.message
// 		  });
// 		}
// 		return {
// 		  newClassroom
// 		};
// 	  }
//   };
