import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
 
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : "Erreur inconnue";

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl max-w-md mx-auto mt-8 text-center">
      <h2 className="text-red-600 font-bold mb-2">Une erreur est survenue</h2>
      <p className="text-red-500 text-sm mb-4">{message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
      >
        Réessayer
      </button>
    </div>
  );
}
 
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
 