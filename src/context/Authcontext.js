import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from 'aws-amplify';
import { User } from "../models";
import '@azure/core-asynciterator-polyfill';

const Authcontext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setdbUser] = useState(null);
    const sub = authUser?.attributes?.sub;

    useEffect(()=>{
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser)
    },[]);
    useEffect(()=>{ 
        DataStore.query(User, (user)=>user.sub.eq(sub)).then((users)=>setdbUser(users[0])) 
    }, [sub])

    return (
        <Authcontext.Provider value={{ authUser, dbUser, sub, setdbUser }}>
            {children}
        </Authcontext.Provider>
    )
}
export default AuthContextProvider;
export const useAuthContext = () => useContext(Authcontext)