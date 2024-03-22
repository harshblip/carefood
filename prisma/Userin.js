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
        throw new Error('User not found');
    }

    console.log(user.password);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
    // Return the user and token
    await prisma.token.create({
        data: {
            token: "lolz",
            email: email,
        },
    });

    return { user, token };
}
