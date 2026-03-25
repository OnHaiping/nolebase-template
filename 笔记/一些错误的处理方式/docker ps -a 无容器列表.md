## 问题现象

在使用 Docker 的过程中，突然发现运行 `docker ps -a` 命令时输出为空，之前运行的大量容器离奇“消失”，连停止状态的容器也全部不见了。

## 问题原因

经过底层排查发现，容器数据并没有丢失（`/var/lib/docker/containers/` 目录下文件完好），根本原因是**系统中同时存在两个版本的 Docker**：
1. **标准版 (Apt 安装)**：守护着所有的历史容器数据，默认数据目录为 `/var/lib/docker`。
2. **Snap 版**：由于终端输错命令时的系统误导提示，或安装某些依赖时被后台静默安装。它指向了一个全新的、空的数据目录（`/var/snap/...`）。

由于环境变量优先级或服务套接字的抢占机制，在终端执行 `docker` 命令时，系统优先调用了 Snap 版的空壳环境，导致原本的容器“隐身”了。

## 解决步骤

为了找回容器，我们需要停用 Snap 版 Docker，修复被破坏的通信套接字，并重新唤醒标准版 Docker。
### 1. 停用 Snap 版 Docker

释放它占用的资源和接管的命令入口：

```bash
sudo snap disable docker
```
### 2. 清理损坏的通信套接字 (Socket)

停用 Snap 版后，它原先接管的 `/var/run/docker.sock` 会变成一个失效的占位文件或死链接，导致标准版 Docker 启动时报错 `Cannot connect to the Docker daemon`。我们需要将其清理掉：

```bash
sudo rm -rf /var/run/docker.sock
```
### 3. 重启标准版 Docker 服务及 Socket

让 systemd 重新生成正常的通信管道，并让标准版服务重新接管：

```bash
sudo systemctl restart docker.socket
sudo systemctl restart docker
```
### 4. 验证容器是否恢复

再次查看容器列表，此时所有历史容器应该已经全部回归：

```bash
docker ps -a
```
### 5. 斩草除根（强烈建议）

确认所有容器数据安全无误后，彻底卸载 Snap 版 Docker，防止系统更新再次将其唤醒：

```bash
sudo snap remove docker
```