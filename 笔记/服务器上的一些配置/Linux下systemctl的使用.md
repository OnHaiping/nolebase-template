---
tags: 
comment: true
time:
---
## 创建服务

首先创建服务文件 `.service`

```bash
sudo vim /etc/systemd/system/coder.service
```

编写服务配置

```bash
[Unit]
Description=Coder Server
After=network.target

[Service]
# 替换为实际运行用户（例如 ctia 或你的用户名）
User=user
# 替换为 coder 可执行文件的完整路径（可通过 which coder 查看）
ExecStart=/usr/local/bin/coder server
Restart=always
RestartSec=5
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

[Install]
WantedBy=multi-user.target
```

启动服务并设置开机自启动

```bash
# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start coder

# 设置开机自启动
sudo systemctl enable coder
```

## 常用的管理命令

```bash
# 查看服务状态
sudo systemctl status coder

# 停止服务
sudo systemctl stop coder

# 重启服务
sudo systemctl restart coder

# 查看服务日志
journalctl -u coder -f
```

