Ext.define("App.view.systemmanage.sysuser.SysUser", {
    extend: "App.ux.page.Page",
    xtype: "sysuser",
    viewModel: "sysuser",
    controller: "sysuser",
    initialize: function () {
        var me = this;
        me.initQueryPanel();
        me.initGridPanel();
        me.callParent();
    },

    initQueryPanel: function () {
        var me, querypanel; me = this;
        querypanel = {
            xtype: "panel",
            layout: {
                type: "hbox"
            },
            bodyStyle: "padding:15px 15px",
            items: [
                {
                    xtype: "container",
                    reference: "search",
                    flex: 1,
                    defaults: {
                        labelAlign: "left",
                        border: true,
                        width: 250,
                        labelWidth: 70,
                        margin: "5 5",
                        clearable: false,
                        style: {
                            "float": "left"
                        }
                    },
                    items: [
                        {
                            xtype: "textfield",
                            label: '用户名',
                            name: "UserName"
                        }
                    ]
                },
                {
                    xtype: "container",
                    layout: {
                        type: "hbox",
                        align: "center",
                        pack: "center"
                    },
                    defaults: {
                        margin: "5 5",
                    },
                    items: [
                        {
                            xtype: "button",
                            iconCls: "x-far fa-search",
                            ui: "action",
                            text: "查询",
                            handler: "onSearch"
                        },
                        {
                            xtype: "button",
                            ui: "action",
                            iconCls: "x-far fa-reply",
                            text: "重置",
                            handler: "onReset"
                        }
                    ]
                }
            ]
        };
        me.addQuery("query", querypanel);
    },

    initGridPanel: function () {
        var me, gridpanel; me = this;
        gridpanel = {
            xtype: "grid",
            reference: "grid",
            items: [
                {
                    xtype: 'toolbar',
                    layout: "hbox",
                    shadow: false,
                    docked: 'top',
                    defaults: {
                        ui: "action",
                        margin: "0 10 0 0",
                        height: 30
                    },
                    items: [
                        {
                            text: '新增',
                            iconCls: "x-far fa-plus",
                            handler: "onAdd"
                        },
                        {
                            text: '编辑',
                            iconCls: "x-far fa-edit",
                            handler: "onEdit"
                        },
                        {
                            text: '删除',
                            iconCls: "x-far fa-trash",
                            handler: "onDelete"
                        },
                        {
                            text: '分配角色',
                            iconCls: "x-far fa-object-group",
                            handler: "onUserRole"
                        }
                    ]
                }
            ],
            columnLines: true,
            selectable:{
                checkbox:true
            },
            bind: {
                store: '{gridstore}'
            },
            columns: [
                { text: '用户名', dataIndex: 'UserName', width: 100 },
                { text: '登录名', dataIndex: 'LoginName', width: 150 },
                { text: '手机号', dataIndex: 'Mobile', width: 120 },
                { text: '邮箱', dataIndex: 'Email', width: 200 },
                { text: '是否启用', dataIndex: 'IsEnable', width: 80, cell: { encodeHtml: false }, renderer: function (value) { return "<span style='color:" + (value == 1 ? "green" : "red") + "'>" + (value == 1 ? "是" : "否") + "</span>"; } },
                { text: '备注', dataIndex: 'Description', flex: 1 }
            ],
            plugins: {
                pagination:{},
                requestdata: {
                    autoLoad: true
                }
            }
        };
        me.addGrid("grid", gridpanel);
    }
})
