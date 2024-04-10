const mongoose = require('mongoose');

const UserDeatilsSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    marks: String,
},{
    collection:"UserInfo",
});

mongoose.model('UserInfo', UserDeatilsSchema);