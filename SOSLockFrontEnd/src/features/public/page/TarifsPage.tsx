import serrureImg3 from "../images/serrure3.png";
import LayoutPublic from "../layout/LayoutPublic";

export default function TarifsPage() {
  return (
    <LayoutPublic>
      <main>
        {/* Hero Section: Transparency Focus */}
        <section className="hero-gradient text-on-primary py-20 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-max-width mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-headline-xl text-headline-xl mb-6">
                Transparence totale,
                <br />
                Sérénité absolue.
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary-container mb-8 max-w-lg">
                Chez SOSLock, nous croyons qu'une urgence ne devrait jamais
                rimer avec mauvaise surprise. Découvrez nos tarifs encadrés et
                notre modèle de qualité garantie.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">
                    verified_user
                  </span>
                  <span className="font-label-md text-label-md">
                    Artisans Certifiés
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">
                    payments
                  </span>
                  <span className="font-label-md text-label-md">
                    Zéro Frais Cachés
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  className="w-full h-full object-cover"
                  src={serrureImg3}
                  alt="Modern residential door handle and lock"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Grille des interventions courantes
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-body-md text-body-md">
              Les tarifs indiqués sont des moyennes constatées comprenant le
              déplacement, la main d'œuvre et la sécurisation immédiate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Intervention Card 1 */}
            <div className="bento-card bg-surface-container-low p-8 border border-outline-variant rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-primary-container">
                    door_front
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  Ouverture de porte
                </h3>
                <p className="text-on-surface-variant font-body-md mb-6">
                  Porte claquée sans verrouillage, intervention standard de
                  jour.
                </p>
              </div>
              <div className="border-t border-outline-variant pt-6 flex justify-between items-end">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  À partir de
                </span>
                <span className="font-headline-lg text-headline-lg text-secondary">
                  138€ <span className="text-label-md font-label-md">TTC</span>
                </span>
              </div>
            </div>

            {/* Intervention Card 2 */}
            <div className="bento-card bg-surface-container-low p-8 border border-outline-variant rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-primary-container">
                    lock_reset
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  Changement Cylindre
                </h3>
                <p className="text-on-surface-variant font-body-md mb-6">
                  Remplacement de barillet standard (hors fournitures
                  spécifiques).
                </p>
              </div>
              <div className="border-t border-outline-variant pt-6 flex justify-between items-end">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  À partir de
                </span>
                <span className="font-headline-lg text-headline-lg text-secondary">
                  108€ <span className="text-label-md font-label-md">TTC</span>
                </span>
              </div>
            </div>

            {/* Intervention Card 3 */}
            <div className="bento-card bg-primary text-on-primary p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm px-3 py-1 rounded-full uppercase">
                Urgent
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white">
                    emergency
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-2">
                  Nuit & Weekend
                </h3>
                <p className="text-on-primary-container font-body-md mb-6">
                  Majoration pour les interventions entre 20h et 8h ou jours
                  fériés.
                </p>
              </div>
              <div className="border-t border-white/20 pt-6 flex justify-between items-end">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/60">
                  Majoration
                </span>
                <span className="font-headline-lg text-headline-lg text-tertiary-fixed-dim">
                  +50%{" "}
                  <span className="text-label-md font-label-md text-white/80">
                    FIXE
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* The Model: Why SOSLock? */}
        <section className="bg-surface-container-highest py-24">
          <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    handshake
                  </span>
                  <h4 className="font-headline-md text-headline-md mb-2">
                    Modèle Commission
                  </h4>
                  <p className="font-body-md text-on-surface-variant">
                    Notre plateforme perçoit une commission fixe des artisans,
                    ce qui nous permet de réguler les prix du marché.
                  </p>
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    fact_check
                  </span>
                  <h4 className="font-headline-md text-headline-md mb-2">
                    Contrôle Qualité
                  </h4>
                  <p className="font-body-md text-on-surface-variant">
                    Chaque facture est auditée. En cas d'abus tarifaire,
                    l'artisan est immédiatement suspendu du réseau.
                  </p>
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    verified
                  </span>
                  <h4 className="font-headline-md text-headline-md mb-2">
                    Artisans Certifiés
                  </h4>
                  <p className="font-body-md text-on-surface-variant">
                    Vérification systématique des assurances décennales et des
                    agréments préfectoraux.
                  </p>
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    shield_with_heart
                  </span>
                  <h4 className="font-headline-md text-headline-md mb-2">
                    Prix Garanti
                  </h4>
                  <p className="font-body-md text-on-surface-variant">
                    Le devis validé dans l'application est le prix final payé.
                    Aucun centime de plus à la fin.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                Comment nous garantissons le juste prix.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Contrairement aux services de mise en relation opaques, SOSLock
                agit comme un tiers de confiance. Nous avons standardisé les
                tarifs de nos 500+ artisans partenaires.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-success-green mt-1">
                    check_circle
                  </span>
                  <span className="font-body-md">
                    Validation du devis par photo avant intervention.
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-success-green mt-1">
                    check_circle
                  </span>
                  <span className="font-body-md">
                    Paiement sécurisé via l'application.
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-success-green mt-1">
                    check_circle
                  </span>
                  <span className="font-body-md">
                    Service après-vente centralisé disponible 24/7.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-2xl mx-auto bg-primary-container p-12 rounded-4xl border border-outline-variant">
            <h3 className="font-headline-lg text-headline-lg text-on-primary mb-6">
              Besoin d'une intervention immédiate ?
            </h3>
            <p className="font-body-lg text-on-primary-container mb-8">
              Estimation gratuite en 2 minutes par téléphone ou via notre
              messagerie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-headline-md text-headline-md hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">call</span>0 800 000
                000
              </button>
              <button className="bg-white/10 backdrop-blur-md text-on-primary border border-white/20 px-8 py-4 rounded-xl font-headline-md text-headline-md hover:bg-white/20 transition-all">
                Demander un devis
              </button>
            </div>
          </div>
        </section>
      </main>
    </LayoutPublic>
  );
}
