exports.passwordChangeTemplate = () => {
	const frontUrl = process.env.FRONT_PORT
		? `${process.env.FRONT_URL}:${process.env.FRONT_PORT}`
		: `${process.env.FRONT_URL}`;

	return `
        <h1>Your Password was Changed</h1>
        <p>If you didn't change your password contact us</p>
    `;
};
