/**
 *
 *  绑定组件数据存在延迟，而不能立即调用，此插件用来初始化组件请求参数
 *  分页请求 采用统一格式如下
 *  var RequestData = {
 *      TokenGuid:用户身份票据,
 *      Data:{
 *           QueryItem:Object或者Array,
 *           PagingSetting:{
 *               PageCount:10,
 *               PageIndex:0,
 *               SortBy:"ASC"
 *               SortOrder:"field"
 *           }
 *      }
 * }
 * OR
 *  var RequestData = {
 *      TokenGuid:用户身份票据,
 *      Data:{Object或者Array}
 *  }
 *  使用例子如下：
 *  plugins: {
 *      requestdata: {
 *         autoLoad: true
 *      }
 *  }
*/
Ext.define("App.ux.plugin.RequestData", {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.requestdata',

    config: {

        /**
        * 
        * @param {object}} 
        */

        grid: null,

        /**
        * 
        * @param {object}} 
        */

        store: null,

        /**
        * 
        * @param {Boolean} 
        */
        autoLoad: false,

        /**
        * 
        * @param {Function} params 初始化参数
        */
        params: Ext.emptyFn,

        /**
        * @param {Object}  参数 
        */
        root: null
    },
    
    /**
    * init function
    */
    init: function (grid) {
        var me, me = this; grid.autoLoad = false;
        me.setGrid(grid);
    },

    updateGrid: function (grid, oldGrid) {
        var me = this;
        if (grid) {
            grid.on({
                storechange: 'onStoreChanged',
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
        if (!store) {
            return;
        }
        me.setStore(store);
        if (me.getParams() != Ext.emptyFn) {
            App.Page.setExtraParamData(store, me.getParams());
        } else {
            App.Page.setExtraParamData(store, {});
        }
        if (me.getRoot() != null) {
            store.setRoot(me.getRoot());
        }
        store.on("beforeload", me.onbeforeload,me);
        store.setAutoLoad(me.getAutoLoad());
    },

    privates: {
 
        /*
        * store beforeload
        * private
        */
        onbeforeload: function (store, operation, eOpts) {
            var me = this, pagingSetting = {};
            if (me.getGrid().getPlugin("pagination")) {
                var limit = operation.getLimit();
                var page = operation.getPage();
                var sorters = operation.getSorters();
                pagingSetting['PageCount'] = limit * page;
                pagingSetting["PageIndex"] = limit * page - limit;
                if (!Ext.isEmpty(sorters)) {
                    var sortOrder = [];
                    var sortBy = [];
                    for (var i = 0; i < sorters.length; i++) {
                        sortOrder[i] = sorters[i].getProperty();
                        sortBy[i] = sorters[i].getDirection();
                    }
                    pagingSetting['SortOrder'] = sortOrder.join(',');
                    pagingSetting['SortBy'] = sortBy.join(',');
                }
                App.Page.setExtraParamData(store, { PagingSetting: pagingSetting });
            }
        }
    }
})