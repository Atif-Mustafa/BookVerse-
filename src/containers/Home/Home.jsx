
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from './Home.module.css';
import BookList from "../../components/BookList/BookList";
import HeroSection from "../../components/HeroSection/HeroSection";
import PopUp from "../../components/PopUp/PopUp";

const ALL_CATEGORIES = [
    'fiction', 'nonfiction', 'history', 'science',
    'technology', 'business', 'travel', 'biography'
];

const Home = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [booksData, setBooksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchQuery = useSelector(state => state.search.searchQuery);

    useEffect(() => {
        const fetchBooksForCategories = async () => {
            try {
                setIsLoading(true);
                const baseUrl = "https://www.googleapis.com/books/v1/volumes";
                const initialItems = window.innerWidth > 768 ? 4 : 1;

                const categoriesWithBooks = await Promise.all(
                    ALL_CATEGORIES.map(async (category) => {
                        try {
                            const response = await axios.get(
                                `${baseUrl}?q=subject:${category}&maxResults=20`
                            );
                            return {
                                category,
                                books: response.data.items || [],
                                visibleItems: initialItems,
                                totalItems: response.data.totalItems || 0
                            };
                        } catch (error) {
                            console.error(`Error fetching ${category}:`, error);
                            return {
                                category,
                                books: [],
                                visibleItems: 0,
                                totalItems: 0
                            };
                        }
                    })
                );

                setBooksData(categoriesWithBooks);
            } catch (err) {
                console.error("Error initializing books:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooksForCategories();
    }, []);

    const handleSeeMore = (category) => {
        setBooksData(prev => prev.map(cat => {
            if (cat.category === category) {
                const increment = window.innerWidth > 768 ? 4 : 1;
                return {
                    ...cat,
                    visibleItems: Math.min(cat.visibleItems + increment, cat.books.length)
                };
            }
            return cat;
        }));
    };

    const filterBooks = (books) => {
        if (!searchQuery.trim()) return books;
        
        const query = searchQuery.toLowerCase().trim();
        const queryWords = query.split(' ');

        return books.filter(book => {
            const title = book.volumeInfo?.title?.toLowerCase() || '';
            const authors = book.volumeInfo?.authors?.join(' ')?.toLowerCase() || '';
            
            return queryWords.every(word => 
                title.includes(word) || 
                authors.includes(word)
            );
        });
    };

    return (
        <>
            <HeroSection />
            <div className={styles.container}>
                <div className={styles.homeContainer}>
                    <h1>Explore Books</h1>
                    
                    {isLoading ? (
                        <div className={styles.loading}>Loading books...</div>
                    ) : (
                        booksData.map((categoryData) => {
                            const filteredBooks = filterBooks(categoryData.books);
                            const isSearchActive = searchQuery.trim() !== '';

                            return (
                                <div key={categoryData.category} className={styles.categoryWrapper}>
                                    {/* Always show category header */}
                                    <h3 className={styles.category}>
                                        {categoryData.category}
                                    </h3>

                                    {filteredBooks.length > 0 ? (
                                        <>
                                            <BookList
                                                books={filteredBooks.slice(0, categoryData.visibleItems)}
                                                onQuickView={setSelectedBook}
                                            />
                                            {filteredBooks.length > categoryData.visibleItems && (
                                                <button
                                                    className={styles.seeMoreBtn}
                                                    onClick={() => handleSeeMore(categoryData.category)}
                                                >
                                                    SEE MORE {categoryData.category.toUpperCase()}
                                                </button>
                                            )}
                                        </>
                                    ) : isSearchActive ? (
                                        <p className={styles.noResults}>
                                            No {categoryData.category} books match "{searchQuery}"
                                        </p>
                                    ) : (
                                        <p className={styles.noResults}>
                                            No books available in this category
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {selectedBook && (
                <PopUp
                    volumeInfo={selectedBook.volumeInfo}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </>
    );
};

export default Home;