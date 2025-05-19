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
    const hideToolbar = (document.getElementById('hide-toolbar') as HTMLInputElement)?.checked ?? true;
    const enableNodeSelection = (document.getElementById('enable-node-selection') as HTMLInputElement)?.checked ?? true;
    
    return {
        hideToolbar,
        enableNodeSelection
    };
}

logger.debug('已加载设置标签页组件'); 