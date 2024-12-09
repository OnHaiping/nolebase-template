## `ch_PP-OCRv3_det_student.yml` 文件配置详解：

```
Global:

  debug: false  # 是否开启调试模式

  use_gpu: true  # 是否使用GPU

  epoch_num: 500  # 训练的总轮数

  log_smooth_window: 20  # 日志平滑窗口大小

  print_batch_step: 10  # 每多少步打印一次日志

  save_model_dir: ./output/ch_PP-OCR_V3_det/  # 模型保存目录

  save_epoch_step: 100  # 每多少轮保存一次模型

  eval_batch_step:

  - 0

  - 400  # 评估的批次步长

  cal_metric_during_train: false  # 是否在训练过程中计算指标

  pretrained_model: https://paddleocr.bj.bcebos.com/pretrained/MobileNetV3_large_x0_5_pretrained.pdparams  # 预训练模型路径

  checkpoints: null  # 检查点路径

  save_inference_dir: null  # 推理模型保存目录

  use_visualdl: false  # 是否使用VisualDL

  infer_img: doc/imgs_en/img_10.jpg  # 推理图像路径

  save_res_path: ./checkpoints/det_db/predicts_db.txt  # 结果保存路径

  distributed: true  # 是否使用分布式训练

  

Architecture:

  model_type: det  # 模型类型

  algorithm: DB  # 算法类型

  Transform:  # 数据变换

  Backbone:

    name: MobileNetV3  # 主干网络名称

    scale: 0.5  # 缩放比例

    model_name: large  # 模型名称

    disable_se: True  # 是否禁用SE模块

  Neck:

    name: RSEFPN  # 颈部网络名称

    out_channels: 96  # 输出通道数

    shortcut: True  # 是否使用快捷连接

  Head:

    name: DBHead  # 头部网络名称

    k: 50  # DBHead参数

  

Loss:

  name: DBLoss  # 损失函数名称

  balance_loss: true  # 是否平衡损失

  main_loss_type: DiceLoss  # 主损失类型

  alpha: 5  # Alpha参数

  beta: 10  # Beta参数

  ohem_ratio: 3  # OHEM比例

  

Optimizer:

  name: Adam  # 优化器名称

  beta1: 0.9  # Adam优化器的beta1参数

  beta2: 0.999  # Adam优化器的beta2参数

  lr:

    name: Cosine  # 学习率调度器名称

    learning_rate: 0.001  # 初始学习率

    warmup_epoch: 2  # 预热轮数

  regularizer:

    name: L2  # 正则化器名称

    factor: 5.0e-05  # 正则化因子

  

PostProcess:

  name: DBPostProcess  # 后处理名称

  thresh: 0.3  # 阈值

  box_thresh: 0.6  # 框阈值

  max_candidates: 1000  # 最大候选框数量

  unclip_ratio: 1.5  # 未剪裁比例

  

Metric:

  name: DetMetric  # 评估指标名称

  main_indicator: hmean  # 主要指标

  

Train:

  dataset:

    name: SimpleDataSet  # 数据集名称

    data_dir: ./train_data/icdar2015/text_localization/  # 数据目录

    label_file_list:

      - ./train_data/icdar2015/text_localization/train_icdar2015_label.txt  # 标签文件列表

    ratio_list: [1.0]  # 比例列表

    transforms:

    - DecodeImage:

        img_mode: BGR  # 图像模式

        channel_first: false  # 是否将通道放在前面

    - DetLabelEncode: null  # 标签编码

    - IaaAugment:

        augmenter_args:

        - type: Fliplr  # 水平翻转

          args:

            p: 0.5  # 概率

        - type: Affine  # 仿射变换

          args:

            rotate:

            - -10  # 旋转角度范围

            - 10

        - type: Resize  # 调整大小

          args:

            size:

            - 0.5  # 尺寸范围

            - 3

    - EastRandomCropData:

        size:

        - 960  # 裁剪尺寸

        - 960

        max_tries: 50  # 最大尝试次数

        keep_ratio: true  # 是否保持比例

    - MakeBorderMap:

        shrink_ratio: 0.4  # 缩小比例

        thresh_min: 0.3  # 最小阈值

        thresh_max: 0.7  # 最大阈值

    - MakeShrinkMap:

        shrink_ratio: 0.4  # 缩小比例

        min_text_size: 8  # 最小文本尺寸

    - NormalizeImage:

        scale: 1./255.  # 归一化比例

        mean:

        - 0.485  # 均值

        - 0.456

        - 0.406

        std:

        - 0.229  # 标准差

        - 0.224

        - 0.225

        order: hwc  # 顺序

    - ToCHWImage: null  # 转换为CHW格式

    - KeepKeys:

        keep_keys:

        - image  # 保留图像

        - threshold_map  # 保留阈值图

        - threshold_mask  # 保留阈值掩码

        - shrink_map  # 保留缩小图

        - shrink_mask  # 保留缩小掩码

  loader:

    shuffle: true  # 是否打乱数据

    drop_last: false  # 是否丢弃最后一个不完整批次

    batch_size_per_card: 8  # 每个卡的批次大小

    num_workers: 4  # 工作线程数

  

Eval:

  dataset:

    name: SimpleDataSet  # 数据集名称

    data_dir: ./train_data/icdar2015/text_localization/  # 数据目录

    label_file_list:

      - ./train_data/icdar2015/text_localization/test_icdar2015_label.txt  # 标签文件列表

    transforms:

    - DecodeImage:

        img_mode: BGR  # 图像模式

        channel_first: false  # 是否将通道放在前面

    - DetLabelEncode: null  # 标签编码

    - DetResizeForTest: null  # 测试时调整大小

    - NormalizeImage:

        scale: 1./255.  # 归一化比例

        mean:

        - 0.485  # 均值

        - 0.456

        - 0.406

        std:

        - 0.229  # 标准差

        - 0.224

        - 0.225

        order: hwc  # 顺序

    - ToCHWImage: null  # 转换为CHW格式

    - KeepKeys:

        keep_keys:

        - image  # 保留图像

        - shape  # 保留形状

        - polys  # 保留多边形

        - ignore_tags  # 保留忽略标签

  loader:

    shuffle: false  # 是否打乱数据

    drop_last: false  # 是否丢弃最后一个不完整批次

    batch_size_per_card: 1  # 每个卡的批次大小

    num_workers: 2  # 工作线程数
```

