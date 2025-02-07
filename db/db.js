const mongoose = require("mongoose");

const connectToDb = async () => {
    await mongoose
        .connect('mongodb+srv://shekhasifofficial2024:4b2VZLlqnhE5TS3j@cluster0.qi88c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {
            console.log('db connected');
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectToDb;