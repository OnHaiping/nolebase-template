---
tags: 
comment: true
---
[文章来源](https://juejin.cn/post/7301193497247727652)

# 心路历程

>(可以不看)

不知道大家是如何进行笔记的，个人之前使用Typora，虽然已经购买了正版的账号，但是其比较"老旧"的功能，和想要将笔记放到网站上的想法，让我放弃了Typora。

之前尝试过通过git将笔记上传到Github，然后在手机上查看笔记，虽然没有什么问题，但是不是很美观(PS:~~吃饱了撑的~~)，

后面又选择了[Gmeek](https://meekdai.com/Gmeek.html)，但是又由于本人对数学公式的书写存在需求，不知道为什么从Typora上粘贴过来的数学公式在github上不能正常显示，又折腾了很长时间的[mathajx](https://www.mathjax.org/)，但还是有小BUG没解决(~~我太菜了~~)。

紧接着决定投身Obsidian，利用git、vitepress、vercel搭建自动化博客网站，这意味着只要我git上传到库，就可以自动更新网站，这真的很酷。

下面就是具体的流程

# 开始

如果你跟我一样嫌麻烦，直接就去[这个链接](https://github.com/Jackiexiao/nolebase-template)Fork一份到自己的GitHub仓库
![|750](imgs/Pasted%20image%2020240913184657.png)

然后在自己的本地拉取到一个文件夹下面
![|475](imgs/Pasted%20image%2020240913185447.png)

这样一来，就能在本地进行修改了
- 可以修改 metadata/index.ts 配置一下自己的网站信息
- 再修改一下 index.md 配置一下首页
- 修改 `.vitepress/creators.ts`, 添加你的 github 地址，这样的话，在每个文章下面的贡献者那里就能够链接到你的 github 首页（否则只是一个名字，无法点击）。

