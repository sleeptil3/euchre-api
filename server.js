/////////////
// Imports //
/////////////

const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')


///////////////
// Variables //
///////////////

const app = express()
const port = process.env.PORT || 3033


////////////////
// MIDDLEWARE //
////////////////

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
	console.log("MIDDLEWARE LOG", req.body)
	next()
})
app.use(function (err, req, res, next) {
	console.log("ERROR HANDLER!", err, req, res)
	res.status(500)
	res.render('error', { error: err })
})

mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})

mongoose.connection.once('connected', () => console.log('Connected to Mongo, life is good.'))


////////////
// ROUTES //
////////////

app.all('/', (req, res) => {
	req.method === 'GET' ? res.status(200).json({ msg: "Euchre API root chillin' like a homie" }) : res.status(405).json({ msg: "Only GET request is valid at root level" })
})
app.use('/api', require('./controllers/apiController'))


//////////////
// LISTENER //
//////////////

app.listen(port, () => console.log(`Node Express Server (euchre-app): https://localhost:${port}`))