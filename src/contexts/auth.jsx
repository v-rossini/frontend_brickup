import React, { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom" 

export const AuthContext = createContext()

export const AuthProvider = ( { children } ) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")

        if (recoveredUser)
            setUser(JSON.parse(recoveredUser))
        
        setLoading(false)
    }, [] )

    const login = (username, password) => {
        console.log("login", {username, password} )

        const loggedUser = {user_id: "123", username }
        localStorage.setItem("user", JSON.stringify(loggedUser))

        if(password === "senha"){
            setUser(loggedUser)
            navigate("/")
        }
    }

    const logout = () => {
        console.log("logout")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={ {authenticated: !!user, user, loading, login, logout } }>
            { children }
        </AuthContext.Provider>
    )
}