import api from "../../../client/client";
import type { AdminLoginResponse } from "../../adminUser/type/adminUser.type";
import type { LoginByEmailForm } from "../schema/login.schema";
import { useAdminAuth } from "../hooks/useAdminAuth";

export const authAdminApi = {
  async login(data: LoginByEmailForm): Promise<void> {
    try {
        const res = await api.post<AdminLoginResponse>("/adminUsers/signIn", data);
 
     useAdminAuth.getState().login(
      res.data.adminUser as any,
      res.data.accessKey,
    );  
    }catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }
  },

  logout: () => useAdminAuth.getState().logout(),
};