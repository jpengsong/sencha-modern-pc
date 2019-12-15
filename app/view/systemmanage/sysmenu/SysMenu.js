Ext.define("App.view.systemmanage.sysmenu.SysMenu", {
    xtype: "sysmenu",
    viewModel: "sysmenu",
    controller: "sysmenu",
    extend: "App.ux.page.TreePage",
    initialize: function () {
        var me = this;
        me.initTreeGridPanel();
        me.callParent();
    },

    initTreeGridPanel: function () {
        var me, treePanel; me = this;

        treePanel = {
            xtype: "tree",
            reference: "tree",
            rootVisible: false,
            animate: true,
            flex: 1,
            bind: {
                store: '{treestore}'
            },
            plugins: {
                requestdata: {
                    autoLoad: true,
                    root: {
                        expanded: true,
                        children: []
                    }
                }
            },
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
                            reference: "addbtn",
                            iconCls: "x-far fa-plus",
                            handler: "onAdd"
                        },
                        {
                            text: '编辑',
                            reference: "editbtn",
                            iconCls: "x-far fa-edit",
                            handler: "onEdit"
                        },
                        {
                            text: '删除',
                            reference: "delbtn",
                            iconCls: "x-far fa-trash",
                            handler: "onDel"
                        }
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    text: '菜单名称',
                    dataIndex: 'MenuName',
                    width: 250,
                    sortable: true
                },
                {
                    text: '编码',
                    dataIndex: 'MenuCode',
                    width: 150,
                    sortable: true,
                    align: 'center'
                },
                {
                    text: '排序',
                    dataIndex: 'Order',
                    width: 80,
                    sortable: true,
                    align: 'center'
                },
                {
                    text: '图标',
                    dataIndex: 'IconCls',
                    width: 80,
                    sortable: true,
                    align: 'center',
                    cell: {encodeHtml: false},
                    renderer: function (value) {
                        return "<i class='" + value + "'></i>";
                    }
                },
                {
                    text: '页面类型',
                    dataIndex: 'ViewType',
                    width: 150,
                    sortable: true,
                    align: 'center'
                },
                {
                    text: '是否启用',
                    dataIndex: 'IsEnable',
                    width: 100,
                    sortable: true,
                    align: 'center',
                    cell: {encodeHtml: false},
                    renderer: function (value) { return "<span style='color:" + (value == 1 ? "green" : "red") + "'>" + (value == 1 ? "是" : "否") + "</span>"; }
                },
                {
                    text: '描述',
                    dataIndex: 'Description',
                    flex: 1,
                    sortable: true,
                    align: 'center'
                }
            ],
            listeners: {
                rowclick: "onRowclick"
            }
        };
        me.addTree("tree",treePanel,"100%");
    }
})