import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.languageButton} ${i18n.language === 'zh' ? styles.active : ''}`}
        onClick={() => changeLanguage('zh')}
      >
        {t('language.zh')}
      </button>
      <span className={styles.divider}>|</span>
      <button
        className={`${styles.languageButton} ${i18n.language === 'en' ? styles.active : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 