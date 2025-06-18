const { supabase } = require('./supabaseClient');

async function getCachedResponse(key) {
    const { data, error } = await supabase.from('cache').select('*').eq('key', key).single();
    if (error || !data) return null;

    if (new Date(data.expires_at) < new Date()) return null;

    return data.value;
}

async function cacheResponse(key, value) {
    const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
    await supabase.from('cache').upsert({ key, value, expires_at: expiresAt });
}

module.exports = { getCachedResponse, cacheResponse };
