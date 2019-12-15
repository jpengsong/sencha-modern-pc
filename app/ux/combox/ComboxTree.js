/**
 * 下拉树 使用例子如下
 * {
 *   xtype: "comboxtree",
 *   label: 'fieldText',
 *   name: "name",
 *   displayField: "text",
 *   valueField: "value",
 *   width: "100%",
 *   height: 200,
 *   rootVisible: false,
 *   bind: {
 *       value: "{value}",
 *       store: "{store}"
 *   }
 * },
 */
Ext.define('App.ux.combox.ComboxTree', {
    extend: 'Ext.field.Picker',
    xtype: 'comboxtree',
    editable: false,
    config: {
        hideSearchfield: false,
        treeheight: 300,
        autoLoad: true,
        displayField: "text",
        valueField: "value",
        params: null,
        rootVisible: false,
        querylocal: true,
        store: null
    },
    
    privates: {
        treepanel: null
    },

    setValue:function(value){
        var me = this;
        me._value = value,store = me.getStore(),inputValue="";
        if(!Ext.isEmpty(store) && !Ext.isEmpty(value)){
            if(store.count()>0){
                var record= store.findRecord(me.getValueField(),value);
                if(!Ext.isEmpty(record)){
                    inputValue =  record.get(me.getDisplayField());
                }
            }
        }
        me.bodyElement.selectNode("input").value =  inputValue;
    },

    getValue:function(){
       return this._value;
    },

    collapse: function () {
        var picker,
            eXt = Ext;
        if (this.expanded) {
            picker = this.getPicker();
            if (this.pickerType === 'edge') {
                eXt.Viewport.removeMenu(picker.getSide(), true);
            }
            else {
                if (picker.bodyElement.dom.contains(event.target)) {
                    this.expanded = true;
                    picker.show();
                } else {
                    this.expanded = false;
                    picker.hide();
                }
            }
        }
    },

    setStore: function (store) {
        var me = this;
        store.scope=me;
        me._store = store;
        me._store.setListeners({
            scope:me,
            load:me.onStoreLoad
        })
        me.createPicker();
    },

    createPicker: function () {
        var me = this, pickerconfig, searchfield, tree;
        pickerconfig = {
            xtype: "container",
            layout: {
                type: "vbox"
            },
            items: []
        };
        if (!Ext.isEmpty(me.getHideSearchfield())) {
            searchfield = {
                xtype: 'searchfield',
                ui: 'solo',
                shadow: 'true',
                listeners: {
                    buffer: 500,
                    scope:me,
                    change: me.onSearchChange
                }
            },
            pickerconfig.items.push(searchfield);
        }

        tree = {
            xtype: 'tree',
            height: 300,
            style: {
                "border-top": "solid 1px #e1e1e1"
            },
            hideHeaders: true,
            store: me.getStore(),
            scope:me,
            rootVisible: me.getRootVisible(),
            plugins: {
                requestdata: {
                    autoLoad: me.getAutoLoad(),
                    params: me.getParams(),
                    root: {
                        expanded: true,
                        children: []
                    }
                }
            },
            columns: [{
                xtype: 'treecolumn',
                flex: 1,
                cell: {encodeHtml: false},
                dataIndex: me.getDisplayField(),
                renderer: function (value) {
                    return me.rendererRegExp ? value.replace(me.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
                }
            }],
            listeners:{
               select:me.onTreeSelect
            }
        }
        pickerconfig.items.push(tree);
        me.setPicker(pickerconfig);
        me.treepanel = me.getPicker().down("component[xtype='tree']");
    },

    onSearchChange: function (me, newvalue, oldvalue, eOpts) {
        var me = this, store = me.getStore(), treepanel = me.treepanel, displayField = me.getDisplayField();
        if (store != null) {
            if (Ext.isEmpty(newvalue)) {
                treepanel.getSelectable().deselectAll();
            }
            regExp = new RegExp('.*' + newvalue + '.*');
            me.rendererRegExp = new RegExp('(' + newvalue + ')');
            collection = new Ext.util.MixedCollection();
            store.clearFilter();

            //正则过滤数据
            store.filterBy(function (record, id) {
                if (record.childNodes.length > 0) {
                    collection.add(record.data.sysOrgId, regExp.test(record.data[displayField]));
                    return true;
                } else {
                    var sysOrgId = record.parentNode.data.sysOrgId;
                    if (collection.containsKey(sysOrgId) && collection.get(sysOrgId)) {
                        return true;
                    } else {
                        collection.add(record.data.sysOrgId, regExp.test(record.data[displayField]));
                        return regExp.test(record.data[displayField]);
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
    },

    onTreeSelect:function(me, selected, eOpts){
        var scope = me.scope;
         scope.setValue(selected[0].get(scope.getValueField()));
         scope.getPicker().hide();
    },

    onStoreLoad:function(store, records, successful, operation, node, eOpts){
        var scope = store.scope;
        scope.setValue(scope.getValue());
    }
})