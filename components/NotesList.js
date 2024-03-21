// NoteList.js
"use client"

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote, editNote, setCurrentNote, setNotes } from '../slices/notesSlice';
import { PencilAltIcon, ExternalLinkIcon, TrashIcon } from '@heroicons/react/solid';

export default function NotesList ({ children }) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const currentNote = useSelector(state => state.notes.currentNote);

    // usage of dispatch and notes
    const removeaNote = (note) => {
        let confirmDelete = confirm("Do you really really want to delete this note ?");
        confirmDelete ? dispatch(removeNote(note)) : null;
        // dispatch(removeNote(note));
    }

    const editaNote = (note) => {
        dispatch(editNote(note));
    }
    console.log(notes);
    return (
        <div>
            <div className="notes">
                {notes && notes.length > 0 ? (
                    <ul className="note-list">
                        {notes.map((note) => (
                            <li key={note.id} className="note-item">
                                <article className="note">
                                    <header className="note-header">
                                        <h2 className="text-2xl">{note.title}</h2>
                                    </header>
                                    <main className=" px-4">
                                        <p className="">{note.body}</p>
                                    </main>
                                    <footer className="note-footer">
                                        <ul className="options">
                                            <li onClick={() => editaNote(note)} className="option">
                                                <button className="cta cta-w-icon">
                                                    <PencilAltIcon className="icon" />
                                                    <span className="">Edit</span>
                                                </button>
                                            </li>
                                            <li className="option">
                                                <button className="cta cta-w-icon">
                                                    <ExternalLinkIcon className="icon" />
                                                    <span className="">Open</span>
                                                </button>
                                            </li>
                                            <li className="option">
                                                <button onClick={() => removeaNote(note)} className="cta cta-w-icon">
                                                    <TrashIcon className="icon" />
                                                    <span className="">Delete</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </footer>
                                </article>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="fallback-message">
                        <p>Oops.. no notes yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};
