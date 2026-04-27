export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-sm">
          © {new Date().getFullYear()} SOSLock — Tous droits réservés
        </p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white">Mentions légales</a>
          <a href="#" className="hover:text-white">CGU</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

      </div>
    </footer>
  );
};