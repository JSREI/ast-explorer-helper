/**
 * 树节点展开服务
 * 负责处理AST树节点的递归展开功能
 */

import { logger } from '../logger';

export class TreeExpanderService {
    /**
     * 查找最近的可折叠父节点
     */
    private findClosestExpandableNode(node: HTMLElement): HTMLElement | null {
        let current = node;
        while (current && !current.classList.contains('entry')) {
            current = current.parentElement as HTMLElement;
        }
        return current;
    }

    /**
     * 查找节点的展开箭头
     */
    private findExpandIcon(node: HTMLElement): HTMLElement | null {
        // 在AST Explorer中，toggable的entry节点本身就是可点击的
        if (node.classList.contains('toggable')) {
            logger.info('找到可展开节点:', {
                nodeText: node.textContent?.substring(0, 50),
                nodeClass: node.className
            });
            return node;
        }

        logger.info('节点不可展开:', {
            nodeText: node.textContent?.substring(0, 50),
            nodeClass: node.className
        });
        return null;
    }

    /**
     * 展开单个节点
     */
    private expandSingleNode(node: HTMLElement): boolean {
        if (!node.classList.contains('open')) {
            const expandIcon = this.findExpandIcon(node);
            if (expandIcon) {
                logger.info('展开节点:', {
                    nodeText: node.textContent?.substring(0, 50),
                    nodeClass: node.className,
                    isOpen: node.classList.contains('open')
                });
                expandIcon.click();
                return true;
            } else {
                logger.info('节点无法展开:', {
                    nodeText: node.textContent?.substring(0, 50),
                    nodeClass: node.className
                });
            }
        } else {
            logger.info('节点已经是展开状态:', {
                nodeText: node.textContent?.substring(0, 50),
                nodeClass: node.className
            });
        }
        return false;
    }

    /**
     * 查找所有未展开的子节点
     */
    private findCollapsedChildren(node: HTMLElement): HTMLElement[] {
        // 先检查是否有.value-body，这是AST Explorer中存放子节点的容器
        const valueBody = node.querySelector('.value-body');
        if (!valueBody) {
            logger.info('未找到子节点容器:', {
                parentNode: node.textContent?.substring(0, 50),
                hasValueBody: false
            });
            return [];
        }

        // 查找所有可折叠但未展开的节点
        const children = Array.from(valueBody.querySelectorAll('.entry.toggable:not(.open)')) as HTMLElement[];
            
        logger.info('查找未展开的子节点:', {
            parentNode: node.textContent?.substring(0, 50),
            foundCount: children.length,
            firstChildText: children[0]?.textContent?.substring(0, 50),
            hasValueBody: true
        });
        return children;
    }

    /**
     * 递归展开节点及其子节点
     */
    private expandNodesRecursively(node: HTMLElement): void {
        logger.info('开始递归展开节点:', {
            nodeText: node.textContent?.substring(0, 50),
            nodeClass: node.className,
            hasChildren: node.querySelector('.value-body') !== null
        });

        // 先展开当前节点
        const wasExpanded = this.expandSingleNode(node);

        // 等待DOM更新后处理子节点
        setTimeout(() => {
            const collapsedChildren = this.findCollapsedChildren(node);
            
            if (collapsedChildren.length > 0) {
                logger.info(`准备展开 ${collapsedChildren.length} 个子节点`);
                
                // 递归展开每个子节点，每个节点间隔50ms展开
                collapsedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        logger.info(`展开第 ${index + 1}/${collapsedChildren.length} 个子节点`);
                        this.expandNodesRecursively(child);
                    }, index * 50);
                });
            } else {
                logger.info('没有更多需要展开的子节点');
            }
        }, wasExpanded ? 200 : 0); // 增加等待时间，确保DOM更新完成
    }

    /**
     * 展开指定节点及其所有子节点
     * @param node 起始节点
     */
    public expandAll(node: HTMLElement): void {
        const targetNode = this.findClosestExpandableNode(node);
        
        if (!targetNode) {
            logger.info('未找到可折叠节点');
            return;
        }
        
        logger.info('开始展开节点树:', {
            rootNode: targetNode.textContent?.substring(0, 50),
            className: targetNode.className,
            isOpen: targetNode.classList.contains('open')
        });
        
        this.expandNodesRecursively(targetNode);
    }
}

// 导出单例实例
export const treeExpander = new TreeExpanderService(); 