const { response } = require("express");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'category',
    'products',
    'roles',
];

const searchUsers = async (term, res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        res.json({
            results: (user) ? [user] : [],
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({name: regex, status: true});

    res.json({
        results: users,
    });
};

const searchCategories = async (term, res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [category] : [],
        });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}],
    });

    res.json({
        results: categories,
    });
};

const searchProducts = async (term, res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate('category', 'name');
        res.json({
            results: (product) ? [product] : [],
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, status: true }).populate('category', 'name');

    res.json({
        results: products,
    });
};


const search = (req, res = response) => {
    const { collection, term } =  req.params;

    if (allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allowed collections are ${allowedCollections}`
        });
    }
    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'category':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        case 'roles':
            searchRoles(term, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'You forgot to do this search'
            });
    }
};

module.exports = {
    search,
}