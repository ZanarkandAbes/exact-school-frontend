import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({ 
    token: '', 
    setToken: (token) => undefined, 
    userData: {}, 
    setUserData: (userData) => undefined, 
    tokenLoaded: false, logout: () => undefined 
})

export const AuthProvider = ({ children }) => {
    const [alreadyRanOnce, setAlreadyRanOnce] = useState(false)
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState({})
    const [tokenLoaded, setTokenLoaded] = useState(false)

    useEffect(() => { setAlreadyRanOnce(true) }, [])

    useEffect(() => {
        const LSToken = localStorage.getItem('app-token')
        if (LSToken) setToken(JSON.parse(LSToken))
        setTokenLoaded(true)
    }, [])

    useEffect(() => {
        const LSUserData = localStorage.getItem('app-user-data')
        if (LSUserData) setUserData(JSON.parse(LSUserData))
    }, [])

    // useEffect(() => {
    //     if (alreadyRanOnce) {
    //         localStorage.setItem('app-token', token)
    //         localStorage.setItem('app-user-data', userData)
    //     }
    // }, [alreadyRanOnce, token, userData])

    const logout = () => {
        localStorage.removeItem('app-token')
        localStorage.removeItem('app-user-data')
        setToken('')
        setUserData({})
    }

    return (
        <AuthContext.Provider value={{ token, setToken, userData, setUserData, tokenLoaded, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)