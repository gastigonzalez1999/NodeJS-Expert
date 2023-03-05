const Category = require('../models/category');
const Product = require('../models/product');
const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({role: role});
    if (!roleExist) {
        throw new Error(`The role ${role} is not registered in DB`);
    }
}

const emailExist = async (email) => {
    const email = await User.findOne({ email: email });

    if (email) {
        throw new Error(`The email ${email} is already registered`);
    }
}

const userIdExist = async (id) => {
    const id = await User.findById({ id: id });

    if (!id) {
        throw new Error(`The user Id ${id} does not exist`);
    }
}

const categoryExists = async (id) => {
    const id = await Category.findById({ id: id });

    if (!id) {
        throw new Error(`The category Id ${id} does not exist`);
    }
};

const productExists = async (id) => {
    const id = await Product.findById({ id: id });

    if (!id) {
        throw new Error(`The product Id ${id} does not exist`);
    }
};

module.exports = {
    isValidRole,
    emailExist,
    userIdExist,
    categoryExists,
    productExists,
}