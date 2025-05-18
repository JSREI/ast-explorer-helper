/**
 * 处理AST节点选择/复制功能
 */

/**
 * 启用节点内容选择
 */
export function enableNodeSelection(): void {
    // 移除AST节点上的选择禁用样式
    const style = document.createElement('style');
    style.id = 'ast-node-selection-style';
    style.textContent = `
        .tree-visualization span {
            user-select: text !important;
            -webkit-user-select: text !important;
        }
        
        .tree-visualization .key {
            user-select: text !important;
            -webkit-user-select: text !important;
        }
        
        .tree-visualization .value {
            user-select: text !important;
            -webkit-user-select: text !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 禁用节点内容选择
 */
export function disableNodeSelection(): void {
    // 移除我们添加的样式
    const style = document.getElementById('ast-node-selection-style');
    if (style) {
        style.remove();
    }
} 