/**
 * 设置管理服务
 */

import { enableNodeSelection, disableNodeSelection } from '../ast-node/node-selection.service';
import { logger } from '../logger';

// 定义设置项及其默认值
export interface Settings {
    hideToolbar: boolean;
    enableNodeSelection: boolean;
}

// 默认设置
export const DEFAULT_SETTINGS: Settings = {
    hideToolbar: true,
    enableNodeSelection: true
};

// 存储键名
const STORAGE_KEY = 'JSREI_ast_explorer_helper_settings';

/**
 * 加载保存的设置
 * @returns 合并后的设置对象
 */
export function loadSettings(): Settings {
    try {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            logger.debug('从本地存储加载设置:', parsedSettings);
            return { ...DEFAULT_SETTINGS, ...parsedSettings };
        }
    } catch (error) {
        logger.error('加载设置失败:', error);
    }
    
    logger.debug('使用默认设置');
    return { ...DEFAULT_SETTINGS };
}

/**
 * 保存设置到localStorage
 * @param settings 要保存的设置
 */
export function saveSettings(settings: Settings): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        logger.debug('设置已保存到本地存储:', settings);
    } catch (error) {
        logger.error('保存设置失败:', error);
    }
}

/**
 * 应用隐藏工具栏设置
 * @param hide 是否隐藏
 */
export function applyToolbarSetting(hide: boolean): void {
    const toolbar = document.getElementById('Toolbar');
    if (toolbar) {
        if (hide) {
            toolbar.style.display = 'none';
            logger.debug('工具栏已隐藏');
        } else {
            toolbar.style.display = '';
            logger.debug('工具栏已显示');
        }
    } else {
        logger.warn('未找到工具栏元素，无法应用工具栏设置');
    }
}

/**
 * 应用节点选择设置
 * @param enable 是否启用节点选择
 */
export function applyNodeSelectionSetting(enable: boolean): void {
    if (enable) {
        enableNodeSelection();
        logger.debug('节点选择功能已启用');
    } else {
        disableNodeSelection();
        logger.debug('节点选择功能已禁用');
    }
}

/**
 * 应用所有设置
 */
export function applyAllSettings(settings: Settings): void {
    logger.debug('应用所有设置:', settings);
    applyToolbarSetting(settings.hideToolbar);
    applyNodeSelectionSetting(settings.enableNodeSelection);
}

/**
 * 发布设置变更事件
 */
export function notifySettingsChanged(): void {
    const settings = loadSettings();
    const event = new CustomEvent('ast-explorer-helper-settings-changed', {
        detail: settings
    });
    document.dispatchEvent(event);
    logger.info('设置已变更，已发布通知', settings);
} 