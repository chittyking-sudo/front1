import type { Studio, Tag } from '../types'
import { Layout } from '../components/Layout'

export function AdminStudioForm({ 
  studio,
  studioTags,
  tags 
}: { 
  studio?: Studio
  studioTags?: Tag[]
  tags: Tag[]
}) {
  const isEdit = !!studio
  const selectedTagSlugs = studioTags?.map(t => t.slug) || []
  
  return (
    <Layout>
      <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-8">
          <a 
            href="/admin"
            class="text-gray-600 hover:text-indigo-600"
          >
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-3xl font-bold">
            {isEdit ? '编辑工作室' : '添加工作室'}
          </h1>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <form id="studioForm" class="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 class="text-lg font-semibold mb-4">基础信息</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    工作室名称 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={studio?.name || ''}
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="例如：一器工作室"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    URL标识 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="slug" 
                    required
                    value={studio?.slug || ''}
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="例如：yiqi-pottery（只能包含字母、数字、连字符）"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    将用于URL，如 /studio/yiqi-pottery
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    一句话介绍 (最多50字)
                  </label>
                  <input 
                    type="text" 
                    name="tagline" 
                    maxlength="50"
                    value={studio?.tagline || ''}
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="例如：探索极简陶艺的纯粹之美"
                  />
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      品类
                    </label>
                    <select 
                      name="category"
                      class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="">选择品类</option>
                      <option value="pottery" selected={studio?.category === 'pottery'}>陶艺</option>
                      <option value="fashion" selected={studio?.category === 'fashion'}>服装</option>
                      <option value="illustration" selected={studio?.category === 'illustration'}>插画</option>
                      <option value="woodwork" selected={studio?.category === 'woodwork'}>木工</option>
                      <option value="metalwork" selected={studio?.category === 'metalwork'}>金工</option>
                      <option value="leather" selected={studio?.category === 'leather'}>皮具</option>
                      <option value="paper" selected={studio?.category === 'paper'}>纸艺</option>
                      <option value="jewelry" selected={studio?.category === 'jewelry'}>首饰</option>
                      <option value="other" selected={studio?.category === 'other'}>其他</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      城市
                    </label>
                    <input 
                      type="text" 
                      name="city"
                      value={studio?.city || ''}
                      class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      placeholder="例如：上海"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      阶段
                    </label>
                    <select 
                      name="stage"
                      class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="">选择阶段</option>
                      <option value="exploration" selected={studio?.stage === 'exploration'}>灵感探索</option>
                      <option value="experiment" selected={studio?.stage === 'experiment'}>材料实验</option>
                      <option value="production" selected={studio?.stage === 'production'}>小批量生产</option>
                      <option value="custom" selected={studio?.stage === 'custom'}>接受定制</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h3 class="text-lg font-semibold mb-4">理念标签 (最多选择5个)</h3>
              <div class="flex flex-wrap gap-2">
                {tags.filter(t => t.category === 'concept').map(tag => (
                  <label class="cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="tags" 
                      value={tag.slug}
                      checked={selectedTagSlugs.includes(tag.slug)}
                      class="sr-only peer"
                    />
                    <span 
                      class="px-4 py-2 rounded-full text-sm font-medium transition peer-checked:ring-4"
                      style={`background-color: ${tag.color}15; color: ${tag.color}; border: 2px solid ${tag.color}30;`}
                    >
                      {tag.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h3 class="text-lg font-semibold mb-4">详细介绍 (支持Markdown)</h3>
              <textarea 
                name="description" 
                rows="10"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-sm"
                placeholder="支持Markdown格式：&#10;# 标题&#10;## 二级标题&#10;**粗体** *斜体*&#10;- 列表项"
              >{studio?.description || ''}</textarea>
            </div>
            
            {/* Cover Image */}
            <div>
              <h3 class="text-lg font-semibold mb-4">封面图片</h3>
              <input 
                type="url" 
                name="cover_image_url"
                value={studio?.cover_image_url || ''}
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="图片URL（建议使用 Unsplash 或其他图床）"
              />
              <p class="text-sm text-gray-500 mt-1">
                建议比例 16:9，推荐使用 <a href="https://unsplash.com" target="_blank" class="text-indigo-600">Unsplash</a> 的图片
              </p>
            </div>
            
            {/* External Links */}
            <div>
              <h3 class="text-lg font-semibold mb-4">外部链接</h3>
              <div class="space-y-3">
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="平台名称（如：小红书）"
                    class="w-1/3 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <input 
                    type="url" 
                    placeholder="链接URL"
                    class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  />
                  <button 
                    type="button"
                    class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <button 
                type="button"
                class="mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <i class="fas fa-plus mr-2"></i>
                添加链接
              </button>
            </div>
            
            {/* Submit Buttons */}
            <div class="flex gap-4 pt-4 border-t">
              <button 
                type="submit"
                class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                {isEdit ? '保存修改' : '创建工作室'}
              </button>
              <a 
                href="/admin"
                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                取消
              </a>
            </div>
          </form>
        </div>
      </div>
      
      {/* Form Submit Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('studioForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              name: formData.get('name'),
              slug: formData.get('slug'),
              tagline: formData.get('tagline'),
              description: formData.get('description'),
              category: formData.get('category'),
              city: formData.get('city'),
              stage: formData.get('stage'),
              cover_image_url: formData.get('cover_image_url'),
              tags: formData.getAll('tags'),
              links: '[]'
            };
            
            try {
              const url = ${isEdit ? `'/admin/api/studios/${studio?.id}'` : "'/admin/api/studios'"};
              const method = ${isEdit ? "'PUT'" : "'POST'"};
              
              const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (res.ok) {
                window.location.href = '/admin';
              } else {
                const error = await res.json();
                alert('保存失败: ' + (error.error || '未知错误'));
              }
            } catch (error) {
              alert('保存失败: ' + error.message);
            }
          });
        `
      }} />
    </Layout>
  )
}
