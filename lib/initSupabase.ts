import { createClient } from '@supabase/supabase-js'
/* eslint-disable import/first */
import 'dotenv/config'
export const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_ANON_KEY!
)


