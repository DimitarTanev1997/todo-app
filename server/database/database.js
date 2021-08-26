const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequalize = new Sequelize(process.env.DATABASE_KEY);

// if (process.env.NODE_ENV === 'production') {
//     sequalize = new Sequelize(process.env.DATABASE_KEY);
// } else {
//     sequalize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//         host: 'localhost',
//         dialect: 'postgres'
//     });
// }

module.exports = sequalize;