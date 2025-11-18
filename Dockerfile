# Studio Network - Production Dockerfile
# 用于境内服务器部署

FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci --production=false

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

# 启动应用
# 使用 wrangler pages dev 作为生产服务器
CMD ["npx", "wrangler", "pages", "dev", "dist", "--port", "3000", "--ip", "0.0.0.0", "--local"]
