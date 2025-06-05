import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const GITHUB_REPO = 'JSREI/ast-explorer-helper';
const STAR_KEY = 'github_star_count';
const STAR_TIME_KEY = 'github_star_time';

interface HeaderProps {
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }): JSX.Element => {
  const { t } = useTranslation();
  const [star, setStar] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 当菜单打开时禁止页面滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const now = Date.now();
    const cached = localStorage.getItem(STAR_KEY);
    const cachedTime = localStorage.getItem(STAR_TIME_KEY);
    if (cached && cachedTime && now - Number(cachedTime) < 3600 * 1000) {
      setStar(Number(cached));
    } else {
      fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
        .then(res => res.json())
        .then(data => {
          if (typeof data.stargazers_count === 'number') {
            setStar(data.stargazers_count);
            localStorage.setItem(STAR_KEY, String(data.stargazers_count));
            localStorage.setItem(STAR_TIME_KEY, String(now));
          }
        });
    }
  }, []);

  // 关闭菜单的处理函数
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${activeSection === 'scrolled' ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <nav className={styles.nav}>
          <a href="#home" className={styles.logo}>
            <img src="logo.png" alt="AST Explorer Helper" />
            {t('title')}
          </a>
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
            <a
              href="#home"
              className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}
              onClick={handleNavLinkClick}
            >
              {t('nav.home')}
            </a>
            <a
              href="#features"
              className={`${styles.navLink} ${activeSection === 'features' ? styles.active : ''}`}
              onClick={handleNavLinkClick}
            >
              {t('nav.features')}
            </a>
            <a
              href="#install"
              className={`${styles.navLink} ${activeSection === 'install' ? styles.active : ''}`}
              onClick={handleNavLinkClick}
            >
              {t('nav.install')}
            </a>
            <a
              href="#community"
              className={`${styles.navLink} ${activeSection === 'community' ? styles.active : ''}`}
              onClick={handleNavLinkClick}
            >
              {t('nav.community')}
            </a>
          </div>
          <a
            href="https://github.com/JSREI/ast-explorer-helper"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBadge}
          >
            <svg
              className={styles.githubIcon}
              height="20"
              width="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub</span>
            <svg
              className={styles.starIcon}
              height="16"
              width="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            <span>{star !== null ? star : '--'}</span>
          </a>
          <LanguageSwitcher />
          <div 
            className={`${styles.mobileNavToggle} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 