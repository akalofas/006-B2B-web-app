### Project Documentation

#### Introduction

This documentation outlines the structure and functionality of our Node.js-based backend application. The application is designed for robust user management, including registration, login, and role-based access control, secured with JSON Web Tokens (JWT) and rate limiting.

#### Project Structure

in the route of the project in order to install the Backend packages and start the Backend server

```
npm install
npm start
```

For the installation of the Frontend packages and start of the Frontend client

```
cd frontend
npm install
npm start
```

##### Backend

The project is organized into modular components to facilitate maintainability and scalability:

- **`/middleware`**
  - `authenticateJWT.js` - Validates JWT for authenticated routes.
  - `authorizeRoles.js` - Ensures users have appropriate roles for specific actions.
- **`/models`**
  - `User.js` - Mongoose schema for user data.
  - `UserRole.js` - Mongoose schema for defining user roles.
- **`/utils`**
  - `/auth`
    - `generateRefreshToken.js` - Handles generation of refresh tokens.
    - `verifyRefreshToken.js` - Validates refresh tokens.
  - `/emailSender`
    - `sendEmail.js` - Utility for sending emails via SMTP.
    - `transporterConfig.js` - Configures Nodemailer transporter.
    - `emailVerificationTemplate.js` - Template for email verification.
    - `passwordChangeTemplate.js` - Template for password change notification.
  - `/limiters`
    - `createAccountLimiter.js` - Rate limiter for account creation requests.
    - `emailVerificationLimiter.js` - Rate limiter for email verification attempts.
    - `generalLimiter.js` - General rate limiter for API requests.
  - `httpsServer.js` - Sets up HTTPS server.
  - `dbConnect.js` - Manages MongoDB database connection.
- **`/controllers`**
  - `/auth`
    - `refreshToken.js` - Controller for token refresh logic.
  - `/user`
    - `loginUser.js` - Manages user login.
    - `logoutUser.js` - Handles user logout.
    - `registerUser.js` - Controls user registration.
    - `updateUser.js` - Updates user information.
    - `getAllUsers.js` - Retrieves all users.
    - `verifyEmail.js` - Handles email verification.
- **`/routes`**
  - `userRoutes.js` - Defines routes for user-related operations.
- **`/cert`**
  - SSL certificates for HTTPS configuration.

###### Routes and Endpoints

The application defines several endpoints under the `/api` prefix:

- **Registration**

  ```json
  POST /api/users/register
  Request: {
    "username": "email@example.com",
    "password": "yourSecurePassword"
  }
  Response: {
    "message": "User registered. Please verify your email."
  }
  ```
- **Login**

  ```json
  POST /api/users/login
  Request: {
    "username": "email@example.com",
    "password": "yourSecurePassword"
  }
  Response: {
    "message": "Logged in successfully"
  }
  ```
- **Logout**

  ```json
  POST /api/users/logout
  Response: {
    "message": "Logged out successfully"
  }
  ```
- **Refresh Token**

  ```json
  POST /api/auth/refresh-token
  Response: {
    "accessToken": "newAccessToken"
  }
  ```
- **Verify Email**

  ```json
  GET /api/users/verify-email/:token
  Response: {
    "message": "Your account has been successfully verified."
  }
  ```
- **Get All Users (Admin only)**

  ```json
  GET /api/users/
  Response: [
    {
      "username": "email@example.com",
      "role": "User"
    }
  ]
  ```
- **Update User Information**

  ```json
  PATCH /api/users/update
  Request: {
    "oldUsername": "email@example.com",
    "newUsername": "newEmail@example.com",
    "oldPassword": "currentPassword",
    "newPassword": "newSecurePassword"
  }
  Response: {
    "message": "Update successful."
  }
  ```

###### Packages Used

The application utilizes the following npm packages:

- `bcryptjs`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `express-rate-limit`
- `helmet`
- `https`
- `jsonwebtoken`
- `mongoose`
- `nodemailer`

###### Version Information

- **npm**: 10.8.1
- **node**: 21.7.1

##### FrontEnd

###### Not Yet Created



#### Conclusion

This documentation aims to provide all the necessary information to understand and navigate the full infrastructure of the project.

If any problems, issues, bugs, ideas please contact me.
