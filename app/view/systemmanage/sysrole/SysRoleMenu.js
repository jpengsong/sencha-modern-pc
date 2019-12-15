Ext.define("App.view.systemmanage.sysrole.SysRoleMenu", {
    alias: "widget.sysrolemenu",
    extend: "Ext.Dialog",
    maximizable: true,
    displayed: true,
    closable: true,
    modal: true,
    width: 650,
    height: '90%',
    layout: {
        type: "hbox",
        align: "stretch"
    },
    defaults: {
        labelAlign: "left",
        labelTextAlign: "center",
        labelWrap: true,
        border: true,
        width: "100%",
        labelWidth: 70,
        margin: "0",
        clearable: false
    },
    buttonToolbar: {
        xtype: 'toolbar',
        docked: 'bottom',
        defaultType: 'button',
        weighted: true,
        ui: 'footer',
        defaultButtonUI: 'action',
        layout: {
            type: 'box',
            vertical: false,
            pack: 'center'
        },
        defaults: {
            margin: "0px 5px"
        }
    },
    items: [
        {
            flex: 1,
            xtype: 'fieldset',
            title: '所有权限',
            padding: "0 0 0 0",
            layout: "fit",
            style: 'border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;',
            items: [
                {
                    xtype: "tree",
                    reference: "tree",
                    rootVisible: false,
                    flex: 1,
                    hideHeaders: true,
                    columns: [{ xtype: "treecolumn", dataIndex: "MenuName", flex: 1, menuDisabled: true }],
                    bind: {
                        store: '{menutreestore}'
                    },
                    plugins: {
                        requestdata: {
                            autoLoad: true,
                            root: {
                                expanded: true
                            }
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: '已有权限',
            padding: "0 0 0 0",
            style: 'border-bottom: 1px solid #ddd;',
            layout: "fit",
            flex: 1,
            items: [
                {
                    xtype: "tree",
                    rootVisible: false,
                    hideHeaders: true,
                    flex: 1,
                    columns: [{ xtype: "treecolumn", dataIndex: "MenuName", flex: 1, menuDisabled: true }],
                    bind: {
                        store: '{menuroletreestore}'
                    },
                    plugins: {
                        requestdata: {
                            autoLoad: false,
                            root: {
                                expanded: true
                            }
                        }
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            text: '保存',
            iconCls: "x-far fa-save",
            handler: "onSave"
        },
        {
            text: '关闭',
            iconCls: "x-far fa-close",
            handler: "onClose"
        }
    ],
    controller: {

        //保存
        onSave: function () {
            var me = this,
                view = me.getView(),
                refs = me.getReferences(),
                vm = me.getViewModel(),
                records = refs.tree.getChecked(),
                roleId = vm.get("role").get("SysRoleId"),
                data = [];
            for (var i = 0; i < records.length; i++) {
                data.push(
                    {
                        SysMenRoleId: Ext.data.identifier.Uuid.create().generate(),
                        MenuId: records[i].get("SysMenuId"),
                        RoleId: roleId,
                        Type: records[i].get("Type")
                    }
                )
            }
            App.Ajax.request({
                url: "/api/SystemManage/SysRole/AddSysMenuRole",
                method: "POST",
                nosim: false,
                type: "JSON",
                showmask: true,
                maskmsg: "正在保存...",
                params: {
                    RoleId: roleId,
                    List: data
                },
                success: function (data) {
                    if (data.Data > 0) {
                        Ext.Msg.alert("提示","保存成功");
                        view.close();
                    } else {
                        Ext.Msg.alert("提示","保存失败");
                    }
                },
                error: function (data) {
                    Ext.Msg.alert("提示","保存异常");
                }
            })
        },

        //关闭
        onClose: function () {
            var me = this; me.getView().close();
        },

        onInitialize: function (d,e,f) {
            debugger;
            var me = this, vm = me.getViewModel(), haveStore = vm.get("menuroletreestore"), allstore = vm.get("menutreestore");
            
            App.Page.setExtraParamData(haveStore, { SysRoleId: vm.get("role").get("SysRoleId") });
            haveStore.setAutoLoad(true);

            haveStore.on({
                single: true,
                load: function (store, records, successful) {
                    if (successful) {
                        me.storeSuccessful = true;
                        me.checkedStatus(haveStore, allstore);
                    }
                }
            })

            allstore.on({
                single: true,
                load: function (allstore, records, successful) {
                    if (successful) {
                        me.allstoreSuccessful = true;
                        me.checkedStatus(haveStore, allstore);
                    }
                }
            })
        },

        checkedStatus: function (haveStore, allstore) {
            var me = this;
            if (me.storeSuccessful && me.allstoreSuccessful) {
                Ext.Object.eachValue(haveStore.byIdMap, function (node) {
                    if (node.get("SysMenuId") != "root") {
                        allstore.byIdMap[node.get("SysMenuId")].set("checked", true);
                    }
                })
            }
        }
    },
    listeners: {
        painted : "onInitialize"
    }
})