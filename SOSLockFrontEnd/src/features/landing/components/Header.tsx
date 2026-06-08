import logo2 from "../../../assets/logo8.png";

export const Header = () => {
  return (
    <header className="relative flex items-center px-5 py-3 border-b-4 border-border shadow-md bg-linear-to-r from-sos-600 to-sos-100 w-full box-border h-20 overflow-visible mt-8 mb-10">
      <img
        src={logo2}
        alt="SOSLock"
        className="absolute left-5 h-40 w-auto z-10"
      />

      <span role="heading" className="hidden md:block md:text-2xl md:text-text md:italic ml-50 pl-45 font-semibold drop-shadow-md">
        Trouvez un serrurier fiable en quelques minutes
      </span>
    </header>
  );
};
