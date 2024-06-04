exports.logoutUser = (req, res) => {
	// Clear the HTTP-only cookie that holds the JWT
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)
    });

    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

