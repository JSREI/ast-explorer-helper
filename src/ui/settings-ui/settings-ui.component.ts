/**
 * 设置UI组件 - 逻辑文件
 */

import { 
    loadSettings, 
    saveSettings, 
    applyAllSettings, 
    notifySettingsChanged, 
    Settings 
} from '../../settings/settings.service';
import { logger } from '../../logger';

import { createTabsNavigation, initTabEvents, resetTabsState, getTabsStyles } from '../tabs';
import { createSettingsTabContent, collectSettingsFromForm, getSettingsTabStyles } from '../settings-tab';
import { createAboutTabContent, getAboutTabStyles } from '../about-tab';

import { 
    getSettingsButtonStyles,
    getModalStyles, 
    getToastStyles 
} from './settings-ui.styles';
import { 
    createSettingsButtonTemplate,
    createModalTemplate,
    createToastTemplate 
} from './settings-ui.template';

// 导出公共API
export { 
    getSettingsButtonStyles,
    getModalStyles, 
    getToastStyles 
} from './settings-ui.styles';
export { 
    createSettingsButtonTemplate,
    createModalTemplate,
    createToastTemplate 
} from './settings-ui.template';

/**
 * 创建设置界面
 */
export function createSettingsUI(): void {
    // 添加设置按钮
    createSettingsButton();
    
    // 创建设置模态框
    createSettingsModal();
    
    // 监听设置变更事件
    document.addEventListener('ast-explorer-helper-settings-changed', handleSettingsChanged);
}

/**
 * 创建设置按钮
 */
function createSettingsButton(): void {
    const button = document.createElement('div');
    button.id = 'ast-settings-button';
    
    // 使用模板生成按钮内容
    button.innerHTML = createSettingsButtonTemplate();
    
    // 基础样式
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = getSettingsButtonStyles();
    document.head.appendChild(style);
    
    // 悬停效果
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    // 点击动画效果
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = button.querySelector('.ripple-effect') as HTMLElement;
        if (ripple) {
            ripple.classList.remove('active');
            
            // 触发重排以便动画可以重新开始
            // 使用括号避免TypeScript错误
            (() => ripple.offsetWidth)();
            
            ripple.classList.add('active');
        }
        
        setTimeout(() => {
            showSettingsModal();
            logger.debug('设置按钮被点击，显示设置面板');
        }, 150);
    });
    
    document.body.appendChild(button);
    logger.debug('设置按钮已创建并添加到页面');
}

/**
 * 创建设置模态框
 */
function createSettingsModal(): void {
    const modal = document.createElement('div');
    modal.id = 'ast-settings-modal';
    
    // 加载当前设置
    const settings = loadSettings();
    
    // 基本模态框结构
    modal.innerHTML = createModalTemplate();
    
    // 获取内部元素
    const modalContent = modal.querySelector('.modal-content') as HTMLElement;
    const headerDiv = modalContent.querySelector('.modal-header') as HTMLElement;
    const bodyDiv = modalContent.querySelector('.modal-body') as HTMLElement;
    
    // 插入标签页导航
    headerDiv.insertAdjacentHTML('afterend', createTabsNavigation());
    
    // 插入标签页内容
    bodyDiv.innerHTML = createSettingsTabContent(settings) + createAboutTabContent();
    
    // 添加样式
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加所有组件的样式
    const style = document.createElement('style');
    style.textContent = `
        ${getModalStyles()}
        ${getTabsStyles()}
        ${getSettingsTabStyles()}
        ${getAboutTabStyles()}
        ${getToastStyles()}
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 添加事件监听
    setupModalEvents();
    
    logger.debug('设置模态框已创建并添加到页面');
}

/**
 * 设置模态框事件
 */
function setupModalEvents(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    
    // 关闭按钮
    const closeButton = modal?.querySelector('.close-button') as HTMLElement;
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            hideSettingsModal();
        });
    }
    
    // 初始化标签页切换事件
    initTabEvents(modal);
    
    // 点击模态框外部关闭
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSettingsModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.style.display === 'flex') {
            hideSettingsModal();
        }
    });
    
    // 保存设置按钮
    const saveButton = document.getElementById('save-settings');
    saveButton?.addEventListener('click', saveSettingsFromModal);
}

/**
 * 从模态框保存设置
 */
function saveSettingsFromModal(): void {
    // 从设置标签页组件收集设置
    const newSettings = collectSettingsFromForm();
    
    // 保存设置
    saveSettings(newSettings as Settings);
    
    // 通知设置变更
    notifySettingsChanged();
    
    // 隐藏模态框
    hideSettingsModal();
    
    // 显示保存成功提示
    showSaveSuccess();
}

/**
 * 显示保存成功提示
 */
function showSaveSuccess(): void {
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = createToastTemplate();
    const toast = toastContainer.firstElementChild as HTMLElement;
    
    document.body.appendChild(toast);
    
    // 触发重排以强制应用过渡效果
    // 使用括号避免TypeScript错误
    (() => toast.offsetWidth)();
    
    // 显示toast
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

/**
 * 显示设置模态框
 */
function showSettingsModal(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    if (modal) {
        modal.style.display = 'flex';
        
        // 触发重排以强制应用过渡效果
        // 使用括号避免TypeScript错误
        (() => modal.offsetWidth)();
        
        // 显示模态框
        modal.style.opacity = '1';
        modal.classList.add('visible');
    }
}

/**
 * 隐藏设置模态框
 */
function hideSettingsModal(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    if (modal) {
        modal.style.opacity = '0';
        modal.classList.remove('visible');
        
        // 等待过渡完成后隐藏
        setTimeout(() => {
            modal.style.display = 'none';
            
            // 重置标签页状态为设置标签页
            resetTabsState(modal);
        }, 300);
    }
}

/**
 * 处理设置变更事件
 */
function handleSettingsChanged(event: Event): void {
    const settings = (event as CustomEvent).detail as Settings;
    
    // 应用所有设置
    if (settings) {
        applyAllSettings(settings);
    }
} 