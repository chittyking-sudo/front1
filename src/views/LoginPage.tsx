import { Layout } from '../components/Layout'

export function LoginPage({ lang = 'zh' }: { lang?: string }) {
  const t = (key: string) => {
    const translations: Record<string, any> = {
      zh: {
        loginTitle: '登录账号',
        emailPlaceholder: '邮箱地址',
        passwordPlaceholder: '密码',
        loginButton: '登录',
        noAccount: '还没有账号？',
        registerNow: '立即注册',
        forgotPassword: '忘记密码？',
        or: '或'
      },
      en: {
        loginTitle: 'Login to Account',
        emailPlaceholder: 'Email address',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        noAccount: "Don't have an account?",
        registerNow: 'Register now',
        forgotPassword: 'Forgot password?',
        or: 'or'
      }
    }
    return translations[lang]?.[key] || key
  }

  return (
    <Layout lang={lang}>
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          {/* Card */}
          <div class="home-card rounded-3xl shadow-2xl p-8 border-4" style="border-color: var(--home-accent);">
            {/* Logo */}
            <div class="text-center mb-8">
              <div class="inline-block p-4 rounded-full mb-4" style="background-color: var(--home-light);">
                <i class="fas fa-network-wired text-4xl" style="color: var(--home-primary);"></i>
              </div>
              <h2 class="text-3xl font-bold mb-2" style="color: var(--home-primary);">
                {t('loginTitle')}
              </h2>
            </div>
            
            {/* Login Form */}
            <form id="loginForm" class="space-y-6">
              <div>
                <label class="block text-sm font-bold mb-2" style="color: var(--home-secondary);">
                  {t('emailPlaceholder')}
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition"
                  style="border-color: var(--home-accent); focus:ring-color: var(--home-light);"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold mb-2" style="color: var(--home-secondary);">
                  {t('passwordPlaceholder')}
                </label>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder={t('passwordPlaceholder')}
                  class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition"
                  style="border-color: var(--home-accent); focus:ring-color: var(--home-light);"
                />
              </div>
              
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 rounded" />
                  <span style="color: var(--home-secondary);">记住我</span>
                </label>
                <a href="/forgot-password" class="font-bold hover:underline" style="color: var(--home-accent);">
                  {t('forgotPassword')}
                </a>
              </div>
              
              <button 
                type="submit"
                class="w-full py-4 rounded-xl font-bold text-white transition hover:opacity-90 shadow-lg border-2 border-white/50"
                style="background-color: var(--home-accent);"
              >
                {t('loginButton')}
              </button>
            </form>
            
            {/* Register Link */}
            <div class="mt-6 text-center">
              <p class="text-sm" style="color: var(--home-secondary);">
                {t('noAccount')}{' '}
                <a href="/register" class="font-bold hover:underline" style="color: var(--home-accent);">
                  {t('registerNow')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              email: formData.get('email'),
              password: formData.get('password')
            };
            
            try {
              const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (res.ok) {
                window.location.href = '/';
              } else {
                const error = await res.json();
                alert('登录失败: ' + (error.message || '未知错误'));
              }
            } catch (error) {
              alert('登录失败: ' + error.message);
            }
          });
        `
      }} />
    </Layout>
  )
}
