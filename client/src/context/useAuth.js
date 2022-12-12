import { useState } from "react";

export default function useAuth(initialvalue) {
    const [isAuth, setIsAuth] = useState(initialvalue)

    function login() {
        setIsAuth(true)
    }

    function logout() {
        setIsAuth(false)
    }

    return [isAuth, login, logout]



}

