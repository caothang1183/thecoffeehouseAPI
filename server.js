var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

// Routers
var HomeRouter = require('./routers/HomeRouter');
var HomeRouter = HomeRouter(app);
var ProductRouter = require('./routers/ProductRouter');
var ProductRouter = ProductRouter(app, verifyToken);
var AccountRouter = require('./routers/AccountRouter');
var AccountRouter = AccountRouter(app, verifyToken);

// Models
var Account = require('./models/Account');

var auth = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets/', express.static('public/assets/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Not found',
        description: 'Failed to load page'
    });
});

app.post('/api/auth', auth, function (req, res) {
    Account.find({ username: req.body.username }, function (error, account) {
        if (account.length > 0) {
            if (bcrypt.compareSync(req.body.password, account[0].password)) {
                jwt.sign({ account }, 'secretKey', { expiresIn: '86400s' }, (err, token) => {
                    res.json({
                        token: `WebToken|${token}`
                    });
                })
            } else res.sendStatus(403);
        } else res.json({ message: 'user is not exist' });
    });
});

function verifyToken(req, res, next) {
    // Format JSON Bearer <access_token>
    const bearerHeader = req.headers['token'];
    if (typeof bearerHeader !== 'undefined') {
        // Change subfix Bearer in to what you want
        bearerHeader.replace('Bearer', 'WebToken|')
        // Split and get token
        const bearer = bearerHeader.split('|');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(port, () => console.log('[TheCoffeeHouse API] Running on port :' + port));
