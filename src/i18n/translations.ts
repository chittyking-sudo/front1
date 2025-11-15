// Internationalization translations

export type Language = 'zh' | 'en'

export const translations = {
  zh: {
    // Navigation
    home: '首页',
    explore: '探索',
    admin: '管理',
    login: '登录',
    register: '注册',
    logout: '登出',
    
    // Home Page
    siteTitle: '独立工作室展示网络',
    siteDescription: '跨行业按理念发现相似的创作者',
    searchPlaceholder: '搜索工作室、理念标签...',
    searchButton: '搜索',
    browseByIdea: '按理念浏览',
    browseByMaterial: '按材料浏览',
    quickFilters: '快速筛选',
    byCategory: '按品类',
    byCity: '按地区',
    exploreStudios: '探索工作室',
    viewAll: '查看全部',
    
    // Studio Card
    views: '次浏览',
    favorites: '收藏',
    
    // Studio Detail
    backToHome: '返回首页',
    ideaTags: '理念标签',
    works: '作品展示',
    about: '关于这个工作室',
    externalLinks: '外部链接',
    similarStudios: '相似理念的工作室',
    
    // Filters
    filterConditions: '筛选条件',
    selected: '已选择',
    clearAll: '清除所有',
    found: '找到',
    studios: '个工作室',
    noResults: '没有找到符合条件的工作室',
    tryAdjust: '试试调整筛选条件或搜索关键词',
    
    // Categories
    pottery: '陶艺',
    fashion: '服装',
    illustration: '插画',
    woodwork: '木工',
    metalwork: '金工',
    leather: '皮具',
    paper: '纸艺',
    jewelry: '首饰',
    other: '其他',
    
    // Stages
    exploration: '灵感探索',
    experiment: '材料实验',
    production: '小批量生产',
    custom: '接受定制',
    collaboration: '寻求合作',
    
    // Footer
    aboutUs: '关于我们',
    aboutDescription: '独立工作室展示网络致力于连接相似理念的独立创作者，打破传统品类限制，让设计哲学成为发现的桥梁。',
    quickLinks: '快速链接',
    contact: '联系方式',
    copyright: '版权所有',
    
    // Auth
    emailPlaceholder: '邮箱地址',
    passwordPlaceholder: '密码',
    confirmPasswordPlaceholder: '确认密码',
    loginTitle: '登录账号',
    registerTitle: '注册账号',
    noAccount: '还没有账号？',
    hasAccount: '已有账号？',
    loginNow: '立即登录',
    registerNow: '立即注册',
    forgotPassword: '忘记密码？',
  },
  en: {
    // Navigation
    home: 'Home',
    explore: 'Explore',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Home Page
    siteTitle: 'Independent Studio Network',
    siteDescription: 'Discover creators with similar philosophies across industries',
    searchPlaceholder: 'Search studios, idea tags...',
    searchButton: 'Search',
    browseByIdea: 'Browse by Idea',
    browseByMaterial: 'Browse by Material',
    quickFilters: 'Quick Filters',
    byCategory: 'By Category',
    byCity: 'By City',
    exploreStudios: 'Explore Studios',
    viewAll: 'View All',
    
    // Studio Card
    views: ' views',
    favorites: ' favorites',
    
    // Studio Detail
    backToHome: 'Back to Home',
    ideaTags: 'Idea Tags',
    works: 'Works',
    about: 'About this Studio',
    externalLinks: 'External Links',
    similarStudios: 'Similar Studios',
    
    // Filters
    filterConditions: 'Filter Conditions',
    selected: 'Selected',
    clearAll: 'Clear All',
    found: 'Found ',
    studios: ' studios',
    noResults: 'No studios found matching your criteria',
    tryAdjust: 'Try adjusting filters or search keywords',
    
    // Categories
    pottery: 'Pottery',
    fashion: 'Fashion',
    illustration: 'Illustration',
    woodwork: 'Woodwork',
    metalwork: 'Metalwork',
    leather: 'Leather',
    paper: 'Paper Art',
    jewelry: 'Jewelry',
    other: 'Other',
    
    // Stages
    exploration: 'Exploration',
    experiment: 'Experiment',
    production: 'Production',
    custom: 'Custom Orders',
    collaboration: 'Collaboration',
    
    // Footer
    aboutUs: 'About Us',
    aboutDescription: 'Independent Studio Network connects creators with similar philosophies, breaking traditional category boundaries and using design philosophy as a bridge for discovery.',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    copyright: 'All rights reserved',
    
    // Auth
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    confirmPasswordPlaceholder: 'Confirm password',
    loginTitle: 'Login to Account',
    registerTitle: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    loginNow: 'Login now',
    registerNow: 'Register now',
    forgotPassword: 'Forgot password?',
  }
}

export function t(key: string, lang: Language = 'zh'): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
