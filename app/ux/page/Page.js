/**
 * 视图 页面基础类 使用例子范围适用于
 * 条件查询和Grid列表展示
 */
Ext.define("App.ux.page.Page", {
    extend: "Ext.Panel",
    padding:"20px 20px",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initialize: function () {
        var me = this;
        me.defaultPageLayout();
    },

    defaultPageLayout: function () {
        var me = this, gridPanel,queryPanel; me.items = [];
        
        if (me.queryList.getCount() > 0) {
            queryPanel = me.queryList.first();
            queryPanel.shadow = true,
            me.add(queryPanel);
        }

        if (me.gridList.getCount() > 0) {
            gridPanel = me.gridList.first();
            gridPanel.flex = 1;
            gridPanel.shadow = true,
            me.add(gridPanel);
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

    constructor: function (config) {
        var me = this;
        me.queryList = new Ext.util.MixedCollection();
        me.gridList = new Ext.util.MixedCollection();
        me.callParent([config]);
    }
})