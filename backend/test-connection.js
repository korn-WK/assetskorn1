// เอาไว้ทดสอบการเชื่อมต่อกับฐานข้อมูล
// const pool = require('./lib/db');

// async function testConnection() {
//   try {
//     console.log('🔍 Testing database connection...');
    
//     const connection = await pool.getConnection();
//     console.log('✅ Database connected successfully!');
    
//     // Test query
//     const [rows] = await connection.execute('SELECT COUNT(*) as count FROM assets');
//     console.log(`📊 Found ${rows[0].count} assets in database`);
    
//     // Test departments
//     const [deptRows] = await connection.execute('SELECT COUNT(*) as count FROM departments');
//     console.log(`🏢 Found ${deptRows[0].count} departments in database`);
    
//     // Test locations
//     const [locRows] = await connection.execute('SELECT COUNT(*) as count FROM asset_locations');
//     console.log(`📍 Found ${locRows[0].count} locations in database`);
    
//     // Test users
//     const [userRows] = await connection.execute('SELECT COUNT(*) as count FROM users');
//     console.log(`👥 Found ${userRows[0].count} users in database`);
    
//     connection.release();
//     console.log('✅ All tests passed!');
    
//   } catch (error) {
//     console.error('❌ Database connection failed:', error.message);
//     console.error('Please check your database configuration in config.env');
//   } finally {
//     process.exit(0);
//   }
// }

// testConnection(); 