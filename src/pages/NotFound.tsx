import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      {/* 404 Hero Section */}
      <section className="relative pt-28 pb-32 px-4 overflow-hidden min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/proto.jpg')`,
            backgroundPosition: 'center 60%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-red-900/85" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-8xl md:text-9xl font-black text-white mb-6 leading-none tracking-tight animate-fade-up">
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">404</span>
            </h1>
            
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Page Not Found
              </h2>
              <p className="font-body text-lg text-white/90 leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-xl font-bold shadow-2xl transition-all duration-300"
                asChild
              >
                <a href="/" className="flex items-center gap-3">
                  <Home className="w-6 h-6" />
                  Return to Home
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-xl font-semibold transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default NotFound;
