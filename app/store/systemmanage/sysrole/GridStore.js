Ext.define('App.store.systemmanage.sysrole.GridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.systemmanage.sysrole.gridstore',
    model: 'App.model.systemmanage.SysRole',
    pageSize: 3,
    remoteSort:true,
    proxy: {
        type: 'api',
        reader: {
            type:"jsonreader",
            datatype:config.DataType.GridStore
        },
        url: '/api/SystemManage/SysRole/GetSysRolePage',
    },
    sorters: [{
        property: 'ModifyDate',
        direction: 'DESC'
    }]
});