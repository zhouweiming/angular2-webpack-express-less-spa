2016-08-05
----

+ ####更新：

   1. 调整component的less引入方式：
       + 之前是component的样式使用styles＋require的方式引入，样式会被编译在component所在的js文件中
           + 缺陷：因为被编译进js文件，sourcemap断链，也不能正确解析样式里面的资源引用问题，raw和css两个loader不能同时使用。
       + 调整为通过import和styleUrls引入
           + 解决之前的所有缺陷

   2. 分拆公共样式文件和组件样式文件的webpack配置。
   3. 调整部分生产环境的发布配置。
   4. 加入bootstrap样式库，测试集成第三方样式。

+ ####feature:

    1. 加入单元测试。
    2. 实现的`DBServer`和`BaseService`：
       + 优点：统一接口路由管理，可以模拟非get请求，可以模拟一些请求逻辑
       + 缺点：无法提前看到真实的请求，如在chrome调试器的network选项中看到请求，可以检查具体的请求参数格式、请求头部等等信息，后面需要改进。
    3. 完善生产环境的配置。
    4. 加入代码规范检查。

2016-08-05
----

+ ####更新：

   1. 解决浏览器报`hot-update.json`跨域的错误。
   2. 分拆`index.ts`文件为`common.ts`和`index.ts`，加快编译速度。
   3. 加入了测试数据的请求，自己写了一个`DBServer`的provider和一个基础的`BaseService`（实现在`public/services/callserver.ts`），实现的功能：
       + 只需要在`public/app.service.route.ts`中添加一个后台请求的路由配置，便可以使用`BaseService`访问该路由的请求接口，如：

           ````
           app.service.route.ts 文件中配置：
               user: get_all_user_login_log //具体格式参见具体文件

           对应的使用方法：
               let userService = new BaseService("user");
               userService.getAllUserLoginLog(params).then(result => console.info(result))

           ````
       + `DBServer`可以自动切换development和production环境下的请求方式。
       + 结合`public/dev_db`来实现开发环境的测试。
    4. 补全了本项目标题中`SPA`一环。

+ ####feature:

    1. 加入单元测试。
    2. 实现的`DBServer`和`BaseService`：
       + 优点：统一接口路由管理，可以模拟非get请求，可以模拟一些请求逻辑
       + 缺点：无法提前看到真实的请求，如在chrome调试器的network选项中看到请求，可以检查具体的请求参数格式、请求头部等等信息，后面需要改进。
    3. 发布环境的配置。
    4. 加入eslint检查。