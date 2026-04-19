import { useState, type PropsWithChildren } from "react";

interface AccordionItemProps {
  title: string;
}

function AccordionItem({ title, children }: PropsWithChildren<AccordionItemProps>) {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="border rounded-md mb-1 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
      >
        {title}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-t">
          {children}
        </div>
      )}
    </div>
  );
}


export function Accordion({ children }: PropsWithChildren) {
  return <div className="w-full">{children}</div>;
}

Accordion.Item = AccordionItem;