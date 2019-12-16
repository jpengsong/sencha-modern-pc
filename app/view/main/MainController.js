Ext.define("App.view.main.MainController", {
    extend: 'App.ux.app.ViewController',
    alias: 'controller.main',
    lastView: null,

    routes: {

        //跳转视图
        'view.:node': {
            before: "onBeforeUser",
            action: "onRouteChange"
        },

        //页签页面
        'tab.:node': {
            before: "onBeforeUser",
            action: "onRouteTabChange"
        },

        //登录成功跳转
        'user.:node': {
            before: "onBeforeLoginUser",
            action: "onRouteUserChange"
        }
    },

    //用户登录检测
    onBeforeLoginUser: function (id, action) {
        if (!Ext.isEmpty(App.UserInfo.Token)) {
            action.resume();
        } else {
            action.stop();
            this.redirectTo('view.login', true);
        }
    },

    //登录检测
    onBeforeUser: function (id, action) {
        var me = this;
        //未登陆并且不是登录页
        if (Ext.isEmpty(App.UserInfo.Token) && id != "login") {
            action.stop();
            me.redirectTo('view.login', true);
        } else {
            action.resume();
        }
    },

    //view.:node路由触发
    onRouteChange: function (id) {
        var me = this;
        me.setCurrentView("mainCardPanel", id);
    },

    //tab.:node路由触发
    onRouteTabChange: function (id) {
        var me; me = this;
        me.setCurrentView("mainTabPanel", id);
    },

    //user.:node 登录成功后触发
    onRouteUserChange: function (id) {
        var me = this, vm = me.getViewModel(), refs = me.getReferences();
        if (!Ext.isEmpty(App.UserInfo.Token)) {
            var store = vm.getStore("navigationtree");
            App.Page.setExtraParamData(store, {});
            if (!store.getAutoLoad()) {
                store.setAutoLoad(true);
            }
            me.destroyLoader();
            refs.setting.getMenu().query("combobox[reference='menulocation']")[0].setValue(App.UserInfo.MenuLocation);
            refs.setting.getMenu().query("togglefield[reference='darkMode']")[0].setValue(App.UserInfo.DarkMode);
            refs.setting.getMenu().query("radiogroup[reference='theme']")[0].setValue(App.UserInfo.Theme);
            me.redirectTo("view.main", true);
        } else {
            me.redirectTo("view.login");
        }
    },

    //渲染视图
    setCurrentView: function (maincard, hashTag) {
        var me, vm; me = this; vm = me.getViewModel(), refs = me.getReferences();
        //散列值转小写
        hashTag = (hashTag || '').toLowerCase();
        //获取容器
        var mainCard = Ext.getCmp(maincard);
        //获取Treelist
        var treeStore = vm.getStore("navigationtree");
        //从菜单查找routeId
        var node = treeStore == null ? treeStore : treeStore.findNode('ViewType', hashTag);
        //如果菜单和白名单没有找到，返回404
        var view = node || vm.getStore("plist").find("ViewType", hashTag, 0, false, true, true) > -1 ? hashTag : null || 'page404';
        //当前视图
        var lastView = me.lastView;
        //查找项
        var existingItem = mainCard.child('component[routeId=' + hashTag + ']');

        //新视图
        var newView;

        //当前视图隐藏事件
        if (lastView) {
            lastView.fireEvent("viewHide", lastView);
        }

        //判断如果是Window窗口 销毁
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        //容器不存在显示视图项 创建
        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                closable: true,
                routeId: hashTag
            });

            if (maincard == "mainTabPanel" && !Ext.isEmpty(node)) {

                newView.setIconCls(node.get("IconCls"));
                newView.setTitle(node.get("MenuName"));
                newView.setIconAlign("left");
            }
        }

        //新视图在主容器不存在或者非窗口
        if (!newView || !newView.isWindow) {
            if (existingItem) {
                lastView = mainCard.getActiveItem();
                if (existingItem !== lastView) {
                    mainCard.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                mainCard.setActiveItem(mainCard.add(newView));
            }
        }

        //新视图显示事件
        if (newView) {
            newView.fireEvent("viewShow", newView);
        }

        //将当前视图保存到lastView中
        me.lastView = newView;

        //导航菜单选中对应的节点
        try {
            if (node && refs.navigationTreeList) {
                refs.navigationTreeList.setSelection(node);
            } else {
                refs.navigationTreeList.setSelection(false);
            }
        } catch (error) {

        }
    },

    //初始化主页
    onMainViewRender: function () {
        var me = this, hash = window.location.hash.replace('#', '');
        if (Ext.isEmpty(App.UserInfo.Token) && hash != 'view.login') {
            me.redirectTo('view.login', true);
        } else if (!Ext.isEmpty(App.UserInfo.Token)) {
            me.redirectTo('user.login', true);
        }
    },

    //点击菜单项
    onSelectionchange: function (obj, record, eOpts) {
        var me = this, data = record.getData();
        if (!Ext.isEmpty(data.ViewType) && !Ext.isEmpty(data.PageType)) {
            me.redirectTo(data.PageType + "." + data.ViewType);
        }
    },

    //更改菜单位置
    onMenuLocationSelect: function (obj, newValue, eOpts) {
        var me = this, refs = me.getReferences(),viewModel=me.getViewModel(), value = refs.menulocation.getValue();
        App.UserInfo.MenuLocation = value;
        refs.navigationTreeList.setHidden(value == "left" ? false : true);
        refs.navigationMenuList.setHidden(value == "top" ? false : true);
        refs.micro.setHidden(value == "left" ? false : true);
        viewModel.set("mainToolbar_UI",value == "left" ? "default" :"main-toolbar-dark");
        viewModel.set("mainToolbarButton_UI",value == "left" ? "main-toolbar-button-default" :"main-toolbar-button-dark");
    },

    //主题配色
    onThemeChange: function () {
        var me = this, refs = me.getReferences();
        App.UserInfo.Theme = refs.theme.getValue();
        Ext.theme.Material.setColors({
            'darkMode': refs.darkMode.getValue(),
            'base': refs.theme.getValue()
        });
    },

    //暗黑色
    onDarkModeChange: function () {
        var me = this, refs = me.getReferences();
        App.UserInfo.DarkMode = refs.darkMode.getValue();
        Ext.theme.Material.setColors({
            'darkMode': refs.darkMode.getValue(),
            'base': refs.theme.getValue()
        });
        me.darkComponentChange();
    },

    //页签切换
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this, hash = window.location.hash.replace('#', '');
        if (hash != "tab." + newCard.xtype) {
            me.redirectTo('tab.' + newCard.xtype);
            var all = Ext.ComponentManager.getAll();
            for (var i = 0; i < all.length; i++) {
                if (all[i].xtype == "echart") {
                    all[i].onResize();
                }
            }
        }
    },

    //菜单折叠
    onMicro: function () {
        var me = this, refs = me.getReferences(), vm = me.getViewModel(), isMicro = refs.navigationTreeList.getMicro();
        if (!isMicro) {
            refs.logo.setWidth(60);
            refs.logo.addCls("ext-sencha");
            refs.logo.setHtml("");
            refs.navigationTreeList.setWidth(60);
            refs.navigationTreeList.setMicro(true);
        } else {
            refs.logo.setWidth(250);
            refs.logo.removeCls("ext-sencha");
            refs.logo.setHtml("sencha");
            refs.navigationTreeList.setWidth(250);
            refs.navigationTreeList.setMicro(false);
        }
    },

    //锁定
    onLock: function () {
        var me = this;
        me.redirectTo('view.lockscreen');
    },

    //退出登录
    onLogout: function () {
        var me = this;
        App.UserInfo.Token = null;
        App.Cookie.DeleteCookie("TokenGuid");
        me.redirectTo('view.login', true);
    },

    //开启全屏
    onFullScreen: function () {
        var element = Ext.getBody().dom;
        if (document.isFullScreen != undefined) {
            if (document.isFullScreen) {
                document.cancelFullScreen();
            } else {
                element.requestFullScreen();
            }
        }
        if (document.mozIsFullScreen != undefined) {
            if (document.mozIsFullScreen) {
                document.mozCancelFullScreen();
            } else {
                element.mozRequestFullScreen();
            }
        }
        if (document.webkitIsFullScreen != undefined) {
            if (document.webkitIsFullScreen) {
                document.webkitCancelFullScreen();
            } else {
                element.webkitRequestFullscreen();
            }
        }
    },

    //修改密码
    onUpdatePassWord: function (obj) {
        Ext.widget({
            xtype: "updatepassword",
            animateTarget: obj
        })
    }
})