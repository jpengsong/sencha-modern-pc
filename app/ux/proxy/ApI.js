/**
 *
 *  Store通过Proxy请求本地模拟数据 使用例子如下：
 *  proxy: {
 *       type: 'api',
 *       reader: {
 *           type:"jsonreader",
 *           datatype:config.DataType.GridStore
 *       },
 *       url: '/api/SystemManage/SysUser/GetSysUserPage',
 *   }
 * 
*/
Ext.define('App.ux.proxy.API', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.api',
    buildRequest: function (operation) {
        var me = this, request;
        request = new Ext.data.Request({
            params: me.getExtraParams(),
            action: operation.getAction(),
            records: operation.getRecords(),
            url: operation.getUrl(),
            operation: operation,
            proxy: me
        });
        request.setUrl(me.buildUrl(request));
        operation.setRequest(request);
        return request;
    },
    sendRequest: function(request) {
        var currentConfig = request.getCurrentConfig();
        currentConfig.nosim = false;
        request.setRawRequest(Ext.Ajax.request(currentConfig));
        this.lastRequest = request;
        return request;
    },
    extraParams:{
        RequestData:"{}"
    }
});