import api from "../../../client/client";
import type {
  LoginUserPayload,
  LoginUserResponse,
  SignUpUserPayload,
  SignUpUserResponse,
} from "../type/user.type";

export const signUpUser = async (
  payload: SignUpUserPayload,
): Promise<SignUpUserResponse> => {
  try {
    const response = await api.post<SignUpUserResponse>("/users/signUp", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Erreur lors de la création de l'utilisateur",
    );
  }
};

export const loginUser = async (
  payload: LoginUserPayload,
): Promise<LoginUserResponse> => {
  try {
    const response = await api.post<LoginUserResponse>("/users/signIn", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || "Identifiants incorrects",
    );
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await api.get<{ exists: boolean }>(
      `/users/check-email/${encodeURIComponent(email)}`,
    );
    return response.data.exists;
  } catch {
    return false;
  }
};
