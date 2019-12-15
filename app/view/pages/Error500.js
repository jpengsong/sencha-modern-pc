Ext.define('App.view.pages.Error500', {
    extend: 'App.ux.page.Dialog',
    xtype: 'page500',
    items: [{
        xtype: 'container',
        width: 600,
        cls: 'ux-page-dialog-container',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
                xtype: 'label',
                cls: 'ux-page-dialog-top-text',
                html: '500'
            },
            {
                xtype: 'label',
                cls: 'ux-page-dialog-desc',
                html: '<div>出错啦！</div><div>返回 <a href="#view.main"> 首页 </a></div>'
            }
        ]
    }]
});