## 验证模型

```
PS E:\LEARN\Project-all\AI\PaddleOCR-main>  & E:/SOFTWARE/ANACONDA/envs/Paddle/python.exe e:/LEARN/Project-all/AI/PaddleOCR-main/tools/eval.py -c configs/det/ch_PP-OCRv3/ch_PP-OCRv3_det_student.yml -o Global.pretrained_model=models/ch_PP-OCRv3_det_distill_train/student.pdparams Eval.dataset.data_dir=E:/LEARN/Project-all/AI/PaddleOCR-main/Data/CCPD2020/ccpd_green Eval.dataset.label_file_list=[E:/LEARN/Project-all/AI/PaddleOCR-main/Data/CCPD2020/ccpd_green/PPOCR/test/det.txt]
[2024/12/09 16:00:51] ppocr INFO: Architecture : 
[2024/12/09 16:00:51] ppocr INFO:     Backbone : 
[2024/12/09 16:00:51] ppocr INFO:         disable_se : True
[2024/12/09 16:00:51] ppocr INFO:         model_name : large
[2024/12/09 16:00:51] ppocr INFO:         name : MobileNetV3
[2024/12/09 16:00:51] ppocr INFO:         scale : 0.5
[2024/12/09 16:00:51] ppocr INFO:     Head :
[2024/12/09 16:00:51] ppocr INFO:         k : 50
[2024/12/09 16:00:51] ppocr INFO:         name : DBHead
[2024/12/09 16:00:51] ppocr INFO:     Neck :
[2024/12/09 16:00:51] ppocr INFO:         name : RSEFPN
[2024/12/09 16:00:51] ppocr INFO:         out_channels : 96
[2024/12/09 16:00:51] ppocr INFO:         shortcut : True
[2024/12/09 16:00:51] ppocr INFO:     Transform : None
[2024/12/09 16:00:51] ppocr INFO:     algorithm : DB
[2024/12/09 16:00:51] ppocr INFO:     model_type : det
[2024/12/09 16:00:51] ppocr INFO: Eval :
[2024/12/09 16:00:51] ppocr INFO:     dataset :
[2024/12/09 16:00:51] ppocr INFO:         data_dir : E:/LEARN/Project-all/AI/PaddleOCR-main/Data/CCPD2020/ccpd_green
[2024/12/09 16:00:51] ppocr INFO:         label_file_list : ['E:/LEARN/Project-all/AI/PaddleOCR-main/Data/CCPD2020/ccpd_green/PPOCR/test/det.txt']
[2024/12/09 16:00:51] ppocr INFO:         name : SimpleDataSet
[2024/12/09 16:00:51] ppocr INFO:         transforms :
[2024/12/09 16:00:51] ppocr INFO:             DecodeImage :
[2024/12/09 16:00:51] ppocr INFO:                 channel_first : False
[2024/12/09 16:00:51] ppocr INFO:                 img_mode : BGR
[2024/12/09 16:00:51] ppocr INFO:             DetLabelEncode : None
[2024/12/09 16:00:51] ppocr INFO:             DetResizeForTest : None
[2024/12/09 16:00:51] ppocr INFO:             NormalizeImage :
[2024/12/09 16:00:51] ppocr INFO:                 mean : [0.485, 0.456, 0.406]
[2024/12/09 16:00:51] ppocr INFO:                 order : hwc
[2024/12/09 16:00:51] ppocr INFO:                 scale : 1./255.
[2024/12/09 16:00:51] ppocr INFO:                 std : [0.229, 0.224, 0.225]
[2024/12/09 16:00:51] ppocr INFO:             ToCHWImage : None
[2024/12/09 16:00:51] ppocr INFO:             KeepKeys :
[2024/12/09 16:00:51] ppocr INFO:                 keep_keys : ['image', 'shape', 'polys', 'ignore_tags']      
[2024/12/09 16:00:51] ppocr INFO:     loader :
[2024/12/09 16:00:51] ppocr INFO:         batch_size_per_card : 1
[2024/12/09 16:00:51] ppocr INFO:         drop_last : False
[2024/12/09 16:00:51] ppocr INFO:         num_workers : 2
[2024/12/09 16:00:51] ppocr INFO:         shuffle : False
[2024/12/09 16:00:51] ppocr INFO: Global :
[2024/12/09 16:00:51] ppocr INFO:     cal_metric_during_train : False
[2024/12/09 16:00:51] ppocr INFO:     checkpoints : None
[2024/12/09 16:00:51] ppocr INFO:     debug : False
[2024/12/09 16:00:51] ppocr INFO:     distributed : False
[2024/12/09 16:00:51] ppocr INFO:     epoch_num : 500
[2024/12/09 16:00:51] ppocr INFO:     eval_batch_step : [0, 400]
[2024/12/09 16:00:51] ppocr INFO:     infer_img : doc/imgs_en/img_10.jpg
[2024/12/09 16:00:51] ppocr INFO:     log_smooth_window : 20
[2024/12/09 16:00:51] ppocr INFO:     pretrained_model : models/ch_PP-OCRv3_det_distill_train/student.pdparams[2024/12/09 16:00:51] ppocr INFO:     print_batch_step : 10
[2024/12/09 16:00:51] ppocr INFO:     save_epoch_step : 100
[2024/12/09 16:00:51] ppocr INFO:     save_inference_dir : None
[2024/12/09 16:00:51] ppocr INFO:     save_model_dir : ./output/ch_PP-OCR_V3_det/
[2024/12/09 16:00:51] ppocr INFO:     save_res_path : ./checkpoints/det_db/predicts_db.txt
[2024/12/09 16:00:51] ppocr INFO:     use_gpu : True
[2024/12/09 16:00:51] ppocr INFO:     use_visualdl : False
[2024/12/09 16:00:51] ppocr INFO: Loss :
[2024/12/09 16:00:51] ppocr INFO:     alpha : 5
[2024/12/09 16:00:51] ppocr INFO:     balance_loss : True
[2024/12/09 16:00:51] ppocr INFO:     beta : 10
[2024/12/09 16:00:51] ppocr INFO:     main_loss_type : DiceLoss
[2024/12/09 16:00:51] ppocr INFO:     name : DBLoss
[2024/12/09 16:00:51] ppocr INFO:     ohem_ratio : 3
[2024/12/09 16:00:51] ppocr INFO: Metric :
[2024/12/09 16:00:51] ppocr INFO:     main_indicator : hmean
[2024/12/09 16:00:51] ppocr INFO:     name : DetMetric
[2024/12/09 16:00:51] ppocr INFO: Optimizer :
[2024/12/09 16:00:51] ppocr INFO:     beta1 : 0.9
[2024/12/09 16:00:51] ppocr INFO:     beta2 : 0.999
[2024/12/09 16:00:51] ppocr INFO:     lr :
[2024/12/09 16:00:51] ppocr INFO:         learning_rate : 0.001
[2024/12/09 16:00:51] ppocr INFO:         name : Cosine
[2024/12/09 16:00:51] ppocr INFO:         warmup_epoch : 2
[2024/12/09 16:00:51] ppocr INFO:     name : Adam
[2024/12/09 16:00:51] ppocr INFO:     regularizer :
[2024/12/09 16:00:51] ppocr INFO:         factor : 5e-05
[2024/12/09 16:00:51] ppocr INFO:         name : L2
[2024/12/09 16:00:51] ppocr INFO: PostProcess :
[2024/12/09 16:00:51] ppocr INFO:     box_thresh : 0.6
[2024/12/09 16:00:51] ppocr INFO:     max_candidates : 1000
[2024/12/09 16:00:51] ppocr INFO:     name : DBPostProcess
[2024/12/09 16:00:51] ppocr INFO:     thresh : 0.3
[2024/12/09 16:00:51] ppocr INFO:     unclip_ratio : 1.5
[2024/12/09 16:00:51] ppocr INFO: Train :
[2024/12/09 16:00:51] ppocr INFO:     dataset :
[2024/12/09 16:00:51] ppocr INFO:         data_dir : ./train_data/icdar2015/text_localization/
[2024/12/09 16:00:51] ppocr INFO:         label_file_list : ['./train_data/icdar2015/text_localization/train_icdar2015_label.txt']
[2024/12/09 16:00:51] ppocr INFO:         name : SimpleDataSet
[2024/12/09 16:00:51] ppocr INFO:         ratio_list : [1.0]
[2024/12/09 16:00:51] ppocr INFO:         transforms :
[2024/12/09 16:00:51] ppocr INFO:             DecodeImage :
[2024/12/09 16:00:51] ppocr INFO:                 channel_first : False
[2024/12/09 16:00:51] ppocr INFO:                 img_mode : BGR
[2024/12/09 16:00:51] ppocr INFO:             DetLabelEncode : None
[2024/12/09 16:00:51] ppocr INFO:             IaaAugment :
[2024/12/09 16:00:51] ppocr INFO:                 augmenter_args :
[2024/12/09 16:00:51] ppocr INFO:                     args :
[2024/12/09 16:00:51] ppocr INFO:                         p : 0.5
[2024/12/09 16:00:51] ppocr INFO:                     type : Fliplr
[2024/12/09 16:00:51] ppocr INFO:                     args :
[2024/12/09 16:00:51] ppocr INFO:                         rotate : [-10, 10]
[2024/12/09 16:00:51] ppocr INFO:                     type : Affine
[2024/12/09 16:00:51] ppocr INFO:                     args :
[2024/12/09 16:00:51] ppocr INFO:                         size : [0.5, 3]
[2024/12/09 16:00:51] ppocr INFO:                     type : Resize
[2024/12/09 16:00:51] ppocr INFO:             EastRandomCropData :
[2024/12/09 16:00:51] ppocr INFO:                 keep_ratio : True
[2024/12/09 16:00:51] ppocr INFO:                 max_tries : 50
[2024/12/09 16:00:51] ppocr INFO:                 size : [960, 960]
[2024/12/09 16:00:51] ppocr INFO:             MakeBorderMap :
[2024/12/09 16:00:51] ppocr INFO:                 shrink_ratio : 0.4
[2024/12/09 16:00:51] ppocr INFO:                 thresh_max : 0.7
[2024/12/09 16:00:51] ppocr INFO:                 thresh_min : 0.3
[2024/12/09 16:00:51] ppocr INFO:             MakeShrinkMap :
[2024/12/09 16:00:51] ppocr INFO:                 min_text_size : 8
[2024/12/09 16:00:51] ppocr INFO:                 shrink_ratio : 0.4
[2024/12/09 16:00:51] ppocr INFO:             NormalizeImage :
[2024/12/09 16:00:51] ppocr INFO:                 mean : [0.485, 0.456, 0.406]
[2024/12/09 16:00:51] ppocr INFO:                 order : hwc
[2024/12/09 16:00:51] ppocr INFO:                 scale : 1./255.
[2024/12/09 16:00:51] ppocr INFO:                 std : [0.229, 0.224, 0.225]
[2024/12/09 16:00:51] ppocr INFO:             ToCHWImage : None
[2024/12/09 16:00:51] ppocr INFO:             KeepKeys :
[2024/12/09 16:00:51] ppocr INFO:                 keep_keys : ['image', 'threshold_map', 'threshold_mask', 'shrink_map', 'shrink_mask']
[2024/12/09 16:00:51] ppocr INFO:     loader :
[2024/12/09 16:00:51] ppocr INFO:         batch_size_per_card : 8
[2024/12/09 16:00:51] ppocr INFO:         drop_last : False
[2024/12/09 16:00:51] ppocr INFO:         num_workers : 4
[2024/12/09 16:00:51] ppocr INFO:         shuffle : True
[2024/12/09 16:00:51] ppocr INFO: profiler_options : None
[2024/12/09 16:00:51] ppocr INFO: train with paddle 2.6.0 and device Place(gpu:0)
[2024/12/09 16:00:51] ppocr INFO: Initialize indexs of datasets:['E:/LEARN/Project-all/AI/PaddleOCR-main/Data/CCPD2020/ccpd_green/PPOCR/test/det.txt']
W1209 16:00:51.662034 53304 gpu_resources.cc:119] Please NOTE: device: 0, GPU Compute Capability: 8.6, Driver 
API Version: 12.4, Runtime API Version: 11.7
W1209 16:00:51.667035 53304 gpu_resources.cc:164] device: 0, cuDNN Version: 8.9.
[2024/12/09 16:00:52] ppocr INFO: load pretrain successful from models/ch_PP-OCRv3_det_distill_train/student
[2024/12/09 16:00:52] ppocr INFO: metric in ckpt ***************
[2024/12/09 16:00:52] ppocr INFO: is_float16:False
eval model:: 100%|██████████████████████████████████████████████████████▉| 5005/5006 [03:48<00:00, 21.88it/s] 
[2024/12/09 16:04:41] ppocr INFO: metric eval ***************
[2024/12/09 16:04:41] ppocr INFO: precision:0.6304547241514874
[2024/12/09 16:04:41] ppocr INFO: recall:0.9614308553157475
[2024/12/09 16:04:41] ppocr INFO: hmean:0.7615354174910962
[2024/12/09 16:04:41] ppocr INFO: fps:42.52257374304988
```

