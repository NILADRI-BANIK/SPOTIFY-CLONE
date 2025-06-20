import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function registerUser(
        name,
        email,
        password,
        navigate
    ) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", {
                name,
                email,
                password,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", {
                email,
                password,
            });

            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
            fetchSongs();
            fetchAlbums();
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");

            setUser(data.user);
            setIsAuth(true);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <UserContext.Provider
            value={{
                registerUser,
                user,
                isAuth,
                btnLoading,
                loading,
                loginUser
            }}
        >
            {children}<Toaster />
        </UserContext.Provider>
    );

};
export const UserData = () => useContext(UserContext);