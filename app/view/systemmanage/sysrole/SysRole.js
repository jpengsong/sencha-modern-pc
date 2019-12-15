Ext.define("App.view.systemmanage.sysrole.SysRole", {
    extend: "App.ux.page.Page",
    xtype: "sysrole",
    viewModel: "sysrole",
    controller: "sysrole",
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
                        clearable:false,
                        style: {
                            "float": "left"
                        }
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'RoleName',
                            type: "String",
                            label: '角色名'
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
            reference:"grid",
            items: [
                {
                    xtype: 'toolbar',
                    layout: "hbox",
                    shadow: false,
                    docked: 'top',
                    defaults: {
                        ui: "action",
                        margin: "0 10 0 0",
                        height:30
                    },
                    items: [
                        {
                            text: '新增',
                            iconCls: "x-far fa-plus",
                            handler:"onAdd"
                        },
                        {
                            text: '编辑',
                            iconCls: "x-far fa-edit",
                            handler:"onEdit"
                        },
                        {
                            text: '删除',
                            iconCls: "x-far fa-trash",
                            handler:"onDel"
                        },
                        {
                            text: '分配权限',
                            iconCls: "x-far fa-users",
                            handler:"onMenuRole"
                        }
                    ]
                }
            ],
            columnLines: true,
            selectable: {
                checkbox: true
            },
            reference: "grid",
            bind: {
                store: '{gridstore}'
            },
            columns: [
                { text: '角色名称', dataIndex: 'RoleName',width:200 },
                { text: '描述', dataIndex: 'Description', flex:1 }
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
