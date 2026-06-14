import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrwjnarejerhqhqqvlkn.supabase.co'
const supabaseKey = 'sb_publishable_oaEvX1WUoI-s3M8c88B4qA_I8evjEUp'

export const supabase = createClient (supabaseUrl, supabaseKey)