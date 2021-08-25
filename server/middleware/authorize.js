const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {
        return res.status(403).send('Unauthorized!');
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.user;

    next();
};

module.exports = authorize;