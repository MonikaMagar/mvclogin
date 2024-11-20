const mongoose = require("mongoose");

const connect = () => {
    const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/db'; 
    mongoose.connect(dbURI)
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log("Error connecting to database:", error);
        });
};

module.exports = connect;
