---
tags: 
comment: true
---
## Minicoda
### 服务器上创建文件夹

```
cd /
mkdir /miniconda
```

然后进入文件夹：

```
cd /miniconda
```

### 下载 miniconda （python 3 版本）

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

### 安装 miniconda

```
bash Miniconda3-latest-Linux-x86_64.sh
```

### 随后一直按住回车，读完须知，然后会出现

```shell
Please answer 'yes' or 'no':'
>>> yes
-- 填入yes
```

### 取消默认进入 base 环境

```
conda config --set auto_activate_base false
```

### 卸载 miniconda

```
conda install anaconda-clean 
anaconda-clean --yes
```

可能会让用 `sudo`。

然后删除相关路径：

```
rm -rf <miniconda_install_dir>
```

> [!important]
> 慎用此命令，确保路径是正确的。

