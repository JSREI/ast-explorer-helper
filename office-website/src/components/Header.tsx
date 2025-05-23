import React, { useEffect, useState } from 'react';

const GITHUB_REPO = 'JSREI/ast-explorer-helper';
const STAR_KEY = 'github_star_count';
const STAR_TIME_KEY = 'github_star_time';

const Header: React.FC<{ activeSection?: string }> = ({ activeSection }) => {
  const [star, setStar] = useState<number | null>(null);

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

  return (
    <header className="header">
      <div className="container">
        <nav>
          <a href="#home" className="logo">
            🎯 AST Explorer 助手
          </a>
          <div className="nav-links">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>首页</a>
            <a href="#features" className={activeSection === 'features' ? 'active' : ''}>功能</a>
            <a href="#install" className={activeSection === 'install' ? 'active' : ''}>安装</a>
            <a href="#community" className={activeSection === 'community' ? 'active' : ''}>交流群</a>
          </div>
          <a
            className="github-badge"
            href="https://github.com/JSREI/ast-explorer-helper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" style={{ verticalAlign: 'middle' }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64
                -.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18
                1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56
                .82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19
                0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span className="star-count">{star !== null ? star : '--'}</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header; 