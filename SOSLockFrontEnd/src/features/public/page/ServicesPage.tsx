import LayoutPublic from "../layout/LayoutPublic";
import serrureImg from "../images/serrure2.png";
import serrure2Img from "../images/serrure.png";
import serrure3Img from "../images/porte blindée.png";
import serrure4Img from "../images/fenetre.png";
import serrure5Img from "../images/coffre-fort.png";
import serrure6Img from "../images/volet roulant.png";

interface ServiceItem {
  id: number;
  tag:
    | "URGENCE"
    | "SÉCURITÉ"
    | "RENFORCEMENT"
    | "PROTECTION"
    | "HABITAT"
    | "AUTOMATISME";
  title: string;
  description: string;
  imageSrc: string;
  actionType: "button" | "link";
  actionText: string;
}

export default function ServicesPage() {
  const services: ServiceItem[] = [
    {
      id: 1,
      tag: "URGENCE",
      title: "Ouverture de porte",
      description:
        "Intervention rapide en moins de 30 minutes pour portes claquées ou serrures bloquées. Expertise sans dégradation.",
      imageSrc: serrureImg,
      actionType: "button",
      actionText: "Demander un devis",
    },
    {
      id: 2,
      tag: "SÉCURITÉ",
      title: "Remplacement de serrure",
      description:
        "Mise à niveau de votre sécurité avec des cylindres haute performance et des serrures multipoints certifiées A2P.",
      imageSrc: serrure2Img,
      actionType: "link",
      actionText: "En savoir plus",
    },
    {
      id: 3,
      tag: "RENFORCEMENT",
      title: "Blindage de porte",
      description:
        "Renfort de structure et pose de plaques d'acier certifiées.",
      imageSrc: serrure3Img,
      actionType: "button",
      actionText: "Devis gratuit",
    },
    {
      id: 4,
      tag: "PROTECTION",
      title: "Coffre-fort",
      description:
        "Installation de solutions de stockage sécurisées pour vos biens précieux, conformes aux normes d’assurance.",
      imageSrc: serrure5Img,
      actionType: "button",
      actionText: "Consulter un expert",
    },
    {
      id: 5,
      tag: "HABITAT",
      title: "Fenêtres",
      description:
        "Installation de vitrages haute performance pour une isolation thermique et phonique optimale et sécurisée.",
      imageSrc: serrure4Img,
      actionType: "link",
      actionText: "Voir nos vitrages",
    },
    {
      id: 6,
      tag: "AUTOMATISME",
      title: "Volets roulants",
      description:
        "Pose, motorisation et dépannage de volets roulants pour un confort et une sécurité accrus au quotidien.",
      imageSrc: serrure6Img,
      actionType: "button",
      actionText: "Demander une pose",
    },
  ];

  return (
    <LayoutPublic>
      <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen pb-16 md:pb-0">
        {/* --- MAIN CONTENT --- */}
        <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
          {/* Hero Section */}
          <div className="mb-16 md:mb-24">
            <div className="max-w-3xl">
              <h1 className="font-headline-xl text-headline-xl text-primary mb-6">
                Expertise en Serrurerie et Sécurité Haute Performance
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                SOSLock connecte les propriétaires exigeants avec un réseau
                d'artisans certifiés. De l'urgence immédiate à la sécurisation
                globale de vos accès, nous garantissons précision, transparence
                et réactivité.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full font-label-sm text-label-sm text-secondary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  Artisans Certifiés
                </span>
                <span className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full font-label-sm text-label-sm text-secondary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    timer
                  </span>
                  Intervention 24/7
                </span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col rounded-xl border border-outline-variant bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden bg-surface-container flex items-center justify-center">
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={service.imageSrc}
                  />
                </div>
                <div className="p-8 flex flex-col grow">
                  <span className="text-secondary font-label-sm text-label-sm tracking-widest uppercase mb-2">
                    {service.tag}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    {service.actionType === "button" ? (
                      <button
                        className={`w-full px-6 py-3 rounded-lg font-label-md text-label-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                          service.id === 1
                            ? "bg-primary text-on-primary hover:bg-primary-container"
                            : "bg-surface-container-high text-primary hover:bg-surface-variant"
                        }`}
                      >
                        {service.actionText}
                        {service.id === 1 && (
                          <span className="material-symbols-outlined text-sm">
                            arrow_forward
                          </span>
                        )}
                      </button>
                    ) : (
                      <a
                        className="text-secondary font-label-md text-label-md flex items-center justify-center gap-2 hover:underline active:scale-[0.98] transition-transform"
                        href="#"
                      >
                        {service.actionText}
                        <span className="material-symbols-outlined text-sm">
                          {service.id === 2 ? "open_in_new" : "chevron_right"}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Trust Section */}
          <section className="mt-24 bg-primary-container rounded-2xl p-12 text-on-primary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="font-headline-lg text-headline-lg mb-6">
                  Un réseau d'artisans triés sur le volet
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary-container opacity-90">
                  Chaque serrurier SOSLock est rigoureusement audité :
                  vérification des assurances décennales, certifications
                  professionnelles et engagement de transparence tarifaire.
                </p>
                <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-8">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-headline-md text-headline-md text-secondary-fixed">
                      240+
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">
                      Partenaires actifs
                    </span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-headline-md text-headline-md text-secondary-fixed">
                      15 min
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">
                      Délai moyen
                    </span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-headline-md text-headline-md text-secondary-fixed">
                      4.9/5
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">
                      Note clients
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative w-full md:w-1/3 aspect-square max-w-[320px]">
                <div className="absolute inset-0 bg-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full h-full border-4 border-secondary-fixed rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    alt="Artisan Serrurier SOSLock"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3T8MCcn9BNxQCRGRB16ld2J-brnaUv5QWzg5vwTHEyeiM3xNIi4lYK0sUPhbvMiVrx6yOFkYqnwq3jFRCdqCLauEWFw08EqlXSLCpeWLFIeq7ed3WJm5c0J4lobpl8roO-ivM3eH48iNwhRRNE3-OspzLj1s02Ai5A3nfcLJ5_7um3g0gCxKQDIGaXa8CxUb8XMRK92TM6Ok1y47a0FBWibPYj9SXhZv3Z61vLVGWMUUsAq6YDFdxHo54vOk76aNvhkPHcDbQIqU"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </LayoutPublic>
  );
}
