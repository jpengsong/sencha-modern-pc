Ext.define('App.view.pages.Blank', {
    extend: 'Ext.Panel',
    xtype: 'pageblank',
    anchor: '100% -1',
    title:"标题",
    iconCls:"x-fa fa-home",
    layout: 'center',
    items: [
        {
            xtype: 'container',
            cls: 'blank-page-container',
            html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-clock\'></span></div><h1>该页面正在建设中!</h1><span class=\'blank-page-text\'>请耐心等待</span>'
        }
    ]
});