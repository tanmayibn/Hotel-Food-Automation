const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotelSchema = new Schema({
    hotelname : { type: String},
    hoteladdr : { type: String},
    email : { type: String},
    manager : { type: String},
    staff : [
        {
            name: String,
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Hotel',hotelSchema)