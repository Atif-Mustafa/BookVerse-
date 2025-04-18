import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import { addNote, setNotes, setNoteSearchKey } from "../../slices/notesSlice";
import styles from './Notes.module.css'
import NotesList from "../NotesList/NotesList";
import Header from '../../components/Header/Header'
import { toast, ToastContainer } from "react-toastify";

const Notes = () => {

    const [isInitialized, setIsInitialized] = useState(false);
    const titleInputRef = useRef(null);
    const contentInputRef = useRef(null);
    const searchRef = useRef(null)

    const dispatch = useDispatch();


    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');

        if (savedNotes) {
            dispatch(setNotes(JSON.parse(savedNotes)));
        }
        setIsInitialized(true)

    }, [dispatch])



    function onFormSubmit(e) {
        e.preventDefault();
        const note = {
            title: titleInputRef.current.value,
            content: contentInputRef.current.value,
            id: uuidv4()
        }
        if (!note.title.trim() || !note.content.trim()) {
            alert("Please fill out both fields properly!");
            return;
        }

        const savedNotes = JSON.parse(localStorage.getItem('notes') || "[]");

        const updatedNotes = [...savedNotes, note]
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        dispatch(addNote(note))
        toast.success("notes saved successfully")
    }

    // debouncing logic
    function searchNote(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay)
        }
    }

    function func() {
        // console.log(searchRef.current.value)
            dispatch(setNoteSearchKey(searchRef.current.value))
    }

    const handleSearch = searchNote(func, 500)

    return (
        <>
            {/* <Header /> */}
            <div className={styles.notesContainer}>
                {
                    // !isInitialized ? (
                    //     <div>
                    //         <span className={styles.loader}></span>
                    //     </div>
                    // ) :
                    (
                        <>
                        <ToastContainer />
                            <div className={styles.heroSection}>
                                <h1>Welcome to our note-taking feature!</h1>
                                <p>Easily jot down thoughts, ideas, or favorite quotes while exploring books on our website. Edit or delete notes anytime to stay organized and enhance your reading experience. Start taking notes today to engage with books on a deeper level!</p>
                                {/* <img src="https://i.pinimg.com/originals/f4/35/28/f435281885f879de2b207fbe9f5d30d2.jpg" alt="" /> */}
                            </div>
                            <div className={styles.innerNotesContainer}>
                                {/* create notes section*/}
                                <div className={styles.inputSection}>
                                    <h1>Create Your Own Notes 📝</h1>
                                    <form action="" onSubmit={onFormSubmit}>
                                        <label htmlFor="title" className={styles.title}>
                                            <input type="text" id="title" ref={titleInputRef} placeholder="Add a title" required />
                                        </label>
                                        <label htmlFor="content" className={styles.content}>
                                            <textarea name="" id="content" ref={contentInputRef} placeholder="Add your content..." required></textarea>
                                        </label>

                                        <button type="submit" className={styles.btn}>ADD A NOTE</button>
                                    </form>
                                </div>

                                {/* notes show section */}
                                <div className={styles.yourNotesSection}>
                                    <h1>✨ Your Notes ✨</h1>
                                    <input type="text" onChange={handleSearch} ref={searchRef}
                                        placeholder="Search for Notes" />
                                    <NotesList isInitialized={isInitialized} />
                                </div>
                            </div>
                        </>
                    )
                }

                
            </div>
        </>
    )
}
export default Notes;