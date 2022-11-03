Record = require('../model/recordModel')
const Redis = require('redis')

const client = Redis.createClient()
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().then(() => console.log('Redis connection established.'))
    .catch(() => console.log('Redis connection failed.'))
client.flushAll()

exports.index = async function (req, res) {
    var photos = await client.get('photos', (err, r) => {if (err) console.log(err)})
    if (photos != null) {
        console.log("CACHE HIT!")
        res.json({
            status: "success",
            message: "Photos retrieved successfully",
            data: photos
        })
    } else {
        console.log("CACHE MISS!")
        var data = await Record.find({})
        await client.set('photos', JSON.stringify(data))
        res.json({
            status: "success",
            message: "Photos retrieved successfully",
            data: data
        })
    }
}