Ext.define("App.view.author.Author", {
    extend: 'Ext.panel.Panel',
    xtype:"author",
    layout:{
        type:"vbox",
        align:"center"
    },
    items:[
        {
            xtype:"container",
            margin:"20",
            style:{
                font:"400 20px/1.25 Roboto, sans-serif"
            },
            html:"<div>如果该框架对你有帮助，那就请作者喝杯饮料吧！加QQ群851794664探讨问题。</div>"
        },
        {
            xtype:"container",
            width:"100%",
            flex:1,
            layout:{
                type:"hbox",
                pack:"center"
            },
            defaults:{
                margin:"50 50"
            },
            items:[
                {
                    xtype:"img",
                    width:200,
                    height:200,
                    src:"resources/images/author/微信.png"
                },
                {
                    xtype:"img",
                    width:200,
                    height:200,
                    src:"resources/images/author/支付宝.png"
                }
            ]
        }
    ]
})