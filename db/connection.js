const mongoose = require('mongoose');
const con = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/budget-buddy").then(db => {
    console.log("Database Connected");
    return db;
}).catch(err => {
    console.log("Connection Failed!!!");
});


module.exports = con;