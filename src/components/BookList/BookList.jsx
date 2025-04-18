import PropTypes from 'prop-types';
import styles from './BookList.module.css';
import BookCard from '../BookCard/BookCard';

const BookList = ({ books, onQuickView }) => {
    return (
        <div className={styles.booksContainer}>
            {books.map((book) => (
                <BookCard 
                    key={book.id} 
                    book={book}
                    onQuickView={onQuickView}
                />
            ))}
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onQuickView: PropTypes.func.isRequired
};

export default BookList;