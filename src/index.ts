/**
 * AST Explorer助手 - 主入口文件
 * 
 * 用于分析ast时辅助提高效率，支持复制和右键菜单，以及元素高亮
 * @author CC11001100
 */

import { setSelectable, sleep } from './utils/dom';
import { createContextMenu, setupKeyboardShortcuts } from './components/ContextMenu';

/**
 * 主函数，用于初始化和运行脚本
 */
async function main(): Promise<void> {
    'use strict';

    //上面的工具条相关的设置，设置完一次就保存了用不到了，但是经常会鼠标误触发，于是就隐藏掉它，顺带增大了视窗大小...
    // 如果下次需要修改的话关闭此油猴脚本，刷新页面重新设置，设置好打开油猴脚本继续隐藏就可以了
    const toolbar = document.getElementById("Toolbar");
    if (toolbar) {
        toolbar.remove();
    }

    // 创建右键菜单
    createContextMenu();
    
    // 设置键盘快捷键
    setupKeyboardShortcuts();
    
    // 定期更新可选择性和右键菜单
    while (true) {
        await setSelectable();
        await sleep(300);
    }
}

// 运行主函数
main().catch(error => console.error("AST Explorer助手运行出错:", error)); 