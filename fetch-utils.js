const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// export async functions that fetch data
export async function getBeanies(filter, paging) {
    const page = paging.page; 
    const pageSize = paging.pageSize;

    let query = client
        .from('beanie_babies')
        .select('*', { count: 'exact' })
        .order('releaseYear')
        .range((page - 1) * pageSize, page * pageSize - 1);

    if (filter.name) {
        query = query.ilike('title', `%${filter.name}%`);
    }

    if (filter.astroSign) {
        query = query.eq('astroSign', filter.astroSign);
    }

    const response = await query;
    return response;
}

export async function getAstroSigns() {
    const response = await client.from('beanie_baby_astro_signs').select();
    return response;
}
