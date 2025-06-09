## 数据集

选用 CCPD 2019 中的 base 数据集，结合 CCPD 2020 全部数据集，总共数据集为

```Shell
nohup python -m paddle.distributed.launch --gpus '0,1' tools/train.py -c configs/det/PP-OCRv4/PP-OCRv4_mobile_det.yml -o Train.dataset.data_dir=/work/paddle/PaddleOCR/DATA/ccpd_base Train.dataset.label_file_list=[/work/paddle/PaddleOCR/DATA/ccpd/train/det_new.txt] Eval.dataset.data_dir=/work/paddle/PaddleOCR/DATA/ccpd_base Eval.dataset.label_file_list=[/work/paddle/PaddleOCR/DATA/ccpd/val/det_new2.txt] > log_det.out 2>&1 &
```

首先使用上面的脚本进行训练检测模型，