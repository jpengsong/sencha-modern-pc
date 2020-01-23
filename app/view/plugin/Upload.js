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
                    cls: 'col-sm-10 col-xs-10',
                    height: 500,
                    listeners:{
                        painted:function () {
                            var me = this;
                            me.setOption({
                                server: "/api/File/Upload"
                            });
                        }
                    }
                },
                {
                    xtype:"froalaeditor",
                    cls: 'col-sm-10 col-xs-10',
                    height: 500,
                    listeners: {
                        // Native Froala events are prefixed with 'froala.'
                        "froala.click": function (froalaComponent) {
                            console.info(froalaComponent.getValue());
                        }
                    }
                }
            ]
        }
    ]
})