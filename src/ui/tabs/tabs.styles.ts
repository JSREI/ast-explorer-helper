/**
 * 标签页组件 - 样式文件
 */

/**
 * 获取标签页样式
 * @returns 标签页通用CSS样式
 */
export function getTabsStyles(): string {
    return `
        #ast-settings-modal .modal-tabs {
            display: flex;
            background-color: #f5f7fa;
            border-bottom: 1px solid #eee;
        }
        
        #ast-settings-modal .tab-button {
            flex: 1;
            background: none;
            border: none;
            padding: 12px;
            font-size: 15px;
            cursor: pointer;
            position: relative;
            color: #666;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        #ast-settings-modal .tab-button:hover {
            color: #4a90e2;
            background-color: #f0f4f9;
        }
        
        #ast-settings-modal .tab-button.active {
            color: #4a90e2;
        }
        
        #ast-settings-modal .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background-color: #4a90e2;
        }
        
        #ast-settings-modal .tab-content {
            display: none;
        }
        
        #ast-settings-modal .tab-content.active {
            display: block;
        }
        
        /* 根据当前标签页显示/隐藏元素 */
        #ast-settings-modal .only-settings-tab {
            display: none;
        }
        
        #ast-settings-modal .tab-button[data-tab="settings"].active ~ .modal-body ~ .modal-footer .only-settings-tab {
            display: inline-block;
        }
    `;
} 