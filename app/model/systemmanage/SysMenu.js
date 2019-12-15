Ext.define("App.model.systemmanage.SysMenu", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysMenuId', type: 'string' },
        { name: 'ParentId', type: 'string' },
        { name: 'ParentName', type: 'string' },
        { name: 'MenuName', type: 'string' },
        { name: 'Order', type: 'int' },
        { name: 'Description', type: 'string' },
        { name: 'IconCls', type: 'string' },
        { name: 'ViewType', type: 'string' },
        { name: 'PageType', type: 'string' },
        { name: 'IsEnable', type: 'int' },
        { name: 'IsDel', type: 'int' },
        { name: 'CreateUserId', type: 'string' },
        { name: 'CreateUserName', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'ModifyUserId', type: 'string' },
        { name: 'ModifyUserName', type: 'string' },
        { name: 'ModifyDate', type: 'date' }
    ],
    idProperty: 'SysMenuId'
})