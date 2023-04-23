import React, { useState, useContext } from "react";
import "./styles.css"

import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({username, password})
        login(username, password)
    }

    return(
    <div id="login">
        <h1 className="title">
            Login
        </h1>
        <p>{String(authenticated)}</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="username">
                    username
                </label>
                    <input name="username" id="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="field">
                <label htmlFor="username">
                    password
                </label>
                    <input type="password" name="password" id="passwords" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <button type="submit">login</button>
            </div>
        </form>
    </div>
    )
}

export default LoginPage