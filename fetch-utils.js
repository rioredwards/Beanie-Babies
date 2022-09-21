const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// export async functions that fetch data
export async function getBeanieBabies() {
    let query = client.from('beanie_babies').select('*').order('title').limit(100);

    const response = await query;
    console.log(response);
    return response;
}

export async function getAstroSigns() {
    const response = await client.from('beanie_baby_astro_signs').select();
    return response;
}
