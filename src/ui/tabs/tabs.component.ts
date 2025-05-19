/**
 * 标签页组件 - 逻辑文件
 */

import { logger } from '../../logger';
import { getTabsStyles } from './tabs.styles';
import { createTabsNavigation } from './tabs.template';

// 导出公共API
export { getTabsStyles } from './tabs.styles';
export { createTabsNavigation } from './tabs.template';

/**
 * 初始化标签页切换事件
 * @param modalElement 模态框元素
 */
export function initTabEvents(modalElement: HTMLElement): void {
    const tabButtons = modalElement.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = (button as HTMLElement).dataset.tab;
            
            // 更新按钮激活状态
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // 更新内容区域显示
            const allTabContents = modalElement.querySelectorAll('.tab-content');
            allTabContents.forEach(tab => {
                tab.classList.remove('active');
            });
            
            const activeTab = modalElement.querySelector(`#${tabName}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
    
    logger.debug('已初始化标签页切换事件');
}

/**
 * 重置标签页状态为默认
 * @param modalElement 模态框元素 
 */
export function resetTabsState(modalElement: HTMLElement): void {
    // 重置标签页状态为设置标签页
    const tabButtons = modalElement.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if ((btn as HTMLElement).dataset.tab === 'settings') {
            btn.classList.add('active');
        }
    });
    
    const tabContents = modalElement.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === 'settings-tab') {
            tab.classList.add('active');
        }
    });
    
    logger.debug('已重置标签页状态为默认');
}

logger.debug('已加载标签页组件'); 