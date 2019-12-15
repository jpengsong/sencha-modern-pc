/**
 * 返回前台模拟数据
*  var responseData = {
*        Data: {},
*        Success: true,
*        Message: "",
*        Code: "Public.I_0001"
*   }
*/
Ext.define("override.simlet.JsonSimlet", {
    override: "Ext.ux.ajax.JsonSimlet",
    doGet: function (ctx) {
        var me = this;
        response = me.getData(ctx);
        ret = {responseText:"",status:200,statusText:"OK"};
        responseData = {
            Data: {},
            Success: true,
            Message: "",
            Code: "Public.I_0001"
        }

        if (!Ext.isEmpty(response)) {
            if (Ext.typeOf(response) === "object" || Ext.typeOf(response) === "array") {
                responseData.Data = Ext.encode(response);
            } else {
                responseData.Data = response;
            }
        }
        ret.responseText = Ext.encode(responseData);
        return ret;
    },

    doPost: function (ctx) {
        var me = this;
        return me.doGet(ctx);
    }
})