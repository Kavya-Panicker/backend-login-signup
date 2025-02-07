require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/user_models');
const register =  async (req, res) => {
    try {
        
        const { name, email, password ,cpassword} = req.body;
        const user = new User({
            name,
            email, 
            password,
            cpassword
        });
       
         await user.save();
        //jwt 
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie('token', token);
        console.log(token)

        res.status(201).json({
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};
module.exports = register;