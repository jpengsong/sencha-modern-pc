Ext.define("App.model.systemmanage.SysMenuButtonDetail", {
    extend: "App.ux.app.Model",
    identifier: "uuid",
    fields: [
        { name: 'SysMenuId', type: 'string' },
        { name: 'ParentId', type: 'string' },
        { name: 'ParentName', type: 'string' },
        { name: 'MenuCode', type: 'string' },
        { name: 'MenuName', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Order', type: 'string' },
        { name: 'ViewType', type: 'string' },
        { name: 'PageType', type: 'string'},
        { name: 'IsEnable', type: 'int' },
        { name: 'IconCls', type: 'string' },
        { name: 'Type', type: 'int' }
    ],
    idProperty: 'SysMenuId'
})