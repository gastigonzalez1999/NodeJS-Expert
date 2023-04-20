const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const User = require('../models/user');
const Product = require('../models/product');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);



const loadFile = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    try {
        const name = await uploadFile(req.files, undefined, 'imgs');

        res.json({
            name: name,
        });

    } catch (error) {
        res.status(400).json({
            error,
        });
    }
};

const updateFile = async (req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    const { id, collection } =  req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'Such user doesnt exist'
                });
            }

            break;

        case 'products':
            model = await Product.findById(id);
    
            if (!model) {
                return res.status(400).json({
                    msg: 'Such product doesnt exist'
                });
            }
                
            break;
    
        default:
            return res.status(500).json({
                msg: 'This is not validated'
            });
    }

    
    if (model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json({
      model,  
    });
};


//Same as above but using a third party library to upload and store images// ------ This is the one we are using --------
const updateFileCloudinary = async (req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    const { id, collection } =  req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'Such user doesnt exist'
                });
            }

            break;

        case 'products':
            model = await Product.findById(id);
    
            if (!model) {
                return res.status(400).json({
                    msg: 'Such product doesnt exist'
                });
            }
                
            break;
    
        default:
            return res.status(500).json({
                msg: 'This is not validated'
            });
    }

    
    if (model.img) {
        const arrName = model.img.split('/');
        const name = arrName[arrName.length -1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy(public_id);
        
    }

    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json({
      model,  
    });
};

const showImage = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    const { id, collection } =  req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'Such user doesnt exist'
                });
            }

            break;

        case 'products':
            model = await Product.findById(id);
    
            if (!model) {
                return res.status(400).json({
                    msg: 'Such product doesnt exist'
                });
            }
                
            break;
    
        default:
            return res.status(500).json({
                msg: 'This is not validated'
            });
    }

    
    if (model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }
    }

    const noImagePath = path.join(__dirname, '../assets/no-image.png');

    res.sendFile(noImagePath);
};

module.exports = {
    loadFile,
    updateFile,
    showImage,
    updateFileCloudinary
}