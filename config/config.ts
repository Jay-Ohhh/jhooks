import { IConfig } from '@umijs/types';
import { menus } from './hooks';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

const config: IConfig = {
  title: 'Jhooks',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  alias: {},
  fastRefresh: {}, // 开发环境下，可以保持组件状态，同时编辑提供即时反馈
  hash: true,

  navs: {
    'zh-CN': [{ title: 'Hooks', path: '/zh-CN/hooks' }],
    'en-US': [{ title: 'Hooks', path: '/hooks' }],
  },

  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index',
      },
    ],
    '/zh-CN': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/hooks': menus,
    '/zh-CN/hooks': menus,
  },

  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 引入css
      },
      'antd',
    ],
  ],

  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  devServer: {
    port: 8081,
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    if (env === 'development') {
      memo.plugin('openBrowser').use(OpenBrowserPlugin, [
        {
          url: 'http://localhost:8081',
        },
      ]);
    }
  },
};

export default config;
