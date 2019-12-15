Ext.define("App.model.systemmanage.SysUser", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysUserId', type: 'string' },
        { name: 'OrgId', type: 'string' },
        { name: 'UserName', type: 'string' },
        { name: 'LoginName', type: 'string' },
        { name: 'LoginPassWord', type: 'string' },
        { name: 'Mobile', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'IsEnable', type: 'int' },
        { name: 'MenuLocation', type: 'string' },
        { name: 'DarkMode', type: 'boolean' },
        { name: 'Theme', type: 'string' },
        { name: 'IsDel', type: 'int' },
        { name: 'Description', type: 'string' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysUserId'
})