const mangoose = require('mongoose');

const bookSchema = new mangoose.Schema({
    bookName : String,
    authorName : String,
    category : String,
    year : Number,

},

{ timestamps: true });
//module.exports = mongoose.model('User', userSchema) //users
 module.exports = mangoose.model('Users', bookSchema)