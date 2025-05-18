/**
 * AST Explorer助手 - 主入口文件
 * 
 * 用于分析ast时辅助提高效率，支持复制和右键菜单，以及元素高亮
 * @author CC11001100
 */

import { setSelectable, sleep } from './dom-helpers';
import { createContextMenu, setupKeyboardShortcuts, createSettingsUI } from './ui';
import { loadSettings, applyAllSettings } from './settings';
import { logger, LogLevel } from './logger';

/**
 * 主函数，用于初始化和运行脚本
 */
async function main(): Promise<void> {
    'use strict';

    logger.info('AST Explorer助手启动中...');

    // 记录当前版本信息
    logger.group('版本信息');
    logger.info('版本: 0.4.0');
    logger.info('环境: ' + (process.env.NODE_ENV || 'development'));
    logger.groupEnd();

    // 分组显示初始化过程
    logger.group('初始化过程');

    // 加载设置并应用
    const settings = loadSettings();
    applyAllSettings(settings);
    logger.debug('设置已加载并应用', settings);

    // 创建设置UI
    createSettingsUI();
    logger.debug('设置界面已创建');

    // 创建右键菜单
    createContextMenu();
    logger.debug('右键菜单已创建');
    
    // 设置键盘快捷键
    setupKeyboardShortcuts();
    logger.debug('键盘快捷键已设置');
    
    logger.groupEnd(); // 结束初始化过程分组
    
    logger.info('AST Explorer助手已启动完成');
    
    // 定期更新可选择性和右键菜单
    while (true) {
        await setSelectable();
        await sleep(300);
    }
}

// 运行主函数
main().catch(error => logger.error("AST Explorer助手运行出错:", error)); 