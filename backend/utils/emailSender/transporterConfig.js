const nodemailer = require('nodemailer');

exports.transporterConfig = () => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_HOST_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// Verify the connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log(
					'Error with email transporter configuration:',
					error
				);
			} else {
				console.log('Server is ready to take our messages');
			}
		});

		return transporter;
	} catch (error) {
		console.error('Error creating email transporter:', error);
	}
};
