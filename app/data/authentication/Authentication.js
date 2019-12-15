/**
 * 用户授权模拟和接口
 * 
 */
Ext.define('App.data.authentication.Authentication', {
    extend: "App.data.Simulated",
    
    Init: function () {
        var me = this;
        me.Token();
        me.ValidaToken();
    },

    Token: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/Token",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data,userInfo;
                if(data.LoginName=="Admin"&&data.LoginPassWord=="123456"){
                    userInfo={
                        Token:"11bdaf6f-e1b9-499d-815e-eddd29c861f2",
                        IsSuperUser:true,
                        DarkMode: false,
                        Email: "Admin@163.com",
                        IsEnable: 0,
                        LoginName: "Admin",
                        LoginPassWord: "123456",
                        MenuLocation: "left",
                        Mobile: "13021023376",
                        OrgId: "864c43ab-1887-4c8e-b8a5-0f10eac43fe6",
                        SysUserId: "e415d214-2159-42b3-a50a-f8f407b061ef",
                        Theme: "deep-purple",
                        UserName: "Admin"
                    };
                }
                return userInfo;
            }
        })
    },

    ValidaToken:function(){
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/ValidaToken",
            getData: function (ctx) {
                var tokenGuid = me.RequestData(ctx).TokenGuid,userInfo;
                if(tokenGuid=="11bdaf6f-e1b9-499d-815e-eddd29c861f2"){
                    userInfo={
                        Token:"11bdaf6f-e1b9-499d-815e-eddd29c861f2",
                        IsSuperUser:true,
                        DarkMode: false,
                        Email: "Admin@163.com",
                        IsEnable: 0,
                        LoginName: "Admin",
                        LoginPassWord: "123456",
                        MenuLocation: "left",
                        Mobile: "13021023376",
                        OrgId: "864c43ab-1887-4c8e-b8a5-0f10eac43fe6",
                        SysUserId: "e415d214-2159-42b3-a50a-f8f407b061ef",
                        Theme: "deep-purple",
                        UserName: "Admin"
                    };
                }
                return userInfo;
            }
        })
    }
})