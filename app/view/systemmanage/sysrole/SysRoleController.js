Ext.define("App.view.systemmanage.sysrole.SysRoleController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sysrole',

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
        var me = this, refs = me.getReferences();
        Ext.widget({
            scope: refs,
            xtype: "sysroleedit",
            status: "add",
            title: '新增角色',
            viewModel: {
                data: {
                    role: Ext.create("App.model.systemmanage.SysRole")
                }
            }
        })
    },

    //编辑
    onEdit: function () {
        var me = this, refs = me.getReferences();
        if (App.Page.selectionModel(refs.grid, false)) {
            record = refs.grid.getSelectable().getSelectedRecord().clone();
            Ext.widget({
                scope: refs,
                xtype: "sysroleedit",
                status: "edit",
                title: '编辑角色',
                viewModel: {
                    data: {
                        role: record
                    }
                }
            })
        }
    },

    //删除
    onDel: function () {
        var me = this, refs = me.getReferences(), records, idArray = [];
        if (App.Page.selectionModel(refs.grid, true)) {
            records = refs.grid.getSelectable().getSelectedRecords();
            Ext.each(records, function (record, index) {
                idArray.push(record.id);
            })
            Ext.Msg.confirm("提示", "确认删除选中的" + idArray.length + "行数据项吗？",
                function (btn) {
                    if (btn == "yes") {
                        App.Ajax.request({
                            url: "/api/SystemManage/SysRole/DeleteSysRole",
                            method: "DELETE",
                            nosim: false,
                            type: "JSON",
                            showmask: true,
                            maskmsg: "正在删除...",
                            params: idArray.join(","),
                            success: function (data) {
                                if (data.Data > 0) {
                                    Ext.Msg.alert("提示","删除成功");
                                    refs.grid.getStore().loadPage(1);
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

    //分配权限
    onMenuRole: function () {
        var me = this, refs = me.getReferences(), record, window;
        if (App.Page.selectionModel(refs.grid, false)) {
            record = refs.grid.getSelectable().getSelectedRecord();
            Ext.create({
                xtype: "sysrolemenu",
                title: '分配权限',
                references: me.getReferences(),
                viewModel: {
                    data: {
                        role: record
                    },
                    stores: {
                        menutreestore: {
                            type: "systemmanage.sysmenu.menutreestore"
                        },
                        menuroletreestore: {
                            type: "systemmanage.sysmenu.menuroletreestore"
                        }
                    }
                }
            })
        }
    }
})