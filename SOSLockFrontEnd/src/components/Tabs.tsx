import React, {
  useId,
  useState,
  type PropsWithChildren,
  type ReactElement,
} from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
  index?: number;
  onSelect?: () => void;
  tabId?: string;
  panelId?: string;
}

/**
 * Sous-composant Tab — onglet individuel cliquable.
 * Ne pas utiliser directement, toujours encapsuler dans <Tabs>.
 *
 * @param label - Texte affiché dans l'onglet
 * @param isActive - Onglet actif (géré par Tabs)
 * @param onSelect - Callback de sélection (géré par Tabs)
 * @param tabId - Id du bouton tab pour aria-labelledby (géré par Tabs)
 * @param panelId - Id du panneau contrôlé (géré par Tabs)
 */
function Tab({
  label,
  isActive,
  onSelect,
  tabId,
  panelId,
}: PropsWithChildren<TabProps>) {
  /**
   * Raccourcis clavier ARIA Tabs :
   * - Arrow Right : onglet suivant
   * - Arrow Left : onglet précédent
   * - Home : premier onglet
   * - End : dernier onglet
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const tabs = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-tab-trigger]"),
    );
    const currentIndex = tabs.indexOf(e.currentTarget);

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        tabs[(currentIndex + 1) % tabs.length]?.focus();
        tabs[(currentIndex + 1) % tabs.length]?.click();
        break;
      case "ArrowLeft":
        e.preventDefault();
        tabs[(currentIndex - 1 + tabs.length) % tabs.length]?.focus();
        tabs[(currentIndex - 1 + tabs.length) % tabs.length]?.click();
        break;
      case "Home":
        e.preventDefault();
        tabs[0]?.focus();
        tabs[0]?.click();
        break;
      case "End":
        e.preventDefault();
        tabs[tabs.length - 1]?.focus();
        tabs[tabs.length - 1]?.click();
        break;
    }
  };

  return (
    <>
      <button
        id={tabId}
        data-tab-trigger
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          isActive
            ? "text-[#BA7517] border-[#BA7517]"
            : "text-gray-500 border-transparent"
        }`}
      >
        {label}
      </button>
    </>
  );
}

/**
 * Composant Tabs — navigation par onglets accessible.
 * Implémente le pattern ARIA Tabs avec navigation clavier complète.
 *
 * @param children - Éléments <Tabs.Tab> uniquement
 *
 * @example
 * <Tabs>
 *   <Tabs.Tab label="À traiter">...</Tabs.Tab>
 *   <Tabs.Tab label="En cours">...</Tabs.Tab>
 * </Tabs>
 */
export function Tabs({ children }: PropsWithChildren) {
  const [active, setActive] = useState(0);
  const uid = useId();

  const tabs = React.Children.toArray(children) as ReactElement<
    PropsWithChildren<TabProps>
  >[];
  return (
    <div>
      {/* role="tablist" : conteneur des onglets */}
      <div
        role="tablist"
        aria-label="Navigation"
        className="flex gap-1 border-b mb-4"
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as ReactElement<TabProps>, {
            isActive: active === index,
            onSelect: () => setActive(index),
            tabId: `tab-${uid}-${index}`,
            panelId: `panel-${uid}-${index}`,
            index,
          }),
        )}
      </div>
      {/* role="tabpanel" : contenu de l'onglet actif */}
      <div
        role="tabpanel"
        id={`panel-${uid}-${active}`}
        aria-labelledby={`tab-${uid}-${active}`}
        tabIndex={0}
        className="mt-4 focus:outline-none"
      >
        {tabs[active].props.children}
      </div>
    </div>
  );
}

Tabs.Tab = Tab;
