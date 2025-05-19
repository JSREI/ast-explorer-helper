/**
 * 关于标签页组件 - 模板文件
 */

/**
 * 创建关于标签页内容
 * @returns 关于标签页的HTML内容
 */
export function createAboutTabContent(): string {
    // 获取缓存的仓库数据
    const repoStats = getRepoStatsFromCache();
    
    return `
        <div class="tab-content" id="about-tab">
            <div class="about-content">
                <!-- 仓库信息部分 -->
                <section class="repo-info-section">
                    <h4>AST Explorer 助手</h4>
                    <p>一款提升AST Explorer使用体验的增强工具</p>
                    
                    <div class="repo-stats">
                        <div class="repo-link-wrapper">
                            <a href="https://github.com/JSREI/ast-explorer-helper" target="_blank" class="repo-link">
                                <svg class="github-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                                GitHub 仓库
                            </a>
                            <a href="https://github.com/JSREI/ast-explorer-helper/stargazers" target="_blank" class="star-button">
                                <svg class="star-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                                </svg>
                                支持一下
                            </a>
                        </div>
                        
                        <div class="github-stats">
                            <div class="stat-item" title="Star数">
                                <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                                </svg>
                                <span>${repoStats.stars || '加载中...'}</span>
                            </div>
                            <div class="stat-item" title="Fork数">
                                <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                </svg>
                                <span>${repoStats.forks || '加载中...'}</span>
                            </div>
                            <div class="stat-item" title="Issue数">
                                <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                                </svg>
                                <span>${repoStats.issues || '加载中...'}</span>
                            </div>
                            <div class="stat-item" title="最近更新">
                                <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"></path>
                                </svg>
                                <span>${repoStats.updatedAt || '加载中...'}</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- 组织信息部分 - 增强版 -->
                <section class="org-info-section">
                    <div class="org-card">
                        <div class="org-header">
                            <div class="org-logo">
                                <svg class="js-logo" viewBox="0 0 630 630" width="40" height="40">
                                    <rect width="630" height="630" fill="#f7df1e"></rect>
                                    <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"></path>
                                </svg>
                                <span class="org-badge">开源组织</span>
                            </div>
                            <h4 class="section-title">关于JSREI</h4>
                        </div>
                        
                        <div class="org-content">
                            <div class="org-description">
                                <p>JSREI (JavaScript Reverse Engineering Initiative) 是一个专注于JavaScript逆向工程的开源组织，致力于提供优质的逆向工程工具和教程，帮助开发者更好地理解和分析JavaScript代码。</p>
                            </div>
                            
                            <div class="org-features">
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 3v4h2V9h-2zm0 6v2h2v-2h-2z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-text">逆向工具</div>
                                </div>
                                
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-text">技术教程</div>
                                </div>
                                
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-text">代码分析</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="org-actions">
                            <a href="https://github.com/JSREI" target="_blank" class="org-action-button">
                                <svg class="github-icon" viewBox="0 0 16 16" width="16" height="16">
                                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                                查看更多JSREI项目
                            </a>
                        </div>
                    </div>
                </section>
                
                <!-- 交流群信息部分 - 优化为横向布局 -->
                <section class="community-section">
                    <h4 class="section-title">逆向技术交流群</h4>
                    
                    <div class="qr-code-container">
                        <!-- 微信部分 -->
                        <div class="qr-section">
                            <div class="qr-item">
                                <p>扫码加入逆向技术微信交流群：</p>
                                <div class="qr-code">
                                    <img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016230653669.png" alt="逆向技术微信交流群二维码">
                                </div>
                            </div>
                            
                            <div class="qr-item">
                                <p>如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：</p>
                                <div class="qr-code">
                                    <img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20231030132026541-7614065.png" alt="个人微信二维码">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Telegram部分 -->
                        <div class="qr-section">
                            <div class="qr-item">
                                <p><a href="https://t.me/jsreijsrei" target="_blank">点此</a>或扫码加入TG交流群：</p>
                                <div class="qr-code">
                                    <img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png" alt="TG交流群二维码">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
}

/**
 * 获取仓库统计信息的缓存数据
 * 如果缓存不存在或已过期，则返回空数据并触发异步更新
 */
function getRepoStatsFromCache(): any {
    const CACHE_KEY = 'JSREI_repo_stats';
    const CACHE_EXPIRY = 60 * 60 * 1000; // 1小时缓存
    
    // 尝试从localStorage获取缓存数据
    const cachedData = localStorage.getItem(CACHE_KEY);
    let repoStats = { stars: 0, forks: 0, issues: 0, updatedAt: '' };
    
    if (cachedData) {
        try {
            const parsedData = JSON.parse(cachedData);
            const now = new Date().getTime();
            
            // 检查缓存是否有效
            if (parsedData && parsedData.timestamp && (now - parsedData.timestamp) < CACHE_EXPIRY) {
                repoStats = parsedData.data;
                return repoStats;
            }
        } catch (error) {
            console.error('解析仓库统计缓存数据失败:', error);
        }
    }
    
    // 如果没有有效缓存，异步获取新数据
    fetchRepoStats().then(data => {
        if (data) {
            // 缓存新数据
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: new Date().getTime(),
                data: data
            }));
            
            // 如果页面已加载，更新DOM
            updateRepoStatsInDOM(data);
        }
    }).catch(err => console.error('获取仓库统计数据失败:', err));
    
    return repoStats;
}

/**
 * 从GitHub API获取仓库统计数据
 */
async function fetchRepoStats(): Promise<any> {
    try {
        const response = await fetch('https://api.github.com/repos/JSREI/ast-explorer-helper');
        if (!response.ok) {
            throw new Error(`GitHub API错误: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 格式化日期
        const updatedDate = new Date(data.updated_at);
        const formattedDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')}`;
        
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
            updatedAt: formattedDate
        };
    } catch (error) {
        console.error('获取仓库统计数据失败:', error);
        return null;
    }
}

/**
 * 更新DOM中的仓库统计数据
 */
function updateRepoStatsInDOM(data: any): void {
    const aboutTab = document.getElementById('about-tab');
    if (!aboutTab) return;
    
    // 更新各个统计数据
    const statItems = aboutTab.querySelectorAll('.github-stats .stat-item span');
    if (statItems.length >= 4) {
        statItems[0].textContent = data.stars.toString();
        statItems[1].textContent = data.forks.toString();
        statItems[2].textContent = data.issues.toString();
        statItems[3].textContent = data.updatedAt;
    }
} 