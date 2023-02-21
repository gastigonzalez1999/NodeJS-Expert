const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exist in db',
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - user with false status',
            });
        }

        req.user = user;

        next(); 
    } catch (error) {
        console.log(err);
        res.status(401).json({
            msg: 'invalid token',
        });
    }
};

module.exports = {
    validateJWT,
}