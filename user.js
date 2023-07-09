const mongoose = require('mongoose')
mongoose.pluralize(null);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    current: {
        type: Array,
        required: true
    },
    past: {
        type: Array,
        required: true
    },
    medals: {
        type: Object,
        required: true
    }
}, { minimize: false })

const UserModel = mongoose.model("user_data", UserSchema)
module.exports = UserModel