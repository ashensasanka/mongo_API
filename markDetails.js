const mongoose = require('mongoose');

const MarkDeatilsSchema = new mongoose.Schema({
    name: String,
    marks: String,
},{
    collection:"UserInfo",
});

mongoose.model('UserMarks', MarkDeatilsSchema);