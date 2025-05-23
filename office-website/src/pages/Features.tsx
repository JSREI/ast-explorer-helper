import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="features-page">
      <section className="section">
        <div className="container">
          <h1 className="text-center">功能详情</h1>
          
          <div className="feature-detail">
            <h2>🔍 文本选择增强</h2>
            <div className="feature-content">
              <div className="feature-description">
                <h3>自由选择文本</h3>
                <p>移除AST Explorer默认的文本选择限制，让你可以自由地选择和复制任何节点内容。</p>
                
                <h3>使用场景</h3>
                <ul>
                  <li>复制节点名称用于文档编写</li>
                  <li>提取节点内容进行分析</li>
                  <li>分享特定AST结构给同事</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <h2>📋 便捷的右键菜单</h2>
            <div className="feature-content">
              <div className="feature-description">
                <h3>快速复制</h3>
                <p>通过右键菜单快速复制节点内容，保留原始格式，无需手动选择。</p>
                
                <h3>使用方式</h3>
                <ol>
                  <li>在任意AST节点上右键点击</li>
                  <li>选择"复制"选项</li>
                  <li>节点内容已复制到剪贴板</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <h2>🔮 即将推出</h2>
            <div className="feature-content">
              <div className="feature-description">
                <p>我们正在开发更多实用功能，敬请期待：</p>
                <ul>
                  <li>节点路径复制</li>
                  <li>节点类型快速复制</li>
                  <li>更多自定义选项</li>
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