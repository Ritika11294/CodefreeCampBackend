const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://ritikagupta11294:Ritika0112@cluster0.nzv3x8y.mongodb.net/talentBox`
        
    )
}

module.exports = connect