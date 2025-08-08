import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] ">
            {/* Outra possibilidade de background: #F5FAFE, #F7F9FC e #F4F6F8  */}

      <Header />
      <Hero />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Index;
