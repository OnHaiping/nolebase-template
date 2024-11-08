---
tags: 
comment: true
---
## 微信小程序

### 1 注册微信小程序账号


```python
# 1 访问微信公众平台，注册一个微信小程序账号
	-https://mp.weixin.qq.com/
        
# 2 重点：注册使用邮箱注册
	未被微信公众平台注册，未被微信开放平台注册，未被个人微信号绑定的邮箱
```

### 2 创建微信小程序项目

#### 2.1 创建项目流程（开发者）

```python
# 1 获取 小程序id
	-小程序后台--》开发--》开发管理--》开发设置--》开发者ID
    -AppID(小程序ID)	     wx539e097341fc7588
    
    
# 2 下载微信开发者工具--》这个工具必须联网才能使用
	-下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html
    -wechat_devtools_1.06.2402040_win32_x64.exe
    
# 3 一路下一步安装--》桌面有个快捷方式
	-微信开发者工具就等同于 pycharm
	
```





![image-20240401204708959](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401204708959.png)

![image-20240401204843951](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401204843951.png)

![image-20240401171756755](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401171756755.png)

![image-20240401171823876](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401171823876.png)

![image-20240401205141964](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401205141964.png)

#### 2.2 创建项目

```python
# 1 双击 微信开发者工具

# 2 微信扫码--》登录

# 3 创建项目
	-填写名字
    -路径
    -APPID
    -不使用云开发【使用腾讯云的云函数，服务器等等，需要花钱】
    -不使用模版
    	-可以选择js基础版--》别的别选了
        	-TS：咱们不会
            -其他模版功能比较复杂对新手不友好
            
            
# 4 基础设置
	-设置--》编辑器设置--》改变字体大小
    -视图--》外观--》移动模拟器位置
    -可以勾选掉不显示：模拟器，调试器等
```

![image-20240401172015541](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401172015541.png)

![image-20240401172035213](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401172035213.png)

![image-20240401172457001](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401172457001.png)

![image-20240401173007494](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401173007494.png)

![image-20240401173252969](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401173252969.png)



![image-20240401210031630](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401210031630.png)

#### 2.3 本地开发支持http

```python
# -微信小程序默认不支持http、wss--》修改一下--》微信小程序配置
    	-让小程序支持 http wss 协议
```

![image-20240401212012755](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401212012755.png)

### 3 项目目录结构

#### 3.1 项目目录结构

#### 3.1.1 目录介绍

```python
# 1 项目主配置文件，在项目根路径下，控制整个项目的
	-app.js    # 小程序入口文件，小程序启动，会执行这个js
    -app.json  # 小程序的全局配置：顶部的颜色，标题。。。
    -app.wxss  # 小程序全局样式：所有样式，全局生效
    
    # app.js 和app.json 必须有，没有不行
    
    
# 2 页面文件
	-pages文件夹下，有一个个的文件夹（index,login,register）-->每个文件夹下有4个文件
    	-xx.js     # 页面逻辑，js代码控制
        -xx.wxml   # 页面结构，布局，html---》wxml就等同于html，但标签有些区别
        -xx.json   # 页面配置，当前页面顶部颜色，标题。。
        -xx.wxss   # 页面的样式，如果全局样式也有，以当前页面为准
    # xx.js和xx.wxml 必须得，不能没有
    
    
# 3 其他的不重要
```

```python
├── components                  【页面中使用的组件】
├── pages   					【页面文件目录】
│   ├── index					【页面】
│   │   ├── index.js				【页面JS】
│   │   ├── index.json				【页面配置】
│   │   ├── index.wxml				【页面HTML】
│   │   └── index.wxss				【页面CSS】
│   └── logs					【页面】
│       ├── logs.js					...
│       ├── logs.json				...
│       ├── logs.wxml				...
│       └── logs.wxss				...
├── utils						【自定义工具】
│	└── utils.js					【功能的定义】
├── app.js						【全局JS】
├── app.json					【全局配置】
├── app.wxss					【全局CSS】
├── project.config.json			【开发者工具默认配置】
├── project.private.config.json	【开发者工具用户配置,在这里修改，优先用这个，可以删除】
├── .eslintrc.js				【ESlint语法检查配置】
├── sitemap.json				【微信收录页面，用于搜索，上线后，搜索关键字就可以搜到我们】
```

