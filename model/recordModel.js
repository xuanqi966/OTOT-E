var mongoose = require('mongoose')

// setup schema
var recordSchema = mongoose.Schema({
    albumId: Number,
    id: Number,
    title: String,
    contact_number: String,
    url: String,
    thumbnailUrl: String
})

// export Borrow model
var Record = module.exports = mongoose.model('record', recordSchema)
module.exports.get = function (callback, limit) {
    Record.find(callback).limit(limit)
}