import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void }  {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(() => {
    setState({ data: null, loading: true, error: null });

    asyncFn()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        setState({ data: null, loading: false, error: message });
      });
  }, deps);
  useEffect(() => {
    execute();

  },[execute])

  return { ...state, refetch: execute }
}
