---
tags:
comment: true
---
Docker 中安装 `frpc`

```powershell
docker run --name frpc --restart always --network host -e TZ=Asia/Shanghai -v ./frpc:/opt/frpc -d fatedier/frpc:v0.61.2 -c /opt/frpc/frpc.toml
```



