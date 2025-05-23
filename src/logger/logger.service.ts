/**
 * 日志服务模块
 * 提供带颜色的日志输出功能，带有插件前缀
 */

// 日志级别枚举
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

// 日志配置接口
export interface LoggerConfig {
    level: LogLevel;        // 日志级别
    prefix: string;         // 日志前缀
    showTime: boolean;      // 是否显示时间
    enabled: boolean;       // 是否启用日志
}

// 默认配置
const DEFAULT_CONFIG: LoggerConfig = {
    level: LogLevel.DEBUG,
    prefix: '🧩 AST Explorer助手',
    showTime: true,
    enabled: true
};

// 检查URL参数是否启用调试模式
function checkDebugMode(): boolean {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has('ast_debug') || urlParams.has('debug');
    } catch (e) {
        return false;
    }
}

// 配置初始日志级别
function getInitialLogLevel(): LogLevel {
    // 默认使用DEBUG级别
    return LogLevel.DEBUG;
}

/**
 * 日志服务类
 */
export class Logger {
    private config: LoggerConfig;

    /**
     * 创建一个日志服务实例
     * @param config 可选的日志配置
     */
    constructor(config?: Partial<LoggerConfig>) {
        this.config = { 
            ...DEFAULT_CONFIG,
            ...config 
        };
        
        // 输出初始状态日志
        if (this.config.level === LogLevel.DEBUG) {
            console.debug('🔍 调试模式已启用 - 日志级别:', this.config.level);
        }
    }

    /**
     * 更新日志配置
     * @param config 新配置
     */
    updateConfig(config: Partial<LoggerConfig>): void {
        const oldLevel = this.config.level;
        this.config = { ...this.config, ...config };
        
        if (oldLevel !== this.config.level) {
            if (this.config.level === LogLevel.DEBUG) {
                this.debug('🔍 调试模式已启用');
            } else if (oldLevel === LogLevel.DEBUG) {
                this.info('🔍 调试模式已关闭');
            }
        }
    }
    
    /**
     * 启用调试级别日志
     */
    enableDebug(): void {
        if (this.config.level !== LogLevel.DEBUG) {
            this.updateConfig({ level: LogLevel.DEBUG });
        }
    }
    
    /**
     * 禁用调试级别日志
     */
    disableDebug(): void {
        if (this.config.level === LogLevel.DEBUG) {
            this.updateConfig({ level: LogLevel.INFO });
        }
    }

    /**
     * 格式化日志消息
     * @param level 日志级别
     * @param args 日志参数
     * @returns 格式化后的消息
     */
    private formatMessage(level: string, args: any[]): string[] {
        const formattedArgs = [...args];
        
        // 添加时间前缀
        let prefix = this.config.prefix ? `${this.config.prefix}` : '';
        
        // 添加时间
        if (this.config.showTime) {
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
            prefix = `${prefix} [${timeStr}]`;
        }
        
        // 添加日志级别
        prefix = `${prefix} [${level}]`;
        
        // 如果第一个参数是字符串，拼接前缀，否则作为单独的参数
        if (typeof formattedArgs[0] === 'string') {
            formattedArgs[0] = `${prefix} ${formattedArgs[0]}`;
        } else {
            formattedArgs.unshift(prefix);
        }
        
        return formattedArgs;
    }

    /**
     * 调试日志
     * @param args 日志参数
     */
    debug(...args: any[]): void {
        if (!this.config.enabled || this.config.level > LogLevel.DEBUG) {
            return;
        }
        const formattedArgs = this.formatMessage('DEBUG', args);
        console.debug('%c' + formattedArgs[0], 'color: #9e9e9e; font-weight: bold;', ...formattedArgs.slice(1));
    }

    /**
     * 信息日志
     * @param args 日志参数
     */
    info(...args: any[]): void {
        if (!this.config.enabled || this.config.level > LogLevel.INFO) return;
        const formattedArgs = this.formatMessage('INFO', args);
        console.log('%c' + formattedArgs[0], 'color: #2196f3; font-weight: bold;', ...formattedArgs.slice(1));
    }

    /**
     * 警告日志
     * @param args 日志参数
     */
    warn(...args: any[]): void {
        if (!this.config.enabled || this.config.level > LogLevel.WARN) return;
        const formattedArgs = this.formatMessage('WARN', args);
        console.warn('%c' + formattedArgs[0], 'color: #ff9800; font-weight: bold;', ...formattedArgs.slice(1));
    }

    /**
     * 错误日志
     * @param args 日志参数
     */
    error(...args: any[]): void {
        if (!this.config.enabled || this.config.level > LogLevel.ERROR) return;
        const formattedArgs = this.formatMessage('ERROR', args);
        console.error('%c' + formattedArgs[0], 'color: #f44336; font-weight: bold;', ...formattedArgs.slice(1));
    }
    
    /**
     * 输出分组日志的开始
     * @param title 分组标题
     * @param collapsed 是否默认折叠
     */
    group(title: string, collapsed: boolean = false): void {
        if (!this.config.enabled) return;
        
        const formattedTitle = this.formatMessage('GROUP', [title])[0];
        if (collapsed) {
            console.groupCollapsed('%c' + formattedTitle, 'color: #4caf50; font-weight: bold;');
        } else {
            console.group('%c' + formattedTitle, 'color: #4caf50; font-weight: bold;');
        }
    }
    
    /**
     * 输出折叠的分组日志开始
     * @param title 分组标题
     */
    groupCollapsed(title: string): void {
        this.group(title, true);
    }
    
    /**
     * 结束当前分组
     */
    groupEnd(): void {
        if (!this.config.enabled) return;
        console.groupEnd();
    }
    
    /**
     * 输出表格数据
     * @param data 表格数据
     */
    table(data: any): void {
        if (!this.config.enabled) return;
        console.table(data);
    }
}

// 创建默认日志实例
export const logger = new Logger();

logger.debug('热编译测试 - ' + new Date().toISOString()); 