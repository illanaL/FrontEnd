import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import LayoutPublic from "../layout/LayoutPublic";
import { useClientRequestStore } from "../../clientRequests/stores/useClientRequestStore";
import { Category, type Product } from "../../products/type/products.type";
import { useProductsByCategory } from "../../products/hooks/useProductsByCategory";
import HeroPublic from "../composent/HeroPublic";

interface SearchFormInput {
  city: string;
  category: Category | null;
  searchQuery: string;
  selectedProduct: Product | null;
}

export default function HomePage() {
  const navigate = useNavigate();
  const updateField = useClientRequestStore((state) => state.update);
  const setStep = useClientRequestStore((state) => state.setStep);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<SearchFormInput>({
    defaultValues: {
      city: "",
      category: null,
      searchQuery: "",
      selectedProduct: null,
    },
  });

  const currentCategory = watch("category");
  const currentSearch = watch("searchQuery");

  const { data: dbProducts = [], isLoading: isLoadingProducts } =
    useProductsByCategory(currentCategory);

  const filteredProducts = dbProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(currentSearch.toLowerCase()),
  );

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    if (!data.category) return;

    updateField("addressRequest", {
      number: "",
      street: "",
      zipCode: "",
      city: data.city,
    });
    updateField("categoryId", data.category);

    if (data.selectedProduct) {
      updateField("productIds", [data.selectedProduct.id]);
      updateField(
        "description",
        `Forfait ciblé : ${data.selectedProduct.name}`,
      );
      setStep(2);
    } else {
      updateField(
        "description",
        `Demande personnalisée [${data.category}] : ${data.searchQuery}`,
      );
    }

    updateField("isUrgent", true);
    navigate("/ask-client-request");
  };

  return (
    <LayoutPublic>
      <HeroPublic />
      <div className="max-w-xl mx-auto p-6 bg-surface rounded-xl shadow-lg border border-outline-variant my-12">
        <h2 className="text-xl font-bold mb-6 text-primary">
          Votre demande de dépannage
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Ville */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Dans quelle ville vous situez-vous ?
            </label>
            <input
              {...register("city")}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant"
              placeholder="Ex: Paris 75011"
              required
            />
          </div>

          {/* Grille des Catégories */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quel est le domaine concerné ?
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-lg border-outline-variant bg-bg-soft">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setValue("category", cat);
                    setValue("searchQuery", "");
                    setValue("selectedProduct", null);
                  }}
                  className={`px-3 py-2 text-left rounded-md text-xs font-semibold transition-all border ${
                    currentCategory === cat
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface hover:bg-primary/5 text-on-surface border-outline-variant"
                  }`}
                >
                  🛠️ {cat.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Saisie prédictive */}
          {currentCategory && (
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                Quel est votre problème précisément ?
              </label>
              <input
                {...register("searchQuery")}
                autoComplete="off"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant"
                placeholder={
                  isLoadingProducts
                    ? "Chargement des options de notre catalogue..."
                    : "Ex: Clé cassée, serrure bloquée..."
                }
                disabled={isLoadingProducts}
                required
              />

              {/* Suggestions du catalogue en Cache TanStack */}
              {showSuggestions && currentSearch.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setValue("searchQuery", product.name);
                          setValue("selectedProduct", product);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-primary/10 text-sm text-on-surface border-b border-outline-variant last:border-none flex flex-col"
                      >
                        <span className="font-bold">{product.name}</span>
                        <span className="text-xs text-on-surface-variant line-clamp-1">
                          {product.description}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-on-surface-variant italic">
                      Aucun forfait exact trouvé. Notre artisan adaptera son
                      devis en fonction de votre description libre !
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!currentCategory}
            className="w-full bg-secondary text-on-secondary py-4 rounded-lg font-bold disabled:opacity-50 transition-all"
          >
            Trouver un artisan disponible
          </button>
        </form>
      </div>

      {/* --- SECTION SERVICES --- */}
      <section className="py-24 bg-surface px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            Nos Services d'Expertise
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Large Card 1 */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low h-80 transition-all hover:shadow-xl">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
              alt="Close-up of a high-tech metallic door lock"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXyZrcMpUITFsYLAjbJiaMjsZQH9_JkDbLVGpggzYDtf3piDmiOfqt4NjAbiYzWCBLYaF44EdK7u2NJKk077YHTPZ-TKNqtBRZWaYOEdjzeLdz7GjQPB8ctLPh19aTo0-o29A87mcfxoNdLMlM-KygxfPDejkwvWhTn_7OxJxGpuDBv0VJH9iX0TB0ra-fukBF2LQuiO0Q9MvtyTo3CsHFmAGXWZlpNEkzKwwgvwYNfvE9M5xjV5Xgr6ROw9j5_L4IKgLbBs7sv8N"
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface-container-low via-surface-container-low/80 to-transparent p-10 flex flex-col justify-end">
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">
                lock_open
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">
                Ouverture de porte en urgence
              </h3>
              <p className="text-on-surface-variant max-w-md">
                Intervention non-destructive pour porte claquée ou fermée à clé.
                Disponible 24h/24.
              </p>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="group border border-outline-variant rounded-xl p-8 flex flex-col justify-between hover:bg-primary hover:text-on-primary transition-all duration-300">
            <div>
              <div className="w-16 h-16 bg-surface-container-highest rounded-xl flex items-center justify-center mb-6 group-hover:bg-on-primary-container">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary">
                  key
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">
                Changement de serrure
              </h3>
              <p className="text-on-surface-variant group-hover:text-on-primary/70">
                Mise aux normes A2P pour une sécurité maximale contre les
                cambriolages.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-label-sm border border-outline-variant flex items-center gap-1 group-hover:bg-on-primary-container group-hover:text-on-primary group-hover:border-transparent">
                  <span className="material-symbols-outlined text-sm">
                    window
                  </span>
                  Fenêtres
                </span>
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-label-sm border border-outline-variant flex items-center gap-1 group-hover:bg-on-primary-container group-hover:text-on-primary group-hover:border-transparent">
                  <span className="material-symbols-outlined text-sm">
                    blinds
                  </span>
                  Volets roulants
                </span>
              </div>
            </div>
            <Link
              className="mt-8 flex items-center gap-2 font-bold group-hover:translate-x-2 transition-transform text-inherit"
              to="/ask-client-request"
            >
              En savoir plus{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Small Card 2 */}
          <div className="group border border-outline-variant rounded-xl p-8 flex flex-col justify-between hover:bg-secondary hover:text-on-secondary transition-all duration-300">
            <div>
              <div className="w-16 h-16 bg-surface-container-highest rounded-xl flex items-center justify-center mb-6 group-hover:bg-on-secondary-container">
                <span className="material-symbols-outlined text-secondary text-3xl group-hover:text-on-secondary">
                  shield
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">
                Blindage de porte
              </h3>
              <p className="text-on-surface-variant group-hover:text-on-secondary/70">
                Renfort de structure et pose de plaques d'acier certifiées.
              </p>
            </div>
            <Link
              className="mt-8 flex items-center gap-2 font-bold group-hover:translate-x-2 transition-transform text-inherit"
              to="/ask-client-request"
            >
              Devis gratuit{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-2 border border-outline-variant rounded-xl bg-surface-container-high p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                Contrôle d'accès Intelligent
              </h3>
              <p className="text-on-surface-variant mb-6">
                Modernisez votre sécurité avec des serrures connectées, claviers
                à code ou lecteurs biométriques de dernière génération.
              </p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-surface rounded text-label-sm font-label-sm border border-outline-variant">
                  Bluetooth
                </span>
                <span className="px-3 py-1 bg-surface rounded text-label-sm font-label-sm border border-outline-variant">
                  Code
                </span>
                <span className="px-3 py-1 bg-surface rounded text-label-sm font-label-sm border border-outline-variant">
                  Badge
                </span>
              </div>
            </div>
            <div className="w-full md:w-64 aspect-video rounded-lg overflow-hidden border border-outline">
              <img
                className="w-full h-full object-cover"
                alt="Modern smart home digital lock"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKIJ7KzwIsRXUnsr-eT9uL1uUfKsas3M1pDXBhEWllAfLnLsXy2EaJloSQIqMbNk0EPyi2pvg1-dvdDYFXhD8Bya7X5MwcjuDNOu-9W4BqtQ_GMuc1xsaqr437Axj8JewfIKOnwhG8gTT2TYQx_EBMVuUxh_W4j4GwXTFVEhfSkFMwZ2yh9MdegUXkxORi7nnw9dGVo59fJEEXvn-JeR48D2NLBmdkgSqGeyeWTpI6CT2lKPLqmuG8YuPjc-uoFpByxpP5KJhWYZlw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION POURQUOI NOUS --- */}
      <section className="bg-primary text-on-primary py-24">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-8">
                Pourquoi faire confiance à SOSLock ?
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary">
                      verified
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-headline-md mb-2">
                      Artisans Certifiés
                    </h4>
                    <p className="text-on-primary-container">
                      Chaque professionnel sur notre plateforme est
                      rigoureusement vérifié (diplômes, assurances, casier
                      judiciaire).
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary">
                      payments
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-headline-md mb-2">
                      Tarification Transparente
                    </h4>
                    <p className="text-on-primary-container">
                      Pas de mauvaises surprises. Le tarif est annoncé avant
                      l'intervention et respecté à la lettre.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary">
                      timer
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-headline-md mb-2">
                      Rapidité Record
                    </h4>
                    <p className="text-on-primary-container">
                      Notre système de géolocalisation envoie le dépanneur le
                      plus proche pour une arrivée en moins de 20 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-full border-20 border-secondary/20 flex items-center justify-center p-8">
                <img
                  className="rounded-full w-full h-full object-cover grayscale opacity-60"
                  alt="A professional locksmith toolset"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbWKKWQ33kTX3-K084CQ9nCEl33p-OAEHorThuas3bjnK-wTUW5tf4nRAaZITWs07FhcPWj9t3-B30plAD82irFebsouKiPCSY3cVvxft8Jl7ZXeXFQdmWM9uvvcUDVgldA3C7qxoDf0ncWbTktRY_MzQl5gwLVUdZtBxVS1nI7NLI_AC5bP0WeF1wPC6_uOQueNT7e5ZFLyqhZmJbsW-jnHXQdAEFMw14HtypZwRRc75Bz4wFoAy706C_dfJLbB1ByFQ39SOCJDH4"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface p-8 rounded-2xl shadow-2xl text-primary text-center w-64 border border-outline-variant">
                <p className="text-4xl font-black mb-1">98%</p>
                <p className="font-label-md text-label-md uppercase text-on-surface-variant">
                  Satisfaction
                </p>
                <div className="flex justify-center mt-2 text-tertiary-fixed-dim">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION AVIS CLIENTS --- */}
      <section className="py-24 bg-surface-alt overflow-hidden">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
                Ils nous ont fait confiance
              </h2>
              <p className="text-on-surface-variant">
                Plus de 10 000 interventions réussies cette année.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors"
                aria-label="Avis précédent"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                className="p-3 rounded-full bg-primary text-on-primary hover:opacity-90 transition-colors"
                aria-label="Avis suivant"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-base">
            {/* Carte Avis 1 */}
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-colors group">
              <div className="flex text-tertiary-fixed-dim mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-on-surface italic mb-6">
                "Intervention en plein dimanche soir à 23h pour une porte
                claquée avec les clés à l'intérieur. Le serrurier est arrivé en
                15 min chrono. Travail propre et prix annoncé respecté. Je
                recommande !"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                  JP
                </div>
                <div>
                  <p className="font-bold text-on-surface">Jean-Pierre M.</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Paris 15ème
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Avis 2 */}
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-colors group">
              <div className="flex text-tertiary-fixed-dim mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-on-surface italic mb-6">
                "Après un cambriolage, SOSLock a envoyé quelqu'un pour sécuriser
                ma porte immédiatement. Le serrurier était très pédagogue et m'a
                installé un blindage de qualité. Un grand merci pour votre
                réactivité."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                  SL
                </div>
                <div>
                  <p className="font-bold text-on-surface">Sandrine L.</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Lyon
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Avis 3 */}
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-colors group">
              <div className="flex text-tertiary-fixed-dim mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-on-surface italic mb-6">
                "Remplacement de serrure simple et efficace. Devis en ligne
                clair, rendez-vous pris le lendemain. Artisan ponctuel et
                sympathique. Rien à redire sur la qualité du matériel."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                  AM
                </div>
                <div>
                  <p className="font-bold text-on-surface">Antoine M.</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Bordeaux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION CTA --- */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-max-width mx-auto bg-secondary-container rounded-3xl p-8 md:p-16 text-on-secondary-container flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="z-10">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-secondary-container">
              Besoin d'un serrurier maintenant ?
            </h2>
            <p className="font-body-lg text-body-lg opacity-90 max-w-xl">
              Nos équipes sont mobilisées dans toute la France. Trouvez le
              meilleur professionnel près de chez vous en quelques clics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 z-10 w-full md:w-auto">
            <a
              className="bg-primary text-on-primary px-10 py-5 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform"
              href="tel:0800000000"
            >
              <span className="material-symbols-outlined">call</span>
              Appeler SOS
            </a>
            <Link
              className="bg-surface text-primary px-10 py-5 rounded-xl font-bold hover:bg-surface-dim transition-colors text-center flex items-center justify-center"
              to="/ask-client-request"
            >
              Prendre RDV
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </LayoutPublic>
  );
}
