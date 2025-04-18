import styles from './NoteCard.module.css'
function NoteCard({title, content, id}) {
    return (
        <div key={id}>
            
           <button>DELETE</button>

        </div>
      );
}

export default NoteCard;