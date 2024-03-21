import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createNote } from "../../prisma/Note";

export default async function handle(req, res) {
    // Get the current session data with {user, email, id}
    const session = await getServerSession( req, res, authOptions );
    
    if (req.method == "POST") {
        const { title, body } = req.body;
        // Create a new note
        const note = await createNote(title, body, session);
        return res.json(note);
    }
}
