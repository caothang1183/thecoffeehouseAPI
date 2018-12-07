var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

// Routers
var HomeRouter = require('./routers/HomeRouter');
var ProductRouter = require('./routers/ProductRouter');
var AccountRouter = require('./routers/AccountRouter');

// Models
var Account = require('./models/Account');

var auth = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets/', express.static('public/assets/'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HomeRouter = HomeRouter(app);
var ProductRouter = ProductRouter(app, verifyToken);
var AccountRouter = AccountRouter(app, verifyToken);

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Not found',
        description: 'Failed to load page'
    });
});

app.post('/api/auth', auth, function (req, res) {
    Account.find({ username: req.body.username }, function (error, account) {
        if (account.length < 0) return res.json({ message: 'user is not exist' });
        if (account[0].role.id !== 1) return res.json({ message: 'account does not have permition' });
        if (!bcrypt.compareSync(req.body.password, account[0].password)) return res.sendStatus(403);
        jwt.sign({ account }, 'secretKey', { expiresIn: '86400s' }, (err, token) => {
            res.json({ token: `WebToken|${token}` });
        })
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['token']; // Format JSON Bearer <access_token>
    if (typeof bearerHeader === 'undefined') return res.sendStatus(403);
    bearerHeader.replace('Bearer', 'WebToken|'); // Change subfix Bearer in to what you want
    const bearer = bearerHeader.split('|'); // Split and get token
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
}

app.listen(port, () => console.log('[TheCoffeeHouse API] Running on port :' + port));
