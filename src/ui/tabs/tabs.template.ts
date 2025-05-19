/**
 * 标签页组件 - 模板文件
 */

/**
 * 创建标签页导航
 * @returns 标签页导航HTML
 */
export function createTabsNavigation(): string {
    return `
        <div class="modal-tabs">
            <button class="tab-button active" data-tab="settings">设置</button>
            <button class="tab-button" data-tab="about">关于</button>
        </div>
    `;
} 