发现单纯使用预训练模型 student.pdparams 在数据集上进行评估得到的 hmean 仅仅是 $0.76$ ，precision 仅仅是 $0.63$

所以针对这个模型要在我们的数据集上进行 fine-tune。

在使用预训练模型进行fine-tune时，需要设置如下11个字段

1. Global.pretrained_model: 指向PP-OCRv3文本检测预训练模型地址
2. Global.eval_batch_step: 模型多少step评估一次，这里设为从第0个step开始没隔772个step评估一次，772为一个epoch总的step数。
3. Optimizer.lr.name: 学习率衰减器设为常量 Const
4. Optimizer.lr.learning_rate: 学习率设为之前的0.05倍
5. Optimizer.lr.warmup_epoch: warmup_epoch设为0
6. Train.dataset.data_dir：指向训练集图片存放目录
7. Train.dataset.label_file_list：指向训练集标注文件
8. Train.loader.num_workers: 训练集多进程数据读取的进程数，在aistudio中需要设为1
9. Eval.dataset.data_dir：指向验证集图片存放目录
10. Eval.dataset.label_file_list：指向验证集标注文件
11. Eval.loader.num_workers: 验证集多进程数据读取的进程数，在aistudio中需要设为0

具体使用代码如下：

```
python tools/train.py -c configs/det/ch_PP-OCRv3/ch_PP-OCRv3_det_student.yml -o \ Global.pretrained_model=models/ch_PP-OCRv3_det_distill_train/student.pdparams \ Global.save_model_dir=output/CCPD/det/ \ Global.eval_batch_step="[0, 772]" \ Optimizer.lr.name=Const \ 
Optimizer.lr.learning_rate=0.0005 \ 
Optimizer.lr.warmup_epoch=0 \ Train.dataset.data_dir=/home/aistudio/data/CCPD2020/ccpd_green \ Train.dataset.label_file_list=[/home/aistudio/data/CCPD2020/PPOCR/train/det.txt] \ Train.loader.num_workers=1 \ Eval.dataset.data_dir=/home/aistudio/data/CCPD2020/ccpd_green \ Eval.dataset.label_file_list=[/home/aistudio/data/CCPD2020/PPOCR/test/det.txt] \ Eval.loader.num_workers=0
```
## 学习率衰减器

