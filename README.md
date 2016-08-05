# angular2-webpack-express-less-spa

折腾了许久，终于把开发模式搞定了。

依赖环境
----
1. node>=6.0.0
2. npm>=3.8.9

运行
-----
1. 开发模式

   ```
   cd src
   npm install
   npm run dev
   ```

2. 生产模式（待补充）

参考
----
<http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack>
<https://angular.cn/docs/ts/latest/guide/typescript-configuration.html>
<https://angular.cn/docs/ts/latest/guide/webpack.html>
<https://github.com/vhtml/webpack-MultiplePage.git>
<https://segmentfault.com/a/1190000004516832>

目标：全栈自动刷新
----
1. 静态资源（js、css、图片、ts等）更新时，不刷新页面局部自动更新。
2. express的视图（如ejs文件）更新时，不重启服务，页面自动刷新。
3. 开发阶段不希望在`src`目录中看到`ts`、`.less`文件转换后的`.js`、`.js.map`、`.css`文件。

遗留
----
1. windows系统上启动不起来，错误原因估计类似<https://github.com/webpack/webpack/issues/2362>，暂时不解决了，已经让同事们全部换成了mac。