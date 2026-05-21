import type { PropsWithChildren } from "react";

interface AlertProps {
  variant?: "info" | "warning" | "success" | "error";
  onDismiss?: () => void;
}

/**
 * Composant Alert — message de notification accessible.
 *
 * @param variant - Type de message : `info`, `warning`, `success`, `error`
 * @param onDismiss - Callback optionnel pour fermer l'alerte (croix + touche Escape)
 * @param children - Contenu du message
 *
 * @example
 * <Alert variant="success" onDismiss={() => setVisible(false)}>
 *   Compte créé avec succès !
 * </Alert>
 */
export function Alert({
  variant = "info",
  onDismiss,
  children,
}: PropsWithChildren<AlertProps>) {
  const iconMap = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    error: "❌",
  };

  const colorMap = {
    info: "bg-blue-50 text-blue-700",
    warning: "bg-amber-50 text-amber-700",
    success: "bg-green-50 text-green-700",
    error: "bg-red-50 text-red-600",
  };

  /**
   * role="alert" : les lecteurs d'écran annoncent immédiatement le contenu
   * aria-live="assertive" : pour error/warning, interruption immédiate
   * aria-live="polite" : pour info/success, annonce sans interruption
   */
  const isUrgent = variant === "error" || variant === "warning";

  /**
   * Raccourci clavier : Escape ferme l'alerte si onDismiss est fourni
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && onDismiss) onDismiss();
  };

  return (
    <div
      role="alert"
      aria-live={isUrgent ? "assertive" : "polite"}
      aria-atomic="true"
      onKeyDown={handleKeyDown}
      className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm ${colorMap[variant]}`}
    >
      <span aria-hidden="true">{iconMap[variant]}</span>
      <span>{children}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fermer le message"
          className="ml-2 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-current rounded"
        >
          ✕
        </button>
      )}
    </div>
  );
}
