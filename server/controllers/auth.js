const database = require('../database/database');
const User = require('../database/models/User');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const { Op } = require('sequelize');

const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: username}, {email: email}]
            }
        });

        if (user) {
            res.status(401).send("User already exists!");
        } else {
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                username: username,
                password: bcryptPassword,
                email: email
            });

            console.log(newUser);

            const token = jwtGenerator({
                id: newUser.dataValues.id,
                username: newUser.dataValues.username
            });

            res.json({ token: token });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error!');
    }
};

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { username: username }
        });

        console.log(user.dataValues.id);

        if (!user) {
            res.status(401).send("User doesn't exist!");
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).send('Username or password is incorrect!');
            } else {
                const token = jwtGenerator({
                    id: user.dataValues.id,
                    username: user.dataValues.username
                });

                res.json({ token: token });
            }
        }

    } catch (err) {
        console.error(err);
    }
}

const verify = async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error!');
    }
}

module.exports = {
    signUp: signUp,
    signIn: signIn,
    verify: verify
};