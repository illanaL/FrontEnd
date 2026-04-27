import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import type { Artisan } from "./auth.types";
import { API_BASE_URL } from "../../../config/api.config";



type State = Artisan | null;

type Action = 
    |  {type: "LOGIN", payload: Artisan}
    | {type: "LOGOUT"} ;

    


const authReducer = (state: State,  action:Action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

type AuthContextType = {
    artisan: Artisan | null; 
    login: (data: {phone: string; password: string}) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [artisan, dispatch] = useReducer(authReducer, null);

    const navigate = useNavigate();

    const login = async ({ phone, password }: { phone: string; password: string }) => {
         const res = await fetch(`${API_BASE_URL}/artisans/signIn`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ phone, password }),
         });

         const data = await res.json();

            if (!res.ok) {
                 throw new Error(data.error || "Erreur login");
            } 

    localStorage.setItem("artisan", JSON.stringify(data))
    dispatch({
      type: "LOGIN",
      payload: data,
    });

    navigate("/artisans");
}

        
      

    const logout = () => {
        localStorage.removeItem("artisan");
        dispatch({ type: "LOGOUT" });
        navigate("/artisans/signIn");
    }

    useEffect(() => {
        const stored  = localStorage.getItem("artisan");
        if (stored) {
            const parsed = JSON.parse(stored);
            dispatch({
                type: "LOGIN",
                payload: parsed,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ artisan, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};



