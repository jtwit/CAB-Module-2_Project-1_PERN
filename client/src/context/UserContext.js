import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
// global store
export const UserContext = createContext();

// provider
const backendUrl = "http://localhost:5000/users"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    useEffect(() => {
        getUser();
    }, [])
    // get logged in user
    const getUser = async () => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch("http://localhost:5000/users/user", requestOptions)
            const results = await response.json()
            console.log('results', results)
            setUser(results)
            console.log('user', user)
        } catch (err) {
            console.error(err.message)
        }
    }

    return <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>

}

export default AuthProvider;