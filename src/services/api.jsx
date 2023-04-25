import axios from "axios"
import qs from "qs"

export const api = axios.create( {
        baseURL: "http://localhost:8000",
    })

export const createSession = async (username, password) => {

    const data = {"username": username, "password": password} 
    const headers = { headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return api.post("/auth", qs.stringify(data), headers)

}

export const createUser = async (username, password) => {

    const data = {"username": username, "password": password} 
    const headers = { headers: {
              'Content-Type': 'application/json'
        }
    }

    return api.post("/users", JSON.stringify(data), headers)

}