const https = require('https');
const fs = require('fs');

const createSecureServer = (app) => {
	return https.createServer(
		{
			key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
			cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH),
		},
		app
	);
};

module.exports = createSecureServer;
