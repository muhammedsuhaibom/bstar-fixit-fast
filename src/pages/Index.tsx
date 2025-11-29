import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <BookingForm />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
