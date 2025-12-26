import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import PawaPayment from "@/components/PawaPayment";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Smartphone, CheckCircle2, ArrowLeft } from "lucide-react";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  photo: File | null;
  agreeToTerms: boolean;
}

const Payment = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Registration fee in XAF (Central African CFA Franc)
  const REGISTRATION_FEE = 1200; // 1,200 XAF (~$2 USD)

  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      setRegistrationData(JSON.parse(storedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getSelectedGender = () => {
    if (!registrationData) return "";
    return registrationData.gender.charAt(0).toUpperCase() + registrationData.gender.slice(1);
  };

  const handlePaymentSuccess = () => {
    setIsComplete(true);
    localStorage.removeItem("registrationData");
    
    toast({
      title: "Payment Successful!",
      description: "Your registration has been completed successfully.",
    });
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };



  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onRegisterClick={() => setIsModalOpen(true)} />

        {/* Success Hero Section */}
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
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-8 animate-scale-in shadow-2xl">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight animate-fade-up">
                Registration <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">Complete!</span>
              </h1>
              
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <p className="font-body text-xl text-white/90 leading-relaxed">
                  Thank you for registering with IAI PROTOCOLE. You will receive a confirmation email shortly with further instructions.
                </p>
              </div>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-xl font-bold shadow-2xl transition-all duration-300 animate-fade-up"
                onClick={() => navigate("/")} 
                style={{ animationDelay: "0.2s" }}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/proto.jpg')`,
            backgroundPosition: 'center 60%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-red-900/85" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight">
              Complete Your <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">Registration</span>
            </h1>
            
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="font-body text-lg text-white/90 leading-relaxed">
                Secure your registration with IAI PROTOCOLE professional security services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="bg-card rounded-2xl p-8 shadow-soft h-fit">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Registration Summary
                </h2>

                {registrationData && (
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Name</span>
                      <span className="font-body font-medium text-foreground">{registrationData.firstName} {registrationData.lastName}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Email</span>
                      <span className="font-body font-medium text-foreground">{registrationData.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Phone</span>
                      <span className="font-body font-medium text-foreground">{registrationData.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Date of Birth</span>
                      <span className="font-body font-medium text-foreground">{registrationData.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Gender</span>
                      <span className="font-body font-medium text-foreground">{getSelectedGender()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-body text-muted-foreground">Nationality</span>
                      <span className="font-body font-medium text-foreground">{registrationData.nationality || 'Not specified'}</span>
                    </div>
                  </div>
                )}

                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-semibold text-slate-800">Registration Fee</span>
                    <span className="font-display text-2xl font-bold text-red-600">{REGISTRATION_FEE.toLocaleString()} XAF</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Pay securely with Mobile Money
                  </p>
                </div>
              </div>

              {/* PawaPay Mobile Money Payment */}
              <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-800">
                    Mobile Money Payment
                  </h2>
                </div>

                <PawaPayment
                  amount={REGISTRATION_FEE}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Payment;
