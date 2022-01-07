Ext.define('Users.store.Groups', {
    extend  : 'Ext.data.Store',
    model   : 'Users.model.Group',
    alias   : 'widget.Groups',
    storeId : 'Groups',

    proxy	: {
        type	: 'ajax',
        url		: '/SpringMVCHibernateCRUDExample_war_exploded/groups',
        reader	: {
            type	: 'json',
            root	: 'groups'
        }
    },
    autoLoad: true,
    autoSync: true
  });