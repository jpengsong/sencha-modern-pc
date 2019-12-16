# app

此文件夹主要是应用程序顶级部分的容器。

虽然可以删除此应用程序不使用的某些文件和文件夹，

在决定删除什么和需要删除什么之前，请务必阅读下面的内容

保存在源代码管理中。

生成和加载应用程序都需要以下文件。

 - `"app.json"` - 控制应用程序方式的应用程序描述符建造和装载。
 - `"app.js"` - 启动应用程序的文件。主要用于启动'myapp.application'类的实例。
 - `"index.html"` - 此应用程序的默认网页。这可以在“app.json”中定制。
 - `"build.xml"` - sencha命令访问生成的生成的入口点 脚本。这个文件是一个可以钩住这些进程并进行优化的地方。 他们。有关详细信息，请参阅该文件中的注释。

    当这些文件由生成重新生成时，可以从源代码管理中忽略它们。

    过程。

 - `"build"` - 此文件夹包含生成的输出。生成的css文件，

    合并的资源和连接的javascript文件都存储在

    文件夹。
 - `"bootstrap.*"` - 这些文件由build和watch命令生成

    使应用程序能够以“开发模式”加载。

## 基本应用结构

针对单个工具包的应用程序将具有以下结构。

    app/                # 包含javascript和主题代码
        model/          # 数据模型类
        view/           # 视图以及视图模型和视图控制器
        store/          # 数据存储
        ux/             # 封装的公共组件和公共方法
        data/           # 模拟数据


    overrides/          # 重写框架类

    resources/          # 图片,字体,文件

    sass/               # 系统主题样式

### app/

此文件夹包含javascript（.js文件）和样式（.scss文件）common
对于应用程序的所有版本。

#### app/model/

此文件夹包含应用程序的（数据）模型类。

#### app/view/

此文件夹包含视图以及视模型和视控制器，具体取决于

应用程序的体系结构。例如，纯MVC应用程序可能没有视图模型。为了

使用viewcontrollers的MVCVM应用程序或MVC应用程序，如下目录

建议结构：

    app/view/
        systemmanage/                           # 模块文件夹
            sysuser/                            # 对一个或多个视图的分组
                SysUser.js                      # 视图页面
                SysUserController.js            # 视图事件
                SysUserModel.js                 # 视图模型

这种结构有助于将这些密切相关的类放在一起，并在

大多数选项卡式IDE或文本编辑器。

#### app/data/

模拟前台数据源

#### app/store/

此文件夹包含任意数量的存储实例或类型，然后可以在应用。

#### app/ux/

封装日常常用的公共组件和公共方法的目录，例如：查询组件,下拉框,基础页面,Ajax请求数据方法...

## overrides

“覆盖”文件夹的内容是自动必需的，并包含在

生成。这些不应该在代码的“requires”或“uses”中明确提及。

此区域用于如下覆盖：

        Ext.define("App.overrides.window.Window", {
            override: "Ext.window.Window",
            closeToolText: "关闭窗口"
        });

这些覆盖，虽然是自动要求的，但只有在其目标 还需要类（“ext.foo.bar”在本例中）。这简化了应用 其他类的补丁或扩展。

## resources
存放一些文件,图片,字体的目录

## sass
    etc/     # 附加的实用功能或混合。
    src/     # 使用中定义的变量调用规则和UI mixin sass/var。
    var/     # 按类名组织的变量定义
        sass/var/all.scss - 全局变量设置。
    example  #使用Sencha Cmd为IE8 / 9执行图像切片（不要删除）。（仅限经典）
