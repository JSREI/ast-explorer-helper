/**
 * AST Explorer助手 - 主入口文件
 * 
 * 用于分析ast时辅助提高效率，支持复制和右键菜单，以及元素高亮
 * @author CC11001100
 */

import { setSelectable, sleep } from './dom-helpers';
import { createContextMenu, createSettingsUI } from './ui';
import { loadSettings, applyAllSettings, applyToolbarSetting, applyNodeSelectionSetting } from './settings';
import { logger, LogLevel } from './logger';

/**
 * 主函数，用于初始化和运行脚本
 */
async function main(): Promise<void> {
    'use strict';

    // 强制启用调试级别的日志
    logger.enableDebug();

    logger.info('AST Explorer助手启动中...');

    // 记录当前版本信息
    logger.group('版本信息');
    logger.info('版本: 0.4.0');
    logger.info('环境: ' + (process.env.NODE_ENV || 'development'));
    logger.groupEnd();

    // 分组显示初始化过程
    logger.group('初始化过程');

    // 等待DOM完全加载
    if (document.readyState !== 'complete') {
        logger.debug('等待页面完全加载...');
        await new Promise<void>(resolve => {
            window.addEventListener('load', () => resolve());
        });
        logger.debug('页面完全加载完成');
    } else {
        logger.debug('页面已经完全加载');
    }
    
    // 增加一个较长的延迟，确保页面元素已完全渲染
    logger.debug('等待500ms以确保页面元素已完全渲染...');
    await sleep(500);
    logger.debug('延迟等待完成');

    // 加载设置
    logger.debug('开始加载设置...');
    const settings = loadSettings();
    logger.debug('设置已加载:', settings);
    console.log('✅ 加载的设置:', settings);
    console.log('✅ hideToolbar值为:', settings.hideToolbar);
    
    // 确保Toolbar元素存在或等待它出现
    const ensureToolbarAndApplySettings = async (retryCount = 0, maxRetries = 3) => {
        // 尝试查找Toolbar元素
        const toolbar = document.getElementById('Toolbar');
        console.log(`🔍 [尝试 ${retryCount+1}/${maxRetries+1}] 查找Toolbar元素:`, toolbar);
        
        if (toolbar) {
            console.log('✅ 成功找到Toolbar元素，准备应用设置');
            
            // 应用所有设置
            console.log('🔍 准备应用所有设置...');
            applyAllSettings(settings);
            console.log('✅ 所有设置已应用');
            
            return true;
        } else if (retryCount < maxRetries) {
            // 如果没找到且未达到最大重试次数，等待后重试
            console.log(`⚠️ 未找到Toolbar元素，${retryCount+1}/${maxRetries+1}次尝试`);
            await sleep(300); // 每次等待300ms
            return ensureToolbarAndApplySettings(retryCount + 1, maxRetries);
        } else {
            // 达到最大重试次数，直接应用设置
            console.log('⚠️ 达到最大重试次数，仍未找到Toolbar元素');
            console.log('🔍 将直接应用设置...');
            applyAllSettings(settings);
            console.log('✅ 所有设置已强制应用');
            
            return false;
        }
    };
    
    // 尝试确保Toolbar元素存在并应用设置
    await ensureToolbarAndApplySettings();

    // 创建设置UI
    logger.debug('开始创建设置UI...');
    createSettingsUI();
    logger.debug('设置界面已创建完成');

    // 创建右键菜单
    createContextMenu();
    logger.debug('右键菜单已创建');
    
    // 添加设置变更事件监听
    logger.debug('添加设置变更事件监听器...');
    document.addEventListener('ast-explorer-helper-settings-changed', (e) => {
        console.log('🔔 设置变更事件触发');
        const updatedSettings = (e as CustomEvent).detail;
        if (updatedSettings) {
            console.log('✅ 接收到的更新设置:', updatedSettings);
            console.log('✅ hideToolbar值为:', updatedSettings.hideToolbar);
            
            // 应用更新的设置
            console.log('🔍 准备应用更新后的设置...');
            applyAllSettings(updatedSettings);
            console.log('✅ 更新的设置已应用');
            
            // 延迟500ms后再次应用，确保设置生效
            setTimeout(() => {
                console.log('🔍 延迟500ms后再次应用设置...');
                applyToolbarSetting(updatedSettings.hideToolbar);
                console.log('✅ 设置已再次应用');
            }, 500);
        } else {
            console.warn('⚠️ 设置变更事件中没有包含有效的设置数据');
        }
    });
    logger.debug('设置变更事件监听器已添加');
    
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