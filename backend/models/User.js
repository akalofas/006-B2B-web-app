const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' },
	isVerified: { type: Boolean, default: false },
	verifyToken: { type: String, required: false },
	verifyExpires: { type: Date, required: false },
	newUsername: { type: String, unique: true, sparse: true },
	newUsernameToken: { type: String, required: false },
	newUsernameExpires: { type: Date, required: false },
	refreshToken: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
