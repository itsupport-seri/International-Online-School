import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/sections/HeroSection";
import Footer from "./components/Footer";

// Lazy load components below fold
const IdeaLoom = dynamic(() => import("@/app/components/sections/IdeaLoom"), {
  loading: () => <div className="h-80 bg-white animate-pulse" />,
});

const Accreditationsection = dynamic(() => import("@/app/components/sections/Accreditationsection"), {
  loading: () => <div className="h-80 bg-white animate-pulse" />,
});

const Reviewssection = dynamic(() => import("@/app/components/sections/Reviewssection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const Graduationsection = dynamic(() => import("@/app/components/sections/Graduationsection"), {
  loading: () => <div className="h-80 bg-white animate-pulse" />,
});

const SuccessStories = dynamic(() => import("@/app/components/sections/SuccessStories"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const AdmissionProcess = dynamic(() => import("@/app/components/sections/AdmissionProcess"), {
  loading: () => <div className="h-80 bg-white animate-pulse" />,
});

const FAQSection = dynamic(() => import("@/app/components/sections/FAQSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        <HeroSection />
        <IdeaLoom />
        <Accreditationsection />
        <Reviewssection />
        <Graduationsection />
        <SuccessStories />
        <AdmissionProcess />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

