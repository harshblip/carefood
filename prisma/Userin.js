import prisma from "./prisma";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// GET
export const getUserByID = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
};

// CREATE
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        const status = 'You are not in the database'
        return { status }
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    // console.log(user, isValidPassword);
    if (!isValidPassword) {
        const status = 'Password incorrect'
        return { status }
    }

    // Generate Access token
    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    // Generate Refresh Token
    const refreshToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

    await prisma.tokens.create({
        data: {
            email: email
        },
    });

    return { user, accessToken, refreshToken };
}
