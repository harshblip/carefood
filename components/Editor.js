import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { addNote, editNote, setCurrentNote, setNotes } from "../slices/notesSlice";
import { useDispatch, useSelector } from 'react-redux';
import RandomID from "../modules/RandomID";
import { useSession } from "next-auth/react";

const Editor = () => {
    const { data: session, status } = useSession();
    // Accessing the current note
    const currentNote = useSelector(state => state.notes.currentNote);

    // Accessing the array of saved notes
    const notes = useSelector(state => state.notes.notes);

    const dispatch = useDispatch();

    // Function to set the current note
    const setCurrentNoteAction = (note) => {
        dispatch(setCurrentNote(note));
    };

    // Function to set the array of saved notes
    const setNotesAction = (notesArray) => {
        dispatch(setNotes(notesArray));
    };

    // editor note states
    const [title, setTitle] = useState("Hola");
    const [body, setBody] = useState(
        `There once was a ship that put to sea
and the name of the ship was the billy old tea`
    );

    const [noteID, setNoteID] = useState(null);
    const [noteAction, setNoteAction] = useState("add");
    const [isSaved, setIsSaved] = useState(false);

    // function to update textarea content and height
    const updateField = (e) => {
        let field = e.target;
        setBody(field.value);

        // reset textarea height
        field.style.height = "inherit";
        // Get the computed styles for the textarea
        let computed = window?.getComputedStyle(field);
        // calculate the height
        let height =
            parseInt(computed.getPropertyValue("border-top-width"), 10) +
            parseInt(computed.getPropertyValue("padding-top"), 10) +
            field.scrollHeight +
            parseInt(computed.getPropertyValue("padding-bottom"), 10) +
            parseInt(computed.getPropertyValue("border-bottom-width"), 10);
        // set the new height
        field.style.height = `${height}px`;
    };

    // function to save note to saved notes array
    const saveNote = async () => {
        if (title && body) {
            let id = noteID || RandomID(title.slice(0, 5), 5);
            let note = {
                id,
                title,
                body,
            };
            try {
                if (noteAction == "edit") {
                    // Assuming you have a way to handle editing notes
                    // This part remains unchanged
                    // setNotes({ note, type: "edit" });
                    dispatch(editNote(note));
                    console.log({ note, noteAction, noteID, notes });
                } else {
                    let res = await fetch("/api/note", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(note),
                        credentials: 'include',
                    });

                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const newNote = await res.json();
                        console.log("Create successful", { newNote });
                        // Correctly update the notes array by appending the new note
                        dispatch(addNote(newNote));
                    } else {
                        const text = await res.text();
                        console.error("Expected JSON but received:", text);
                    }
                }
                setIsSaved(true);
                note = { title: "", body: "" };
                setTitle(note.title);
                setBody(note.body);
                setCurrentNote(note);
            } catch (error) {
                console.log({ error });
            }
        }
    };

    // enable the button whenever the content of title & body changes
    useEffect(() => {
        if (title && body) setIsSaved(false);
        else setIsSaved(true);
    }, [title, body]);
    // update the editor content whenever the note context changes
    // this acts like a listener whenever the user clicks on edit note
    // since the edit note funtion, sets
    useEffect(() => {
        if (currentNote.title && currentNote.body) {
            setTitle(currentNote.title);
            setBody(currentNote.body);
            setNoteID(currentNote.id);
            setNoteAction(currentNote.action);
        }
    }, [currentNote]);

    return (
        status === 'authenticated' && (
            <div className={"editor"}>
                <div className={"wrapper"}>
                    <div className="editing-area">
                        <div className="title">
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className={"form-input"} placeholder="Title" />
                        </div>
                        <div className="body">
                            <textarea
                                value={body}
                                onChange={(e) => updateField(e)}
                                name="note-body"
                                id="note-body"
                                className="form-textarea"
                                cols="10"
                                rows="2"
                                placeholder="Write something spec ✨"
                            ></textarea>
                        </div>
                    </div>
                    <ul className={"options"}>
                        <li className={"option"}>
                            <button onClick={saveNote} disabled={isSaved} className="cta flex gap-2 items-end">
                                <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                                <span className="">{isSaved ? "Saved" : "Save"}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
};
export default Editor;