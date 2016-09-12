const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: String,
    firstname: String,
    lastname: String,
    teamnumber: Number
});

User.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model('User', User);
