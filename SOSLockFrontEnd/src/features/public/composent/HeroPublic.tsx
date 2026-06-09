import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useClientRequestStore } from "../../clientRequests/stores/useClientRequestStore";
import { Category, type Product } from "../../products/type/products.type";
import { useProductsByCategory } from "../../products/hooks/useProductsByCategory";
import { CategoryButton } from "./CategoryButton";

interface SearchFormInput {
  city: string;
  category: Category;
  searchQuery: string;
  selectedProduct: Product | null;
}

const CATEGORIES_CONFIG = [
  { id: Category.SERRURE, label: "Serrurerie", icon: "lock" },
  { id: Category.PORTE, label: "Porte", icon: "door_front" },
  { id: Category.FENETRE, label: "Fenêtre", icon: "window" },
  { id: Category.VOLET, label: "Volet", icon: "roller_shades" },
  { id: Category.PORTAIL, label: "Portail", icon: "gate" },
  { id: Category.COFFRE_FORT, label: "Coffre-Fort", icon: "safe" },
  {
    id: Category.RIDEAU_METAL,
    label: "Rideau Métal",
    icon: "domain_verification",
  },
  { id: Category.BLINDAGE, label: "Blindage", icon: "shield" },
  { id: Category.INTERPHONE, label: "Interphone", icon: "ring_volume" },
  {
    id: Category.CONTROLE_ACCES,
    label: "Contrôle Accès",
    icon: "key_visualizer",
  },
  { id: Category.DOMOTIQUE, label: "Domotique", icon: "door_sensor" },
  { id: Category.DEPANNAGE, label: "Dépannage", icon: "home_repair_service" },
];

