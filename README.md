# AST Explorer 助手 🎯

一个简单实用的浏览器插件，用于增强 [AST Explorer](https://astexplorer.net/) 网站的使用体验。

## ✨ 主要功能

### 文本选择增强
- 移除了AST Explorer默认的文本选择限制
- 让节点内容可以自由复制，方便代码分析和文档编写

### 便捷的右键菜单
- 支持快速复制节点内容
- 简单直观的操作方式
- 保留了节点的原始格式

## 🛠️ 技术实现

- **TypeScript**: 提供类型安全的代码实现
- **油猴脚本**: 实现浏览器端的功能注入
- **模块化设计**: 清晰的代码结构，便于维护和扩展

## 📦 安装方法

1. 首先安装油猴插件
   - Chrome/Edge用户: 安装 [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox用户: 安装 [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

2. 安装本用户脚本
   - 点击 [这里](#) 安装脚本（链接待补充）
   - 或手动将构建后的脚本复制到油猴插件中

## 💻 开发指南

### 环境准备
```bash
# 安装依赖
npm install
```

### 开发模式
```bash
# 启动开发服务器，支持热更新
npm run watch
```

### 构建发布版本
```bash
# 生成生产环境代码
npm run build
```

## 📝 开源协议

MIT License

## 🙏 致谢

本项目基于 [TypeScript UserScript Template](https://github.com/JSREI/typescript-userscript-template) 开发，感谢该模板提供的基础开发框架。


