/**
 * 重写密码框组件,支持密码显隐
 */
Ext.define("override.field.PasswordField", {
    override: "Ext.field.Password",
    triggers: {
        eye: {
            cls: 'x-fa fa-eye lock-icon',
            hidden: true,
            handler: function () {
                var me = this;
                me.pwdstatus = false;
                me.passWordShow();
            }
        },
        eyeslash: {
            cls: 'x-fa fa-eye-slash lock-icon',
            handler: function () {
                var me = this;
                me.pwdstatus = true;
                me.passWordShow();
            }
        }
    },

    passWordShow: function () {
        var me = this;
        if (me.pwdstatus) {
            me.setInputType("text");
            me.getTriggers()["eye"].show();
            me.getTriggers()["eyeslash"].hide();
        } else {
            me.setInputType("password");
            me.getTriggers()["eye"].hide();
            me.getTriggers()["eyeslash"].show();
        }
    }
})