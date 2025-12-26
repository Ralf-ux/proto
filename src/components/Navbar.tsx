import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  onRegisterClick: () => void;
}

const Navbar = ({ onRegisterClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/src/assets/proto.jpg" 
              alt="IAI PROTOCOLE" 
              className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300 shadow-soft"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-800 leading-none">IAI</span>
              <span className="font-display font-bold text-sm text-red-600 leading-none">PROTOCOLE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-body font-medium transition-colors duration-200 ${
                isActive("/") ? "text-red-600" : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`font-body font-medium transition-colors duration-200 ${
                isActive("/about") ? "text-red-600" : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {t('nav.about')}
            </Link>
            <LanguageSwitcher />
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-soft hover:shadow-elevated transition-all duration-300"
              onClick={onRegisterClick}
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-body font-medium py-2 transition-colors duration-200 ${
                  isActive("/") ? "text-red-600" : "text-slate-600"
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`font-body font-medium py-2 transition-colors duration-200 ${
                  isActive("/about") ? "text-red-600" : "text-slate-600"
                }`}
              >
                {t('nav.about')}
              </Link>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-soft hover:shadow-elevated transition-all duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  onRegisterClick();
                }}
              >
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
