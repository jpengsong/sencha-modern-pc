Ext.define("App.model.systemmanage.SysMenuButton", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysMenuButtonId', type: 'string' },
        { name: 'MenuId', type: 'string' },
        { name: 'MenuName', type: 'string' },
        { name: 'BtnCode', type: 'string' },
        { name: 'BtnName', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Order', type: 'int' },
        { name: 'IsEnable', type: 'int' },
        { name: 'IsDel', type: 'int' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysMenuButtonId'
})