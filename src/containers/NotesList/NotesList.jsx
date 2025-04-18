import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './NotesList.module.css'
import { deleteNote } from "../../slices/notesSlice";

function NotesList({ isInitialized }) {
    const notes = useSelector(state => state.notes.notes);
    const searchKey = useSelector(state => state.notes.noteSearchKey)
    console.log(searchKey)
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();


    const filterResults = note => note.title.toLowerCase().includes(searchKey.toLowerCase());
    const filteredNotes = searchKey ? notes.filter(filterResults) : notes

    // console.log(filterResults)
    const currentNote = filteredNotes[currentIndex] || { title: '', content: '' };
    // console.log(currentNote)

    
    useEffect(() => {
        if (notes.length > 0) {
            setCurrentIndex(prev =>
                prev >= filteredNotes.length ? filteredNotes.length - 1 : prev < 0 ? 0 : prev
            );
        }
    }, [filteredNotes])

    function delNote(){
      console.log(currentNote?.id)
      let savedNotes = localStorage.getItem('notes')
      if(savedNotes){
        savedNotes = JSON.parse(savedNotes);
       const index = savedNotes.findIndex(savedNote => savedNote.id === currentNote?.id);
       savedNotes.splice(index, 1)
       localStorage.setItem('notes', JSON.stringify(savedNotes))
      }
       dispatch(deleteNote(currentNote?.id))
    }


    function onBackwardClick() {
        setCurrentIndex(i => Math.max(0, i - 1))
    }

    function onForwardClick() {
        setCurrentIndex(i => Math.min(filteredNotes.length - 1, i + 1))

    }

   

    return (
        <div className={styles.notesListContainer}>
            {!isInitialized ? (
                <div>
                    <span className={styles.loader}></span>
                </div>
            ) :
                filteredNotes.length === 0 ?
                    (<div> No notes available. Create one!</div>)
                    :
                    (
                        (
                            <div style={{
                                width: '100%',
                                height: '400px',
                                overflowY: 'scroll',

                            }}>
                                <div className={styles.topSection}>
                                    <h1>{currentNote.title}</h1>
                                    <hr />
                                    {/* <div className={styles.content}> */}
                                        <p 
                                        style={{
                                            textAlign: 'start',
                                            padding: '1rem 1rem 9%'
                                        }}
                                        >
                                            {currentNote.content}</p>
                                    {/* </div> */}
                                    <button className={styles.deleteBtn} onClick={delNote}>DELETE</button>
                                </div>

                                <div className={styles.btnContainer}>
                                    <button onClick={onBackwardClick}
                                        className={styles.btn}
                                        disabled={currentIndex === 0}>&lt;</button>
                                    <button onClick={onForwardClick} className={styles.btn} disabled={currentIndex === notes.length - 1}>&gt;</button>
                                </div>
                            </div>
                        )
                    )}
        </div>

    );
}

export default NotesList;