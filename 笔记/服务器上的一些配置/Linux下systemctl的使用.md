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

编写服务配置文件

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

