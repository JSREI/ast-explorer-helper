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
                <!-- 仓库信息部分 - 增强卡片版 -->
                <section class="repo-info-section">
                    <div class="repo-card">
                        <div class="repo-header">
                            <div class="repo-logo">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor" d="M20.59 12l-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l3.3-3.3zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L3.4 12z"/>
                                </svg>
                            </div>
                            
                            <h4>AST Explorer 助手</h4>
                            <span class="repo-badge">增强工具</span>
                            <p>一款提升AST Explorer使用体验的增强工具</p>
                        </div>
                        
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
                                <a href="https://github.com/JSREI/ast-explorer-helper/stargazers" target="_blank" class="stat-item star-stat" title="GitHub Star数 - 点击查看详情">
                                    <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                                    </svg>
                                    <span>${repoStats.stars || '暂未获取'}</span>
                                    <span class="stat-label">Stars</span>
                                </a>
                                <a href="https://github.com/JSREI/ast-explorer-helper/forks" target="_blank" class="stat-item fork-stat" title="GitHub Fork数 - 点击查看详情">
                                    <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                    </svg>
                                    <span>${repoStats.forks || '暂未获取'}</span>
                                    <span class="stat-label">Forks</span>
                                </a>
                                <a href="https://github.com/JSREI/ast-explorer-helper/issues" target="_blank" class="stat-item issue-stat" title="GitHub Issue数 - 点击查看详情">
                                    <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                        <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                                    </svg>
                                    <span>${repoStats.issues || '暂未获取'}</span>
                                    <span class="stat-label">Issues</span>
                                </a>
                                <a href="https://github.com/JSREI/ast-explorer-helper/commits/main" target="_blank" class="stat-item update-stat" title="最近更新时间 - 点击查看提交历史">
                                    <svg class="stat-icon" viewBox="0 0 16 16" width="16" height="16">
                                        <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"></path>
                                    </svg>
                                    <span>${repoStats.updatedAt || '暂未获取'}</span>
                                    <span class="stat-label">更新于</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- 组织信息部分 - 增强版 -->
                <section class="org-info-section">
                    <div class="org-card">
                        <div class="org-header">
                            <div class="org-logo">
                                <img src="https://avatars.githubusercontent.com/u/118125754?s=200&v=4" alt="JSREI组织Logo" class="jsrei-logo" width="64" height="64">
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
                            <a href="https://github.com/JSREI" target="_blank" class="org-action-button fixed-button">
                                <span class="button-icon">
                                    <svg class="github-icon" viewBox="0 0 16 16" width="16" height="16">
                                        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                    </svg>
                                </span>
                                <span class="button-text">查看更多JSREI项目</span>
                            </a>
                        </div>
                    </div>
                </section>
                
                <!-- 交流群信息部分 - 卡片式设计 -->
                <section class="community-section">
                    <div class="community-card">
                        <div class="community-header">
                            <div class="community-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor" d="M12 2c1.35 0 2.6.45 3.6 1.2L12 7.8 8.4 3.2C9.4 2.45 10.65 2 12 2m9 15c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3v-4.85c0-.3.15-.57.4-.74L12 5l8.6 6.41c.25.17.4.44.4.74V17z"/>
                                </svg>
                            </div>
                            
                            <h4 class="section-title">逆向技术交流群</h4>
                            <p>加入我们的技术交流社区，分享经验与知识</p>
                        </div>
                        
                        <div class="qr-code-container">
                            <!-- 微信部分 -->
                            <div class="qr-section">
                                <div class="qr-section-title wechat">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="currentColor" d="M8.2 13.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m4.9 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m3-6.5c-3.6 0-6.5 2.4-6.5 5.4 0 .5.1 1 .2 1.5-2.3-.1-4.6-1.2-6-2.9a1.61 1.61 0 0 0-.2.8c0 1 .9 1.9 2.2 2.4-.8 0-1.5-.1-2.1-.4 0 1.4 2 2.5 3.6 2.8-.4.1-.9.2-1.4.2-.3 0-.5 0-.8-.1.4 1.1 1.4 1.9 2.6 2-1 .7-2.2 1.1-3.6 1.1H3c1.3.8 2.8 1.3 4.4 1.3 5.3 0 8.2-4.1 8.2-7.6v-.3c.6-.4 1-1 1.4-1.6-.5.2-1 .4-1.6.5.6-.4 1-1 1.2-1.7-.6.3-1.2.6-1.9.7"/></path>
                                    </svg>
                                    微信交流群
                                </div>
                                
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
                            
                            <!-- QQ群部分 -->
                            <div class="qr-section">
                                <div class="qr-section-title qq">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="currentColor" d="M12.003 2c-5.514 0-9.998 4.484-9.998 9.997 0 5.515 4.484 10 9.998 10 5.515 0 10-4.485 10-10 0-5.513-4.485-9.997-10-9.997zm0 1.5c4.69 0 8.5 3.807 8.5 8.497 0 4.691-3.81 8.5-8.5 8.5-4.689 0-8.498-3.809-8.498-8.5 0-4.69 3.809-8.497 8.498-8.497zm-0.747 4.562v-0.002c-0.325 0.038-0.913 0.197-1.707 1.063-0.895 0.978-0.845 2.032-0.845 2.032s-1.289 0.184-1.677 1.904c-0.388 1.721-0.123 2.094-0.123 2.094s-0.214 1.577 0.735 0.587c0.303-0.316 0.499-1.153 0.499-1.153l0.789 1.781c-0.881 1.86-0.789 2.299-0.789 2.299s-0.123 0.883 0.643 0.205c0.766-0.678 1.219-1.977 1.219-1.977l0.214 0.92c-0.123 1.565 0.152 1.721 0.152 1.721s0.245 0.431 0.583-0.147c0.338-0.577 0.245-1.351 0.245-1.351l0.797-0.059c0.919 1.644 1.676 0.92 1.676 0.92s0.367-0.516-0.275-1.433l0.613-0.489c1.188 0.82 1.92-0.059 1.92-0.059s0.275-0.723-1.188-1.062l0.183-0.723c1.554-0.147 1.432-1.062 1.432-1.062s-0.061-0.75-1.432-0.75l-0.245-0.791c1.31-0.489 1.127-1.202 1.127-1.202s-0.214-0.606-1.188-0.518l-0.735-1.202c0.919-0.577 0.674-1.202 0.674-1.202s-0.367-0.518-1.188 0.059l-1.188-1.202c0.613-0.82 0.214-1.202 0.214-1.202s-0.521-0.321-1.127 0.518l-0.919-0.791c0.306-0.82-0.152-1.062-0.152-1.062s-0.583-0.205-0.766 0.791l-0.919-0.518c0.214-0.978-0.367-1.062-0.367-1.062z"/>
                                    </svg>
                                    QQ交流群
                                </div>
                                
                                <div class="qr-item">
                                    <p><a href="https://qm.qq.com/q/YfdB3w3OEY" target="_blank" class="qq-link">
                                        <svg viewBox="0 0 24 24" width="14" height="14">
                                            <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83-1.41-1.41L16.17 3H14V1h6v6h-2V3.41l-9.83 9.83 1.41 1.41L20.41 4H24v2h2V0h-6v2h-6z"/>
                                        </svg>
                                        点此直接加入
                                    </a> 或扫码加入QQ交流群：</p>
                                    <div class="qr-code">
                                        <img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/jsrei-qq-group.jpg" alt="QQ交流群二维码">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Telegram部分 -->
                            <div class="qr-section">
                                <div class="qr-section-title telegram">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
                                    </svg>
                                    Telegram 交流群
                                </div>
                                
                                <div class="qr-item">
                                    <p><a href="https://t.me/jsreijsrei" target="_blank" class="tg-link">
                                        <svg viewBox="0 0 24 24" width="14" height="14">
                                            <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83-1.41-1.41L16.17 3H14V1h6v6h-2V3.41l-9.83 9.83 1.41 1.41L20.41 4H24v2h2V0h-6v2h-6z"/>
                                        </svg>
                                        点此直接加入
                                    </a> 或扫码加入 TG 交流群：</p>
                                    <div class="qr-code">
                                        <img src="https://cdn.jsdelivr.net/gh/JSREI/.github/profile/README.assets/image-20241016231143315.png" alt="TG交流群二维码">
                                    </div>
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
export function getRepoStatsFromCache(): any {
    const CACHE_KEY = 'JSREI_repo_stats';
    const CACHE_EXPIRY = 60 * 60 * 1000; // 1小时缓存
    
    // 空数据对象，表示未获取到
    const emptyStats = { 
        stars: null, 
        forks: null, 
        issues: null, 
        updatedAt: null 
    };
    
    // 尝试从localStorage获取缓存数据
    const cachedData = localStorage.getItem(CACHE_KEY);
    let repoStats = { ...emptyStats };
    
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
            return emptyStats; // 返回空数据
        }
    }
    
    // 如果没有有效缓存，异步获取新数据
    try {
        fetchRepoStats().then(data => {
            if (data) {
                // 缓存新数据
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: new Date().getTime(),
                    data: data
                }));
                
                // 如果页面已加载，更新DOM
                updateRepoStatsInDOM(data);
            } else {
                // API返回空数据，更新DOM显示未获取状态
                updateRepoStatsInDOM(emptyStats);
            }
        }).catch(err => {
            console.error('获取仓库统计数据失败:', err);
            // API调用出错，更新DOM显示未获取状态
            updateRepoStatsInDOM(emptyStats);
        });
    } catch (error) {
        console.error('启动仓库统计更新失败:', error);
        return emptyStats; // 返回空数据
    }
    
    return repoStats;
}

/**
 * 从GitHub API获取仓库统计数据
 */
async function fetchRepoStats(): Promise<any> {
    try {
        // 给API请求添加超时限制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
        
        const response = await fetch('https://api.github.com/repos/JSREI/ast-explorer-helper', {
            signal: controller.signal,
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        clearTimeout(timeoutId);
        
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
        // 返回null表示获取失败
        return null;
    }
}

/**
 * 更新DOM中的仓库统计数据
 */
function updateRepoStatsInDOM(data: any): void {
    try {
        const aboutTab = document.getElementById('about-tab');
        if (!aboutTab) return;
        
        // 更新各个统计数据
        const statItems = aboutTab.querySelectorAll('.github-stats .stat-item span');
        if (statItems.length >= 4) {
            statItems[0].textContent = data.stars?.toString() || '暂未获取';
            statItems[2].textContent = data.forks?.toString() || '暂未获取';
            statItems[4].textContent = data.issues?.toString() || '暂未获取';
            statItems[6].textContent = data.updatedAt || '暂未获取';
        }
    } catch (error) {
        console.error('更新DOM中的仓库统计数据失败:', error);
    }
} 