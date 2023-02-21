const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validations');

const router = Router();

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
] , login);

router.post('/google', [
    check('id_token', 'google token is required').not().isEmpty(),
    validateFields
] , googleSignIn);

module.exports = router;