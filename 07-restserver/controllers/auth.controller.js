const { response } =  require('express');
const User =  require('../models/user');
const becryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email : email});

        if (!user) {
            return res.status(400).json({
                msg: 'User/password are not correct - email',
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'User/password are not correct - status: false',
            });
        }

        const validPassword = becryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/password are not correct - password',
            });
        }

        const token = await generateJWT(user.id);


        res.json({
            user,
            token,
        });
        
    } catch (error) {
        return res.json({
            msg: 'Talk to admin',
        });
    }
}

module.exports = {
    login,
}