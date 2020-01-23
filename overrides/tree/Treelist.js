/**
 * 重写TreeList在折叠反复悬停点击后出现Bug
 */
Ext.define("override.tree.Treelist", {
    override: "Ext.list.Tree",
    updateStore: function(store, oldStore) {
        var me = this,
            root;
        if (oldStore) {
            
            if (!oldStore.destroyed) {
                if (oldStore.getAutoDestroy()) {
                    oldStore.destroy();
                } else {
                    me.storeListeners.destroy();
                }
            }
            me.removeRoot();
            me.storeListeners = null;
        }
        if (store) {
            me.storeListeners = store.on({
                destroyable: true,
                scope: me,
                nodeappend: 'onNodeAppend',
                nodecollapse: 'onNodeCollapse',
                nodeexpand: 'onNodeExpand',
                nodeinsert: 'onNodeInsert',
                noderemove: 'onNodeRemove',
                rootchange: 'onRootChange',
                update: 'onNodeUpdate'
            });
            root = store.getRoot();
            if (root) {
                me.createRootItem(root);
            }
        }
        if (!me.destroying) {
            me.updateLayout();
        }
    }
})
