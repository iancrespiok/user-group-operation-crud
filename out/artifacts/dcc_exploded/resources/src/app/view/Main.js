Ext.define('Users.view.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.main',
    layout: {
        type: 'border'
    },
    items: [
        {
            region: 'center',
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Users',
                    id: 'usersPanel',
                    items: [{xtype: 'users'}]
                },
                {
                    title: 'Groups',
                    id: 'groupsPanel',
                    items: [{xtype: 'groups'}]
                },
                {
                    title: 'Operations',
                    id: 'operationsPanel',
                    items: [{xtype: 'operations'}]
                }

            ]
        }
    ]
})