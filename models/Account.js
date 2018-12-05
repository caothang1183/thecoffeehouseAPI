var connect = require('../utils/database');
var db = connect.database;
var mongoose = connect.mongoose;

var accountSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    phone: Number,
    email: String,
    address: {
        type: String,
        min: 5
    },
    img_url: String,
    status: Boolean,
    role: {
        id: Number,
        name: String,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

var Account = db.model('Account', accountSchema);

module.exports = Account;