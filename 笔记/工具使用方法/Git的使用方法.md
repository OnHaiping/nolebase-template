---
tags: 
comment: true
---
## 初始化

初始化设置用户名和邮箱

```
git config --global user.name "Your Name"
git config --global user.emal "email@mail.com"
git config --global credential.helper store
```

查看当前配置

```
git config --global --list
```

### 创建仓库

创建一个新的本地仓库（省略project-name则在当前目录创建）

```
git init project-name
```

下载一个远程苍鹭

```
git clone <url>
```

### Git的四个区域

- **工作区（**Working Directory**）**

  就是你在电脑里能实际看到的目录。

- **暂存区（**Stage/Index**）**

  暂存区也叫索引， 用来临时存放未提交的内容， 一般在.git目录下的index中。

- **本地仓库（**Repository**）**

  Git在本地的版本库， 仓库信息存储在.git这个隐藏目录中。

- **远程仓库（**Remote Repository**）**

  托管在远程服务器上的仓库。 常用的有GitHub、 GitLab、 Gitee。

### Git的三种状态

- **已修改（**Modified**）**

  修改了但是没有保存到暂存区的文件。

- **已暂存（**Staged**）**

  修改后已经保存到暂存区的文件。

- **已提交（**Committed**）**

  把暂存区的文件提交到本地仓库后的状态

### 文件状态

| main/master | 默认主分支         |
| ----------- | ------------------ |
| Origin      | 默认远程仓库       |
| HEAD        | 指向当前分支的指针 |
| HEAD^       | 上一个版本         |
| HEAD~       | 上四个版本         |

### 特殊文件

| .git           | Git仓库的元数据和对象数据库        |
| -------------- | ---------------------------------- |
| .gitignore     | 忽略文件，不需要提交到仓库与的文件 |
| .gitattributes | 指向当前分支的指针                 |
| .gitkeep       | 使空目录被提交到仓库               |
| .gitmodules    | 记录子模块的信息                   |
| .gitconfig     | 记录仓库的配置信息                 |

## 基本命令

### 添加和提交

查看仓库状态

```
git status
```

添加一个文件到暂存区

```
git add <file>
```

- 可以使用通配符，例如：git add *.txt
- 可以使用目录，例如：git add .

添加所有文件到仓库

```
git add .		
```

提交

- 只提交 暂存区中的内容 不会提交工作区中的内容

```
git commit
```

- 提交所有暂存区的文件到仓库  -m 是指定提交的信息

```
git commit -m "message"
```

- 提交所有已修改的文件到仓库

```
git commit -am "message"
```

- 撤回提交的文件

```
git rm --cached <file>
```

查看提交日志

```
git log
```

![image-20240102204600461](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240102204600461.png)

![image-20240102204641316](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240102204641316.png)



误删了也不用怕

找到版本号 重置就好

```
git reflog 
git reset --hard xxxxx
```

![image-20240102210650709](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240102210650709.png)

![image-20240102210632476](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240102210632476.png)



### 查看状态和差异

- 查看仓库与状态，列出还未提交的新的或修改的文件。

```
git status		
```

- 查看提交历史，--online 代表简介模式

```
git log --online	
```

- 查看未暂存的文件更新了哪些部分

```
git diff
```

- 查看两个提交之间的差异

```
git diff <commit-id> <commit-id>
```

- 查看两个提交之间某一个文件的差异

```
git diff <commit-id> <commit-id> filename
```

- 查看暂存区的内容

```
git ls-files
```

### 撤销和恢复

- 移动一个文件到新的位置

```
git mv <file> <new-file>
```

从 工作区和暂存区删除一个文件，并且将这次删除放入暂存区

```
git rm <file>
```

从索引 / 暂存区中删除文件，但是本地工作区文件还在，知识不希望这个文件被版本控制

```
git rm --cached <file>
```

恢复一个文件到之前的版本

``` 
git checkout <file> <commit-id>
```

创建一个新的提交，用来撤销指定的提交，后者的所有变化都将被前者抵消，并且应用到当前分支。

```
git revert <commid-id>
```

重置当前分支的HEAD为之前的某个提交，并且删除所有之后的提交。

--hard 参数表示重置工作区和暂存区

--soft 参数表示重置暂存区

--mixed 参数表示重置工作区

```
git reset --hard <commit-id>
git reset --mixed <commit-id>
git reset --soft <commit-id>
```

撤销暂存区的文件，重新放回工作区( git add 的反向操作 )

```
git restore --staged <file>
```

### .gitignore忽略文件

应该忽略哪些文件?

- 系统或者软件自动生成的文件
- 编译产生的中间文件和结果文件
- 运行时生成日志文件、缓存文件、临时文件
- 涉及身份、密码、口令、密钥等敏感信息文件

> 提交到 .gitignore 不能是已经被添加到版本库中的文件

### .gitignore文件的匹配规则

从上到下逐行匹配，每一行表示一个忽略模式。

- 空行或者以 # 开头的行会被Git忽略。一行空行用于可读性的分隔，#一般用作注释
- 使用标准的 Blob 模式匹配，例如：
  - 星号 * 通配任意个字符
  - 问好 ？匹配单个字符
  - 中括号 [] 表示匹配列表中的单个字符，比如：[abc] 表示 a / b / c
