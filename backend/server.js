require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// All the routes
const routes = require('./routes/user/userRoutes');

// All the limiters
const { generalLimiter } = require('./utils/limiters/generalLimiter');
const { createAccountLimiter } = require('./utils/limiters/createAccountLimiter');

// All the custom utils
const httpsServer = require('./utils/httpsServer');
const dbConnect = require('./utils/dbConnect');


const app = express();
dbConnect().catch(console.error);

app.use(cors({
	credentials: true,
	origin: process.env.FRONT_PORT
		? `${process.env.FRONT_URL}:${process.env.FRONT_PORT}`
		: process.env.FRONT_URL,
}));
app.use(express.json());
app.use(cookieParser());

// Apply general rate limiting to all requests
app.use(generalLimiter);

// Apply different limiter to sensitive routes
app.use('/api/users/register', createAccountLimiter);

// Use the rest of the routes
app.use('/api', routes);

const PORT = process.env.SERVER_PORT || 443;
httpsServer(app).listen(PORT, () => {
	console.log(`Secure server running on ${process.env.SERVER_URL}:${PORT}`);
});
