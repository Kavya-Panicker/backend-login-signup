require('dotenv').config()
const express = require('express');
const cookiesParser = require('cookie-parser');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const User = require('./models/user_models');
const app = express();
const bodyParser = require('body-parser');
const Register = require('./router/registerRoute');
const Login = require('./router/loginRoute');
const Home = require('./router/homeRoute');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//routers
app.use('/api',Register)
app.use('/api',Login)
app.use('/api', Home )

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});