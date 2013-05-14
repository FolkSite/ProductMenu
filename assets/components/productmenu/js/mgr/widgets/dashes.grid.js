
ProductMenu.grid.Dashes = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'productmenu-grid-dashes'
        ,url: ProductMenu.config.connectorUrl
        ,baseParams: {
            action: 'mgr/dash/getlist'
        }
        ,save_action: 'mgr/dash/updatefromgrid'
        ,autosave: true
        ,fields: ['id','name','description', 'category', 'category_text', 'price', 'sale_price', 'dimensions', 'requirements', 'feature', 'image', 'position']
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,grouping: true
        ,groupBy: 'category_text'
        ,singleText: _('productmenu.dash')
        ,pluralText: _('productmenu.dashes')
        ,enableDragDrop: true
        ,preventRender: true
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 70
        },{
            header: _('productmenu.name')
            ,dataIndex: 'name'
            ,width: 200
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.description')
            ,dataIndex: 'description'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.category')
            ,dataIndex: 'category_text'
            ,hidden: true
        },{
            header: _('productmenu.price')
            ,dataIndex: 'price'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.sale_price')
            ,dataIndex: 'sale_price'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.dimensions')
            ,dataIndex: 'dimensions'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.requirements')
            ,dataIndex: 'requirements'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
        },{
            header: _('productmenu.feature')
            ,dataIndex: 'feature'
            ,width: 250
            ,editor: { xtype: 'modx-combo-boolean'  }
            ,renderer: this.rendYesNo
            ,sortable: true
        },{
            header: _('productmenu.position')
            ,dataIndex: 'position'
            ,width: 250
            ,editor: { xtype: 'textfield' }
            ,sortable: true
            ,hidden: true
        }]
        ,tbar: [{
            text: _('productmenu.create_dash')
            ,handler: this.createDash
            ,scope: this
        },'->',{
            xtype: 'productmenu-extra-combo-categories'
            ,id: 'productmenu-category-filter'
            ,emptyText: _('productmenu.select_category')
            ,listeners: {
                'select': {fn:this.filterCategory,scope:this}
            }
        },{
            xtype: 'textfield'
            ,id: 'productmenu-search-filter'
            ,emptyText: _('productmenu.search') + '...'
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            text: _('productmenu.clear_filter')
            ,handler: this.clearFilter
            ,scope: this
        }]
        ,listeners: {
            'render': function(g) {
                new Ext.dd.DropTarget(g.getEl(), {
                    ddGroup: g.ddGroup || 'GridDD'
                    ,grid: g
                    ,gridDropTarget: this

                    ,notifyOver: function(dd, e, data) {
                        var t = Ext.lib.Event.getTarget(e);
                        var dropIndex = this.grid.getView().findRowIndex(t);
                        var dropElement = this.grid.store.data.items[dropIndex].data;
                        var dragElement = this.grid.store.data.items[data.rowIndex].data;

                        var sameElement = false;
                        if (dropIndex == data.rowIndex) sameElement = true;

                        return ((dropElement.category == dragElement.category) && (sameElement == false)) ? this.dropAllowed : this.dropNotAllowed;
                    }

                    ,notifyDrop: function(dd, e, data){
                        // determine the row
                        var t = Ext.lib.Event.getTarget(e);
                        var dropIndex = this.grid.getView().findRowIndex(t);
                        var dropElement = this.grid.store.data.items[dropIndex].data;
                        var dragElement = this.grid.store.data.items[data.rowIndex].data;

                        var sameElement = false;
                        if (dropIndex == data.rowIndex) sameElement = true;

                        if(!((dropElement.category == dragElement.category) && (sameElement == false))){
                            return false
                        }

                        // fire the before move event
//                        if (this.gridDropTarget.fireEvent('beforerowmove', this.gridDropTarget, dragElement.position, dropElement.position, data.selections) === false) return false;

                        // update the store
                        var ds = this.grid.getStore();
                        for(var i = 0; i < data.selections.length; i++) {
                            ds.remove(ds.getById(data.selections[i].id));
                        }

                        ds.insert(dropIndex,data.selections);

                        // re-select the row(s)
                        var sm = this.grid.getSelectionModel();
                        if (sm) sm.selectRecords(data.selections);

                        // fire the after move event
//                        this.gridDropTarget.fireEvent('afterrowmove', this.gridDropTarget, data.rowIndex, dropIndex, data.selections);
                        this.afterrowmove(this.gridDropTarget, data.rowIndex, dropIndex, data.selections);

                        return true;
                    }

                    ,afterrowmove: function(objThis, oldIndex, newIndex, records) {
                        var rec = records.pop().data;
                        MODx.Ajax.request({
                            url: ProductMenu.config.connectorUrl
                            ,params: {
                                action: 'mgr/dash/reorder'
                                ,idItem: rec.id
                                ,category: rec.category
                                ,oldIndex: oldIndex
                                ,newIndex: newIndex
                            }
                            ,listeners: {
//                                'success': {fn:function() { this.grid.refresh(); },scope:this}
                            }
                        });
                    }

                });

            }

        }
    });

    ProductMenu.grid.Dashes.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu.grid.Dashes,MODx.grid.Grid,{
    windows: {}

    ,getMenu: function() {
        var m = [];
        m.push({
            text: _('productmenu.update_dash')
            ,handler: this.updateDash
        });
        m.push('-');
        m.push({
            text: _('productmenu.remove_dash')
            ,handler: this.removeDash
        });
        this.addContextMenuItem(m);
    }
    
    ,createDash: function(btn,e) {
        this.createUpdateDash(btn, e, false);
    }

    ,updateDash: function(btn,e) {
        this.createUpdateDash(btn, e, true);
    }

    ,createUpdateDash: function(btn,e,isUpdate) {
        var r;

        if(isUpdate){
            if (!this.menu.record || !this.menu.record.id) return false;
            r = this.menu.record;
        }else{
            r = {};
        }

        this.windows.createUpdateDash = MODx.load({
            xtype: 'productmenu-window-dash-create-update'
            ,isUpdate: isUpdate
            ,title: (isUpdate) ?  _('productmenu.update_dash') : _('productmenu.create_dash')
            ,record: r
            ,listeners: {
                'success': {fn:function() { this.refresh(); },scope:this}
            }
        });

        this.windows.createUpdateDash.fp.getForm().reset();
        this.windows.createUpdateDash.fp.getForm().setValues(r);
        this.windows.createUpdateDash.show(e.target);
    }
    
    ,removeDash: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('productmenu.remove_dash')
            ,text: _('productmenu.remove_dash_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/dash/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }

    ,search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    }
    ,filterCategory: function(cb,rec,ri){
        var s = this.getStore();
        s.baseParams.filterCategory = rec.id;
        this.getBottomToolbar().changePage(1);
    }

    
    ,clearFilter: function(){
        Ext.getCmp('productmenu-category-filter').reset();
        Ext.getCmp('productmenu-search-filter').reset();
        this.getStore().setBaseParam('filterCategory',null);
        this.getStore().setBaseParam('query',null);
        this.getBottomToolbar().changePage(1);
    }

});
Ext.reg('productmenu-grid-dashes',ProductMenu.grid.Dashes);

