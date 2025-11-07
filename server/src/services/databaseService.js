const { Pool } = require('pg');

let pool = null;

const connectDatabase = async () => {
  try {
    console.log('\n========================================');
    console.log('🔌 Attempting PostgreSQL Connection...');
    console.log('========================================');
    
    // PostgreSQL connection configuration from environment variables
    const dbConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 10000, // 10 seconds timeout
      idleTimeoutMillis: 30000,
      max: 20, // Maximum number of clients in the pool
    };

    console.log('📋 Connection Configuration:');
    console.log('   Host:', dbConfig.host ? dbConfig.host : '❌ Not set');
    console.log('   Port:', dbConfig.port);
    console.log('   Database:', dbConfig.database ? dbConfig.database : '❌ Not set');
    console.log('   User:', dbConfig.user ? dbConfig.user : '❌ Not set');
    console.log('   Password:', dbConfig.password ? '***' : '❌ Not set');
    console.log('   SSL:', dbConfig.ssl ? 'Enabled' : 'Disabled');

    if (dbConfig.host && dbConfig.database && dbConfig.user && dbConfig.password) {
      console.log('\n🔄 Creating connection pool...');
      pool = new Pool(dbConfig);
      
      // Test the connection with async/await
      try {
        const testResult = await pool.query('SELECT NOW() as current_time, current_database() as db_name, current_user as db_user');
        console.log('\n✅ SUCCESS: Connected to PostgreSQL database!');
        console.log('   Database Time:', testResult.rows[0].current_time);
        console.log('   Database Name:', testResult.rows[0].db_name);
        console.log('   Database User:', testResult.rows[0].db_user);
        
        // Test schema access
        try {
          const schemaTest = await pool.query('SELECT COUNT(*) as count FROM export_data.products');
          console.log('   Products table accessible: ✅ (' + schemaTest.rows[0].count + ' records)');
        } catch (schemaErr) {
          console.log('   Products table access: ⚠️  ' + schemaErr.message);
        }
        
        try {
          const imgTest = await pool.query('SELECT COUNT(*) as count FROM export_data.product_images');
          console.log('   Product Images table accessible: ✅ (' + imgTest.rows[0].count + ' records)');
        } catch (imgErr) {
          console.log('   Product Images table access: ⚠️  ' + imgErr.message);
        }
        
        console.log('========================================\n');
      } catch (testErr) {
        console.error('\n❌ FAILED: PostgreSQL connection test failed!');
        console.error('   Error Message:', testErr.message);
        console.error('   Error Code:', testErr.code);
        console.error('   Error Details:', testErr);
        console.log('========================================\n');
      }

      // Handle pool errors
      pool.on('error', (err) => {
        console.error('\n⚠️  Unexpected error on idle PostgreSQL client:', err);
      });

      return pool;
    } else {
      console.log('\n❌ FAILED: PostgreSQL credentials not fully configured');
      console.log('========================================\n');
      return null;
    }
  } catch (error) {
    console.error('\n❌ FAILED: PostgreSQL connection setup error:', error.message);
    console.log('========================================\n');
    return null;
  }
};

const getDatabasePool = async () => {
  if (!pool) {
    pool = await connectDatabase();
  }
  return pool;
};

// Helper function to execute queries
const query = async (text, params) => {
  const dbPool = await getDatabasePool();
  if (!dbPool) {
    console.error('❌ Database query failed: Connection pool not available');
    throw new Error('Database connection not available');
  }
  try {
    console.log('📊 Executing query:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    const result = await dbPool.query(text, params);
    console.log('✅ Query successful, returned', result.rows.length, 'rows');
    return result;
  } catch (error) {
    console.error('❌ Database query error:', error.message);
    console.error('   Query:', text.substring(0, 100));
    console.error('   Error Code:', error.code);
    throw error;
  }
};

module.exports = {
  connectDatabase,
  getDatabasePool,
  query
};

