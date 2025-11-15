import type { Studio, Tag } from '../types'
import { Layout } from '../components/Layout'

export function AdminDashboard({ 
  studios, 
  tags 
}: { 
  studios: Studio[]
  tags: Tag[]
}) {
  return (
    <Layout>
      <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold">管理后台</h1>
          <a 
            href="/admin/new"
            class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            <i class="fas fa-plus mr-2"></i>
            添加工作室
          </a>
        </div>
        
        {/* Stats Cards */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">工作室总数</p>
                <p class="text-3xl font-bold text-indigo-600">{studios.length}</p>
              </div>
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <i class="fas fa-store text-indigo-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">标签总数</p>
                <p class="text-3xl font-bold text-purple-600">{tags.length}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="fas fa-tags text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">总浏览量</p>
                <p class="text-3xl font-bold text-green-600">
                  {studios.reduce((sum, s) => sum + s.view_count, 0)}
                </p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-eye text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Studios Table */}
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-bold">工作室列表</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    品类
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    城市
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    浏览
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {studios.map(studio => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        {studio.cover_image_url && (
                          <img 
                            src={studio.cover_image_url} 
                            alt={studio.name}
                            class="w-10 h-10 rounded object-cover mr-3"
                          />
                        )}
                        <div>
                          <div class="text-sm font-medium text-gray-900">
                            {studio.name}
                          </div>
                          <div class="text-sm text-gray-500 truncate max-w-xs">
                            {studio.tagline}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                        {studio.category || '-'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {studio.city || '-'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {studio.view_count}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`px-2 py-1 text-xs font-medium rounded ${
                        studio.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {studio.status}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <a 
                        href={`/studio/${studio.slug}`}
                        target="_blank"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        查看
                      </a>
                      <a 
                        href={`/admin/edit/${studio.slug}`}
                        class="text-blue-600 hover:text-blue-900"
                      >
                        编辑
                      </a>
                      <button 
                        onclick={`if(confirm('确定要删除吗？')) deleteStudio('${studio.id}')`}
                        class="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {studios.length === 0 && (
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-inbox text-6xl mb-4 opacity-20"></i>
              <p class="text-xl">暂无工作室</p>
              <a 
                href="/admin/new"
                class="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                添加第一个工作室
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Studio Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          async function deleteStudio(id) {
            try {
              const res = await fetch('/admin/api/studios/' + id, {
                method: 'DELETE'
              });
              if (res.ok) {
                window.location.reload();
              } else {
                alert('删除失败');
              }
            } catch (error) {
              alert('删除失败: ' + error.message);
            }
          }
        `
      }} />
    </Layout>
  )
}
