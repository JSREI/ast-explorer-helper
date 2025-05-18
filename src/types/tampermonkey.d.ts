/**
 * Tampermonkey API 扩展类型定义
 * 补充官方类型定义中可能缺失的部分
 */

// 确保导入官方类型定义
/// <reference types="tampermonkey" />

// 扩展GM_info类型
interface GMInfo extends GM_Info {
  script: {
    name: string;
    namespace: string;
    description: string;
    version: string;
    author: string;
    copyright?: string;
    homepage?: string;
    icon?: string;
    iconURL?: string;
    defaulticon?: string;
    icon64?: string;
    icon64URL?: string;
    updateURL?: string;
    downloadURL?: string;
    supportURL?: string;
    [key: string]: any;
  };
  [key: string]: any;
} 