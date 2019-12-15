/**
 * 操作ResponseCode的工具类
 * 本地/远程 返回ResponseData的Code枚举
 *  ResponseData = {
 *     Data:object,
 *     Success:true,
 *     Message:null,
 *     Code:枚举
 *  } 
 */
Ext.define('App.ux.utility.ResponseCode', {
    alternateClassName: ['App.ResponseCode'],

    statics: {

        /**
         * @property {String} 
         * @readonly
         * 表示执行成功
         */
        ExcecuteSuccess: "Public.I_0001",

        /**
         * @property {String} 
         * @readonly
         * 执行错误（公共）
         */
        ExcecuteError: "Public.E_0001",
        
        /**
         * @property {String} 
         * @readonly
         * 用户没有权限执行某功能错误
         */
        UserCanNotDoFunction: "Public.E_0002",

        /**
         * @property {String} 
         * @readonly
         * 请求用户未在系统登陆注册错误
         */
        UserNotLogon: "Public.E_0003",
    }
});