Ext.define('Users.store.Operations', {
    extend  : 'Ext.data.Store',
    model   : 'Users.model.Operation',
    alias   : 'widget.Operations',
    storeId : 'Operations',
    proxy	: {
        type	: 'ajax',
        url		: 'http://localhost:8080/SpringMVCHibernateCRUDExample_war_exploded/operations',
        reader	: {
            type	: 'json',
            root	: 'operations'
        }
    },
    autoLoad: true,
    autoSync: true
  });