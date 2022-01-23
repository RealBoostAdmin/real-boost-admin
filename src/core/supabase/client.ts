import {config} from './supabase.config';
import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(config.url, config.publicKey)

