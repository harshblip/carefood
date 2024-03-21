import prisma from "./prisma";

// READ
// GET unique note by id
export const getNoteByID = async (id) => {
    const note = await prisma.note.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
    return note;
};

// CREATE
export const createNote = async (title, body, session) => {
    // Ensure session?.user.email is defined
    // console.log(session)
    if (!session?.user?.email) {
        throw new Error('email is not defined in the session');
    }

    const newNote = await prisma.note.create({
        data: {
            title,
            body,
            user: { connect: { email: session.user.email } },
        },
    });
    const note = await getNoteByID(newNote.id);

    return note;
};
