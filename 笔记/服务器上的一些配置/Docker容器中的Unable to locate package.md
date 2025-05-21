---
tags: 
comment: true
---
其原因在于

- 镜像中没有包缓存

解决方法如下：

直接先更新：

```cmd
apt-get update
```

然后使用 `-y` 跳过系统提示：

```cmd
apt-get -y install wget
```


