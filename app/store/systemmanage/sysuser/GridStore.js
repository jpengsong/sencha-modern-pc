Ext.define('App.store.systemmanage.sysuser.GridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.systemmanage.sysuser.gridstore',
    model: 'App.model.systemmanage.SysUser',
    remoteSort:true,
    pageSize:10,
    proxy: {
        type: 'api',
        reader: {
            type:"jsonreader",
            datatype:config.DataType.GridStore
        },
        url: '/api/SystemManage/SysUser/GetSysUserPage',
    },
    sorters: [{
        property: 'ModifyDate',
        direction: 'DESC'
    }]
});