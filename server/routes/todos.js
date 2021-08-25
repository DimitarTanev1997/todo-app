const express = require('express');
const router = express.Router();
const todos = require('../controllers/todos');
const authorize = require('../middleware/authorize');

router.route('/:todoId')
    .all(authorize)
    .delete(todos.deleteTodo)
    .put(todos.updateTodo);

router.route('/')
    .all(authorize)
    .get(todos.getAll)
    .post(todos.createTodo);

module.exports = router;