Ext.define("App.view.systemmanage.sysrole.SysRoleEdit", {
    alias: "widget.sysroleedit",
    extend: "Ext.Dialog",
    displayed: true,
    closable: true,
    modal: true,
    width: 400,
    height: 300,
    layout: 'fit',
    padding: "0 0",
    items: [
        {
            xtype: "formpanel",
            reference: "form",

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
                    xtype: "textfield",
                    label: '角色名',
                    required: true,
                    bind: "{role.RoleName}"
                },
                {
                    label: '描述',
                    bind: "{role.Description}",
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
                refs = me.getReferences();
            scope = view.scope,
                record = me.getViewModel().get("role");
            if (refs.form.validate()) {
                App.Ajax.request({
                    url: "/api/SystemManage/SysRole/" + (view.status == "add" ? "AddSysRole" : "EditSysRole"),
                    method: (view.status == "add" ? "POST" : "PUT"),
                    nosim: false,
                    type: "JSON",
                    showmask: true,
                    maskmsg: "正在保存...",
                    params: record.getData(),
                    success: function (data) {
                        if (data.Data > 0) {
                            scope.grid.getStore().loadPage(1);
                            view.close();
                            Ext.Msg.alert("提示","保存成功");
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
            var me = this; me.getViewModel().get("role").reject();
        }
    }
})