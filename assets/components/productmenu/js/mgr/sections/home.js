Ext.onReady(function() {
    MODx.load({ xtype: 'productmenu-page-home'});
});

ProductMenu.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'productmenu-panel-home'
            ,renderTo: 'productmenu-panel-home-div'
        }]
    });
    ProductMenu.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu.page.Home,MODx.Component);
Ext.reg('productmenu-page-home',ProductMenu.page.Home);