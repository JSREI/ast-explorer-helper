/**
 * DOM 操作相关的工具函数
 */

/**
 * 使节点内容可选
 * @param doneKey 标记属性名
 */
export async function setSelectable(doneKey: string = "cc11001100_select_enable"): Promise<void> {
    document.querySelectorAll<HTMLElement>(".tree-visualization > ul *").forEach(element => {
        if (element.getAttribute(doneKey)) {
            return;
        }
        element.style.cssText = "; user-select: text !important; -webkit-user-select: text !important; ";
        element.setAttribute(doneKey, "true");
        
        // 添加右键菜单事件
        element.addEventListener('contextmenu', handleRightClick);
    });
}

/**
 * 处理右键点击事件
 * @param e 鼠标事件
 */
export function handleRightClick(this: HTMLElement, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    
    const menu = document.getElementById("ast-context-menu") as ContextMenuElement | null;
    if (!menu) return;
    
    // 高亮当前节点
    highlightNode(this);
    
    // 保存当前目标节点
    menu.targetNode = this;
    
    // 设置菜单位置
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.display = 'block';
}

/**
 * 当前高亮的节点
 */
let currentHighlightedNode: HTMLElement | null = null;

/**
 * 高亮节点
 * @param node 需要高亮的节点
 */
export function highlightNode(node: HTMLElement): void {
    // 先取消之前的高亮
    removeHighlight();
    
    // 保存当前高亮节点
    currentHighlightedNode = node;
    
    // 添加高亮类
    node.classList.add('node-highlighted');
}

/**
 * 移除高亮
 */
export function removeHighlight(): void {
    if (currentHighlightedNode) {
        currentHighlightedNode.classList.remove('node-highlighted');
        currentHighlightedNode = null;
    }
}

/**
 * 延时函数
 * @param mils 毫秒数
 */
export async function sleep(mils: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, mils));
} 