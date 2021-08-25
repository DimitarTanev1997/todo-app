const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const database = require('./database/database');

database.authenticate()
    .then(() => {
        console.log('DB connected successfully!');
    })
    .catch((error) => {
        console.log(error);
    })

// Create a new express application named 'app'
const app = express();

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});


// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Create an api router and add it to the app
const api = require('./routes/routes');
app.use('/api/', api);


// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// Configure the CORs middleware
app.use(cors());


// This middleware informs the express application to serve our compiled React files. Remember the course by Tony.
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    // app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

