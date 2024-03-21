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

// CREATE
export const createUser = async (name, email, password, city, phoneNumber, funFood) => {
    // Hashing the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

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

    // Optionally, retrieve the newly created user to return
    const user = await getUserByID(newUser.id);

    return user;
};
