/**
 * Private class used by {@link Ext.froala.Editor} andd {@link Ext.froala.EditorField}.
 * If you use this mixin, your class must override component methods handed here:
 * - doAddListener -> handleAddListener
 * - doRemoveListener -> handleRemoveListener
 * - updateValue
 * See source for Ext.froala.Editor or EditorField for examples.
 */
Ext.define('Ext.froala.Mixin', {
    extend: 'Ext.Mixin',

    twoWayBindable: ['value'],
    defaultBindProperty: 'value',

    config: {
        /**
         * @cfg {String} activationKey The Froala activation key. If specified, this
         * take precedence over the activation key configured in your application's
         * `app.json`.
         */
        activationKey: undefined,

        /**
         * @cfg {Object} defaultEditor The default Froala editor configs passed to the Froala
         * constructor. This value is merged with the {@link #editor} config you specify. This can
         * only be specified at time of creation and cannot be set later.
         */
        defaultEditor: {
            iconsTemplate: 'font_awesome_5'
        },

        /**
         * @cfg {String} value
         * The text content of the editor.
         */
        value: '',

        /**
         * A Froala config object as documented at
         * https://www.froala.com/wysiwyg-editor/docs/options
         * This config is set once, upon creation of the FroalaEditor and cannot be updated later.
         * The most commonly provided value is `toolbarButtons`, which defaults to
         * editor: {
         *    toolbarButtons: {
         *     'moreText': {
         *     'buttons': ['bold', 'italic', 'underline', 'strikeThrough',
         *       'subscript', 'superscript', 'fontFamily',
         *       'fontSize', 'textColor', 'backgroundColor', 'inlineClass',
         *       'inlineStyle', 'clearFormatting'
         *      ]
         *     },
         *     'moreParagraph': {
         *       'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight',
         *           'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle',
         *           'lineHeight', 'outdent', 'indent', 'quote'
         *        ]
         *     },
         *   'moreRich': {
         *     'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable',
         *       'emoticons', 'fontAwesome', 'specialCharacters', 'embedly',
         *       'insertFile', 'insertHR'
         *      ]
         *   },
         *   'moreMisc': {
         *     'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker',
         *       'selectAll', 'html', 'help'
         *      ],
         *     'align': 'right',
         *     'buttonsVisible': 2
         *   }
         * }
         * }
         */
        editor: {}
    },

    /**
     * @property {Boolean} isFroalaEditor
     * Identifies this class and its subclasses.
     * @readonly
     */
    isFroalaEditor: true,

    /**
     * @property {Boolean} isReady
     * Flags whether the Froala editor instance has been initialized. Initialization
     * happens automatically when the component is created, but takes several milliseconds.
     * Upon initialization, the {@link #event-ready} event is fired.
     * @readonly
     */
    isReady: false,

    applyEditor: function(config) {
        var me = this,
            froalaEditor;

        if (config === null) {
            froalaEditor = me.getEditor();
            froalaEditor.destroy();
            // Froala leaves the innerHTML set to the html value. Since
            // we're being destroyed, clean that up too.
            me.getFroalaEditorDomElement().innerHTML = '';

            return null;
        }

        return me.createFroalaEditor(config);
    },

    createFroalaEditor: function(config) {
        var me = this,
            defaultConfig = me.getDefaultEditor(),
            options,
            froalaEditor,
            key = Ext.manifest.froala,
            froalaEditorDomElement = me.getFroalaEditorDomElement(),
            bufferedChangedEvent = Ext.Function.createBuffered(me.onFroalaContentChanged, 50, me);

        // bufferedChangedEvent avoids running the change event more often than necessary.

        options = Ext.merge(config, defaultConfig);

        key = me.getActivationKey() || (key && key['activation-key']);

        if (key) {
            options.key = key;
        }

        froalaEditor = new FroalaEditor(froalaEditorDomElement, options, function() {
            froalaEditor.component = me;
            me.monitorConfiguredListeners();
            froalaEditor.isReady = true;
            me.fireEvent('ready', me, froalaEditor);
            froalaEditor.events.on('contentChanged', bufferedChangedEvent);
            froalaEditor.html.set(me.getValue());
        });
        froalaEditor.isReady = false;

        return froalaEditor;
    },

    onFroalaContentChanged: function() {
        this.setValue(this.getEditor().html.get());
    },

    updateValue: function(value) {
        var me = this,
            editor = this.getEditor(),
            editorValue;

        if (editor && editor.isReady) {
            editorValue = editor.html.get();
            me.fireEvent('change', me, value);
            // The value won't change if it came from
            // onFroalaContentChanged. Otherwise, someone
            // ran setValue() on the component and the
            // editor's html has to reflect that.

            if (value !== editorValue) {
                editor.html.set(value);
            }
        }
    },

    updateDisabled: function(disabled) {
        var editor = this.getEditor();

        this.callParent([disabled]);

        if (editor) {
            editor.edit[disabled ? 'off' : 'on']();
        }
    },

    privates: {
        /**
         * Monitor user-configured listeners. These are events specified in the
         * listeners:{} block. Events added dynamically are handled in doAddListener().
         */
        monitorConfiguredListeners: function(froalaEditor) {
            var me = this,
                eventNames = Object.keys(me.hasListeners);

            eventNames.forEach(function(event) {
                me.setupListener(event);
            });
        },

        froalaNamePrefixRe: /froala\./,

        /**
         * @param {String} event - The event name being checked.
         * @returns {Boolean} true if the event is a Froala event.
         */
        isFroalaEvent: function(event) {
            return !!event.match(this.froalaNamePrefixRe);
        },

        translateFroalaEventName: function(event) {
            return event.replace(this.froalaNamePrefixRe, '');
        },

        setupListener: function(event) {
            var me = this,
                froalaEditor = me.getEditor(),
                translatedFroalaEventName,
                froalaEventsBeingMonitored;

            // If we get here, an event has already been added to this Observable.
            // Who fires the event? If it's a froala event, we need to add a listener
            // to the Froala instance, which in turn will call our listener which
            // runs fireEventArgs() on this component. If it's not a Froala event,
            // just ignore it and the event will get fired in the normal way. If it's
            // a component event, like "hide", the compoenent will fire it.

            // We ignore anything that's not a Froala event. For those, just exit and
            // the event will be handled as a normal component event.

            if (!me.isFroalaEvent(event)) {
                return;
            }

            // Add the event to Froala, passing an event handler. The handler
            // simply fires the event via Observable. That means we only need
            // to setup the Froala event once. The flow is: Froala detects the
            // event, Froala calls the one event handler which then fires the
            // event, and Observable takes care of informing all listeners.

            froalaEventsBeingMonitored = me.getFroalaEventsBeingMonitored();

            if (!froalaEventsBeingMonitored[event]) {
                translatedFroalaEventName = me.translateFroalaEventName(event);
                froalaEditor.events.on(translatedFroalaEventName, createHandler(event, me));
                froalaEventsBeingMonitored[event] = true;
            }

            function createHandler(name) {
                // Return the froala event handler. The event handler simply
                // fires the component event via fireEventArgs(), using the
                // name in closure scope. This component is passed as the
                // first argument, followed by the Froala arguments.
                return function() {
                    var args = Array.prototype.slice.call(arguments);

                    args.unshift(me);
                    me.fireEventArgs(name, args);
                };
            }
        },

        handleAddListener: function(ename) {
            var me = this,
                froalaEditor = me.getEditor();

            if (froalaEditor && froalaEditor.isReady) {
                me.setupListener(ename);
            }
        },

        handleRemoveListener: function(ename) {
            var me = this,
                froalaEditor = me.getEditor();

            if (!(froalaEditor && froalaEditor.isReady)) {
                return;
            }

            // If this is an event we're monitoring on the Froala instance,
            // but there are no longer any listeners, then tell Froala to stop
            // monitored.
            if (me.isFroalaEvent(ename)) {
                if (!me.hasListeners[ename]) {
                    // TODO: A future release of Froala will have an "off()" event,
                    // used to remove an event listener. When that's addded, use
                    // this code to clean up listeners. This is un-tested code.

                    // froalaEditor.events.off(ename);
                    delete me.getFroalaEventsBeingMonitored()[ename];
                }
            }
        },

        getFroalaEventsBeingMonitored: function() {
            return (this.froalaEventsBeingMonitored = this.froalaEventsBeingMonitored || {});
        }
    },

    getFroalaEditorDomElement: function() {
        Ext.raise('getFroalaEditorDomElement must be overridden in the class using froala/Mixins');
    }
});
