Ext.define("App.model.systemmanage.SysOrg", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysOrgId', type: 'string' },
        { name: 'ParentOrgId', type: 'string' },
        { name: 'ParentOrgName', type: 'string' },
        { name: 'OrgName', type: 'string' },
        { name: 'OrgCode', type: 'string' },
        { name: 'Level', type: 'int' },
        { name: 'Description', type: 'string' },
        { name: 'Sort', type: 'int' },
        { name: 'IsDel', type: 'int' },
        { name: 'Description', type: 'string' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysOrgId'
})