/**
 * 高亮引擎核心模块
 * 
 * 这个模块包含AST节点高亮的核心逻辑，
 * 它与DOM操作解耦，可以在测试环境中使用
 */

/**
 * 高亮引擎类
 */
export class HighlightEngine {
    // 用于记录高亮的节点
    private currentHighlightedNode: HTMLElement | null = null;
    private currentHighlightedParents: HTMLElement[] = [];
    private currentHighlightedTypeNames: HTMLElement[] = [];

    /**
     * 高亮节点路径
     * @param node 起始节点
     * @param callbacks 高亮回调函数集
     */
    public highlightNodePath(
        node: HTMLElement, 
        callbacks: {
            onHighlightNode?: (node: HTMLElement, className: string) => void;
            onLog?: (message: string, ...args: any[]) => void;
        } = {}
    ): void {
        // 日志函数
        const log = callbacks.onLog || (() => {});
        
        // 高亮回调
        const highlightCallback = callbacks.onHighlightNode || (() => {});
        
        // 清除之前的高亮
        this.removeHighlight();
        
        // 记录当前节点
        this.currentHighlightedNode = node;
        
        // 获取当前AST节点
        const currentNode = this.findASTNodeElement(node);
        if (!currentNode) return;
        
        log('当前节点:', this.getNodeDescription(currentNode));
        
        // 高亮当前节点
        highlightCallback(currentNode, 'current-node');
        
        // 高亮节点类型名称
        this.highlightCurrentNodeType(currentNode, highlightCallback);
        
        // 高亮父节点路径
        this.highlightParentPath(currentNode, highlightCallback, log);
    }
    
