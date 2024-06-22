const mongoose = require('mongoose')
const Schema = mongoose.Schema

const register_schema = new Schema({
    
    
    name: {
        type: String,
        require: true
    },
    email: {
        type: String ,
        require: true
    },
    password: {
        type: String,
        require: true
    }

})

const register_user = mongoose.model('register_user', register_schema)
module.exports = register_user

