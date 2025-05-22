---
tags: 
comment: true
---
环境安装：

```shell
pip install aliyun-python-sdk-core-v3 aliyun-python-sdk-alidns==2.0.6 pyyaml
```

这个版本是 1.0 的阿里云 sdk 版本

实现代码如下：

```python
import json  
import yaml  
import sys  
from aliyunsdkcore.client import AcsClient  
from aliyunsdkalidns.request.v20150109.DescribeDomainRecordsRequest import DescribeDomainRecordsRequest  
from aliyunsdkalidns.request.v20150109.UpdateDomainRecordRequest import UpdateDomainRecordRequest  
from aliyunsdkalidns.request.v20150109.AddDomainRecordRequest import AddDomainRecordRequest  
# from aliyunsdkcore.auth.credentials import AccessKeyCredential  
  
  
def AliAccessKey(id, Secret, region):  
    try:  
        client = AcsClient(id, Secret, region)  
        return client  
    except Exception as e:  
        print("验证aliyun key失败")  
        print(e)  
        sys.exit(-1)  
  
  
def read_yaml(filename):  
    try:  
        yaml_file = open(filename, "rb")  
        yaml_data = yaml.safe_load(yaml_file)  
        yaml_file.close()  
        return yaml_data  
    except Exception as e:  
        print("读取配置文件错误")  
        print(e)  
        sys.exit(-1)  
  
def AddMultipleDomainRecords(client, yaml_data):  
    try:  
        # 遍历多个RR  
        for rr in yaml_data['UserData']['RR']:  
            # 获取对应的 RecordId            # RecordId = GetDNSRecordId(yaml_data, client, yaml_data['UserData']['DomainName'], rr)            # 更新记录  
            AddDomainRecord(client, yaml_data, rr)  
    except Exception as e:  
        print("批量添加域名解析失败")  
        print(e)  
  
  
def AddDomainRecord(client, yaml_data, rr):  
    try:  
        request = AddDomainRecordRequest()  
        request.set_accept_format('json')  
  
        if 'Auto_Lines' == yaml_data['UserData']['UpdateDomain']:  
            DomainValue = sys.argv[1]  
        else:  
            DomainValue = yaml_data['UserData']['UpdateDomain']  
        request.set_DomainName("openctia.site")  
        # request.set_Value(DomainValue)  
        request.set_Type(yaml_data['UserData']['DomainType'])  
        request.set_RR(rr)  
        request.set_Value(DomainValue)  
        # request.set_RecordId(RecordId)  
        response = client.do_action_with_exception(request)  
        print(f"添加主机 {rr} 的域名解析成功")  
        print(  
            f"域名: {yaml_data['UserData']['DomainName']} 主机: {rr} 记录类型: {yaml_data['UserData']['DomainType']} 记录值: {DomainValue}")  
    except Exception as e:  
        print(f"添加主机 {rr} 的域名解析失败")  
        print(e)  
  
  
def UpdateMultipleDomainRecords(client, yaml_data):  
    try:  
        # 遍历多个RR  
        for rr in yaml_data['UserData']['RR']:  
            # 获取对应的 RecordId            RecordId = GetDNSRecordId(yaml_data, client, yaml_data['UserData']['DomainName'], rr)  
            # 更新记录  
            UpdateDomainRecord(client, yaml_data, RecordId, rr)  
    except Exception as e:  
        print("批量更新域名解析失败")  
        print(e)  
  
  
def GetDNSRecordId(yaml_data, client, DomainName, rr):  
    try:  
        request = DescribeDomainRecordsRequest()  
        request.set_accept_format('json')  
        request.set_DomainName(DomainName)  
        request.set_PageSize(500)  
        response = client.do_action_with_exception(request)  
        json_data = json.loads(str(response, encoding='utf-8'))  
        # print(json_data)  
        for Record in json_data['DomainRecords']['Record']:  
            # print(Record['RR'])  
            if rr == Record['RR']:  
                return Record['RecordId']  
    except Exception as e:  
        print(f"获取主机 {rr} 的 RecordId 失败")  
        print(e)  
        sys.exit(-1)  
  
  
def UpdateDomainRecord(client, yaml_data, RecordId, rr):  
    try:  
        request = UpdateDomainRecordRequest()  
        request.set_accept_format('json')  
  
        if 'Auto_Lines' == yaml_data['UserData']['UpdateDomain']:  
            DomainValue = sys.argv[1]  
        else:  
            DomainValue = yaml_data['UserData']['UpdateDomain']  
  
        request.set_Value(DomainValue)  
        request.set_Type(yaml_data['UserData']['DomainType'])  
        request.set_RR(rr)  
        request.set_RecordId(RecordId)  
        response = client.do_action_with_exception(request)  
        print(f"更新主机 {rr} 的域名解析成功")  
        print(  
            f"域名: {yaml_data['UserData']['DomainName']} 主机: {rr} 记录类型: {yaml_data['UserData']['DomainType']} 记录值: {DomainValue}")  
    except Exception as e:  
        print(f"更新主机 {rr} 的域名解析失败")  
        print(e)  
  
  
def main():  
    yaml_data = read_yaml('./conf.yaml')  
    client = AliAccessKey(yaml_data['AliyunData']['AccessKey_ID'], yaml_data['AliyunData']['Access_Key_Secret'],  
                          yaml_data['AliyunData']['region_id'])  
    # UpdateMultipleDomainRecords(client, yaml_data)  
    AddMultipleDomainRecords(client, yaml_data)  
  
  
if __name__ == "__main__":  
    main()
```

Yaml 文件配置如下：

```yaml
# 阿里云信息，从阿里云获取填写即可  
AliyunData:  
  # 阿里云的AccessKey_ID , Access_Key_Secret , region_id  
  # 获取方法，参考文档: https://help.aliyun.com/knowledge_detail/38738.html  
  AccessKey_ID: 'LTAI5tPY8Znv9WxPp57QhDNK'  
  Access_Key_Secret: 'EL7uXLfFqsucQ4S5VGEvHq5qezCQza'  
  region_id: "cn-shanghai"  
  
# DNS解析信息  
UserData:  
  # 需要修改的域名  
  DomainName: 'openctia.site'  
  # 解析的主机  
#  RR: ['jump','mc','plan','office','answer','hicoding','nebulacoding',  
#       'mail','www','@','mfa','code','person','forum','emqx','board','panel','manager',  
#       'os','picture','photo','pdf','doc','cloud','box','registry','bookmark',  
#       'pad','paste','dns','draw','waf','team','sync','cicd','ssh','ebook','blog',  
#       'auth','home','gist','file','note','flow','git']  
  RR : ['jump','mc']  
#  RR: [ 'manager','os','picture','photo','pdf','doc','cloud','box','registry','bookmark',  
#        'pad','paste','dns','draw','waf','team','sync','cicd','ssh','ebook','blog',  
#        'auth','home','gist','file','note','flow','git' ]  
  # 解析的记录  
  DomainType: 'A'  
  # 解析更新的值，如果填写 Auto_Lines ,则从命令行获取  
  UpdateDomain: '106.14.168.42'  
  
#  Value: '47.100.174.11'  
  #UpdateDomain: '127.0.0.1'
```

实现结果如下：

![](imgs/Pasted%20image%2020250522115151.png)

