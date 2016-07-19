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

经历
----
1. 本来打算`server`部分也全部使用`typescript`编写，但最后放弃。原因：
   + 我要做的是单页面应用，`server`部分的所有代码就两个文件（`app.js`、`config/app.js`），加起来不超过200行代码，而且写完后几乎不变。
   + 因为我希望不在开发阶段看到中间的转换代码文件，但是`server`部分的代码必须先经过`tsc`编译才能使用，一编译，必然会生成中间转换文件，如果开了sourcemap，还会生成map文件（这一块我用了个笨办法，开发目录纯开发，并不会在`src`目录启动服务，而是用`gulp watch`，有文件变化时，将`src`目录整体发布到`dev`目录，在`dev`目录下会有`tsc -w`来自动编译，然后`webpack`检测到有变化时，再更新，做完后，因为第一条的原因感觉吃力不讨好，就撤销了）。
   + 或许我没有找到更好的方式，希望有大大赐教。


2. 使用webpack时，会遇到<https://segmentfault.com/a/1190000004516832>里面所说的`ejs`文件更新时，不会自动刷新的问题，但并没有采用该地址所说的文件监听方式，是在`ejs`中写死开发模式下的加载脚本，而不用webpack的处理机制。

遗留
----
1. 对于`component`中reqiure的less，无法做到局部刷新，正在修改。