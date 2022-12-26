const { Sequelize } = require('sequelize');

const createDB = new Sequelize('database', 'username', 'password', {
    host: './config/database.sqlite',
    dialect: 'sqlite' 
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

// const connectDB = () => {
//     createDB.sync().then(()=>{
//         console.log('connected to DB');
//     })
//     .catch((e)=>{
//         console.log('DB connection failed',e);
//     })
// }
module.exports = createDB 