var HomeController = require('../controllers/HomeController');

module.exports = function (app) {
    app.get('/api', function (req, res) {
        return HomeController.index(req, res);
    });
};