#### 3.1.2 配置文件

##### 3.1.2.1 项目配置app.json

```python
#1 小程序全局配置文件，用于配置小程序的一些全局属性和页面路由,默认标题，顶部颜色，是否有下拉刷新。。

#2 配置参考地址
https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html
    
    
# 3 部分参数演示
    entryPagePath：小程序默认启动首页	
    pages: 小程序总共有多少个页面
    window：全局的默认窗口表现，顶部颜色，是否有下拉，它控制很多东西，这个经常用
```

![image-20240401213627513](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401213627513.png)

##### 3.1.2.2 页面配置 xx.json

```python
# 1 小程序页面配置文件，也称局部配置文件，用于配置当前页面的窗口样式、页面标题等
# 2 app.json 中的部分配置，也支持对单个页面进行配置，可以在页面对应的 xx.json 文件来对本页面的表现进行配置。

# 3 页面中配置项在当前页面会覆盖 app.json 中相同的配置项（样式相关的配置项属于 app.json 中的 window 属性，但这里不需要额外指定 window 字段），具体的取值和含义可参考全局配置文档中说明


# 4 参考文档：
https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html
    
# 5 常用的
navigationBarBackgroundColor	# 导航栏背景颜色，如 #000000	
navigationBarTextStyle	#      导航栏标题、状态栏颜色，仅支持 black / white	
navigationBarTitleText	#   导航栏标题文字内容
```

##### 3.1.2.3  工程配置

```python
#1  project.config.json      project.private.config.json	
#2  小程序项目的配置文件，用于保存项目的一些配置信息和开发者的个人设置
#3 project.private.config.json项目私有配置文件。此文件中的内容将覆盖 project.config.json 中的相同字段

# 4 参照文档
https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html
```

#### 3.2 webview渲染

##### 3.2.1 webview和skyline渲染模式

```python
# webview：老一点，稳定，支持老版本和新版本
# skyline： 新一点，不太稳定，不支持老版本

# 调成webview模式，更稳定一些

# 项目配置---》app.json-->删除3个配置

"renderer": "skyline",
    "rendererOptions": {
        "skyline": {
            "defaultDisplayBlock": true,
            "disableABTest": true,
            "sdkVersionBegin": "3.0.0",
            "sdkVersionEnd": "15.255.255"
        }
    },
        "componentFramework": "glass-easel",
```

#### 3.3 新建页面

```python
# 1 app.json中只有一个页面--》小程序--》只有一个页面
	-后期增加页面
    
    
####增加页面方式一#####
	1 在pages上右键--》新建文件夹
    2 在新建的文件夹上--》右键--》新建Page
    3 多出4个文件
    	xx.js
        xx.wxml
        xx.json
        xx.wxss
    4 在app.json中的page中多一行
        "pages": [
            "pages/index/index",
            "pages/login/login"
          ]
#### 增加页面方式二#### 
	1 在 app.json中，pages中，新增一行
    2 会自动创建文件夹和页面
    	
```

![image-20240401215426594](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401215426594.png)



#### 3.4 启动页面调整

```python
## 1 修改小程序一启动，显示的页面

## 方式一：在app.json中的pages中修改顺序，第一个先显示
  "pages": [
    "pages/index/index",
    "pages/login/login",
    "pages/register/register"
  ],
        
## 方式二：通过entryPagePath配置：entryPagePath：小程序默认启动首页	
"entryPagePath": "pages/index/index",  # 居多
    
 
###方式三：临时用--》写了个页面，临时看一下
	-添加编译模式
    
```

![image-20240401220224149](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240401220224149.png)

#### 3.5 纯净项目

