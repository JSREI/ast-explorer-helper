/**
 * 关于标签页组件 - 样式文件
 */

/**
 * 获取关于标签页的样式
 * @returns 关于标签页的CSS样式
 */
export function getAboutTabStyles(): string {
    return `
        /* 关于标签页样式 */
        #ast-settings-modal .about-content {
            text-align: center;
        }
        
        #ast-settings-modal .about-content h4 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 16px;
        }
        
        #ast-settings-modal .about-content .section-title {
            margin-top: 25px;
            position: relative;
        }
        
        #ast-settings-modal .about-content p {
            margin: 10px 0;
            color: #555;
            line-height: 1.5;
        }
        
        #ast-settings-modal .about-content a {
            color: #4a90e2;
            text-decoration: none;
            font-weight: 500;
        }
        
        #ast-settings-modal .about-content a:hover {
            text-decoration: underline;
        }
        
        /* 分节样式 */
        #ast-settings-modal .repo-info-section,
        #ast-settings-modal .org-info-section,
        #ast-settings-modal .community-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        #ast-settings-modal .community-section {
            border-bottom: none;
        }
        
        /* 仓库统计数据样式 */
        #ast-settings-modal .repo-stats {
            margin: 15px auto;
            max-width: 500px;
        }
        
        #ast-settings-modal .repo-link-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        #ast-settings-modal .repo-link,
        #ast-settings-modal .star-button {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background-color: #f5f7fa;
            border-radius: 6px;
            transition: background-color 0.2s;
        }
        
        #ast-settings-modal .repo-link:hover,
        #ast-settings-modal .star-button:hover {
            background-color: #e8eef7;
            text-decoration: none;
        }
        
        #ast-settings-modal .star-button {
            background-color: #ffece8;
            color: #e34c26;
        }
        
        #ast-settings-modal .star-button:hover {
            background-color: #ffdfd9;
        }
        
        #ast-settings-modal .github-stats {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        #ast-settings-modal .stat-item {
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #f5f7fa;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 14px;
            color: #555;
        }
        
        #ast-settings-modal .github-icon,
        #ast-settings-modal .star-icon,
        #ast-settings-modal .stat-icon {
            color: #6a6a6a;
        }
        
        #ast-settings-modal .star-icon {
            color: #e34c26;
        }
        
        /* 组织信息卡片样式 */
        #ast-settings-modal .org-card {
            background: linear-gradient(135deg, #ffffff, #f8f9fa);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 22px;
            max-width: 600px;
            margin: 0 auto;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        #ast-settings-modal .org-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        #ast-settings-modal .org-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #f7df1e, #e34c26);
            border-radius: 3px 3px 0 0;
        }
        
        #ast-settings-modal .org-header {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 15px;
            position: relative;
        }
        
        #ast-settings-modal .org-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 10px;
        }
        
        /* JSREI组织logo样式 */
        #ast-settings-modal .jsrei-logo {
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background-color: white;
            padding: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: float 5s ease-in-out infinite;
        }
        
        #ast-settings-modal .jsrei-logo:hover {
            border-color: #4a90e2;
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
            transform: scale(1.05);
        }
        
        /* 旧的JS logo样式保留，但不再使用 */
        #ast-settings-modal .js-logo {
            filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1));
            animation: float 5s ease-in-out infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(0);
            }
        }
        
        #ast-settings-modal .org-badge {
            background-color: #4caf50;
            color: white;
            font-size: 11px;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: 12px;
            margin-top: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        #ast-settings-modal .org-content {
            margin: 15px 0;
        }
        
        #ast-settings-modal .org-description {
            margin-bottom: 20px;
        }
        
        #ast-settings-modal .org-features {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        #ast-settings-modal .feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px;
            min-width: 100px;
            border-radius: 8px;
            transition: all 0.2s ease;
            cursor: default;
        }
        
        #ast-settings-modal .feature-item:hover {
            background-color: #f0f4f9;
            transform: translateY(-3px);
        }
        
        #ast-settings-modal .feature-item:nth-child(1):hover .feature-icon {
            color: #ff9800;
        }
        
        #ast-settings-modal .feature-item:nth-child(2):hover .feature-icon {
            color: #4caf50;
        }
        
        #ast-settings-modal .feature-item:nth-child(3):hover .feature-icon {
            color: #2196f3;
        }
        
        #ast-settings-modal .feature-icon {
            margin-bottom: 8px;
            color: #555;
            transition: color 0.2s ease;
        }
        
        #ast-settings-modal .feature-text {
            font-size: 14px;
            font-weight: 500;
        }
        
        #ast-settings-modal .org-actions {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        
        /* 修复GitHub按钮样式 */
        #ast-settings-modal .org-action-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: white;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s ease;
            box-shadow: 0 3px 10px rgba(74, 144, 226, 0.3);
            text-align: center;
            justify-content: center;
            min-width: 200px;
        }
        
        #ast-settings-modal .org-action-button .button-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        #ast-settings-modal .org-action-button .button-text {
            display: inline-block;
            color: white;
            white-space: nowrap;
        }
        
        #ast-settings-modal .org-action-button.fixed-button {
            width: auto;
            min-width: 200px;
            max-width: 100%;
            overflow: visible;
        }
        
        #ast-settings-modal .org-action-button.fixed-button .github-icon {
            color: white;
        }
        
        #ast-settings-modal .org-action-button:hover {
            background-color: #3a80d2;
            box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
            transform: translateY(-2px);
            text-decoration: none;
        }
        
        #ast-settings-modal .org-action-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 5px rgba(74, 144, 226, 0.3);
        }
        
        /* 二维码横向布局样式 */
        #ast-settings-modal .qr-code-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 15px;
        }
        
        #ast-settings-modal .qr-section {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        #ast-settings-modal .qr-item {
            flex: 1;
            min-width: 200px;
            max-width: 300px;
            margin: 0 auto;
        }
        
        #ast-settings-modal .qr-code {
            margin: 10px auto;
            display: inline-block;
        }
        
        #ast-settings-modal .qr-code img {
            width: 180px;
            border-radius: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        #ast-settings-modal .qr-code img:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        /* 组织信息样式 */
        #ast-settings-modal .org-info-section p {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
    `;
} 