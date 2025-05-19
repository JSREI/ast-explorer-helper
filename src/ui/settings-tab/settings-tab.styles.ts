/**
 * 设置标签页组件 - 样式文件
 */

/**
 * 获取设置标签页的样式
 * @returns 设置标签页的CSS样式
 */
export function getSettingsTabStyles(): string {
    return `
        #ast-settings-modal .setting-item {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        #ast-settings-modal .setting-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        #ast-settings-modal .setting-item label {
            display: flex;
            align-items: center;
            font-weight: 500;
            cursor: pointer;
            color: #333;
        }
        
        #ast-settings-modal .setting-item input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
            accent-color: #4a90e2;
        }
        
        #ast-settings-modal .description {
            margin: 6px 0 0 28px;
            color: #666;
            font-size: 14px;
            line-height: 1.4;
        }
    `;
} 