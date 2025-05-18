/**
 * 用于生成开发调试用的用户脚本
 */
const fs = require('fs');
const path = require('path');

// 获取项目根目录的绝对路径
const rootPath = __dirname;

// 读取开发用的脚本头
let devHeader = fs.readFileSync('./userscript-headers-dev.js', 'utf8');

// 替换路径变量
devHeader = devHeader.replace('${path}', rootPath);

// 生成完整的开发用脚本
const fullScript = devHeader;

// 将脚本写入到dist目录
const outputPath = path.join(rootPath, 'dist', 'ast-explorer-helper.dev.user.js');
fs.writeFileSync(outputPath, fullScript, 'utf8');

console.log(`开发脚本已生成: ${outputPath}`);
console.log('请在Tampermonkey中安装此脚本以进行开发调试');
console.log('提示: 在Tampermonkey中启用"允许访问文件URL"选项'); 