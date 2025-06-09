---
tags: 
comment: true
---
> [!important]
> 注意，目前在树莓派 4 b 上使用 `root` 安装 `miniconda`，会导致 `Illegal instruction` 的错误，解决方法是替换 `/usr/lib/libcrypto.so.1.1`，但是此方法治标不治本，建议以后的树莓派上不使用 `root` 安装 `miniconda`，或者一律安装 `Anaconda`
> 
> 在安装 Anaconda 之后，在基础 base 环境中是没有问题的，但是如果创建新的虚拟环境，依然会遇到此错误。
> 
> 目前发现的解决方案是：
> 
> ```Shell
> wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh -O ~/miniforge.sh
> bash ~/miniforge.sh -b -p ~/miniforge
> 
> echo "PATH=$PATH:$HOME/miniforge/bin" >> .bashrc
> 
> ```
> 
> 然后 conda init
> 
> 解决方案来自于[elejke](https://gist.github.com/elejke/3437be39478c66a3efac26700cb14334)

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

在安装之前先用 `uname -a` 查看一下 `Linux` 的版本

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

或者直接去官网找其他版本的 conda：

[官网连接](https://repo.anaconda.com/)

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

### 配置环境变量

如果出现 `bash: conda: command not found`。那就是环境变量有问题。

用下面的指令配置环境变量：

#### 编辑配置文件

```
vim ~/.bashrc
```

#### 文末添加 conda 路径

```
export PATH=<conda_install_dir>/bin:$PATH
```

打开文件后按i进入编辑模式，按Esc退出编辑模式，shift+冒号然后输入wq 保存文件并退出.

#### 激活环境变量

```
source ~/.bashrc
```

可能需要重开一个 ssh 链接才会生效。


