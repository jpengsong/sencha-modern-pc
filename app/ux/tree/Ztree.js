/**
 *  Ztree 使用例子如下：
 *  {
 *      xtype:"ztree",
 *      valueField:"id",
 *      displayField:"name",
 *      parentField:"parebtId"
 *  }
*/
Ext.define("App.ux.tree.Ztree", {
    extend: "Ext.container.Container",
    xtype: "ztree",
    ztreeId: "zTree",
    isCheck: true,
    valueField: null,
    displayField: null,
    parentField: null,
    actionCode: [],
    ztreeConfig: null,
    params: null,
    expandAll: false,
    initComponent: function () {
        var me = this;
        
        me.initZtree();

        me.callParent();
    },

    initZtree: function () {
        var me, setting, config, firstInit;
        me = this;
        config = {
            callback: {
                onClick: function (event, treeId, treeNode, clickFlag) {
                    me.fireEvent('click', me, treeNode, clickFlag);
                },
                beforeExpand: function zTreeBeforeExpand(treeId, treeNode) {
                    if (Ext.isFunction(me.beforeExpand)) {
                        return me.beforeExpand(treeId, treeNode);
                    }
                    return true;
                },
                onAsyncSuccess: function (event, treeId, treeNode, msg) {
                    if (me.expandAll) {
                        var treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
                        treeObj.expandAll(true);
                    }
                    if (!firstInit) {
                        firstInit = true;
                        if (Ext.isFunction(me.init)) {
                            return me.init(treeId, treeNode, msg);
                        }
                    }
                }
            },
            data: {
                key: {
                    name: me.displayField
                },
                simpleData: {
                    idKey: me.valueField,
                    pIdKey: me.parentField
                }
            },
            check: {
                enable: me.isCheck,
                chkStyle: "checkbox",
                chkboxType: { "Y": "ps", "N": "ps" }
            },
            async: {
                enable: true,
                type: "get",
                url: me.actionCode,
                otherParam: ux.Ajax.getRequestData({ url: me.actionCode, data: me.getParams() }),
                dataFilter: function (treeId, parentNode, childNodes) {
                    var data = Ext.decode(childNodes.Data);
                    var treeNodes = me.initZtreeNode(parentNode, data);
                    return treeNodes;
                }
            }
        };
        setting = Ext.apply(config, me.ztreeConfig);
        setTimeout(function () {
            var ztreeId = $("#" + me.ztreeId + "");
            $.fn.zTree.init(ztreeId, setting);
        })
    },

    initZtreeNode: function (parentNode, data) {
        var me = this, nodes = new Array();
        if (Ext.isEmpty(parentNode)) {
            Ext.each(data, function (e) {
                if (Ext.isEmpty(e[me.parentField]) || e[me.parentField] == Config.Guid.Empty) {
                    var node = me.zTreeNode(e);
                    me.initZtreeChildNode(node, data);
                    nodes.push(node);
                }
            })
        } else if (parentNode.children.length == 0) {
            Ext.each(data, function (e) {
                if (e[me.valueField] == parentNode[me.valueField]) {
                    var node = me.zTreeNode(e);
                    nodes.push(node);
                }
            })
        }
        else {
            me.initZtreeChildNode(parentNode, data)
        };
        return nodes;
    },

    zTreeNode: function (e) {
        var node = {}; var me = this;
        node[me.valueField] = e[me.valueField];
        node[me.displayField] = e[me.displayField];
        node[me.parentField] = e[me.valueField];
        node["isParent"] = e.isParent > 0 ? true : false;
        node["children"] = new Array();
        return node;
    },

    initZtreeChildNode: function (node, data) {
        var me = this, childNodes = new Array();
        for (var i = 0; i < data.length; i++) {
            if (data[i][me.parentField] == node[me.valueField]) {
                childNodes.push(data[i]);
            }
        }
        if (childNodes.length > 0) {
            Ext.each(childNodes, function (e) {
                var childNode = me.zTreeNode(e);
                node.children.push(childNode);
                me.initZtreeChildNode(childNode, data);
            })
        }
    },

    //获取全部节点
    getZtreeAllNodes: function () {
        var me = this;
        var treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        return nodes;
    },

    //获取选中节点
    getZtreeCheckedAllNodes: function () {
        var me = this;
        var treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
        var nodes = treeObj.getCheckedNodes(true);
        return nodes;
    },

    //获取选中节点Id
    getZtreeCheckedNodeIds: function () {
        var me = this, treeObj, nodes, nodeIds = new Array();
        treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
        nodes = treeObj.getCheckedNodes(true);
        for (var i = 0; i < nodes.length; i++) {
            nodeIds[i] = nodes[i][me.valueField];
        }
        return nodeIds.join(",");
    },

    //设置选中某一节点
    setZtreeSelectionNode: function (id, isChek) {
        var me = this;
        var treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
        var node = treeObj.getNodeByParam(me.valueField, id);
        node.checkNode(isChek);
        treeObj.selectNode(node);
    },

    //展开某一节点
    setZtreeExpandNode: function (id) {
        var me = this; me.ids = id.split(",");
        var treeObj = $.fn.zTree.getZTreeObj(me.ztreeId);
        var node = treeObj.getNodeByParam(me.valueField, me.ids[0]);
        treeObj.expandNode(node, true, false, true, function () { });
    },

    getParams: function () {
        var me = this;
        return me.params;
    },

    constructor: function (config) {
        var me = this;
        me.callParent([config]);
    },

    destroy: function (config) {
        var me = this;
        $.fn.zTree.destroy($("#" + me.ztreeId));
        me.callParent([config]);
    }
})