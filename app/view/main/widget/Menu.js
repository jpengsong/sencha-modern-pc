Ext.define("App.view.main.widget.Menu", {
    extend: "Ext.Container",
    ui:"main-menu",
    xtype: "main-menu",
    layout: {
        type: "hbox",
        align: "stretch"
    },
    defaults: {
        margin: "0 15"
    },
    config: {
        store: null
    },

    setStore: function (store) {
        var me = this;
        store.on("load", me.loadFun, me);
    },

    loadFun: function (store, records, successful, operation, node, eOpts) {
        var me = this;
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var btnItem = {
                xtype: "button",
                data:record,
                ui:"main-menu-button",
                iconCls: record.get("IconCls"),
                text: record.get("MenuName"),
                arrowAlign: 'right',
                listeners:{
                    tap:function(obj){
                        me.onTap(me,obj.getData(),null);
                    }
                }
            };
            if (!Ext.isEmpty(record.childNodes)) {
                btnItem.menu= {
                    bodyPadding: "0 0",
                    bodyBorder: false,
                    border: false,
                    items: []
                };
                 me.bindChildNodes(record.childNodes, btnItem);
            }
            me.add(btnItem);
        }
    },

    bindChildNodes: function (childNodes, nodeItem) {
        var me = this, menu;
        for (var i = 0; i < childNodes.length; i++) {
            menu = {
                iconCls: childNodes[i].get("IconCls"),
                text: childNodes[i].get("MenuName"),
                ui: "main-menu-menuitem",
                data:childNodes[i],
                width: 220,
                listeners:{
                    click:function(obj){
                        me.onTap(me,obj.getData(),null);
                    }
                }
            }
            nodeItem.menu.items.push(menu);
            if (!Ext.isEmpty(childNodes[i].childNodes)) {
                menu.menu = {
                    bodyPadding: "0 0",
                    bodyBorder: false,
                    border: false,
                    items: []
                };
                me.bindChildNodes(childNodes[i].childNodes, menu);
            }
        }
    },

    onTap:function(obj, record, eOpts){
        var me =this;
        me.fireEvent("selectionchange",obj,record,eOpts);
    }
})