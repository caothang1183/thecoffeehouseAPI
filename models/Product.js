var connect = require('../utils/database');
var db = connect.database;
var mongoose = connect.mongoose;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var productSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    price: Number,
    quantity: Number,
    quantity_sold: Number,
    info: {
        type: String,
        min: 5
    },
    description: {
        type: String,
        min: 5
    },
    category: {
        id: Number,
        name: String,
        parent_id: Number,
        isParent: Boolean
    },
    brand: {
        id: Number,
        name: String,
        country: String,
    },
    images: [
        {
            id: Number,
            url: String,
            status: Boolean
        },
        {
            id: Number,
            url: String,
            status: Boolean
        },
        {
            id: Number,
            url: String,
            status: Boolean
        },
        {
            id: Number,
            url: String,
            status: Boolean
        }
    ],
    status: Boolean,
    created_at: {
        type: Date,
        default: new Date()
    }
});

var Product = db.model('Product', productSchema);

productSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'id'
});

module.exports = Product;