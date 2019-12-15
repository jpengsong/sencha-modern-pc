/**
 * 操作Cookie的工具类。需要处理cookie时，使用此类的SetCookie和GetCookie方法来设置和获取cookie值。
 * 例子如下：
 *       @example
 *       App.Cookie.SetCookie('username', 'abc');//设置cookie
 *       var name = App.Cookie.GetCookie('username');//获取cookie值
 */
Ext.define('App.ux.utility.Cookie', {
    alternateClassName: ['App.Cookie'],

    statics: {
        /**
        * 设置 cookie
        *       
        * @param {String} name Cookie名称
        * @param {String} value Cookie值
        * @static
        */
        SetCookie: function (name, value) {
            document.cookie = name + "=" + escape(value);
        },

        /**
         * 设置 cookie, 默认30天过期时间
         * @param {String} name Cookie名称
         * @param {String} value Cookie值
         * @param {String} expires 单位（秒）
         * @static
         */
        SetExpiresCookie: function (name, value, expires) {
            var Days, exp;
            Days = 30; //cookie 将被保存 30 天
            exp = new Date();
            if (Ext.isEmpty(expires)) {
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60);
            } else {
                exp.setTime(exp.getTime() + expires);
            }
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },

        /**
        * 获取 cookie
        * @param {String} name Cookie名称
        * @return {Object} Cookie值，没有返回null
        * @static
        */
        GetCookie: function (name) {
            var arr;

            arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));

            if (arr !== null) {
                return unescape(arr[2]);
            }
            return null;
        },

        /**
        * 删除 cookie
        * @param {String} name Cookie名称
        * @static
        */
        DeleteCookie: function (name) {
            var me = this, exp, cookieval;

            exp = new Date();

            exp.setTime(exp.getTime() - 1);
            cookieval = me.GetCookie(name);

            if (cookieval !== null) {
                document.cookie = name + "=;  expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        }
    }
});