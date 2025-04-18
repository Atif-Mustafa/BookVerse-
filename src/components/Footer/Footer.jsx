import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Column 1: Brand/About */}
                <div className={styles.footerSection}>
                    <h3 className={styles.footerHeading}>BookVerse</h3>
                    <p className={styles.footerText}>
                        Your gateway to endless stories. Explore, read, and discover books that inspire.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerSubheading}>Quick Links</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="#">Books</Link></li>
                        <li><Link to="#">Categories</Link></li>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerSubheading}>Contact Us</h4>
                    <ul className={styles.contactInfo}>
                        <li>📧 support@bookverse.com</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>📍 123 Book Street, Readerville</li>
                    </ul>
                </div>

                {/* Column 4: Socials/Newsletter */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerSubheading}>Stay Connected</h4>
                    <div className={styles.socialIcons}>
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                    </div>
                    <div className={styles.newsletter}>
                        <input type="email" placeholder="Enter email for updates" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>© 2024 BookVerse. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;