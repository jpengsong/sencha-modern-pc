Ext.define("App.view.systemmanage.sysorg.SysOrg", {
    extend: "App.ux.page.TreePage",
    xtype: "sysorg",
    viewModel: "sysorg",
    controller: "sysorg",
    initialize: function () {
        var me = this;
        me.initTreePanel();
        me.initQueryPanel();
        me.initGridPanel();
        me.callParent();
    },

    initTreePanel: function () {
        var me, treePanel; me = this;
        treePanel = {
            xtype: "container",
            layout: {
                type: "vbox"
            },
            width:300,
            items: [
                {
                    xtype: 'searchfield',
                    ui: 'solo',
                    listeners: {
                        buffer: 500,
                        change:"onSearchTreeChange"
                    }
                },
                {
                    xtype: 'tree',
                    reference:"tree",
                    flex:1,
                    bind:{
                        store:"{treestore}"
                    },
                    hideHeaders: true,
                    rootVisible:false,
                    plugins: {
                        requestdata: {
                            autoLoad: true,
                            params:{
                                 SysOrgId: "00000000-0000-0000-0000-000000000000"
                            },
                            root: {
                                expanded: true,
                                children: []
                            }
                        }
                    },
                    columns: [{
                        xtype: 'treecolumn',
                        flex: 1,
                        cell: { encodeHtml: false },
                        dataIndex:"OrgName",
                        renderer:'treeNodeRenderer'
                    }],
                    listeners: {
                        select: "onTreeSelect",
                        load:"loadTree"
                    }
                }
            ]
        };
        me.addTree("treePanel", treePanel, 250);
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
                            name: 'OrgName',
                            type: "String",
                            label: '机构名称'
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

    initGridPanel: function() {
        var me, gridpanel; me = this;
        gridpanel = {
            xtype: "grid",
            reference: "grid",
            items: [
                {
                    xtype: 'toolbar',
                    layout: "hbox",
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
                        }
                    ]
                }
            ],
            columnLines: true,
            selectable: {
                checkbox: true
            },
            selType: 'checkboxmodel',
            reference: "grid",
            bind: {
                store: '{gridstore}'
            },
            columns: [
                { text: '机构名称', dataIndex: 'OrgName', width: 200 },
                { text: '机构代码', dataIndex: 'OrgCode', width: 200 },
                { text: '排序', dataIndex: 'Sort', width: 70 },
                { text: '描述', dataIndex: 'Description', flex: 1 }
            ],
            plugins: {
                pagination: {},
                requestdata: {
                    autoLoad: false
                }
            }
        };
        me.addGrid("grid", gridpanel);
    }
})