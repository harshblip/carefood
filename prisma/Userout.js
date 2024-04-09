import prisma from "./prisma";

export const deleteTokenByUserEmail = async (email) => {
    await prisma.tokens.deleteMany({
        where: {
            email,
        },
    });
};
