/**
  * 控制组件是否具有权限
  *      
  * {
  *   text: ResManager.getControlString("Public.Add"),
  *   hidden: App.Privilege.isHide("CodeTable_New"),
  *   scope: this
  * }
  * 
  * 例子中是一个按钮控件，对应一个操作权限`CodeTable_New`，在hidden配置里调用本函数。
  * 如果当前用户不具有此权限，按钮会隐藏。
  * @param {String} bizCode 控件对应的业务代码
  * @return {Boolean} 当不具有该业务代码的权限时，返回`false`
  * @static
*/
Ext.define('App.ux.utility.Privilege', {
    alternateClassName: ['App.Privilege'],

    statics: {
        
        isHide: function (bizCode) {
            if (App.UserInfo.IsSuperUser) {
                return false;
            } else {
                var ret = true;
                for (var i = 0; i < App.UserInfo.BizCodes.length; i++) {
                    if (App.UserInfo.BizCodes[i] == bizCode) {
                        ret = false;
                        break;
                    }
                }
                return ret;
            }
        },
        /**
        * 获取业务编码列表 
        * @param {Function} callback 获取后执行的回调函数
        */
        getBizCode: function (callback) {
            App.Ajax.request({
                ActionCode: "System_GetMyBusiness",
                async: false,
                success: function (responseData) {
                    //var bizList = Ext.decode(data.Content);
                    //存储到全局变量中
                    App.UserInfo.BizCodes = [];
                    for (var i = 0; i < responseData.Data.length; i++) {
                        App.UserInfo.BizCodes[i] = responseData.Data[i].btn_CODE;
                    }
                    if (Ext.isFunction(callback)) {
                        callback();
                    }
                },
                error: function (msg) {

                }
            });
        }
    }
});
