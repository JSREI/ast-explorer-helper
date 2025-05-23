import React, { useEffect, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GoogleAnalytics from './components/GoogleAnalytics';

const SECTION_IDS = ['home', 'features', 'install', 'community'];

// 添加一个loading组件
const Loading = () => {
  return <div className="app-loading">Loading...</div>;
};

// 设置一个包装组件，确保i18n已加载
const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { t, i18n, ready } = useTranslation();

  useEffect(() => {
    if (ready) {
      console.log('i18n is ready in App component');
      console.log('Current language:', i18n.language);
      console.log('Sample translation:', t('title'));
    }
  }, [ready, i18n, t]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          if (scrollY >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return (
    <div className="app">
      <GoogleAnalytics />
      <Header activeSection={activeSection} />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppContent />
    </Suspense>
  );
};

export default App; 