import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
	// import.meta.env.VITE_SUPABASE_URL,
	// import.meta.env.VITE_SUPABASE_ANON_KEY,
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
	{
		realtime: {
			params: {
			  eventsPerSecond: 10,
			},
		  },
	}
)
export default supabase