> [!note]
> 学习率衰减是一个非常有效的炼丹技巧之一，在神经网络的训练过程中，当accuracy出现震荡或loss不再下降时，进行适当的学习率衰减是一个行之有效的手段，很多时候能明显提高accuracy。

在针对 `Optimizer.lr.name` 中，通过查看 PaddleOCR 的文档，其支持以下几种学习率衰减器：

1. Simple Momentum optimizer ：具有速度状态的简单动量优化器。
		Learning_rate (浮点数|变量) - 用于更新参数的学习率。
			可以是浮点数或以一个浮点数作为数据元素的变量。
		动量 (浮点数) - 动量因子。
		正则化 (WeightDecayRegularizer，可选) - 正则化的策略。
		
2. Adm ：Adm本质上是带有动量项的RMSProp，它利用梯度的一阶矩估计和二阶矩估计动态调整每个参数的学习率。Adam的优点主要在于经过偏置校正后，每一次迭代学习率都有个确定范围，使参数比较稳定。
   Adam是一种学习速率自适应的深度神经网络方法，他利用梯度的一阶矩估计和二阶矩估计动态调整每个参数的学习率。
   
3. RMSProp：RMSProp算法通过修改AdaGrad得来，其目的是在非凸背景下效果更好。**针对梯度平方和累计越来越大的问题**，RMSProp指数加权的移动平均代替梯度平方和。RMSProp为了使用移动平均，还引入了一个新的超参数 $\rho$ ，用来控制移动平均的长度范围。
   
   均方根传播 (RMSProp) 是一种未公开的自适应学习率方法。
   参数：learning_rate (float|Variable) - 用于更新参数的学习率。
   可以是浮点值或带有一个浮点值作为数据元素的变量。
   动量 (float) - 动量因子。
   Rho (float) - 方程中的 rho 值。
   Epsilon (float) - 避免除以零，默认值为 1 e-6。
   正则化 (WeightDecayRegularizer，可选) - 正则化的策略。
   