- 两个星号 ** 表示匹配任意的中间目录
- 中括号可以使用短中线连接，比如：
  - [0-9] 表示任意一位数字，[a-z] 表示任意一位小写字母
- 感叹号 ! 表示取反

例子：

```
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 `TODO` 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 dov/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
".gitifnore" 17L, 383B
```


## 远程仓库

### 创建远程仓库及初始化

gitHub仓库创建

![image-20240104151047484](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151047484.png)

![image-20240104151117233](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151117233.png)

ssh 克隆工程 需要配置 ssh 密钥

![image-20240104151213166](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151213166.png)


生成 SSH Key 

```
ssh-keygen -t rsa -b 4096
```

- 私钥文件：id_rsa
- 公钥文件：id_rsa.pub

![image-20240104150857727](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104150857727.png)

配置ssh密钥到 GitHub

![image-20240104151327143](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151327143.png)

![image-20240104151342253](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151342253.png)

将生成的 id_rsa.pub 复制到 Key中

![image-20240104151420241](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151420241.png)


> 如果是之前配置过了，生成的时候 自己写一个文件的名字
>
> 并且配置下面五行

![image-20240104151622771](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104151622771.png)

### 基本命令

克隆仓库

```
git clone repo-address
```

推送更新内容

```
git push <remote> <branch>
```

拉取更新内容

```
git pull <remote>
```

#### 关联远程仓库

```
git remote add <远程仓库别名> <远程仓库地址>
git push -u <远程仓库名> <分支名>
```

![image-20240104153111138](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104153111138.png)

可以查看我们当前仓库所对应的远程仓库的别名和地址

```
git remote -v 
```

![image-20240104153137729](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104153137729.png)

指定默认的分支名称为 main

```
git branch -M main
```

把本地的 main 分支和远程的 origin 仓库与的 main 分支关联起来

```
git push -u origin main
```

![image-20240104153154812](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104153154812.png)

#### 拉取远程仓库内容

```
git pull <远程仓库名> <远程分支名>:<本地分支名>
```

* 远程分支名 和 本地分支名 相同可省略冒号后面的内容、

- 执行完 git pull 之后 Git 会自动为我们执行一次合并操作

从远程仓库获取内容 还可以使用 fetch 命令

区别：fetch 命令只是获取远程仓库的修改，不会自动合并

## 分支


**查看分支列表**

```
git branch
```

**创建分支**

```
 <branch-name>
```



**切换分支**

```
git checkout <branch-name>
git switch <branch-name>
```

gitcheck out 会有一些潜在的问题  默认是 切换分支

- 切换分支
- 恢复文件 -> 恢复到修改之前的状态

>如果分支名称和文件名称相同就会出现歧义

Git 2.23 版本之后有了新的 切换分支命令

```
git switch <branchname>
```


**恢复分支**

```
git checkout -b <branch-name> <commit-id>
```


**合并分支**

将不同的分支合并到当前分支中 

merge 后面的分支名称是将要被合并的分支 而我们当前所在的分支就是合并后的目标分支

如果要将 dev 分支 合并到 main 分支中，先将分支切换到 main 分支

```
git merge <branch>
```

**合并冲突问题**

两个分支未修改同一个文件的同一处位置：Git 自动合并

两个分支修改了同一个文件的同一处位置：产生冲突

解决方法：

```
Step1- 手动修改冲突文件，合并冲突内容
Step2- 添加暂存区 git add file
Step3- 提交修改 git commit -m "message"
```

中止合并：当不想继续执行合并操作时可以使用下面的命令来中止合并过程

```
git merge --abort
```


**查看分支图**

```
git log --graph --oneline --decorate --all
```

**alias 别名**

```
alias graph="git log --oneline --graph --decorate --all" // 直接使用别名 graph 查看图形化提交记录
```

**删除分支** 

- -d 表示删除已经完成合并的分支
- -D 表示强制删除分支

```
git branch -d <branch-name> 【已合并】
```

```
git branch -D <branch-name> 【未合并】
```



**变基（合并）**

```
git rebase <branch-name>
```

可以在任一分支上 执行 rebase

如果在 dev 分支上执行 rebase 操作，就找到 dev 分支和 main 分支共同的祖先，也就是 main3 这个提交记录，然后找到 main 上最新的提交记录 也就是 main5，从分叉点把整个分支都移动到目标分支的最新提交记录后面。

如果在 main 分支上执行 rebase 操作，就找到 dev 分支和 main 分支共同的组件，也还是 main3 这个提交记录，然后 main 分支从共同祖先到最新提交记录的所有提交内容，也就是 main4 main5 ，都移动到 dev 分支的最新提交。

![image-20240104191446455](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240104191446455.png)


Rebase 和 Merge 有什么区别，该如何区分使用？

Merge：

- 优点：不会破坏原分支的提交历史，方便回溯和查看。
- 缺点：会产生额外的提交节点，分支图比较复杂。

Rebase:

- 优点：不会新增额外的提交记录，形成线性历史，比较直观和干净
- 缺点：会改变提交历史，改变了当前分支 branch out 的节点。避免在共享分支使用。



Git 分支工作流模型

- GitFlow
- GitHubFlow
