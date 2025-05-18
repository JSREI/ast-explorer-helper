/**
 * 右键菜单组件
 */

import { findNodeType, getNodePath, getFullNodeContent } from '../ast-node/node-info.service';
import { copyToClipboard } from '../clipboard/clipboard.service';
import { removeHighlight } from '../dom-helpers/dom-utils';

// 自定义类型，扩展HTMLElement
interface ContextMenuElement extends HTMLElement {
    targetNode?: HTMLElement;
}

// 使用更加淡雅的颜色 - 浅灰色半透明
const highlightColor = "rgba(200, 200, 200, 0.3)";

/**
 * 递归展开指定节点下的所有子节点
 * @param node 要展开的节点
 */
export function expandAllNodes(node: HTMLElement): void {
    // 递归展开节点的函数
    function expandNodes() {
        // 查找所有折叠的节点并展开
        const collapsedElements = node.querySelectorAll('.expandable.collapsed');
        
        // 如果没有折叠的节点，说明全部展开完毕
        if (collapsedElements.length === 0) {
            return;
        }
        
        // 展开找到的所有节点
        let didExpand = false;
        collapsedElements.forEach(elem => {
            // 模拟点击展开图标
            const expandIcon = elem.querySelector('.disclosure-arrow');
            if (expandIcon && expandIcon instanceof HTMLElement) {
                expandIcon.click();
                didExpand = true;
            }
        });
        
        // 如果展开了新节点，等待DOM更新后再次检查
        if (didExpand) {
            // 使用setTimeout给DOM一些时间进行更新
            setTimeout(expandNodes, 50);
        }
    }
    
    // 开始递归展开
    expandNodes();
}

/**
 * 创建自定义右键菜单
 */
export function createContextMenu(): void {
    // 检查菜单是否已经存在
    if (document.getElementById("ast-context-menu")) {
        return;
    }

    // 创建菜单HTML
    const menuHtml = `
        <div id="ast-context-menu" style="display:none; position:fixed; z-index:10000; background:#fff; border:1px solid #ccc; box-shadow:2px 2px 5px rgba(0,0,0,0.3); border-radius:4px; padding:5px 0;">
            <div class="menu-item" data-action="copy-content">复制内容</div>
            <div class="menu-item" data-action="copy-type">复制节点类型</div>
            <div class="menu-item" data-action="copy-path">复制路径</div>
            <div class="menu-item" data-action="copy-full">复制完整内容</div>
            <div class="menu-item" data-action="expand-all">递归展开所有子节点</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHtml);
    
    // 添加菜单和悬停高亮样式
    const style = document.createElement('style');
    style.textContent = `
        #ast-context-menu .menu-item {
            padding: 8px 15px;
            cursor: pointer;
            font-size: 14px;
            min-width: 120px;
        }
        #ast-context-menu .menu-item:hover {
            background: #f0f0f0;
        }
        
        /* 悬停高亮效果 - 使用更淡雅的颜色 */
        .tree-visualization > ul * {
            transition: background-color 0.15s ease;
        }
        
        .tree-visualization > ul *:hover {
            background-color: rgba(200, 200, 200, 0.2) !important;
        }
        
        /* 右键点击高亮效果 */
        .node-highlighted {
            background-color: ${highlightColor} !important;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);

    // 点击其他地方隐藏菜单并取消高亮
    document.addEventListener('click', function(e: MouseEvent) {
        const menu = document.getElementById('ast-context-menu') as ContextMenuElement | null;
        if (menu && menu.style.display === 'block') {
            menu.style.display = 'none';
            // 取消节点高亮
            removeHighlight();
        }
    });
    
    // 处理菜单项点击
    const menuElement = document.getElementById('ast-context-menu') as ContextMenuElement;
    if (menuElement) {
        menuElement.addEventListener('click', function(this: ContextMenuElement, e: MouseEvent) {
            e.stopPropagation();
            
            const target = e.target as HTMLElement;
            const action = target.dataset.action;
            if (!action) return;
            
            const targetNode = this.targetNode;
            if (!targetNode) return;
            
            switch(action) {
                case 'copy-content':
                    // 复制纯文本内容
                    const content = targetNode.textContent?.trim() || '';
                    copyToClipboard(content);
                    break;
                    
                case 'copy-type':
                    // 复制节点类型 - 修复查找方法
                    const type = findNodeType(targetNode);
                    copyToClipboard(type);
                    break;
                    
                case 'copy-path':
                    // 复制节点路径
                    const path = getNodePath(targetNode);
                    copyToClipboard(path);
                    break;
                    
                case 'copy-full':
                    // 复制完整内容（含子节点）
                    const fullContent = getFullNodeContent(targetNode);
                    copyToClipboard(fullContent);
                    break;
                
                case 'expand-all':
                    // 递归展开所有子节点
                    expandAllNodes(targetNode);
                    break;
            }
            
            this.style.display = 'none';
            // 菜单选择后取消高亮
            removeHighlight();
        });
    }
}

/**
 * 为ESC键添加事件监听器
 */
export function setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', function(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            const menu = document.getElementById('ast-context-menu') as ContextMenuElement | null;
            if (menu && menu.style.display === 'block') {
                menu.style.display = 'none';
                removeHighlight();
            }
        }
    });
} 