const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUser, postUser, deleteUser } = require('../controllers/user.controller');
const { isValidRole, emailExist, userIdExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validations');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isValidRole),
    validateFields
] ,putUser);

router.post('/', 
[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'The password is required and must be longer than 6 letters').isLength({ min: 6 }),
    //check('role', 'The role is not valid').isIn(['ADMIN', 'USER']),
    check('role').custom(isValidRole),
    validateFields
], postUser);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
] ,deleteUser);

module.exports = router;