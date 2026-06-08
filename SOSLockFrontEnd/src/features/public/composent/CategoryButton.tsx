import type { Category } from "../../products/type/products.type";

interface CategoryButtonProps {
  id: Category;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryButton = ({ label, icon, isActive, onClick }: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`category-card glass-panel p-6 rounded-2xl flex flex-col items-center gap-3 border-2 transition-all hover:border-secondary/50 ${
        isActive 
          ? "active border-tertiary-fixed-dim bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
          : "border-transparent"
      }`}
    >
      <span 
        className={`material-symbols-outlined text-[40px] transition-colors ${
          isActive ? "text-tertiary-fixed-dim" : "text-white/70"
        }`}
      >
        {icon}
      </span>
      <span className="font-label-md text-label-sm text-white select-none">{label}</span>
    </button>
  );
};