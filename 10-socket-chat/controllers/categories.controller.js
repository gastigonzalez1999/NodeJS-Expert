const { response } = require("express");
const Category = require("../models/category");

const getCategories = async (req, res = response) => {
    try {
        const { limit = 5, from = 5} = req.query;
        const query = { status : true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit)),
    ]);

    res.json({
       total,
       categories,
    });
        
    } catch (error) {
        console.log(error);
    }

};

const getCategory = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoryById = await Category.findById({ id })
            .populate('user', 'name');

        if (!categoryById) {
            res.status(500).json({
                msg: `This category ID does not exist in the DB`,
            });
        }

        res.status(201).json({
            categoryById,
        });
        
    } catch (error) {
        console.log(error);
    }

};

const createCategory = async (req, res = response) => {
    try {
        const name = req.body.name.toUpperCase();
        const existentCategory = await Category.findOne({ name });

        if (existentCategory) {
            res.status(400).json({
                msg: `This category ${existentCategory.name} already exist in the db`,
            });
        }

        const data = {
            name,
            user: req.user._id,
        };

        const category = new Category(data);

        await category.save();

        res.status(201).json({
            category,
        });

    } catch (error) {
        
    }
};

const updateCategory = async (req, res =  response) => {
    try {
        const categoryId = req.params.id;
        const { status, user, ...data } = req.body;

        data.name = data.name.toUpperCase();
        data.user = req.user._id;

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, { new: true });

        if (!updatedCategory) {
            res.status(500).json({
                msg: `This category does not exist in the db`,
            });
        }

        await updatedCategory.save();

        res.status(201).json({
            updatedCategory,
        });
        
    } catch (error) {
        console.log(error);
    }
};

const deleteCategory = async (req, res = response) => {
    try {
        const id = req.params.id;
        const deletedCategory = await Category.findByIdAndUpdate( id, { status: false}, {new : true});

        if (!deletedCategory) {
            res.status(500).json({
                msg: `This category does not exist in the db`,
            });
        }

        res.status(204).json({
            deletedCategory,
        });
        
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}