/**
 * 关于标签页组件 - 逻辑文件
 */

import { logger } from '../../logger';
import { getAboutTabStyles } from './about-tab.styles';
import { createAboutTabContent } from './about-tab.template';

// 导出公共API
export { getAboutTabStyles } from './about-tab.styles';
export { createAboutTabContent } from './about-tab.template';

logger.debug('已加载关于标签页组件'); 