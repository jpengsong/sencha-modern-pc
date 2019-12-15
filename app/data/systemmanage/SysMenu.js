/**
 * 模拟菜单和菜单接口
 * 
 */
Ext.define('App.data.systemmanage.SysMenu', {
    extend: "App.data.Simulated",
    Init: function () {
        var me = this;
        me.dataSource = [
            { "SysMenuId": "2ee4b173-4e09-44db-8550-23d54392077e", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "", "PageType": "", "MenuName": "页面", "Order": 0, "Description": "", "IconCls": "x-far fa-tags", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "a562d8b2-2990-4595-a9eb-04d0c8665710", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "", "PageType": "", "MenuName": "集成插件", "Order": 1, "Description": "", "IconCls": "x-far fa-cogs", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "29215442-76fb-42d7-a93f-52728a015b9f", "ParentId": "a562d8b2-2990-4595-a9eb-04d0c8665710", "ViewType": "upload", "PageType": "tab", "MenuName": "文件上传", "Order": 1, "Description": "", "IconCls": "x-far fa-file-upload", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "b729e75c-518d-446e-b34b-d7b2f811fc1d", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "matter", "PageType": "tab", "MenuName": "开发注意事项", "Order": 0, "Description": "", "IconCls": "x-far fa-book-open", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "3ba4dfc3-4df3-4472-ad2f-b4b2acef73de", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "", "PageType": "", "MenuName": "一级菜单", "Order": 5, "Description": "", "IconCls": "x-far fa-list", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "f0474f1f-5cf7-413d-9aec-d4c91ae55b9f", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "", "PageType": "", "MenuName": "系统管理", "Order": 7, "Description": "", "IconCls": "x-far fa-cog", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "a8b26293-2965-4554-bd44-41fd656f44c9", "ParentId": "3ba4dfc3-4df3-4472-ad2f-b4b2acef73de", "ViewType": "", "PageType": "", "MenuName": "二级菜单", "Order": 5, "Description": "", "IconCls": "x-far fa-tags", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "96f9a0b6-2e26-476c-9c66-7a65b6bbaa37", "ParentId": "a8b26293-2965-4554-bd44-41fd656f44c9", "ViewType": "", "PageType": "", "MenuName": "三级菜单", "Order": 5, "Description": "", "IconCls": "x-far fa-tags", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "55d14e7a-bceb-4170-85f8-b5555158019a", "ParentId": "96f9a0b6-2e26-476c-9c66-7a65b6bbaa37", "ViewType": "", "PageType": "", "MenuName": "四级菜单", "Order": 5, "Description": "", "IconCls": "x-far fa-tags", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "699d11e4-d4c4-4cdf-b1bc-8d92ddf70344", "ParentId": "2ee4b173-4e09-44db-8550-23d54392077e", "ViewType": "pageblank", "PageType": "tab", "MenuName": "空白页", "Order": 1, "Description": "", "IconCls": "x-far fa-tag", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "b0e23827-a633-4edc-95cd-971fdfeed847", "ParentId": "2ee4b173-4e09-44db-8550-23d54392077e", "ViewType": "", "PageType": "view", "MenuName": "page404", "ViewType": "page404", "Order": 2, "Description": "", "IconCls": "x-far fa-tag", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "457063da-0b14-4c7f-bb12-a0a8e20d90ee", "ParentId": "2ee4b173-4e09-44db-8550-23d54392077e", "ViewType": "", "PageType": "view", "MenuName": "page500", "ViewType": "page500", "Order": 3, "Description": "", "IconCls": "x-far fa-tag", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "a7d00cf0-741b-44af-b90b-395698d64bc9", "ParentId": "f0474f1f-5cf7-413d-9aec-d4c91ae55b9f", "ViewType": "sysuser", "PageType": "tab", "MenuName": "用户管理", "Order": 1, "Description": "", "IconCls": "x-far fa-user", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "a176b70f-4ba9-45b5-b021-c44b4215be93", "ParentId": "f0474f1f-5cf7-413d-9aec-d4c91ae55b9f", "ViewType": "sysorg", "PageType": "tab", "MenuName": "组织机构", "Order": 2, "Description": "", "IconCls": "x-far fa-tree", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "577d5ee5-3375-4795-a41e-037e52c0f4a3", "ParentId": "f0474f1f-5cf7-413d-9aec-d4c91ae55b9f", "ViewType": "sysrole", "PageType": "tab", "MenuName": "角色管理", "Order": 3, "Description": "", "IconCls": "x-far fa-users", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "04b631a8-3e41-4382-9e43-f5aeaddb338d", "ParentId": "f0474f1f-5cf7-413d-9aec-d4c91ae55b9f", "ViewType": "sysmenu", "PageType": "tab", "MenuName": "菜单管理", "Order": 4, "Description": "", "IconCls": "x-far fa-th-list", "IsEnable": 1, "isDel": 0 },
            { "SysMenuId": "194cf20e-68ef-4ad1-9368-b49d22fee185", "ParentId": "00000000-0000-0000-0000-000000000000", "ViewType": "author", "PageType": "tab", "MenuName": "支持作者", "Order": 8, "Description": "", "IconCls": "x-far fa-yen-sign", "IsEnable": 1, "isDel": 0 },
        ];
        me.GetSysMenuPage();
        me.GetSysMenuByRule();
        me.GetSysUserMenuByRule();
        me.GetSysMenuButtonTreeDetail();
        me.AddSysMenu();
        me.EditSysMenu();
        me.DeleteSysMenu();
    },

    //获取分页数据
    GetSysMenuPage: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/GetSysMenuPage",
            getData: function (ctx) {
                var requestData = Ext.decode(ctx.params.RequestData), condition = me.getCondition(requestData),
                    responseData = me.SqlQuery(condition);
                return responseData;
            }
        })
    },
    
    //获取数据
    GetSysUserMenuByRule: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/GetSysUserMenuByRule",
            getData: function (ctx) {
                return me.SqlQuery(null);
            }
        })
    },

    //获取数据
    GetSysMenuByRule: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/GetSysMenuByRule",
            getData: function (ctx) {
                return me.SqlQuery(null);
            }
        })
    },

    //获取菜单按钮树节点
    GetSysMenuButtonTreeDetail: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            url: "/api/SystemManage/SysMenu/GetSysMenuButtonTreeDetail",
            getData: function (ctx) {
                var menuBtnList = App.SimulateDB.Get("SysMenuButton"), list = [];
                for (var i = 0; i < me.dataSource.length; i++) {
                    list.push({
                        SysMenuId: me.dataSource[i]["SysMenuId"],
                        ParentId: me.dataSource[i]["ParentId"],
                        MenuCode: "",
                        MenuName: me.dataSource[i]["MenuName"],
                        ViewType: me.dataSource[i]["ViewType"],
                        PageType: me.dataSource[i]["PageType"],
                        Description: me.dataSource[i]["Description"],
                        Order: me.dataSource[i]["Order"],
                        IsEnable: me.dataSource[i]["IsEnable"],
                        IconCls: me.dataSource[i]["IconCls"],
                        Type: "0"
                    })
                }
                for (var i = 0; i < menuBtnList.length; i++) {
                    list.push({
                        SysMenuId: menuBtnList[i]["SysMenuButtonId"],
                        ParentId: menuBtnList[i]["MenuId"],
                        MenuCode: menuBtnList[i]["BtnCode"],
                        MenuName: menuBtnList[i]["BtnName"],
                        Description: menuBtnList[i]["Description"],
                        Order: menuBtnList[i]["Order"],
                        ViewType: "",
                        PageType: "",
                        IsEnable: menuBtnList[i]["IsEnable"],
                        IconCls: "",
                        Type: "1"
                    })
                }
                return list;
            }
        })
    },

    //添加菜单
    AddSysMenu: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/AddSysMenu",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                me.dataSource.unshift(data);
                var model = {
                    SysMenuId: data["SysMenuId"],
                    ParentId: data["ParentId"],
                    MenuName: data["MenuName"],
                    ViewType: data["ViewType"],
                    PageType: data["PageType"],
                    Description: data["Description"],
                    Order: data["Order"],
                    IsEnable: data["IsEnable"],
                    IconCls: data["IconCls"],
                    Type: "0"
                }
                return model;
            }
        })
    },

    //编辑菜单
    EditSysMenu: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/EditSysMenu",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                for (var i = 0; i < me.dataSource.length; i++) {
                    if (me.dataSource[i].SysMenuId == data.SysMenuId) {
                        Ext.apply(me.dataSource[i], data);
                        break;
                    }
                }
                var model = {
                    SysMenuId: data["SysMenuId"],
                    ParentId: data["ParentId"],
                    MenuCode: data["MenuCode"],
                    MenuName: data["MenuName"],
                    ViewType: data["ViewType"],
                    PageType: data["PageType"],
                    Description: data["Description"],
                    Order: data["Order"],
                    IsEnable: data["IsEnable"],
                    IconCls: data["IconCls"],
                    Type: "0"
                };
                
                return model;
            }
        })
    },

    //删除菜单
    DeleteSysMenu: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenu/DeleteSysMenu",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(",");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < me.dataSource.length; j++) {
                        if (me.dataSource[j].SysMenuId == data[i]) {
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
