# cloudMusic

本作品仅供学习使用：“网抑云”音乐播放器项目

仅供个人学习~!

`目前尚有许多BUG，亟待完善！`

- [B 站预览](https://www.bilibili.com/video/BV18b4y1X7TR/)
- [码云地址](https://gitee.com/snowfield-wolf/cloud-music)
- [github 地址](https://github.com/PhoenixJane/phoenix_CloudMusic.git)
- [API 地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

## 技术栈

> 1. Vue
> 2. ElementUi
> 3. Vuex
> 4. Vue-Cli

## 主要功能

- 榜单的 banner 轮播图
- 热门音乐，新碟上架，新歌榜榜单模块
- 登录模块(网易账号)
- 我的音乐模块(需登录)
- 歌单播放, 单曲播放
- 歌曲详情页

## 快速启动

`当前项目目录下,路径输入cmd进入命令行`

```cmd
npm install # 安装项目所需的依赖(如果速度过慢可以尝试cnpm, 或用nrm修改为淘宝镜像)
node app.js #记得先下载网易云后台项目接口，然后在接口文件夹路径下通过终端输入命令
npm run serve #启动项目服务
```

此时, 浏览器打开, 输入网址http://localhost:8080,此时项目就完全跑起来了!

## 图片预览

> 1. 登录界面

![登录界面](./preview/loginPreview.png)

> 2. 主界面

![主界面](./preview/indexPreview.png)

> 3. 未登录时的"我的音乐"界面

![未登录时的"我的音乐"界面](./preview/pleaseLoginPreview.png)

> 4. 登录后的"我的音乐"界面

![登录后的"我的音乐"界面](./preview/myMusicPreview.png)

> 5. 热门音乐界面

![热门音乐界面](./preview/hotMusiPreview.png)

> 6. 下载界面

![下载界面](./preview/downloadPreview.png)

> 7. 退出界面

![退出界面](./preview/logoutPreview.png)

## 警告

> 1. 本项目仅用于学习练习, 本人不承担任何恶意使用后果
> 2. 本项目代码遵循开源协议

## 致谢

本项目基于或参考以下项目：

[后台接口项目](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
