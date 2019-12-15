/**
 * 视图 页面基础类 使用例子范围适用于
 * 左侧树右侧列表页面，例:组织机构页面
 */
Ext.define("App.ux.page.TreePage", {
    extend: "Ext.Panel",
    padding: "20px 20px",
    shadow :true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initialize: function () {
        var me = this;
        me.defaultPageLayout();
        me.callParent();
    },

    defaultPageLayout: function () {
        var me = this, treePanel, rightItem = {
            padding: "1px 1px 1px 20px",
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            items: []
        };

        if (me.treeList.getCount() > 0) {
            treePanel = me.treeList.first();
            treePanel.shadow = true;
            me.add(treePanel);
        }
      
        if (me.queryList.getCount() > 0) {
            queryPanel = me.queryList.first();
            queryPanel.shadow = true;
            rightItem.items.push(queryPanel);
        }

        if (me.gridList.getCount() > 0) {
            gridPanel = me.gridList.first();
            gridPanel.flex = 1;
            gridPanel.shadow = true;
            rightItem.items.push(gridPanel);
        }

        if (me.queryList.getCount() > 0 || me.gridList.getCount() > 0) {
            me.add(rightItem);
        }
    },

    addQuery: function (key, query) {
        var me = this;
        if (me.queryList.containsKey(key)) {
            me.queryList.removeAtKey(key);
        }
        me.queryList.add(key, query);
    },

    getQuery: function (key) {
        var me = this;

        if (!me.queryList.containsKey(key)) {
            return null;
        }
        else {
            return me.queryList.get(key);
        }
    },

    addGrid: function (key, grid) {
        var me = this;
        if (me.gridList.containsKey(key)) {
            me.gridList.removeAtKey(key);
        }
        me.gridList.add(key, grid);
    },

    getGrid: function (key) {
        var me = this;
        if (!me.gridList.containsKey(key)) {
            return null;
        }
        else {
            return me.gridList.get(key);
        }
    },

    addTree: function (key, tree, treeWidth) {
        var me; me = this;
        me.treeWidth = treeWidth;
        if (me.treeList.containsKey(key)) {
            me.treeList.removeAtKey(key);
        }
        me.treeList.add(key, tree);
    },

    getTree: function (key) {
        var me = this;
        if (!me.gridList.containsKey(key)) {
            return null;
        }
        else {
            return me.gridList.get(key);
        }
    },

    constructor: function (config) {
        var me = this;
        me.treeList = new Ext.util.MixedCollection();
        me.queryList = new Ext.util.MixedCollection();
        me.gridList = new Ext.util.MixedCollection();
        me.callParent([config]);
    }
})