var Product = require('../models/Product');

// module.exports = function (app, verifyToken) {

    exports.findAll = (req, res) => {
        Product.find({}).sort({ id: 'asc' }).exec(function (errors, data) {
            if (errors) return res.status(500).send(errors).json({ message: 'something wrong' });
            return res.status(200).json(data);
        });
    }

    exports.findById = (req, res) => {
        let id = req.params.id;
        Product.find({ id: id }, function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            if (!data) return res.status(404).json({ message: 'data not found' });
            return res.status(200).json(data[0]);
        });
    }

    exports.insert = (req, res) => {
        Product.create(req.body, (errors, data) => {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            res.status(200).json(data);
        });
    }

    exports.update = (req, res) => {
        let id = req.params.id;
        Product.findOneAndUpdate({ id: id }, req.body).exec(function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            return res.status(200).json({ message: 'update successfully' });
        });
    }

    exports.delete = (req, res) => {
        let id = req.params.id;
        Product.deleteOne({ id: id }, function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            if (!data) return res.status(404).json({ message: 'data not found' });
            return res.status(200).json(data);
        });
    }

    exports.findByIdBrand = (req, res) => {
        let id = req.params.id;
        Product.find({ 'brand.id': id }).sort({ id: 'asc' }).exec(function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            if (!data) return res.status(404).json({ message: 'data not found' });
            return res.status(200).json(data);
        });
    }

    exports.findByIdCategory = (req, res) => {
        let id = req.params.id;
        Product.find({ 'category.id': id }).sort({ id: 'asc' }).exec(function (errors, data) {
            if (errors) return res.status(500).json({ message: 'something wrong', errors });
            if (!data) return res.status(404).json({ message: 'data not found' });
            return res.status(200).json(data);
        });
    }

// };