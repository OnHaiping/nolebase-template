---
tags: 
comment: true
---

# Three. Js

心血来潮，打算学 three. Js

相比较于看视频学习来说，通过看文档的方式来的会更直接一些

## 初步安装

使用 npm 的方式来安装似乎会快点

1. 去安装 [Node.js](https://nodejs.org/)

   详细教程我在这里就不放了，教程有很多。不过需要注意的是，记得配置好**环境变量**

2. 在项目文件夹中通过[终端](https://www.joshwcomeau.com/javascript/terminal-for-js-devs/) 安装 three. Js 和构建工具 [Vite](https://vitejs.dev/)。Vite 将在开发过程中使用，但不会被打包成为最终网页的一部分。当然，除了 Vite 你也可以使用其他支持导入 [ES Modules](https://eloquentjavascript.net/10_modules.html#h_zWTXAU93DC) 的现代构建工具。

详细步骤：

1. 找到一个文件夹来存放你的 Three. JS 的项目文件，命名的话，我是起名为 Three. Js

2. 打开之后在下面图片位置单击输入 `cmd`

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/4CnNtxvgIPiSuwe.png" alt="image-20240509102843064" style="zoom: 67%;" />

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/vSe7zRua2E65GjF.png" alt="image-20240509103124151" style="zoom:33%;" />

摁下回车键打开终端命令窗口

![image-20240509102951075](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/wJFhxiMGABtN9Hv.png)

3. 在此处输入命令：`npm install --save three` 以来安装 Three. Js 的主文件

如果成功的话，会看到下面这些信息：

![image-20240509102923521](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/tVl6O5GAjK1gqsp.png)

4. 紧接着输入：`npm install --save-dev vite` 来安装 vite，用来开发前端

成功会看到下面这些信息：（可能在你操作的时候会有些许出入，但是主要没有报错就 OK）

![image-20240509103300056](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/Y2jvzh1MfoE7PZH.png)

5. 代码如下：

```
# three.js
npm install --save three
# vite
npm install --save-dev vite
```

6. 安装完成之后会发现刚刚新建的文件夹中新增了几个文件：

![image-20240509103558291](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/KYGWdnSBk7UJrAe.png)


> [!note]
>
> Npm 使用 *package. Json* 来描述你已经安装的每个依赖项的版本。如果有其他人和你一起开发项目，他们只需运行 *npm install* 就能安装每个依赖项的原始版本。如果你在使用版本控制器（如：Git、SVN）来控制代码版本，那么 *package. Json* 应当被提交。
>
> ****
>
> Npm 将每个依赖项的代码放在 *node_modules/* 下的文件夹中。当 Vite 构建应用程序时，它会看到 “three” 的导入，并自动从该文件夹中提取 three. Js 文件。 *node_modules/* 文件夹仅在开发过程中使用，不应上传到你的网络托管提供商或提交到版本历史记录中。

7. 好了，基本的构建已经完成了，接下来就要开始运行了：

不用关闭终端窗口，直接输入：`npx vite` 启动我们的项目

成功的话会看到下面这个窗口

![image-20240509103843977](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/neg1CwUXRo8hYkD.png)

可能会注意到，上面有一条黄色的警告，这个其实是因为我们的项目中没有任何的 html 文件来被执行，所以会导致警告，接下来我们就来开始我们的第一个 html 文件--**绘制一个旋转立方体**

8. 摁住键盘上的 `Ctrl` + `c`，鼠标单击 `Local` 所指向的**URL**

![image-20240509104212232](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/CZn98JDVY7byogF.png)

不出意外的话，会打开你的浏览器，并进入一个页面

不过这个页面上什么也没有，甚至可能是下面这种情况：

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/vPnAd2aDXhToJSe.png" alt="image-20240509104312052" style="zoom:33%;" />

不用紧张，这个还是之前的哪个警告的原因--我们没有任何的 html 文件来被执行

至此，安装步骤到此结束

接下来，我们来开始我们的第一个 Three. Js 的项目：**绘制一个旋转立方体**

## 绘制旋转立方体

### Html 文件

通常来说，在开发前端项目时候，一般使用 VsCode 编辑器。

当然，无论你使用什么编辑器都是无所谓的，因为核心是一样的，~~哪怕是使用记事本~~

下面以 VsCode 编辑器为例子

1. 找到我们的项目文件夹

2. 鼠标右键菜单中选择使用 VsCode 打开（我这里是 Insider 版本，本质是一样的）

	<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509104953353.png" alt="image-20240509104953353" style="zoom: 50%;" />

3. 选择信任作者

   ![image-20240509105138359](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509105138359.png)

4. 在根目录下新建一个文件

   ![image-20240509105247342](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509105247342.png)

   命名为 `index.html`

   然后，在这个文件中输入一个 `!`，在摁回车，一般会直接生成一串代码，这个代码是自带 HTML 文件的初始化模板

   ![image-20240509105447516](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509105447516.png)

   使用模板的好处在于，一些通用的部分是可以快速生成以节约我们的时间

5. 接下来在 `<title></title>` 下面输入下面代码

   ```html
   <style>
   	body { margin: 0; }
   </style>
   ```

   > [!note]
   >
   > 这段代码的含义是用于设置 HTML 文档的 `<body>` 元素的外边距为 0，
   >
   > 目的是消除浏览器默认的外边距，使页面内容能够填满整个浏览器窗口，而不会留下任何空白边距。

6. 接着在 `<body></body>` 中输入下面代码：

   ```html
   <script type="module" src="/main.js"></script>
   ```

   > [!note]
   >
   > 这个是引入 js 模块的语句，type 属性代表加载的是一个 JavaScript 模块，并且默认使用严格模式
   >
   > src 代表指向的 js 文件
   >
   > 这个文件我们接下来会编写

   至此，我们的 html 文件就已经完成了

   Three. Js 的核心在于 js 文件

### Js 文件

接下来就是重头戏了，我们新建一个 `main.js` 来存放我们的 Three. Js 的代码。

同样的道理，还是在项目文件夹的根目录下新建一个文件: `main.js`

![image-20240509110555788](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509110555788.png)

为了真正能够让你的场景借助 three. Js 来进行显示，我们需要以下几个对象：场景（scene）、相机（camera）和渲染器（renderer），这样我们就能透过摄像机渲染出场景。

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

很明显，这部分代码是需要进行解释的

Three. Js 里有几种不同的相机，在这里，我们使用的是 **PerspectiveCamera**（透视摄像机）。

第一个参数是**视野角度（FOV）**。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度 (与弧度区分开)。

第二个参数是**长宽比（aspect ratio）**。也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。

接下来的两个参数是**近截面**（near）和**远截面**（far）。当物体某些部分比摄像机的**远截面**远或者比**近截面**近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。

接下来是渲染器。这里是施展魔法的地方。除了我们在这里用到的 WebGLRenderer 渲染器之外，Three. Js 同时提供了其他几种渲染器，当用户所使用的浏览器过于老旧，或者由于其他原因不支持 WebGL 时，可以使用这几种渲染器进行降级。

我们还需要在我们的应用程序里设置一个渲染器的尺寸。比如说，我们可以使用所需要的渲染区域的宽高，来让渲染器渲染出的场景填充满我们的应用程序。因此，我们可以将渲染器宽高设置为浏览器窗口宽高。对于性能比较敏感的应用程序来说，你可以使用 **setSize** 传入一个较小的值，例如 ``window. InnerWidth/2 `` 和 ``window. InnerHeight/2``，这将使得应用程序在渲染时，以一半的长宽尺寸渲染场景。

如果你希望保持你的应用程序的尺寸，但是以较低的分辨率来渲染，你可以在调用 **setSize** 时，将 **updateStyle**（第三个参数）设为 false。例如，假设你的 **\<canvas>** 标签现在已经具有了 100% 的宽和高，调用 ``setSize (window. InnerWidth/2, window. InnerHeight/2, false)`` 将使得你的应用程序以四分之一的大小来进行渲染。

最后一步很重要，我们将 **renderer**（渲染器）的 dom 元素（renderer. DomElement）添加到我们的 HTML 文档中。这就是渲染器用来显示场景给我们看的 `<canvas> `元素。

当完成了上面这些步骤之后，我们接下来就需要添加立方体给我们的**场景**了

```js
Const geometry = new THREE.BoxGeometry ( 1, 1, 1 );
Const material = new THREE.MeshBasicMaterial ( { color: 0 x 00 ff 00 } );
Const cube = new THREE.Mesh ( geometry, material );
Scene.Add ( cube );

Camera. Position. Z = 5;
```

要创建一个立方体，我们需要一个 **BoxGeometry**（立方体）对象. 这个对象包含了一个立方体中所有的顶点（**vertices**）和面（**faces**）。未来我们将在这方面进行更多的探索。

接下来，对于这个立方体，我们需要给它一个材质，来让它有颜色。Three. Js 自带了几种材质，在这里我们使用的是 **MeshBasicMaterial**。所有的材质都存有应用于他们的属性的对象。在这里为了简单起见，我们只设置一个 color 属性，值为 **0 x 00 ff 00**，也就是绿色。这里所做的事情，和在 CSS 或者 Photoshop 中使用十六进制（**hex colors**）颜色格式来设置颜色的方式一致。

第三步，我们需要一个 **Mesh**（网格）。网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。

默认情况下，当我们调用 **scene.Add ()** 的时候，物体将会被添加到 **(0,0,0)** 坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。

当完成上面这部分之后，我们只剩下了最后一个步骤，那就是来渲染我们的立方体：

为此，我们需要一个被叫做**渲染循环**（render loop）或者**动画循环**（animate loop）的东西

```js
Function animate () {
	RequestAnimationFrame ( animate );
	Renderer.Render ( scene, camera );
}
Animate ();
```

在这里我们创建了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般是 60 次/秒）。如果你是一个浏览器游戏开发的新手，你或许会说 *“为什么我们不直接用 setInterval 来实现刷新的功能呢？”* 当然啦，我们的确可以用 setInterval，但是，**requestAnimationFrame** 有很多的优点。最重要的一点或许就是当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源，也不会损耗电池的使用寿命。

不过，还记得我们一开始的目标吗？

我们要让立方体旋转起来：

把下面这段代码添加到 **animate ()** 函数中 **renderer. Render** 调用的上方：

```
Cube. Rotation. X += 0.01;
Cube. Rotation. Y += 0.01;
```

这段代码每帧都会执行（正常情况下是 60 次/秒），这就让立方体有了一个看起来很不错的旋转动画。基本上来说，当应用程序运行时，如果你想要移动或者改变任何场景中的东西，都必须要经过这个动画循环。当然，你可以在这个动画循环里调用别的函数，这样你就不会写出有上百行代码的 **animate** 函数。

Ok 了。到此为止，整个旋转的立方体已经创建完成了

详细代码：

```js
Import * as THREE from 'three';

Const scene = new THREE.Scene ();
Const camera = new THREE.PerspectiveCamera ( 75, window. InnerWidth / window. InnerHeight, 0.1, 1000 );

Const renderer = new THREE.WebGLRenderer ();
Renderer.SetSize ( window. InnerWidth, window. InnerHeight );
Document.Body.AppendChild ( renderer. DomElement );

Const geometry = new THREE.BoxGeometry ( 1, 1, 1 );
Const material = new THREE.MeshBasicMaterial ( { color: 0 x 00 ff 00 } );
Const cube = new THREE.Mesh ( geometry, material );> scene.Add ( cube );

Camera. Position. Z = 5;

Function animate () {
	RequestAnimationFrame ( animate );

	Cube. Rotation. X += 0.01;
	Cube. Rotation. Y += 0.01;

	Renderer.Render ( scene, camera );
}

Animate ();
```

## 看看效果

还记得之前我们在命令窗口启动之后产生的 **URL** 么？

现在回到浏览器，代码会自动更新并且应用。

如果你不小心关掉了，没关系，找到项目文件夹根目录

在终端命令窗口输入

```
Npx vite
```

来再次启动我们的应用

或者选择在 VsCode 中的终端中启动也是没有问题的

这样我们就能看到如下结果：

![image-20240509124127161](https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240509124127161.png)

也许不是想象中的那样完美，但至少我们成功了不是么？