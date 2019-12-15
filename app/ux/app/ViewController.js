Ext.define("App.ux.app.ViewController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewcontroller',
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
    }
})