    /**
     * 查找AST节点元素
     * @param node 需要查找的节点
     * @returns AST节点元素或null
     */
    private findASTNodeElement(node: HTMLElement): HTMLElement | null {
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
     * @param highlightCallback 高亮回调函数
     */
    private highlightCurrentNodeType(
        node: HTMLElement, 
        highlightCallback: (node: HTMLElement, className: string) => void
    ): void {
        // 查找节点内部的类型名称元素
        const tokenNameElement = node.querySelector('.tokenName');
        if (tokenNameElement && tokenNameElement instanceof HTMLElement) {
            tokenNameElement.classList.add('node-highlighted');
            this.currentHighlightedTypeNames.push(tokenNameElement);
            highlightCallback(tokenNameElement, 'node-highlighted');
        }
    }
    
    /**
     * 高亮父节点路径
     * @param currentNode 当前节点
     * @param highlightCallback 高亮回调函数
     * @param log 日志函数
     */
    private highlightParentPath(
        currentNode: HTMLElement, 
        highlightCallback: (node: HTMLElement, className: string) => void,
        log: (message: string, ...args: any[]) => void
    ): void {
        // 存储从当前节点到根节点的精确路径
        const pathNodes: HTMLElement[] = [];
        let current = currentNode;
        
        // 循环向上找到所有祖先节点直到树的根节点
        while (current && !current.closest('.tree-visualization')) {
            // 只记录entry类型的节点，它们代表AST节点
            if (current !== currentNode && current.classList.contains('entry')) {
                pathNodes.push(current);
                log('找到父节点:', this.getNodeDescription(current));
            }
            
            // 获取父节点中的entry节点
            const parent = current.parentElement?.closest('.entry');
            if (!parent) break;
            
            current = parent as HTMLElement;
        }
        
        // 高亮路径上的每个节点
        for (const pathNode of pathNodes) {
            // 高亮节点类型名称
            const tokenNameElement = pathNode.querySelector(':scope > .value > .tokenName');
            if (tokenNameElement instanceof HTMLElement) {
                tokenNameElement.classList.add('parent-node-highlight');
                this.currentHighlightedParents.push(tokenNameElement);
                highlightCallback(tokenNameElement, 'parent-node-highlight');
                log('高亮父节点类型:', tokenNameElement.textContent?.trim());
            }
            
            // 查找连接到此节点的key名称
            const parentNode = pathNode.parentElement?.closest('.entry');
            if (parentNode) {
                // 查找当前节点所在的键值对
                const keyElement = this.findKeyForNode(pathNode, parentNode as HTMLElement);
                if (keyElement) {
                    const nameElem = keyElement.querySelector('.name');
                    if (nameElem instanceof HTMLElement) {
                        nameElem.classList.add('parent-node-highlight');
                        this.currentHighlightedParents.push(nameElem);
                        highlightCallback(nameElem, 'parent-node-highlight');
                        log('高亮属性名:', nameElem.textContent?.trim());
                    }
                }
            }
        }
    }
    
    /**
     * 找到特定节点对应的键元素
     * @param node 需要找键的节点
     * @param parentNode 父节点
     * @returns 对应的键元素或null
     */
    private findKeyForNode(node: HTMLElement, parentNode: HTMLElement): HTMLElement | null {
        // 首先检查父节点是否包含键和数组
        const isArray = parentNode.querySelector(':scope > .prefix')?.textContent?.trim() === '[';
        
        if (isArray) {
            // 对于数组，我们需要查找索引
            // 获取当前节点在列表中的索引
            const valueBody = parentNode.querySelector(':scope > .value-body');
            if (!valueBody) return null;
            
            const items = Array.from(valueBody.children).filter(child => 
                child.classList.contains('entry'));
            
            const index = items.indexOf(node);
            if (index === -1) return null;
            
            // 数组没有显式的键，我们返回null
            return null;
        } else {
            // 对于对象，我们需要查找键
            // 先获取所有键值对
            const keyValuePairs = Array.from(parentNode.querySelectorAll(':scope > .value-body > .entry'));
            
            // 然后找到包含我们节点的那一对
            for (const pair of keyValuePairs) {
                // 查找这个键值对中的值容器
                const valueContainer = pair.querySelector(':scope > .value') ||
                                      pair.querySelector(':scope > .prefix')?.nextElementSibling;
                
                if (!valueContainer) continue;
                
                // 判断值容器是否包含我们的节点
                if (valueContainer.contains(node) || valueContainer === node) {
                    // 找到了正确的键值对，返回键元素
                    const keyElement = pair.querySelector(':scope > .key');
                    return keyElement as HTMLElement || null;
                }
            }
            
            // 还要检查当前节点可能是直接的属性值
            const keyElement = parentNode.querySelector(`:scope > .key`);
            if (keyElement) {
                const valueElement = parentNode.querySelector(':scope > .value');
                if (valueElement && (valueElement.contains(node) || valueElement === node)) {
                    return keyElement as HTMLElement;
                }
            }
        }
        
        return null;
    }
    
    /**
     * 获取节点描述
     * @param node 节点
     * @returns 描述字符串
     */
    private getNodeDescription(node: Element): string {
        const tokenName = node.querySelector('.tokenName')?.textContent?.trim();
        const type = node.querySelector('.key .name')?.textContent?.trim();
        const value = node.querySelector('.value')?.textContent?.trim()?.substring(0, 30);
        
        let description = '';
        if (tokenName) description += `TokenName: ${tokenName} `;
        if (type) description += `Type: ${type} `;
        if (value) description += `Value: ${value}`;
        
        return description || node.textContent?.trim()?.substring(0, 50) || 'Unknown node';
    }
    
    /**
     * 移除所有高亮
     */
    public removeHighlight(): void {
        // 移除当前节点的类型名称高亮
        this.currentHighlightedTypeNames.forEach(element => {
            element.classList.remove('node-highlighted');
        });
        this.currentHighlightedTypeNames = [];
        
        // 移除当前节点高亮
        if (this.currentHighlightedNode) {
            this.currentHighlightedNode = null;
        }
        
        // 移除父节点路径高亮
        this.currentHighlightedParents.forEach(element => {
            element.classList.remove('parent-node-highlight');
        });
        
        // 清空父节点列表
        this.currentHighlightedParents = [];
    }
} 