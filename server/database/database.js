const { Sequelize } = require('sequelize');
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    sequalize = new Sequelize(process.env.DATABASE_KEY, {
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequalize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'localhost',
        dialect: 'postgres'
    });
}

module.exports = sequalize;