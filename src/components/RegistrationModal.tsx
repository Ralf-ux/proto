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
import { User, Mail, Phone, MapPin, Shield, Calendar, Users } from "lucide-react";

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
  photo: File | null;
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
    photo: null,
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      photo: file,
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

    if (!formData.photo) {
      toast({
        title: "Validation Error",
        description: "Please upload your photo",
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
      photo: null, // Simplified - no photo storage for now
      photoName: formData.photo ? formData.photo.name : null,
      registrationDate: new Date().toISOString(),
      checked: false,
    };

    // Store in localStorage
    const existingRecords = JSON.parse(localStorage.getItem("registrationRecords") || "[]");
    existingRecords.push(registrationRecord);
    localStorage.setItem("registrationRecords", JSON.stringify(existingRecords));

    toast({
      title: "Registration Successful!",
      description: "Your registration has been submitted successfully. We will contact you soon.",
    });

    // Clear form and close modal
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      nationality: "",
      gender: "",
      photo: null,
      agreeToTerms: false,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white border-slate-200 animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-slate-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            IAI PROTOCOLE
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Complete your registration form
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2 text-slate-700 font-medium">
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
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2 text-slate-700 font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-slate-700 font-medium">
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
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-slate-700 font-medium">
                <Phone className="w-4 h-4 text-red-600" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-slate-700 font-medium">
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
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality" className="flex items-center gap-2 text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-red-600" />
                Nationality
              </Label>
              <Input
                id="nationality"
                name="nationality"
                type="text"
                placeholder="e.g., American, Canadian"
                value={formData.nationality}
                onChange={handleInputChange}
                className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-700 font-medium">
              <Users className="w-4 h-4 text-red-600" />
              Gender *
            </Label>
            <div className="flex flex-wrap gap-6">
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
                <Label htmlFor="male" className="text-slate-700 cursor-pointer">
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
                <Label htmlFor="female" className="text-slate-700 cursor-pointer">
                  Female
                </Label>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="flex items-center gap-2 text-slate-700 font-medium">
              <User className="w-4 h-4 text-red-600" />
              Candidate Photo *
            </Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
              required
            />
            <p className="text-sm text-slate-500">Upload a recent photo (JPG, PNG, max 5MB)</p>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
              }
              className="border-red-600 data-[state=checked]:bg-red-600 mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="agreeToTerms" className="text-slate-700 cursor-pointer font-medium">
                I agree to the Terms and Conditions *
              </Label>
              <p className="text-sm text-slate-600">
                By checking this box, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
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
