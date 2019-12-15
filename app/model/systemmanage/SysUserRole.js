Ext.define("App.model.systemmanage.SysUserRole", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysUserRoleId', type: 'string' },
        { name: 'UserId', type: 'string' },
        { name: 'RoleId', type: 'string' },
        { name: 'RoleName', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysUserRoleId'
})