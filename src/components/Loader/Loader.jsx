import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div className={styles.dual_ring}></div>
        <p className={styles.text}>Loading your books...</p>
      </div>
    </div>
  );
};

export default Loader;