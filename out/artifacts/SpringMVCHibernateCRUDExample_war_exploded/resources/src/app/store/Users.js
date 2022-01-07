Ext.define('Users.store.Users', {
    extend  : 'Ext.data.Store',
    model   : 'Users.model.User',
    alias   : 'widget.Users',
    storeId : 'Users',
    proxy	: {
        type	: 'ajax',
        url		: 'http://localhost:8080/SpringMVCHibernateCRUDExample_war_exploded/users',
        reader	: {
            type	: 'json',
            root	: 'users'
        }
    },
    autoLoad: true,
    autoSync: true
  });