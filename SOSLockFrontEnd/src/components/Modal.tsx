import type { PropsWithChildren, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-[420px] max-w-[95%] z-10">
        {/* header */}
        <div className="flex justify-between items-center p-4 border-b">
          <span>{title}</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* body */}
        <div className="p-4">{children}</div>

        {/* footer optionnel */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
}
