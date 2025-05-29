import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const AppContext = createContext({
    user: null,
    setUser: () => { },
});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("Authorization"));
    const [credits, setCredits] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // const navigate = useNavigate();

    const loadCredit = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                setCredits(res.data.credits);
                setUser(res.data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const logout = () => {
        localStorage.removeItem("Authorization");
        setToken(null);
        setUser(null);
        setShowLogin(true);
    }
    useEffect(() => {
        if (token) {
            loadCredit();
        }
    }, [token]); //dependency array [token] it will call henver token chnage
    // const generateImage = async (prompt) => {
    //     try {
    //         const res = await axios.post(`${backendUrl}/api/image/generate`, { prompt }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (res.data.success) {
    //             loadCredit();
    //             return res.data.imageData;
    //         } else {
    //             console.log(res.data);
    //             toast.error(res.data.message);
    //             loadCredit();
    //             if (res.data.credit === 0) {
    //                 navigate('/buy-credit');
    //             }
    //         }
    //     } catch (error) {
    //         console.log("res.data", error);
    //         toast.error(error.message);
    //     }
    // }
    const generateImage = async (prompt) => {
        try {
            const res = await axios.post(`${backendUrl}/api/image/generate`, { prompt }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadCredit();

            return { success: true, imageData: res.data.imageData };
        } catch (error) {
            loadCredit(); // still try to reload credit
            const message = error.response?.data?.message || error.message;

            // Handle case where user has no credits
            if (error.response?.data?.credit === 0) {
                return { success: false, credit: 0, message };
            }

            toast.error(message);
            return { success: false, message };
        }
    };

    return (
        <AppContext.Provider value={{ user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credits, setCredits, loadCredit, logout, generateImage }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

// import { createContext, useState } from "react";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//     const [user, setUser] = useState(false);
//     const value = {
//         user, setUser
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )

// };

// export default AppContextProvider