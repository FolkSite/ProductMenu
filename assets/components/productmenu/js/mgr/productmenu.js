var ProductMenu = function(config) {
    config = config || {};
    ProductMenu.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('productmenu',ProductMenu);
ProductMenu = new ProductMenu();