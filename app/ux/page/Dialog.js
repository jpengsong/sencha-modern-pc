/**
 * 视图 弹窗基础类 使用例子用于
 * 登录页，锁定页面，空白页，404页面，500页面 ...
 */
Ext.define('App.ux.page.Dialog', {
    extend: 'Ext.Dialog',
    //引入类
    //同一项目中只需引入一次即可
    cls: 'ux-page-dialog-container',
    //自动显示
    hidden: false,
    //最大化显示
    maximized: true,
    //标题
    title: '提示',
    //标题居中显示
    titleAlign: 'center',
    //布局
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    listeners:{
        painted :function(){
            this.setClosable(false);
        }
    }
});