const { response } = require("express");
const Product  = require('../models/product');

const getProducts = async (req, res = response) => {
    try {
        const { limit = 5, from = 5} = req.query;
        const query = { status : true};

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(from))
                .limit(Number(limit)),
    ]);

    res.json({
       total,
       products,
    });
        
    } catch (error) {
        console.log(error);
    }

};

const getProduct = async (req, res = response) => {
    try {
        const { id } = req.params;
        const productById = await Product.findById({ id })
            .populate('user', 'name')
            .populate('category', 'name');

        if (!productById) {
            res.status(500).json({
                msg: `This product ID does not exist in the DB`,
            });
        }

        res.status(201).json({
            productById,
        });
        
    } catch (error) {
        console.log(error);
    }

};

const createProduct = async (req, res = response) => {
    try {
        const { status, user, ...body } = req.body;
        const existentProduct = await Product.findOne({ name: body.name });

        if (existentProduct) {
            res.status(400).json({
                msg: `This product ${existentProduct.name} already exist in the db`,
            });
        }

        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id,
        };

        const product = new Product(data);

        await product.save();

        res.status(201).json({
            product,
        });

    } catch (error) {
        
    }
};

const updateProduct = async (req, res =  response) => {
    try {
        const productId = req.params.id;
        const { status, user, ...data } = req.body;

        if (data.name) {
            data.name = data.name.toUpperCase();
        }

        data.user = req.user._id;

        const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true });

        if (!updatedProduct) {
            res.status(500).json({
                msg: `This category does not exist in the db`,
            });
        }

        await updatedProduct.save();

        res.status(201).json({
            updatedProduct,
        });
        
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res = response) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndUpdate( id, { status: false}, {new : true});

        if (!deletedProduct) {
            res.status(500).json({
                msg: `This category does not exist in the db`,
            });
        }

        res.status(204).json({
            deletedProduct,
        });
        
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}