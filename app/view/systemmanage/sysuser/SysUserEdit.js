Ext.define("App.view.systemmanage.sysuser.SysUserEdit", {
    alias: "widget.sysuseredit",
    extend: "Ext.Dialog",
    displayed: true,
    closable: true,
    modal: true,
    width: 450,
    height: 550,
    layout: "fit",
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
                    xtype: "comboxtree",
                    label: '所属机构',
                    hideSearchfield: false,
                    treeheight: 300,
                    querylocal: true,
                    displayField: "OrgName",
                    valueField: "SysOrgId",
                    bind: {
                        store: "{treestore}",
                        value: "{user.OrgId}"
                    },
                    params:{
                        SysOrgId: "00000000-0000-0000-0000-000000000000"
                    }
                },
                {
                    xtype: "textfield",
                    label: '登录名',
                    required: true,
                    bind: "{user.LoginName}"
                },
                {
                    xtype: "textfield",
                    label: '用户名',
                    bind: "{user.UserName}",
                    required: true,
                    maxLength: 10
                },
                {
                    xtype: "passwordfield",
                    label: '密码',
                    bind: "{user.LoginPassWord}",
                    required: true
                },
                {
                    xtype: "textfield",
                    label: '手机号',
                    bind: "{user.Mobile}"
                },
                {
                    xtype: "emailfield",
                    label: '邮箱',
                    bind: "{user.Email}"
                },
                {
                    xtype: 'radiogroup',
                    label: '是否启用',
                    bind: "{user.IsEnable}",
                    defaultType: 'radio',
                    items: [
                        {  label: '启用', name: 'IsEnable', value: 1, margin: "0 0 0 50" },
                        {  label: '禁用', name: 'IsEnable', value: 0, checked:true}
                    ]
                },
                {
                    xtype: 'textareafield',
                    label: '描述',
                    bind: "{user.Description}",
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
                refs = me.getReferences(),
                scope = view.scope,
                user = me.getViewModel().get("user");
                user.set("IsEnable",refs.form.getValues().IsEnable);
            if (refs.form.validate()) {
                App.Ajax.request({
                    url: "/api/SystemManage/SysUser/" + (view.status == "add" ? "AddSysUser" : "EditSysUser"),
                    method: (view.status == "add" ? "POST" : "PUT"),
                    nosim: false,
                    type: "JSON",
                    showmask: true,
                    maskmsg: "正在保存...",
                    params: user.getData(),
                    success: function (response) {
                        if (response.Data > 0) {
                            Ext.Msg.alert("提示","保存成功");
                            scope.grid.getStore().loadPage(1);
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
            var me = this; me.getViewModel().get("user").reject();
        }
    }
})