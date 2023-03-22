const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, showImage, updateFileCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers/db-validators');
const { validateFile } = require('../middlewares/validate-file');
const { validateFields } = require('../middlewares/validations');

const router = Router();

router.post('/', [
    validateFile,
    validateFields
] , loadFile);

router.put('/collection/:id', [
    validateFile,
    check('id', 'The Id must be a mongoId').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateFileCloudinary);

router.get('/:collection/:id', [
    check('id', 'The Id must be a mongoId').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
] , showImage);

module.exports = router;