---
tags: 
comment: true
---
首先是给 root 创建一个新的账号

```Shell
sudo passwd root
```

然后输入密码即可。

然后是编辑 ssh 配置文件（在树莓派和 ubuntu 下配置文件地址都是一样的）

```Shell
sudo vim /etc/ssh/sshd_config
```

调整 `PermitRootLogin` 参数值为 `yes`

同时将 `PasswordAuthentication yes` 前面的 `#` 号去掉即可

最后需要重启 `ssh` 服务。

```Shell
service sshd restart
```

