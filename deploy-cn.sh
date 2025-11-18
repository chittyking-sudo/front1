#!/bin/bash
# Studio Network - 境内服务器部署脚本

set -e

echo "🚀 Studio Network 境内服务器部署脚本"
echo "======================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker 未安装，请先安装 Docker${NC}"
    echo "安装命令："
    echo "  Ubuntu/Debian: sudo apt-get install docker.io docker-compose"
    echo "  CentOS: sudo yum install docker docker-compose"
    exit 1
fi

echo -e "${GREEN}✅ Docker 已安装${NC}"

# 检查 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose 未安装${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker Compose 已安装${NC}"

# 选择部署方式
echo ""
echo "请选择部署方式："
echo "1) Docker Compose（推荐，包含 Nginx）"
echo "2) 仅 Docker 容器"
echo "3) 构建镜像但不启动"
read -p "请输入选项 (1-3): " deploy_option

case $deploy_option in
    1)
        echo -e "${YELLOW}📦 使用 Docker Compose 部署...${NC}"
        
        # 停止旧容器
        echo "停止旧容器..."
        docker-compose down 2>/dev/null || true
        
        # 构建并启动
        echo "构建并启动服务..."
        docker-compose up -d --build
        
        # 等待服务启动
        echo "等待服务启动..."
        sleep 10
        
        # 检查服务状态
        echo ""
        echo "服务状态："
        docker-compose ps
        
        echo ""
        echo -e "${GREEN}✅ 部署完成！${NC}"
        echo ""
        echo "访问地址："
        echo "  - HTTP: http://localhost"
        echo "  - 应用端口: http://localhost:3000"
        echo ""
        echo "管理命令："
        echo "  查看日志: docker-compose logs -f"
        echo "  重启服务: docker-compose restart"
        echo "  停止服务: docker-compose down"
        ;;
        
    2)
        echo -e "${YELLOW}📦 使用 Docker 容器部署...${NC}"
        
        # 停止旧容器
        echo "停止并删除旧容器..."
        docker stop studio-network 2>/dev/null || true
        docker rm studio-network 2>/dev/null || true
        
        # 构建镜像
        echo "构建 Docker 镜像..."
        docker build -t studio-network:latest .
        
        # 创建数据目录
        mkdir -p ./data
        
        # 启动容器
        echo "启动容器..."
        docker run -d \
            --name studio-network \
            -p 3000:3000 \
            -v $(pwd)/data:/app/.wrangler \
            --restart unless-stopped \
            studio-network:latest
        
        # 等待服务启动
        echo "等待服务启动..."
        sleep 10
        
        # 检查容器状态
        echo ""
        echo "容器状态："
        docker ps | grep studio-network
        
        echo ""
        echo -e "${GREEN}✅ 部署完成！${NC}"
        echo ""
        echo "访问地址: http://localhost:3000"
        echo ""
        echo "管理命令："
        echo "  查看日志: docker logs -f studio-network"
        echo "  重启容器: docker restart studio-network"
        echo "  停止容器: docker stop studio-network"
        ;;
        
    3)
        echo -e "${YELLOW}📦 仅构建 Docker 镜像...${NC}"
        docker build -t studio-network:latest .
        echo -e "${GREEN}✅ 镜像构建完成！${NC}"
        echo ""
        echo "启动命令："
        echo "  docker run -d -p 3000:3000 --name studio-network studio-network:latest"
        ;;
        
    *)
        echo -e "${RED}❌ 无效的选项${NC}"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "🎉 部署流程完成！"
echo ""
echo "下一步："
echo "1. 访问应用检查是否正常运行"
echo "2. 配置域名和 SSL 证书（生产环境）"
echo "3. 设置防火墙规则"
echo "4. 配置备份策略"
echo ""
echo "文档："
echo "  完整部署指南: DEPLOYMENT.md"
echo "  项目文档: README.md"
