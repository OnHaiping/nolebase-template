---
tags: 
comment: true
---
## 透视投影相机

Threejs如果想把三维场景`Scene`渲染到web网页上，还需要定义一个**虚拟相机**`Camera`，就像你生活中想获得一张照片，需要一台用来拍照的相机。

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240523153836413.png" alt="image-20240523153836413" style="zoom:50%;" />

### 虚拟透视相机`PerspectiveCamera`

Threejs提供了正投影相机[OrthographicCamera (opens new window)](https://threejs.org/docs/index.html?q=Camera#api/zh/cameras/OrthographicCamera)和透视投影相机[PerspectiveCamera (opens new window)](https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera)。先看比较常用的透视投影相机`PerspectiveCamera`。

> [!note]
>
> 透视投影相机`PerspectiveCamera`本质上就是在模拟人眼观察这个世界的规律。

```js
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera();
```

### 相机位置 `.position`

生活中用相机拍照，位置不同，结果也不同，three.js 中的虚拟相机也是如此

相机对象`Camera`具有位置属性`.position`，通过位置属性`.position`可以设置相机的位置。

```js
// 相机在three.js三维坐标系中的位置
// 根据需要设置相机位置的具体值
camera.position.set(200,200,200);
```

### 相机观察目标`.lookAt()`

你用相机拍照你需要控制相机的**拍照目标**，具体说相机镜头对准哪个物体或说哪个坐标。对于threejs相机而言，就是设置`.lookAt()`方法的参数，指定一个3D坐标。

```javascript
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0); //坐标原点
camera.lookAt(0, 10, 0);  //y轴上位置10
camera.lookAt(mesh.position);//指向mesh对应的位置
```

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240523154750105.png" alt="image-20240523154750105" style="zoom:66%;" />

### 判断相机相对三位场景中长方体位置

你可以把三维场景中长方体`mesh`想象为一个房间，然后根据相机位置和长方体位置尺寸对比，判断两者相对位置。你可以发现设置相机坐标(200, 200, 200)，位于长方体外面一处位置。

```javascript
// 长方体尺寸100, 100, 100
const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const mesh = new THREE.Mesh(geometry,material);
// 网格模型位置xyz坐标：0,10,0
mesh.position.set(0,10,0);
// 相机位置xyz坐标：200, 200, 200
camera.position.set(200, 200, 200); 
```

### 定义相机渲染输出的画布尺寸

你生活中相机拍照的照片是有大小的，对于threejs而言一样，需要定义相机在网页上输出的**Canvas画布**(照片)尺寸，大小可以根据需要定义，这里先随机定义一个尺寸。

**Canvas 画布** 课程中会把three.js虚拟相机渲染三维场景在浏览器上的呈现的结果称为 Canvas 画布

```javascript
// 定义相机输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 500; //高度
```

> [!note]
>
> 这个尺寸要在渲染器对象中设置
>
> 一般会设置为下面这样：
>
> ```javascript
> renderer.setSize(window.innerWidth, window.innerHeight);
> ```

### 透视投影相机`PerspectiveCamera`：视锥体

透视投影相机的四个参数`fov, aspect, near, far`构成一个**四棱台**3D空间，被称为**视锥体**，只有视锥体之内的物体，才会渲染出来，视锥体范围之外的物体不会显示在Canvas画布上。

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240523160756825.png" alt="image-20240523160756825" style="zoom:50%;" />

```javascript
// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
```

> `PerspectiveCamera`参数介绍：

```javascript
> PerspectiveCamera( fov, aspect, near, far )
```

| 参数     | 含义                                               | 默认值  |
| :----- | :----------------------------------------------- | :--- |
| fov    | 相机视锥体竖直方向视野角度                                    | 50   |
| aspect | 相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height | 1    |
| near   | 相机视锥体近裁截面相对相机距离                                  | 0.1  |
| far    | 相机视锥体远裁截面相对相机距离，far-near构成了视锥体高度方向               | 2000 |

## 渲染器

> [!note]
>
> 生活中如果有了**景物**和**相机**，那么如果想获得一张照片，就需要你拿着相机，按一下，咔，完成拍照。对于threejs而言，如果完成“咔”这个拍照动作，就需要一个新的对象，也就是WebGL渲染器

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240523161003746.png" alt="image-20240523161003746" style="zoom:50%;" />

### WebGL渲染器

通过WebGL渲染器[WebGLRenderer (opens new window)](https://threejs.org/docs/index.html?q=webgl#api/zh/renderers/WebGLRenderer)可以实例化一个WebGL渲染器对象。

```javascript
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
```

### 设置Canvas画布尺寸

`.setSize()`

```javascript
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 500; //高度
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
```

### 渲染器渲染方法

`.rander()`

渲染器`WebGLRenderer`执行渲染方法`.render()`就可以生成一个Canvas画布(照片)，并把三维场景Scene呈现在canvas画布上面,你可以把`.render()`理解为相机的拍照动作“咔”。

```javascript
renderer.render(scene, camera); //执行渲染操作
```

### 渲染器Canvas画布属性

`.domElement`

渲染器`WebGLRenderer`通过属性`.domElement`可以获得渲染方法`.render()`生成的Canvas画布，`.domElement`本质上就是一个HTML元素：Canvas画布。

> [!important]
>
> 这个是将整个Canvas放到body中来使用

```javascript
document.body.appendChild(renderer.domElement);
```

### Canvas画布插入到任意HTML元素中

```html
<div id="webgl" style="margin-top: 200px;margin-left: 100px;"></div>
```

```javascript
document.getElementById('webgl').appendChild(renderer.domElement);
```

> [!important]
>
> 这个是将 Canvas 放到任意HTML元素中，需要注意的是要`id`匹配起来

## 三维坐标系

这个是为了加强对三维空间的认知

### 辅助观察坐标系

`THREE.AxesHelper()`的参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸。

```js
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
```

### 材质半透明设置

设置材质半透明,这样可以看到坐标系的坐标原点。（**前提position设置为中心**）

```js
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //设置材质颜色
    transparent:true,//开启透明
    opacity:0.5,//设置透明度
});
```

### `AxesHelper`的xyz轴

three.js坐标轴颜色红**R**、绿**G**、蓝**B**分别对应坐标系的**x**、**y**、**z**轴，对于three.js的3D坐标系默认**y轴朝上**。

### 设置模型在坐标系中的位置或尺寸

通过模型的位置、尺寸设置，加深3D坐标系的概念。

测试：设置长方体xyz不同方向尺寸

```js
// 设置几何体长宽高，也就是x、y、z三个方向的尺寸
//对比三个参数分别对应xyz轴哪个方向
new THREE.BoxGeometry(100, 60, 20);
```

测试：改变位置

```js
// 设置模型mesh的xyz坐标
mesh.position.set(100,0,0);
```

### 改变相机参数--预览新的渲染参数

可以尝试在源码中改变相机的参数，观察场景中的物体渲染效果是怎么变化的

相机放在 x 轴负半轴，目标观察点是坐标原点，这个相当于相机的视线是沿着x轴正方向，只能看到长方体的矩形平面。

```js
camera.position.set(-1000, 0, 0);
camera.lookAt(0, 0, 0);
```

看到的结果：

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240527201715489.png" alt="image-20240527201715489" style="zoom:50%;" />

```js
// 相机视线沿着x轴负半轴，mesh位于相机后面，自然看不到
camera.position.set(-1000, 0, 0);
camera.lookAt(-2000, 0, 0);
```

相机far偏小，mesh位于far之外，物体不会显示在画布上。

```js
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// 你可以进行下面测试，改变相机参数，把mesh放在视锥体之外，看看是否显示
// 3000改为300，使mesh位于far之外，mesh不在视锥体内，被剪裁掉
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 300);
```

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240527201819352.png" alt="image-20240527201819352" style="zoom: 50%;" />

## 光源对物体表面的影响

实际生活中物体表面的**明暗**效果是会受到**光照**的影响，比如晚上不开灯，你就看不到物体，灯光比较暗，物体也比较暗。在threejs中，咱们用网格模型`Mesh`模拟生活中物体，所以threejs中模拟光照`Light`对物体表面的影响，就是模拟光照`Light`对网格模型`Mesh`表面的影响。

### 收光照影响的材质

threejs提供的网格材质，有的受光照影响，有的不受光照影响。

<img src="https://picture-typora.obs.cn-north-4.myhuaweicloud.com/images/image-20240527203141284.png" alt="image-20240527203141284" style="zoom: 25%;" />

**基础网格材质**[MeshBasicMaterial (opens new window)](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial)不会受到光照影响。

```javascript
//MeshBasicMaterial不受光照影响
const material = new THREE.MeshBasicMaterial(); 
```

**漫反射网格材质**[MeshLambertMaterial (opens new window)](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial)会受到光照影响，该材质也可以称为**Lambert网格材质**，音译为兰伯特网格材质。

一个立方体长方体使用MeshLambertMaterial材质，不同面和光线夹角不同，立方体不同面就会呈现出来不同的明暗效果。

```javascript
//MeshLambertMaterial受光照影响
const material = new THREE.MeshLambertMaterial(); 
```

###  光源介绍

Three.js提供了多种模拟生活中光源的API，文档搜索关键词light就可以看到。

[光源文档连接](https://threejs.org/docs/index.html?q=light#api/zh/lights/Light)

### 点光源

点光源[PointLight (opens new window)](https://threejs.org/docs/index.html?q=PointLight#api/zh/lights/PointLight)可以类比为一个发光点，就像生活中一个灯泡以灯泡为中心向四周发射光线。

```js
//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);
```

除了通过`THREE.PointLight`的参数2设置光照强度，你可以可以直接访问光照强度属性`.intensity`设置。

```javascript
pointLight.intensity = 1.0;//光照强度
```

### 光源衰减

实际生活中点光源，比如比如一个灯泡，随机距离的改变，光线会衰减，越来越弱，光源衰减属性`.decay`默认值是2.0，如果你不希望衰减可以设置为`0.0`。

```javascript
pointLight.decay = 0.0;//设置光源不随距离衰减
```

> [!note]
>
> 【扩展提醒】：如果使用默认衰减`2.0`，不同版本可能有差异，对于部分threejs新版本，有时候你可能看不到光源效果，这时候可以把光照强度加强试试看,如果你的版本不影响，就不用加强光照强度(根据版本情况灵活对应)。

```javascript
// 你可以对比不同光照强度明暗差异(传播同样距离)
pointLight.intensity = 10000.0;//光照强度
pointLight.intensity = 50000.0;//光照强度
```

### 光源位置

你把点光源想象为一个电灯泡，你在3D空间中，放的位置不同，模型的渲染效果就不一样。

注意光源位置尺寸大小：如果你希望光源照在模型的外表面，那你就需要把光源放在模型的外面。

```js
//点光源位置
pointLight.position.set(400, 0, 0);//点光源放在x轴上
```

### 光源添加到场景

光源和网格模型Mesh对应一样是三维场景的一部分，自然需要添加到三维场景中才能起作用。

```js
scene.add(pointLight); //点光源添加到场景中
```

设置好上面所有代码，你现在可以执行代码，用浏览器查看渲染效果。

### 改变光源位置，观察网格模型表面的明暗变化。

```js
// x, y, z
pointLight.position.set(400, 200, 300); 
```

## 相机控件(OrbitControls)

平时开发调试代码，或者展示模型的时候，可以通过相机控件OrbitControls实现旋转缩放预览效果。

### OrbitControls使用

具有三种效果：

- 旋转：拖动鼠标左键
- 缩放：滚动鼠标中键
- 平移：拖动鼠标右键

### 导入方法

> 需要引入OrbitControls.js

```javascript
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

> 注意：如果你在原生.html文件中，使用上面引入方式`import { OrbitControls } from 'three/addons/controls/OrbitControls.js';`，注意通过`<script type="importmap">`配置。

```html
<script type="importmap">
    {
		"imports": {
			"three": "../../../three.js/build/three.module.js",
      "three/addons/": "../../../three.js/examples/jsm/"
		}
	}
</script>
```

### 使用

```js
// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件
```

### OrbitControls本质

OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。

```js
controls.addEventListener('change', function () {
    // 浏览器控制台查看相机位置变化
    console.log('camera.position',camera.position);
});
```

