Ext.define("App.model.systemmanage.SysRole", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysRoleId', type: 'string' },
        { name: 'RoleName', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'IsDel', type: 'int' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysRoleId'
})