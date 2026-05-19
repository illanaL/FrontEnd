import { useEffect, useRef, type PropsWithChildren, type ReactNode, useId } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
}

/**
 * Composant Modal — fenêtre de dialogue accessible superposée au contenu.
 * Rendue via Portal directement dans `document.body` pour éviter les problèmes de z-index.
 * Gère le trap focus, la fermeture via Escape et les attributs ARIA complets.
 *
 * @param isOpen - Contrôle la visibilité de la modal
 * @param onClose - Callback appelé à la fermeture (overlay, croix, Escape)
 * @param title - Titre affiché dans l'en-tête, lié à la modal via aria-labelledby
 * @param footer - Contenu optionnel affiché en bas (boutons d'action)
 * @param children - Contenu principal de la modal
 *
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Détail de l'intervention"
 *   footer={<button onClick={handleClose}>Fermer</button>}
 * >
 *   <p>Contenu de la modal</p>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  children,
}: PropsWithChildren<ModalProps>) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Trap focus — remet le focus sur la modal à l'ouverture.
   * Empêche le lecteur d'écran de naviguer derrière la modal.
   */
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  /**
   * Fermeture via la touche Escape — comportement attendu par les standards ARIA.
   * Nettoie l'event listener à la fermeture ou au démontage.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    /**
     * role="dialog" : boîte de dialogue
     * aria-modal="true" : contenu derrière inactif pour les lecteurs d'écran
     * aria-labelledby : lie la modal à son titre
     * tabIndex={-1} : permet le focus programmatique sans être dans la tab order
     */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      ref={modalRef}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 outline-none"
    >
      {/* Overlay — aria-hidden car purement décoratif */}
      <div aria-hidden="true" className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-lg w-105 max-w-[95%] z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <span id={titleId} className="font-semibold">{title}</span>
          {/* aria-label : décrit le bouton icône aux lecteurs d'écran */}
          <button
            onClick={onClose}
            aria-label="Fermer la modal"
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer optionnel */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}