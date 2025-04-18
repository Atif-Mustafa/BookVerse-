import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { GiHamburgerMenu } from "react-icons/gi";

import { auth } from '../../config/firebase';
import { useState } from "react";
import { logout } from "../../slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const [menu, setMenu] = useState(false);


    // deepseek changes
    const handleNavigation = () => {
        dispatch(clearSearch())
    }

    // deepseek changes closed

    const handleMenu = () => {
        setMenu(!menu);
    }
    const handleLogout = async () => {
        try {
            const res = await auth.signOut();
            console.log('User Logged Out');
            dispatch(logout(true));
            localStorage.removeItem('user');
            navigate('/')
        }
        catch (err) {
            console.log('Error Logging Out', err);
            toast.error(err.message);
        }
    }
    return (
        <>
            <header>
                <div >
                    <Link to={"/home"}>
                        <div className={styles["nav-logo"]}>
                            <img src="https://th.bing.com/th/id/OIP.XgTkxWxgY4ER7n_ijEPpVAHaEU?rs=1&pid=ImgDetMain" alt="" />
                            <h1>BookVerse</h1>
                        </div>
                    </Link>
                </div>
                <ul className={`${styles["nav-links"]} ${menu ? styles["hide"] : ""}`}>
                    <li>
                        <Link to={"/chatbot"} className={styles.disabledLink}
                            onClick={(e) => e.preventDefault()}>CHATBOT</Link>
                    </li>
                    <li>
                        <Link to={"/notes"}>NOTES</Link>
                    </li>
                    <li>
                        <Link to={"/translator"}>TRANSLATOR</Link>
                    </li>
                </ul>

                <div className={styles["menu-btn"]} onClick={handleMenu}>
                    <GiHamburgerMenu />
                </div>

                <div className={`${styles["nav-links-mobile"]} ${menu ? styles["show"] : ""}`}>
                    <div className={styles['drop-down-header']}>
                        <h2>Hi {user?.displayName ? user.displayName : ''}</h2>
                        {/* <h2>Hi {user.displayName}</h2> */}

                        <button onClick={handleMenu}>X</button>
                    </div>
                    <ul>
                        <li>
                            <Link to={'/home'}>Home</Link>
                        </li>

                        <li>
                            <Link to={'category/AllFiction'}>Fiction</Link>
                        </li>

                        <li>
                            <Link to={'category/AllNonFictions'}>Non Fiction</Link>
                        </li>

                        <li>
                            <Link to={'category/ViewAllMystery'}>Historical Fiction</Link>
                        </li>

                        <li>
                            <Link to={'category/ViewAllTravel'}>Travel</Link>
                        </li>

                        <li>
                            <Link to={'category/ViewAllBussiness'}>Business & Economics</Link>
                        </li>

                        <li >
                            <Link to={'/chatbot'} className={styles.disabledLink}
                            >Use ChatBot</Link>
                        </li>

                        <li>
                            <Link to={'/translator'}>Translator</Link>
                        </li>

                        <li>
                            <Link to={'/notes'}>Create Your Own Notes</Link>
                        </li>

                        <li>
                            <Link to={'/bookshelves'} className={styles.disabledLink}
                            >Your Bookshelves</Link>
                        </li>

                        <li>
                            {/* <Link to={'/home'}>Home</Link> */}
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </header >

            {/* <div className={styles.heroSection}>
                <div className={styles.searchSection}>
                    <input type="text" placeholder="Search Books Here..." />
                    <button><IoIosSearch /></button>
                </div>
                <h1 style={{
                    paddingInline: '1rem',
                    textAlign: 'center',

                }}>Unlock New Worlds, One Page at a Time.
                    Explore Books Now!</h1>
            </div> */}

        </>
    )
}
export default Header;