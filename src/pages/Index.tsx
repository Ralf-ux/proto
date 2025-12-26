import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import { 
  Shield, 
  ArrowRight,
  Lock,
  Globe,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Removed features and stats sections as requested

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      {/* Hero Section - Dynamic with background logo */}
      <section className="relative pt-28 pb-32 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/proto.jpg')`,
            backgroundPosition: 'center 60%',
          }}
        />
        
        {/* Gradient Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-red-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Animated accent elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div 
            className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-red-600 blur-3xl animate-pulse" 
            style={{ animationDuration: '4s' }} 
          />
          <div 
            className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-red-500 blur-3xl animate-pulse" 
            style={{ animationDuration: '5s', animationDelay: '1s' }} 
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="mb-12 animate-fade-up">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3">
                  <Lock className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold tracking-wide uppercase text-sm">Professional Security</span>
                </div>
              </div>
              
              <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight">
                <span className="block">IAI</span>
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">PROTOCOLE</span>
              </h1>
              
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-transparent mb-8 rounded-full" />
            </div>

            {/* Subtitle with glass morphism */}
            <div className="mb-12 animate-fade-up backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl" style={{ animationDelay: "0.2s" }}>
              <p className="font-body text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
                Professional security services dedicated to protecting {" "}
                <span className="font-bold text-red-400">IAI CAMEROON Resident Representative</span>{" "}
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-start animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 group border-2 border-red-500/50"
                onClick={() => setIsModalOpen(true)}
              >
                <Shield className="w-6 h-6 mr-3" />
                Register Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 backdrop-blur-sm px-10 py-6 text-xl font-semibold transition-all duration-300 hover:border-red-400 hover:text-red-300"
                asChild
              >
                <a href="/about" className="flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  Learn More
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap gap-8 items-center opacity-80 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium">Certified Agents</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium">24/7 Protection</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium">Trusted in Cameroon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>



      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-red-400">Register</span>?
          </h2>
          <p className="font-body text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Secure your school's resident representative with IAI PROTOCOLE.
          </p>
          
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-bold shadow-glow transition-all duration-300 group"
            onClick={() => setIsModalOpen(true)}
          >
            <Shield className="w-6 h-6 mr-3" />
            Register Now
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
