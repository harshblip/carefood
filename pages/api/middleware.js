import jwt from 'jsonwebtoken';
import { verifyRefreshToken, signAccessToken } from '../../services/token';

export default async function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization?.split(' ')[1]; 
    // Extract access token from headers
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token missing' });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log("token is fresh")
        // Attach the user ID to the request object
        req.userId = decoded.userId;

        // Proceed with the request
        return true;
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

                return true;
            } catch (refreshError) {
                console.error('Error verifying refresh token:', refreshError);
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }

        // Handle other token verification errors
        console.error('Error verifying access token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
