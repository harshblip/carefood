import prisma from "./prisma";

export const updatePaymentStatus = async (restid) => {
    await prisma.order.update({
        where: {
            id: restid
        },
        data: {
            orderStatus: 'paid'
        }
    })
}