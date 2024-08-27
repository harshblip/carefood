import prisma from "./prisma";

export const createOrder = async (items, address, orderStatus, restaurantName, userEmail, orderTime, price, restId) => {

    const findOrder = await prisma.order.findFirst({
        where: {
            userEmail: userEmail,
            restaurantName: restaurantName
        },
        include: {
            items: true
        }
    })

    if (findOrder) {
        await prisma.order.update({
            where: {
                id: findOrder.id
            },
            data: {
                items: {
                    createMany: {
                        data: items,
                    }
                },
                totalAmt: {
                    increment: price
                }
            }
        })
    } else {
        await prisma.order.create({
            data: {
                items: { createMany: { data: items } },
                address,
                orderStatus,
                restaurantName,
                user: { connect: { email: userEmail } },
                orderTime,
                totalAmt: price,
                restId
            },
        });
    }
}

export const getOrders = async (userEmail) => {
    const orders = await prisma.order.findMany({
        where: {
            userEmail: userEmail,
        },
        include: { items: true },
    });
    return orders;
};

export const deleteOrder = async (id, id2, price, quant) => {
    await prisma.item.delete({
        where: {
            id: id2
        }
    });
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            totalAmt: {
                decrement: quant*price
            }
        }
    })
};

export const updateOrder = async (id, id2, newQ) => {
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            items: {
                update: {
                    where: {
                        id: id2
                    },
                    data: {
                        quantity: newQ
                    }
                }
            }
        }
    })
}

export const updateOrderonDelete = async (id, price) => {
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            totalAmt: {
                decrement: price
            }
        }
    })
}

export const updateOrderonInc = async (id, price) => {
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            totalAmt: {
                increment: price
            }
        }
    })
}

export const deleteCart = async (id) => {
    await prisma.item.deleteMany({
        where: {
            orderId: id
        }
    })
    await prisma.order.delete({
        where: {
            id: id
        }
    })
}
