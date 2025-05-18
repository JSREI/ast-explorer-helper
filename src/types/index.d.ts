// 全局类型定义

/**
 * 当前高亮节点
 */
interface HighlightedNode extends HTMLElement {
  // 扩展HTMLElement接口可能的属性
}

/**
 * 自定义右键菜单元素
 */
interface ContextMenuElement extends HTMLElement {
  targetNode?: HTMLElement;
} 