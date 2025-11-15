export function LanguageSwitcher({ currentLang = 'zh' }: { currentLang?: string }) {
  return (
    <div class="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
      <a 
        href={`?lang=zh`}
        class={`px-3 py-1 rounded-full transition-all text-sm font-medium ${
          currentLang === 'zh' 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-white hover:bg-white/20'
        }`}
      >
        中文
      </a>
      <a 
        href={`?lang=en`}
        class={`px-3 py-1 rounded-full transition-all text-sm font-medium ${
          currentLang === 'en' 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-white hover:bg-white/20'
        }`}
      >
        EN
      </a>
    </div>
  )
}
