import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

const HomePage = () => {
    const { authenticated, logout  } = useContext(AuthContext)

    const handleLogout = () => { 
        logout() 
    }

    return(
        <div>
            <h1>home page</h1>
            <p>{String(authenticated)}</p>
            <button onClick={ handleLogout }>logout</button>
        </div>)
}

export default HomePage