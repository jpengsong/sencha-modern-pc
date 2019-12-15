Ext.define("App.view.main.widget.Tree", {
    xtype:"main-tree",
    extend: "Ext.list.Tree",
    expanderOnly: false,
    scrollable: Ext.scroll.Scroller({ y: true, x: false }),
    selectOnExpander: true,
    ui: 'navigation',
    defaults: {
        xtype: 'treelistitem',
        textProperty: "MenuName",
        iconClsProperty: "IconCls"
    }
})