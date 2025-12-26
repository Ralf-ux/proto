import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm">
        {i18n.language === 'en' ? t('language.french') : t('language.english')}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;