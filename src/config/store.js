import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import notesReducer from '../slices/notesSlice';
import searchReducer from '../slices/searchSlice';


const store = configureStore({
    reducer: {
        login: loginReducer,
        notes: notesReducer,
        search: searchReducer
    }
})

export default store