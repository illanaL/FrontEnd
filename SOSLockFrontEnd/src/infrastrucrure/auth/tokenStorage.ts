
export const getToken = (): string | null => {
  const stored = localStorage.getItem("artisan");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed.accessKey;
  } catch {
    return null;
  }
};

export const setToken = (data: any) => {
  localStorage.setItem("artisan", JSON.stringify(data));
};

export const clearToken = () => {
  localStorage.removeItem("artisan");
};