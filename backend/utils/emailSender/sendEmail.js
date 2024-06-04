const { transporterConfig } = require('./transporterConfig');

exports.sendEmail = async (email, subject, htmlContent) => {
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: email,
		subject: subject,
		html: htmlContent,
	};

	try {
		await transporterConfig.sendMail(mailOptions);
		console.log(`Email sent to ${email} with subject ${subject}`);
	} catch (error) {
		console.error(`Error sending to ${email} with subject ${subject}:`, error);
	}
};
