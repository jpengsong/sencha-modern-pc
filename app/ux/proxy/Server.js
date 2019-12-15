/**
 *
 *  Store通过Proxy请求本地模拟数据 使用例子如下：
 *  proxy: {
 *       type: 'server',
 *       reader: {
 *           type:"jsonreader",
 *           datatype:config.DataType.GridStore
 *       },
 *       url: '/api/SystemManage/SysUser/GetSysUserPage',
 *   }
 * 
*/
Ext.define('App.ux.proxy.Server', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.server',
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
        request.setUrl(config.Url + request.getProxy().getUrl());
        operation.setRequest(request);
        return request;
    },
    sendRequest: function (request) {
        var currentConfig = request.getCurrentConfig(); currentConfig.nosim = true;
        request.setRawRequest(Ext.Ajax.request(currentConfig));
        this.lastRequest = request;
        return request;
    },
    extraParams: {
        RequestData: "{}"
    }
});