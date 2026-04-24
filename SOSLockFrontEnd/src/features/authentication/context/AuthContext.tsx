import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
    id: string;
    email: string;
    name: string;
}

const authReducer = (state: User | null, action: {type: 'LOGIN' | 'LOGOUT', payload: User | null}) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, ...action.payload};
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, dispatch] = useReducer(authReducer, null);

    const navigate = useNavigate();

    const login = async ({ identifier, password }: { identifier: string; password: string }) => {
        
        console.log(identifier, password)
        
        const res = {
            json() {
                return Promise.resolve({ token: "mock-token" });
            },
        };

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            dispatch({
                type: "LOGIN",
                payload: {
                    id: "1",
                    email: `${identifier}@test.com`,
                    name: identifier,
                },
            });
            navigate("/artisans");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT", payload: null });
        navigate("/artisans/signIn");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({
                type: "LOGIN",
                payload: {
                    id: "1",
                    email: "test@test.com",
                    name: "test",
                },
            });
        } else {
            navigate("/artisans/signIn");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


