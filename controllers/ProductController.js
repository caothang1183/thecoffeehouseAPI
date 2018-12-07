var Product = require('../models/Product');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var productForm = bodyParser.urlencoded({ extended: false });

module.exports = function (app, verifyToken) {

    app.get('/api/products', function (req, res) {
        Product.find({}, function (error, data) {
            if (error) return res.status(500).send(error).json({ message: 'Something wrong!' });
            return res.status(200).json(data);
        });
    });

    app.get('/api/products/:id', function (req, res) {
        let id = req.params.id;
        Product.find({ id: id }, function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            return res.status(200).json(data);
        });
    });

    app.post('/api/products', verifyToken, productForm, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            Product(req.body).save(function (error, data) {
                if (error) return res.status(500).send(error).json({ message: 'Something wrong!' });
                return res.status(200).json(data );
            });
        });
    });

    app.post('/api/products/:id', verifyToken, productForm, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            let id = req.params.id;
            Product.findOneAndUpdate({ _id: id }, req.body).exec(function (errors, data) {
                if (errors) return res.status(500).json({ message: 'something wrong', errors });
                return res.status(200).json({ message: 'update successfully' });
            });
        });
    });

    app.delete('/api/products/:id', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            let id = req.params.id;
            Product.deleteOne({ _id: id }, function (errors, data) {
                if (errors) return res.status(500).json({ message: 'something wrong', errors });
                return res.status(200).json(data);
            });
        });
    });

    app.get('/api/products/brand/:id', function (req, res) {
        let id = req.params.id;
        Product.find({ 'brand.id': id }).sort({ id: 'asc' }).exec(function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            return res.status(200).json(data);
        });
    });

    app.get('/api/products/category/:id', function (req, res) {
        let id = req.params.id;
        Product.find({ 'category.id': id }).sort({ id: 'asc' }).exec(function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            return res.status(200).json(data);
        });
    });

};
