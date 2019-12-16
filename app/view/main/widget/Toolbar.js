Ext.define("App.view.main.widget.Toolbar", {
    extend: "Ext.Toolbar",
    xtype:"main-toolbar",
    padding:"0px 0px",
    height: 60,
    layout: {
        type: "hbox",
        align: "stretch"
    },
    items: [
        {
            xtype: "container",
            reference: "logo",
            width: 250,
            cls: "ext",
            border: 10,
            ui: "main-toolbar-logo",
            html: "sencha"
        },
        {
            xtype: "toolbar",
            reference: "toolbar",
            padding: "0 0",
            flex: 1,
            bind:{
                ui:"{mainToolbar_UI}"
            },
            style: { 
                "box-shadow": "0px 0px 0px 0.1px black" 
            },
            defaults: {
                margin: '0 15',
                bind:{
                    ui:"{mainToolbarButton_UI}"
                }
            },
            items: [
                {
                    iconCls: "x-far fa-bars",
                    reference:"micro",
                    listeners: {
                        tap: "onMicro"
                    }
                },
                '->',
                {
                    iconCls: "x-fa  fa-arrows-alt",
                    handler: "onFullScreen"
                },
                {
                    iconCls: "x-fa fa-cog",
                    reference:"setting",
                    arrow:false,
                    menu:{
                        anchor :true,
                        autoHide:false,
                        items:[
                            {
                                xtype: 'fieldset',
                                title: '菜单配置',
                                width:250,
                                items:[
                                    {
                                        xtype: 'combobox',
                                        queryMode: 'local',
                                        label:'菜单位置',
                                        labelAlign :'left',
                                        editable :false,
                                        reference:"menulocation",
                                        displayField: 'name',
                                        valueField: 'value',
                                        store: [
                                            { value: "top", name: '横向' },
                                            { value: "left", name: '左侧' }
                                        ],
                                        listeners:{
                                            select:"onMenuLocationSelect"
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: '主题配色',
                                width:250,
                                items:[
                                    {
                                        xtype: 'togglefield',
                                        label: '暗黑',
                                        reference: 'darkMode',
                                        labelAlign:"left",
                                        labelWidth:50,
                                        listeners:{
                                            change:"onDarkModeChange"
                                        }
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        label: '配色',
                                        reference: 'theme',
                                        defaults:{
                                            labelWidth :50
                                        },
                                        vertical: false,
                                        items: [
                                            { label: '红色', name:"theme", value: 'red',checked: true },
                                            { label: '深紫色', name:"theme", value: 'deep-purple' },
                                            { label: '深橙色', name:"theme", value: "deep-orange" },
                                            { label: '棕色', name:"theme", value: "brown" },
                                            { label: '蓝灰色', name:"theme", value: "blue-grey" },
                                            { label: '粉红色', name:"theme", value: "pink" },
                                            { label: '绿色', name:"theme", value: "green" },
                                            { label: '灰色', name:"theme", value: "grey" },
                                            { label: '浅蓝色', name:"theme", value: "light-blue" }
                                        ],
                                        listeners:{
                                            change:"onThemeChange"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    text: "小靳一郎",
                    menu: [
                        { text: '修改密码', iconCls: "x-far fa-edit", handler: "onUpdatePassWord" },
                        { text: '锁定', iconCls: "x-far fa-lock", handler: "onLock" },
                        { text: '退出', iconCls: "x-far fa-power-off", handler: "onLogout" }
                    ]
                },
                {
                    iconCls: "x-fa  fa-ellipsis-v",
                    handler: "onSetting"
                }
            ]
        }]
})