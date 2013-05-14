ProductMenu.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('productmenu')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,activeItem: 0
            ,hideMode: 'offsets'
            ,items: [{
                title: _('productmenu.dashes')
                ,items: [{
                    html: '<p>'+_('productmenu.intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'productmenu-grid-dashes'
                    ,preventRender: true
                    ,cls: 'main-wrapper'
                }]
            },{
                title: _('productmenu.categories')
                ,items: [{
                    html: '<p>'+_('productmenu.categories.intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'productmenu-grid-categories'
                    ,preventRender: true
                    ,cls: 'main-wrapper'
                }]
            }]
        }]
    });
    ProductMenu.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu.panel.Home,MODx.Panel);
Ext.reg('productmenu-panel-home',ProductMenu.panel.Home);