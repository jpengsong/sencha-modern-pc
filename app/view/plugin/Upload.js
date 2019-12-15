Ext.define("App.view.plugin.Upload", {
    xtype: "upload",
    extend: 'Ext.Panel',
    layout: 'auto',
    items: [
        {
            xtype: "container",
            bodyCls: "row",
            items: [
                {
                    xtype: "fileuploader",
                    inline :true,
                    title:"批量上传",
                    reference: "fileUploader",
                    cls: 'col-sm-10 col-xs-20',
                    height: 500,
                    listeners:{
                        painted:function () {
                            var me = this;
                            me.setOption({
                                server: "/api/File/Upload"
                            });
                        }
                    }
                }
            ]
        }
    ]
})