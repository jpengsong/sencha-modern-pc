/**
 * 重写列表在有分页情况下，在全选后不能取消全选
 */
Ext.define("override.selection.Rows", {
    override: "Ext.dataview.selection.Rows",
    privates: {
        isAllSelected: function () {
            if (this.allSelected == undefined) {
                this.allSelected = true;
                return false;
            }
            this.allSelected = !this.allSelected;
            return !this.allSelected;
        }
    }
})
