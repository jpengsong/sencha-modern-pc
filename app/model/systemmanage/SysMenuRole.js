Ext.define("App.model.systemmanage.SysMenuRole", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysMenuRoleId', type: 'string' },
        { name: 'MenuId', type: 'string' },
        { name: 'RoleId', type: 'string' },
        { name: 'Type', type: 'int' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' }
    ],
    idProperty: 'SysMenuRoleId'
})