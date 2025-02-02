import Feature from "@/components/landingpage/Feature";
import Footer from "@/components/landingpage/Footer";
import HeroSection from "@/components/landingpage/HeroSection";
import HowItWork from "@/components/landingpage/HowItWork";
import Navbar from "@/components/landingpage/Navbar";
import Pricing from "@/components/landingpage/Pricing";

function App() {
  return (
    <div className="min-h-screen bg-black w-full overflow-hidden ">
      <Navbar />
      <HeroSection />
      <Feature />
      <HowItWork />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
