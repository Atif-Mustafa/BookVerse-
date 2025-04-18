
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import HeroSection from '../../components/HeroSection/HeroSection';
import BookList from '../../components/BookList/BookList';
import styles from './CategoryBooks.module.css';
import PopUp from '../../components/PopUp/PopUp';

const CategoryBooks = () => {
    const { category } = useParams();
    const searchQuery = useSelector(state => state.search.searchQuery);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    // Format category name for display
    const formattedCategory = category.replace(/-/g, ' ');

    useEffect(() => {
        const fetchCategoryBooks = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const response = await axios.get(
                    // `https://www.googleapis.com/books/v1/volumes?q=${formattedCategory}&maxResults=40`
                    `https://www.googleapis.com/books/v1/volumes?q=${formattedCategory}&maxCount=40`

                );
                
                setBooks(response.data.items || []);
            } catch (error) {
                console.error('Error fetching category books:', error);
                setError('Failed to load books. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryBooks();
    }, [formattedCategory]);

    // Filter books based on search query
    const filteredBooks = books.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const authors = book.volumeInfo?.authors?.join(' ')?.toLowerCase() || '';
        return title.includes(searchQuery) || authors.includes(searchQuery);
    });

    return (
        <>
            <div className={styles.categoryPage}>
                <HeroSection 
                    title={`Explore ${formattedCategory} Books`}
                    subtitle={`Discover ${filteredBooks.length} books in our ${formattedCategory} collection`}
                />
                
                <div className={styles.categoryContent}>
                    <div className={styles.categoryHeader}>
                        <h2 className={styles.categoryTitle}>
                            {formattedCategory}
                        </h2>
                        <p className={styles.bookCount}>
                            Showing {filteredBooks.length} of {books.length} books
                        </p>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            Loading {formattedCategory} books...
                        </div>
                    ) : error ? (
                        <div className={styles.error}>{error}</div>
                    ) : filteredBooks.length === 0 ? (
                        <div className={styles.noResults}>
                            No books found matching "{searchQuery}"
                        </div>
                    ) : (
                        <BookList books={filteredBooks} 
                        onQuickView={setSelectedBook}/>
                    )}
                </div>
                {selectedBook && (
                <PopUp
                    volumeInfo={selectedBook.volumeInfo}
                    onClose={() => setSelectedBook(null)}
                />
            )}
            </div>
        </>
    );
};

export default CategoryBooks;
