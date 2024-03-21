// notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        currentNote: {
            title: '',
            body: '',
        },
        notes: [],
    },
    reducers: {
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        addNote: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        removeNote: (state, action) => {
            return state.filter(note => note.id !== action.payload.id);
        },
        editNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                // Create a new array with the updated note
                const updatedNotes = [...state.notes];
                updatedNotes[index] = action.payload;
                // Update the state with the new array
                state.notes = updatedNotes;
            }
        },
    },
});

export const { addNote, removeNote, editNote, setNotes, setCurrentNote } = notesSlice.actions;

export default notesSlice.reducer;
