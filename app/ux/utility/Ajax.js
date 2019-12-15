/**
 * Ext请求数据 
 */
Ext.define("App.ux.utility.Ajax", {
    alternateClassName: ['App.Ajax'],
    statics: {
        /**
        * 发起Ajax.request请求
        * @param {Object} option 包含下列属性的对象
        * @param {Object} option.data 传给后台的参数
        * @param {Object} option.baseUrl 提交至后台的url地址，缺省为``
        * @param {String} option.url 提交至后台的url接口
        * @param {String} option.method 提交方法，缺省为`POST`
        * @param {String} option.type 返回类型，缺省为`JSON`
        * @param {String} option.params 提交的其他参数
        * @param {Function} option.success 提交成功后执行的函数
        * @param {Function} option.error 提交失败后执行的函数
        * @param {Boolean} option.async 是否异步提交数据，缺省为`true`
        * @param {Number} option.timeout 请求延时，毫秒，缺省为`30000`
        * @param {Object} option.scope 作用域，缺省为`this`
        * @param {Boolean} option.nosim 参数设置 false 请求本地接口,true 请求远程接口 缺省为true
        * @param {Boolean} option.showmask 参数设置true显示遮罩
        * @param {String} option.maskmsg 遮罩显示消息 缺省为 '正在请求数据...'
        * 使用例子如下：
        * App.Ajax.request({
        *    url: "/api/SystemManage/SysUser/AddSysUser""),
        *    method: "POST"),
        *    nosim: false,
        *    type: "JSON",
        *    showmask: true,
        *    maskmsg: "正在保存...",
        *    params: user.getData(),
        *    success: function (response) {
        *               
        *    },
        *    error: function (msg) {
        *               
        *    }
        * })
        */
        request: function (option) {
            var me = this, ajaxConfig, myMask;
            if (option.showmask) {
                myMask = Ext.create({
                    xtype: "loadmask",
                    displayed:true,
                    floated:true,
                    message: option.maskmsg || '正在请求数据...'
                });
            }
            ajaxConfig = {
                defaultHeaders: {
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                url: option.url || "",
                method: option.method || "POST",
                nosim: Ext.isEmpty(option.nosim) ? true : option.nosim,
                params: Ext.apply({ RequestData: me.getRequestData(option.params) }),
                async: option.async || true, //异步请求数据
                timeout: option.timeout || 30000,
                success: function (response) {
                    if (option.showmask) {
                        myMask.destroy();
                    }
                    var responseData = response.responseText;
                    responseData = Ext.decode(responseData);
                    if (option.type == "JSON" && responseData.Data != "") {
                        responseData.Data = Ext.decode(responseData.Data);
                    }
                    me.processData(responseData, option);
                },
                failure: function (response) {
                    if (option.showmask) {
                        myMask.destroy();
                    }
                    if (response.status == 0) {
                        Ext.Msg.alert("提示","未连接到服务接口");
                    } else {
                        if (Ext.isFunction(option.error)) {
                            option.error(response);
                        }
                    }

                }
            };

            //远程请求加上 config.url地址
            if (ajaxConfig.nosim) {
                ajaxConfig.url = config.Url + ajaxConfig.url;
            }

            //本地模拟请求
            if (!ajaxConfig.nosim) {
                if (Ext.util.Format.uppercase(ajaxConfig.method) == "PUT" || Ext.util.Format.uppercase(ajaxConfig.method) == "DELETE") {
                    ajaxConfig.method = "POST";
                }
            }
            Ext.Ajax.request(ajaxConfig);
        },

        /**
        * 获取 RequestData ,适用于所有请求。
        * 请求后台action有固定的格式，包括TokenGuid和Data。
        * 此方法根据传入参数构造出一个标准json格式的数据，一般不直接调用。
        * 
        * @param {Object} option 包含下列属性的对象
        * @param {Object} oData 传给后台的参数
        * @static
        * @private
        */
        getRequestData: function (oData) {
            var me = this, data = "";
            if (Ext.isEmpty(data)) {
                if (Ext.typeOf(oData) === "object" || Ext.typeOf(oData) === "array") {
                    data = Ext.encode(oData);
                } else {
                    data = oData;
                }
            }
            return Ext.encode({ TokenGuid: me.getUserToken(), Data: data });
        },

        /**
         * 获取用户token
         * @return {String} 当前用户token
         */
        getUserToken: function () {
            var token = "";
            if (Ext.isEmpty(App.UserInfo.Token)) {
                token = Ext.util.Cookies.get("TokenGuid");
            }
            else {
                token = App.UserInfo.Token;
            }
            return token;
        },

        /**
        * 处理返回结果
        */
        processData: function (responseData, option) {
            //执行成功
            if (responseData.Code.indexOf(".I_") > 0) {
                if (Ext.isFunction(option.success)) {
                    option.success(responseData);
                }
            } else {

                //用户未登录
                if (responseData.Code === App.ResponseCode.UserNotLogon) {
                    App.Cookie.DeleteCookie("TokenGuid");
                    window.location = document.location.href.substring(0, document.location.href.indexOf(document.location.pathname)) + "/#view.login";
                    return;
                }

                //走异常处理
                if (Ext.isFunction(option.error)) {
                    option.error(responseData.Message);
                }
                else {
                    Ext.Msg.alert("提示",responseData.Message);
                }
            }
        }
    }
})