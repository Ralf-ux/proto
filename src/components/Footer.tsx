import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-none">IAI</span>
                <span className="font-display font-bold text-sm text-red-400 leading-none">PROTOCOLE</span>
              </div>
            </div>
            <p className="text-slate-300 font-body text-sm">
              IAI PROTOCOLE
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-slate-300 font-body text-sm">
              <li>info@iaiprotocole.com</li>
              <li>+1 (555) 987-6543</li>
              <li>456 Security Boulevard</li>
              <li>
                <Link 
                  to="/records" 
                  className="text-slate-300 hover:text-white transition-colors underline"
                >
                  Admin Records
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 font-body text-sm">
            © {new Date().getFullYear()} IAI PROTOCOLE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