```python
# 把项目不要的东西都删除--》只留核心--》开发

# # # # # app.json# # # # ## # # # #
{
  "pages": [  
    "pages/index/index"  # 就一个页面
    
  ],
  "window": {
    "navigationBarTitleText": "功能演示",   # 标题
    "navigationBarBackgroundColor": "#0000FF", #颜色
    "enablePullDownRefresh": false,  # 是否带下拉刷新
    "backgroundColor": "#00FFFF",    # 下拉刷新颜色
    "backgroundTextStyle": "dark"    # light ，下拉刷新的点点什么颜色
  },
  "style": "v2",
}

# # # # #app.wxss  空的# # # # ## # # # #

# # # # #app.js# # # # ## # # # #
App({})

# # # # #pages/index# # # # ## # # # #
    index.js
    	Page({})
    index.json
        {
          "usingComponents": {

          },
          "navigationBarTitleText": "登录页面", 
          "navigationBarBackgroundColor": "#FFFF00",
          "enablePullDownRefresh": true,   
          "backgroundTextStyle": "light" 
        }
    index.wxml
      <view class="container">
        彭于晏--呸呸呸
      </view>
    index.wxss
    	-空的
```

### 4 快速上手

#### 4.1 小程序常用组件

```python
#1 做过html
	a标签
    div标签
    span标签
    img标签
    。。。
    
# 2 小程序没有这些，自己封装的叫组件
	-https://developers.weixin.qq.com/miniprogram/dev/component/
        
        
# 3 text  ---》span 不换行，放文字
<text>我是首页</text>
<text>我是首页333</text>
<text>我是首页444</text>


# 4 view--》div  换行
<view>我是view</view>
<view>我是view222</view>
<view><text>撒东方闪电</text></view>

# 5 image 标签---》img
<image src="/images/b.jpg" style="width: 750rpx;height: 400rpx;"></image>


# 6 icon
<icon type="success_no_circle"  color="red"/>
<icon type="cancel" color="#ddd"/>
```

#### 4.2 tabbar配置

```python
# 在底部或在顶部的 tab页
	-几乎所有小程序都会有这个
    
    
# 如何设置
1 在app.json 配置
"tabBar": {
    "selectedColor": "#b4282d",
    "position": "bottom",
    "list": [
        {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "images/home.png",
            "selectedIconPath": "images/home_select.png"
        },
        {
            "pagePath": "pages/my/my",
            "text": "我的",
            "iconPath": "images/my.png",
            "selectedIconPath": "images/my_select.png"
        }
    ]
},
    
2 创建页面 my

3 把图片复制到images目录下
```

### 5 wxml语法

#### 5.1模版语法

```python
#  1 在页面 xx.js 的 Page() 方法的 data 对象中进行声明定义
#  2 在xx.wxml 中使用 {{}} 包裹，显示数据
#  3 可以显示如下，不能编写js语句或js方法
	-变量
	-算数运算
	-三元运算
	-逻辑判断
    
    
# 4 如果在js中，改了变量的值，想让页面也发生变化，需要使用this.setData({key:变化后的值})
# 5 修改数字案例
#######wxml#######

<view>
<view>姓名是：{{name}}</view>
<view>年龄是：{{age}}</view>
<button type="primary" bindtap="handleAddAge">点我年龄+1</button>
</view>
########## js###########
Page({
  data:{
    name:'justin',
    age:19
  },
  handleAddAge(){
    // 1 如何取到data中的age
    // console.log(this.data.age)


    // 2 让年龄+1
    // this.data.age+=1
    // console.log(this.data.age)



    // 3 默认数据，不是响应式--》js 变量变化了，页面没有变化


    // 4 要让页面也变，借助于微信提供的 setData方法
    let a=this.data.age+1
    this.setData({
      age:a
    })

  }
})
# 6 修改对象案例，修改单个，修改多个
####js######
data:{
    userinfo:{name:'lqz',hobby:'烫头'}
},
handleChangeHobby(){
    this.setData({
        'userinfo.hobby':'篮球'
    })
}
# 另一种方式
handleChangeHobby(){

    this.data.userinfo.hobby='足球'
    this.setData({
        'userinfo.hobby':this.data.userinfo.hobby
    })
}
### 修改或添加元素
  handleChangeHobby(){
    // 解压赋值
    // const user={...this.data.userinfo,age:19}

    // 简写
    const userinfo={...this.data.userinfo,age:19,hobby:'乒乓球'}
    this.setData({
      // userinfo:userinfo
      userinfo
    })
    // 保证写出项目来，js特殊语法，如果不会，就不要用，就用最原始的即可

  }

#### wxml####
<view>--------显示对象--------</view>
<view>{{userinfo.name}}</view>
<view>{{userinfo.hobby}}</view>
<button type="primary" bindtap="handleChangeHobby">变化爱好</button>



## 7 修改数组案例
###js####
 handleAddName(){

      //1 先追加，在setData
      // this.data.names.push('亚瑟王')
      // this.setData({
      //   names:this.data.names
      // })

      //2 通过数组的拼接
      // const newName=this.data.names.concat('甄姬') // concat 不会在原数组增加
      // this.setData({
      //   names:newName
      // })

      // 3 结构赋值
      // const newName=[...this.data.names,'李白']
      // this.setData({
      //   names:newName
      // })

      // 4 改值，把刘亦菲改成 爱刘亦菲
      // this.setData({
      //   'names[0]':'爱刘亦菲'
      // })

      // 5 删除值
      // 可以先把数组修改完，再用setData赋值
      this.setData({
        names:this.data.names.slice(1)
      })
  }

####wxml####
<view>--------循环数组打印名字--------</view>

<view wx:for="{{names}}" wx:key="index">{{item}}</view>
<button type="primary" bindtap="handleAddName">增加人名</button>



### js const和let 和var区别
	-老版本js：定义变量用var，会有坑
    -新版本：定义变量用 let，定义常量用const
```

