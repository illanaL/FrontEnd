import { useNavigate } from "react-router-dom";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { Tooltip } from "../../../components/Tooltip";

type AskInterventionButtonProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "outline"
}

const sizes = {
  sm:  "px-3 py-1.5 text-xs",
  md:  "px-5 py-2.5 text-sm",
  lg:  "px-7 py-3.5 text-base",
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
  outline: "bg-white text-blue-600 border-blue-600 hover:bg-blue-50",
}

export function AskInterventionButton({
  className = "",
  size = "md",
  variant = "primary",
}: AskInterventionButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/ask-client-request")}
      className={`
        inline-flex items-center gap-2 font-medium rounded-lg border transition-colors
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      
      <Tooltip content="Nouvelle demande d'intervention">
        <span className="sr-only">Nouvelle demande d'intervention</span>
        
         Nouvelle demande
         <BiSolidMessageRoundedAdd />
      </Tooltip>
    </button>
  );
}