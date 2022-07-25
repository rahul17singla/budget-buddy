const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./config.env" })

const port = process.env.PORT || 5000;


//middlewares
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./db/connection.js');


//using the routes
app.use(require('./routes/route'));



con.then(db => {
    if (!db) {
        return process.exit(1);
    }

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('./client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
        });
    }

    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
    });

    app.on('error', err => {
        console.log("Failed to connect to the Server");
    })
}).catch(err => {
    console.log(`Connection failed... ${err}`);
})


