const mongoose = require('mongoose');

const dbConnect = async () => {
	const MONGO_URI = `${process.env.mongoDB_URI_FIRST_PART}${process.env.mongoDB_username}:${process.env.mongoDB_password}${process.env.mongoDB_CLUSTER}${process.env.mongoDB_DB}${process.env.mongoDB_OPTIONS01}`;

	console.log('MongoDB URI:', MONGO_URI); // Ensure it prints correctly

	const clientOptions = {
		serverApi: { version: '1', strict: true, deprecationErrors: true },
	};

	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(MONGO_URI, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1); // Exit process with failure
	}
};

module.exports = dbConnect;
