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
        
    }
})