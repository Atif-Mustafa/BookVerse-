
import PropTypes from 'prop-types';
import styles from './BookCard.module.css';

const BookCard = ({ book, onQuickView }) => {
    const handleQuickViewClick = () => {
        onQuickView(book);
    };

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookImageContainer}>
                <img
                    src={book.volumeInfo?.imageLinks?.thumbnail || '/placeholder-book.jpg'}
                    alt={book.volumeInfo?.title || 'Book cover'}
                    className={styles.bookImage}
                    onError={(e) => {
                        e.target.src = '/placeholder-book.jpg';
                    }}
                />
                <div 
                    className={styles.quickView}
                    onClick={handleQuickViewClick}
                >
                    <span className={styles.quickViewText}>Quick View</span>
                </div>
            </div>
            <div className={styles.bookDetails}>
                <h3 className={styles.title}>
                    {book.volumeInfo?.title || 'Untitled Book'}
                </h3>
                <p className={styles.author}>
                    {book.volumeInfo?.authors?.join(', ') || 'Unknown Author'}
                </p>
            </div>
        </div>
    );
};

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    onQuickView: PropTypes.func.isRequired
};

export default BookCard;