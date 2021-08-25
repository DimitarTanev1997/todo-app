const checkSignUpData = (req, res, next) => {
    const { username, password, email } = req.body;

    if (![username, password, email].every(Boolean)) {
        return res.status(401).send('Missing Credentials!');
    }

    if (!/^[a-zA-Z0-9_\.\-]*$/.test(username)) {
        return res.status(401).send('Invalid username!');
    }

    // 8 chars min, at least one letter and one number
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        return res.status(401).send('Invalid password!');
    }

    // 8 chars min, at least one letter and one number
    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return res.status(401).send('Invalid email address!');
    }
    
    next();
};

module.exports = checkSignUpData;