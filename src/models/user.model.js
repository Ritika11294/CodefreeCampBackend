// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name : {type: String, required: true},
//     email : {type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
//     password : {type: String, required: true},
//     // googleId: { type: String}
// })

// module.exports = mongoose.model('User', userSchema)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { type: String, required: true },
    // googleId: { type: String }
});

module.exports = mongoose.model('User', userSchema);