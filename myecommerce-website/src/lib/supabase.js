import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgwwiivxprmfncwwhoyo.supabase.co';
const supabaseAnonKey = 'sb_publishable_Q3_259JAloyLSrXmXC0aKA_hAveoAif';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);