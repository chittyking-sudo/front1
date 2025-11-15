import { LanguageSwitcher } from './LanguageSwitcher'

export function Layout({ children, lang = 'zh' }: { children: any, lang?: string }) {
  const t = (key: string) => {
    const translations: Record<string, any> = {
      zh: {
        home: '首页',
        explore: '探索',
        admin: '管理',
        login: '登录',
        register: '注册'
      },
      en: {
        home: 'Home',
        explore: 'Explore',
        admin: 'Admin',
        login: 'Login',
        register: 'Register'
      }
    }
    return translations[lang]?.[key] || key
  }

  return (
    <div class="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav class="home-gradient shadow-lg sticky top-0 z-50 border-b-2 border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" class="flex items-center gap-2 font-bold text-xl text-white">
              <i class="fas fa-network-wired"></i>
              <span class="hidden sm:inline">Studio Network</span>
            </a>
            
            {/* Navigation Links */}
            <div class="flex items-center gap-6">
              <a href="/" class="text-white/90 hover:text-white transition font-medium">
                {t('home')}
              </a>
              <a href="/explore" class="text-white/90 hover:text-white transition font-medium">
                {t('explore')}
              </a>
              <a href="/admin" class="text-white/90 hover:text-white transition font-medium">
                <i class="fas fa-cog mr-1"></i>
                {t('admin')}
              </a>
              
              {/* Auth Links */}
              <a href="/login" class="text-white/90 hover:text-white transition font-medium">
                {t('login')}
              </a>
              <a href="/register" class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition font-medium border-2 border-white/30">
                {t('register')}
              </a>
              
              {/* Language Switcher */}
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main class="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer class="bg-gray-900 text-gray-300 py-8 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-white font-bold mb-4">关于我们</h3>
              <p class="text-sm">
                独立工作室展示网络致力于连接相似理念的独立创作者，
                打破传统品类限制，让设计哲学成为发现的桥梁。
              </p>
            </div>
            <div>
              <h3 class="text-white font-bold mb-4">快速链接</h3>
              <ul class="space-y-2 text-sm">
                <li><a href="/" class="hover:text-white transition">首页</a></li>
                <li><a href="/explore" class="hover:text-white transition">探索工作室</a></li>
                <li><a href="/admin" class="hover:text-white transition">管理后台</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-white font-bold mb-4">联系方式</h3>
              <ul class="space-y-2 text-sm">
                <li>
                  <i class="fas fa-envelope mr-2"></i>
                  hello@studionetwork.com
                </li>
                <li>
                  <i class="fas fa-globe mr-2"></i>
                  www.studionetwork.com
                </li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 Studio Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