ProductMenu.window.CreateUpdateItem = function(config) {
    config = config || {};
    this.ident = config.ident || 'productmenu-window-dash-create-update';
    Ext.applyIf(config,{
        id: this.ident
        ,height: 150
        ,width: 600
        ,closeAction: 'close'
        ,url: ProductMenu.config.connectorUrl
        ,action: (config.isUpdate)? 'mgr/dash/update' : 'mgr/dash/create'
        ,fields: [{
            layout: 'column',
            cls: 'main-wrapper',
            defaults: {
                border: false
            },
            items: this.itemsPanel(config)
        }]
    });
    ProductMenu.window.CreateUpdateItem.superclass.constructor.call(this,config);
};
Ext.extend(ProductMenu.window.CreateUpdateItem,MODx.Window, {
    itemsPanel: function(config) {
        var items = [];

        items.push({
            columnWidth: 0.50
            ,layout: 'form'
            ,defaults: {
                width: '100%'
                ,msgTarget: 'under'
                ,labelSeparator: ''
            }
            ,items: this.itemsColumnLeft(config)
        },{
            columnWidth: 0.50
            ,layout: 'form'
            ,cls: 'no-right-margin'
            ,defaults: {
                width: '100%'
                ,msgTarget: 'under'
                ,labelSeparator: ''
            }
            ,items: this.itemsColumnRight(config)
        });

        return items;
    }

    ,itemsColumnLeft: function(config) {
        var items = [];

        items.push({
            name: 'id'
            ,xtype: 'hidden'
            ,id: this.ident+'-id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.name')
            ,name: 'name'
            ,id: this.ident+'-name'
            ,anchor: '100%'
            ,itemCls: 'required'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('productmenu.description')
            ,name: 'description'
            ,id: this.ident+'-description'
            ,anchor: '100%'
        },{
            xtype: 'productmenu-extra-combo-categories'
            ,fieldLabel: _('productmenu.category')
            ,name: 'category'
            ,id: this.ident+'-category'
            ,anchor: '100%'
            ,itemCls: 'required'
        });

        return items;
    }

    ,itemsColumnRight: function(config) {
        var items = [];

        items.push({
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.price')
            ,name: 'price'
            ,id: this.ident+'-price'
            ,anchor: '100%'
            ,itemCls: 'required'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.sale_price')
            ,name: 'sale_price'
            ,id: this.ident+'-sale_price'
            ,anchor: '100%'
            ,itemCls: 'required'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.dimensions')
            ,name: 'dimensions'
            ,id: this.ident+'-dimensions'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.requirements')
            ,name: 'requirements'
            ,id: this.ident+'-requirements'
            ,anchor: '100%'
        },{
            xtype: 'xcheckbox'
            ,fieldLabel: _('productmenu.feature')
            ,name: 'feature'
            ,id: this.ident+'-feature'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('productmenu.image')
            ,name: 'image'
            ,id: this.ident+'-image'
            ,anchor: '100%'
        });


        return items;
    }
});
Ext.reg('productmenu-window-dash-create-update',ProductMenu.window.CreateUpdateItem);