#### 5.2 列表渲染

```python
# for 循环--》循环人名显示

###使用
###wxml##
<view>--------循环数组打印名字--------</view>

<view wx:for="{{names}}" wx:key="index">{{item}}</view>
<button type="primary" bindtap="handleAddName">增加人名</button>

<view>--------列表渲染显示商品信息--------</view>

<view wx:for="{{goodsList}}" wx:key="index">
<!-- 如果不加 wx:key 会报警告  wx:key 必须唯一 -->
<!-- item 只要循环数据，在循环里面，就会有两个值：一个是index，索引值，另一个是 item，数组循环的值 能改，但是一般不改 -->
  <text>{{index}}-商品id:{{item.id}}--商品名字:{{item.name}}--商品价格:{{item.price}}</text>
</view>

<view>--------列表渲染显示商品信息-修改item和index--------</view>
<view wx:for="{{goodsList}}" wx:key="index" wx:for-item='info' wx:for-index='i'>
  <text>{{i}}-商品id:{{info.id}}--商品名字:{{info.name}}--商品价格:{{info.price}}</text>
</view>

<view>--------列表渲染显示商品信息-block--------</view>
<view wx:for="{{goodsList}}" wx:key="index" wx:for-item='info' wx:for-index='i'>
  <block>{{i}}-商品id:{{info.id}}--商品名字:{{info.name}}--商品价格:{{info.price}}</block>
</view>

###js###
goodsList:[{id:1001,name:'钢笔',price:9},{id:1002,name:'铅笔',price:6},{id:1003,name:'脸盆',price:99}]
```



#### 5.3 条件渲染

```python
# 1 wx:if   wx:elif   wx:else 

# 2 案例：输入框，输入分数，显示成绩等级
###js##
score:70,
### wxml##
<view>--------条件渲染--------</view>
<input type="text" model:value="{{score}}" style="border:1rpx solid red;"/>

<view wx:if="{{score>=90&&score<=100}}">优秀</view>
<view wx:elif="{{score>=80&&score<90}}">良好</view>
<view wx:elif="{{score>=60&&score<80}}">及格</view>
<view wx:else>不及格</view>
# 3 wx:if 和 hidden的区别
	hidden不删除元素
    wx:if 删除元素
        
        
### wxml###
<view>--------wx:if 和 hidden --------</view>
<view>
<image src="/images/b.jpg" mode="aspectFill" hidden="{{showPhoto}}"/>
<button type="primary" bindtap="handleShowPhoto">显示隐藏图片</button>

</view>
### js###
showPhoto:true
  handleShowPhoto(){
    this.setData({
      showPhoto:!this.data.showPhoto
    })
  },
```

### 6 发送网络请求

