Ext.define('App.view.authentication.LockScreen', {
    extend: 'App.ux.page.Dialog',
    xtype: 'lockscreen',
    header: false,
    controller: "authentication",
    displayed: true,
    cls: 'authentication-lockscreen',
    layout: {
        type: "vbox",
        align: "center",
        pack: "center"
    },
    items: [
        {
            xtype: "container",
            width: 400,
            cls: "form-backgroundcolor",
            layout: {
                type: "vbox",
                align: "center",
                pack: "center"
            },
            defaults:{
                width:400
            },
            items: [
                {
                    xtype: "container",
                    cls: "form-title",
                    height: 50,
                    layout: {
                        type: "hbox",
                        align: "center",
                        pack: "center"
                    },
                    items: [
                        {
                            xtype: "container",
                            html: "当前账户：Admin", margin: "0 10", style: { "font-size": "16px" }
                        }
                    ]
                },
                {
                    xtype: 'formpanel',
                    cls: "form-content",
                    reference: "form",
                    layout: {
                        type: "vbox",
                        align: "stretch"
                    },
                    defaults: {
                        margin: "0 0 18 0",
                        required: true,
                        clearable: false,
                        autocomplete: false,
                        labelAlign: "left",
                        labelWidth: 50,
                        errorTarget: "under"
                    },
                    items: [
                        {
                            xtype: 'passwordfield',
                            name: 'loginPwd',
                            reference: "loginPwd",
                            requiredMessage: "密码不允许为空",
                            label: '<span class ="x-far fa-lock fa-lg"></span>',
                            placeholder: '密码'
                        },
                        {
                            xtype: "button",
                            text: '解锁',
                            ui: 'action',
                            height: 40,
                            formBind: true,
                            iconAlign: "right",
                            iconCls: "x-far fa-chevron-right",
                            listeners: {
                                tap: 'onRemoveLock'
                            }
                        },
                        {
                            margin: "0 30 10 30",
                            xtype: "component",
                            html: '<div style="text-align:right"><a href="#view.login" class="link-forgot-password">或者, 使用其他登录凭据</a></div>'
                        }
                    ]
                }
            ]
        }],
    listeners: {
        initialize: function (obj, eOpts) {
            App.UserInfo.Token = null;
            App.Cookie.DeleteCookie("TokenGuid");
        }
    }
})