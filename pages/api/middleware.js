import jwt from 'jsonwebtoken';
import { verifyRefreshToken, signAccessToken } from '../../services/token';

export default async function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    // Extract access token from headers
    if (!accessToken) {
        const message = 'Access token missing'
        return message;
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log("token is fresh")
        // Attach the user ID to the request object
        req.userId = decoded.userId;
        const message = 'success'
        // Proceed with the request
        return { message };
    } catch (error) {
        // refreshing the access token if it is expired
        if (error.name === 'TokenExpiredError') {
            try {
                // Use the refresh token to obtain a new access token
                const refreshToken = req.cookies.refreshToken;
                const newAccessToken = signAccessToken(verifyRefreshToken(refreshToken));

                // Update request headers with the new access token
                req.headers.authorization = `Bearer ${newAccessToken}`;
                console.log("access token refreshed")
                const message = 'success'
                return { message };
            } catch (refreshError) {
                console.error('Error verifying refresh token:', refreshError);
                const message = 'Error verifying refresh token'
                return { message };
            }
        }

        // Handle other token verification errors
        console.error('Error verifying access token:', error);
        const message = 'Error verifying access token'
        return { message };
    }
}
