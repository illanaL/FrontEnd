import api from "../../../client/client";
import type { UserLoginResponse } from "../../user/type/user.type";
import { useUserAuth } from "../hooks/useUserAuthMutations";
import type { LoginByPhoneForm } from "../schema/login.schema";

export const authUserApi = {
  async login(data: LoginByPhoneForm): Promise<void> {
      try {
    const res = await api.post<UserLoginResponse>("/users/signIn", data);
    
    useUserAuth.getState().login(res.data.userId,  res.data.accessKey)  
    }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }
  },
  logout: () => useUserAuth.getState().logout(),
};