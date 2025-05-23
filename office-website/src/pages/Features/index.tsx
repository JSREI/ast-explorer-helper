import React from 'react';
import { useTranslation } from 'react-i18next';

const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="features-page">
      <section className="section">
        <div className="container">
          <h1 className="text-center">{t('featuresPage.title')}</h1>
          
          <div className="feature-detail">
            <h2>{t('featuresPage.textSelection.title')}</h2>
            <div className="feature-content">
              <div className="feature-description">
                <h3>{t('featuresPage.textSelection.subtitle')}</h3>
                <p>{t('featuresPage.textSelection.description')}</p>
                
                <h3>{t('featuresPage.textSelection.useCases')}</h3>
                <ul>
                  {(t('featuresPage.textSelection.useCasesItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <h2>{t('featuresPage.contextMenu.title')}</h2>
            <div className="feature-content">
              <div className="feature-description">
                <h3>{t('featuresPage.contextMenu.subtitle')}</h3>
                <p>{t('featuresPage.contextMenu.description')}</p>
                
                <h3>{t('featuresPage.contextMenu.usageTitle')}</h3>
                <ol>
                  {(t('featuresPage.contextMenu.usageSteps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <h2>{t('featuresPage.comingSoon.title')}</h2>
            <div className="feature-content">
              <div className="feature-description">
                <p>{t('featuresPage.comingSoon.description')}</p>
                <ul>
                  {(t('featuresPage.comingSoon.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features; 