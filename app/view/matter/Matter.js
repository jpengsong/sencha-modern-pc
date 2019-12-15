Ext.define("App.view.matter.Matter", {
    extend: "Ext.panel.Accordion",
    xtype: "matter",
    viewModel: "matter",
    scrollable: { y: true, x: false },
    padding: 15,
    collapsed :true,
    defaults: {
        xtype: 'panel',
        bodyPadding: 10
    },
    items: [
        {
            title: "类命名规范",
            bind: {
                html: "{example_1}"
            }
        },
        {
            title: "代码书写规范",
            bind: {
                html: "{example_2}"
            }
        },
        {
            title: "查找组件",
            bind: {
                html: "{example_3}"
            }
        },
        {
            title: "业务目录层级",
            bind: {
                html: "{example_4}"
            }
        },
        {
            title: "新的框架",
            bind: {
                html: "{example_5}"
            }
        },
        {
            title: "css命名规范",
            bind: {
                html: "{example_6}"
            }
        },
        {
            title: "开发建议",
            bind: {
                html: "{example_7}"
            }
        }
    ]
})
