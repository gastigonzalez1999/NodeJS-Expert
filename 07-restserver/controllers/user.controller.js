const { response } = require('express');

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

const postUser = (req, res = response) => {
    const { nombre, edad } = req.body; 

    res.json({
        msg: 'post API',
        nombre,
        edad,
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