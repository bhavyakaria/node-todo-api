let mongoose = require('mongoose');

// Database model in MongoDB
let User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    User
}