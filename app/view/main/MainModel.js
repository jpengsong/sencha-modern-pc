Ext.define("App.view.main.MainModel", {
    extend: 'Ext.app.ViewModel',
    alias: "viewmodel.main",
    stores: {
        navigationtree:{
            type:"main.navigation"
        },

        plist: {
            type: "main.plist"
        }
    },

    data:{
        mainToolbar_UI:"default",
        mainToolbarButton_UI:"main-toolbar-button-default",
    }
})