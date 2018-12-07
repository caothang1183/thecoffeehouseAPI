var Account = require('../models/Account');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var accountForm = bodyParser.urlencoded({ extended: false });

module.exports = function (app, verifyToken) {

    app.get('/api/accounts', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            Account.find({}, function (error, data) {
                if (error) return res.status(500).send(error).json({ message: 'Something wrong!' });
                return res.status(200).json(data);
            });
        });
    });

    app.get('/api/accounts/:username', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            Account.find({ username: req.params.username }, function (errors, data) {
                if (errors) return res.status(500).json({ message: 'something wrong', errors });
                return res.status(200).json(data);
            });
        });
    });

    app.post('/api/accounts', verifyToken, accountForm, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            Account.create(req.body, (errors, data) => {
                if (errors) return res.status(500).json({ message: 'something wrong', errors });
                res.status(200).json(data);
            });
        });
    });
}
