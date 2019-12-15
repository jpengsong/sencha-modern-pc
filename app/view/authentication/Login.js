Ext.define("App.view.authentication.Login", {
    xtype: "login",
    routeId: "login",
    extend: 'App.ux.page.Dialog',
    controller: "authentication",
    header: false,
    hidden: true,
    cls: 'authentication-login',
    layout: 'center',
    items: [
        {
            xtype: "container",
            width:350,
            cls: "form-backgroundcolor",
            layout: {
                type: "vbox",
                align: "center",
                pack: "center"
            },
            defaults:{
                width:350
            },
            items: [
                {
                    xtype: "container",
                    cls:"form-title",
                    height: 50,
                    layout: {
                        type: "hbox",
                        align: "center",
                        pack: "center"
                    },
                    items: [
                        {
                            xtype: "container",
                            html: "<span class='logo ext ext-sencha'></span><span class='label'>Sencha</span>"
                        }
                    ]
                },
                {
                    xtype: 'formpanel',
                    cls:"form-content",
                    reference: "form",
                    layout: {
                        type: "vbox",
                        align: "stretch"
                    },
                    defaults:{
                        margin:"0 0 18 0",
                        allowBlank: false,
                        required: true,
                        clearable:false,
                        autocomplete:false,
                        labelAlign :"left",
                        labelWidth:50,
                        errorTarget:"under"
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'loginName',
                            value:"Admin",
                            reference:"loginName",
                            requiredMessage :"用户名不允许为空",
                            label: '<span class ="x-far fa-user fa-lg"></span>',
                            placeholder: '用户名'
                        },
                         {
                            xtype: 'passwordfield',
                            value:"123456",
                            name: 'loginPwd',
                            reference:"loginPwd",
                            requiredMessage :"密码不允许为空",
                            label: '<span class ="x-far fa-lock fa-lg"></span>',
                            placeholder: '密码'
                        },
                        {
                            xtype: "button",
                            height: 40,
                            ui: 'action',
                            text: '登录',
                            iconAlign: "right",
                            iconCls: "x-far fa-chevron-right",
                            listeners: {
                                tap: 'onLoginClick'
                            }
                        }
                    ]
                }
            ]
        }],
        listeners: {
            initialize:"onLoginInitialize",
            show:"onLoginShow"
        }
})