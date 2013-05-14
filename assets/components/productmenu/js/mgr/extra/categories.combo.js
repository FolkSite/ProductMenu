ProductMenu.combo.Categories = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'productmenu-extra-combo-categories'
        ,name: 'category'
        ,hiddenName: 'category'
        ,url: ProductMenu.config.connectorUrl
        ,baseParams: { action: 'mgr/category/getlist' }
        ,fields: ['id','name']
        ,displayField: 'name'
        ,valueField: 'id'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    ProductMenu.combo.Categories.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu.combo.Categories,MODx.combo.ComboBox);
Ext.reg('productmenu-extra-combo-categories',ProductMenu.combo.Categories);