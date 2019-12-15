/**
 * 重写遮罩层组件
 */
Ext.define("override.loadmask.LoadMask", {
    override: "Ext.LoadMask",
    getTemplate: function() {
        var prefix = Ext.baseCSSPrefix;
        return [
            {
                reference: 'innerElement',
                cls: prefix + 'mask-inner',
                children: [
                    {
                        reference: 'indicatorElement',
                        cls: prefix + 'loading-spinner-outer'
                    },
                    {
                        reference: 'messageElement'
                    }
                ]
            }
        ];
    }
})