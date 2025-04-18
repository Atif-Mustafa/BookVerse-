import { createSlice } from "@reduxjs/toolkit";


const initState = {
    notes: [],
    noteSearchKey: ''
};

const notesSlice = createSlice({
    name: 'NOTES',
    initialState: initState,
    reducers: {
        addNote: (state, action) => {
            //  console.log(action.payload);
            state.notes.push(action.payload)
            //  console.log(state)
        },
        setNotes: (state, action) => {
            state.notes = action.payload; // Replace entire array
        },
        deleteNote: (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload)
            state.notes.splice(index, 1);
        },
        updateNote: (state, action) => {

        },
        setNoteSearchKey: (state, action) => {
            state.noteSearchKey = action.payload
        }

    }
})

export const { addNote, deleteNote, updateNote, setNotes, setNoteSearchKey } = notesSlice.actions;
export default notesSlice.reducer;