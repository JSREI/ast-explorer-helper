// ==UserScript==
// @name         ast explorer助手
// @namespace    https://github.com/CC11001100/ast-explorer-helper
// @version      0.2
// @description  用于分析ast时辅助提高效率
// @author       CC11001100
// @match        https://astexplorer.net/
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    //上面的工具条相关的设置，设置完一次就保存了用不到了，但是经常会鼠标误触发，于是就隐藏掉它，顺带增大了视窗大小...
    // 如果下次需要修改的话关闭此油猴脚本，刷新页面重新设置，设置好打开油猴脚本继续隐藏就可以了
    document.getElementById("Toolbar").remove();

    // 让节点名称能够复制，鬼才记得那么多名字当然要复制...
    // 网站的设计者有毒吧，为啥要搞成不可复制...
    async function setSelectable() {
        const doneKey = "cc11001100_select_enable";
        document.querySelectorAll(".tree-visualization > ul *").forEach(x => {
            if (x.getAttribute(doneKey)) {
                return;
            }
            x.style = "; user-select: text !important; -webkit-user-select: text !important; ";
            x.setAttribute(doneKey, "true");
        });
    }

    while (true) {
        await setSelectable();
        await sleep(300);
    }

    async function sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

})();