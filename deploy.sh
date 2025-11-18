#!/bin/bash

# Studio Network - Cloudflare Pages 自动部署脚本
# 使用前请确保已在 Deploy 标签页设置 Cloudflare API Key

set -e  # 遇到错误立即退出

echo "🚀 Studio Network - Cloudflare Pages 部署脚本"
echo "=============================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目名称
PROJECT_NAME="studio-network"
DB_NAME="studio-network-production"

# 切换到项目目录
cd /home/user/webapp

echo -e "${BLUE}📍 当前目录: $(pwd)${NC}"
echo ""

# 步骤 1: 检查 wrangler 是否可用
echo -e "${YELLOW}步骤 1/7: 检查 Cloudflare 认证...${NC}"
if ! npx wrangler whoami >/dev/null 2>&1; then
    echo -e "${RED}❌ Cloudflare 认证失败${NC}"
    echo -e "${YELLOW}请先在 Deploy 标签页设置 Cloudflare API Key${NC}"
    echo -e "${YELLOW}然后运行: setup_cloudflare_api_key${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Cloudflare 认证成功${NC}"
echo ""

# 步骤 2: 检查数据库是否存在
echo -e "${YELLOW}步骤 2/7: 检查 D1 数据库...${NC}"
if npx wrangler d1 list | grep -q "$DB_NAME"; then
    echo -e "${GREEN}✅ 数据库 $DB_NAME 已存在${NC}"
else
    echo -e "${YELLOW}⚠️  数据库不存在，正在创建...${NC}"
    npx wrangler d1 create $DB_NAME
    echo -e "${RED}⚠️  重要：请复制上面输出的 database_id${NC}"
    echo -e "${RED}     并手动更新到 wrangler.jsonc 文件的 database_id 字段${NC}"
    echo -e "${YELLOW}     更新后按回车继续...${NC}"
    read -p ""
fi
echo ""

# 步骤 3: 检查迁移文件
echo -e "${YELLOW}步骤 3/7: 检查数据库迁移...${NC}"
if [ ! -d "migrations" ]; then
    echo -e "${YELLOW}⚠️  未找到 migrations 目录，正在创建...${NC}"
    mkdir -p migrations
    
    # 创建初始迁移文件
    cat > migrations/0001_initial_schema.sql << 'EOF'
-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'concept',
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT 'tag',
  usage_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

-- Create studios table
CREATE TABLE IF NOT EXISTS studios (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  category TEXT,
  city TEXT,
  stage TEXT,
  cover_image_url TEXT,
  links TEXT DEFAULT '[]',
  status TEXT DEFAULT 'published',
  owner_id TEXT,
  claimed_at DATETIME,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  CHECK (length(name) >= 2),
  CHECK (length(tagline) <= 50 OR tagline IS NULL)
);

-- Create studio_tags table
CREATE TABLE IF NOT EXISTS studio_tags (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  studio_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(studio_id, tag_id)
);

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  studio_id TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  sort_order INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved',
  FOREIGN KEY (studio_id) REFERENCES studios(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_studios_slug ON studios(slug);
CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status);
CREATE INDEX IF NOT EXISTS idx_studio_tags_studio ON studio_tags(studio_id);
CREATE INDEX IF NOT EXISTS idx_studio_tags_tag ON studio_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_images_studio ON images(studio_id, sort_order);
EOF
    echo -e "${GREEN}✅ 迁移文件已创建${NC}"
fi

# 应用迁移
echo -e "${YELLOW}正在应用数据库迁移...${NC}"
npx wrangler d1 migrations apply $DB_NAME
echo -e "${GREEN}✅ 数据库迁移完成${NC}"
echo ""

# 步骤 4: 构建项目
echo -e "${YELLOW}步骤 4/7: 构建项目...${NC}"
npm run build
echo -e "${GREEN}✅ 项目构建完成${NC}"
echo ""

# 步骤 5: 检查 Pages 项目是否存在
echo -e "${YELLOW}步骤 5/7: 检查 Cloudflare Pages 项目...${NC}"
if npx wrangler pages project list | grep -q "$PROJECT_NAME"; then
    echo -e "${GREEN}✅ Pages 项目 $PROJECT_NAME 已存在${NC}"
else
    echo -e "${YELLOW}⚠️  Pages 项目不存在，正在创建...${NC}"
    npx wrangler pages project create $PROJECT_NAME \
      --production-branch main \
      --compatibility-date 2025-11-15
    echo -e "${GREEN}✅ Pages 项目创建成功${NC}"
fi
echo ""

# 步骤 6: 部署到 Cloudflare Pages
echo -e "${YELLOW}步骤 6/7: 部署到 Cloudflare Pages...${NC}"
DEPLOY_OUTPUT=$(npx wrangler pages deploy dist --project-name $PROJECT_NAME 2>&1)
echo "$DEPLOY_OUTPUT"

# 提取部署 URL
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^ ]+\.pages\.dev' | head -1)

if [ -n "$DEPLOY_URL" ]; then
    echo -e "${GREEN}✅ 部署成功！${NC}"
    echo -e "${GREEN}🌐 部署 URL: $DEPLOY_URL${NC}"
else
    echo -e "${YELLOW}⚠️  无法提取部署 URL，请检查上方输出${NC}"
fi
echo ""

# 步骤 7: 提示绑定数据库
echo -e "${YELLOW}步骤 7/7: 绑定 D1 数据库到 Pages 项目${NC}"
echo -e "${YELLOW}请在 Cloudflare Dashboard 中完成以下操作：${NC}"
echo -e "1. 访问: https://dash.cloudflare.com"
echo -e "2. 进入 Pages 项目: $PROJECT_NAME"
echo -e "3. 进入 Settings > Functions > D1 database bindings"
echo -e "4. 添加绑定："
echo -e "   - Variable name: ${BLUE}DB${NC}"
echo -e "   - D1 database: ${BLUE}$DB_NAME${NC}"
echo ""

# 完成
echo -e "${GREEN}=============================================="
echo -e "🎉 部署流程完成！${NC}"
echo -e "${GREEN}=============================================="
echo ""
echo -e "${BLUE}📊 部署摘要:${NC}"
echo -e "  项目名称: $PROJECT_NAME"
echo -e "  数据库: $DB_NAME"
if [ -n "$DEPLOY_URL" ]; then
    echo -e "  部署 URL: $DEPLOY_URL"
fi
echo ""
echo -e "${YELLOW}⚠️  记得在 Cloudflare Dashboard 中绑定 D1 数据库！${NC}"
echo ""
