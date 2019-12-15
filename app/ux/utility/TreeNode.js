/**
 * 树节点数据 
 */
Ext.define('App.ux.utility.TreeNode', {
    alternateClassName: ['App.TreeNode'],
    statics: {

        /**
        * 绑定数据树控件数据
        * @param {Array} list 包含主id、父id结构的列表数据
        * @param {String} idField 主id字段名
        * @param {String} parentField 父id字段名
        * @param {Boolean} isExpand 是否展开各级节点
        * @param {Function} nodeConfig 绑定节点时执行的函数
        */
        bindTreeData: function (list, idField, parentField, iconClsField, isExpand, isAllExpand, rootId, checked) {
            var me = this, rootNode = [], options = {};
            if (!Ext.isEmpty(idField) && !Ext.isEmpty(parentField)) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i][parentField] == rootId) {
                        options =
                            {
                                idField: idField,
                                parentField: parentField,
                                isAllExpand: isAllExpand,
                                checked: checked,
                                iconCls: list[i][iconClsField],
                                expanded: isExpand || isAllExpand,
                                leaf: true,
                                list: list,
                                children: []
                            };
                        Ext.apply(options, list[i]);
                        rootNode.push(options);
                        me.bindNode(options);
                    }
                }
            }
            return rootNode;
        },

        /**
        * 绑定节点
        * @param {Object} options 输入参数，包含下列属性的对象
        * @private
        */
        bindNode: function (options) {
            var me = this, list = options.list, parentid = options[options.idField], node = {};
            for (var i = 0; i < list.length; i++) {
                if (list[i][options.parentField] == parentid) {
                    node = {
                        iconCls: list[i][options.iconClsField],
                        idField: options.idField,
                        parentField: options.parentField,
                        isAllExpand: options.isAllExpand,
                        checked: options.checked,
                        expanded: options.isAllExpand,
                        leaf: true,
                        list: list,
                        children: []
                    };
                    Ext.apply(node, list[i]);
                    options.children.push(node);
                    options.leaf = false;
                    me.bindNode(node);
                }
            }
        },

        /**
        * 添加子节点
        * @param {Object} node 父级节点
        * @param {Array} children 子节点数组
        */
        appendChildren: function (node, children) {
            for (i = 0, ln = children.length; i < ln; i++) {
                children[i] = node.createNode(children[i]);
                children[i].phantom = false;
            }
            node.appendChild(children);
        },

        /**
        * 获取树的根节点,是否是超级管理员
        * @return 
        */
        getRootOrgID: function () {
            var rootParentValue = null;
            if (!ux.UserInfo.IsSuperUser) {
                rootParentValue = ux.UserInfo.BelongToOrgID;
            }
            return rootParentValue;
        },

        //更新当前节点的所有子节点
        updateChildNodes: function (node) {
            if (node != null) {
                var treeStore = node.getTreeStore(), reader = treeStore.getProxy().getReader();
                params = {}; params[reader.idField] = node.get(reader.idField);
                App.Ajax.request({
                    url: treeStore.getProxy().getUrl(),
                    method: "GET",
                    nosim: true,
                    type: "JSON",
                    params: params,
                    success: function (data) {
                        data = data.Data;
                        node.removeAll();
                        records = App.TreeNode.bindTreeData(data.List, reader.idField, reader.parentField, reader.iconClsField, false, false, node.get(reader.idField), reader.checked);
                        for (var i = 0; i < records.length; i++) {
                            node.appendChild(records[i]);
                        }
                    }
                })
            }
        },

        //更新当前节点
        updateNode: function (oldNode, data) {
            var fileds = oldNode.getFields();
            for (var i = 0; i < fileds.length; i++) {
                if (data.hasOwnProperty(fileds[i].name)) {
                    oldNode.set(fileds[i].name, data[fileds[i].name]);
                }
            }
            oldNode.parentNode.replaceChild(oldNode, oldNode);
        },

        //添加子节点
        appendNode:function(parentNode,childNode){
            childNode.set("leaf", true);
            parentNode.appendChild(childNode);
            parentNode.expand();
        }
    }
});
