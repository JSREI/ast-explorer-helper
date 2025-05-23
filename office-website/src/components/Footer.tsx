import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} AST Explorer 助手. 基于{' '}
            <a href="https://github.com/JSREI/typescript-userscript-template" target="_blank" rel="noopener noreferrer">
              TypeScript UserScript Template
            </a>{' '}
            开发
          </p>
          <p>
            <a href="https://github.com/JSREI/ast-explorer-helper/issues" target="_blank" rel="noopener noreferrer">
              问题反馈
            </a>
            {' | '}
            <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 