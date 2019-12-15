/**
 * Wraps Froala Editor. [Froala Editor](https://www.froala.com/wysiwyg-editor).
 *
 * When the component is created, the Froala editor instance gets initialized, which
 * takes several milliseconds. Use the {@link #ready} event to know when it's
 * ready.
 *
 * To run native Froala methods, access the Froala editor instance via
 * {@link #method-getEditor}. For example,
 * `myFroalaComponent.getEditor().popups.show('froala.hello', 30, 60, 200);`
 *
 * Native Froala events are available by prefixing the event name with "froala.".
 * For example, you can listen to the Froala click event via
 * `myFroalaComponent.on('froala.click', function(){console.log('click');});`
 *
 * ## Example
 *
 *     @example
 *     Ext.define('Example.main.Main', {
 *         extend: 'Ext.Panel',
 *         requires: ['Ext.froala.Editor'],
 *         layout: 'fit',
 *         items: [{
 *             xtype: 'froalaeditor',
 *             value: 'Hello world!',
 *             listeners: {
 *                 change: function (froalaComponent) {
 *                     Ext.toast({
 *                         message: "Change!"
 *                     });
 *                 },
 *                 // Native Froala events are prefixed with 'froala.'
 *                 "froala.click": function (froalaComponent) {
 *                     Ext.toast({
 *                         message: "Click!"
 *                     });
 *                 }
 *             }
 *         }]
 *     });
 *
 *     Ext.application({
 *         name: 'Example',
 *         mainView: 'Example.main.Main'
 *     });
 *
 * If you have a Froala activation key, configure it in your application's `app.json`
 *
 *       {
 *          "name": "MyApp",
 *          "namespace": "MyApp",
 *          "framework": "ext",
 *          "requires": ["font-awesome", "froala-editor"],
 *          "froala" {
 *              "activation-key": "my-activation-key"
 *           }
 *          ...
 *       }
 *
 * For more information about activation keys, please visit [What is an Activation Key?](https://wysiwyg-editor.froala.help/hc/en-us/articles/115000394945-What-is-an-Activation-Key-).
 */
Ext.define('Ext.froala.Editor', {
    extend: 'Ext.Component',
    xtype: 'froalaeditor',
    mixins: {
        froalaeditor: 'Ext.froala.Mixin'
    },

    element: {
        reference: 'element',
        children: [
            {
                reference: 'editorElement',
                classList: [Ext.baseCSSPrefix + 'froala']
            }
        ]
    },

    twoWayBindable: ['value'],
    defaultBindProperty: 'value',

    /**
     * @event change
     * Fired when the html content changes
     * @param {Ext.froala.Editor} this This component.
     * @param {String} the html content.
     */

    /**
     * @event ready
     * Fired after the FroalaEditor instance is initialized.
     * @param {Ext.froala.Editor} this This component.
     * @param {Object} the FroalaEditor instance.
     */

    getFroalaEditorDomElement: function() {
        return this.editorElement.dom;
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

            result = me.callParent(arguments);

            this.mixins.froalaeditor.handleAddListener.call(this, ename);

            return result;
        },

        // Overrides a private method in Ext.mixin.Observable
        doRemoveListener: function(ename) {
            var me = this,
                result;

            result = me.callParent(arguments);

            this.mixins.froalaeditor.handleRemoveListener.call(this, ename);

            return result;
        }
    }
});
