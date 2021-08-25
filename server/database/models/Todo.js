const Sequelize = require('sequelize');
const database = require('../database');
const User = require('../models/User');

const Todo = database.define('todo', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    dueDate: {
        type: Sequelize.BOOLEAN
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    pinned: {
        type: Sequelize.BOOLEAN
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    section: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Todo;