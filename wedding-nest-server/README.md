## 介绍

node后端+nest框架

用于给婚礼抽奖H5提供后端api

src下面大部分模块都是之前尝试开发的试验品，主要是提供了typeorm+db数据库+hbs数据模板渲染的玩法，也可供各位自己把玩研究

真正使用到的只有auth模块

提供了获取参加婚宴的列表用于抽奖

提供了所有评论列表用于大屏弹幕循环显示


## 安装 
```
 npm i --registry=https://registry.npmjs.org/ 
```

## 注意事项

wedding-nest-server/src/auth/services/auth.service.ts 依赖对应婚礼小程序的appid和screct秘钥,云开发的环境ID--ENV 

前两个参数都可以在小程序平台上拿到

否则后端启动会有问题

开发 => 开发管理 => 开发设置 => 开发者ID

云开发的ENV要在小程序开发者工具里面找到云开发环境，然后找到ID即可

```
export const config= {
    "appid": "xxx",
    "secret": "xxx",
    "ENV": "xxx"
}
```
然后把这3个数据放到src目录的weapp-screct-key.ts里面（文件不存在则自己创建）
## 本地开发
```
npm run start:dev
```
## 打包

```
npm run build
```

## License
  Nest is [MIT licensed](LICENSE).
