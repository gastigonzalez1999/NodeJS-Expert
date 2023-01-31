const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const e = require('express');

const getUsers = (req, res = response) => {
    const { query, nombre, apiKey, page, limit } = req.query;

    res.json({
        msg: 'get API',
        query,
        nombre,
        apiKey,
        page, 
        limit,
    });
};

const postUser = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
        return res.status(400).json({
            error: 'The mail is already registered'
        });
    }

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({ 
        msg: 'post API',
        user,
    });
};

const putUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'put API',
        id,
    });
};

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete API',
    });
};

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
}