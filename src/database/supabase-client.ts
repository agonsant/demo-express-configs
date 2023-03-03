import { createClient } from '@supabase/supabase-js';

const bucketURL = process.env.BUCKET_URL ?? '';
const bucketKey = process.env.BUCKET_API_KEY ?? '';

export const supabase = createClient(bucketURL, bucketKey);

export const PROFILE_BUCKET_NAME = 'profiles';
