import prisma from "./prisma";

export const registerNGO = async (
    name,
    directorName,
    address,
    email,
    city,
    description,
    workforce,
    phoneNumber
) => {

    const workforceInt = parseInt(workforce);
    const phoneNumberInt = parseInt(phoneNumber);

    await prisma.ngopapers.create({
        data: {
            name,
            directorName,
            address,
            email,
            city,
            description,
            workforce: workforceInt,
            phoneNumber: phoneNumberInt
        },
    });

};
