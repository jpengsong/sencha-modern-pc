Ext.define("App.view.systemmanage.sysuser.SysUserRole", {
    alias: "widget.sysuserrole",
    extend: "Ext.Dialog",
    displayed: true,
    closable: true,
    modal: true,
    scrollable :{y:true},
    width: 200,
    height: 400,
    padding: "0 0",
    items: [
        {
            xtype: "formpanel",
            reference: "form",
            padding: "0 15",
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
            xtype: 'checkboxgroup',
            reference:"checkboxgroup"
        }
    ],
    buttons: [
        { text: '保存', iconCls: "x-far fa-save", handler: 'onSave' },
        { text: '重置', iconCls: "x-far fa-history", handler: 'onReset' }
    ],
    listeners:{
        initialize:"onInitialize"
    },
    controller: {

        onInitialize:function(){
            var me = this, vm = me.getViewModel(),refs = me.getReferences();
            App.Ajax.request({
                url: "/api/SystemManage/SysRole/GetSysRoleAll",
                method: "GET",
                nosim: false,
                type: "JSON",
                success: function (data) {
                    for (var i = 0; i < data.Data.length; i++) {
                        refs.checkboxgroup.add({ label: data.Data[i].RoleName, value:data.Data[i].SysRoleId, name: 'checkbox' });
                    }
                      App.Ajax.request({
                        url: "/api/SystemManage/SysUserRole/GetSysUserRoleByRule",
                        method: "GET",
                        nosim: false,
                        type: "JSON",
                        params: { UserId:vm.get("UserId")},
                        success: function (data) {
                            var check = {checkbox:[]};
                            for (var i = 0; i < data.Data.length; i++) {
                                check.checkbox.push(data.Data[i].RoleId);
                            }
                            refs.checkboxgroup.setValue(check);
                        }
                    })
                }
            })
        },
        

        //保存
        onSave: function () {
            var me = this, view = me.getView(),refs = me.getReferences(),checkbox = refs.checkboxgroup.getValue().checkbox;
            App.Ajax.request({
                url: "/api/SystemManage/SysUserRole/AddSysUserRole",
                method: "POST",
                nosim: false,
                type: "JSON",
                showmask: true,
                maskmsg: "正在保存...",
                params: {
                    UserId: me.getViewModel().get("UserId"),
                    RoleId: Ext.isArray(checkbox)?checkbox.join(","):checkbox
                },
                success: function (data) {
                    if (data.Data == "1") {
                        Ext.Msg.alert("提示","保存成功");
                        view.close();
                    } else {
                        Ext.Msg.alert("提示","保存失败");
                    }

                },
                error: function (data) {
                    Ext.Msg.alert("提示","保存异常");
                }
            })
        },

        //关闭
        onClose: function () {
            this.getView().close();
        }
    }
})