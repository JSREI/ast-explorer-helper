import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend, { type HttpBackendOptions } from 'i18next-http-backend';
import { type BackendModule } from 'i18next';

// 添加一个获取资源的自定义插件，用于调试
const debugPlugin: BackendModule<HttpBackendOptions> = {
  type: 'backend',
  init: function() {
    // 初始化
  },
  read: function(language: string, namespace: string, callback: any) {
    // 使用原始的http backend，但添加调试信息
    console.log(`[i18n Debug] 尝试加载翻译文件: ${language}/${namespace}`);
    const backendInstance = new Backend();
    backendInstance.read(language, namespace, (error: any, data: any) => {
      if (error) {
        console.error(`[i18n Debug] 加载翻译文件失败 ${language}/${namespace}:`, error);
        // 如果加载失败，使用默认翻译
        const defaultTranslation = language === 'zh' ? zhTranslation : enTranslation;
        console.log(`[i18n Debug] 使用默认翻译:`, defaultTranslation);
        callback(null, defaultTranslation);
      } else {
        console.log(`[i18n Debug] 成功加载翻译文件 ${language}/${namespace}:`, data ? '有数据' : '无数据');
        if (data) {
          // 输出翻译文件的部分内容以供检查
          console.log(`[i18n Debug] 翻译文件内容示例:`, {
            title: data.title,
            'features.title': data.features?.title,
            'community.title': data.community?.title
          });
          
          // 合并默认翻译和加载的翻译
          const defaultTranslation = language === 'zh' ? zhTranslation : enTranslation;
          const mergedTranslation = {
            ...defaultTranslation,
            ...data
          };
          console.log(`[i18n Debug] 合并后的翻译:`, mergedTranslation);
          callback(null, mergedTranslation);
        } else {
          console.warn(`[i18n Debug] 翻译文件为空，使用默认翻译`);
          callback(null, language === 'zh' ? zhTranslation : enTranslation);
        }
      }
    });
    return null;
  }
};

// 默认翻译，作为基础翻译或在外部文件加载失败时使用
const zhTranslation = {
  title: "AST Explorer 助手",
  subtitle: "让 AST 分析更简单、更高效",
  nav: {
    home: "首页",
    features: "功能",
    install: "安装",
    community: "交流群"
  },
  language: {
    zh: "简体中文",
    en: "English"
  },
  cta: {
    install: "立即安装",
    joinCommunity: "加入交流群",
    viewSource: "查看源码"
  },
  features: {
    title: "主要功能",
    textSelection: {
      title: "增强文本选择",
      description: "移除默认的选择限制，让你可以自由复制节点内容，更方便代码分析和文档编写"
    },
    contextMenu: {
      title: "便捷右键菜单",
      description: "支持通过右键菜单快速复制节点内容，操作简单直观，保持原始格式"
    }
  },
  whyUse: {
    title: "为什么使用 AST Explorer 助手？",
    efficiency: {
      title: "提升效率",
      description: "告别手动复制的烦恼，让AST分析工作更加高效"
    },
    easyToUse: {
      title: "简单易用",
      description: "无需复杂配置，安装即可使用，符合直觉的操作方式"
    },
    openSource: {
      title: "开源免费",
      description: "完全开源，社区驱动，持续改进"
    }
  },
  install: {
    title: "安装指南",
    step1: {
      title: "安装油猴插件",
      description: "首先，你需要在浏览器中安装油猴插件：",
      chrome: "Chrome/Edge用户",
      firefox: "Firefox用户",
      installTampermonkey: "安装 Tampermonkey",
      installGreasemonkey: "安装 Greasemonkey"
    },
    step2: {
      title: "安装用户脚本",
      description: "安装完油猴插件后，点击下面的按钮安装AST Explorer助手：",
      installScript: "安装脚本",
      note: "注：如果按钮无法正常工作，你也可以：",
      visitRepo: "访问我们的 GitHub仓库",
      downloadFile: "下载 dist/ast-explorer-helper.user.js 文件",
      dragAndDrop: "手动将文件拖拽到油猴插件页面中安装"
    },
    step3: {
      title: "开始使用",
      description: "安装完成后：",
      visitSite: "访问 AST Explorer",
      autoEnable: "脚本会自动启用",
      enjoyFeature: "现在你可以自由地选择和复制AST节点内容了！"
    }
  },
  community: {
    title: "逆向工程社区",
    subtitle: "加入我们的社区",
    description: "加入我们的社区，获取最新更新和技术讨论",
    groups: {
      wechat: {
        name: "微信群",
        description: "扫描二维码加入微信群：",
        note: "扫码加入微信群",
        additionalNote: "如果二维码过期，可以添加我的个人微信并发送【逆向群】加入：",
        personalQRCode: "个人微信二维码"
      },
      qq: {
        name: "QQ群",
        description: "加入我们的QQ群获取最新更新和技术支持",
        note: "扫码加入QQ群",
        clickHere: "点击这里",
        scanToJoin: "或扫码加入QQ群："
      },
      telegram: {
        name: "Telegram",
        description: "加入我们的Telegram群组参与国际社区讨论",
        note: "点击加入Telegram群组",
        clickHere: "点击这里",
        scanToJoin: "或扫码加入Telegram群组："
      }
    }
  },
  footer: {
    projectHome: "项目主页",
    copyright: "© {year} AST Explorer 助手。保留所有权利。"
  }
};

