import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth";
import FileList from "../../components/files";
import { api } from "../../services/api";


const HomePage = () => {
    const { authenticated, logout  } = useContext(AuthContext)
    
    const [user, setUser] = useState( null )
//    const [loading, setLoading] = useState ( true )

    const handleLogout = () => { 
        logout() 
    }

    useEffect(() => {
  
            (async () => {
                const response = await api.get("users/me")
                setUser(response.data)
//                setLoading(false)
            })()
        
    }, []    )



    return(
        <div>
            <h1>home page</h1>
            <p> logged as: {user?.username}</p>
            <button onClick={ handleLogout }>logout</button>
            <FileList />
        </div>)
}

export default HomePage