4. Adadelta：Adadelta 是一种自适应学习率方法，是 AdaGrad 的扩展，建立在 AdaGrad 的基础上，旨在减少其过激的、单调递减的学习率。Adadelta 不是积累所有过去的平方梯度，而是将积累的过去梯度的窗口限制为某个固定大小。
   将Adadelta理解为AdaGrad和RMSProp算法的扩展。Adadelta是RMSProp的进一步扩展，旨在提高算法的收敛性并消除对手动指定初始学习率的需要。
   与RMSProp一样，Adadelta为每个参数计算平方偏导数的衰减移动平均值。关键区别在于使用delta的衰减平均值或参数变化来计算参数的步长。
   
5. Adamw：AdamW其实是在Adam的基础上加入了weight decay正则化。
   AdamW和Adam唯一的区别，就是weight decay的加入方式。
   在Adam当中，weight decay是直接加入到梯度当中：
   $$g_{t} = g_{t} + \lambda \theta_{t-1}$$
   其中 $g_{t}$ 是当前 step 的梯度， $\theta_{t-1}$ 是上一个 step 中的模型权重， $\lambda$ 是正则化系数。
   而在 AdamW 中，正则化变成了：
   $$\theta_t=\theta_{t-1}-\gamma \lambda \theta_{t-1}$$
   其中 $\gamma$ 是学习率。
   所以 AdamW 的思路就是直接在权重上进行衰减吗，在收敛速度上也领先于 Adam。

在[此链接](https://openatomworkshop.csdn.net/67400e4dcd8b2677c3e4ab6b.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjIyNzg2LCJleHAiOjE3MzQzNDIwNTMsImlhdCI6MTczMzczNzI1MywidXNlcm5hbWUiOiJ3eXlfMTk4NyJ9.S3Vxz19h58rYl6Bhy3xvmEyKX2Qw5zv-sUId0suDk_c&spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-2-127455203-blog-123965374.235%5Ev43%5Epc_blog_bottom_relevance_base1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-2-127455203-blog-123965374.235%5Ev43%5Epc_blog_bottom_relevance_base1&utm_relevant_index=3#devmenu9) 中，对比了一些优化器

示例一：

![|400](imgs/f49bf000e29e6bad89e730407f6efa33.gif)

示例二：

![|400](imgs/a2c012ca55dc0126455d9336ee4090f3.gif)

示例三：

![|400](imgs/62cd5d161a1cef044ac1211d047db922.gif)



   



