
import React, { useState } from "react";
import LayoutPublic from "../layout/LayoutPublic";

export default function ZonesInterventionPage() {
  const [postalCode, setPostalCode] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de vérification de disponibilité ici
    console.log("Vérification du code postal :", postalCode);
  };

  return (
    <LayoutPublic>
    <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12">
      {/* Hero Search Section */}
      <section className="mb-16">
        <div className="max-w-3xl">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">
            Où intervenons-nous ?
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Nos artisans serruriers certifiés interviennent en moins de 30 minutes dans les plus grandes agglomérations françaises.
          </p>
          
          <form onSubmit={handleSearch} className="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-outline-variant py-3 md:py-0">
              <span className="material-symbols-outlined text-outline">location_on</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface focus:outline-none"
                placeholder="Entrez votre code postal (ex: 75001)"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Vérifier la disponibilité
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Bento Grid Intervention Zones */}
      <section className="mb-20">
        <h2 className="font-headline-md text-headline-md text-primary mb-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">explore</span>
          Régions couvertes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-150">
          {/* Large Featured Zone */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low transition-all hover:shadow-lg">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover grayscale opacity-20 transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB414BnurB0R_1h54vAIwKsBDp_-CISMg8yQn7Mww9y4ZbcrIcuo_lu8JDXepl4CvQ8m2tJT3Shl9WdMsD6O92Knvj4MkY36gusNtdthuy5jikpJyVzBzJHAgOl-lupn8D2C0zOVm5QqlzNXkl1wRhY5Cjslvug56WuTz8ocO8ukZTrZBE46qfW-ElvrNFbPEzPDpimcoq3wBCDOfbN1PI-hKGN83-YR4j6hUVYhTiyAIucOlXvG152052jTl1v2cURs8y0fD-k-wVc"
                alt="An expansive, high-angle view of the Parisian cityscape with the Eiffel Tower in the background under a soft golden sunset."
              />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-linear-to-t from-surface to-transparent">
              <span className="font-label-sm text-label-sm text-secondary bg-secondary-container px-3 py-1 rounded-full w-fit mb-4">
                ZONE PRIORITAIRE
              </span>
              <h3 className="font-headline-lg text-headline-lg text-primary">Île-de-France</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2">
                Plus de 45 serruriers d'astreinte 24h/24 à Paris, Boulogne-Billancourt, Nanterre et Saint-Denis.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <span 
                    className="material-symbols-outlined text-success-green text-[18px]" 
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-sm text-label-sm">Serruriers certifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="material-symbols-outlined text-success-green text-[18px]" 
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    schedule
                  </span>
                  <span className="font-label-sm text-label-sm">&lt; 20 min d'attente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Zones */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-6 transition-all hover:shadow-lg">
              <div className="absolute right-10 top-10 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-[160px]">lock</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Lyon & Rhône</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Intervention rapide sur Lyon, Villeurbanne et Vénissieux.
              </p>
              <button className="mt-4 text-secondary font-label-md text-label-md flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Voir les villes <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex-1 group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-6 transition-all hover:shadow-lg">
              <div className="absolute right-10 top-10 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-[160px]">security</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Marseille & PACA</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Zone côtière couverte de Marseille à Nice.
              </p>
              <button className="mt-4 text-secondary font-label-md text-label-md flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Voir les villes <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Proximity Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center mb-20">
        <div className="rounded-2xl overflow-hidden border border-outline-variant h-112.5 shadow-sm relative group">
          <div className="absolute inset-0 bg-surface-container-highest flex items-center justify-center">
            {/* Map Placeholder */}
            <img
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC46JAHlS0QuUjpVjNd34LprZXul7000LobVtJiOesQV4HQFJEYnOYgdz64WMWchUzHG2dd3ZBvs-TVjDsTEwf3ch6BWbjyejWStGvgn4Rj76PushSNQIxSxv0qHvRawmqwJMkErDRGKot0y4-FyTs6Cbys1ZnzSKQcp2U-t_DP55n580tmdR4Iyvhdsk6_2pCH7WSbnk2Qf5nm7Q89f5DGVI_MA0M8Jkr-IwaGC4rCJNxIEoxvGAy6hlPM8Jzmtv0gKk3MfPJMxBnj"
              alt="A highly detailed digital map of France with glowing blue markers indicating various intervention zones."
            />
            <div className="absolute top-4 left-4 bg-surface px-4 py-2 rounded-lg border border-outline-variant shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success-green animate-pulse"></div>
              <span className="font-label-sm text-label-sm text-on-surface">124 pros disponibles</span>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:pl-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Un maillage national en expansion
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              SOSLock sélectionne rigoureusement ses partenaires locaux. Chaque artisan est vérifié, assuré et engagé sur notre charte de prix transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-outline-variant rounded-xl bg-surface-alt">
              <span className="font-label-md text-label-md text-secondary block mb-1">Bordeaux</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">12 experts actifs</p>
            </div>
            <div className="p-4 border border-outline-variant rounded-xl bg-surface-alt">
              <span className="font-label-md text-label-md text-secondary block mb-1">Lille</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">8 experts actifs</p>
            </div>
            <div className="p-4 border border-outline-variant rounded-xl bg-surface-alt">
              <span className="font-label-md text-label-md text-secondary block mb-1">Toulouse</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">15 experts actifs</p>
            </div>
            <div className="p-4 border border-outline-variant rounded-xl bg-surface-alt">
              <span className="font-label-md text-label-md text-secondary block mb-1">Nantes</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">6 experts actifs</p>
            </div>
          </div>

          <div className="p-6 bg-primary-container rounded-xl border border-primary text-on-primary-container">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[32px] text-on-secondary-container">info</span>
              <div>
                <p className="font-body-md text-body-md font-semibold text-white">Zone non couverte ?</p>
                <p className="font-body-md text-body-md opacity-90">
                  Nous ouvrons de nouvelles zones chaque mois. Contactez-nous pour devenir partenaire SOSLock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="flex flex-wrap justify-center gap-12 py-12 border-y border-outline-variant mb-20">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-outline">Pros certifiés</span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-outline">Prix garantis</span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">flash_on</span>
          </div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-outline">&lt; 30 min</span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-outline">Suivi 24/7</span>
        </div>
      </section>
    </main>
    </LayoutPublic>
  );
}