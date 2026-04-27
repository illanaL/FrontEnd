import logo from "../../../assets/logo SOSLock.png";

export const Header = () => {
  return (
    <header className="relative flex items-center px-5 py-3 border-b-4 border-border shadow-md bg-linear-to-r from-[var(--color-teal-600)] to-[var(--color-teal-100)] w-full box-border h-20 overflow-visible mt-8 mb-10">
      <img
        src={logo}
        alt="SOSLock"
        className="absolute left-5 h-[400px] w-auto z-10"
      />

      <span className="hidden md:block md:text-2xl md:text-text md:italic ml-[200px] pl-[180px] font-semibold drop-shadow-md">
        Trouvez un serrurier fiable en quelques minutes
      </span>
    </header>
  );
};
