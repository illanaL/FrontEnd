import api from "../../../client/client";
import type { SignUpUserPayload, SignUpUserResponse } from "../type/user.type";

export const signUpUser = async (
    payload : SignUpUserPayload,):Promise<SignUpUserResponse> => {
        try {
            const response = await api.post<SignUpUserResponse>("/users/signUp", payload);
            return response.data;
        }catch (error: any) {
            throw new Error (
                error?.response?.data?.error || "Erreur lors de la création de l'utilisateur",);
            
        }
    }