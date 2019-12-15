/**
 * 分页插件 使用例子如下
 * plugins: {
 *  pagination:{
 *      displayInfo:false
 *  }
 * }
 */
Ext.define('App.ux.plugin.Pagination', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.pagination',

    config: {

        grid: null,

        store: null,

        displayInfo: false,

        loadPages: true,

        currentPage: 1,

        pageSize: 0,

        totalCount: 0,

        totalPages: 0,

    },

    displayMsg: '显示 {0} - {1}条，共 {2} 条',

    emptyMsg: '没有数据',

    afterPageText: '页,共 {0} 页',

    getToolbar: function () {
        var me = this,
            toolbar = {
                xtype: "toolbar",
                itemId: "pagination",
                docked: 'bottom',
                cls:Ext.baseCSSPrefix + 'pagingtoolbar',
                defaults: {
                    padding: "0 10"
                },
                items: [
                    {
                        itemId: 'first',
                        xtype: "button",
                        disabled: true,
                        iconCls: 'x-far fa-angle-double-left fa-lg',
                        handler: "moveFirst",
                        scope: me,
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-button'
                    },
                    {
                        itemId: 'prev',
                        xtype: "button",
                        disabled: true,
                        iconCls: 'x-far fa-angle-left fa-lg',
                        handler: "movePrevious",
                        scope: me,
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-button'
                    },
                    {
                        xtype: "component",
                        html: "第",
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-summary'
                    },
                    {
                        itemId: 'inputItem',
                        xtype: 'numberfield',
                        decimals: 0,
                        clearable: false,
                        minValue: 1,
                        width: 40,
                        enableKeyEvents:true,
                        margin: '-1 10 0 2',
                        listeners:{
                            scope: me,
                            keyup:"inputItemKeyup"
                        }
                    },
                    {
                        itemId: 'afterTextItem',
                        xtype: "component",
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-summary'
                    },
                    {
                        itemId: 'next',
                        xtype: "button",
                        iconCls: 'x-far fa-angle-right fa-lg',
                        disabled: true,
                        handler: "moveNext",
                        scope: me,
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-button'
                    },
                    {
                        itemId: 'last',
                        disabled: true,
                        iconCls: 'x-far fa-angle-double-right fa-lg',
                        handler: "moveLast",
                        scope: me,
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-button'
                    },
                    {
                        itemId: 'refresh',
                        iconCls: 'x-far fa-sync',
                        handler: "doRefresh",
                        scope: me,
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-button'
                    },
                    '->',
                    {
                        itemId: 'summary',
                        xtype: 'component',
                        hidden: me.getDisplayInfo(),
                        cls: Ext.baseCSSPrefix + 'pagingtoolbar-summary'
                    }
                ]
            };
        return toolbar;
    },

    init: function (grid) {
        var me = this, toolbar = me.getToolbar();
        me.setGrid(grid);
        grid.add(toolbar);
    },

    updateGrid: function (grid, oldGrid) {
        var me = this;
        me.storeListeners = Ext.destroy(me.storeListeners);
        if (grid) {
            me.gridListeners = grid.on({
                storechange: 'onStoreChanged',
                destroyable: true,
                scope: me
            });
            me.bindStore(grid.getStore());
        }
    },

    onStoreChanged: function (grid, store) {
        this.bindStore(store);
    },

    bindStore: function (store) {
        var me = this;
        Ext.destroy(me.storeListeners);

        if (!store) {
            return;
        }
        me.setStore(store);
        me.storeListeners = store.on({
            add: 'onTotalCountChange',
            remove: 'onTotalCountChange',
            refresh: 'onTotalCountChange',
            clear: 'onTotalCountChange',
            destroyable: true,
            scope: me
        });

        if (store.isLoaded()) {
            me.onTotalCountChange(store);
        }
    },

    onTotalCountChange: function (store) {
        var me = this,
            data = me.getPageData();
        me.setConfig(data);
        me.syncSummary();
    },

    privates: {
        
        /**
         * @private
         */
        getPageData: function () {
            var grid = this.getGrid(),
                store = grid.getStore(),
                totalCount = store.getTotalCount() || store.getCount(),
                pageSize = store.pageSize,
                pageCount = Math.ceil(totalCount / pageSize);

            return {
                totalCount: totalCount,
                totalPages: Ext.Number.isFinite(pageCount) ? pageCount : 1,
                currentPage: store.currentPage,
                pageSize: pageSize
            };
        },

        inputItemKeyup:function(obj, e, eOpts){
            var me = this;
            if(obj.getValue()>0 && obj.getValue()<= me.getTotalPages()&&e.keyCode==13){
                me.getStore().loadPage(obj.getValue());
            }
        },

        moveFirst: function () {
            this.getStore().loadPage(1);
        },

        movePrevious: function () {
            var me = this,
                store = me.getStore(),
                prev = store.currentPage - 1;
            if (prev > 0) {
                store.previousPage();
            }
        },

        moveNext: function () {
            var me = this,
                store = me.getStore(),
                total = me.getPageData().totalPages,
                next = store.currentPage + 1;
            if (next <= total) {
                store.nextPage();
            }
        },

        moveLast: function () {
            var me = this,
                store = me.getStore(),
                last = me.getPageData().totalPages;
            store.loadPage(last);
        },

        doRefresh: function () {
            var me = this,
                store = me.getStore(),
                current = store.currentPage;
            store.loadPage(current);
        },

        syncSummary: function () {
            var me = this,
                grid = me.getGrid(),
                store = grid.getStore(),
                toolbar = grid.child("#pagination"),
                currentPage = me.getCurrentPage(),
                totalCount = me.getTotalCount(),
                pageSize = me.getPageSize();
            totalPages = me.getTotalPages();

            toolbar.child("#inputItem").setValue(currentPage);
            toolbar.child("#afterTextItem").element.dom.innerHTML = Ext.String.format(me.afterPageText, totalPages);
            toolbar.child("#first").setDisabled(currentPage === 1 || totalPages === 1 || totalCount===0);
            toolbar.child("#prev").setDisabled(currentPage === 1 || totalPages === 1 || totalCount===0);
            toolbar.child("#inputItem").setDisabled( totalCount===0 );
            toolbar.child("#last").setDisabled(currentPage === totalPages || totalPages === 1 || totalCount===0);
            toolbar.child("#next").setDisabled(currentPage === totalPages || totalPages === 1 || totalCount===0);
            toolbar.child("#refresh").setDisabled(!store.isLoaded());
            toolbar.child("#summary").element.dom.innerHTML = Ext.String.format(me.displayMsg, ((currentPage - 1) * pageSize) + 1, (currentPage * pageSize) > totalCount ? totalCount : currentPage * pageSize, totalCount);
        }
    }
})