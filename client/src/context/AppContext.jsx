import { createContext, useState } from "react";

export const AppContext = createContext({
    user: null,
    setUser: () => { },
});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <AppContext.Provider value={{ user, setUser, showLogin, setShowLogin }}>
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