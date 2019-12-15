Ext.define("App.view.systemmanage.sysorg.SysOrgEdit", {
    alias: "widget.sysorgedit",
    extend: "Ext.Dialog",
    displayed: true,
    closable: true,
    modal: true,
    width: 450,
    height: 550,
    layout:"fit",
    padding:"0 0",
    items:[
    {
        xtype:"formpanel",
        reference:"form",
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
                xtype: "comboxtree",
                label: '所属机构',
                hideSearchfield: false,
                treeheight: 300,
                querylocal: true,
                displayField: "OrgName",
                valueField: "SysOrgId",
                bind: {
                    store: "{treestore}",
                    value: "{org.ParentOrgId}"
                },
                params:{
                  SysOrgId: "00000000-0000-0000-0000-000000000000"
                }
            },
            {
                xtype: "textfield",
                label: '级别',
                editable: false,
                required: true,
                bind: "{org.Level}"
            },
            {
                xtype: "textfield",
                label: '机构名称',
                required: true,
                bind: "{org.OrgName}"
            },
            {
                xtype: "textfield",
                label: '机构代码',
                required: true,
                bind: "{org.OrgCode}"
            },
            {
                xtype: "numberfield",
                label: '排序',
                required: true,
                bind: "{org.Sort}"
            },
            {
                label: '描述',
                bind: "{org.Description}",
                xtype: 'textareafield'
            }
        ],
        buttons: [
            { text: '保存', iconCls: "x-far fa-save", handler: 'onSave' },
            { text: '重置', iconCls: "x-far fa-history", handler: 'onReset' }
        ]
    }
    ],
    controller: {

        //保存
        onSave: function () {
            var me = this,
                view = me.getView(),
                vm = me.getViewModel(),
                refs = me.getReferences(),
                scope = view.scope;
            if (refs.form.validate()) {
                App.Ajax.request({
                    url: "/api/SystemManage/SysOrg/" + (view.status == "add" ? "AddSysOrg" : "EditSysOrg"),
                    method: (view.status == "add" ? "POST" : "PUT"),
                    nosim: false,
                    type: "JSON",
                    showmask: true,
                    maskmsg: "正在保存...",
                    params: vm.get("org").getData(),
                    success: function (data) {
                        if (!Ext.isEmpty(data.Data)) {
                            if (view.status == "add") {
                                App.TreeNode.appendNode(vm.get("selRecord"), Ext.create("App.model.systemmanage.SysOrg", data.Data));
                            } else {
                                App.TreeNode.updateNode(scope.tree.getStore().findNode("SysOrgId", data.Data.SysOrgId), data.Data);
                            }
                            scope.grid.getStore().loadPage(1);
                            Ext.Msg.alert("提示","保存成功");
                            view.close();
                        } else {
                            Ext.Msg.alert("提示","保存失败");
                        }
                    },
                    error: function (msg) {
                        Ext.Msg.alert("提示",msg);
                    }
                })
            }
        },

        //重置
        onReset: function () {
            var me = this; me.getViewModel().get("org").reject();
        }
    }
})