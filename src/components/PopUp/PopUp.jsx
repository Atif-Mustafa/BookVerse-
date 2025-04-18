import { useState, useEffect } from 'react';
import styles from './PopUp.module.css';

function PopUp({ volumeInfo, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const utterance = synth ? new SpeechSynthesisUtterance() : null;

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  const handleReadAloud = () => {
    if (!volumeInfo?.description || !synth) return;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      utterance.text = volumeInfo.description;
      synth.speak(utterance);
      setIsSpeaking(true);
      
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close popup"
        >
          &times;
        </button>

        <div className={styles.innerContainer}>
          <div className={styles.detailsContainer}>
            <div className={styles.imageContainer}>
              <img
                src={volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg'}
                alt={`Cover of ${volumeInfo.title}`}
                onError={(e) => {
                  e.target.src = '/placeholder-book.jpg';
                }}
              />
            </div>

            <div className={styles.textContainer}>
              <h1 data-testid="popup-title">{volumeInfo.title}</h1>
              
              <div className={styles.metaData}>
                <p>
                  <span className={styles.label}>Category:</span>
                  {volumeInfo.categories?.join(' / ') || 'N/A'}
                </p>
                <p>
                  <span className={styles.label}>Author:</span>
                  {volumeInfo.authors?.join(', ') || 'Unknown'}
                </p>
                <p>
                  <span className={styles.label}>Publisher:</span>
                  {volumeInfo.publisher || 'N/A'}
                </p>
                <p>
                  <span className={styles.label}>Published:</span>
                  {volumeInfo.publishedDate || 'N/A'}
                </p>
              </div>

              <div className={styles.actionButtons}>
                {volumeInfo.infoLink && (
                  <a
                    href={volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buyButton}
                  >
                    Buy Now
                  </a>
                )}
                {volumeInfo.previewLink && (
                  <a
                    href={volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readButton}
                  >
                    Read Here
                  </a>
                )}
                {volumeInfo.previewLink && (
                  <a
                    href={volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.previewButton}
                  >
                    Read Preview
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h2>Description</h2>
            <p className={styles.descriptionText}>
              {volumeInfo.description || 'No description available.'}
            </p>
          </div>

          <button
            className={`${styles.read} ${isSpeaking ? styles.active : ''}`}
            onClick={handleReadAloud}
            disabled={!volumeInfo?.description || !synth}
          >
            {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
