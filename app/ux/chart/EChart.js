/**
 * 百度图表Echart使用例子如下
 * @param {Object} echart.setOption(option)
 * {
 *   xtype: "echart",
 *   title: "访问量",
 *   reference: "echart",
 *   height: 400
 * },
*/
Ext.define("App.ux.chart.EChart", {
    xtype: "echart",
    extend: "Ext.Panel",
    config: {
        echart: null,
        option: null
    },

    setOption: function (option) {
        var me = this;
        me._option = option;
        me.getEchart().setOption(option);
    },

    refreshTheme: function () {
        var me = this;
        me.getEchart().dispose(); me.setEchart(null);
        me.setEchart(echarts.init(el, App.UserInfo.DarkMode ? "dark" : "customed"));
        me.getEchart().setOption(me.getOption());
    },

    onPainted: function () {
        var me = this;
        el = me.element.selectNode("div.x-panel-body-el");
        el.style.width = "100%";
        el.style.height = "100%";
        echart = echarts.init(el, App.UserInfo.DarkMode ? "dark" : "customed");
        me.setEchart(echart);
    },

    onResize: function () {
        setTimeout(() => {
            var me = this;
            if (me.getEchart() != null) {
                me.getEchart().resize();
            }
        });
    },

    listeners: {
        resize: function () {
            this.onResize();
        },
        painted: function () {
            this.onPainted();
        }
    }
})