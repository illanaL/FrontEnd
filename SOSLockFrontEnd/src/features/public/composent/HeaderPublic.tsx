import { NavLink } from "react-router-dom";
import { UserMenu } from "../../user/components/UserMenu";

export default function HeaderPublic() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md transition-colors" // Style actif (Bleu)
      : "text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md pb-1"; // Style inactif

  return (
    <header className="bg-surface docked full-width top-0 border-b border-outline-variant z-50 sticky">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto h-20">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <span className="font-headline-lg text-headline-lg font-black text-primary tracking-tight">
            SOSLock
          </span>
        </div>

        {/* Liens Desktop modifiés avec NavLink */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={getNavLinkClass}>
            Dépannage
          </NavLink>
          <NavLink to="/services" className={getNavLinkClass}>
            Services
          </NavLink>
          <NavLink to="/tarifs" className={getNavLinkClass}>
            Tarifs
          </NavLink>
          <NavLink to="/zones" className={getNavLinkClass}>
            Zones d'intervention
          </NavLink>
        </div>

        {/* Actions de contact */}
        <div className="flex items-center gap-4">
          <UserMenu />
          <button className="hidden lg:flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all duration-150">
            <span className="material-symbols-outlined">phone_in_talk</span>
            Appeler un dépanneur
          </button>
        </div>
      </nav>
    </header>
  );
}
