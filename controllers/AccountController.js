var Account = require('../models/Account');
var bcrypt = require('bcrypt');

exports.findAll = (req, res) => {
    Account.find({}, function (error, data) {
        if (error) return res.status(500).send(error).json({ message: 'Something wrong!' });
        return res.status(200).json(data);
    });
}

exports.findByUsername = (req, res) => {
    let username = req.params.username;
    Account.find({ username: username }, function (errors, data) {
        if (errors) return res.status(500).json({ message: 'something wrong', errors });
        return res.status(200).json(data);
    });
}

exports.insert = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    Account.create(req.body, (errors, data) => {
        if (errors) return res.status(500).json({ message: 'something wrong', errors });
        res.status(200).json(data);
    });
}
