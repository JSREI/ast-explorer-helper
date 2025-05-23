import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // 只在组件第一次挂载时发送页面浏览事件
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title
      });
    }
  }, []);

  return null;
};

export default GoogleAnalytics; 