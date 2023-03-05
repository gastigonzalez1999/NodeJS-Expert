const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { productExists, categoryExists } = require('../helpers/db-validators');
const { isAdminRole } =  require('../middlewares/validate-roles');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { validateFields } = require('../middlewares/validations');

const router = Router();

router.get('/', [
    validateFields
] , getProducts);

router.get('/:id', [
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(productExists),
    validateFields
] , getProduct);

router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category is required and must be a mongoID').isMongoId(),
    check('category').custom(categoryExists),
    validateFields
] , createProduct);

router.put('/:id', [
    validateJWT,
    check('id').custom(productExists),
    check('name', 'name is required').not().isEmpty(),
    validateFields
] , updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(productExists),
    validateFields
] , deleteProduct);

module.exports = router;