import React, { createContext, useContext, useEffect, useState } from 'react'

import { history } from '../../history' 

const AuthContext = createContext({ token: '', setToken: (token) => undefined, tokenLoaded: false, logout: () => undefined })

export const AuthProvider = ({ children }) => {
    const [alreadyRanOnce, setAlreadyRanOnce] = useState(false)
    const [token, setToken] = useState('')
    const [tokenLoaded, setTokenLoaded] = useState(false)

    useEffect(() => { setAlreadyRanOnce(true) }, [])

    useEffect(() => {
        const LSToken = localStorage.getItem('app-token')
        if (LSToken) setToken(LSToken)
        setTokenLoaded(true)
    }, [])

    useEffect(() => {
        if (alreadyRanOnce) localStorage.setItem('app-token', token)
    }, [token])

    const logout = () => {
        setToken('')
    }

    return (
        <AuthContext.Provider value={{ token, setToken, tokenLoaded, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)