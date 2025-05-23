/**
 * DOM 操作相关的工具函数
 */

import { logger } from '../logger';

/**
 * 自定义类型，扩展HTMLElement
 */
interface ContextMenuElement extends HTMLElement {
    targetNode?: HTMLElement;
}

/**
 * 使节点内容可选
 * @param doneKey 标记属性名
 */
export async function setSelectable(doneKey: string = "cc11001100_select_enable"): Promise<void> {
    const elements = document.querySelectorAll<HTMLElement>(".tree-visualization > ul *");
    let newElementsCount = 0;

    elements.forEach(element => {
        if (element.getAttribute(doneKey)) {
            return;
        }
        element.style.cssText = "; user-select: text !important; -webkit-user-select: text !important; ";
        element.setAttribute(doneKey, "true");
        
        // 添加右键菜单事件
        element.addEventListener('contextmenu', handleRightClick);
        
        newElementsCount++;
    });

    if (newElementsCount > 0) {
        logger.debug(`处理了 ${newElementsCount} 个新节点，使其内容可选`);
    }
}

/**
 * 处理右键点击事件
 * @param e 鼠标事件
 */
export function handleRightClick(this: HTMLElement, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    
    const menu = document.getElementById("ast-context-menu") as ContextMenuElement | null;
    if (!menu) {
        logger.warn('未找到右键菜单元素');
        return;
    }
    
    // 保存当前目标节点
    menu.targetNode = this;
    
    // 设置菜单位置
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.display = 'block';

    logger.debug('显示右键菜单，目标节点:', this.tagName, this.textContent?.trim().substring(0, 30));
}

/**
 * 延迟函数
 * @param mils 延迟毫秒数
 */
export async function sleep(mils: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, mils));
} 