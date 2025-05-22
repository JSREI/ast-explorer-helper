/**
 * 设置UI组件 - 逻辑文件
 */

import { 
    loadSettings, 
    saveSettings, 
    applyAllSettings,
    applyToolbarSetting,
    notifySettingsChanged, 
    Settings 
} from '../../settings/settings.service';
import { logger } from '../../logger';

import { createTabsNavigation, getTabsStyles, resetTabsState } from '../tabs';
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
    console.log('🔍 创建设置模态框时加载的设置:', settings);
    console.log('🔍 hideToolbar当前值:', settings.hideToolbar);
    
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
    
    // 确认复选框状态与设置一致
    setTimeout(() => {
        const hideToolbarCheckbox = document.getElementById('hide-toolbar') as HTMLInputElement;
        if (hideToolbarCheckbox) {
            console.log('🔍 确认隐藏工具栏复选框状态:', hideToolbarCheckbox.checked);
            console.log('🔍 与设置中的值对比:', settings.hideToolbar);
            
            // 如果复选框状态与设置不一致，则更正
            if (hideToolbarCheckbox.checked !== settings.hideToolbar) {
                console.log('⚠️ 复选框状态与设置不一致，进行更正');
                hideToolbarCheckbox.checked = settings.hideToolbar;
            }
        }
    }, 100);
    
    logger.debug('设置模态框已创建并添加到页面');
}

/**
 * 设置模态框事件
 */
function setupModalEvents(): void {
    const modal = document.getElementById('ast-settings-modal');
    if (!modal) {
        console.error('❌ 无法找到设置模态框元素');
        return;
    }
    
    // 关闭按钮 - 修正为.close-button选择器
    const closeBtn = modal.querySelector('.close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideSettingsModal();
        });
    } else {
        console.warn('⚠️ 无法找到关闭按钮元素 (.close-button)');
    }
    
    // 保存按钮 - 修正为#save-settings选择器
    const saveBtn = modal.querySelector('#save-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveSettingsFromModal();
        });
    } else {
        console.warn('⚠️ 无法找到保存按钮元素 (#save-settings)');
    }
    
    // 标签页切换
    setupTabsEvents();
    
    // 设置复选框实时响应
    setupRealTimeCheckboxEvents();
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSettingsModal();
        }
    });

    // 按ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideSettingsModal();
        }
    });
}

/**
 * 设置复选框实时响应事件
 */
function setupRealTimeCheckboxEvents(): void {
    try {
        const hideToolbarCheckbox = document.getElementById('hide-toolbar') as HTMLInputElement;
        
        console.log('🔍 设置复选框实时响应 - 隐藏工具栏复选框:', hideToolbarCheckbox);
        
        if (hideToolbarCheckbox) {
            hideToolbarCheckbox.addEventListener('change', (e) => {
                const isChecked = (e.target as HTMLInputElement).checked;
                console.log(`🔄 隐藏工具栏复选框状态已更改为: ${isChecked}`);
                
                // 实时更新设置
                const currentSettings = loadSettings();
                currentSettings.hideToolbar = isChecked;
                saveSettings(currentSettings);
                
                // 立即应用设置
                applyToolbarSetting(isChecked);
                
                // 简化提示信息，不提及具体功能
                showToast(`设置已更新`);
            });
        } else {
            console.warn('⚠️ 无法找到隐藏工具栏复选框元素');
        }
    } catch (error) {
        console.error('❌ 设置复选框实时响应事件出错:', error);
    }
}

/**
 * 从模态框表单中保存设置
 */
