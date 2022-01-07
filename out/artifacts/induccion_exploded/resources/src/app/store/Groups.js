Ext.define('Groups.store.Groups', {
    extend  : 'Ext.data.Store',
    model   : 'Groups.model.Group',
    alias   : 'widget.Groups',
    storeId : 'Groups',

    proxy	: {
        type	: 'ajax',
        url		: '/SpringMVCHibernateCRUDExample_war_exploded/groups',
        reader	: {
            type	: 'json',
            root	: 'users'
        }
    },
    autoLoad: true,
    autoSync: true
  });