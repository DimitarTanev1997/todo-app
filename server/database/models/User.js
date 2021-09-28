const Sequelize = require('sequelize');
const database = require('../database');
const Todo = require('../models/Todo');

const User = database.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

User.hasMany(Todo, { foreignKey: 'user_id'});
Todo.belongsTo(User, { foreignKey: 'id' });

database.sync();

module.exports = User;