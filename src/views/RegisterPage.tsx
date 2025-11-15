import { Layout } from '../components/Layout'

export function RegisterPage({ lang = 'zh' }: { lang?: string }) {
  const t = (key: string) => {
    const translations: Record<string, any> = {
      zh: {
        registerTitle: '注册账号',
        emailPlaceholder: '邮箱地址',
        passwordPlaceholder: '密码',
        confirmPasswordPlaceholder: '确认密码',
        registerButton: '注册',
        hasAccount: '已有账号？',
        loginNow: '立即登录',
        agreeTo: '我同意',
        termsOfService: '服务条款',
        and: '和',
        privacyPolicy: '隐私政策'
      },
      en: {
        registerTitle: 'Create Account',
        emailPlaceholder: 'Email address',
        passwordPlaceholder: 'Password',
        confirmPasswordPlaceholder: 'Confirm password',
        registerButton: 'Register',
        hasAccount: 'Already have an account?',
        loginNow: 'Login now',
        agreeTo: 'I agree to the',
        termsOfService: 'Terms of Service',
        and: 'and',
        privacyPolicy: 'Privacy Policy'
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
                <i class="fas fa-user-plus text-4xl" style="color: var(--home-primary);"></i>
              </div>
              <h2 class="text-3xl font-bold mb-2" style="color: var(--home-primary);">
                {t('registerTitle')}
              </h2>
            </div>
            
            {/* Register Form */}
            <form id="registerForm" class="space-y-6">
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
                  style="border-color: var(--home-accent);"
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
                  minlength="6"
                  placeholder={t('passwordPlaceholder')}
                  class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition"
                  style="border-color: var(--home-accent);"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold mb-2" style="color: var(--home-secondary);">
                  {t('confirmPasswordPlaceholder')}
                </label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  minlength="6"
                  placeholder={t('confirmPasswordPlaceholder')}
                  class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition"
                  style="border-color: var(--home-accent);"
                />
              </div>
              
              <div class="flex items-start">
                <input 
                  type="checkbox" 
                  name="terms"
                  required
                  class="mt-1 mr-2 rounded" 
                />
                <label class="text-sm" style="color: var(--home-secondary);">
                  {t('agreeTo')}{' '}
                  <a href="/terms" class="font-bold hover:underline" style="color: var(--home-accent);">
                    {t('termsOfService')}
                  </a>{' '}
                  {t('and')}{' '}
                  <a href="/privacy" class="font-bold hover:underline" style="color: var(--home-accent);">
                    {t('privacyPolicy')}
                  </a>
                </label>
              </div>
              
              <button 
                type="submit"
                class="w-full py-4 rounded-xl font-bold text-white transition hover:opacity-90 shadow-lg border-2 border-white/50"
                style="background-color: var(--home-accent);"
              >
                {t('registerButton')}
              </button>
            </form>
            
            {/* Login Link */}
            <div class="mt-6 text-center">
              <p class="text-sm" style="color: var(--home-secondary);">
                {t('hasAccount')}{' '}
                <a href="/login" class="font-bold hover:underline" style="color: var(--home-accent);">
                  {t('loginNow')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Register Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
              alert('密码不一致，请重新输入');
              return;
            }
            
            const data = {
              email: formData.get('email'),
              password: password
            };
            
            try {
              const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (res.ok) {
                alert('注册成功！请登录');
                window.location.href = '/login';
              } else {
                const error = await res.json();
                alert('注册失败: ' + (error.message || '未知错误'));
              }
            } catch (error) {
              alert('注册失败: ' + error.message);
            }
          });
        `
      }} />
    </Layout>
  )
}
