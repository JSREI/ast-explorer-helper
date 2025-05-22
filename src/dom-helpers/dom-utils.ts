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

        // 添加鼠标悬停高亮事件
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        
        newElementsCount++;
    });

    if (newElementsCount > 0) {
        logger.debug(`处理了 ${newElementsCount} 个新节点，使其内容可选并添加了悬停高亮效果`);
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
    
    // 查找最近的entry元素（实际AST节点）
    const entry = this.closest('.entry');
    if (entry) {
        // 高亮当前节点到根节点的路径
        highlightNodePath(entry as HTMLElement);
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
 * 处理鼠标进入事件 - 高亮节点路径
 */
export function handleMouseEnter(this: HTMLElement, e: MouseEvent): void {
    // 防止事件冒泡，只处理直接悬停的元素
    if (e.target !== this) return;
    
    // 查找最近的entry元素（实际AST节点）
    const entry = this.closest('.entry');
    if (!entry) return;
    
    // 高亮当前节点到根节点的路径
    highlightNodePath(entry as HTMLElement);
}

/**
 * 处理鼠标离开事件 - 移除高亮
 */
export function handleMouseLeave(this: HTMLElement, e: MouseEvent): void {
    // 检查鼠标是否真的离开了元素（而不是移动到子元素）
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (this.contains(relatedTarget)) return;
    
    // 移除高亮
    removeHighlight();
}

/**
 * 当前高亮的节点和父节点
 */
let currentHighlightedNode: HTMLElement | null = null;
let currentHighlightedParents: HTMLElement[] = [];
let currentHighlightedTypeNames: HTMLElement[] = [];

/**
 * 高亮节点的路径（从节点到根）
 * @param node 需要高亮的节点
 */
export function highlightNodePath(node: HTMLElement): void {
    // 先取消之前的高亮
    removeHighlight();
    
    // 获取当前AST节点
    const currentNode = findASTNodeElement(node);
    if (!currentNode) return;
    
    // 保存当前高亮节点
    currentHighlightedNode = currentNode;
    
    // 高亮当前节点的类型名称
    highlightCurrentNodeType(currentNode);
    
    // 构建和高亮从当前节点到根节点的精确路径
    highlightExactPath(currentNode);
    
    logger.debug('节点路径高亮完成:', currentNode.textContent?.substring(0, 30));
}

/**
 * 查找AST节点元素
 * @param node 需要查找的节点
 * @returns AST节点元素或null
 */
function findASTNodeElement(node: HTMLElement): HTMLElement | null {
    // 如果节点已经是AST节点容器，直接返回
    if (node.classList.contains('entry')) {
        return node;
    }
    
    // 否则向上查找最近的AST节点容器
    const entry = node.closest('.entry');
    return entry as HTMLElement || null;
}

/**
 * 高亮当前节点的类型名称
 * @param node 当前节点
 */
function highlightCurrentNodeType(node: HTMLElement): void {
    // 查找节点内部的类型名称元素 - 精确定位
    const tokenNameElement = node.querySelector(':scope > .value > .tokenName');
    if (tokenNameElement && tokenNameElement instanceof HTMLElement) {
        tokenNameElement.classList.add('node-highlighted');
        currentHighlightedTypeNames.push(tokenNameElement);
        logger.debug('高亮当前节点类型:', tokenNameElement.textContent);
    }
}

/**
 * 构建和高亮从当前节点到根节点的精确路径
 * @param currentNode 当前节点
 */
function highlightExactPath(currentNode: HTMLElement): void {
    // 使用数组存储路径节点，确保顺序
    const pathNodes: {node: HTMLElement, parentKey?: HTMLElement}[] = [];
    let current = currentNode;
    
    // 循环向上构建路径直到根节点
    while (current && !current.closest('.tree-visualization')) {
        if (current !== currentNode) {
            // 查找当前节点在其父节点中的关联键
            const parentNode = current.parentElement?.closest('.entry');
            if (parentNode) {
                const keyElement = findExactKeyForNode(current, parentNode as HTMLElement);
                
                // 只记录有效的节点
                pathNodes.push({
                    node: current,
                    parentKey: keyElement || undefined
                });
            } else {
                // 没有父节点，只记录节点本身
                pathNodes.push({node: current});
            }
        }
        
        // 获取下一个父级entry节点
        const parent = current.parentElement?.closest('.entry');
        if (!parent) break;
        
        current = parent as HTMLElement;
    }
    
    // 遍历路径节点进行高亮
    pathNodes.forEach(({node, parentKey}) => {
        // 高亮节点类型名称
        const tokenNameElement = node.querySelector(':scope > .value > .tokenName');
        if (tokenNameElement instanceof HTMLElement) {
            tokenNameElement.classList.add('parent-node-highlight');
            currentHighlightedParents.push(tokenNameElement);
            logger.debug('高亮父节点类型:', tokenNameElement.textContent);
        }
        
        // 高亮关联的键名称（如果存在）
        if (parentKey) {
            const nameElem = parentKey.querySelector('.name');
            if (nameElem instanceof HTMLElement) {
                nameElem.classList.add('parent-node-highlight');
                currentHighlightedParents.push(nameElem);
                logger.debug('高亮属性名:', nameElem.textContent);
            }
        }
    });
}

/**
 * 精确找到特定节点对应的键元素
 * @param node 当前节点
 * @param parentNode 父节点
 * @returns 精确对应的键元素或null
 */
function findExactKeyForNode(node: HTMLElement, parentNode: HTMLElement): HTMLElement | null {
    // 检查是否是数组结构
    const isArray = parentNode.querySelector(':scope > .prefix')?.textContent?.trim() === '[';
    
    if (isArray) {
        // 数组类型，不存在键名
        return null;
    } else {
        // 对象类型，查找精确的键值对
        
        // 步骤1: 检查当前节点是否是父节点的直接子元素中的一个键值对
        const keyValuePairs = Array.from(parentNode.querySelectorAll(':scope > .value-body > .entry'));
        
        // 查找包含目标节点的键值对
        for (const pair of keyValuePairs) {
            // 首先通过值容器确认关联
            const valueContainer = pair.querySelector(':scope > .value') ||
                                  pair.querySelector(':scope > .prefix')?.nextElementSibling;
            
            if (!valueContainer) continue;
            
            // 检查值容器是否包含/等于目标节点
            if (valueContainer.contains(node) || valueContainer === node) {
                const keyElement = pair.querySelector(':scope > .key');
                return keyElement as HTMLElement || null;
            }
        }
        
        // 步骤2: 检查节点是否是直接属性值
        const directValueContainer = parentNode.querySelector(':scope > .value');
        if (directValueContainer && (directValueContainer.contains(node) || directValueContainer === node)) {
            const keyElement = parentNode.querySelector(':scope > .key');
            return keyElement as HTMLElement || null;
        }
    }
    
    return null;
}

/**
 * 移除所有高亮
 */
export function removeHighlight(): void {
    // 移除当前节点的类型名称高亮
    currentHighlightedTypeNames.forEach(element => {
        element.classList.remove('node-highlighted');
    });
    currentHighlightedTypeNames = [];
    
    // 移除当前节点高亮
    if (currentHighlightedNode) {
        currentHighlightedNode = null;
    }
    
    // 移除父节点路径高亮
    currentHighlightedParents.forEach(element => {
        element.classList.remove('parent-node-highlight');
    });
    
    // 清空父节点列表
    currentHighlightedParents = [];
    
    logger.debug('取消所有高亮');
}

/**
 * 延时函数
 * @param mils 毫秒数
 */
export async function sleep(mils: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, mils));
} 