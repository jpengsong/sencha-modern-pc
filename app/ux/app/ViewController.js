Ext.define("App.ux.app.ViewController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewcontroller',

    //销毁系统加载遮罩
    destroyLoader: function () {
        var bottom = Ext.get('loadingSplashBottom'),
            top = Ext.get('loadingSplashTop'),
            wrapper = Ext.fly('loadingSplash');
        if (wrapper) {
            top.setHeight(0);
            bottom.setHeight(0);
            Ext.defer(function () {
                wrapper.destroy();
            }, 400);
        }
    },

    //切换暗黑组件
    darkComponentChange: function () {
        var all = Ext.ComponentManager.getAll();
        for (var i = 0; i < all.length; i++) {
            if (all[i].xtype == "echart") {
                all[i].refreshTheme();
            };
        }
    }
})