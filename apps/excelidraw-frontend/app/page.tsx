import Hero from "@/components/Hero";
import HomeButton from "@/components/HomeButton";
import Logo from "@/components/Logo";
import ToolbarHome from "@/components/ToolbarHome";

function App() {
  return (
    <div className="min-h-screen bg-black w-screen">
      <Logo />
      <ToolbarHome />
      <Hero />
      <HomeButton />
    </div>
  );
}

export default App;
