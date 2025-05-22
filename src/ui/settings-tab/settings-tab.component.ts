/**
 * 设置标签页组件 - 逻辑文件
 */

import { Settings } from '../../settings/settings.service';
import { logger } from '../../logger';
import { getSettingsTabStyles } from './settings-tab.styles';
import { createSettingsTabContent } from './settings-tab.template';

// 导出公共API
export { getSettingsTabStyles } from './settings-tab.styles';
export { createSettingsTabContent } from './settings-tab.template';

/**
 * 从表单中收集设置数据
 * @returns 更新的设置对象
 */
export function collectSettingsFromForm(): Partial<Settings> {
    
    const hideToolbarElement = document.getElementById('hide-toolbar') as HTMLInputElement;
    console.log('🔍 隐藏工具栏复选框元素:', hideToolbarElement);
    
    // 移除视觉反馈，避免用户误解
    // 仅在控制台打印日志，不在界面显示信息
    console.log('🔍 正在读取设置选项状态...');
    
    // 确保即使元素不存在也能获取到默认值
    const hideToolbar = hideToolbarElement?.checked ?? true;
    
    console.log('✅ 收集到的hideToolbar值:', hideToolbar);
    
    return {
        hideToolbar
    };
}

logger.debug('已加载设置标签页组件'); 