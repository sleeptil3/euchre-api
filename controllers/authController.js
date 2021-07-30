require('dotenv').config()
const SECRET = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports.hash = (password) => {
	return crypto.createHmac('sha256', SECRET).update(password).digest('hex').split('').reverse().join('')
}

module.exports.auth = (req, res, next) => {
	const authHeader = req.headers.authorization
	if (authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, SECRET, (err, user) => {
			if (err) {
				res.sendStatus(403)
			} else {
				if (user.username === req.params.username) {
					res.locals.user = user.username
					next()
					// } else if (req.method === 'POST' || req.method === 'DELETE') {
					// 	next()
				} else {
					res.sendStatus(401)
				}
			}
		})
	} else {
		console.error('no auth header')
		res.sendStatus(401)
	}
}

/*
{
	 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDM4ZGRhMmU4OWYzMzUwM2UzMWU3MyIsImlhdCI6MTYyNzYyMjg3NH0._m5LTvxynaMGWm_Qke_tWmzoOxr4oeO-r66f56x4Jp8",
	 "createdUser": {
		  "cardTheme": 0,
		  "_id": "61038dda2e89f33503e31e73",
		  "firstName": "Shawn",
		  "lastName": "Clary",
		  "email": "sclary@icloud.com",
		  "password": "$2a$10$l/sLWdE0Y463/y5hJ3rcG.0wt0StAuIC6NNDCnRNJ8xJxt4NEUiVC",
		  "creationDate": "2021-07-30T05:27:54.277Z",
		  "__v": 0
	 }
}
*/