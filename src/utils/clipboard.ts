/**
 * 剪贴板操作相关工具函数
 */

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
export function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification('已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
        
        // 备用复制方法
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopyNotification('已复制到剪贴板');
    });
}

/**
 * 显示复制成功通知
 * @param message 要显示的消息
 */
export function showCopyNotification(message: string): void {
    let notification = document.getElementById('ast-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'ast-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 1500);
} 