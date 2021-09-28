const database = require('../database/database');
const Todo = require('../database/models/Todo');
const { Op   } = require("sequelize");

const createTodo = async (req, res) => {
    try {
        const userId = req.user.id;

        if (userId) {
            const todo = await Todo.create({
                ...req.body,
                userId: userId
            });
            
            res.status(201).send(todo);
        } else {
            res.status(400).json({ message: 'Invalid user!'});
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err });
    }
}

const deleteTodo = async (req, res) => {
    const todoId = Number(req.params.todoId);

    try {
        Todo.destroy({
            where: { id: todoId }
        });
        
        res.status(200).json({ message: 'Item deleted!' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

const updateTodo = async (req, res) => {
    const todoId = Number(req.params.todoId);

    try {
        const response = await Todo.update(
            { 
                title: req.body.title,
                body: req.body.body,
                completed: req.body.completed,
                pinned: req.body.pinned,
                section: req.body.section
            },
            { returning: true, where: { id: todoId } }
        );

        const updatedTodo = response[1][0];

        res.status(200).send(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

const getAll = async (req, res) => {
    const queryFilterKey = Object.keys(req.query)[0];
    const queryFilterValue = req.query[queryFilterKey];

    let whereStatement = {};

    if (queryFilterKey || queryFilterValue) {
        if (queryFilterKey === 'queryString') {
            whereStatement = {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${queryFilterValue}%` 
                        }
                    },
                    {
                        body: {
                            [Op.iLike]: `%${queryFilterValue}%` 
                        }
                    }
                ]
            };
        } else {
            whereStatement = {
                [queryFilterKey]: queryFilterValue
            };
        }
    }

    try {
        const userId = req.user.id;    

        if (userId) {
            const response = await Todo.findAll({
                where: {
                    userId: userId,
                    ...whereStatement
                },
                order: [
                    [ 'pinned', 'desc nulls last'],
                    [ 'completed', 'desc'],
                    [ 'updatedAt', 'asc']
                ],
            })

            res.status(200).send(response);
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

module.exports = {
    getAll: getAll,
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
};