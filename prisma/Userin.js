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
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    // console.log(user, isValidPassword);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    
    // Generate JWT token
    const jwtoken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    // Return the user and token
    await prisma.tokens.create({
        data: {
            token: jwtoken,
            email: email,
            currentTime: currentTime,
            expirationTime: expirationTime,
        },
    });
    
    return { user, jwtoken };
}
