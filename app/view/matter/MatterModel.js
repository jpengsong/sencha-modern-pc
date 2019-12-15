Ext.define("App.view.matter.MatterModel", {
    extend: 'Ext.app.ViewModel',
    alias: "viewmodel.matter",
    data: {
        example_1: `<pre style='text-align:left'>
                        Ext.define('<code style='color:red'>App.view.systemmanage.sysuser.SysUser'</code>, //所有类的首单词和末尾单词采用大写其余小写{
                        &nbsp;extend: 'App.ux.page.Page',
                        &nbsp;xtype: <code style='color:red'>'sysuser'</code>,    //所有类的别名（alias或xtype采用小写，名称过长可以用 '_' 划分 例：sys_user ）
                        &nbsp;name:'xxx'         //类的属性采用全小写，严禁大写 例：Name
                        });
                    </pre>`,
        example_2: `<pre>
                        //方法事件的方法名开头以 <code style='color:red'>on</code> 开头 注意小写
                        //每个方法之间空出一行间距
                        //非公共或特殊需求说明方法体禁止注释滥用 适用所有地方
                        //严禁无用代码出现方法中保持代码简洁 适用所有地方
                        Ext.define('App.view.systemmanage.sysuser.SysUserController', {
                            &nbsp;extend: 'Ext.app.ViewController'
                            &nbsp;alias: 'controller.sysuser'
                            &nbsp;//新增
                            &nbsp;<code style='color:red'>on</code>Add: function () {...}
                            &nbsp;//修改
                            &nbsp;<code style='color:red'>on</code>Edit: function () {...}
                            &nbsp;//删除
                            &nbsp;<code style='color:red'>on</code>Del: function () {...}
                        })
                    </pre>`,
        example_3: `<pre>
                    //非全局定义id和防止id冲突以及整体规范约束，开发中不建议在组件上定义id，查找组件可以使用以下几项方法
                    1:使用 reference:'xxx' 在controller中获取
                    2:donw()或up()
                    3:使用Ext.ComponentQuery查找
                </pre>`,
        example_4: `<pre>
                    //建议按照业务来划分项目文件夹
                    App
                    &nbsp;view
                    &nbsp;&nbsp;systemmanager
                    &nbsp;&nbsp;&nbsp;sysrole
                    &nbsp;&nbsp;&nbsp;&nbsp;SysRole.js
                    &nbsp;&nbsp;&nbsp;&nbsp;SysController.js
                    &nbsp;&nbsp;&nbsp;&nbsp;SysModel.js
                    </pre>`,
        example_5: `<pre>
                    //建议抛弃6之前版本和传统开发模式，采用前后端分离，遵循官方给的结构方案
                    App
                    &nbsp;data
                    &nbsp;model
                    &nbsp;store
                    &nbsp;ux
                    &nbsp;view
                    &nbsp;Application.js
                    &nbsp;Application.scss
                    ext
                    overrides
                    resources
                    sass
                    app.js
                    app.json
                    bootstrap.css
                    bootstrap.js
                    bootstrap.json
                    bootstrap.jsonp
                    build.xml
                    index.html
                    workspace.json
                </pre>`,
        example_6: `<pre>
                    所有编写css最终是以全局引用而并非局部引用，为防止css命名冲突 若非定义全局css命名，建议css命名按照业务划分命名 例：
                    &nbsp;1：给登录页定义样式 .authentication-login
                    &nbsp;2：给用户管理页定义样式 .systemmanage-sysuser
                    子样式不要全局裸露 应定义在父容器里面， 例
                    .authentication-login {
                    &nbsp;.authentication-xxx{
                    &nbsp;&nbsp;padding:xxx
                    &nbsp;}
                    }
                </pre>`,
        example_7: `<pre>
                            为提高开发者的开发维护效率使其更好专注于业务开发方面，建议将<span style='color:red'>架构</span>交给专人负责，用于解决日常遇到的问题，定期进行版本迭代，普通开发按照业务进行日常<span style='color:red'>开发</span>
                   </pre>`
    }
})