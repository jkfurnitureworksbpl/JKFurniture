const { createClient } = require('@supabase/supabase-js');

// Polyfill for Headers API in older Node.js versions
if (typeof globalThis.Headers === 'undefined') {
  globalThis.Headers = class Headers {
    constructor(init) {
      this.map = new Map();
      if (init) {
        if (Array.isArray(init)) {
          for (const [key, value] of init) {
            this.map.set(key.toLowerCase(), value);
          }
        } else if (init && typeof init === 'object') {
          for (const [key, value] of Object.entries(init)) {
            this.map.set(key.toLowerCase(), value);
          }
        }
      }
    }
    
    get(name) {
      return this.map.get(name.toLowerCase());
    }
    
    set(name, value) {
      this.map.set(name.toLowerCase(), value);
    }
    
    has(name) {
      return this.map.has(name.toLowerCase());
    }
    
    delete(name) {
      return this.map.delete(name.toLowerCase());
    }
    
    forEach(callback) {
      this.map.forEach(callback);
    }
  };
}

let supabase = null;

const connectSupabase = () => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    console.log('🔍 Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
    console.log('🔍 Supabase Key:', supabaseKey ? 'Set' : 'Not set');

    if (supabaseUrl && supabaseKey && 
        supabaseUrl !== 'your_supabase_project_url_here' && 
        supabaseKey !== 'your_supabase_anon_key_here') {
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log('✅ Connected to Supabase');
      return supabase;
    } else {
      console.log('⚠️  Supabase credentials not configured, using mock data');
      return null;
    }
  } catch (error) {
    console.log('⚠️  Supabase connection failed, using mock data:', error.message);
    return null;
  }
};

const getSupabaseClient = () => {
  if (!supabase) {
    supabase = connectSupabase();
  }
  return supabase;
};

module.exports = {
  connectSupabase,
  getSupabaseClient
};
