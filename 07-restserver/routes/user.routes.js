const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUser, postUser, deleteUser } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/validations');
const Role = require('../models/role');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUser);

router.post('/', 
[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required and must be longer than 6 letters').isLength({ min: 6 }),
    //check('role', 'The role is not valid').isIn(['ADMIN', 'USER']),
    check('role').custom( async (role = '') => {
        const roleExist = await Role.findOne({role: role});
        if (!roleExist) {
            throw new Error(`The role ${role} is not registered in DB`);
        }
    }),
    validateFields
], postUser);

router.delete('/', deleteUser);

module.exports = router;