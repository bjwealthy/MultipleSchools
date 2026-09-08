import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }){
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if(token){setAuthenticated(true)}
        if(userStr){setUser(JSON.parse(userStr))}
    }, [])

    return (
<AuthContext.Provider value={{authenticated, user}}>
            {children}
        </AuthContext.Provider>
    )
}