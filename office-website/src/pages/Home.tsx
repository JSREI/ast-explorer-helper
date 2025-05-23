import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero section" id="home">
        <div className="container text-center">
          <h1>AST Explorer 助手</h1>
          <p className="subtitle">让 AST 分析更简单、更高效</p>
          <div className="cta-buttons">
            <a href="#install" className="btn">
              立即安装
            </a>
            <a href="#community" className="btn btn-outline">
              加入交流群
            </a>
            <a
              href="https://github.com/JSREI/ast-explorer-helper"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              查看源码
            </a>
          </div>
        </div>
      </section>

      <section className="features section" id="features">
        <div className="container">
          <h2 className="text-center">主要功能</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <h3>🔍 文本选择增强</h3>
              <p>移除默认的选择限制，让节点内容可以自由复制，方便代码分析和文档编写</p>
            </div>
            <div className="feature-item">
              <h3>📋 便捷的右键菜单</h3>
              <p>支持快速复制节点内容，操作简单直观，保留原始格式</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-use section">
        <div className="container">
          <h2 className="text-center">为什么使用 AST Explorer 助手？</h2>
          <div className="reasons">
            <div className="reason">
              <h3>🚀 提升效率</h3>
              <p>告别手动复制的烦恼，让AST分析工作更加高效</p>
            </div>
            <div className="reason">
              <h3>💡 简单易用</h3>
              <p>无需复杂配置，安装即可使用，符合直觉的操作方式</p>
            </div>
            <div className="reason">
              <h3>🛠️ 开源免费</h3>
              <p>完全开源，社区驱动，持续改进</p>
            </div>
          </div>
        </div>
      </section>

      <section className="install section" id="install">
        <div className="container">
          <h2 className="text-center">安装指南</h2>
          <div className="install-steps">
            <div className="step">
              <h3>1. 安装油猴插件</h3>
              <p>首先，你需要在浏览器中安装油猴插件：</p>
              <div className="browser-options">
                <div className="browser-option">
                  <h4>Chrome/Edge用户</h4>
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
                  <h4>Firefox用户</h4>
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
              <h3>2. 安装用户脚本</h3>
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
              <h3>3. 开始使用</h3>
              <p>安装完成后：</p>
              <ol>
                <li>访问 <a href="https://astexplorer.net" target="_blank" rel="noopener noreferrer">AST Explorer</a></li>
                <li>脚本会自动启用</li>
                <li>现在你可以自由地选择和复制AST节点内容了！</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="community section" id="community">
        <div className="container">
          <h2 className="text-center">逆向技术交流群</h2>
          <div className="community-grid">
            <div className="community-item">
              <h3>微信</h3>
              <p>扫码加入逆向技术微信交流群：</p>
              <div className="qrcode">
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png"
                  alt="微信交流群二维码"
                  style={{ width: '200px' }}
                />
              </div>
              <p className="note">
                如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：
              </p>
              <div className="qrcode">
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png"
                  alt="个人微信二维码"
                  style={{ width: '200px' }}
                />
              </div>
            </div>

            <div className="community-item">
              <h3>QQ</h3>
              <p>
                <a href="https://qm.qq.com/q/YfdB3w3OEY" target="_blank" rel="noopener noreferrer">
                  点此
                </a>
                扫码加入QQ交流群：
              </p>
              <div className="qrcode">
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg"
                  alt="QQ交流群二维码"
                  style={{ width: '200px' }}
                />
              </div>
            </div>

            <div className="community-item">
              <h3>TG</h3>
              <p>
                <a href="https://t.me/jsreijsrei" target="_blank" rel="noopener noreferrer">
                  点此
                </a>
                或扫码加入TG交流群：
              </p>
              <div className="qrcode">
                <img
                  src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png"
                  alt="TG交流群二维码"
                  style={{ width: '200px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 