import { Link } from "react-router-dom";
import HeroPublic from "../composent/HeroPublic";
import LayoutPublic from "../layout/LayoutPublic";

export default function HomePage() {
  return (
    <LayoutPublic>
      <HeroPublic />

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
                <p className="text-4xl font-black mb-1">?</p>
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
