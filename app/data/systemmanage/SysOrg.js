/**
 * 模拟组织机构数据源和组织机构接口
 * 
 */
Ext.define('App.data.systemmanage.SysOrg', {
    extend: "App.data.Simulated",
    
    Init: function () {
        var me = this;

        //数据来源
        me.dataSource = [
            { "SysOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "ParentOrgId": "00000000-0000-0000-0000-000000000000", "Level": 1, "OrgName": "集团公司", "OrgCode": "",  "Description": "", "Sort": 0 },
            { "SysOrgId": "864c43ab-1887-4c8e-b8a5-0f10eac43fe6", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "金融地产事业部", "OrgCode": "", "Description": "", "Sort": 100 },
            { "SysOrgId": "d1b0b243-870d-4c7d-8bff-a1511eb6fef5", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "综合应用部", "OrgCode": "", "Description": "", "Sort": 200 },
            { "SysOrgId": "2d108446-e44f-4baa-953f-99457152c4cd", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "资产监管事业部", "OrgCode": "", "Description": "", "Sort": 300 },
            { "SysOrgId": "28aecd9e-4dca-4b10-9999-e7ef3579c0f1", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "市场部", "OrgCode": "", "Description": "", "Sort": 400 },
            { "SysOrgId": "29810737-abd3-4f62-8892-3bb90b18caac", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "投资顾问", "OrgCode": "", "Description": "", "Sort": 500 },
            { "SysOrgId": "1e58c1e9-804a-4144-8b9b-31d31f7f54bc", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "行政", "OrgCode": "", "Description": "", "Sort": 700 },
            { "SysOrgId": "5f449327-6134-473f-b1e6-a2c53da8772f", "ParentOrgId": "a9955f8c-cfdd-4f61-97a8-55bd9efe1306", "Level": 2, "OrgName": "财务", "OrgCode": "", "Description": "", "Sort": 100 },
            { "SysOrgId": "284ab9fd-6bac-435a-9f80-bf3cc690ff0c", "ParentOrgId": "d1b0b243-870d-4c7d-8bff-a1511eb6fef5", "Level": 3, "OrgName": "IT开发组", "OrgCode": "", "Description": "", "Sort": 200 },
            { "SysOrgId": "a2c66161-c8b8-4f95-80fc-2142d506f521", "ParentOrgId": "d1b0b243-870d-4c7d-8bff-a1511eb6fef5", "Level": 3, "OrgName": "数据采集组", "OrgCode": "", "Description": "", "Sort": 300 },
            { "SysOrgId": "a093e4c9-05c1-41b1-a967-fa54a9a04a70", "ParentOrgId": "d1b0b243-870d-4c7d-8bff-a1511eb6fef5", "Level": 3, "OrgName": "运维组", "OrgCode": "", "Description": "", "Sort": 400 }
        ];
        me.GetSysOrgPage();
        me.GetSysOrgTreeByRule();
        me.AddSysOrg();
        me.EditSysOrg();
        me.DeleteSysOrg();
    },

    //获取分页数据
    GetSysOrgPage: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysOrg/GetSysOrgPage",
            getData: function (ctx) {
                var condition = me.RequestData(ctx).Data;
                if (!Ext.isEmpty(condition.QueryItems)) {
                    var queryItems = [];
                    for (var key in condition.QueryItems) {
                        if (key == "ParentOrgId") {
                            queryItems.push({ key: key, Value: condition.QueryItems[key], Method: config.QueryMethod.Equal, Type: "" });
                        } else if (key == "OrgName") {
                            queryItems.push({ key: key, Value: condition.QueryItems[key], Method: config.QueryMethod.Like, Type: "" });
                        }
                    }
                    condition.QueryItems = queryItems;
                }
                return me.SqlQuery(condition);
            }
        })
    },

    //获取组织机构数据
    GetSysOrgTreeByRule: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            url: "/api/SystemManage/SysOrg/GetSysOrgTreeByRule",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                responseData = me.getTreeData(me.dataSource, "SysOrgId", "ParentOrgId", data.SysOrgId);
                return responseData;
            }
        })
    },

    //添加组织机构数据
    AddSysOrg: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysOrg/AddSysOrg",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                var obj = {
                    SysOrgId: data.SysOrgId,
                    ParentOrgId: data.ParentOrgId,
                    ParentOrgName: data.ParentOrgName,
                    OrgName: data.OrgName,
                    OrgCode: data.OrgCode,
                    Level: data.Level,
                    Description: data.Description
                }
                me.dataSource.unshift(obj);
                return obj;
            }
        })
    },

    //编辑组织机构数据
    EditSysOrg: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysOrg/EditSysOrg",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data;
                var obj = {
                    SysOrgId: data.SysOrgId,
                    ParentOrgId: data.ParentOrgId,
                    ParentOrgName: data.ParentOrgName,
                    OrgName: data.OrgName,
                    OrgCode: data.OrgCode,
                    Level: data.Level,
                    Description: data.Description
                };
                for (var i = 0; i < me.dataSource.length; i++) {
                    if (me.dataSource[i].SysOrgId == obj.SysOrgId) {
                        Ext.apply(me.dataSource[i], obj);
                        break;
                    }
                }
                return data;
            }
        })
    },

    //删除组织机构数据
    DeleteSysOrg: function () {
        var me = this;
        Ext.ux.ajax.SimManager.register({
            type: 'json',
            delay: 0,
            url: "/api/SystemManage/SysOrg/DeleteSysOrg",
            getData: function (ctx) {
                var data = me.RequestData(ctx).Data.split(",");
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < me.dataSource.length; j++) {
                        if (me.dataSource[j].SysOrgId == data[i]) {
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
