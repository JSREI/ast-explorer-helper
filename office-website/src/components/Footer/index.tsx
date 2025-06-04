import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/JSREI"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://github.com/JSREI/ast-explorer-helper"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t('footer.projectHome')}
        </a>
      </div>
      <div className={styles.copyright}>
        © {currentYear} AST Explorer 助手。保留所有权利。
      </div>
    </footer>
  );
};

export default Footer; 