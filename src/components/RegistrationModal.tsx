import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User, Mail, Phone, MapPin, Shield, Calendar, Users, CheckCircle, Loader2 } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  nationality: string;
  gender: string;
  class: string;
  agreeToTerms: boolean;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    nationality: "",
    gender: "",
    class: "",
    agreeToTerms: false,
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.firstName.trim()) {
        toast({
          title: "Validation Error",
          description: t('validation.firstName'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.lastName.trim()) {
        toast({
          title: "Validation Error",
          description: t('validation.lastName'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.email.trim() || !formData.email.includes("@")) {
        toast({
          title: "Validation Error",
          description: t('validation.email'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.phone.trim()) {
        toast({
          title: "Validation Error",
          description: t('validation.phone'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
        toast({
          title: "Validation Error",
          description: t('validation.age'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.gender) {
        toast({
          title: "Validation Error",
          description: t('validation.gender'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.class.trim()) {
        toast({
          title: "Validation Error",
          description: t('validation.class'),
          variant: "destructive",
        });
        return;
      }

      if (!formData.agreeToTerms) {
        toast({
          title: "Validation Error",
          description: t('validation.terms'),
          variant: "destructive",
        });
        return;
      }

      // Check if email already exists in Supabase
      const { data: existingUser, error: checkError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', formData.email.toLowerCase())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is what we want
        throw checkError;
      }

      if (existingUser) {
        toast({
          title: "Email Already Registered",
          description: t('validation.emailExists'),
          variant: "destructive",
        });
        return;
      }

      // Save to Supabase
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            email: formData.email.toLowerCase().trim(),
            phone: formData.phone.trim(),
            age: parseInt(formData.age),
            nationality: formData.nationality.trim() || null,
            gender: formData.gender,
            class: formData.class.trim(),
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Also keep localStorage backup for offline functionality
      const existingRecords = JSON.parse(localStorage.getItem("registrationRecords") || "[]");
      const registrationRecord = {
        id: data[0].id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        nationality: formData.nationality,
        gender: formData.gender,
        class: formData.class,
        registrationDate: data[0].created_at,
        checked: false,
      };

      const updatedRecords = [...existingRecords, registrationRecord];
      localStorage.setItem("registrationRecords", JSON.stringify(updatedRecords));

      // Show success popup
      setShowSuccessPopup(true);

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        nationality: "",
        gender: "",
        class: "",
        agreeToTerms: false,
      });

      toast({
        title: "Registration Successful!",
        description: "Your registration has been saved successfully.",
        variant: "default",
      });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    onClose();
  };

  // Success Popup Component
  if (showSuccessPopup) {
    return (
      <Dialog open={true} onOpenChange={handleSuccessClose}>
        <DialogContent className="sm:max-w-md w-[95vw] max-w-[95vw] sm:w-full bg-white border-green-200 animate-scale-in">
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="font-display text-2xl font-bold text-green-800 mb-4">
              {t('registration.success.title')}
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 font-medium mb-2">
                {t('registration.success.message')}
              </p>
              {t('registration.success.description') && (
                <p className="text-green-600 text-sm">
                  {t('registration.success.description')}
                </p>
              )}
            </div>

            {(t('registration.success.step1') || t('registration.success.step2') || t('registration.success.step3')) && (
              <div className="space-y-2 text-sm text-slate-600 mb-6">
                {t('registration.success.step1') && <p>{t('registration.success.step1')}</p>}
                {t('registration.success.step2') && <p>{t('registration.success.step2')}</p>}
                {t('registration.success.step3') && <p>{t('registration.success.step3')}</p>}
              </div>
            )}

            <Button
              onClick={handleSuccessClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              {t('registration.success.continue')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-[95vw] max-w-[95vw] sm:w-full bg-white border-slate-200 animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl sm:text-2xl text-slate-800 flex items-center gap-2">
            <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
            {t('registration.title')}
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm sm:text-base">
            {t('registration.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <User className="w-4 h-4 text-red-600" />
                {t('registration.firstName')} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={t('registration.firstName')}
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                {t('registration.lastName')} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder={t('registration.lastName')}
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <Mail className="w-4 h-4 text-red-600" />
                {t('registration.email')} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
              {formData.email && (
                <p className="text-xs text-slate-500 mt-1">
                  We'll check if this email is already registered
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <Phone className="w-4 h-4 text-red-600" />
                {t('registration.phone')} *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+237 6XX XX XX XX"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <Calendar className="w-4 h-4 text-red-600" />
                {t('registration.age')} *
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="100"
                placeholder={t('registration.age')}
                value={formData.age}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <MapPin className="w-4 h-4 text-red-600" />
                {t('registration.nationality')}
              </Label>
              <Input
                id="nationality"
                name="nationality"
                type="text"
                placeholder="e.g., Cameroonian"
                value={formData.nationality}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
              <Users className="w-4 h-4 text-red-600" />
              {t('registration.gender')} *
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 border-red-600 focus:ring-red-500"
                />
                <Label htmlFor="male" className="text-slate-700 cursor-pointer text-sm sm:text-base">
                  {t('registration.male')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 border-red-600 focus:ring-red-500"
                />
                <Label htmlFor="female" className="text-slate-700 cursor-pointer text-sm sm:text-base">
                  {t('registration.female')}
                </Label>
              </div>
            </div>
          </div>

          {/* Class Field */}
          <div className="space-y-2">
            <Label htmlFor="class" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
              <User className="w-4 h-4 text-red-600" />
              {t('registration.class')} *
            </Label>
            <Input
              id="class"
              name="class"
              type="text"
              placeholder={t('registration.class')}
              value={formData.class}
              onChange={handleInputChange}
              className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3 p-3 sm:p-4 bg-slate-50 rounded-lg">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
              }
              className="border-red-600 data-[state=checked]:bg-red-600 mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="agreeToTerms" className="text-slate-700 cursor-pointer font-medium text-sm sm:text-base">
                {t('terms.agree')} *
              </Label>
              <p className="text-xs sm:text-sm text-slate-600">
                {t('terms.description')}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 text-base sm:text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              t('registration.submit')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
