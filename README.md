# AST Explorer 助手

一个用于增强 [AST Explorer](https://astexplorer.net/) 网站体验的用户脚本工具。

## 功能特点

- **可选择文本**：使AST节点名称可复制，方便在分析时引用节点名称
- **自定义右键菜单**：提供节点操作的便捷菜单
  - 复制内容：复制节点的纯文本内容
  - 复制节点类型：复制节点的类型名称
  - 复制路径：复制节点的完整路径
  - 复制完整内容：复制包含子节点的所有内容
- **元素高亮**：
  - 鼠标悬停时浅色高亮
  - 右键点击时明显高亮
- **增大视图**：隐藏上方工具栏，提供更大的可视区域

## 开发技术

- TypeScript
- Webpack
- 油猴脚本 (Tampermonkey/Greasemonkey)

## 安装与使用

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
2. 点击 [这里](#) 安装脚本
3. 访问 [AST Explorer](https://astexplorer.net/) 网站，即可自动启用扩展功能

## 开发

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run watch
```

### 构建生产版本

```bash
npm run build
```

## 许可证

MIT

## 致谢

本项目基于 [TypeScript UserScript Template](https://github.com/JSREI/typescript-userscript-template) 构建，采用了该模板仓库的TypeScript和Webpack配置。该模板提供了模块化开发油猴脚本的最佳实践，使我们能够更高效地开发和维护这个项目。


