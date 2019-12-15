/**
 * 请求模拟数据的基础操作类
 * 
 * 功能包括 (获取请求数据源，分页查询，操作树节点数据)
 * 
 */
Ext.define('App.data.Simulated', {
    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],
    dataSource: [],
    onClassExtended: function (cls, base) {

        base.RequestData = function (ctx) {
            var requestData = Ext.decode(ctx.xhr.options.params.RequestData);
            if (!Ext.isEmpty(requestData)) {
                try {
                    if (!Ext.isEmpty(requestData.Data)) {
                        requestData.Data = JSON.parse(requestData.Data);
                    }
                } catch(e){

                }
            }
            return requestData;
        };

        base.SqlQuery = function (condition) {
            var me = this, data = {};
            data.List = Ext.clone(me.dataSource);
            data.RecordCount = Ext.clone(me.dataSource).length;
            if (!Ext.isEmpty(condition)) {
                //查询条件
                if (!Ext.isEmpty(condition.QueryItems)) {
                    try {
                        for (var i = 0; i < data.List.length; i++) {
                            var isExists = true;
                            for (var queryIndex in condition.QueryItems) {
                                var queryitem = condition.QueryItems[queryIndex];
                                switch (queryitem.Method) {
                                    case config.QueryMethod.Like:
                                        if (data.List[i][queryitem.key].indexOf(queryitem.Value) === -1) {
                                            isExists = false;
                                        }
                                        break;
                                    case config.QueryMethod.Equal:
                                        if (data.List[i][queryitem.key] != queryitem.Value) {
                                            isExists = false;
                                        }
                                        break;
                                    default:
                                        isExists = false;
                                        break;
                                }

                                if (!isExists) {
                                    break;
                                }
                            }

                            if (!isExists) {
                                data.List.splice(i, 1);
                                i -= 1;
                            }
                        }
                    } catch (err) {
                        data.List = [];
                    } finally {
                        data.RecordCount = data.List.length;
                    }
                }

                //分页
                if (!Ext.isEmpty(condition.PagingSetting)) {
                    var pagingSetting = condition.PagingSetting;
                    if (!Ext.isEmpty(pagingSetting.SortOrder) && !Ext.isEmpty(pagingSetting.SortBy)) {
                        var props = pagingSetting.SortOrder.split(','),
                            dirs = pagingSetting.SortBy.split(','),
                            fields = [],
                            sortFn;
                        if (props.length == dirs.length) {
                            for (var index in props) {
                                fields.push({ direction: dirs[index], property: props[index] });
                            }
                        }
                    }

                    if (!Ext.isEmpty(pagingSetting.PageIndex) && !Ext.isEmpty(pagingSetting.PageCount)) {
                        data.List = Ext.Array.slice(data.List, pagingSetting.PageIndex, pagingSetting.PageCount);
                    } else if (!Ext.isEmpty(pagingSetting.PageCount)) {
                        data.List = Ext.Array.slice(data.List, 0, pagingSetting.PageCount);
                    }
                }
            }
            return data;
        };

        base.TreeNode = function (list, array, idField, pidField, parentId) {
            for (var i = 0; i < list.length; i++) {
                if (list[i][pidField] == parentId) {
                    array.push(list[i]);
                    base.TreeNode(list, array, idField, pidField, list[i][idField]);
                }
            }
        };

        base.getTreeData = function (list, idField, pidField, parentId) {
            var array = [], data = {};
            for (var i = 0; i < list.length; i++) {
                if (list[i][pidField] == parentId) {
                    array.push(list[i]);
                    base.TreeNode(list, array, idField, pidField, list[i][idField]);
                }
            }
            data.List = array;
            data.RecordCount = array.length;
            return data;
        };
  
        base.Init();

        //存储到模拟数据集合中
        Ext.defer(function () {
            App.SimulateDB.Add(base.$className.substring(base.$className.lastIndexOf(".") + 1, base.$className.length), base.dataSource);
        }, 100);
    }
});