const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, deleteCategory, updateCategory, getCategory, getCategories } = require('../controllers/categories.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const { categoryExists } = require('../helpers/db-validators');
const { isAdminRole } =  require('../middlewares/validate-roles');
const { validateFields } = require('../middlewares/validations');

const router = Router();

router.get('/', [
    validateFields
] , getCategories);

router.get('/:id', [
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
] , getCategory);

router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
] , createCategory);

router.put('/:id', [
    validateJWT,
    check('id').custom(categoryExists),
    check('name', 'name is required').not().isEmpty(),
    validateFields
] , updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(categoryExists),
    check('name', 'name is required').isEmail(),
    validateFields
] , deleteCategory);

module.exports = router;