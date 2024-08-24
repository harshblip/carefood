import prisma from "./prisma";
import bcrypt from 'bcryptjs';

// READ
// Get unique user by id
export const getUserByID = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
};

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    });
    return user;
};

// CREATE
export const createUser = async (name, email, password, city, phoneNumber, funFood) => {
    // Hashing the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const userr = getUserByEmail(email);
    if (userr) {
        const status = "User already exists"
        return status
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            city,
            phoneNumber,
            funFood,
        },
    });

    // retrieve the newly created user to return
    const user = await getUserByID(newUser.id);

    return user;
};

export const checkUserByEmail = async (email) => {
    const user = await prisma.tokens.findUnique({
        where: {
            email,
        },
    });
    return !!user; // Return true if user exists, false otherwise
};

