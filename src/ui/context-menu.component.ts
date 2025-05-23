/**
 * 右键菜单组件
 */

import { copyToClipboard } from '../clipboard/clipboard.service';
import { logger } from '../logger';
import { treeExpander } from './tree-expander.service';

// 自定义类型，扩展HTMLElement
interface ContextMenuElement extends HTMLElement {
    targetNode?: HTMLElement;
}

/**
 * 递归展开指定节点下的所有子节点
 * @param node 要展开的节点
 */
export function expandAllNodes(node: HTMLElement): void {
    // 首先找到包含当前节点的可折叠节点
    let targetNode = node;
    while (targetNode && !targetNode.classList.contains('entry')) {
        targetNode = targetNode.parentElement as HTMLElement;
    }
    
    if (!targetNode) {
        logger.info('未找到可折叠节点');
        return;
    }
    
    logger.info('找到可折叠节点:', {
        tagName: targetNode.tagName,
        className: targetNode.className,
        textContent: targetNode.textContent?.substring(0, 50)
    });
    
    // 递归展开节点的函数
    function expandNodes(currentNode: HTMLElement) {
        // 如果当前节点未展开，先展开它
        if (!currentNode.classList.contains('open')) {
            const expandIcon = currentNode.querySelector('.disclosure-arrow') || 
                             currentNode.querySelector('.arrow') || 
                             currentNode.querySelector('[class*="arrow"]');
            
            if (expandIcon && expandIcon instanceof HTMLElement) {
                logger.info('点击展开节点:', currentNode.textContent?.substring(0, 50));
                expandIcon.click();
            }
        }
        
        // 等待一小段时间让DOM更新
        setTimeout(() => {
            // 查找所有未展开的子节点
            const childNodes = Array.from(currentNode.querySelectorAll('.entry:not(.open)'));
            
            if (childNodes.length > 0) {
                logger.info(`找到 ${childNodes.length} 个未展开的子节点`);
                // 递归展开每个子节点
                childNodes.forEach((child, index) => {
                    setTimeout(() => {
                        expandNodes(child as HTMLElement);
                    }, index * 50); // 每个节点间隔 50ms 展开，避免一次性点击太多
                });
            }
        }, 100);
    }
    
    // 开始递归展开
    expandNodes(targetNode);
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
            <div class="menu-item" data-action="copy">复制</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHtml);
    
    // 添加菜单样式
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
    `;
    document.head.appendChild(style);

    // 点击其他地方隐藏菜单
    document.addEventListener('click', function(e: MouseEvent) {
        const menu = document.getElementById('ast-context-menu') as ContextMenuElement | null;
        if (menu && menu.style.display === 'block') {
            menu.style.display = 'none';
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
            
            // 添加日志记录用户选择的菜单项
            logger.debug('用户选择了菜单项:', action);
            
            switch(action) {
                case 'copy':
                    // 复制纯文本内容
                    const content = targetNode.textContent?.trim() || '';
                    logger.debug('复制内容:', content.substring(0, 50) + (content.length > 50 ? '...' : ''));
                    copyToClipboard(content);
                    break;
            }
            
            this.style.display = 'none';
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
            }
        }
    });
} 