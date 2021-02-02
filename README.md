# 健康板块
基于vue

## 一、项目人员
@杨义明

## 二、设计文档
featuer/V1.0.0  体温检测功能开发

## 三、目录结构
```bash
|-- Desktop
    |-- .gitignore
    |-- LICENSE
    |-- README.md
    |-- babel.config.js
    |-- jest.config.js
    |-- jsconfig.json
    |-- package.json
    |-- postcss.config.js
    |-- vue.config.js      --项目配置
    |-- yarn.lock
    |-- build
    |   |-- index.js
    |-- mock               --本地mock数据      
    |   |-- index.js
    |   |-- mock-server.js
    |   |-- table.js
    |   |-- user.js
    |-- public             --公共资源
    |   |-- favicon.ico
    |   |-- index.html
    |-- src        
    |   |-- App.vue
    |   |-- main.js
    |   |-- permission.js
    |   |-- settings.js
    |   |-- api           
    |   |   |-- table.js
    |   |   |-- user.js
        |-- libs           
    |   |   |-- dsbridge ds协议包
    |   |       |-- index.js
    |   |-- assets
    |   |   |-- 404_images
    |   |       |-- 404.png
    |   |       |-- 404_cloud.png
    |   |-- components       --组件相关
    |   |   |-- Breadcrumb
    |   |   |   |-- index.vue
    |   |   |-- Hamburger
    |   |   |   |-- index.vue
    |   |   |-- SvgIcon
    |   |       |-- index.vue
    |   |-- icons
    |   |   |-- index.js
    |   |   |-- svgo.yml
    |   |   |-- svg
    |   |       |-- dashboard.svg
    |   |       |-- example.svg
    |   |       |-- eye-open.svg
    |   |       |-- eye.svg
    |   |       |-- form.svg
    |   |       |-- link.svg
    |   |       |-- nested.svg
    |   |       |-- password.svg
    |   |       |-- table.svg
    |   |       |-- tree.svg
    |   |       |-- user.svg
    |   |-- layout             --布局相关
    |   |   |-- index.vue
    |   |   |-- components
    |   |   |   |-- AppMain.vue
    |   |   |   |-- Navbar.vue
    |   |   |   |-- index.js
    |   |   |   |-- Sidebar
    |   |   |       |-- FixiOSBug.js
    |   |   |       |-- Item.vue
    |   |   |       |-- Link.vue
    |   |   |       |-- Logo.vue
    |   |   |       |-- SidebarItem.vue
    |   |   |       |-- index.vue
    |   |   |-- mixin
    |   |       |-- ResizeHandler.js
    |   |-- router               --路由配置
    |   |   |-- index.js
    |   |-- store                --状态管理
    |   |   |-- getters.js
    |   |   |-- index.js
    |   |   |-- modules
    |   |       |-- app.js
    |   |       |-- settings.js
    |   |       |-- user.js
    |   |-- styles                --样式管理
    |   |   |-- element-ui.scss
    |   |   |-- index.scss
    |   |   |-- mixin.scss
    |   |   |-- sidebar.scss
    |   |   |-- transition.scss
    |   |   |-- variables.scss
    |   |-- utils                 --工具类
    |   |   |-- auth.js
    |   |   |-- get-page-title.js
    |   |   |-- index.js
    |   |   |-- request.js
    |   |   |-- validate.js
    |   |-- views                 --视图相关
    |       |-- 404.vue
    |       |-- basecenter        --基础管理中心
    |       |   |-- backcolor.vue --背景色管理
    |       |   |-- backimage.vue --背景图管理
    |       |   |-- cover.vue     --封面封皮管理  
    |       |   |-- element.vue   --元素管理
    |       |   |-- format.vue    --版式管理
    |       |   |-- page.vue      --页面管理
    |       |-- templatecenter    --模版管理中心
    |           |-- index.vue
    |-- tests                     --单元测试
        |-- unit
            |-- .eslintrc.js
            |-- components
            |   |-- Breadcrumb.spec.js
            |   |-- Hamburger.spec.js
            |   |-- SvgIcon.spec.js
            |-- utils
                |-- formatTime.spec.js
                |-- parseTime.spec.js
                |-- validate.spec.js

```
## 四、项目启动
```bash
# enter the project directory
cd ztjy-album-admin

# install dependency
npm install

# develop
npm run lint 
npm run dev
```

This will automatically open http://localhost:9528

## 五、项目发布
```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## 六、预览检测 
```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
eslint --ext .js,.vue src --fix 
```


# 开发命令
"local": "vue-cli-service serve --mode local", // 模拟数据开发
"dev": "vue-cli-service serve", // 手机联调接口开发触发DS协议获取手机端数据
"pcdev": "vue-cli-service serve --model pcdev", // pc联调接口开发，没有DS协议可直接在PC端调试
"build:debug": "vue-cli-service build --mode debug", // debug环境编译
"build:prod": "vue-cli-service build", // 生产编译
"build:test": "vue-cli-service build --mode test", // test环境编译
"build:rc": "vue-cli-service build --mode rc", // rc 编译

# debug 模式 页面开启debug 日志调试模式 1开启 0禁用
VUE_APP_DEBUG = 0
url 路径添加参数debug=1 也可开启调试控制台

# 蓝夜体温枪单页面
提供温度解析相关功能
temperatureGun.html