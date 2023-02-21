const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const e = require('express');

const getUsers = async (req, res = response) => {
    const { limit = 5, from = 5} = req.query;
    const query = { state : true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ]);

    res.json({
       total,
       users,
    });
};

const postUser = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
 
    await user.save();

    res.json({ 
        msg: 'post API',
        user,
    });
};

const putUser =  async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'put API',
        user,
    });
};

const deleteUser = async (req, res = response) => {
    const id = req.params.id;
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: true });
    const authenticatedUser = req.user;

    res.json({
        user,
        authenticatedUser,
    });
};

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
}