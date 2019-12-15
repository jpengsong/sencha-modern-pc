Ext.define("App.view.systemmanage.sysmenu.SysMenuEdit", {
    alias: "widget.sysmenuedit",
    extend: "Ext.window.Window",
    extend: "Ext.Dialog",
    displayed: true,
    closable: true,
    modal: true,
    width: 450,
    height: 550,
    layout: "fit",
    padding:"0 0",
    items: [
        {
            xtype: "formpanel",
            reference:"form",
            defaults: {
                labelAlign: "left",
                labelTextAlign: "center",
                labelWrap: true,
                border: true,
                width: "100%",
                labelWidth: 70,
                margin: "0",
                clearable: false
            },
            buttonToolbar: {
                xtype: 'toolbar',
                docked: 'bottom',
                defaultType: 'button',
                weighted: true,
                ui: 'footer',
                defaultButtonUI: 'action',
                layout: {
                    type: 'box',
                    vertical: false,
                    pack: 'center'
                },
                defaults: {
                    margin: "0px 5px"
                }
            },
            items: [
                {
                    xtype: "combobox",
                    reference: "comboType",
                    label: "类型",
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    bind: {
                        value: "{typeValue}",
                        store: "{typeStore}"
                    },
                    listeners: {
                        change: "onComboTypeChange"
                    }
                },
                {
                    xtype: "combobox",
                    label: "视图类型",
                    reference: "PageType",
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    value: "tab",
                    bind: {
                        store: "{pageTypeStore}",
                        value: "{model.PageType}"
                    }
                },
                {
                    xtype: "textfield",
                    label: '页面类型',
                    required: true,
                    reference: "ViewType",
                    afterLabelTextTpl: config.AfterLabelTextRequired,
                    bind: "{model.ViewType}"
                },
                {
                    xtype: "textfield",
                    label: '按钮编码',
                    reference: "Code",
                    bind: "{model.MenuCode}",
                    required: true
                },
                {
                    xtype: "textfield",
                    reference: "IconCls",
                    label: "图标",
                    bind: "{model.IconCls}"
                },
                {
                    xtype: "textfield",
                    reference: "Name",
                    bind: {
                        value: "{model.MenuName}",
                        label: '{labelName}'
                    },
                    required: true
                },
                {
                    xtype: "numberfield",
                    label: '排序',
                    required: true,
                    reference: "Order",
                    bind: "{model.Order}"
                },
                {
                    xtype: 'radiogroup',
                    label: '是否启用',
                    bind: "{model.IsEnable}",
                    items: [
                        { label: '启用', name: 'IsEnable', margin: "0 0 0 50", value: 1 },
                        { label: '禁用', name: 'IsEnable', value: 0 }
                    ]
                },
                {
                    xtype: 'textareafield',
                    label: '描述',
                    bind: "{model.Description}"
                }
            ],
            buttons: [
                { text: '保存', iconCls: "x-far fa-save", handler: 'onSave' },
                { text: '重置', iconCls: "x-far fa-history", handler: 'onReset' }
            ]
        }
    ],
    listeners: {
        initialize: "onInitialize"
    },
    controller: {

        //保存
        onSave: function () {
            var me = this,
                view = me.getView(),
                refs = me.getReferences(),
                vm = me.getViewModel(),
                model = vm.get("model"),
                url,
                selNode = vm.get("selNode"),
                newNode,
                data = {};
            if (refs.comboType.getValue() == 0) {
                data.SysMenuId = model.get("SysMenuId");
                data.ParentId = model.get("ParentId");
                data.MenuName = model.get("MenuName");
                data.IconCls = model.get("IconCls");
                data.Order = model.get("Order");
                data.ViewType = model.get("ViewType");
                data.PageType = model.get("PageType");
                data.IsEnable = refs.form.getValues().IsEnable;
                data.Description = model.get("Description");
                url = view.status == "add" ? "/api/SystemManage/SysMenu/AddSysMenu" : "/api/SystemManage/SysMenu/EditSysMenu";
            } else {
                data.SysMenuButtonId = model.get("SysMenuId");
                data.MenuId = model.get("ParentId");
                data.BtnCode = model.get("MenuCode");
                data.BtnName = model.get("MenuName");
                data.Order = model.get("Order");
                data.IsEnable = refs.form.getValues().IsEnable;
                data.Description = model.get("Description");
                url = view.status == "add" ? "/api/SystemManage/SysMenuButton/AddSysMenuButton" : url = "/api/SystemManage/SysMenuButton/EditSysMenuButton";
            }
            if (refs.comboType.getValue() == 0 && refs.Name.validate() && refs.Order.validate() && refs.ViewType.validate() && refs.PageType.validate() ||
                refs.comboType.getValue() == 1 && refs.Name.validate() && refs.Code.validate() && refs.Order.validate()) {
                App.Ajax.request({
                    url: url,
                    method: (view.status == "add" ? "POST" : "PUT"),
                    nosim: false,
                    type: "JSON",
                    showmask: true,
                    maskmsg: "正在保存...",
                    params: data,
                    success: function (data) {
                        if (!Ext.isEmpty(data.Data)) {
                            if (view.status == "add") {
                                newNode = Ext.create("App.model.systemmanage.SysMenuButtonDetail", data.Data);
                                App.TreeNode.appendNode(selNode, newNode);
                            } else {
                                App.TreeNode.updateNode(selNode, data.Data);
                            }
                            Ext.Msg.alert("提示","保存成功");
                            view.close();
                        } else {
                            Ext.Msg.alert("提示","保存失败");
                        }
                    },
                    error: function (msg) {
                        Ext.Msg.alert("提示",msg);
                    }
                })
            }
        },

        //重置
        onReset: function () {
            var me = this; me.getViewModel().get("model").reject();
        },

        //切换表单
        onComboTypeChange: function () {
            var me = this, refs = me.getReferences(), vm = me.getViewModel();
            if (refs.comboType.getValue() == 0) {
                refs.Code.hide();
                refs.ViewType.show();
                refs.PageType.show();
                refs.IconCls.show();
                vm.set("labelName", "菜单名称");
            } else {
                refs.Code.show();
                refs.ViewType.hide();
                refs.PageType.hide();
                refs.IconCls.hide();
                vm.set("labelName", "按钮名称");
            }
        },

        //呈现组件后触发
        onInitialize: function () {
            var me = this, refs = me.getReferences();
            if (me.getView().status == "edit") {
                refs.comboType.setDisabled(true);
            }
        }
    }
})