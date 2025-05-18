/**
 * AST节点信息工具
 */

/**
 * 查找节点类型
 * @param node DOM节点
 * @returns 节点类型字符串
 */
export function findNodeType(node: HTMLElement): string {
    // 尝试从节点属性或直接子元素中获取节点类型
    // 例如从 <span class="key">type</span><span class="punctuation">: </span><span class="value">"Identifier"</span>
    // 提取出 "Identifier"
    
    // 首先检查是否有type字段
    const typeKeyElem = node.querySelector('.key:contains("type")');
    if (typeKeyElem) {
        const valueElem = typeKeyElem.nextElementSibling?.nextElementSibling;
        if (valueElem && valueElem.classList.contains('value')) {
            return valueElem.textContent?.replace(/['"]/g, '') || '';
        }
    }
    
    // 如果上面的方法找不到，尝试从上下文推断
    // 查找父级元素中的类型信息
    const parentNode = node.closest('[class*="ast-"]');
    if (parentNode) {
        const className = Array.from(parentNode.classList)
            .find(cls => cls.startsWith('ast-'));
        
        if (className) {
            return className.replace('ast-', '');
        }
    }
    
    // 如果仍然找不到类型，返回节点名称或空字符串
    return node.nodeName.toLowerCase() || '';
}

/**
 * 获取节点路径
 * @param node DOM节点
 * @returns 节点路径字符串
 */
export function getNodePath(node: HTMLElement): string {
    // 查找节点的祖先，构建节点路径
    const path: string[] = [];
    let current: HTMLElement | null = node;
    
    while (current && !current.classList.contains('tree-visualization')) {
        // 检查是否包含键值对
        const keyElement = current.querySelector('.key');
        if (keyElement) {
            const key = keyElement.textContent?.trim();
            if (key) {
                // 如果是数组元素，使用索引表示
                if (key.match(/^\d+$/)) {
                    path.unshift(`[${key}]`);
                } else {
                    path.unshift(`.${key}`);
                }
            }
        } else if (current.parentElement?.classList.contains('tree-visualizatio')) {
            // 如果是根节点
            path.unshift('root');
        }
        
        // 移动到父节点
        current = current.parentElement;
    }
    
    return path.join('');
}

/**
 * 获取节点的完整内容（包括子节点）
 * @param node DOM节点
 * @returns 完整的内容字符串
 */
export function getFullNodeContent(node: HTMLElement): string {
    // 收集节点本身及其所有子节点的内容
    
    // 简单的实现方式是直接使用textContent
    // 更复杂的实现可以递归构建格式化的输出
    return node.textContent?.trim() || '';
} 