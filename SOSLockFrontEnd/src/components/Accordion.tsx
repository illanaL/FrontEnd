import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

interface AccordionContextType {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used inside <Accordion>");
  return ctx;
}

/**
 * Composant racine de l'accordion.
 * Gère l'état des items ouverts et le partage via Context.
 *
 * @example
 * <Accordion>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger value="item-1">Titre</Accordion.Trigger>
 *     <Accordion.Content value="item-1">Contenu</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 */
function Accordion({ children }: PropsWithChildren) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const toggle = (value: string) =>
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      {/* role="list" indique aux lecteurs d'écran que c'est une liste d'items */}
      <div role="list" className="w-full divide-y divide-slate-200">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/**
 * Conteneur d'un item de l'accordion.
 * Regroupe le Trigger et le Content d'une même section.
 *
 * @param value - Identifiant unique de l'item
 */
function AccordionItem({
  value,
  children,
}: PropsWithChildren<{ value: string }>) {
  return (
    /* role="listitem" lie cet item au role="list" parent */
    <div role="listitem">{children}</div>
  );
}

/**
 * Bouton déclencheur de l'accordion.
 * Gère l'ouverture/fermeture et expose son état aux technologies d'assistance.
 *
 * @param value - Doit correspondre au value du AccordionContent associé
 */
function AccordionTrigger({
  value,
  children,
}: PropsWithChildren<{ value: string }>) {
  const { openItems, toggle } = useAccordion();
  const isOpen = openItems.includes(value);
  const contentId = `accordion-content-${value}`;


   /**
   * Raccourcis clavier ARIA :
   * - Enter / Space : ouvre/ferme l'item
   * - Arrow Down : focus sur le trigger suivant
   * - Arrow Up : focus sur le trigger précédent
   * - Home : focus sur le premier trigger
   * - End : focus sur le dernier trigger
   */
   const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const triggers = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]")
    );
    const index = triggers.indexOf(e.currentTarget);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        triggers[index + 1]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        triggers[index - 1]?.focus();
        break;
      case "Home":
        e.preventDefault();
        triggers[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        triggers[triggers.length - 1]?.focus();
        break;
    }
  };

  return (
    <button
      data-accordion-trigger
      onClick={() => toggle(value)}
      onKeyDown={handleKeyDown}
      /**
       * aria-expanded : indique aux lecteurs d'écran si le panneau est ouvert
       * true → "développé", false → "réduit"
       */
      aria-expanded={isOpen}
      /**
       * aria-controls : lie le bouton à son panneau de contenu via l'id
       * Le lecteur d'écran sait quel contenu ce bouton contrôle
       */
      aria-controls={contentId}
      className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 text-left"
    >
      {children}
      {/* aria-hidden : la flèche est décorative, inutile pour les lecteurs d'écran */}
      <span
        aria-hidden="true"
        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
      >
        ▼
      </span>
    </button>
  );
}

/**
 * Panneau de contenu de l'accordion.
 * Visible uniquement quand le Trigger associé est ouvert.
 *
 * @param value - Doit correspondre au value du AccordionTrigger associé
 */
function AccordionContent({
  value,
  children,
}: PropsWithChildren<{ value: string }>) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);
  const contentId = `accordion-content-${value}`;

  return (
    <div
      id={contentId}
      /**
       * role="region" : définit une zone de contenu importante
       * Permet la navigation par région dans les lecteurs d'écran
       */
      role="region"
      /**
       * aria-hidden : masque le contenu aux lecteurs d'écran quand fermé
       * Evite que le contenu soit lu même quand il n'est pas visible
       */
      aria-hidden={!isOpen}
      /**
       * hidden : masque visuellement ET pour les lecteurs d'écran
       * Combiné avec aria-hidden pour une accessibilité complète
       */
      hidden={!isOpen}
      className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-t"
    >
      {children}
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };
