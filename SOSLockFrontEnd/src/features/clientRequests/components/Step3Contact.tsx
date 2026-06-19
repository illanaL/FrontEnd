import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ClientRequestFormData } from "../clientRequest.types";
import { useDebounce } from "../../../hooks/useDebounce";
import { checkEmailExists } from "../../user/api/users.api";
import { EmailCheckModals } from "./EmailCheckModals";
import { step3Schema, type Step3FormData } from "../schema/filter.schema";
import { useUserAuth } from "../../authentication/hooks/useUserAuthMutations";



interface Props {
  formdata: ClientRequestFormData;
  update: (field: keyof ClientRequestFormData, value: unknown) => void;
  onNext: () => void;
}

interface GouvAddressFeature {
  properties: {
    label: string;
    housenumber?: string;
    street?: string;
    postcode: string;
    city: string;
  };
}

export const Step3Contact = ({ formdata: formData, update, onNext }: Props) => {
  const [addressSearch, setAddressSearch] = useState("");
  const [suggestions, setSuggestions] = useState<GouvAddressFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [emailModalType, setEmailModalType] = useState<"login" | "register" | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const debouncedAddressSearch = useDebounce(addressSearch, 300);

  const { isAuthenticated, user } = useUserAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3FormData>({
    mode: "onChange",
    resolver: zodResolver(step3Schema),
    defaultValues: {
      firstName: isAuthenticated && user ? user.firstName || "" : formData.firstName || "",
      lastName: isAuthenticated && user ? user.lastName || "" : formData.lastName || "",
      phone: isAuthenticated && user ? user.phone || "" : formData.phone || "",
      email: isAuthenticated && user ? user.email || "" : formData.email || "",
      description: formData.description || "",
      addressRequest: {
        number: formData.addressRequest?.number || "",
        street: formData.addressRequest?.street || "",
        zipCode: formData.addressRequest?.zipCode || "",
        city: formData.addressRequest?.city || "",
      },
    },
  });

  

  const currentAddress = watch("addressRequest");
  const currentEmail = watch("email");
  const currentPhone = watch("phone");

  useEffect(() => {
    console.log("Email changed:", currentEmail);
    console.log("Phone changed:", currentPhone);
  }, [currentEmail, currentPhone])

  useEffect(() => {
    if (formData.addressRequest?.city) {
      const { number, street, zipCode, city } = formData.addressRequest;
      setAddressSearch(`${number} ${street}, ${zipCode} ${city}`);
    }
  }, [formData.addressRequest]);

  useEffect(() => {
    if (debouncedAddressSearch.trim().length < 4) {
      setSuggestions([]);
      return;
    }
    const fetchAddresses = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(debouncedAddressSearch)}&limit=5`,
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Erreur API Adresse Gouv:", error);
      } finally {
        setIsSearching(false);
      }
    };
    fetchAddresses();
  }, [debouncedAddressSearch]);

  const handleSelectAddress = (feature: GouvAddressFeature) => {
    const { housenumber, street, postcode, city, label } = feature.properties;
    setValue("addressRequest.number", housenumber || "1");
    setValue("addressRequest.street", street || label);
    setValue("addressRequest.zipCode", postcode);
    setValue("addressRequest.city", city, { shouldValidate: true });
    setAddressSearch(label);
    setShowSuggestions(false);
  };


  const checkEmailExistsAndOpenModal = async (email: string) => {
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return;
    setIsCheckingEmail(true);
    const exists = await checkEmailExists(email);
    setIsCheckingEmail(false);
    setEmailModalType(exists ? "login" : "register");
  };

  const onSubmit = (data: Step3FormData) => {
    // If the re is no authenticated User open model
    if (!isAuthenticated) {
      checkEmailExistsAndOpenModal(data.email);
      return;
    }
    Object.entries(data).forEach(([key, value]) => {
      update(key as keyof ClientRequestFormData, value);
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-sos-900 mb-2">
          Vos coordonnées & informations
        </h2>
        <p className="text-sos-500 text-sm">
          Veuillez remplir tous les champs obligatoires avant de valider.
        </p>
      </div>

      <form
        id="contact-step-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* --- NOM & PRÉNOM --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-sos-900 mb-1">Prénom</label>
            <input
              type="text"
              placeholder="Ex: Jean"
              {...register("firstName")}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-sos-900 outline-none transition-all ${
                errors.firstName ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-sos-200 focus:ring-2 focus:ring-sos-300"
              }`}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-sos-900 mb-1">Nom</label>
            <input
              type="text"
              placeholder="Ex: Dupont"
              {...register("lastName")}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-sos-900 outline-none transition-all ${
                errors.lastName ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-sos-200 focus:ring-2 focus:ring-sos-300"
              }`}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* --- TÉLÉPHONE & EMAIL --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-sos-900 mb-1">Téléphone</label>
            <input
              type="tel"
              placeholder="Ex: 0612345678"
              {...register("phone")}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-sos-900 outline-none transition-all ${
                errors.phone ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-sos-200 focus:ring-2 focus:ring-sos-300"
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-sos-900 mb-1">Adresse Email</label>
            <input
              disabled={isAuthenticated && user ? true : false}

              type="email"
              placeholder="Ex: jean.dupont@email.com"
              {...register("email")}
              // onBlur={(e) => handleEmailBlur(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-sos-900 outline-none transition-all ${
                isAuthenticated && user ? "bg-gray-100 border-sos-200 cursor-not-allowed" : ""
              } ${
                errors.email ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-sos-200 focus:ring-2 focus:ring-sos-300"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            {isCheckingEmail && <p className="text-xs text-teal-500 mt-1 animate-pulse">Vérification…</p>}
          </div>
        </div>

        {/* --- AUTOCOMPLÉTION ADRESSE --- */}
        <div className="relative">
          <label className="block text-sm font-semibold text-sos-900 mb-1">
            Rechercher votre adresse complète
          </label>
          <input
            type="text"
            value={addressSearch}
            onChange={(e) => { setAddressSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
            placeholder="Commencez à taper votre adresse (ex: 10 rue de Rivoli...)"
            className="w-full border border-sos-200 rounded-xl px-4 py-3 text-sm text-sos-900 outline-none focus:ring-2 focus:ring-sos-300 transition-all"
          />
          {isSearching && (
            <span className="absolute right-3 top-9 text-xs text-sos-400 animate-pulse">Recherche...</span>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-sos-200 rounded-xl shadow-xl max-h-56 overflow-y-auto">
              {suggestions.map((feature, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectAddress(feature)}
                  className="w-full text-left px-4 py-2.5 hover:bg-sos-50 text-sm text-sos-900 border-b border-sos-100 last:border-none"
                >
                  📍 {feature.properties.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- APERÇU ADRESSE --- */}
        {currentAddress?.city && (
          <div className="bg-sos-50/70 border border-sos-100 p-4 rounded-xl text-xs text-sos-700 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div><span className="font-bold block text-sos-400 uppercase">N° :</span>{currentAddress.number}</div>
            <div><span className="font-bold block text-sos-400 uppercase">Rue :</span>{currentAddress.street}</div>
            <div><span className="font-bold block text-sos-400 uppercase">Code Postal :</span>{currentAddress.zipCode}</div>
            <div><span className="font-bold block text-sos-400 uppercase">Ville :</span>{currentAddress.city}</div>
          </div>
        )}

        {/* Input masqué validation adresse */}
        <input type="hidden" {...register("addressRequest.city")} />
        {errors.addressRequest?.city && (
          <p className="text-xs text-red-500 mt-1">{errors.addressRequest.city.message}</p>
        )}

        {/* --- DESCRIPTION --- */}
        <div>
          <label className="block text-sm font-semibold text-sos-900 mb-1">
            Précisions complémentaires (Optionnel)
          </label>
          <textarea
            placeholder="Bâtiment, code d'accès, étage..."
            rows={2}
            {...register("description")}
            className="w-full border border-sos-200 rounded-xl px-4 py-3 text-sm text-sos-900 outline-none focus:ring-2 focus:ring-sos-300 transition-all resize-none"
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
        </div>
      </form>

      {/* --- MODALES EMAIL --- */}
      <EmailCheckModals
        email={currentEmail ?? ""}
        phone={currentPhone ?? ""} 
        modalType={emailModalType}
        onClose={() => setEmailModalType(null)}
        onSuccess={(data) => {
          useUserAuth.getState().login(data.user, data.accessKey);
        }}
      />
    </div>
  );
};