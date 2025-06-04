# AST Explorer 助手 🎯

[English](./README_EN.md) | 简体中文

一个简单实用的浏览器插件，用于增强 [AST Explorer](https://astexplorer.net/) 网站的使用体验。

[![GitHub stars](https://img.shields.io/github/stars/JSREI/ast-explorer-helper?style=flat-square)](https://github.com/JSREI/ast-explorer-helper/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/JSREI/ast-explorer-helper?style=flat-square)](https://github.com/JSREI/ast-explorer-helper/network)
[![GitHub license](https://img.shields.io/github/license/JSREI/ast-explorer-helper?style=flat-square)](https://github.com/JSREI/ast-explorer-helper/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/JSREI/ast-explorer-helper?style=flat-square)](https://github.com/JSREI/ast-explorer-helper/issues)
[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-安装脚本-brightgreen?style=flat-square)](https://greasyfork.org/zh-CN/scripts/419783-ast-explorer助手)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![油猴](https://img.shields.io/badge/油猴-Tampermonkey-orange?style=flat-square)](https://www.tampermonkey.net/)

🌐 [官方网站](https://jsrei.github.io/ast-explorer-helper/) | [Greasy Fork](https://greasyfork.org/zh-CN/scripts/419783-ast-explorer助手) | [GitHub](https://github.com/JSREI/ast-explorer-helper)

## ✨ 主要功能

### 隐藏工具栏

能够隐藏工具栏，增加用户视图空间，提供更舒适的代码分析体验。

<p align="center">
  <img src="./.README_images/hide-tools-demo.gif" alt="隐藏工具栏演示" width="80%">
</p>

### 右键复制

支持通过右键菜单快速复制节点内容，操作简单直观，保留原始格式。

<p align="center">
  <img src="./.README_images/copy-demo.gif" alt="右键复制演示" width="80%">
</p>

## 🛠️ 技术实现

- **TypeScript**: 提供类型安全的代码实现
- **油猴脚本**: 实现浏览器端的功能注入
- **模块化设计**: 清晰的代码结构，便于维护和扩展

## 📦 安装方法

### 方式一：从油猴商店安装（推荐）

1. 首先安装油猴插件
   - Chrome/Edge用户: 安装 [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox用户: 安装 [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

2. 安装本用户脚本
   - 点击 [这里](https://greasyfork.org/zh-CN/scripts/419783-ast-explorer助手) 安装脚本

### 方式二：自行编译安装

1. 克隆仓库
```bash
git clone https://github.com/JSREI/ast-explorer-helper.git
```

2. 安装依赖
```bash
npm install
```

3. 构建项目
```bash
npm run build
```

4. 在dist目录找到`ast-explorer-helper.user.js`文件，将其拖拽到油猴插件管理页面中安装

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

## 👨‍💻 贡献者

感谢以下用户帮助我们不断完善产品：

<p align="center">
  <a href="https://github.com/mazp99" target="_blank">
    <img src="https://github.com/mazp99.png" width="100px" alt="mazp99" style="border-radius: 50%;"><br>
    <sub>mazp99</sub>
  </a>
</p>

## 💬 逆向技术交流群

### 微信

扫码加入逆向技术微信交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png" style="width: 200px">

如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png" style="width: 200px">

### QQ

[点此](https://qm.qq.com/q/YfdB3w3OEY)扫码加入QQ交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg" style="width: 200px">

### TG 

[点此](https://t.me/jsreijsrei)或扫码加入TG交流群：

<img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png" style="width: 200px">



## 📈 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=JSREI/ast-explorer-helper&type=Date)](https://star-history.com/#JSREI/ast-explorer-helper&Date)