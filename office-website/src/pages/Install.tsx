import React from 'react';

const Install: React.FC = () => {
  return (
    <div className="install-page">
      <section className="section">
        <div className="container">
          <h1 className="text-center">安装指南</h1>

          <div className="install-steps">
            <div className="step">
              <h2>1. 安装油猴插件</h2>
              <p>首先，你需要在浏览器中安装油猴插件：</p>
              <div className="browser-options">
                <div className="browser-option">
                  <h3>Chrome/Edge用户</h3>
                  <a
                    href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    安装 Tampermonkey
                  </a>
                </div>
                <div className="browser-option">
                  <h3>Firefox用户</h3>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    安装 Greasemonkey
                  </a>
                </div>
              </div>
            </div>

            <div className="step">
              <h2>2. 安装用户脚本</h2>
              <p>安装完油猴插件后，点击下面的按钮安装AST Explorer助手：</p>
              <div className="script-install">
                <a
                  href="https://github.com/JSREI/ast-explorer-helper/raw/main/dist/ast-explorer-helper.user.js"
                  className="btn"
                >
                  安装脚本
                </a>
              </div>
              <p className="note">
                注：如果按钮无法正常工作，你也可以：
                <ol>
                  <li>访问我们的 <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer">GitHub仓库</a></li>
                  <li>下载 <code>dist/ast-explorer-helper.user.js</code> 文件</li>
                  <li>手动将文件拖拽到油猴插件页面中安装</li>
                </ol>
              </p>
            </div>

            <div className="step">
              <h2>3. 开始使用</h2>
              <p>安装完成后：</p>
              <ol>
                <li>访问 <a href="https://astexplorer.net" target="_blank" rel="noopener noreferrer">AST Explorer</a></li>
                <li>脚本会自动启用</li>
                <li>现在你可以自由地选择和复制AST节点内容了！</li>
              </ol>
            </div>

            <div className="step">
              <h2>遇到问题？</h2>
              <p>如果你在安装或使用过程中遇到任何问题：</p>
              <ul>
                <li>
                  <a href="https://github.com/JSREI/ast-explorer-helper/issues" target="_blank" rel="noopener noreferrer">
                    提交Issue
                  </a>
                </li>
                <li>
                  <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" rel="noopener noreferrer">
                    查看源码
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