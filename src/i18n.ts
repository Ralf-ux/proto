import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.services": "Services",
      "nav.records": "Admin Records",

      // Footer
      "footer.brand": "IAI PROTOCOLE",
      "footer.quickLinks": "Quick Links",
      "footer.contact": "Contact",
      "footer.email": "info@iaiprotocole.com",
      "footer.phone": "+237 6 12 34 56 78",
      "footer.address": "Yaoundé, Cameroon",
      "footer.adminRecords": "Admin Records",
      "footer.copyright": "© {{year}} IAI PROTOCOLE. All rights reserved.",

      // Registration Modal
      "registration.title": "IAI PROTOCOLE",
      "registration.description": "Complete your registration form",
      "registration.firstName": "First Name",
      "registration.lastName": "Last Name",
      "registration.email": "Email Address",
      "registration.phone": "Phone Number",
      "registration.age": "Age",
      "registration.nationality": "Nationality",
      "registration.gender": "Gender",
      "registration.male": "Male",
      "registration.female": "Female",
      "registration.class": "Class",
      "registration.submit": "Submit Registration",
      "registration.success.title": "Registration Successful!",
      "registration.success.message": "Welcome to IAI PROTOCOLE!",
      "registration.success.description": "Your registration has been submitted successfully. Our team will review your application and contact you soon.",
      "registration.success.step1": "✓ Your information has been securely saved",
      "registration.success.step2": "✓ You will receive a confirmation email shortly",
      "registration.success.step3": "✓ Our team will contact you within 24-48 hours",
      "registration.success.continue": "Continue",

      // Validation
      "validation.firstName": "Please enter your first name",
      "validation.lastName": "Please enter your last name",
      "validation.email": "Please enter a valid email address",
      "validation.phone": "Please enter your phone number",
      "validation.age": "Please enter a valid age (1-100)",
      "validation.gender": "Please select your gender",
      "validation.class": "Please enter your class",
      "validation.terms": "Please agree to the terms and conditions",
      "validation.emailExists": "This email address is already registered. Please use a different email.",

      // Terms
      "terms.agree": "I agree to the Terms and Conditions",
      "terms.description": "By checking this box, you agree to our terms of service and privacy policy.",

      // Records Page
      "records.title": "Registration Records",
      "records.total": "Total Registrations",
      "records.search": "Search records...",
      "records.download": "Download Word",
      "records.noRecords": "No Records Found",
      "records.noRecordsMessage": "No records match your search criteria",
      "records.noRecordsAlt": "No registrations have been submitted yet",
      "records.name": "Name",
      "records.contact": "Contact",
      "records.details": "Details",
      "records.registration": "Registration",
      "records.status": "Status",
      "records.actions": "Actions",
      "records.delete": "Record Deleted",
      "records.deleteMessage": "Registration record has been removed",
      "records.downloadSuccess": "Download Complete",
      "records.downloadSuccessMessage": "Registration records have been downloaded as Word document",
      "records.downloadError": "Download Failed",
      "records.downloadErrorMessage": "Failed to generate Word document. Please try again.",

      // Auth
      "auth.title": "Admin Access Required",
      "auth.description": "Enter the admin password to access registration records",
      "auth.password": "Admin Password",
      "auth.access": "Access Records",
      "auth.granted": "Access Granted",
      "auth.grantedMessage": "Welcome to the admin records panel",
      "auth.denied": "Access Denied",
      "auth.deniedMessage": "Invalid password",

      // Index Page
      "index.professionalSecurity": "Professional Security",
      "index.heroTitle": "IAI PROTOCOLE",
      "index.heroSubtitle": "Professional security services dedicated to protecting",
      "index.heroHighlight": "IAI CAMEROON Resident Representative",
      "index.registerNow": "Register Now",
      "index.learnMore": "Learn More",
      "index.certifiedAgents": "Certified Agents",
      "index.protection247": "24/7 Protection",
      "index.trustedCameroon": "Trusted in Cameroon",
      "index.ctaTitle": "Ready to Register?",
      "index.ctaSubtitle": "Secure your school's resident representative with IAI PROTOCOLE.",

      // About Page
      "about.aboutUs": "About Us",
      "about.ourStory": "Our Story",
      "about.story1": "IAI PROTOCOLE was established to address the growing need for professional security services in Cameroon's educational sector. We specialize in providing comprehensive protection for school resident representatives, ensuring their safety and peace of mind.",
      "about.story2": "Our team consists of highly trained security professionals with extensive experience in protection services. We understand the unique challenges faced by educational institutions and provide tailored security solutions that meet their specific needs.",
      "about.story3": "Today, we are recognized as a trusted security partner for schools across Cameroon, maintaining the highest standards of professionalism and reliability in all our operations.",
      "about.whatDrivesUs": "What Drives Us",
      "about.ourMission": "Our Mission",
      "about.missionDesc": "To provide professional security services that ensure the safety and protection of school resident representative of IAI Cameroon.",
      "about.ourMoto": "Our MOTO",
      "about.motoDesc": "PROTOCOLE CHARISM",
      "about.ourValues": "Our Values",
      "about.valuesDesc": "Integrity, vigilance, professionalism, and dedication guide our security operations. We believe in protecting what matters most.",
      "about.ourServices": "Our Services",
      "about.servicesSubtitle": "Comprehensive security solutions tailored for educational institutions",
      "about.residentProtection": "Resident Representative Protection",
      "about.residentProtectionDesc": "24/7 security coverage for school resident representatives",
      "about.campusSecurity": "Campus Security",
      "about.campusSecurityDesc": "Comprehensive security monitoring and patrol services",
      "about.emergencyResponse": "Emergency Response",
      "about.emergencyResponseDesc": "Rapid response protocols for security",

      // Language
      "language.english": "English",
      "language.french": "Français",
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.services": "Services",
      "nav.records": "Archives Admin",

      // Footer
      "footer.brand": "IAI PROTOCOLE",
      "footer.quickLinks": "Liens Rapides",
      "footer.contact": "Contact",
      "footer.email": "info@iaiprotocole.com",
      "footer.phone": "+237 6 12 34 56 78",
      "footer.address": "Yaoundé, Cameroun",
      "footer.adminRecords": "Archives Admin",
      "footer.copyright": "© {{year}} IAI PROTOCOLE. Tous droits réservés.",

      // Registration Modal
      "registration.title": "IAI PROTOCOLE",
      "registration.description": "Complétez votre formulaire d'inscription",
      "registration.firstName": "Prénom",
      "registration.lastName": "Nom",
      "registration.email": "Adresse Email",
      "registration.phone": "Numéro de Téléphone",
      "registration.age": "Âge",
      "registration.nationality": "Nationalité",
      "registration.gender": "Genre",
      "registration.male": "Homme",
      "registration.female": "Femme",
      "registration.class": "Classe",
      "registration.submit": "Soumettre l'Inscription",
      "registration.success.title": "Inscription Réussie !",
      "registration.success.message": "Bienvenue chez IAI PROTOCOLE !",
      "registration.success.description": "Votre inscription a été soumise avec succès. Notre équipe examinera votre candidature et vous contactera bientôt.",
      "registration.success.step1": "✓ Vos informations ont été sauvegardées en sécurité",
      "registration.success.step2": "✓ Vous recevrez un email de confirmation sous peu",
      "registration.success.step3": "✓ Notre équipe vous contactera dans les 24-48 heures",
      "registration.success.continue": "Continuer",

      // Validation
      "validation.firstName": "Veuillez entrer votre prénom",
      "validation.lastName": "Veuillez entrer votre nom",
      "validation.email": "Veuillez entrer une adresse email valide",
      "validation.phone": "Veuillez entrer votre numéro de téléphone",
      "validation.age": "Veuillez entrer un âge valide (1-100)",
      "validation.gender": "Veuillez sélectionner votre genre",
      "validation.class": "Veuillez entrer votre classe",
      "validation.terms": "Veuillez accepter les termes et conditions",
      "validation.emailExists": "Cette adresse email est déjà enregistrée. Veuillez utiliser une autre email.",

      // Terms
      "terms.agree": "J'accepte les Termes et Conditions",
      "terms.description": "En cochant cette case, vous acceptez nos termes de service et politique de confidentialité.",

      // Records Page
      "records.title": "Archives d'Inscription",
      "records.total": "Total des Inscriptions",
      "records.search": "Rechercher des archives...",
      "records.download": "Télécharger Word",
      "records.noRecords": "Aucune Archive Trouvée",
      "records.noRecordsMessage": "Aucune archive ne correspond à vos critères de recherche",
      "records.noRecordsAlt": "Aucune inscription n'a encore été soumise",
      "records.name": "Nom",
      "records.contact": "Contact",
      "records.details": "Détails",
      "records.registration": "Inscription",
      "records.status": "Statut",
      "records.actions": "Actions",
      "records.delete": "Archive Supprimée",
      "records.deleteMessage": "L'archive d'inscription a été supprimée",
      "records.downloadSuccess": "Téléchargement Terminé",
      "records.downloadSuccessMessage": "Les archives d'inscription ont été téléchargées au format Word",
      "records.downloadError": "Échec du Téléchargement",
      "records.downloadErrorMessage": "Échec de génération du document Word. Veuillez réessayer.",

      // Auth
      "auth.title": "Accès Admin Requis",
      "auth.description": "Entrez le mot de passe admin pour accéder aux archives d'inscription",
      "auth.password": "Mot de Passe Admin",
      "auth.access": "Accéder aux Archives",
      "auth.granted": "Accès Accordé",
      "auth.grantedMessage": "Bienvenue dans le panneau d'administration des archives",
      "auth.denied": "Accès Refusé",
      "auth.deniedMessage": "Mot de passe invalide",

      // Index Page
      "index.professionalSecurity": "Sécurité Professionnelle",
      "index.heroTitle": "IAI PROTOCOLE",
      "index.heroSubtitle": "Services de sécurité professionnels dédiés à la protection du",
      "index.heroHighlight": "Représentant Résident de l'IAI CAMEROUN",
      "index.registerNow": "S'inscrire Maintenant",
      "index.learnMore": "En Savoir Plus",
      "index.certifiedAgents": "Agents Certifiés",
      "index.protection247": "Protection 24/7",
      "index.trustedCameroon": "Fiable au Cameroun",
      "index.ctaTitle": "Prêt à vous inscrire ?",
      "index.ctaSubtitle": "Sécurisez le représentant résident de votre école avec IAI PROTOCOLE.",

      // About Page
      "about.aboutUs": "À Propos",
      "about.ourStory": "Notre Histoire",
      "about.story1": "IAI PROTOCOLE a été créé pour répondre au besoin croissant de services de sécurité professionnels dans le secteur éducatif camerounais. Nous nous spécialisons dans la fourniture d'une protection complète pour les représentants résidents des écoles, assurant leur sécurité et leur tranquillité d'esprit.",
      "about.story2": "Notre équipe se compose de professionnels de la sécurité hautement qualifiés avec une vaste expérience dans les services de protection. Nous comprenons les défis uniques auxquels sont confrontées les institutions éducatives et fournissons des solutions de sécurité sur mesure qui répondent à leurs besoins spécifiques.",
      "about.story3": "Aujourd'hui, nous sommes reconnus comme un partenaire de sécurité de confiance pour les écoles à travers le Cameroun, maintenant les plus hauts standards de professionnalisme et de fiabilité dans toutes nos opérations.",
      "about.whatDrivesUs": "Ce qui nous motive",
      "about.ourMission": "Notre Mission",
      "about.missionDesc": "Fournir des services de sécurité professionnels qui assurent la sécurité et la protection du représentant résident des écoles d'IAI Cameroun.",
      "about.ourMoto": "Notre Devise",
      "about.motoDesc": "PROTOCOLE CHARISM",
      "about.ourValues": "Nos Valeurs",
      "about.valuesDesc": "L'intégrité, la vigilance, le professionnalisme et le dévouement guident nos opérations de sécurité. Nous croyons en la protection de ce qui compte le plus.",
      "about.ourServices": "Nos Services",
      "about.servicesSubtitle": "Solutions de sécurité complètes adaptées aux institutions éducatives",
      "about.residentProtection": "Protection du Représentant Résident",
      "about.residentProtectionDesc": "Couverture de sécurité 24/7 pour les représentants résidents des écoles",
      "about.campusSecurity": "Sécurité du Campus",
      "about.campusSecurityDesc": "Surveillance et services de patrouille de sécurité complets",
      "about.emergencyResponse": "Réponse d'Urgence",
      "about.emergencyResponseDesc": "Protocoles de réponse rapide pour la sécurité",

      // Language
      "language.english": "English",
      "language.french": "Français",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;