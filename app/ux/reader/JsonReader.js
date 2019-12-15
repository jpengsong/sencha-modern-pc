/**
 *  proxy请求(本地/远程)json数据,返回来做统一处理：
 *  默认和（本地/远程）所有请求交互，按照统一往返标准格式交互，返回数据格式如下
 *  ResponseData:{
 *        Data: {}, 返回数据
 *        Success: true,是否正确返回
 *        Message: "",系统消息
 *        Code: "",系统格式编码 例：Public.I_0001(执行成功),Public.E_0001(公共错误),Public.E_0002(用户缺少某个权限)
 *  }
 * 
*/
Ext.define('App.ux.reader.JsonReader', {
    extend: 'Ext.data.reader.Json',
    alias: "reader.jsonreader",
    total: 0,
    records: [],
    message: '',
    success: false,
    rootProperty: "records",
    totalProperty: "total",
    successProperty: "success",
    messageProperty: "message",
    idField: null,
    parentField: null,
    rootId: null,
    rootNode: {},
    iconClsField: null,
    checked: null,
    isExpand: false,
    isAllExpand: false,
    getResponseData: function (response) {
        var me, data, error; me = this;
        try {
            if(!Ext.isEmpty(response.responseText)){
                data = Ext.decode(response.responseText);
            }else{
                data = response.responseJson;
            }
            if (data.Code == "Public.I_0001") {
                if (Ext.isEmpty(data.Data)) {
                    return new Ext.data.ResultSet({
                        total: 0,
                        records: [],
                        success: true,
                        message: me.message
                    });
                }
                content = Ext.decode(data.Data);
                if (content.List == undefined && content.List == null) {
                    content.List = content;
                }

                if (me.datatype == config.DataType.GridStore) {
                    me.records = content.List;
                    if (content.RecordCount != undefined && content.RecordCount != null) {
                        me.total = content.RecordCount;
                    } else {
                        me.total = 0;
                    }
                } else if (me.datatype == config.DataType.TreeStore) {
                    me.records = App.TreeNode.bindTreeData(
                        content.List,
                        me.idField,
                        me.parentField,
                        me.iconClsField,
                        me.isExpand,
                        me.isAllExpand,
                        me.rootId,
                        me.checked);
                    return me.records;
                } else if (me.datatype == config.DataType.ComboxStore) {
                    me.records = content.List;
                }

                if (data.Success) {
                    me.success = data.Success;
                }
                var resultSet = new Ext.data.ResultSet({
                    total: me.total,
                    records: me.records,
                    success: me.success,
                    message: me.message
                });
                return resultSet;
            }else{
                
            }
        } catch (ex) {
            error = new Ext.data.ResultSet({
                total: 0,
                records: [],
                success: false,
                message: ex.message
            });
            this.fireEvent('exception', this, response, error);
            Ext.Logger.warn('Unable to parse the JSON returned by the server');
            return error;
        }
    }
});