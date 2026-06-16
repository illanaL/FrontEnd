export const userKeys = {
  all: ["users"] as const,

  list: () => [...userKeys.all, "list"] as const,

  detail: (id: string) => [...userKeys.all, "detail", id] as const,

  checkEmail: (email: string) => [...userKeys.all, "check-email", email] as const,

login: () => [...userKeys.all, "login"] as const,

  register: () => [...userKeys.all, "register"] as const,
};