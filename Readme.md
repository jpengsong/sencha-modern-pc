### V1.0 更新日期 2019-12-17
|序号|类型|类名|路径|备注|
|:-----:|:-----:|:-----:|:-----:|:-----:|
|1|组件|comboxtree|app/ux/comboxTree|下拉多选|
|2|组件|echart|app/ux/chart/EChart|百度图表Echart|
|3|组件|dialog|app/ux/page/Dialog|视图弹窗基础类|
|4|组件|page|app/ux/page/Page|视图页面基础类|
|5|组件|treepage|app/ux/page/TreePage|视图页面基础类|
|6|插件|pagination|app/ux/plugin/Pagination|分页插件|
|7|插件|requestdata|app/ux/plugin/RequestData|组件请求插件|
|8|代理|api|app/ux/proxy/API|Store通过Proxy请求本地模拟数据|
|9|代理|server|app/ux/proxy/Server|Store通过Proxy请求远程数据|
|10|读取|jsonreader|app/ux/reader/JsonReader|proxy请求(本地/远程)json数据,返回来做统一处理|
|11|组件|ztree|app/ux/tree/Ztree||
|12|组件|fileuploader|app/ux/upload/FileUploader|百度WebUploader上传文件|
|13|方法|ajax|app/ux/utilty/Ajax|Ajax.request请求|
|14|方法|config|app/ux/utilty/Config|全局配置类|
|15|方法|cookie|app/ux/utilty/Cookie|操作Cookie的工具类|
|16|方法|privilege|app/ux/utilty/Privilege|控制组件是否具有权限|
|17|方法|responsecode|app/ux/utilty/ResponseCode|操作ResponseCode的工具类|
|18|方法|simulatedb|app/ux/utilty/SimulateDB|本地模拟数据数据库|
|19|方法|treenode|app/ux/utilty/TreeNode|格式化树节点数据 用于第三方树插件和TreeSotre|
|20|方法|userinfo|app/ux/utilty/UserInfo|处理用户信息的工具类|
|21|方法|simulated|app/data/Simulated|请求模拟数据的基础操作类|
|22|重写|passwordfield|overrides/field/PasswordField|重写密码框组件,支持密码显隐|
|23|重写|loadmask|overrides/loadmask/LoadMask|遮罩层组件，需要样式配合|
|24|重写|row|overrides/selection/Row|列表在有分页情况下，修复在全选后不能取消全选|
|25|重写|jsonsimlet|overrides/simlet/JsonSimlet|返回前台模拟数据|