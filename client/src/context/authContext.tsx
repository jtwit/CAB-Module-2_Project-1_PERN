import { useState } from "react";

export default function useAuth(initialvalue: any) {
    const [isAuth, setIsAuth] = useState(initialvalue)
}