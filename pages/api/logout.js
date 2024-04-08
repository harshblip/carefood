import prisma from "../../prisma/prisma";

export const deleteTokenByUserId = async (userId) => {
    await prisma.tokens.deleteMany({
        where: {
            userId,
        },
    });
};
