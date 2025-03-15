const express = require('express');
const router = express.Router();
const{products} = require('../controllers/controller')


router.get('/allproducts', products );

module.exports = router;