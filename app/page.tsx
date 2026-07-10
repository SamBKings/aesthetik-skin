import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyKorean from "@/components/WhyKorean";
import AboutUs from "@/components/AboutUs";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAContact from "@/components/CTAContact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#F4EDE4", color: "#1A1A1A" }}>
      <Navbar />
      <Hero />
      <Products />
      <WhyKorean />
      <AboutUs />
      <Certifications />
      <Testimonials />
      <FAQ />
      <CTAContact />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
