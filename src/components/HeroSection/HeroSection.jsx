
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../slices/searchSlice';
import { debounce } from 'lodash';
import styles from './HeroSection.module.css';
import { IoIosSearch } from "react-icons/io";
function HeroSection({ title, subtitle }) {
  const dispatch = useDispatch();

  const handleSearch = debounce((query) => {
    dispatch(setSearchQuery(query));
  }, 300);

  return (
    <div className={styles.heroSection}>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Search books by title or author..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <IoIosSearch className={styles.searchIcon} />
      </div>
      <h1>{title || 'Unlock New Worlds, One Page at a Time'}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default HeroSection