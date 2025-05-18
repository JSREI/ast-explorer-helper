/**
 * 设置界面组件
 */

import { 
    loadSettings, 
    saveSettings, 
    applyAllSettings, 
    notifySettingsChanged, 
    Settings 
} from '../settings/settings.service';
import { logger } from '../logger';

/**
 * 创建设置界面
 */
export function createSettingsUI(): void {
    // 添加设置按钮
    createSettingsButton();
    
    // 创建设置模态框
    createSettingsModal();
    
    // 监听设置变更事件
    document.addEventListener('ast-explorer-helper-settings-changed', handleSettingsChanged);
}

/**
 * 创建设置按钮
 */
function createSettingsButton(): void {
    const button = document.createElement('div');
    button.id = 'ast-settings-button';
    
    // 使用更现代美观的SVG图标
    button.innerHTML = `
        <div class="settings-button-inner">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="gear-path" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="gear-path" d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="ripple-effect"></div>
        </div>
    `;
    
    // 基础样式
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
    
    // 悬停效果
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    // 点击动画效果
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = button.querySelector('.ripple-effect') as HTMLElement;
        if (ripple) {
            ripple.classList.remove('active');
            
            // 触发重排以便动画可以重新开始
            // 使用括号避免TypeScript错误
            (() => ripple.offsetWidth)();
            
            ripple.classList.add('active');
        }
        
        setTimeout(() => {
            showSettingsModal();
            logger.debug('设置按钮被点击，显示设置面板');
        }, 150);
    });
    
    document.body.appendChild(button);
    logger.debug('设置按钮已创建并添加到页面');
}

/**
 * 创建设置模态框
 */
function createSettingsModal(): void {
    const modal = document.createElement('div');
    modal.id = 'ast-settings-modal';
    
    // 加载当前设置
    const settings = loadSettings();
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>AST Explorer 助手设置</h3>
                <button class="close-button">&times;</button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
                <button id="save-settings">保存设置</button>
            </div>
        </div>
    `;
    
    // 添加样式
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加模态框内部样式
    const style = document.createElement('style');
    style.textContent = `
        #ast-settings-modal .modal-content {
            background-color: #fff;
            border-radius: 8px;
            width: 400px;
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
        }
        
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
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 添加事件监听
    setupModalEvents();
}

/**
 * 设置模态框事件
 */
function setupModalEvents(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    
    // 关闭按钮
    const closeButton = modal?.querySelector('.close-button') as HTMLElement;
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            hideSettingsModal();
        });
    }
    
    // 点击模态框外部关闭
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSettingsModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.style.display === 'flex') {
            hideSettingsModal();
        }
    });
    
    // 保存设置按钮
    const saveButton = document.getElementById('save-settings');
    saveButton?.addEventListener('click', saveSettingsFromModal);
}

/**
 * 从模态框保存设置
 */
function saveSettingsFromModal(): void {
    const hideToolbar = (document.getElementById('hide-toolbar') as HTMLInputElement)?.checked ?? true;
    const enableNodeSelection = (document.getElementById('enable-node-selection') as HTMLInputElement)?.checked ?? true;
    
    const newSettings: Settings = {
        hideToolbar,
        enableNodeSelection
    };
    
    // 保存设置
    saveSettings(newSettings);
    
    // 通知设置变更
    notifySettingsChanged();
    
    // 隐藏模态框
    hideSettingsModal();
    
    // 显示保存成功提示
    showSaveSuccess();
}

/**
 * 显示保存成功提示
 */
function showSaveSuccess(): void {
    const toast = document.createElement('div');
    toast.textContent = '设置已保存';
    toast.style.cssText = `
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
    `;
    
    document.body.appendChild(toast);
    
    // 触发重排以强制应用过渡效果
    // 使用括号避免TypeScript错误
    (() => toast.offsetWidth)();
    
    // 显示toast
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

/**
 * 显示设置模态框
 */
function showSettingsModal(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    if (modal) {
        modal.style.display = 'flex';
        
        // 触发重排以强制应用过渡效果
        // 使用括号避免TypeScript错误
        (() => modal.offsetWidth)();
        
        // 显示模态框
        modal.style.opacity = '1';
        modal.classList.add('visible');
    }
}

/**
 * 隐藏设置模态框
 */
function hideSettingsModal(): void {
    const modal = document.getElementById('ast-settings-modal') as HTMLElement;
    if (modal) {
        modal.style.opacity = '0';
        modal.classList.remove('visible');
        
        // 等待过渡完成后隐藏
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

/**
 * 处理设置变更事件
 */
function handleSettingsChanged(event: Event): void {
    const settings = (event as CustomEvent).detail as Settings;
    
    // 应用所有设置
    if (settings) {
        applyAllSettings(settings);
    }
} 