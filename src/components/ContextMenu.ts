/**
 * 右键菜单组件
 */

import { findNodeType, getNodePath, getFullNodeContent } from '../utils/nodeInfo';
import { copyToClipboard } from '../utils/clipboard';
import { removeHighlight } from '../utils/dom';

// 皇家蓝，带透明度
const highlightColor = "rgba(65, 105, 225, 0.2)";

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
        
        /* 悬停高亮效果 */
        .tree-visualization > ul * {
            transition: background-color 0.15s ease;
        }
        
        .tree-visualization > ul *:hover {
            background-color: rgba(65, 105, 225, 0.1) !important;
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