/**
 * 节点信息处理相关的工具函数
 */

/**
 * 查找节点类型
 * @param node 需要查找类型的节点
 * @returns 节点类型名称
 */
export function findNodeType(node: HTMLElement): string {
    // 首先检查当前节点
    let typeElement = node.querySelector('.tokenName') as HTMLElement | null;
    
    // 如果没有找到，查找最近的包含tokenName的父元素
    if (!typeElement) {
        let current = node;
        while (current && !typeElement) {
            // 查找当前元素本身是否有tokenName类
            if (current.classList && current.classList.contains('tokenName')) {
                typeElement = current;
                break;
            }
            
            // 向上遍历DOM树
            current = current.parentElement as HTMLElement;
            if (current) {
                typeElement = current.querySelector('.tokenName') as HTMLElement | null;
            }
            
            // 如果已经到达树可视化容器，则退出循环
            if (current && current.classList && current.classList.contains('tree-visualization')) {
                break;
            }
        }
    }
    
    // 如果找到了类型元素，返回其文本内容
    if (typeElement) {
        return typeElement.textContent?.trim() || '';
    }
    
    // 回退方案：尝试从节点路径中提取类型
    const path = getNodePath(node);
    const pathParts = path.split('.');
    // 通常路径的第一个部分是类型
    return pathParts.length > 0 ? pathParts[0] : '未找到类型';
}

/**
 * 获取节点路径
 * @param node 需要获取路径的节点
 * @returns 节点路径
 */
export function getNodePath(node: HTMLElement): string {
    const path: string[] = [];
    let current: HTMLElement | null = node;
    
    // 从当前节点向上遍历
    while (current && current.classList && !current.classList.contains('tree-visualization')) {
        // 检查是否有节点类型
        const typeElement = current.querySelector(':scope > .value > .tokenName') as HTMLElement | null;
        if (typeElement) {
            path.unshift(typeElement.textContent?.trim() || '');
        }
        
        // 检查是否有属性名
        const keyElement = current.querySelector(':scope > .key > .name') as HTMLElement | null;
        if (keyElement) {
            path.unshift(keyElement.textContent?.trim() || '');
        }
        
        current = current.parentElement as HTMLElement | null;
    }
    
    return path.join('.');
}

/**
 * 获取完整节点内容（包括子节点）
 * @param node 要处理的节点
 * @returns 节点的完整文本内容
 */
export function getFullNodeContent(node: HTMLElement): string {
    // 创建一个临时副本以避免样式干扰
    const clone = node.cloneNode(true) as HTMLElement;
    return clone.textContent?.trim() || '';
} 