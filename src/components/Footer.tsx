import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

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
              {t('footer.brand')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-white transition-colors font-body text-sm">
                  {t('nav.services')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-slate-300 font-body text-sm">
              <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
              <li>{t('footer.address')}</li>
              <li>
                <Link
                  to="/records"
                  className="text-slate-300 hover:text-white transition-colors underline"
                >
                  {t('footer.adminRecords')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 font-body text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
