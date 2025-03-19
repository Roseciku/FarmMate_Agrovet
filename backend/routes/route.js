const express = require('express');
const router = express.Router();
const{products} = require('../controllers/productController')
const{registerUser, loginUser, refreshToken } = require('../controllers/userController')


router.get('/allproducts', products );
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshToken)

module.exports = router;