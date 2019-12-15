Ext.define("App.view.main.Main", {
    id: "mainCardPanel",
    extend: 'Ext.panel.Panel',
    controller: "main",
    viewModel: "main",
    layout: 'card',
    items: [
        {
            xtype: "container",
            routeId: "main",
            reference: "main",
            layout: {
                type: 'vbox',
                align: "stretch"
            },
            items: [
                { xtype: "main-toolbar" },
                {
                    xtype: "main-menu",
                    reference:"navigationMenuList",
                    bind: { store: '{navigationtree}' },
                    height: 50,
                    listeners: {
                        selectionchange:"onSelectionchange"
                    }
                },
                {
                    xtype: "container",
                    flex: 1,
                    layout: {
                        type: "hbox",
                        align: "stretch"
                    },
                    items: [
                        {
                            xtype: 'main-tree',
                            singleExpand :true,
                            border:true,
                            bind: { store: '{navigationtree}' },
                            reference: "navigationTreeList",
                            width: 250,
                            listeners:{
                                selectionchange :"onSelectionchange"
                            }
                        },
                        {
                            xtype: 'tabpanel',
                            id: "mainTabPanel",
                            cls: "main-tabpanel",
                            flex: 1,
                            layout: {
                                type: 'card',
                                animation: {
                                    type: 'fade',
                                    duration: 250
                                }
                            },
                            tabBar: {
                                ui: "main-tabBar",
                                defaultTabUI: "main-tabbar-tab",
                                defaultType: "tab",
                                defaults: {
                                    height: 25,
                                    scrollable: true,
                                    margin: "3px 5px 2px 3px",
                                    flex: null
                                },
                                layout: {
                                    pack: 'start',
                                    overflow: 'scroller'
                                }
                            },
                            items: [
                                {
                                    title: '首页',
                                    xtype: "home"
                                }
                            ],
                            listeners:{
                                activeItemchange:"onTabChange"
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        painted: 'onMainViewRender'
    }
})