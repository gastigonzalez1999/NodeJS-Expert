const { response, json } =  require('express');
const User =  require('../models/user');
const becryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);

        let user = await User.findOne({email : googleUser.email});

        if (!user) {
            const data = {
                name: googleUser.name,
                email: googleUser.email,
                password: '',
                img: googleUser.picture,
                google: true,
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Contact the admin - User blocked',
            });
        }

        const token = await generateJWT(user.id);

        res.json({
           user,
           token,
        });
        
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'Not able to verify token',
        });
    }
};

const renovateToken = async (req, res = response) => {
    const { user } = req;
    const token = await generateJWT(user.id);

    res.json({
        user,
        token,
    });
};

module.exports = {
    login,
    googleSignIn,
    renovateToken,
}