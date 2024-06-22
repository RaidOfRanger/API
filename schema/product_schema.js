const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product_schema = new Schema({
    
    
    Name: {
        type: String,
        require: true
    },
    image: {
        type: String ,
        require: true
    },
    product_code: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    manufacture_date: {
        type: String,
        require: true
    },
    expiry_date: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    status: {
        type: String ,
        require: true
    }
})

const products = mongoose.model('products', product_schema)
module.exports = products

