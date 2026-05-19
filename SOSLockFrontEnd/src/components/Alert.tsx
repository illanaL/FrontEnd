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
    info: "bg-[#E6F1FB] text-[#185FA5] border-l-4 border-[#378ADD]",
    warning: "bg-[#FAEEDA] text-[#854F0B] border-l-4 border-[#EF9F27]",
    success: "bg-[#EAF3DE] text-[#3B6D11] border-l-4 border-[#639922]",
    error: "bg-[#FCEBEB] text-[#A32D2D] border-l-4 border-[#E24B4A]",
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
      className={`flex items-center justify-between p-3 rounded-lg ${colorMap[variant]}`}
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
