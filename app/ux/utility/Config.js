/**
 *
 *  全局配置类
 * 
*/
Ext.define('App.ux.utility.Config', {
    alternateClassName: ['config'],
    statics: {

        //查询条件
        QueryMethod : {
            /**
             * 等于
             * @readonly
             */
            Equal: " = ",
            /**
             * 不等于
             * @readonly
             */
            NotEqual: " != ",
            /**
             * 大于
             * @readonly
             */
            GreaterThan: " > ",
            /**
             * 大于等于
             * @readonly
             */
            GreaterThanOrEqual: " >= ",
            /**
             * 小于
             * @readonly
             */
            LessThan: " < ",
            /**
             * 小于等于
             * @readonly
             */
            LessThanOrEqual: " <= ",
            /**
             * Like
             * @readonly
             */
            Like: " Like ",
            /**
             * Is Null
             * @readonly
             */
            IsNull: " Is Null ",
            /**
             * Is Not Null
             * @readonly
             */
            IsNotNull: " Is Not Null ",
            /**
            * In
            * @readonly
            */
            In: " In "
        },

        //空值
        Guid :{
            /**
             * 提供空Guid字符串
             * @readonly
             */
            Empty: "00000000-0000-0000-0000-000000000000"
        },

        //代理返回数据类型
        DataType:{
            /**
             * GridStore
             * @readonly
             */
            GridStore:"GridStore",
            /**
             * TreeStore
             * @readonly
             */
            TreeStore:"TreeStore",
            /**
             * ComboxStore
             * @readonly
             */
            ComboxStore:"ComboxStore"
        },

        //远程请求数据地址
        Url:"http://localhost:65260",
        //Url:"http://49.232.143.24:8081",
    }
})