export default function HeroPublic() {
  const navigate = useNavigate();
  const updateField = useClientRequestStore((state) => state.update);
  const setStep = useClientRequestStore((state) => state.setStep);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SearchFormInput>({
    defaultValues: {
      city: "",
      category: Category.SERRURE,
      searchQuery: "",
      selectedProduct: null,
    },
  });

  const currentCategory = watch("category");
  const currentSearch = watch("searchQuery");
  const selectedProduct = watch("selectedProduct");

  const { data: dbProducts = [], isLoading: isLoadingProducts } =
    useProductsByCategory(currentCategory);

  const filteredProducts = dbProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(currentSearch.toLowerCase()),
  );

  const handleProcessRedirection = (
    cityValue: string,
    categoryValue: Category,
    product: Product | null,
    searchInputValue: string,
  ) => {
    updateField("addressRequest", {
      number: "",
      street: "",
      zipCode: "",
      city: cityValue,
    });
    updateField("categoryId", categoryValue);

    if (product) {
      updateField("productIds", [product.id]);
      updateField("description", `Forfait ciblé : ${product.name}`);
      setStep(2);
    } else {
      updateField("productIds", []);
      updateField(
        "description",
        `Demande personnalisée [${categoryValue}] : ${searchInputValue}`,
      );
      setStep(1);
    }

    updateField("isUrgent", true);
    navigate("/ask-client-request");
  };

  // Action automatique dès qu'on clique sur un produit ou sur besoin personnalisé
  const handleSelectProduct = async (
    e: React.MouseEvent,
    product: Product | null,
  ) => {
    e.preventDefault(); // Évite que le clic sur la carte ne valide le <form>
    e.stopPropagation();

    setValue("selectedProduct", product);
    setValue("searchQuery", product ? product.name : "");

    const isCityValid = await trigger("city");

    if (isCityValid) {
      const formValues = getValues();
      handleProcessRedirection(
        formValues.city,
        formValues.category,
        product,
        formValues.searchQuery,
      );
    } else {
      // Si la ville manque, focus direct sur l'input
      document.getElementById("city-input")?.focus();
    }
  };

  // Soumission manuelle via le gros bouton "Intervenir" (ex: cas où l'utilisateur écrit une recherche libre)
  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    handleProcessRedirection(
      data.city,
      data.category,
      data.selectedProduct,
      data.searchQuery,
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-primary py-24">
      {/* Background Decorator */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Background Security"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtkT89gYkqGlXZVYMxt0HOKusPV2WTM0AM662ceghLnVxuvNpQdhgQLs9zNDtw25MfwuKlfPGrcwYy5TCJ-QSz6q_T5oNyHcKzVAocf2s_orJgU-kCa16uvHTyjRlmV9ZWUXEyltK6txwfa9v4vJcrmdacW3TfgDZKRKze4qLa1f909jYZiwppnPUlNHQGaAbKVMMxQSPO7JItg2ogrGMxAt2dAtbzfUj9sSZ5zI8b2m3ctJxTXRuHuYKRVj_y3wgdTElgO5OPfTyt"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/80 to-surface"></div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      <div className="max-w-max-width mx-auto px-margin-desktop relative z-10 w-full text-center">
        {/* Top Titles */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
            <span className="flex h-2 w-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary-fixed-dim">
              Votre demande de dépannage 24/7
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-surface-bright mb-6 max-w-4xl mx-auto">
            Trouver un artisan disponible <br />
            <span className="text-tertiary-fixed-dim">
              en moins de 20 minutes
            </span>
          </h1>
        </div>

        {/* Configurator Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
          {/* Grille des Catégories */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {CATEGORIES_CONFIG.map((cat) => (
              <CategoryButton
                key={cat.id}
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                isActive={currentCategory === cat.id}
                onClick={() => {
                  setValue("category", cat.id);
                  setValue("searchQuery", "");
                  setValue("selectedProduct", null);
                }}
              />
            ))}
          </div>

          {/* SECTION CATALOGUE : Prix Dynamiques + Redirection Instantanée */}
          <div className="mb-8 text-left">
            <h3 className="text-white font-headline-sm text-body-lg mb-4 flex items-center gap-2 px-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">
                assignment
              </span>
              {isLoadingProducts
                ? "Chargement des forfaits..."
                : "Sélectionnez une prestation pour lancer l'intervention :"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-72 overflow-y-auto p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              {/* Option Forfait Libre / Personnalisé */}
              <div
                onClick={(e) => handleSelectProduct(e, null)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-32 ${
                  selectedProduct === null
                    ? "border-tertiary-fixed-dim bg-white/10"
                    : "border-white/10 bg-transparent hover:border-white/30"
                }`}
              >
                <div>
                  <h4 className="text-white font-bold text-body-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">
                      edit_note
                    </span>
                    Besoin personnalisé
                  </h4>
                  <p className="text-white/60 text-xs mt-1 line-clamp-2">
                    Votre problème ne correspond à aucun forfait ? Décrivez-le
                    manuellement.
                  </p>
                </div>
                <span className="text-xs text-white/50 font-bold uppercase tracking-wider">
                  Sur devis
                </span>
              </div>

              {/* Forfaits réels issus de la BDD */}
              {filteredProducts.map((product) => {
                const isSelected = selectedProduct?.id === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={(e) => handleSelectProduct(e, product)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-32 text-left ${
                      isSelected
                        ? "border-tertiary-fixed-dim bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        : "border-white/10 bg-transparent hover:border-white/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-white font-bold text-body-md line-clamp-1 flex items-center gap-1.5">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim" />
                          )}
                          {product.name}
                        </h4>
                        {/* Affichage du prix à droite du titre */}
                        <span className="text-tertiary-fixed-dim font-bold text-body-md whitespace-nowrap">
                          {product.price}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono">
                        Forfait
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-all ${
                          isSelected
                            ? "bg-tertiary-fixed-dim border-tertiary-fixed-dim text-primary"
                            : "border-white/30 text-transparent"
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saisie Manuelle et Ville */}
          <div className="glass-panel p-6 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 items-start w-full">
              {/* Input Saisie Libre */}
              <div className="relative flex-1 w-full text-left">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary-fixed-dim z-10">
                  {selectedProduct ? "assignment_turned_in" : "search"}
                </span>
                <input
                  {...register("searchQuery", { required: !selectedProduct })}
                  autoComplete="off"
                  className={`w-full bg-white/5 border rounded-2xl py-5 pl-14 pr-6 text-body-md font-body-md text-white placeholder:text-white/30 focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent outline-none transition-all ${
                    errors.searchQuery ? "border-red-500" : "border-white/10"
                  } ${selectedProduct ? "text-tertiary-fixed-dim font-bold" : ""}`}
                  placeholder={
                    selectedProduct
                      ? `Sélectionné : ${selectedProduct.name} (${selectedProduct.price})`
                      : "Filtrer ou décrire votre problème sur-mesure..."
                  }
                  type="text"
                />
              </div>

              {/* Input Ville */}
             {/*  <div className="relative w-full md:w-64 text-left">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary-fixed-dim z-10">
                  location_on
                </span>
               <input
                  id="city-input"
                  {...register("city", { required: true })}
                  className={`w-full bg-white/5 border rounded-2xl py-5 pl-14 pr-6 text-body-md font-body-md text-white placeholder:text-white/30 focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent outline-none transition-all ${
                    errors.city ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="Ville (Ex: Paris)"
                  type="text"
                />
                {errors.city && (
                  <span className="text-red-400 text-xs absolute left-2 -bottom-5">
                    Veuillez renseigner votre ville
                  </span>
                )}
              </div>*/}

              {/* Bouton de secours si saisie manuelle sans clic sur forfait */}
              <button
                type="submit"
                className="w-full md:w-auto bg-tertiary-fixed-dim text-primary px-10 py-5 rounded-2xl font-headline-md text-headline-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg h-16.5 self-start font-bold"
              >
                <span className="material-symbols-outlined">bolt</span>
                Intervenir
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
