import React, { forwardRef, useId } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

/**
 * Composant FormField — champ de formulaire accessible avec label et gestion d'erreur.
 * Utilise `forwardRef` pour exposer la ref de l'input au composant parent.
 *
 * @param label - Texte du label affiché au-dessus de l'input
 * @param type - Type HTML de l'input (default: `"text"`)
 * @param placeholder - Texte indicatif affiché dans l'input vide
 * @param error - Message d'erreur affiché sous l'input — passe l'input en rouge si présent
 * @param rest - Tous les attributs HTML natifs d'un input (`onChange`, `value`, `disabled`...)
 *
 * @example
 * // Utilisation simple
 * <FormField label="Email" type="email" placeholder="jean@example.com" />
 *
 * // Avec react-hook-form
 * <FormField
 *   label="Mot de passe"
 *   type="password"
 *   error={errors.password?.message}
 *   {...register("password")}
 * />
 */
export const FormField = forwardRef<
  HTMLInputElement,
  FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, type = "text", placeholder, error, ...rest }, ref) => {
  /**
   * useId génère un identifiant unique par instance du composant.
   * Lie le label à l'input via htmlFor/id pour l'accessibilité —
   * un clic sur le label focus l'input.
   */
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        /**
         * aria-invalid : signale aux lecteurs d'écran que le champ est en erreur
         * aria-describedby : lie l'input au message d'erreur via son id
         */
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
        className={`px-3 py-2 text-sm border rounded-lg outline-none transition-colors
          focus:ring-2 focus:ring-teal-500
          ${error ? "border-red-500 focus:ring-red-400" : "border-slate-300"}`}
      />
      {error && (
        <p id={errorId} aria-live="polite" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
