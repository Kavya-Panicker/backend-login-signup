require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user_models');


const authMiddleware = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;
        console.log('Token:', token);
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
                
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Corrected from process.env.SCERET to process.env.SECRET
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Error authenticating user',
            error: error.message
        });
    }
}

module.exports = authMiddleware;