import Image from "next/image";
import SideNav from "@/components/Siderbar";
import Header from "@/components/Navbar";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/landing/Hero";
import OurFeatureSection from "@/components/landing/Features";
import FooterSection from "@/components/landing/Footer";
import SupportOurPartnerSection from "@/components/landing/ProductDescription";

export default function Home() {
  return (
    <main className="relative">
    <NavBar />
    <div className="mx-4 md:mx-[3.25rem] pt-32 lg:pt-16">
      <HeroSection />

      <div className=" hidden md:block md:absolute top-0 left-0 -z-10">
        <img src="/images/top_left_gradient.png" alt="top left gradient" />
      </div>
      <div className="absolute hidden md:block top-0 right-0 -z-10">
        <img src="/images/top_right_gradient.png" alt="top right gradient" />
      </div>
    </div>

    <section>
       <SupportOurPartnerSection/>
    </section>
    <div className="mx-4 md:mx-[3.25rem]">
      <OurFeatureSection />
    </div>

    <FooterSection />
  </main>
  );
}
