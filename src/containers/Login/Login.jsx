import { useEffect, useRef, useState } from 'react';
import styles from './Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginSlice';

function Login() {
    const [rightPanelActive, setRightPanelActive] = useState(false);

    const navigate = useNavigate(null);
    const dispatch = useDispatch();


    useEffect(() => {
        let localStorageUser = localStorage.getItem('user');
        if (localStorageUser) {
            localStorageUser = JSON.parse(localStorageUser);
            if(localStorageUser?.displayName)  {
                navigate('/home');
            } 
        }

    }, [])
    const onGoogleBtnClick = async () => {
        console.log('Google btn clicked');
        try {
            const userCred = await signInWithPopup(auth, googleAuthProvider);
            console.log('USER CRED', userCred);
            const userDetails = {
                displayName: userCred.user.displayName,
                email: userCred.user.email,
                uid: userCred.user.uid
            }
            dispatch(login(userDetails));
            localStorage.setItem('user', JSON.stringify(userDetails));

            navigate('/home');
        }
        catch (err) {
            console.log("ERROR SIGNING IN WITH GOOGLE", err);
            toast.error(err.message);
        }
    }

    // const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const signUpEmailRef = useRef();
    const signUpPasswordRef = useRef();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form submitted');
        // console.log(emailRef.current, passwordRef.current);
        try {
            const userCred = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            // console.log('USER CRED', userCred);
            toast.success('User logged in successfully');
            // console.log('USER', userCred.user);
            const userDetails = {
                displayName: userCred.user.displayName,
                email: userCred.user.email,
                uid: userCred.user.uid
            }
            dispatch(login(userDetails));
            localStorage.setItem('user', JSON.stringify(userDetails));
            navigate('/home');

        }
        catch (err) {
            console.log('ERROR SIGNING IN', err);
            toast.error(err.message);
        }
    }

    const onSignUpFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        console.log(signUpEmailRef.current, signUpPasswordRef.current);
        try {
            const userCred = await createUserWithEmailAndPassword(auth, signUpEmailRef.current.value, signUpPasswordRef.current.value);
            // console.log('USER CRED', userCred);
            toast.success('User signed up successfully');
            signUpEmailRef.current.value = '';
            signUpPasswordRef.current.value = '';
            setRightPanelActive(false)
        }
        catch (err) {
            console.log('ERROR SIGNING UP', err);
            // alert('Invalid email or password');
            toast.error(err.message);
        }
    }
    return (
        <div className={styles.loginContainer}>
            <div className={rightPanelActive ? `${styles.container} ${styles['right-panel-active']}` : styles.container}>
                <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
                    <form action="#" onSubmit={onSignUpFormSubmit}>
                        <h1>Create Account</h1>
                        <div className={styles['social-container']}>
                            <button style={{
                                backgroundColor: 'white',
                                fontSize: '1.5rem',
                                width: '100%',
                                border: '1px solid gray',
                                borderRadius: '1rem',
                                paddingBlock: '0.5rem'
                            }} type='button' onClick={onGoogleBtnClick}><FcGoogle /></button>
                        </div>
                        <span>or use your email for registration</span>
                        {/* <input type="text" placeholder="Name" ref={nameRef} /> */}
                        <input type="email" placeholder="Email" ref={signUpEmailRef} />
                        <input type="password" placeholder="Password" ref={signUpPasswordRef} />
                        <button className={styles.btn}>Sign Up</button>
                    </form>
                </div>
                <div className={`${styles["form-container"]} ${styles['sign-in-container']}`}>
                    <form action="#" onSubmit={onFormSubmit}>
                        <h1>Sign in with</h1>
                        <div className={styles["social-container"]}>
                            <button style={{
                                backgroundColor: 'white',
                                fontSize: '1.5rem',
                                width: '100%',
                                border: '1px solid gray',
                                borderRadius: '1rem',
                                paddingBlock: '0.5rem'
                            }} type='button' onClick={onGoogleBtnClick}><FcGoogle /></button>
                        </div>
                        <span>or use your account</span>
                        <input ref={emailRef} type="email" placeholder="Email" required />
                        <input ref={passwordRef} type="password" placeholder="Password" required />
                        <a href="#">Forgot your password?</a>
                        <button className={styles.btn}>Sign In</button>
                    </form>
                </div>
                <div className={styles["overlay-container"]}>
                    <div className={styles["overlay"]}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={`${styles.ghost} ${styles.btn}`} id="signIn"
                                onClick={() => {
                                    setRightPanelActive(false)
                                }}
                            >
                                Sign In</button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className={`${styles.ghost} ${styles.btn}`} id="signUp" onClick={() => {
                                setRightPanelActive(true)
                            }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;