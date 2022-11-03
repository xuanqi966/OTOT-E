let express = require('express')
let apiRoutes = require('./routes/api-routes')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let data = require('./photos.json')
Record = require('./model/recordModel')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

let app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

initDb()

var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Home page of OTOT-E'))

app.use('/photos', apiRoutes)

app.listen(port, () => {
    console.log("Running on port " + port)
})

module.exports = app

function initDb() {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});

    var db = mongoose.connection

    if(!db)
        console.log("Error connecting db")
    else
        console.log(`DB connected successfully under env=${process.env.NODE_ENV}`)

    // Record.collection.deleteMany({}, (err, r) => {
    //     console.log("res=", r)
    // })

    Record.collection.insertMany(data, (err, r) => {
        if (err!=null) {
            console.log("ERR=", err)
        }
        console.log("Insertion complete")
    }
    )
}