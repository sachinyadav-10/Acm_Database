const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    officerId: String,
    name: String,
    designation: String,
    description: String,
    photo: String // This will store the filename of the uploaded photo
});

module.exports = mongoose.model('Officer', officerSchema);