```python
# 之前学的，全是在微信小程序端操作，没有加入后端

# 需要在微信小程序端，发送网络请求，获取数据，显示在小程序上
```

#### 6.1 微信发送网络请求

```python
# 1 注意：发送网络请求的域名，必须在微信公众平台配置
	-本地环境去除，只适用于开发版和体验版
    
# 2  发送请求
	-django后端：写个接口，返回用户信息
    -微信小程序端：发送请求，获取数据，显示在微信小程序端
    
# 3 发送请求
###js###
  user:{}
  handleLoadUser(){
    // 发送请求之前 loading效果
    wx.showLoading({
      title: '加载中~~',
      mask:true  // 显示透明蒙层，设置后，框后的按钮都不能点击了
    })
    wx.request({
      url: 'http://127.0.0.1:8000/index/',
      method:'GET',
      data:{},
      header:{},
      success:(res)=>{
          //请求成功
          console.log(res.data)
          this.setData({
            user:res.data
          })
      },
      fail:(error)=>{
        console.log(error)
      },
      complete:(res)=>{
        // 关闭加载
        wx.hideLoading()
      }

    })

  },
##wxml###
<view>---发送网络请求-----</view>
<view>用户名：{{user.name}}</view>
<view>爱好：{{user.hobby}}</view>
<view>年龄：{{user.age}}</view>
<button type="primary" bindtap="handleLoadUser">加载用户信息</button>


## 4 loading提示框
# 显示
 wx.showLoading({
      title: '加载中，稍后',
      mask:true  // 显示透明蒙层
    })
    
    
#关闭--必须手动关闭
 wx.hideLoading()
```

### 7 消息对话框

```python
###js###
handleShowTost(){
    wx.showToast({
        title: '恭喜您，秒杀成功~~',
        icon:'none',
        duration:2000
    })
}、

### wxml###
<button type="warn" plain bind:tap="handleShowTost">点我弹出消息框</button>
```

### 8 存储

```python
#### wxml####
<button type="default" plain bind:tap="handleSave">存储数据</button>
<button type="primary" plain bind:tap="handleGet">获取数据</button>
<button type="default" plain bind:tap="handleDelete">删除数据</button>
<button type="primary" plain bind:tap="handleClear">清空数据</button>

###js###
###########同步###########
// 后期可以使用同步或异步--》感官身上差不多，但是写法不一样
// 同步保存
handleSave() {
    wx.setStorageSync('name', 'justin')
    wx.setStorageSync('age', 19)
    // 微信小程序，直接存对象即可---》最终它被转成json格式字符串存到 本地存储中
    wx.setStorageSync('wife', {name:'刘亦菲',age:'37',hobby:'高尔夫'})
},
handleGet() {
    const name=wx.getStorageSync("name")
    const age=wx.getStorageSync("age")
    const wife=wx.getStorageSync("wife")
    console.log(name)
    console.log(age)
    console.log(wife)

},
handleDelete() {
    // 清除微信缓存--删除小程序--用代码
    wx.removeStorageSync('wife')
},
handleClear() {
    wx.clearStorageSync()
}
#######异步###########
// 异步保存
handleSave() {
    // 如果不需要获取返回值--》可以直接写
    wx.setStorage({
        key:'name',
        data:'lqz'
    })
    wx.setStorage({
        key:'boyfriend',
        data:{name:'彭于晏',age:67}
    })

},

// 异步获取--》函数定义成 async  内部获取的时候，前面写 await
async handleGet() {
    const boyfriend=await wx.getStorage({key:'boyfriend'})
    console.log(boyfriend.data)
},
handleDelete() {
    wx.removeStorage({
        key:'name'
    })
},
handleClear() {
    wx.clearStorage()
}

```

## MQTT接入小程序

