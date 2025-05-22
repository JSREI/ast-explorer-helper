/**
 * 设置管理服务
 */

import { enableNodeSelection, disableNodeSelection } from '../ast-node/node-selection.service';
import { logger } from '../logger';

// 定义设置项及其默认值
export interface Settings {
    hideToolbar: boolean;
}

// 默认设置
export const DEFAULT_SETTINGS: Settings = {
    hideToolbar: true
};

// 存储键名
const STORAGE_KEY = 'JSREI_ast_explorer_helper_settings';

/**
 * 加载保存的设置
 * @returns 合并后的设置对象
 */
export function loadSettings(): Settings {
    logger.debug('开始加载设置...');
    try {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        logger.debug('从localStorage获取的原始设置数据:', savedSettings);
        
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            logger.debug('从本地存储加载的设置对象:', parsedSettings);
            logger.debug('hideToolbar值为:', parsedSettings.hideToolbar);
            
            const mergedSettings = { ...DEFAULT_SETTINGS, ...parsedSettings };
            logger.debug('合并后的最终设置:', mergedSettings);
            return mergedSettings;
        }
    } catch (error) {
        logger.error('加载设置失败:', error);
    }
    
    logger.debug('未找到有效的存储设置，使用默认设置:', DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
}

/**
 * 保存设置到localStorage
 * @param settings 要保存的设置
 */
export function saveSettings(settings: Settings): void {
    logger.debug('准备保存设置:', settings);
    logger.debug('hideToolbar值为:', settings.hideToolbar);
    
    try {
        const settingsJSON = JSON.stringify(settings);
        logger.debug('序列化后的设置:', settingsJSON);
        
        localStorage.setItem(STORAGE_KEY, settingsJSON);
        logger.debug('设置已保存到本地存储，键名:', STORAGE_KEY);
    } catch (error) {
        logger.error('保存设置失败:', error);
    }
}

/**
 * 应用隐藏工具栏设置
 * @param hide 是否隐藏
 */
export function applyToolbarSetting(hide: boolean): void {
    try {
        logger.debug('开始应用工具栏设置, 是否隐藏:', hide);
        
        // 查找 Toolbar 元素
        // 不再显示调试信息在界面上，仅保留控制台日志
        console.log('🔍 开始应用工具栏设置, 是否隐藏:', hide);
        
        const waitForToolbar = () => {
            // 首先按ID精确查找（区分大小写）
            const toolbar = document.getElementById('Toolbar');
            console.log('🔍 查找ID为Toolbar的元素结果:', toolbar);
            
            if (toolbar) {
                console.log('✅ 成功找到Toolbar元素');
                
                // 操作前记录状态
                console.log('🔍 操作前Toolbar状态:', {
                    display: window.getComputedStyle(toolbar).display,
                    visibility: window.getComputedStyle(toolbar).visibility
                });
                
                // 根据设置显示/隐藏
                if (hide) {
                    toolbar.style.display = 'none';
                    console.log('✅ 已设置Toolbar为隐藏');
                } else {
                    toolbar.style.display = '';
                    console.log('✅ 已设置Toolbar为显示');
                }
                
                // 操作后记录状态
                console.log('🔍 操作后Toolbar状态:', {
                    display: window.getComputedStyle(toolbar).display,
                    visibility: window.getComputedStyle(toolbar).visibility
                });
                
                return true;
            }
            
            // 查找任何包含"toolbar"的元素（不区分大小写）
            const toolbarElements = document.querySelectorAll('[id*="toolbar" i], [class*="toolbar" i]');
            console.log('🔍 查找包含toolbar的元素结果:', toolbarElements.length);
            
            if (toolbarElements.length > 0) {
                console.log('⚠️ 找到可能的工具栏元素，但ID不是Toolbar');
                
                Array.from(toolbarElements).forEach((el, index) => {
                    const element = el as HTMLElement;
                    console.log(`🔍 可能的工具栏 ${index}:`, element.tagName, element.id, element.className);
                    
                    if (hide) {
                        element.style.display = 'none';
                    } else {
                        element.style.display = '';
                    }
                });
                
                return true;
            }
            
            return false;
        };
        
        // 如果Toolbar元素立即可用，则直接操作
        if (waitForToolbar()) {
            return;
        }
        
        // 如果Toolbar不立即可用，则等待一段时间后再次尝试
        console.log('⚠️ Toolbar元素不立即可用，将在200ms后重试');
        
        // 设置延迟定时器等待DOM可能的变化
        setTimeout(() => {
            console.log('🔍 开始第二次尝试查找Toolbar');
            
            if (!waitForToolbar()) {
                console.log('❌ 在第二次尝试后仍未找到Toolbar元素');
                
                // 最后一次尝试 - 查找页面顶部的任何固定元素
                const fixedTopElements = Array.from(document.querySelectorAll('*')).filter(el => {
                    try {
                        const style = window.getComputedStyle(el);
                        return style.position === 'fixed' && 
                               (style.top === '0px' || parseInt(style.top || '100') < 10) &&
                               parseInt(style.height || '0') < 100;
                    } catch (e) {
                        return false;
                    }
                });
                
                console.log('🔍 找到的顶部固定元素:', fixedTopElements.length);
                
                if (fixedTopElements.length > 0) {
                    fixedTopElements.forEach((el, i) => {
                        const element = el as HTMLElement;
                        console.log(`🔍 顶部固定元素 ${i}:`, element.tagName, element.id, element.className);
                        
                        if (hide) {
                            element.style.display = 'none';
                        } else {
                            element.style.display = '';
                        }
                    });
                }
            }
        }, 200);
        
    } catch (error) {
        console.error('❌ 应用工具栏设置时出错:', error);
    }
}

/**
 * 启用节点选择功能 (现在始终启用)
 */
export function applyNodeSelectionSetting(): void {
    logger.debug('启用节点选择功能 (默认始终启用)');
    enableNodeSelection();
    logger.debug('节点选择功能已启用');
}

/**
 * 应用所有设置
 */
export function applyAllSettings(settings: Settings): void {
    logger.debug('准备应用所有设置:', settings);
    logger.debug('hideToolbar设置值:', settings.hideToolbar);
    
    applyToolbarSetting(settings.hideToolbar);
    // 始终启用节点选择功能
    applyNodeSelectionSetting();
    
    logger.debug('所有设置已应用完成');
}

/**
 * 发布设置变更事件
 */
export function notifySettingsChanged(): void {
    logger.debug('准备发布设置变更事件...');
    
    const settings = loadSettings();
    logger.debug('当前加载的设置:', settings);
    
    const event = new CustomEvent('ast-explorer-helper-settings-changed', {
        detail: settings
    });
    
    logger.debug('创建自定义事件, detail:', event.detail);
    document.dispatchEvent(event);
    
    logger.info('设置已变更，已发布通知事件', settings);
} 