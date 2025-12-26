import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Users, ArrowRight } from "lucide-react";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const values = [
    {
      icon: Shield,
      title: "Our Mission",
      description:
        "To provide professional security services that ensure the safety and protection of school resident representative of IAI Cameroon.",
    },
    {
      icon: Eye,
      title: "Our MOTO",
      description:
        " PROTOCOLE CHARISM",
    },
    {
      icon: Users,
      title: "Our Values",
      description:
        "Integrity, vigilance, professionalism, and dedication guide our security operations. We believe in protecting what matters most.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-32 px-4 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/proto.jpg')`,
            backgroundPosition: 'center 60%',
          }}
        />
        
        {/* Gradient Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-red-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold tracking-wide uppercase text-sm">About Us</span>
              </div>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight animate-fade-up">
              About <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">IAI PROTOCOLE</span>
            </h1>
            
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                Professional security services dedicated to protecting{" "}
                <span className="font-bold text-red-400"> IAI CAMEROON Resident Representative</span>{" "}.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft border border-slate-200">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-body text-slate-600">
                <p>
                  IAI PROTOCOLE was established to address the growing need for professional security services in Cameroon's educational sector. We specialize in providing comprehensive protection for school resident representatives, ensuring their safety and peace of mind.
                </p>
                <p>
                  Our team consists of highly trained security professionals with extensive experience in protection services. We understand the unique challenges faced by educational institutions and provide tailored security solutions that meet their specific needs.
                </p>
                <p>
                  Today, we are recognized as a trusted security partner for schools across Cameroon, maintaining the highest standards of professionalism and reliability in all our operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-red-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-8 shadow-soft text-center animate-fade-up border border-slate-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-800 mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-slate-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Services
            </h2>
            <p className="font-body text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive security solutions tailored for educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Resident Representative Protection",
                description: "24/7 security coverage for school resident representatives"
              },
              {
                title: "Campus Security",
                description: "Comprehensive security monitoring and patrol services"
              },
              {
                title: "Emergency Response",
                description: "Rapid response protocols for security"
              },

            ].map((service, index) => (
              <div
                key={service.title}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-display text-xl font-semibold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            IAI PROTOCOLE
          </h2>
          <p className="font-body text-slate-300 mb-8 max-w-xl mx-auto">
          IAI PROTOCOLE .
          </p>
          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-elevated transition-all duration-300 group"
            onClick={() => setIsModalOpen(true)}
          >
            <Shield className="w-5 h-5 mr-2" />
            Register Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default About;
