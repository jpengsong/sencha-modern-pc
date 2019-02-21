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

 - `"build"` - This folder contain the output of the build. The generated CSS file,
   consolidated resources and concatenated JavaScript file are all stored in this
   folder.
 - `"bootstrap.*"` - These files are generated by the build and watch commands to
   enable the application to load in "development mode".

## Basic Application Structure

Applications that target a single toolkit will have the following structure.

    app/                # Contains JavaScript and Theme code
        model/          # Data model classes
        view/           # Views as well as ViewModels and ViewControllers
        store/          # Data stores
        controller/     # Global / application-level controllers

    overrides/          # JavaScript code that is automatically required

    resources/          # Assets such as images, fonts, etc.

### app/

This folder contains JavaScript (.js files) and styling (.scss files) common
for all builds of the application.

#### app/controller/

This folder contains the application's global controllers. ViewControllers are located
alongside their respective view class in `"./view"`. These controllers are used for routing
and other activities that span all views.

#### app/model/

This folder contains the application's (data) Model classes.

#### app/view/

This folder contains the views as well as ViewModels and ViewControllers depending on the
application's architecture. Pure MVC applications may not have ViewModels, for example. For
MVCVM applications or MVC applications that use ViewControllers, the following directory
structure is recommended:

    app/view/
        foo/                    # Some meaningful grouping of one or more views
            Foo.js              # The view class
            Foo.scss            # The view class styling
            FooController.js    # The controller for Foo (a ViewController)
            FooModel.js         # The ViewModel for Foo

This structure helps keep these closely related classes together and easily identifiable in
most tabbed IDE's or text editors.

#### app/store/

This folder contains any number of store instances or types that can then be reused in the
application.

## Overrides

The contents of "overrides" folders are automatically required and included in
builds. These should not be explicitly mentioned in "requires" or "uses" in code.
This area is intended for overrides like these:

    Ext.define('app.overrides.foo.Bar', {
        override: 'Ext.foo.Bar',
        ...
    });

Such overrides, while automatically required, will only be included if their target
class ("Ext.foo.Bar" in this case) is also required. This simplifies applying
patches or extensions to other classes.

