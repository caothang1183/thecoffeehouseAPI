var AccountController = require('../controllers/AccountController');
var bodyParser = require('body-parser');
var AccountForm = bodyParser.urlencoded({ extended: false });

module.exports = function (app, verifyToken) {

    app.get('/api/accounts', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return AccountController.findAll(req, res)
        });
    });

    app.get('/api/accounts/:username', function (req, res) {
        AccountController.findByUsername
    })

    app.post('/api/accounts/', verifyToken, function (req, res) {
        return AccountController.insert(req, res)
    })

}


