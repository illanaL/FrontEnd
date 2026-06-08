export default function FooterPublic() {
  return (
    <>
      {/* Pied de page standard */}
      <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary flex flex-col md:flex-row justify-between items-center gap-base border-t border-primary-container">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-headline-md text-headline-md text-on-primary font-bold">SOSLock</span>
          <p className="font-label-sm text-label-sm text-on-primary-container">© 2024 SOSLock. Artisans certifiés et tarifs garantis.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-on-primary-container hover:text-on-primary transition-opacity duration-200 font-label-sm text-label-sm" href="#">Mentions légales</a>
          <a className="text-on-primary-container hover:text-on-primary transition-opacity duration-200 font-label-sm text-label-sm" href="#">CGV</a>
          <a className="text-on-primary-container hover:text-on-primary transition-opacity duration-200 font-label-sm text-label-sm" href="#">Assurances</a>
          <a className="text-on-primary-container hover:text-on-primary transition-opacity duration-200 font-label-sm text-label-sm" href="#">Contact</a>
        </div>
      </footer>

      {/* Barre de navigation basse (Mobile uniquement) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant shadow-lg rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined">emergency</span>
          <span className="font-label-sm text-label-sm mt-1">Urgence</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          <span className="font-label-sm text-label-sm mt-1">Services</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-sm text-label-sm mt-1">Interventions</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm mt-1">Profil</span>
        </a>
      </nav>
    </>
  );
}