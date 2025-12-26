import { useState } from "react";
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
// Removed Select components as they're no longer needed
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Shield, Calendar, Users, CheckCircle } from "lucide-react";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your first name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.lastName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your last name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid age (1-100)",
        variant: "destructive",
      });
      return;
    }

    if (!formData.gender) {
      toast({
        title: "Validation Error",
        description: "Please select your gender",
        variant: "destructive",
      });
      return;
    }

    if (!formData.class.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your class",
        variant: "destructive",
      });
      return;
    }


    if (!formData.agreeToTerms) {
      toast({
        title: "Validation Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    // Check if email already exists
    const existingRecords = JSON.parse(localStorage.getItem("registrationRecords") || "[]");
    const emailExists = existingRecords.some((record: any) => 
      record.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      toast({
        title: "Email Already Registered",
        description: "This email address is already registered. Please use a different email.",
        variant: "destructive",
      });
      return;
    }

    // Complete registration and store data
    const registrationRecord = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      nationality: formData.nationality,
      gender: formData.gender,
      class: formData.class,
      registrationDate: new Date().toISOString(),
      checked: false,
    };

    // Store in localStorage
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
              Registration Successful!
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 font-medium mb-2">
                Welcome to IAI PROTOCOLE!
              </p>
              <p className="text-green-600 text-sm">
                Your registration has been submitted successfully. Our team will review your application and contact you soon.
              </p>
            </div>

            <div className="space-y-2 text-sm text-slate-600 mb-6">
              <p>✓ Your information has been securely saved</p>
              <p>✓ You will receive a confirmation email shortly</p>
              <p>✓ Our team will contact you within 24-48 hours</p>
            </div>

            <Button 
              onClick={handleSuccessClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              Continue
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
            IAI PROTOCOLE
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm sm:text-base">
            Complete your registration form
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <User className="w-4 h-4 text-red-600" />
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
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
                Email Address *
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
                Phone Number *
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
                Age *
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="100"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
                <MapPin className="w-4 h-4 text-red-600" />
                Nationality
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
              Gender *
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
                  Male
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
                  Female
                </Label>
              </div>
            </div>
          </div>

          {/* Class Field */}
          <div className="space-y-2">
            <Label htmlFor="class" className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base">
              <User className="w-4 h-4 text-red-600" />
              Class *
            </Label>
            <Input
              id="class"
              name="class"
              type="text"
              placeholder="Enter your class"
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
                I agree to the Terms and Conditions *
              </Label>
              <p className="text-xs sm:text-sm text-slate-600">
                By checking this box, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-base sm:text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
            size="lg"
          >
            Submit Registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
