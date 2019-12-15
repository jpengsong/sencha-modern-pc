/**
 * A field version of [Froala Editor](https://www.froala.com). This allows you to use the Froala Editor
 * within a form and automatically have its name and value included in a form submit.
 */
Ext.define('Ext.froala.EditorField', {
    extend: 'Ext.field.Container',
    xtype: 'froalaeditorfield',
    requires: ['Ext.layout.Fit'],
    mixins: {
        froalaeditor: 'Ext.froala.Mixin'
    },

    isField: true, // Overrides the property in Ext.field.Container

    twoWayBindable: ['value'],
    defaultBindProperty: 'value',

    /**
     * @event change
     * Fired when the html content changes
     * @param {Ext.froala.EditorField} this This component.
     * @param {String} the html content.
     */

    /**
     * @event ready
     * Fired after the FroalaEditor instance is initialized.
     * @param {Ext.froala.EditorField} this This component.
     * @param {Object} the FroalaEditor instance.
     */

    layout: 'fit',
    items: [
        {
            xtype: 'component',
            itemId: 'froalaComponent',
            cls: Ext.baseCSSPrefix + 'froala'
        }
    ],

    getFroalaEditorDomElement: function() {
        return this.down('#froalaComponent').element.dom;
    },

    doDestroy: function() {
        var me = this;

        me.setEditor(null);
        me.callParent();
    },

    updateValue: function(value) {
        this.mixins.froalaeditor.updateValue.call(this, value);
    },

    updateDisabled: function(disabled) {
        this.mixins.froalaeditor.updateDisabled.call(this, disabled);
    },

    privates: {
        // Overrides a private method in Ext.mixin.Observable
        doAddListener: function(ename) {
            var me = this,
                result;

            // It's safer to use arguments here, since there are so
            // many ways listener parameters are used.
            result = me.callParent(arguments);

            this.mixins.froalaeditor.handleAddListener.call(this, ename);

            return result;
        },

        // Overrides a private method in Ext.mixin.Observable
        doRemoveListener: function(ename) {
            var me = this,
                result;

            // It's safer to use arguments here, since there are so
            // many ways listener parameters are used.
            result = me.callParent(arguments);

            this.mixins.froalaeditor.handleRemoveListener.call(this, ename);

            return result;
        }
    }
});
