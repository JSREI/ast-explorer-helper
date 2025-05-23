/**
 * 关于标签页组件 - 样式文件
 */

/**
 * 获取关于标签页的样式
 * @returns 关于标签页的CSS样式
 */
export function getAboutTabStyles(): string {
    return `
        /* 关于标签页的整体样式 */
        #about-tab {
            padding: 20px;
            overflow-y: auto;
            height: 100%;
            background-color: #f8f9fa;
        }
        
        #ast-settings-modal .about-content {
            max-width: 700px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
        
        /* 统一卡片基础样式 */
        #ast-settings-modal .repo-info-section, 
        #ast-settings-modal .org-info-section, 
        #ast-settings-modal .community-section {
            margin-bottom: 30px;
        }
        
        #ast-settings-modal .repo-card, 
        #ast-settings-modal .org-card, 
        #ast-settings-modal .community-card {
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
        
        #ast-settings-modal .repo-card:hover, 
        #ast-settings-modal .org-card:hover, 
        #ast-settings-modal .community-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* 卡片顶部渐变条 */
        #ast-settings-modal .repo-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #4a90e2, #6a3de8);
            border-radius: 3px 3px 0 0;
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
        
        #ast-settings-modal .community-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #25D366, #0088cc);
            border-radius: 3px 3px 0 0;
        }
        
        /* 统一卡片头部样式 */
        #ast-settings-modal .repo-header, 
        #ast-settings-modal .org-header, 
        #ast-settings-modal .community-header {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 15px;
            position: relative;
            border-bottom: none;
            padding: 0;
        }
        
        /* 图标/Logo统一样式 */
        #ast-settings-modal .repo-logo, 
        #ast-settings-modal .community-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            border-radius: 50%;
            margin-bottom: 15px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
            color: white;
            transition: transform 0.3s ease;
        }
        
        #ast-settings-modal .repo-logo:hover, 
        #ast-settings-modal .community-icon:hover {
            transform: rotate(10deg);
        }
        
        #ast-settings-modal .repo-logo svg, 
        #ast-settings-modal .community-icon svg {
            width: 32px;
            height: 32px;
            filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
        }
        
        /* 组织Logo特殊样式 */
        #ast-settings-modal .org-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 10px;
        }
        
        /* JSREI组织logo样式 */
        #ast-settings-modal .jsrei-logo {
            width: 64px;
            height: 64px;
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
        
        /* 徽章样式统一 */
        #ast-settings-modal .repo-badge, 
        #ast-settings-modal .org-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            margin-top: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        #ast-settings-modal .repo-badge {
            background-color: #4a90e2;
            color: white;
        }
        
        #ast-settings-modal .org-badge {
            background-color: #4caf50;
            color: white;
        }
        
        /* 标题统一样式 */
        #ast-settings-modal .repo-header h4, 
        #ast-settings-modal .org-header h4, 
        #ast-settings-modal .community-header h4,
        #ast-settings-modal .section-title {
            margin: 10px 0 5px;
            font-size: 1.25rem;
            font-weight: 600;
            color: #333;
        }
        
        #ast-settings-modal .repo-header p, 
        #ast-settings-modal .community-header p {
            margin: 5px 0 0;
            color: #666;
            font-size: 0.9rem;
            text-align: center;
        }
        
        /* 仓库统计相关样式 - 增强版 */
        #ast-settings-modal .repo-stats {
            margin: 15px auto;
            max-width: 500px;
            padding: 15px 0;
            background-color: transparent;
        }
        
        #ast-settings-modal .repo-link-wrapper {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        #ast-settings-modal .repo-link, 
        #ast-settings-modal .star-button {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        #ast-settings-modal .repo-link {
            background-color: #24292e;
            color: white !important;
        }
        
        #ast-settings-modal .repo-link:hover {
            background-color: #000;
            text-decoration: none !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        #ast-settings-modal .star-button {
            background-color: #f3f4f6;
            color: #24292e !important;
            border: 1px solid #d0d7de;
        }
        
        #ast-settings-modal .star-button:hover {
            background-color: #e6ebf1;
            text-decoration: none !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        #ast-settings-modal .github-icon, 
        #ast-settings-modal .star-icon {
            margin-right: 6px;
        }
        
        /* 改进的统计数据项样式 */
        #ast-settings-modal .github-stats {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 20px;
        }
        
        #ast-settings-modal .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px 8px;
            border-radius: 8px;
            min-width: 80px;
            text-decoration: none;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        /* 鼠标悬停效果 */
        #ast-settings-modal .stat-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            text-decoration: none !important;
        }
        
        /* 为每种类型的统计添加独特颜色 */
        #ast-settings-modal .star-stat {
            background-color: #fff8e1;
            color: #ff8f00 !important;
            border: 1px solid #ffe082;
        }
        
        #ast-settings-modal .star-stat:hover {
            background-color: #ffecb3;
        }
        
        #ast-settings-modal .star-stat .stat-icon {
            fill: #ff8f00;
        }
        
        #ast-settings-modal .fork-stat {
            background-color: #e8f5e9;
            color: #388e3c !important;
            border: 1px solid #c8e6c9;
        }
        
        #ast-settings-modal .fork-stat:hover {
            background-color: #c8e6c9;
        }
        
        #ast-settings-modal .fork-stat .stat-icon {
            fill: #388e3c;
        }
        
        #ast-settings-modal .issue-stat {
            background-color: #e3f2fd;
            color: #1976d2 !important;
            border: 1px solid #bbdefb;
        }
        
        #ast-settings-modal .issue-stat:hover {
            background-color: #bbdefb;
        }
        
        #ast-settings-modal .issue-stat .stat-icon {
            fill: #1976d2;
        }
        
        #ast-settings-modal .update-stat {
            background-color: #f3e5f5;
            color: #7b1fa2 !important;
            border: 1px solid #e1bee7;
        }
        
        #ast-settings-modal .update-stat:hover {
            background-color: #e1bee7;
        }
        
        #ast-settings-modal .update-stat .stat-icon {
            fill: #7b1fa2;
        }
        
        #ast-settings-modal .stat-icon {
            width: 20px;
            height: 20px;
            margin-bottom: 5px;
        }
        
        #ast-settings-modal .stat-item span {
            font-size: 16px;
            font-weight: 600;
            white-space: nowrap;
        }
        
        /* 新增：统计标签样式 */
        #ast-settings-modal .stat-label {
            font-size: 12px !important;
            font-weight: 400 !important;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 3px;
        }

        /* 展示类似徽章的效果 */
        #ast-settings-modal .stat-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: currentColor;
            opacity: 0.5;
        }
        
        /* 组织信息部分样式 */
        #ast-settings-modal .org-content {
            margin: 15px 0;
        }
        
        #ast-settings-modal .org-description {
            margin-bottom: 20px;
        }
        
        #ast-settings-modal .org-description p {
            text-align: center;
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
        
        /* GitHub按钮样式 */
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
        
        /* 交流群样式 */
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
        
        #ast-settings-modal .community-section h4.section-title {
            display: inline-block;
            margin: 0 0 5px 0;
            font-size: 18px;
            color: #333;
            position: relative;
        }

        #ast-settings-modal .community-section h4.section-title:after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 25%;
            width: 50%;
            height: 2px;
            background: linear-gradient(90deg, #25D366, #0088cc);
            border-radius: 2px;
        }
        
        /* 二维码横向布局样式 - 增强版 */
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
            margin-bottom: 10px;
        }
        
        #ast-settings-modal .qr-section:first-child {
            position: relative;
        }
        
        #ast-settings-modal .qr-section-title {
            width: 100%;
            text-align: left;
            margin: 5px 0 15px 5px;
            font-weight: 500;
            color: #555;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        #ast-settings-modal .qr-section-title svg {
            width: 20px;
            height: 20px;
        }
        
        #ast-settings-modal .qr-section-title.wechat {
            color: #25D366;
        }
        
        #ast-settings-modal .qr-section-title.telegram {
            color: #0088cc;
        }
        
        #ast-settings-modal .qr-section-title.qq {
            color: #12B7F5;
        }
        
        #ast-settings-modal .qr-item {
            flex: 1;
            min-width: 200px;
            max-width: 260px;
            margin: 0 auto;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            text-align: center;
        }
        
        #ast-settings-modal .qr-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            background-color: white;
            border-color: #e0e0e0;
        }
        
        #ast-settings-modal .qr-item p {
            font-size: 14px;
            margin: 0 0 10px 0;
            color: #666;
            text-align: center;
        }
        
        #ast-settings-modal .qr-code {
            margin: 10px auto;
            display: block;
            padding: 8px;
            background-color: white;
            border: 1px solid #eee;
            border-radius: 8px;
            transition: all 0.3s ease;
            text-align: center;
            width: fit-content;
        }
        
        #ast-settings-modal .qr-item:hover .qr-code {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border-color: #ddd;
        }
        
        #ast-settings-modal .qr-code img {
            width: 150px;
            border-radius: 4px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        #ast-settings-modal .qr-code img:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        #ast-settings-modal .tg-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin: 5px 0;
            font-weight: 500;
            color: #0088cc;
            transition: all 0.2s;
        }
        
        #ast-settings-modal .tg-link:hover {
            color: #005580;
            transform: translateX(2px);
        }
        
        #ast-settings-modal .qq-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin: 5px 0;
            font-weight: 500;
            color: #12B7F5;
            transition: all 0.2s;
        }
        
        #ast-settings-modal .qq-link:hover {
            color: #0091D7;
            transform: translateX(2px);
        }
    `;
} 