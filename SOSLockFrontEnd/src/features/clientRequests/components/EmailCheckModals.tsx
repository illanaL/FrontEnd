import { useForm } from "react-hook-form";
import { Modal } from "../../../components/Modal";
import { useRegisterUser, useLoginUser } from "../../authentication/hooks/useUserAuthMutations";

interface EmailCheckModalsProps {
  email: string;
  phone: string;
  modalType: "login" | "register" | null;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

// ── Modale Register ───────────────────────────────────────────────
interface RegisterForm {
  phone: string;
  password: string;
  confirmPassword: string;
}

function RegisterModal({
  email,
  phone,
  onClose,
  onSuccess,
}: {
  email: string;
  phone: string;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      phone,
    },
  });

  const { mutate, isPending, error } = useRegisterUser();

  const onSubmit = (data: RegisterForm) => {
    mutate(
      {
        email,
        phone: data.phone,
        password: data.password,
        firstName: "",
        lastName: "",
      },
      {
        onSuccess: (user) => {
          onSuccess(user.id);
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Créer votre compte"
      footer={
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-text/60 hover:text-text transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            form="register-modal-form"
            disabled={isPending}
            className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Création…" : "Créer mon compte"}
          </button>
        </div>
      }
    >
      <form
        id="register-modal-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Email en lecture seule — déjà saisi dans Step3 */}
        <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2">
          <p className="text-xs text-neutral-400">Email</p>
          <p className="text-sm font-medium text-neutral-700">{email}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Téléphone</label>
          <input
            type="tel"
            placeholder="Ex: 0612345678"
            {...register("phone", {
              required: "Le téléphone est requis",
              pattern: {
                value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                message: "Format invalide",
              },
            })}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="Min. 8 caractères"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: { value: 8, message: "Min. 8 caractères" },
            })}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            placeholder="Répétez le mot de passe"
            {...register("confirmPassword", {
              required: "La confirmation est requise",
              validate: (val) =>
                val === watch("password") ||
                "Les mots de passe ne correspondent pas",
            })}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600">{error.message}</p>
        )}
      </form>
    </Modal>
  );
}

// ── Modale Login ──────────────────────────────────────────────────
interface LoginForm {
  phone: string;
  password: string;
}

function LoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (userId: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutate, isPending, error } = useLoginUser();

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Se connecter"
      footer={
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-text/60 hover:text-text transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            form="login-modal-form"
            disabled={isPending}
            className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </button>
        </div>
      }
    >
      <form
        id="login-modal-form"
        onSubmit={handleSubmit((data) =>
          mutate(data, {
            onSuccess: (response) => {
              onSuccess(response.userId);
              onClose();
            },
          }),
        )}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Téléphone</label>
          <input
            type="tel"
            placeholder="Ex: 0612345678"
            {...register("phone", { required: "Le téléphone est requis" })}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis",
            })}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600">{error.message}</p>
        )}
      </form>
    </Modal>
  );
}

// ── Export principal ──────────────────────────────────────────────
export function EmailCheckModals({
  email,
  phone,   // ← destructure
  modalType,
  onClose,
  onSuccess,
}: EmailCheckModalsProps) {
  if (modalType === "register") {
    return (
      <RegisterModal email={email} phone={phone} onClose={onClose} onSuccess={onSuccess} />
    );
  }
  if (modalType === "login") {
    return <LoginModal onClose={onClose} onSuccess={onSuccess} />;
  }
  return null;
}