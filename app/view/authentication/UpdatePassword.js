Ext.define("App.view.authentication.UpdatePassword", {
    alias: "widget.updatepassword",
    displayed: true,
    extend: "Ext.Dialog",
    title: "修改密码",
    width: 500,
    height: 330,
    defaults: {
        labelAlign: "left",
        labelTextAlign: "center",
        labelWrap: true,
        border: true,
        width: "100%",
        labelWidth: 120,
        margin: "0",
        clearable: false
    },
    items: [
        {
            label: '输入旧密码',
            xtype: "passwordfield",
            required: true,
            reference: "oldPassword"
        },
        {
            label: '输入新密码',
            xtype: "passwordfield",
            reference: "newPwd",
            required: true,
            listeners: {
                change: "onChangePwd"
            }
        },
        {
            label: '再次输入新密码',
            xtype: "passwordfield",
            reference: "newPwd1",
            required: true,
            validators: {
                type: 'controller',
                fn: 'passwordValidator'
            }
        },
        {
            xtype: "image",
            width: "65%",
            margin: "0 0 0 120",
            height: 40,
            reference: "image",
            src: "resources/images/updatepassword/q0.jpg"
        }
    ],
    buttons: [
        { text: '保存', iconCls: "x-far fa-save", handler: 'onSave' },
        { text: '关闭', iconCls: "x-far fa-window-close", handler: 'onClose' }
    ],
    controller: {

        //更改密码
        onChangePwd: function () {
            var me = this; refs = me.getReferences();
            var strength = 0;
            value = refs.newPwd.getValue();
            if (Ext.isEmpty(value)) {
                strength = 0;
            } else {
                if (value.length > 5 && value.match(/[\da-zA-Z]+/)) {
                    if (value.match(/\d+/)) {
                        strength++;
                    }
                    if (value.match(/[a-z]+/)) {
                        strength++;
                    }
                    if (value.match(/[A-Z]+/)) {
                        strength++;
                    }
                    if (value.match(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)) {
                        strength++;
                    }
                }
            }
            refs.image.setSrc("resources/images/updatepassword/q" + strength + ".jpg");
        },

        //两次输入新密码校验
        passwordValidator: function (val) {
            var me = this; refs = me.getReferences();
            var me = this; newPwdVal = refs.newPwd.getValue();
            return newPwdVal != val ? "两次密码输入不一致" : true;
        },

        //关闭
        onClose:function(){
            this.getView().close();
        }
    }
})