var AccountController = require('../controllers/AccountController');
var jwt = require('jsonwebtoken');

module.exports = function (app, verifyToken) {

    app.get('/api/accounts', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return AccountController.findAll(req, res);
        });
    });

    app.get('/api/accounts/:username', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return AccountController.findByUsername(req, res);
        });
    })

    app.post('/api/accounts/', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return AccountController.insert(req, res);
        });
    })

}


