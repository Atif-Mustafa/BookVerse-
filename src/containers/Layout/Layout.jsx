import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../slices/loginSlice";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
    const user = useSelector(state => state.login.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // console.log('User in Layout', user);
        let localStorageUser = localStorage.getItem('user');
        if (localStorageUser) {
            localStorageUser = JSON.parse(localStorageUser);
            // console.log('Local Storage User', localStorageUser);
            if (!user) {
                dispatch(login(localStorageUser));
            }
        }
        const isLoggedIn = user?.displayName || localStorageUser?.displayName;
        if (!isLoggedIn) {
            navigate('/');
        }

    }, [user, dispatch, navigate])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
export default Layout;