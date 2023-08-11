## 介绍

node后端+nest框架,已经重构完成了。

提供了小程序和婚礼抽奖的全部api


## 安装 
```
 npm i --registry=https://registry.npmjs.org/ 
```

## 注意事项

### 重要的文件更名！

把src/weapp-screct-key.sample.ts更名成weapp-screct-key.ts

把db.sample.sqlite更名成db.sqlite

wedding-nest-server/src/auth/services/auth.service.ts 依赖对应婚礼小程序的appid和screct秘钥

前两个参数都可以在小程序平台上拿到

否则后端启动会有问题

然后把这3个数据放到src目录的weapp-screct-key.ts里面（文件不存在则自己创建）


## 本地开发
```
npm run start:dev
```
## 打包

```
npm run build
```

## 部署
需要事先安装pm2

```
npm install pm2 -g

如果权限不够就用
sudo npm install pm2 -g
```

执行wedding-nest-server下的reload.sh即可

执行pm2可查看当前部署的后台状态
