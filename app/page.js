import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/sections/HeroSection";
import WhyUsSection from "@/app/components/sections/WhyUsSection";
import Accreditationsection from "@/app/components/sections/Accreditationsection";
import ComparisonSection from "@/app/components/sections/ComparisonSection";
import Reviewssection from "@/app/components/sections/Reviewssection";
import Programssection from "@/app/components/sections/Programssection";
import UniversityPathSection from "@/app/components/sections/UniversityPathSection";
import Graduationsection from "@/app/components/sections/Graduationsection";
import SchoolAppSection from "@/app/components/sections/SchoolAppSection";
import FAQSection from "@/app/components/sections/FAQSection";
import CTASection from "@/app/components/sections/CTASection";
import AdmissionProcess from "@/app/components/sections/AdmissionProcess";
import RequirementsSection from "@/app/components/sections/RequirementsSection";
import ExperienceSection from "@/app/components/sections/ExperienceSection";
import FeeStructureSection from "@/app/components/sections/FeeStructureSection";
import FAQSection1 from "@/app/components/sections/FAQSection1";
import AdmissionForm from "@/app/components/sections/AdmissionForm";
import IdeaLoom from "@/app/components/sections/IdeaLoom";
import SuccessStories from "@/app/components/sections/SuccessStories";
import Footer from "./components/Footer";


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
        {/* <RequirementsSection />
        <ExperienceSection />
        <FeeStructureSection />
        <FAQSection1 />
        <AdmissionForm /> */}



        {/* <WhyUsSection /> */}
        
        {/* <ComparisonSection /> */}
        
        {/* <Programssection /> */}
        {/* <UniversityPathSection /> */}
        
        {/* <SchoolAppSection /> */}
        <FAQSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </>
  );
}

