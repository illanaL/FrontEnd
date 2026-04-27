import { ArtisanCTA } from "../features/landing/components/ArtisanCTA";
import { CTA } from "../features/landing/components/CTA";
import { Footer } from "../features/landing/components/Footer";
import { Header } from "../features/landing/components/Header";
import { Hero } from "../features/landing/components/Hero";
import { Services } from "../features/landing/components/Services";
import { Steps } from "../features/landing/components/Steps";

export const PublicPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Steps />
      <Services />
      <ArtisanCTA />
      <CTA />
      <Footer />
    </div>
  );
};
