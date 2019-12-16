Ext.define("App.view.main.widget.Home", {
    xtype: "home",
    routeId:"home",
    extend: "Ext.Panel",
    layout: 'auto',
    scrollable: true,
    items: [
        {
            xtype: "container",
            bodyCls: "row",
            defaults:{
                shadow :true
            },
            items: [
                {
                    xtype: "container",
                    height: 147,
                    border:true,
                    cls: 'col-md-5 col-sm-10 col-xs-20',
                    html: '<div class="home-card"><div class="home-card-header">访问量<span class="home-badge home-bg-blue homeadmin-badge">周</span></div><div class="home-card-body homeadmin-card-list"><p class="homeadmin-big-font">9,999,666</p><p>总计访问量<span class="homeadmin-span-color">88万 </span></p></div></div>'
                },
                {
                    xtype: "container",
                    height: 147,
                    cls: 'col-md-5 col-sm-10 col-xs-20',
                    html: '<div class="home-card"><div class="home-card-header">下载<span class="home-badge home-bg-cyan homeadmin-badge">月</span></div><div class="home-card-body homeadmin-card-list"><p class="homeadmin-big-font">33,555</p><p>新下载<span class="homeadmin-span-color">10% </span></p></div></div>'
                },
                {
                    xtype: "container",
                    height: 147,
                    cls: 'col-md-5 col-sm-10 col-xs-20',
                    html: '<div class="home-card"><div class="home-card-header">收入<span class="home-badge home-bg-green homeadmin-badge">年</span></div><div class="home-card-body homeadmin-card-list"><p class="homeadmin-big-font">999,666</p><p>总收入<span class="homeadmin-span-color">*** </span></p></div></div>'
                },
                {
                    xtype: "container",
                    height: 147,
                    cls: 'col-md-5 col-sm-10 col-xs-20',
                    html: '<div class="home-card"><div class="home-card-header">活跃用户<span class="home-badge home-bg-orange homeadmin-badge">月</span></div><div class="home-card-body homeadmin-card-list"><p class="homeadmin-big-font">66,666</p><p>最近一个月<span class="homeadmin-span-color">15% </span></p></div></div>'
                },
                {
                    xtype: "echart",
                    title: "访问量",
                    cls: "col-xs-20",
                    reference: "visitsChart",
                    height: 400
                },
                {
                    xtype: "grid",
                    cls: 'col-sm-10 col-xs-20',
                    title: '本周活跃用户列表',
                    height: 350,
                    bind: {
                        store: "{weekuserstore}"
                    },
                    columns: [
                        {
                            text: '用户名',
                            cell: {
                                encodeHtml: false
                            }, dataIndex: 'name', sortable: false, align: "center", flex: 1,
                            renderer: function (value, row, obj, index) {
                                if (index == 0) {
                                    value = "<span style='color:#FF5722'>" + value + "</span>";
                                } else if (index == 1) {
                                    value = "<span style='color:#FFB800'>" + value + "</span>";
                                } else if (index == 2) {
                                    value = "<span style='color:#5FB878'>" + value + "</span>";
                                }
                                return value;
                            }
                        },
                        {
                            text: '最后登录时间',
                            cell: {
                                encodeHtml: false
                            }, dataIndex: 'time', sortable: false, align: "center", flex: 1,
                            renderer: function (value) {
                                value = "<span class='x-fa fa-clock-o'></span>&nbsp" + value;
                                return value;
                            }

                        },
                        { text: '状态', dataIndex: 'status', sortable: false, align: "center", flex: 1 },
                        {
                            text: '获得赞',
                            cell: {
                                encodeHtml: false
                            }, dataIndex: 'zan', sortable: false, align: "center", flex: 1,
                            renderer: function (value) {
                                value = value + "&nbsp<span class='x-fa fa-thumbs-o-up'></span>";
                                return value;
                            }
                        }
                    ]
                },
                {
                    xtype: "grid",
                    cls: 'col-sm-10 col-xs-20',
                    height: 350,
                    title: '用户全国分布',
                    bind: {
                        store: "{countryspreadstore}"
                    },
                    columns: [
                        { text: '排名', dataIndex: 'sort', width: 80, align: "center", sortable: false },
                        { text: '地区', dataIndex: 'region', flex: 1, align: "center", sortable: false },
                        { text: '人数', dataIndex: 'number', flex: 1, align: "center", sortable: false }
                    ]
                }
            ]
        }
    ],
    listeners: {
        painted: "onPainted"
    },
    viewModel: {
        data: {
            weekuserstore: Ext.create('Ext.data.Store', {
                fields: ['name', 'time', 'status', 'zan'],
                data: [
                    { name: '胡歌', time: '11:20', status: '在线', zan: '20' },
                    { name: '彭于晏', time: '10:40', status: '在线', zan: '21' },
                    { name: '靳东', time: '01:30', status: '离线', zan: '45' },
                    { name: '吴尊', time: '21:40', status: '离线', zan: '30' },
                    { name: '许上进', time: '09:30', status: '在线', zan: '20' },
                    { name: '小蚊子', time: '21:18', status: '在线', zan: '78' }
                ]
            }),
            countryspreadstore: Ext.create('Ext.data.Store', {
                storeId: 'simpsonsStore',
                fields: ['sort', 'region', 'number'],
                data: [
                    { sort: '1', region: '浙江', number: '62310' },
                    { sort: '2', region: '北京', number: '59190' },
                    { sort: '3', region: '上海', number: '55891' },
                    { sort: '4', region: '广东', number: '51919' },
                    { sort: '5', region: '山东', number: '39231' },
                    { sort: '6', region: '湖北', number: '37109' }
                ]
            })
        }
    },
    controller: {

        onPainted: function () {
            var me = this, option, refs = me.getReferences();
            option = {
                color: ['#ffc000', "#6aa5db", "#ee929c"],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量', '下载量', '平均访问量']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: {
                    name: '访问量',
                    type: 'value'
                },
                series: [
                    {
                        name: '访问量',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210, 80, 60, 110, 200, 300]
                    },
                    {
                        name: '下载量',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310, 70, 90, 100, 150, 157]
                    },
                    {
                        name: '平均访问量',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410, 60, 140, 140, 130, 185]
                    }
                ]
            };
            refs.visitsChart.setOption(option);
        }
    }
})