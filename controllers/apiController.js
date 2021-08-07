const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { hash } = require('./authController')
const User = require('../models/User');
const SECRET = process.env.SECRET_KEY
const Deck = require('../classes/deck')

////////////
// CREATE //
////////////


// Registration Route (POST)

router.post('/register', async (req, res) => {
	const hashedPassword = hash(req.body.password)
	req.body.password = bcrypt.hashSync(hashedPassword, bcrypt.genSaltSync(10))
	try {
		const createdUser = await User.create(req.body)
		const token = jwt.sign({
			id: createdUser._id,
			username: createdUser.username
		}, SECRET)
		res.status(200).json({ token: token, createdUser: createdUser })
	} catch (error) {
		res.status(400).json({ error: "account", msg: `A user with the email '${req.body.email}' already exists.` })
	}
})


// Login Route (POST)

router.post('/login', (req, res) => {
	const { email, password } = req.body
	const hashedPassword = hash(password)
	User.findOne({ email }, (err, foundUser) => {
		if (err) res.status(500).json({ err, msg: "server error on login" })
		else if (!foundUser) {
			res.status(404).json({ error: "user", msg: `No user with the email address '${email}'.` })
		}
		else {
			if (bcrypt.compareSync(hashedPassword, foundUser.password)) {
				const token = jwt.sign({
					id: foundUser._id,
					email: foundUser.email
				}, SECRET)
				res.status(200).json({ token, id: foundUser._id })
			} else {
				res.status(403).json({ error: "password", msg: "The password you entered did not match what we have on file." })
			}
		}
	})
})


// Get Deck

router.get('/deck', (req, res) => {
	const newDeck = new Deck()
	newDeck.generateDeck()
	newDeck.shuffleDeck()
	res.status(200).json({
		msg: "Thank you for using the Euchre Deck Creator 5000! May you be in the barn before you know it!",
		deck: [...newDeck.deck]
	})
})


module.exports = router