[MQTT.js 入门教程 | EMQ (emqx.com)](https://www.emqx.com/zh/blog/mqtt-js-tutorial)

[MQTT 下载引入和配置连接 | ESP32全栈应用开发文档 (icce.top)](https://esp-document.icce.top/小程序开发/7、MQTT下载引入和配置连接.html)

[MQTT 协议入门：基础知识和快速教程 | EMQ (emqx.com)](https://www.emqx.com/zh/blog/the-easiest-guide-to-getting-started-with-mqtt)

### 1 MQTT.js库下载

[点击下载 mqtt.min.js](https://esp-document.icce.top/js/mqtt.min.js)

### 2 导入和使用

将下载到本地的 mqtt.min.js 拷贝到项目的 utils 目录下，如下图所示

![image-20240515093358490](https://imgtroage-1317162111.cos.ap-nanjing.myqcloud.com/img/image-20240515093358490.png)

```js
import mqtt from "../../utils/mqtt.min.js"
let client = null; // mqtt连接
```

### 3 创建MQTT连接 

```js
connectMqtt() {
  let that = this;
  const options = {
    connectTimeout: 4000,
    address: this.data.address, // 输入的连接地址
    port: this.data.port, // 输入的端口号
    username: this.data.username, // 输入的用户名
    password: this.data.password, // 输入的密码
  };

  console.log("address是：", options.address);
  client = mqtt.connect("wxs://" + options.address + "/mqtt", options); // 连接方法
  client.on("connect", error => {
    console.log("连接成功");
    // 可以在这里写一些连接成功的逻辑
  });

  client.on("reconnect", error => {
    console.log("正在重连：", error);
    wx.showToast({ icon: "none", title: "正在重连", });
  });
  client.on("error", error => {
    console.log("连接失败：", error);
    wx.showToast({ icon: "none", title: "MQTT连接失败", });
  });
}
```

### 4 MQTT订阅 

**添加订阅**

```js
// 订阅一个主题
client.subscribe("想要订阅的主题名字", { qos: 0 }, function (err) {
  if (!err) {
    console.log("成功");
    wx.showToast({ icon: "none", title: "添加成功" });
    // 可以在这里写一些订阅主题成功的逻辑
  }
});
```

**取消订阅**

```js
client.unsubscribe('想要取消的主题名字', function (err) {
  if (!err) {
    wx.showToast({ icon: "none", title: "取消成功", });、
    // 可以在这里写一些取消主题成功的逻辑
  }
});
```

### 5 MQTT发布

```js
let msg = "发出的消息";
client.publish("想要发送消息的Topic", JSON.stringify(msg), { qos: 0 }, err => {
  if (!err) {
    console.log("topic:", "想要发送消息的Topic变量", "成功发出消息", msg);
  }
});
```

### 6 收到数据和数据回显 

```js
client.on("message", (topic, message) => {
  /* 温度、湿度、光强、烟雾
      TEMPERATURE
      HUMIDITY
      LIGHT_INTENSITY
      SMOKE
  */
  console.log("topic:", topic, "收到消息：", message.toString());
  // wx.showToast({
  //   icon: "none",
  //   title: message.toString(),
  // });
  let getMessageObj = {}; //收到的消息
  getMessageObj = JSON.parse(message); //收到的消息转换成json对象

  // 这里可以简化语法 用于教学仅提供最基本的示例
  if (getMessageObj.hasOwnProperty("TEMPERATURE"))
    this.setData({
      /*这里的sensorList为上面定义的传感器设备数据的数组 如果包含某项数据将更新那条数据 会自动刷新视图和百分比*/
      "sensorList[0].value": getMessageObj.TEMPERATURE ? Number(getMessageObj.TEMPERATURE) : 0,
    });
  if (getMessageObj.hasOwnProperty("HUMIDITY"))
    this.setData({
      "sensorList[1].value": Number(getMessageObj.HUMIDITY),
    });
  if (getMessageObj.hasOwnProperty("LIGHT_INTENSITY"))
    this.setData({
      "sensorList[2].value": Number(getMessageObj.LIGHT_INTENSITY),
    });
  if (getMessageObj.hasOwnProperty("SMOKE"))
    this.setData({
      "sensorList[3].value": Number(getMessageObj.SMOKE),
    });
  if (getMessageObj.hasOwnProperty("CURATIN_PROGRESS"))
    this.setData({
      "otherSensorList[2].schedule": Number(getMessageObj.CURATIN_PROGRESS),
    });
});
```

### 7 断开MQTT连接

```js
client.end(true, error => {});
client = null;
```

