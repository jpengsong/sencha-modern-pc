/**
 * 模拟用户数据源和用户接口
 * 
 */
Ext.define('App.data.systemmanage.SysUser', {
    extend: "App.data.Simulated",

    Init: function () {
        var me = this;
        //数据源
        me.dataSource = [
            { "SysUserId": "d0a70e97-06dc-4a39-a3fc-a6ce347635eb", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "徐承平", "LoginName": "xuchengping", "LoginPassWord": "123456", "Mobile": "18701540234", "Email": "xuchengping@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "50a3a764-bf5e-4704-aa47-8354633325b6", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "段阳焱", "LoginName": "duanyangyan", "LoginPassWord": "123456", "Mobile": "18701540414", "Email": "duanyangyan@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "e415d214-2159-42b3-a50a-f8f407b061ef", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "郑承恩", "LoginName": "zhengchengen", "LoginPassWord": "123456", "Mobile": "13021023376", "Email": "zhengchengen@163.com", "IsEnable": 0 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "407508b8-53ea-470f-b63f-6c043d7b2aee", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "芮敏学", "LoginName": "ruiminxue", "LoginPassWord": "123456", "Mobile": "13021023852", "Email": "ruiminxue@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "048dd72e-c851-49eb-8c94-8f220a98a14b", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "东承德", "LoginName": "dongchengde", "LoginPassWord": "123456", "Mobile": "13021025016", "Email": "dongchengde@163.com", "IsEnable": 0 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "54e69310-c148-46aa-91bb-1ec789c6d714", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "胡成天", "LoginName": "huchengtian", "LoginPassWord": "123456", "Mobile": "13021025191", "Email": "huchengtian@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "69b6cebd-97a0-4653-91db-0ca264d37612", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "谢欣然", "LoginName": "xiexinran", "LoginPassWord": "123456", "Mobile": "13331155934", "Email": "xiexinran@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "4beaf596-9da2-4260-b17b-6c055feb5e39", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "惠鸿信", "LoginName": "huihongxin", "LoginPassWord": "123456", "Mobile": "13371633671", "Email": "huihongxin@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "ad26ade0-e73d-4004-8dc3-6ad1f48d0789", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "晁意蕴", "LoginName": "chaoyiwen", "LoginPassWord": "123456", "Mobile": "13331176769", "Email": "chaoyiwen@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "fcc7ca4c-65c8-49dd-bc98-227a5fb15e88", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "陆文宣", "LoginName": "luwenxuan", "LoginPassWord": "123456", "Mobile": "13021025126", "Email": "luwenxuan@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "5a67ebbf-ef38-4aa8-a0b1-d8befeb00e88", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "赵星洲", "LoginName": "zhaoxingzhou", "LoginPassWord": "123456", "Mobile": "13021023836", "Email": "zhaoxingzhou@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "f7a6567a-feab-4ade-80ad-101a70feab2c", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "芮承允", "LoginName": "ruichengyun", "LoginPassWord": "123456", "Mobile": "13021023852", "Email": "ruichengyun@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "4447e3f4-70dd-440c-8449-430e1cd16584", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "聂学林", "LoginName": "niexuelin", "LoginPassWord": "123456", "Mobile": "13021025016", "Email": "niexuelin@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "3f5f4488-79cb-450a-8d20-19f54a04f4ba", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "薄茂学", "LoginName": "bomaoxue", "LoginPassWord": "123456", "Mobile": "15311139513", "Email": "bomaoxue@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "49a6803d-7758-41bd-9c03-bebc52aafca0", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "盛兴学", "LoginName": "shengxingxue", "LoginPassWord": "123456", "Mobile": "18911977995", "Email": "shengxingxue@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "87fa02b3-6c94-43fc-9b6c-988c49ba457a", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "鄂鸿哲", "LoginName": "ehongzhe", "LoginPassWord": "123456", "Mobile": "18911977759", "Email": "ehongzhe@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "73ca9d58-c687-45fe-8d07-3eb067431eb9", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "曾苑博", "LoginName": "zengyuanbo", "LoginPassWord": "123456", "Mobile": "18911973344", "Email": "zengyuanbo@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "b1ec37ba-4523-427f-820c-0f37b0d02d1d", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "寿成周", "LoginName": "shouchengzhou", "LoginPassWord": "123456", "Mobile": "18911973344", "Email": "shouchengzhou@163.com", "IsEnable": 1 ,"MenuLocation":"left","DarkMode":false,"Theme":"red" },
            { "SysUserId": "daa1703e-f951-4c66-8641-9948592bce47", "OrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "UserName": "闻安福", "LoginName": "wenanfu", "LoginPassWord": "123456", "Mobile": "18911919391", "Email": "wenanfu@163.com", "IsEnable": 1 }
        ];
        me.GetSysUserById();
        me.GetSysUserPage();
        me.AddSysUser();
        me.EditSysUser();
        me.DeleteSysUser();
    },

    //获取用户
    GetSysUserById: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysUser/GetSysUserById",
            getData: function (ctx) {
                var requestData = me.RequestData(ctx).Data,data;
                for (var j = 0; j < me.dataSource.length; j++) {
                    if (me.dataSource[j].SysUserId == requestData.userId) {
                        data = me.dataSource[j];
                        break;
                    }
                }
                return data;
            }
        })
    },

    //获取分页数据
    GetSysUserPage: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysUser/GetSysUserPage",
            getData: function (ctx) {
                var condition = me.RequestData(ctx).Data;
                if (!Ext.isEmpty(condition.QueryItems)) {
                    var queryItems = [];
                    for (var key in condition.QueryItems) {
                        if (key == "UserName") {
                            queryItems.push({ key: key, Value: condition.QueryItems[key], Method: config.QueryMethod.Like, Type: "" });
                        } else if (key == "IsEnable") {
                            queryItems.push({ key: key, Value: condition.QueryItems[key], Method: config.QueryMethod.Equal, Type: "" });
                        }
                    }
                    condition.QueryItems = queryItems;
                }
                return me.SqlQuery(condition);
            }
        })
    },

    //添加用户数据
    AddSysUser: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysUser/AddSysUser",
            getData: function (ctx) {
                me.dataSource.unshift(me.RequestData(ctx).Data);
                return 1;
            }
        })
    },

    //编辑用户数据
    EditSysUser: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysUser/EditSysUser",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                for (var i = 0; i < me.dataSource.length; i++) {
                    if (me.dataSource[i].SysUserId == data.SysUserId) {
                        Ext.apply(me.dataSource[i], data);
                        break;
                    }
                }
                return 1;
            }
        })
    },

    //删除用户数据
    DeleteSysUser: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysUser/DeleteSysUser",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(",");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < me.dataSource.length; j++) {
                        if (me.dataSource[j].SysUserId == data[i]) {
                            me.dataSource.splice(j, 1);
                            break;
                        }
                    }
                }
                return 1;
            }
        })
    }
})
