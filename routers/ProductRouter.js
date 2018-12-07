var productController = require('../controllers/ProductController');
var jwt = require('jsonwebtoken');

module.exports = function (app, verifyToken) {

    app.get('/api/products', function (req, res) {
        return productController.findAll(req, res);
    });

    app.get('/api/products/:id', function (req, res) {
        return productController.findById(req, res);
    });

    app.post('/api/products', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return productController.insert(req, res);
        });
    });

    app.post('/api/products/:id', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return productController.update(req, res);
        });
    });

    app.delete('/api/products/:id', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return productController.delete(req, res);
        });
    });

    app.get('/api/products/category/:id', function (req, res) {
        return productController.findByIdCategory(req, res);
    });

    app.get('/api/products/brand/:id', function (req, res) {
        return productController.findByIdBrand(req, res);
    });

};