# Studio Network 境内部署快速指南

## 🚀 5分钟快速部署

### 前提条件

1. **境内服务器**（选择任一）
   - 阿里云 ECS
   - 腾讯云 CVM
   - 华为云 ECS
   - 其他 VPS

2. **操作系统**
   - Ubuntu 20.04+ / Debian 10+
   - CentOS 7+ / Rocky Linux 8+

3. **基础配置**
   - 最低配置：1核2G内存
   - 推荐配置：2核4G内存
   - 磁盘空间：至少10GB

### 第一步：安装 Docker

#### Ubuntu/Debian
```bash
# 更新包索引
sudo apt-get update

# 安装依赖
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# 添加 Docker 仓库
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

# 安装 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 安装 Docker Compose
sudo curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
docker-compose --version
```

#### CentOS/Rocky Linux
```bash
# 安装依赖
sudo yum install -y yum-utils

# 添加 Docker 仓库
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装 Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 安装 Docker Compose
sudo curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
docker-compose --version
```

### 第二步：部署应用

```bash
# 1. 克隆项目（如果没有 git，先安装：sudo apt-get install git）
git clone https://github.com/your-username/studio-network.git
cd studio-network

# 2. 运行部署脚本
chmod +x deploy-cn.sh
sudo ./deploy-cn.sh

# 选择选项 1（Docker Compose 完整部署）

# 3. 等待部署完成（约3-5分钟）
```

### 第三步：访问应用

部署完成后，通过以下地址访问：

- **HTTP**: http://your-server-ip
- **应用端口**: http://your-server-ip:3000

例如：
- http://123.456.789.101
- http://123.456.789.101:3000

### 第四步：配置域名（可选）

如果您有域名：

1. **DNS 解析**
   ```
   A记录：yourdomain.com → your-server-ip
   A记录：www.yourdomain.com → your-server-ip
   ```

2. **更新 Nginx 配置**
   ```bash
   # 编辑 nginx.conf
   nano nginx.conf
   
   # 找到 server_name 行，修改为：
   # server_name yourdomain.com www.yourdomain.com;
   
   # 保存并重启 Nginx
   sudo docker-compose restart nginx
   ```

3. **配置 SSL（推荐）**
   ```bash
   # 安装 certbot
   sudo apt-get install certbot
   
   # 获取证书
   sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
   
   # 证书位置：
   # /etc/letsencrypt/live/yourdomain.com/fullchain.pem
   # /etc/letsencrypt/live/yourdomain.com/privkey.pem
   
   # 复制证书到项目
   mkdir -p ssl
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/
   
   # 启用 HTTPS（取消 nginx.conf 中 HTTPS 部分的注释）
   # 重启服务
   sudo docker-compose restart
   ```

---

## 🔧 常用管理命令

### 查看服务状态
```bash
cd studio-network
sudo docker-compose ps
```

### 查看日志
```bash
# 查看所有服务日志
sudo docker-compose logs -f

# 仅查看应用日志
sudo docker-compose logs -f studio-network

# 仅查看 Nginx 日志
sudo docker-compose logs -f nginx
```

### 重启服务
```bash
# 重启所有服务
sudo docker-compose restart

# 仅重启应用
sudo docker-compose restart studio-network

# 仅重启 Nginx
sudo docker-compose restart nginx
```

### 停止服务
```bash
sudo docker-compose down
```

### 更新代码并重新部署
```bash
# 1. 停止服务
sudo docker-compose down

# 2. 拉取最新代码
git pull origin main

# 3. 重新构建并启动
sudo docker-compose up -d --build

# 4. 查看日志确认
sudo docker-compose logs -f
```

### 备份数据
```bash
# 数据库文件位置
sudo cp -r ./data /backup/studio-network-$(date +%Y%m%d)

# 或打包备份
sudo tar -czf studio-network-backup-$(date +%Y%m%d).tar.gz ./data
```

---

## 🛡️ 安全配置

### 配置防火墙

#### Ubuntu/Debian (ufw)
```bash
# 启用防火墙
sudo ufw enable

# 允许 SSH
sudo ufw allow 22/tcp

# 允许 HTTP
sudo ufw allow 80/tcp

# 允许 HTTPS
sudo ufw allow 443/tcp

# 查看状态
sudo ufw status
```

#### CentOS/Rocky (firewalld)
```bash
# 启动防火墙
sudo systemctl start firewalld
sudo systemctl enable firewalld

# 允许 HTTP 和 HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# 重载配置
sudo firewall-cmd --reload

# 查看状态
sudo firewall-cmd --list-all
```

### 云服务器安全组

在云服务商控制台配置安全组规则：

| 协议 | 端口 | 来源 | 说明 |
|-----|------|------|------|
| TCP | 22 | 你的IP | SSH 登录 |
| TCP | 80 | 0.0.0.0/0 | HTTP 访问 |
| TCP | 443 | 0.0.0.0/0 | HTTPS 访问 |
| TCP | 3000 | 127.0.0.1/32 | 应用端口（仅本地） |

---

## 📊 性能优化

### 1. Docker 镜像优化
```bash
# 使用阿里云 Docker 镜像加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://registry.docker-cn.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 2. Nginx 缓存配置

已在 `nginx.conf` 中配置：
- 静态资源缓存 1 年
- Gzip 压缩
- HTTP/2 支持

### 3. 数据库优化

数据库文件会持久化到 `./data` 目录，定期备份即可。

---

## ❓ 常见问题

### Q1: 部署后无法访问？

检查清单：
1. 防火墙是否开放端口？
2. 云服务器安全组是否配置？
3. Docker 服务是否正常运行？`sudo docker-compose ps`
4. 查看日志排查错误：`sudo docker-compose logs`

### Q2: 如何查看数据库内容？

```bash
# 进入应用容器
sudo docker exec -it studio-network sh

# 查看数据库
ls -la /app/.wrangler/state/v3/d1/

# 使用 SQLite 查看（需要安装 sqlite3）
sudo apt-get install sqlite3
sqlite3 ./data/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite
```

### Q3: 如何升级应用？

```bash
cd studio-network
sudo docker-compose down
git pull origin main
sudo docker-compose up -d --build
```

### Q4: 端口被占用怎么办？

```bash
# 查找占用端口的进程
sudo lsof -i :80
sudo lsof -i :3000

# 结束进程
sudo kill -9 <PID>

# 或修改 docker-compose.yml 中的端口映射
```

---

## 📞 获取帮助

- 📖 完整文档：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 📖 项目文档：[README.md](./README.md)
- 🐛 问题反馈：[GitHub Issues](https://github.com/your-repo/issues)

---

**祝您部署顺利！** 🎉
