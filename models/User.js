const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	email: { type: String, required: true, unique: true, trim: true, maxLength: 100 },
	firstName: { type: String, required: true, trim: true, maxLength: 50 },
	lastName: { type: String, required: true, trim: true, maxLength: 50 },
	password: { type: String, required: true, maxLength: 100 },
	cardTheme: { type: Number, default: 0 },
	creationDate: { type: Date, default: Date.now, immutable: true }
})

module.exports = model('User', userSchema)