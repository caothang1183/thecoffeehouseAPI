var AccountController = require('../controllers/AccountController');

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
        jwt.verify(req.token, 'secretKey', (errors) => {
            if (errors) return res.sendStatus(403);
            return AccountController.insert(req, res)
        });
    })

}


