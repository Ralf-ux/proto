import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Removed features and stats sections as requested

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      {/* Hero Section - Dynamic with background logo */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-32 px-4 overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center">
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
            className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-red-600 blur-3xl animate-pulse" 
            style={{ animationDuration: '4s' }} 
          />
          <div 
            className="absolute bottom-10 sm:bottom-20 -right-10 sm:-right-20 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-red-500 blur-3xl animate-pulse" 
            style={{ animationDuration: '5s', animationDelay: '1s' }} 
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center sm:text-left">
            {/* Main Content */}
            <div className="mb-8 sm:mb-12 animate-fade-up">
              <div className="inline-block mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                  <Lock className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                  <span className="text-red-400 font-semibold tracking-wide uppercase text-xs sm:text-sm">{t('index.professionalSecurity')}</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-none tracking-tight">
                <span className="block">IAI</span>
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">PROTOCOLE</span>
              </h1>
              
              <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-transparent mb-6 sm:mb-8 rounded-full mx-auto sm:mx-0" />
            </div>

            {/* Subtitle with glass morphism */}
            <div className="mb-8 sm:mb-12 animate-fade-up backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto sm:mx-0" style={{ animationDelay: "0.2s" }}>
              <p className="font-body text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
                {t('index.heroSubtitle')} {" "}
                <span className="font-bold text-red-400">{t('index.heroHighlight')}</span>{" "}
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 group border-2 border-red-500/50"
                onClick={() => setIsModalOpen(true)}
              >
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
                {t('index.registerNow')}
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 backdrop-blur-sm px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl font-semibold transition-all duration-300 hover:border-red-400 hover:text-red-300"
                asChild
              >
                <a href="/about" className="flex items-center justify-center gap-3">
                  <Globe className="w-5 sm:w-6 h-5 sm:h-6" />
                  {t('index.learnMore')}
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-center justify-center sm:justify-start opacity-80 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                <span className="text-sm font-medium">{t('index.certifiedAgents')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                <span className="text-sm font-medium">{t('index.protection247')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                <span className="text-sm font-medium">{t('index.trustedCameroon')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </section>



      {/* Final CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t('index.ctaTitle').replace('Register', '')}<span className="text-red-400">Register</span>?
          </h2>
          <p className="font-body text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('index.ctaSubtitle')}
          </p>

          <Button
            size="lg"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold shadow-glow transition-all duration-300 group"
            onClick={() => setIsModalOpen(true)}
          >
            <Shield className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
            {t('index.registerNow')}
            <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
