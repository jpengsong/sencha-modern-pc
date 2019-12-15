Ext.define("App.view.systemmanage.sysuser.SysUserController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysuser',

    //查询
    onSearch: function () {
        var me = this, refs = me.getReferences(), gridStore = refs.grid.getStore();
        App.Page.setQueryItems(gridStore, App.Page.getQueryItems(refs.search));
        gridStore.loadPage(1);
    },

    //重置
    onReset: function () {
        var me = this, refs = me.getReferences();
        App.Page.resetQueryItems(refs.search);
    },

    //新增
    onAdd: function () {
        var me = this, record = Ext.create("App.model.systemmanage.SysUser");
        Ext.widget({
            title: "新增用户",
            xtype: "sysuseredit",
            status: "add",
            scope: me.getReferences(),
            viewModel: {
                data: {
                    user: record
                },
                stores: {
                    treestore: {
                        type: "systemmanage.sysuser.orgtreestore"
                    }
                }
            }
        })
    },

    //编辑
    onEdit: function () {
        var me = this, refs = me.getReferences(), record;
        if (App.Page.selectionModel(refs.grid, false)) {
            record = refs.grid.getSelectable().getSelectedRecord().clone();
            Ext.widget({
                title: "编辑用户",
                xtype: "sysuseredit",
                status: "edit",
                scope: me.getReferences(),
                viewModel: {
                    data: {
                        user: record
                    },
                    stores: {
                        treestore: {
                            type: "systemmanage.sysuser.orgtreestore"
                        }
                    }
                }
            })
        }
    },

    //删除
    onDelete: function () {
        var me = this, refs = me.getReferences(), grid = refs.grid, records, idArray = [];;
        if (App.Page.selectionModel(grid, true)) {
            records = grid.getSelectable().getSelectedRecords();
            Ext.each(records, function (record, index) {
                idArray.push(record.id);
            })
            Ext.Msg.confirm("提示", "确认删除选中的" + idArray.length + "行数据项吗？",
                function (btn) {
                    if (btn == "yes") {
                        App.Ajax.request({
                            url: "/api/SystemManage/SysUser/DeleteSysUser",
                            method: "DELETE",
                            nosim: false,
                            type: "JSON",
                            showmask: true,
                            maskmsg: "正在删除...",
                            params: idArray.join(","),
                            success: function (data) {
                                if (data.Data == "1") {
                                    Ext.Msg.alert("提示","删除成功");
                                    grid.getStore().loadPage(1);
                                } else {
                                    Ext.Msg.alert("提示","删除失败");
                                }
                            },
                            error: function (data) {
                                Ext.Msg.alert("提示","删除异常");
                            }
                        })
                    }
                })
        }
    },

    //分配角色
    onUserRole: function () {
        var me = this, refs = me.getReferences(), grid = refs.grid, sysUserId;
        if (App.Page.selectionModel(grid, false)) {
            sysUserId = grid.getSelectable().getSelectedRecord().get("SysUserId");
            Ext.widget("sysuserrole", {
                title: "分配角色",
                viewModel: {
                    data: {
                        UserId: sysUserId
                    }
                }
            })
        }
    }
})