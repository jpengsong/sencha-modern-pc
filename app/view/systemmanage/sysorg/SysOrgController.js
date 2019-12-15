Ext.define("App.view.systemmanage.sysorg.SysOrgController", {
    extend: 'Ext.app.ViewController',
    alias: "controller.sysorg",

    //加载Tree
    loadTree:function(store, records, successful, operation, node, eOpts){
        if (successful && records.length > 0) {
            records[0].getOwnerTree().getSelectable().select(records[0]);
        }
    },

    //文本搜索组织机构
    onSearchTreeChange: function (field, value) {
        var me = this, store = me.getViewModel().get("treestore"), regExp, collection; me.rendererRegExp = null;
        if (store != null) {
            store.clearFilter();
            if (value) {
                me.rendererRegExp = new RegExp('(' + value + ')');
                regExp = new RegExp('.*' + value + '.*');
                collection = new Ext.util.MixedCollection();
                //正则过滤数据
                store.filterBy(function (record, id) {
                    if (record.childNodes.length > 0) {
                        collection.add(record.data.SysOrgId, regExp.test(record.data.OrgName));
                        return true;
                    } else {
                        var SysOrgId = record.parentNode.data.SysOrgId;
                        if (collection.containsKey(SysOrgId) && collection.get(SysOrgId)) {
                            return true;
                        } else {
                            collection.add(record.data.SysOrgId, regExp.test(record.data.OrgName));
                            return regExp.test(record.data.OrgName);
                        }
                    }
                })

                //如果没有一项符合搜索要求的 全部返回false
                if (collection.items.indexOf(true) === -1) {
                    store.filterBy(function (record, id) {
                        return false;
                    })
                };
            }
        }
    },

    //组织机构返回结果
    treeNodeRenderer: function (value) {
        return this.rendererRegExp ? value.replace(this.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },

    //左侧组织机构选中某一项
    onTreeSelect: function (store, record, index, eOpts) {
        var me = this, refs = me.getReferences(), vm = me.getViewModel(), gridStore = vm.getStore("gridstore"),queryItems =  App.Page.getQueryItems(refs.search);
        me.onSearch();
    },

    //查询
    onSearch:function(){
        var me = this, refs = me.getReferences(), gridStore = refs.grid.getStore(),queryItems = App.Page.getQueryItems(refs.search),record = refs.tree.getSelectable().getSelectedRecord();
        queryItems["ParentOrgId"] = record.get("SysOrgId");
        App.Page.setQueryItems(gridStore,queryItems);
        gridStore.loadPage(1);
    },

    //重置
    onReset:function(){
        var me = this, refs = me.getReferences();
        App.Page.resetQueryItems(refs.search);
    },

    //添加
    onAdd: function () {
        var me = this, record, refs = me.getReferences();
        if (App.Page.selectionModel(refs.tree, false)) {
            selRecord = refs.tree.getSelectable().getSelectedRecord();
            record = Ext.create("App.model.systemmanage.SysOrg");
            record.set("ParentOrgId", selRecord.get("SysOrgId"));
            record.set("Level", selRecord.get("Level") + 1);
            Ext.widget({
                title: "新增机构",
                xtype: "sysorgedit",
                status: "add",
                scope: refs,
                viewModel: {
                    data: {
                        org: record,
                        selRecord: selRecord
                    },
                    stores: {
                        treestore: {
                            type: "systemmanage.sysorg.treestore",
                        }
                    }
                }
            });
        }
    },

    //编辑
    onEdit: function () {
        var me = this, record, refs = me.getReferences();
        if (App.Page.selectionModel(refs.grid, false)) {
            record = refs.grid.getSelectable().getSelectedRecord();
            selRecord = refs.tree.getSelectable().getSelectedRecord();
            Ext.widget({
                title: "编辑机构",
                xtype: "sysorgedit",
                status: "edit",
                scope: refs,
                viewModel: {
                    data: {
                        org: record.clone(),
                        selRecord: selRecord
                    },
                    stores: {
                        treestore: {
                            type: "systemmanage.sysorg.treestore",
                        }
                    }
                }
            });
        };
    },

    //删除
    onDelete: function () {
        var me = this, refs = me.getReferences(), records, idArray = [];
        if (App.Page.selectionModel(refs.grid, true)) {
            records = refs.grid.getSelectable().getSelectedRecords();
            Ext.each(records, function (record, index) {
                idArray.push(record.get("SysOrgId"));
            })
            Ext.Msg.confirm("提示", "确认删除选中的" + idArray.length + "行数据项吗？",
                function (btn) {
                    if (btn == "yes") {
                        App.Ajax.request({
                            url: "/api/SystemManage/SysOrg/DeleteSysOrg",
                            method: "DELETE",
                            nosim: false,
                            type: "JSON",
                            showmask: true,
                            maskmsg: "正在删除...",
                            params: idArray.join(','),
                            success: function (data) {
                                if (data.Data > 0) {
                                    Ext.Msg.alert("提示","删除成功");
                                    me.onSearch();
                                    //App.TreeNode.updateChildNodes(refs.tree.getSelectable().getSelectedRecord());
                                } else {
                                    Ext.Msg.alert("提示","删除失败");
                                }
                            },
                            error: function (msg) {
                                Ext.Msg.alert("提示",msg);
                            }
                        })
                    }
                })
        }
    }
})