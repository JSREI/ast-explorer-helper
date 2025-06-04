import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';
import Monitor from '../../components/Monitor/Monitor';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CodeBlock from '../../components/CodeBlock';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <div className={styles.home}>
      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
            <div className={styles.ctaButtons}>
              <a href="#install" className="btn">
                {t('cta.install')}
              </a>
              <a href="#community" className="btn btn-outline">
                {t('cta.joinCommunity')}
              </a>
              <a
                href="https://github.com/JSREI/ast-explorer-helper"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                {t('cta.viewSource')}
              </a>
            </div>
          </div>
          <div className={styles.heroRight}>
            <Monitor videoUrl="videos/demo.mov" />
          </div>
        </div>
      </section>

      <section className={styles.features} id="features">
        <div className="container">
          <h2 className="text-center">{t('features.title')}</h2>
          <div className={styles.featureColumn}>
            <div className={styles.featureItem}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>🔍</div>
                <h3 className={styles.featureTitle}>
                  {t('features.hideToolbar.title')}
                </h3>
              </div>
              <p className={styles.featureDescription}>
                {t('features.hideToolbar.description')}
              </p>
              <div className={styles.featureDemoWrapper}>
                <img 
                  src="gif/hide-tools-demo.gif" 
                  alt="隐藏工具栏演示" 
                  className={styles.featureDemo}
                  onClick={() => setOpenImage("/gif/hide-tools-demo.gif")}
                />
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>📋</div>
                <h3 className={styles.featureTitle}>
                  {t('features.rightClickCopy.title')}
                </h3>
              </div>
              <p className={styles.featureDescription}>
                {t('features.rightClickCopy.description')}
              </p>
              <div className={styles.featureDemoWrapper}>
                <img 
                  src="gif/copy-demo.gif" 
                  alt="右键复制演示" 
                  className={styles.featureDemo}
                  onClick={() => setOpenImage("/gif/copy-demo.gif")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.install} id="install">
        <div className="container">
          <h2 className="text-center">{t('install.title')}</h2>
          <div className={styles.installSteps}>
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>1</span>
                {t('install.step1.title')}
              </h3>
              <p>{t('install.step1.description')}</p>
              <div className={styles.browserOptions}>
                <div className={styles.browserOption}>
                  <h4>{t('install.step1.chrome')}</h4>
                  <a
                    href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {t('install.step1.installTampermonkey')}
                  </a>
                </div>
                <div className={styles.browserOption}>
                  <h4>{t('install.step1.firefox')}</h4>
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

            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>2</span>
                {t('install.step2.title')}
              </h3>
              <p>{t('install.step2.description')}</p>
              
              <div className={styles.installMethods}>
                {/* 方式一: 从油猴商店安装 */}
                <div className={styles.installMethod}>
                  <h4 className={styles.methodTitle}>{t('install.step2.method1.title')}</h4>
                  <p>{t('install.step2.method1.description')}</p>
                  <div className="text-center">
                    <a
                      href="https://greasyfork.org/zh-CN/scripts/419783-ast-explorer%E5%8A%A9%E6%89%8B"
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('install.step2.method1.installScript')}
                    </a>
                  </div>
                  <div className={styles.methodSteps}>
                    <ol>
                      {(t('install.step2.method1.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                
                {/* 方式二: 自行编译 */}
                <div className={styles.installMethod}>
                  <h4 className={styles.methodTitle}>{t('install.step2.method2.title')}</h4>
                  <p>{t('install.step2.method2.description')}</p>
                  <div className={styles.methodSteps}>
                    <ol>
                      {(t('install.step2.method2.steps', { returnObjects: true }) as Array<{ text: string; code?: string }>).map((step, index) => (
                        <li key={index}>
                          <span>{step.text}</span>
                          {step.code && (
                            <CodeBlock code={step.code} />
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>3</span>
                {t('install.step3.title')}
              </h3>
              <p>{t('install.step3.description')}</p>
              <ol>
                <li>{t('install.step3.visitSite')} <a href="https://astexplorer.net" target="_blank" rel="noopener noreferrer">AST Explorer</a></li>
                <li>{t('install.step3.autoEnable')}</li>
                <li>{t('install.step3.enjoyFeature')}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.community} id="community">
        <div className="container">
          <h2 className="text-center">{t('community.title')}</h2>
          <div className={styles.communityGrid}>
            <div className={styles.communityItem}>
              <h3>{t('community.groups.wechat.name')}</h3>
              <p>{t('community.groups.wechat.description')}</p>
              <div 
                className={styles.qrcode}
                onClick={() => setOpenImage("https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png")}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png"
                  alt={`${t('community.groups.wechat.name')} QR Code`}
                />
              </div>
              <p className="note">
                {t('community.groups.wechat.additionalNote')}
              </p>
              <div 
                className={styles.qrcode}
                onClick={() => setOpenImage("https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png")}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png"
                  alt={`${t('community.groups.wechat.personalQRCode')}`}
                />
              </div>
            </div>

            <div className={styles.communityItem}>
              <h3>{t('community.groups.qq.name')}</h3>
              <p>
                <a href="https://qm.qq.com/q/YfdB3w3OEY" target="_blank" rel="noopener noreferrer">
                  {t('community.groups.qq.clickHere')}
                </a>
                {t('community.groups.qq.scanToJoin')}
              </p>
              <div 
                className={styles.qrcode}
                onClick={() => setOpenImage("https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg")}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg"
                  alt={`${t('community.groups.qq.name')} QR Code`}
                />
              </div>
            </div>

            <div className={styles.communityItem}>
              <h3>{t('community.groups.telegram.name')}</h3>
              <p>
                <a href="https://t.me/jsreijsrei" target="_blank" rel="noopener noreferrer">
                  {t('community.groups.telegram.clickHere')}
                </a>
                {t('community.groups.telegram.scanToJoin')}
              </p>
              <div 
                className={styles.qrcode}
                onClick={() => setOpenImage("https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png")}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png"
                  alt={`${t('community.groups.telegram.name')} QR Code`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {openImage && (
        <Lightbox
          open={!!openImage}
          close={() => setOpenImage(null)}
          slides={[{ src: openImage }]}
        />
      )}
    </div>
  );
};

export default Home; 