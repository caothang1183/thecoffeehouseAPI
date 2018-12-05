var express = require('express');
var router = express.Router();
var productController = require('../controllers/ProductController');

router.route('/').get(productController.findAll);

router.route('/:id').get(productController.findById);

router.route('/').post(productController.insert);

router.route('/:id').post(productController.update);

router.route('/:id').delete(productController.delete);

router.route('/category/:id').get(productController.findByIdCategory);

router.route('/brand/:id').get(productController.findByIdBrand);

module.exports = router;