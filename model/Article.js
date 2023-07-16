const {Schema, model} = require ('mongoose')

const UserSchema = new Schema({
    title: String,
    body: String,
    cover: String,
    role: {
        type: String,
        enum:['user', 'admin'],
        default:'draft'
    },
    author:{
        type: 'ObjectId',
        ref: 'User'
    }
    
    
},{timestamps: true, id: true})

const User = model('User', UserSchema)

module.exports = User