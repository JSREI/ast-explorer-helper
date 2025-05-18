/**
 * 剪贴板工具服务
 */

import { logger } from '../logger';

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否成功复制
 */
export function copyToClipboard(text: string): boolean {
    try {
        // 创建一个辅助的文本域
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';  // 避免滚动到底部
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // 选择文本并复制
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // 显示复制成功提示
        if (success) {
            showCopySuccessToast(text);
        }
        
        return success;
    } catch (error) {
        logger.error('复制到剪贴板失败:', error);
        return false;
    }
}

/**
 * 显示复制成功的提示
 * @param text 复制的内容
 */
function showCopySuccessToast(text: string): void {
    // 检查是否已有提示框
    let toast = document.getElementById('copy-toast');
    if (!toast) {
        // 创建提示框
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            font-size: 14px;
            max-width: 80%;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    
    // 裁剪显示的内容
    const displayText = text.length > 50 ? text.substring(0, 47) + '...' : text;
    toast.textContent = `已复制: ${displayText}`;
    toast.style.opacity = '1';
    
    // 设置定时器让提示消失
    setTimeout(() => {
        if (toast) {
            toast.style.opacity = '0';
            
            // 提示消失后删除元素
            setTimeout(() => {
                if (toast && toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 2000);
} 