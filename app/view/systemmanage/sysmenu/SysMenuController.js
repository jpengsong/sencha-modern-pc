Ext.define("App.view.systemmanage.sysmenu.SysMenuController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysmenu',

    //新增
    onAdd: function () {
        var me = this, refs = me.getReferences(), model = Ext.create("App.model.systemmanage.SysMenuButtonDetail"), selRecord = refs.tree.getSelectable().getSelectedRecord();
        if (!Ext.isEmpty(selRecord)) {
            model.set("ParentId", selRecord.get("SysMenuId"));
            Ext.widget({
                title: "新增菜单",
                xtype: "sysmenuedit",
                status: "add",
                scope: refs,
                viewModel: {
                    data: {
                        fieldlabelName: "菜单名称",
                        model: model,
                        selNode: selRecord,
                        typeValue: 0,
                        typeStore: Ext.create("Ext.data.Store", {
                            fields: ['id', 'name'],
                            data: [
                                { "id": "0", "name": "菜单" },
                                { "id": "1", "name": "功能" }
                            ]
                        }),
                        pageTypeStore: Ext.create("Ext.data.Store", {
                            fields: ['id', 'name'],
                            data: [
                                { "id": "tab", "name": "页签" },
                                { "id": "view", "name": "视图" }
                            ]
                        })
                    }
                }
            });
        } else {
            Ext.Msg.alert("提示","请选择数据");
        }
    },

    //编辑
    onEdit: function () {
        var me = this,refs = me.getReferences(), selRecord = refs.tree.getSelectable().getSelectedRecord();
        if (!Ext.isEmpty(selRecord)) {
            Ext.widget({
                title: "编辑菜单",
                xtype: "sysmenuedit",
                status: "edit",
                scope: refs,
                viewModel: {
                    data: {
                        fieldlabelName: "菜单名称",
                        model: selRecord.clone(),
                        selNode: selRecord,
                        typeValue: selRecord.get("Type"),
                        typeStore: Ext.create("Ext.data.Store", {
                            fields: ['id', 'name'],
                            data: [
                                { "id": "0", "name": "菜单" },
                                { "id": "1", "name": "功能" }
                            ]
                        }),
                        pageTypeStore: Ext.create("Ext.data.Store", {
                            fields: ['id', 'name'],
                            data: [
                                { "id": "tab", "name": "页签" },
                                { "id": "view", "name": "视图" }
                            ]
                        })
                    }
                }
            });
        } else {
            Ext.Msg.alert("提示","请选择数据");
        }
    },

    //删除
    onDel: function () {
        var me = this, refs = me.getReferences(), tree = refs.tree, selRecord, idArray = [], url;
        if (App.Page.selectionModel(tree, true)) {
            selRecord = tree.getSelectable().getSelectedRecord();
            idArray.push(selRecord.get("SysMenuId"));
            url = selRecord.get("Type") == "0" ? "/api/SystemManage/SysMenu/DeleteSysMenu" : "/api/SystemManage/SysMenuButton/DeleteSysMenuButton";
            Ext.Msg.confirm("提示", "确认删除选中的" + idArray.length + "项数据项吗？",
                function (btn) {
                    if (btn == "yes") {
                        App.Ajax.request({
                            url: url,
                            method: "DELETE",
                            nosim: false,
                            type: "JSON",
                            showmask: true,
                            maskmsg: "正在删除...",
                            params: idArray.join(','),
                            success: function (data) {
                                Ext.Msg.alert("提示","删除成功");
                                selRecord.remove();
                            },
                            error: function (data) {
                                Ext.Msg.alert("提示","删除失败");
                            }
                        })
                    }
                })
        }
    },

    //点击一行
    onRowclick: function (me, record, element, rowIndex, e, eOpts) {
        var me = this, refs = me.getReferences();
        if (record.get("Type") == 0) {
            refs.addbtn.enable();
        } else {
            refs.addbtn.disable();
        }
    }
})