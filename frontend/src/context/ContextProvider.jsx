import { useContext, createContext, useState } from "react";

const authContext = createContext({
    user: null,
    token: null,
    setUser(){},
    setTokenLocal(){}
});


export const useAuthContext = () => useContext(authContext);


const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setTokenLocal = (key=null) => {
        if(!key){
            setToken(null);
            localStorage.removeItem('ACCESS_TOKEN');
            return;
        }

        setToken(key);
        localStorage.setItem('ACCESS_TOKEN', key);
    }

    return (
        <authContext.Provider value={
            {
                user,
                token,
                setUser,
                setTokenLocal
            }
        }>
            {children}
        </authContext.Provider>
    )
}

export default ContextProvider