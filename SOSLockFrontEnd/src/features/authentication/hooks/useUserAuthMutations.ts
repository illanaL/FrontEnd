import { useMutation } from "@tanstack/react-query";
import type { UserAuthState } from "../stores/authStore";
import { loginUser, signUpUser } from "../../user/api/users.api";
import type { LoginUserPayload, LoginUserResponse } from "../../user/type/user.type";
import { userKeys } from "../../user/queries/userKeys";
import { persist } from "zustand/middleware";
import { create } from "zustand";


export const useUserAuth = create<UserAuthState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      token: null,
      isAuthenticated: false,
      role: null,

      login: (userId, token, email) =>
        set(() => {
          localStorage.setItem("accessKey", token);
          return {
            userId,
            email: email ?? null,
            token,
            role: "user" as const,
            isAuthenticated: true,
          };
        }),

      loginGuest: (userId, email) =>
        set(() => ({
          userId,
          email,
          token: null,
          role: "user" as const,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => {
          localStorage.removeItem("accessKey");
          return {
            userId: null,
            email: null,
            token: null,
            role: null,
            isAuthenticated: false,
          };
        }),
    }),
    { name: "user-auth-state" }
  )
);

export const useRegisterUser = () => {
  const loginGuest = useUserAuth((s) => s.loginGuest);

  return useMutation({
    mutationKey: userKeys.register(),
    mutationFn: signUpUser,
    onSuccess: (data) => {
      loginGuest(data.id, data.email);
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    },
  });
};

export const useLoginUser = () => {
  const login = useUserAuth((s) => s.login);

  return useMutation <LoginUserResponse, Error, LoginUserPayload>({
    mutationKey: userKeys.login(),
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.userId, data.accessKey);
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion :", error);
    },
  });
};