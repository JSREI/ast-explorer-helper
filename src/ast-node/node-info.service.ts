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
    // 修复选择器，使用标准DOM API而不是jQuery选择器
    const keyElements = node.querySelectorAll('.key');
    let typeKeyElem = null;
    for (let i = 0; i < keyElements.length; i++) {
        const elem = keyElements[i];
        if (elem.textContent?.trim() === 'type') {
            typeKeyElem = elem;
            break;
        }
    }
    
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
    // 完全重写路径生成逻辑，确保正确反映AST结构
    
    // 1. 找到节点所在的AST节点（entry元素）
    const astNode = node.closest('.entry');
    if (!astNode) return '';
    
    // 2. 构建路径
    const pathParts: string[] = [];
    let current: Element | null = astNode;
    
    // 从当前节点向上遍历，直到树的根节点
    while (current && !current.closest('.tree-visualization')) {
        // 查找此节点的类型
        let nodeType = '';
        const typeKey = findKeyWithText(current, 'type');
        if (typeKey) {
            const valueElem = typeKey.nextElementSibling?.nextElementSibling;
            if (valueElem && valueElem.classList.contains('value')) {
                nodeType = valueElem.textContent?.replace(/['"]/g, '') || '';
            }
        }
        
        // 查找节点在父节点中的位置（属性名或数组索引）
        let nodeName = '';
        const parentNode: Element | null = current.parentElement?.closest('.entry') || null;
        if (parentNode) {
            // 查找节点在父对象的位置
            const keyValuePairs: Element[] = Array.from(parentNode.querySelectorAll(':scope > .value-body > .entry'));
            for (let i = 0; i < keyValuePairs.length; i++) {
                if (keyValuePairs[i] === current) {
                    // 找到了节点位置
                    // 检查这是对象属性还是数组元素
                    const isArray = !!parentNode.querySelector(':scope > .prefix')?.textContent?.trim().startsWith('[');
                    
                    if (isArray) {
                        nodeName = `[${i}]`;
                    } else {
                        // 对象属性
                        const keyElem = keyValuePairs[i].querySelector(':scope > .key');
                        if (keyElem) {
                            nodeName = keyElem.textContent?.trim() || '';
                        }
                    }
                    break;
                }
            }
        }
        
        // 构建路径段
        if (nodeType && nodeName) {
            pathParts.unshift(`${nodeName} (${nodeType})`);
        } else if (nodeType) {
            pathParts.unshift(nodeType);
        } else if (nodeName) {
            pathParts.unshift(nodeName);
        }
        
        // 移动到父节点
        const parent: Element | null = current.parentElement?.closest('.entry') || null;
        if (!parent) break;
        
        current = parent;
    }
    
    // 3. 返回格式化的路径
    return pathParts.length > 0 ? pathParts.join(' > ') : '根节点';
}

/**
 * 查找具有特定文本内容的.key元素
 * @param node 当前节点
 * @param text 要查找的文本
 * @returns 找到的元素或null
 */
function findKeyWithText(node: Element, text: string): Element | null {
    const keys = node.querySelectorAll('.key');
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent?.trim() === text) {
            return keys[i];
        }
    }
    return null;
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