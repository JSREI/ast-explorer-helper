import React from 'react';
import { useTranslation } from 'react-i18next';

const Install: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="install-page">
      <section className="section">
        <div className="container">
          <h1 className="text-center">{t('install.title')}</h1>

          <div className="install-steps">
            <div className="step">
              <h2>1. {t('install.step1.title')}</h2>
              <p>{t('install.step1.description')}</p>
              <div className="browser-options">
                <div className="browser-option">
                  <h3>{t('install.step1.chrome')}</h3>
                  <a
                    href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {t('install.step1.installTampermonkey')}
                  </a>
                </div>
                <div className="browser-option">
                  <h3>{t('install.step1.firefox')}</h3>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {t('install.step1.installGreasemonkey')}
                  </a>
                </div>
              </div>
            </div>

            <div className="step">
              <h2>2. {t('install.step2.title')}</h2>
              <p>{t('install.step2.description')}</p>
              <div className="script-install">
                <a
                  href="https://github.com/JSREI/ast-explorer-helper/raw/main/dist/ast-explorer-helper.user.js"
                  className="btn"
                >
                  {t('install.step2.installScript')}
                </a>
              </div>
              <p className="note">
                {t('install.step2.note')}
                <ol>
                  <li>{t('install.step2.visitRepo')} <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li>{t('install.step2.downloadFile')}</li>
                  <li>{t('install.step2.dragAndDrop')}</li>
                </ol>
              </p>
            </div>

            <div className="step">
              <h2>3. {t('install.step3.title')}</h2>
              <p>{t('install.step3.description')}</p>
              <ol>
                <li>{t('install.step3.visitSite')} <a href="https://astexplorer.net" target="_blank" rel="noopener noreferrer">AST Explorer</a></li>
                <li>{t('install.step3.autoEnable')}</li>
                <li>{t('install.step3.enjoyFeature')}</li>
              </ol>
            </div>

            <div className="step">
              <h2>{t('install.troubleshooting.title')}</h2>
              <p>{t('install.troubleshooting.description')}</p>
              <ul>
                <li>
                  <a href="https://github.com/JSREI/ast-explorer-helper/issues" target="_blank" rel="noopener noreferrer">
                    {t('install.troubleshooting.submitIssue')}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer">
                    {t('install.troubleshooting.viewSource')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Install; 