const enTranslation = {
  title: "AST Explorer Helper",
  subtitle: "Make AST analysis simpler and more efficient",
  nav: {
    home: "Home",
    features: "Features",
    install: "Install",
    community: "Community"
  },
  language: {
    zh: "简体中文",
    en: "English"
  },
  cta: {
    install: "Install Now",
    joinCommunity: "Join Community",
    viewSource: "View Source"
  },
  features: {
    title: "Key Features",
    textSelection: {
      title: "Enhanced Text Selection",
      description: "Remove default selection restrictions, allowing free copying of node content for easier code analysis and documentation"
    },
    contextMenu: {
      title: "Convenient Right-Click Menu",
      description: "Support quick copying of node content with simple and intuitive operations while preserving original formatting"
    }
  },
  whyUse: {
    title: "Why Use AST Explorer Helper?",
    efficiency: {
      title: "Boost Efficiency",
      description: "Say goodbye to manual copying hassles, make AST analysis more efficient"
    },
    easyToUse: {
      title: "Easy to Use",
      description: "No complex configuration needed, install and use, intuitive operation"
    },
    openSource: {
      title: "Open Source",
      description: "Completely open source, community-driven, continuous improvement"
    }
  },
  install: {
    title: "Installation Guide",
    step1: {
      title: "Install Userscript Manager",
      description: "First, install a userscript manager in your browser:",
      chrome: "Chrome/Edge Users",
      firefox: "Firefox Users",
      installTampermonkey: "Install Tampermonkey",
      installGreasemonkey: "Install Greasemonkey"
    },
    step2: {
      title: "Install User Script",
      description: "After installing the userscript manager, click the button below to install AST Explorer Helper:",
      installScript: "Install Script",
      note: "Note: If the button doesn't work, you can also:",
      visitRepo: "Visit our GitHub repository",
      downloadFile: "Download dist/ast-explorer-helper.user.js file",
      dragAndDrop: "Manually drag and drop the file into your userscript manager"
    },
    step3: {
      title: "Start Using",
      description: "After installation:",
      visitSite: "Visit AST Explorer",
      autoEnable: "The script will automatically enable",
      enjoyFeature: "Now you can freely select and copy AST node content!"
    }
  },
  community: {
    title: "Reverse Engineering Community",
    subtitle: "Join Our Community",
    description: "Join our community for the latest updates and technical discussions",
    groups: {
      wechat: {
        name: "WeChat",
        description: "Scan the QR code to join our WeChat group:",
        note: "Scan to join WeChat group",
        additionalNote: "If the QR code expires, you can add my personal WeChat and send [Reverse Group] to join:",
        personalQRCode: "Personal WeChat QR code"
      },
      qq: {
        name: "QQ Group",
        description: "Join our QQ group for the latest updates and technical support",
        note: "Scan to join QQ group",
        clickHere: "Click here",
        scanToJoin: "Scan to join QQ group:"
      },
      telegram: {
        name: "Telegram",
        description: "Join our Telegram group for international community discussions",
        note: "Click to join Telegram group",
        clickHere: "Click here",
        scanToJoin: "Or scan to join Telegram group:"
      }
    }
  },
  footer: {
    projectHome: "Project Homepage",
    copyright: "© {year} AST Explorer Helper. All rights reserved."
  }
};

i18n
  .use(Backend)
  .use(debugPlugin)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    debug: true,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // 添加默认翻译资源
    resources: {
      zh: {
        translation: zhTranslation
      },
      en: {
        translation: enTranslation
      }
    }
  }).then(() => {
    console.log('[i18n Debug] i18n 初始化完成');
    console.log('[i18n Debug] 当前语言:', i18n.language);
    console.log('[i18n Debug] 可用语言:', i18n.languages);
    console.log('[i18n Debug] 是否有中文翻译:', i18n.hasResourceBundle('zh', 'translation'));
    console.log('[i18n Debug] 是否有英文翻译:', i18n.hasResourceBundle('en', 'translation'));
    
    // 输出当前语言的翻译示例
    const currentLang = i18n.language;
    console.log(`[i18n Debug] 当前语言(${currentLang})的翻译示例:`, {
      title: i18n.t('title'),
      'features.title': i18n.t('features.title'),
      'community.title': i18n.t('community.title')
    });
  }).catch(error => {
    console.error('[i18n Debug] i18n 初始化失败:', error);
  });

// 设置页面语言和标题
const updateHTMLLang = (lng: string) => {
  document.documentElement.lang = lng === 'zh' ? 'zh-CN' : 'en';
  
  // 更新 title 和 description
  if (lng === 'zh') {
    document.title = 'AST Explorer 助手 - 让AST分析更简单';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AST Explorer助手是一个简单实用的浏览器插件，用于增强AST Explorer网站的使用体验。');
    }
  } else {
    document.title = 'AST Explorer Helper - Make AST analysis simpler';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AST Explorer Helper is a simple and practical browser plugin used to enhance the user experience of the AST Explorer website.');
    }
  }
};

// 添加调试信息，帮助排查翻译加载问题
i18n.on('initialized', () => {
  console.log('[i18n Debug] i18n initialized:', i18n.language, i18n.languages);
});

i18n.on('loaded', (loaded) => {
  console.log('[i18n Debug] i18n resources loaded:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error('[i18n Debug] i18n loading failed:', lng, ns, msg);
});

// 更新初始语言
updateHTMLLang(i18n.language);

// 监听语言变化
i18n.on('languageChanged', updateHTMLLang);

export default i18n; 