function saveSettingsFromModal(): void {
    console.log('🔍 开始保存设置...');
    
    // 收集当前设置表单中的值
    const newSettings = collectSettingsFromForm() as Settings;
    console.log('🔍 收集到的设置:', newSettings);
    
    // 保存到本地存储
    saveSettings(newSettings);
    const savedSettings = loadSettings();
    console.log('✅ 确认保存后的设置:', savedSettings);
    console.log('✅ 保存后的hideToolbar值为:', savedSettings.hideToolbar);
    
    // 先查找Toolbar元素
    const toolbar = document.getElementById('Toolbar');
    console.log('🔍 查找Toolbar元素:', toolbar);
    
    // 立即应用工具栏设置 - 直接调用
    console.log('🔍 准备直接应用工具栏设置...');
    applyToolbarSetting(newSettings.hideToolbar === true);
    console.log('✅ 工具栏设置已直接应用');
    
    // 应用其他设置
    console.log('✅ 设置保存流程完成');
    
    // 发送变更通知
    notifySettingsChanged();
    
    // 隐藏设置模态框
    hideSettingsModal();
    
    // 简单提示，不包含敏感词汇
    const toast = document.createElement('div');
    toast.textContent = '设置已保存';
    toast.style.cssText = 'position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:rgba(76,175,80,0.9);color:white;padding:8px 16px;border-radius:4px;z-index:10000;';
    document.body.appendChild(toast);
    
    // 延迟后移除提示
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 1000);
    }, 1500);
    
    // 强制多次应用工具栏设置，确保它生效（仅在控制台日志中保留，不显示给用户）
    setTimeout(() => {
        console.log('🔍 立即再次应用工具栏设置...');
        applyToolbarSetting(newSettings.hideToolbar === true);
    }, 100);
    
    setTimeout(() => {
        console.log('🔍 延迟500ms后再次应用工具栏设置...');
        applyToolbarSetting(newSettings.hideToolbar === true);
    }, 500);
    
    setTimeout(() => {
        console.log('🔍 延迟1000ms后最后应用工具栏设置...');
        applyToolbarSetting(newSettings.hideToolbar === true);
        console.log('✅ 工具栏设置已多次应用完成');
    }, 1000);
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
        console.log('🔍 关闭设置模态框，自动保存当前设置...');
        
        // 在关闭前自动保存当前设置
        try {
            // 收集当前设置
            const currentSettings = collectSettingsFromForm();
            console.log('✅ 关闭时收集的设置:', currentSettings);
            
            // 保存设置
            saveSettings(currentSettings as Settings);
            console.log('✅ 关闭时设置已保存');
            
            // 确保设置被应用
            applyAllSettings(currentSettings as Settings);
            console.log('✅ 关闭时设置已应用');
        } catch (error) {
            console.error('❌ 关闭模态框时保存设置出错:', error);
        }
        
        // 淡出动画
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
    logger.debug('接收到设置变更事件');
    
    const settings = (event as CustomEvent).detail as Settings;
    logger.debug('从事件中提取的设置:', settings);
    
    if (settings) {
        logger.debug('准备应用变更后的设置...');
        logger.debug('hideToolbar值为:', settings.hideToolbar);
        
        // 应用所有设置
        applyAllSettings(settings);
        logger.debug('设置变更事件处理完成');
    } else {
        logger.warn('设置变更事件中没有包含有效的设置数据');
    }
}

/**
 * 显示临时Toast消息
 * @param message 消息内容
 * @param duration 显示时间（毫秒）
 */
function showToast(message: string = "设置已更新", duration = 2000): void {
    // 不论传入什么消息，都只显示"设置已更新"
    const toast = document.createElement('div');
    toast.className = 'ast-toast';
    toast.textContent = "设置已更新";
    toast.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 10001;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 延迟后淡出并移除
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, duration);
}

/**
 * 设置标签页切换事件
 */
function setupTabsEvents(): void {
    const modal = document.getElementById('ast-settings-modal');
    if (!modal) {
        console.error('❌ 无法找到设置模态框元素');
        return;
    }
    
    // 范围限定在modal内部查找
    const tabButtons = modal.querySelectorAll('.modal-tabs .tab-button');
    const tabContents = modal.querySelectorAll('.modal-body .tab-content');
    
    console.log('🔍 找到', tabButtons.length, '个标签按钮和', tabContents.length, '个标签内容区域');
    
    // 详细检查标签页状态
    const settingsTab = modal.querySelector('#settings-tab');
    const aboutTab = modal.querySelector('#about-tab');
    console.log('🔍 设置标签:', settingsTab ? '已找到' : '未找到', settingsTab);
    console.log('🔍 关于标签:', aboutTab ? '已找到' : '未找到', aboutTab);
    
    // 检查标签按钮的data-tab属性
    tabButtons.forEach((btn, index) => {
        console.log(`🔍 标签按钮 ${index}:`, (btn as HTMLElement).dataset.tab, btn);
    });
    
    // 检查标签内容的id属性
    tabContents.forEach((content, index) => {
        console.log(`🔍 标签内容 ${index}:`, content.id, content);
    });
    
    // 为每个标签按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = (button as HTMLElement).dataset.tab;
            console.log('🔍 标签按钮被点击:', tabId);
            
            if (!tabId) {
                console.error('❌ 标签按钮没有data-tab属性');
                return;
            }
            
            // 移除所有激活状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前标签页的激活状态
            button.classList.add('active');
            
            // 查找对应的内容元素并激活
            const tabContent = modal.querySelector(`#${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
                console.log('✅ 已激活标签页:', tabId);
            } else {
                console.error('❌ 无法找到标签内容:', tabId);
            }
        });
    });
    
    // 确保默认标签页处于激活状态
    const defaultTab = modal.querySelector('.tab-button[data-tab="settings"]');
    if (defaultTab) {
        // 手动触发一次点击事件，确保正确激活
        (defaultTab as HTMLElement).click();
        console.log('✅ 已激活默认标签页');
    } else {
        console.error('❌ 无法找到默认标签按钮');
    }
} 