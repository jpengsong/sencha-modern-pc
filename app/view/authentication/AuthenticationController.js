Ext.define("App.view.authentication.AuthenticationController", {
    extend: 'App.ux.app.ViewController',
    alias: 'controller.authentication',

    //解除锁定
    onRemoveLock: function () {
        var me = this, refs = me.getReferences(), loginPwd = refs.loginPwd.getValue();
        if (App.UserInfo.LoginPassWord == loginPwd) {
            App.Ajax.request({
                url: "/api/Token",
                method: "POST",
                nosim: false,
                type: "JSON",
                showmask: true,
                maskmsg: "解锁中...",
                params: {
                    LoginName: App.UserInfo.LoginName,
                    LoginPassWord: App.UserInfo.LoginPassWord
                },
                success: function (rs) {
                    if (!Ext.isEmpty(rs.Data)) {
                        var data = rs.Data;
                        App.UserInfo.Token = data.Token;
                        App.UserInfo.IsSuperUser = data.IsSuperUser;
                        App.UserInfo.UserID = data.UserID;
                        App.UserInfo.UserName = data.UserName;
                        App.Cookie.SetCookie("TokenGuid", data.Token);
                        Ext.util.History.back();
                    } else {
                        Ext.Msg.alert("提示","密码不正确");
                    }
                },
                error: function (data) {
                    Ext.Msg.alert("提示","锁定异常");
                }
            })
        } else {
            Ext.Msg.alert("提示","密码输入错误");
        }
    },

    //解锁页面跳转到登录页面
    onLockTarget:function(){
        var me =this;
        App.UserInfo.Token = null;
        App.Cookie.DeleteCookie("TokenGuid");
        me.redirectTo('view.login', true);
    },

    //登录
    onLoginClick: function () {
        var me = this, url,showmask, params, tokenGuid = App.Cookie.GetCookie("TokenGuid"), refs = me.getReferences(), form = refs.form, loginName = refs.loginName.getValue(), loginPwd = refs.loginPwd.getValue();
        if (!Ext.isEmpty(tokenGuid)) {
            showmask=false;
            url = "/api/ValidaToken";
        } else {
            showmask=true;
            url = "/api/Token";
            params = {
                LoginName: loginName,
                LoginPassWord: loginPwd
            }
        }
        if (form.validate()) {
            App.Ajax.request({
                url: url,
                method: "POST",
                nosim: false,
                type: "JSON",
                showmask: showmask,
                maskmsg: "登录中...",
                params: params,
                success: function (rs) {
                    if (!Ext.isEmpty(rs.Data)) {
                        var data = rs.Data;
                        App.UserInfo.Token = data.Token;
                        App.UserInfo.IsSuperUser = data.IsSuperUser;
                        App.UserInfo.UserID = data.UserID;
                        App.UserInfo.UserName = data.UserName;
                        App.UserInfo.LoginName = data.LoginName;
                        App.UserInfo.LoginPassWord = data.LoginPassWord;
                        App.UserInfo.MenuLocation = data.MenuLocation;
                        App.UserInfo.DarkMode = data.DarkMode;
                        App.UserInfo.Theme = data.Theme;
                        App.Cookie.SetCookie("TokenGuid", data.Token);
                        me.redirectTo('user.login', true);
                    } else {
                        me.getView().show();
                        if (!Ext.isEmpty(tokenGuid)) {
                            App.Cookie.DeleteCookie("TokenGuid");
                        } else {
                            Ext.Msg.alert("提示","用户名或密码不正确");
                        }
                    }
                },
                error: function (data) {
                    me.getView().show();
                    Ext.Msg.alert("提示","登录异常");
                }
            })
        }
    },

    //登录页面初始化
    onLoginInitialize: function () {
        var me = this, tokenGuid = App.Cookie.GetCookie("TokenGuid");
        if (!Ext.isEmpty(tokenGuid)) {
            me.onLoginClick();
        } else {
            me.getView().show();
        }
    },

    //登录页显示
    onLoginShow:function(){
        var me = this; me.destroyLoader();
    }
})