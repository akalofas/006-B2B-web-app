exports.emailVerificationTemplate = (verifyToken, userId) => {
    // With timestamp we use the secret key from env to secure against unauthorized use
	const timestamp = new Date().getTime();
	const hash = crypto
		.createHmac('sha256', process.env.SECRET_KEY)
		.update(userId + timestamp)
		.digest('hex');

	const frontUrl = process.env.FRONT_PORT
		? `${process.env.FRONT_URL}:${process.env.FRONT_PORT}`
		: `${process.env.FRONT_URL}`;

    // Combine timestamp, hash and verify token
	const verificationLink = `${frontUrl}/api/v1/user/verify/${verifyToken}?ts=${timestamp}&hash=${hash}&uid=${userId}`;

	return `
        <h1>Verify your email address</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
    `;
};
