const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
	name: { 
        type: String, 
        required: true, 
        unique: true,
		enum: ['Admin', 'Mod', 'Salesman', 'User'],
	},
});

module.exports = mongoose.model('UserRole', userRoleSchema);
