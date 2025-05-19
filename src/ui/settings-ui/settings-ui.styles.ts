/**
 * 设置UI组件 - 样式文件
 */

/**
 * 获取设置按钮的样式
 * @returns 按钮CSS样式
 */
export function getSettingsButtonStyles(): string {
    return `
        #ast-settings-button .settings-button-inner {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
                        -5px -5px 10px rgba(255, 255, 255, 0.8);
            color: #4a90e2;
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        #ast-settings-button:hover .settings-button-inner {
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15),
                        -4px -4px 8px rgba(255, 255, 255, 0.9);
            color: #2563eb;
        }
        
        #ast-settings-button:active .settings-button-inner {
            background: linear-gradient(135deg, #e6e6e6, #ffffff);
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
                        inset -2px -2px 5px rgba(255, 255, 255, 0.8);
        }
        
        #ast-settings-button .gear-path {
            transform-origin: center;
            transition: transform 0.5s ease;
        }
        
        #ast-settings-button:hover .gear-path {
            animation: rotate-gear 3s linear infinite;
        }
        
        @keyframes rotate-gear {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        /* 涟漪效果 */
        #ast-settings-button .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            opacity: 0;
            pointer-events: none;
            width: 100%;
            height: 100%;
        }
        
        #ast-settings-button .ripple-effect.active {
            animation: ripple 0.6s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
}

/**
 * 获取模态框的样式
 * @returns 模态框CSS样式
 */
export function getModalStyles(): string {
    return `
        #ast-settings-modal .modal-content {
            background-color: #fff;
            border-radius: 8px;
            width: 900px;
            max-width: 90%;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: translateY(20px);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            opacity: 0;
        }
        
        #ast-settings-modal.visible .modal-content {
            transform: translateY(0);
            opacity: 1;
        }
        
        #ast-settings-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #eee;
            background: linear-gradient(to right, #4a90e2, #63b3ed);
        }
        
        #ast-settings-modal .modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: white;
            font-weight: 500;
        }
        
        #ast-settings-modal .close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            color: white;
            opacity: 0.8;
            transition: opacity 0.2s, transform 0.2s;
        }
        
        #ast-settings-modal .close-button:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        
        #ast-settings-modal .modal-body {
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        #ast-settings-modal .modal-footer {
            padding: 16px 20px;
            border-top: 1px solid #eee;
            text-align: right;
            background-color: #f9fafb;
        }
        
        #ast-settings-modal button#save-settings {
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        #ast-settings-modal button#save-settings:hover {
            background-color: #3b7fce;
            transform: translateY(-1px);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        #ast-settings-modal button#save-settings:active {
            transform: translateY(1px);
            box-shadow: none;
        }
    `;
}

/**
 * 获取成功提示的样式
 * @returns 提示框CSS样式
 */
export function getToastStyles(): string {
    return `
        .settings-toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            z-index: 10001;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
} 