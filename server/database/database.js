const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequalize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    dialect: 'postgres'
});

module.exports = sequalize;