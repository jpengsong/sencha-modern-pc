/**
 * 模拟菜单按钮和菜单按钮接口
 * 
 */
Ext.define('App.data.systemmanage.SysMenuButton', {
    extend: "App.data.Simulated",
    
    Init: function () {
        var me = this;
        me.dataSource = [
            { "SysMenuButtonId": "291548e6-5197-4a7a-99db-e2346c9666d4", "MenuId": "a7d00cf0-741b-44af-b90b-395698d64bc9", "BtnCode": "SysUser_Add", "BtnName": "新增", "Description": "", "Order": 1, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "ee9775f9-57b5-4831-866d-5378d4f1a222", "MenuId": "a7d00cf0-741b-44af-b90b-395698d64bc9", "BtnCode": "SysUser_Edit", "BtnName": "编辑", "Description": "", "Order": 2, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "06ae0200-d625-4ae4-8655-89632a366e52", "MenuId": "a7d00cf0-741b-44af-b90b-395698d64bc9", "BtnCode": "SysUser_Del", "BtnName": "删除", "Description": "", "Order": 3, "IsEnable": 1, "0IsDel": 0 },
            { "SysMenuButtonId": "62e9a489-4c2d-40fa-9cd9-e4e8399dd18b", "MenuId": "a7d00cf0-741b-44af-b90b-395698d64bc9", "BtnCode": "SysUser_UserRole", "BtnName": "分配角色", "Description": "", "Order": 4, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "64f1f216-1f1a-4dc9-9252-d66ffe657796", "MenuId": "a176b70f-4ba9-45b5-b021-c44b4215be93", "BtnCode": "SysOrg_Add", "BtnName": "新增", "Description": "", "Order": 1, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "e25a0320-11b1-4a6f-ab11-ad23b3e92f87", "MenuId": "a176b70f-4ba9-45b5-b021-c44b4215be93", "BtnCode": "SysOrg_Edit", "BtnName": "编辑", "Description": "", "Order": 2, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "ae866bdb-24de-42c1-ad11-09bc537e08d3", "MenuId": "a176b70f-4ba9-45b5-b021-c44b4215be93", "BtnCode": "SysOrg_Del", "BtnName": "删除", "Description": "", "Order": 3, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "2b0caca1-1e38-429e-a63b-44e8be05b73f", "MenuId": "577d5ee5-3375-4795-a41e-037e52c0f4a3", "BtnCode": "SysRole_Add", "BtnName": "新增", "Description": "", "Order": 1, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "23ba4611-f3ee-4131-aa15-9c36a6bcca6d", "MenuId": "577d5ee5-3375-4795-a41e-037e52c0f4a3", "BtnCode": "SysRole_Edit", "BtnName": "编辑", "Description": "", "Order": 2, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "7d7db0d5-e78b-4430-99b5-5d359a78cc9f", "MenuId": "577d5ee5-3375-4795-a41e-037e52c0f4a3", "BtnCode": "SysRole_Del", "BtnName": "删除", "Description": "", "Order": 3, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "33eca309-33ad-4f14-94a7-155b35fe8d1c", "MenuId": "04b631a8-3e41-4382-9e43-f5aeaddb338d", "BtnCode": "SysMenu_Add", "BtnName": "新增", "Description": "", "Order": 1, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "cadf5e65-81d0-4155-bf36-8dca403e5328", "MenuId": "04b631a8-3e41-4382-9e43-f5aeaddb338d", "BtnCode": "SysMenu_Edit", "BtnName": "编辑", "Description": "", "Order": 2, "IsEnable": 1, "IsDel": 0 },
            { "SysMenuButtonId": "f74b8164-57a5-47e4-a96b-cc7bf8b65361", "MenuId": "04b631a8-3e41-4382-9e43-f5aeaddb338d", "BtnCode": "SysMenu_Del", "BtnName": "删除", "Description": "", "Order": 3, "IsEnable": 1, "IsDel": 0 }
        ];
        me.AddSysMenuButton();
        me.EditSysMenuButton();
        me.DeleteSysMenuButton();
    },

    //添加按钮
    AddSysMenuButton: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenuButton/AddSysMenuButton",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                me.dataSource.unshift(data);
                var model = {
                    SysMenuId: data["SysMenuButtonId"],
                    ParentId: data["MenuId"],
                    MenuCode: data["BtnCode"],
                    MenuName: data["BtnName"],
                    ViewType: "",
                    RouteId: "",
                    Description: "",
                    Order: data["Order"],
                    IsEnable: data["IsEnable"],
                    IconCls: "",
                    Type: "1"
                }
                return model;
            }
        })
    },

    //编辑按钮
    EditSysMenuButton: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenuButton/EditSysMenuButton",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                for (var i = 0; i < me.dataSource.length; i++) {
                    if (me.dataSource[i].SysMenuButtonId == data.SysMenuButtonId) {
                        Ext.apply(me.dataSource[i], data);
                        break;
                    }
                }  
                var model = {
                    SysMenuId: data["SysMenuButtonId"],
                    ParentId: data["MenuId"],
                    MenuCode: data["BtnCode"],
                    MenuName: data["BtnName"],
                    ViewType: "",
                    RouteId: "",
                    Description: "",
                    Order: data["Order"],
                    IsEnable: data["IsEnable"],
                    IconCls: "",
                    Type: "1"
                }
                return model;
            }
        })
    },

    //删除功能
    DeleteSysMenuButton: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysMenuButton/DeleteSysMenuButton",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(",");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < me.dataSource.length; j++) {
                        if (me.dataSource[j].SysMenuButtonId == data[i]) {
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
