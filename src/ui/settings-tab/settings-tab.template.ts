/**
 * 设置标签页组件 - 模板文件
 */

import { Settings } from '../../settings/settings.service';

/**
 * 创建设置标签页内容
 * @param settings 当前设置
 * @returns 设置标签页的HTML内容
 */
export function createSettingsTabContent(settings: Settings): string {
    return `
        <div class="tab-content active" id="settings-tab">
            <div class="setting-item">
                <label>
                    <input type="checkbox" id="hide-toolbar" ${settings.hideToolbar ? 'checked' : ''}>
                    隐藏工具栏
                </label>
                <p class="description">隐藏AST Explorer顶部工具栏，增大视图空间</p>
            </div>
            <div class="setting-item">
                <label>
                    <input type="checkbox" id="enable-node-selection" ${settings.enableNodeSelection ? 'checked' : ''}>
                    允许节点内容可选择/复制
                </label>
                <p class="description">使AST树中的节点文本可选择、复制</p>
            </div>
        </div>
    `;
} 