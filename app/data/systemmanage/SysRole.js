/**
 * 模拟角色数据源和角色接口
 * 
 */
Ext.define('App.data.systemmanage.SysRole', {
    extend: "App.data.Simulated",

    Init: function () {
        var me = this;
        me.dataSource = [
            { "SysRoleId": "5519da9e-ae64-40ad-b676-bbc724872c90", "RoleName": "超级管理员", "Description": "", "isDel": 0 },
            { "SysRoleId": "2d5d5db2-c08e-4ef9-b58f-3ef1d85eadf9", "RoleName": "管理员", "Description": "", "isDel": 0 },
            { "SysRoleId": "ad046681-b0cd-43ea-883f-3081a51bb1ef", "RoleName": "普通用户", "Description": "", "isDel": 0 },
            { "SysRoleId": "8bf287fa-6f7d-4d9e-83cb-c53dac4a0cd8", "RoleName": "部门领导", "Description": "", "isDel": 0 },
            { "SysRoleId": "b71aac1d-7a02-4c06-b66b-e0be2d587fb2", "RoleName": "游客", "Description": "", "isDel": 0 }
        ];
        me.GetSysRolePage();
        me.GetSysRoleAll();
        me.AddSysRole();
        me.EditSysRole();
        me.DeleteSysRole();
        me.GetSysMenuRoleByRule();
        me.AddSysMenuRole();
    },

    //获取分页数据
    GetSysRolePage: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysRole/GetSysRolePage",
            getData: function (ctx) {
                var condition = me.RequestData(ctx).Data;
                if (!Ext.isEmpty(condition.QueryItems)) {
                    var queryItems = [];
                    for (var key in condition.QueryItems) {
                        if (key == "RoleName") {
                            queryItems.push({ key: key, Value: condition.QueryItems[key], Method: config.QueryMethod.Like, Type: "" });
                        }
                    }
                    condition.QueryItems = queryItems;
                }
                return me.SqlQuery(condition);
            }
        })
    },

    //获取所有角色
    GetSysRoleAll: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysRole/GetSysRoleAll",
            getData: function (ctx) {
                return me.dataSource;
            }
        })
    },

    //添加角色
    AddSysRole: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysRole/AddSysRole",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                me.dataSource.unshift(data);
                return 1;
            }
        })
    },

    //编辑角色
    EditSysRole: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysRole/EditSysRole",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                for (var i = 0; i < me.dataSource.length; i++) {
                    if (me.dataSource[i].SysRoleId == data.SysRoleId) {
                        Ext.apply(me.dataSource[i], data);
                        break;
                    }
                }
                return 1;
            }
        })
    },

    //删除角色
    DeleteSysRole: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysRole/DeleteSysRole",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(",");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < me.dataSource.length; j++) {
                        if (me.dataSource[j].SysRoleId == data[i]) {
                            me.dataSource.splice(j, 1);
                            break;
                        }
                    }
                }
                return data.length;
            }
        })
    },

    //获取某一角色权限
    GetSysMenuRoleByRule: function () {
        var me = this,data={};
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            url: "/api/SystemManage/SysRole/GetSysMenuRoleByRule",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data,
                    ids = [],
                    menuList = App.SimulateDB.Get("SysMenu"),
                    menuBtnList = App.SimulateDB.Get("SysMenuButton"),
                    SysMenuRole = App.SimulateDB.Get("SysMenuRole"),
                    list = [];

                for (var i = 0; i < SysMenuRole.length; i++) {
                    if (SysMenuRole[i].RoleId == data.SysRoleId) {
                        ids.push(SysMenuRole[i].MenuId);
                    }
                }

                for (var i = 0; i < ids.length; i++) {
                    for (var j = 0; j < menuList.length; j++) {
                        if (ids[i] == menuList[j].SysMenuId) {
                            list.push({
                                SysMenuId: menuList[j]["SysMenuId"],
                                ParentId: menuList[j]["ParentId"],
                                MenuCode: "",
                                MenuName: menuList[j]["MenuName"],
                                XType: menuList[j]["XType"],
                                RouteId: menuList[j]["RouteId"],
                                Description: menuList[j]["Description"],
                                Order: menuList[j]["Order"],
                                IsEnable: menuList[j]["IsEnable"],
                                IconCls: menuList[j]["IconCls"],
                                Type: "0"
                            })
                        }
                    }
                }

                for (var i = 0; i < ids.length; i++) {
                    for (var j = 0; j < menuBtnList.length; j++) {
                        if (ids[i] == menuBtnList[j].SysMenuButtonId) {
                            list.push({
                                SysMenuId: menuBtnList[j]["SysMenuButtonId"],
                                ParentId: menuBtnList[j]["MenuId"],
                                MenuCode: menuBtnList[j]["btnCode"],
                                MenuName: menuBtnList[j]["btnName"],
                                Description: menuBtnList[j]["Description"],
                                Order: menuBtnList[j]["Order"],
                                XType: "",
                                RouteId: "",
                                IsEnable: menuBtnList[j]["IsEnable"],
                                IconCls: "",
                                Type: "1"
                            })
                        }
                    }
                }
                data.List=list;
                return data;
            }
        })
    },

    //添加角色权限
    AddSysMenuRole: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            url: "/api/SystemManage/SysRole/AddSysMenuRole",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(","),
                    SysMenuRole = App.SimulateDB.Get("SysMenuRole");
                if (!Ext.isEmpty(data.RoleId)) {
                    for (var i = 0; i < SysMenuRole.length; i++) {
                        if (SysMenuRole[i].RoleId == data.RoleId) {
                            SysMenuRole.splice(i, 1);
                            i -= 1;
                        }
                    }
                    for (var i = 0; i < data.List.length; i++) {
                        SysMenuRole.push(data.List[i]);
                    }
                }
                return 1;
            }
        })
    }
})
