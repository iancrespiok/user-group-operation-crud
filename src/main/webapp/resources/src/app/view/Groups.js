Ext.define('Users.view.Groups',{
    extend: 'Ext.container.Container',
    alias: 'widget.groups',
    layout: {
        type:'border'
    },
    height: 500,
    items: [{
        xtype: 'toolbar',
        region: 'north',
        items: [{
            xtype: 'button',
            text: 'Add',
            action: 'add',
            icon: 'resources/src/image/book_add.png'
        },{
            xtype: 'button',
            text: 'Delete',
            action: 'delete',
            icon: 'resources/src/image/book_delete.png'
        },{
            xtype: 'button',
            text: 'Edit',
            action: 'edit',
            icon: 'resources/src/image/book_edit.png'
        },{
            xtype: 'button',
            text: 'Generate a report',
            action: 'report',
            icon: 'resources/src/image/report.png'
        },{
            xtype: 'button',
            text: 'Users',
            action: 'getUsers'
        },{
            xtype: 'button',
            text: 'Operations',
            action: 'getOperations'
        }]
    },
        {
            region: 'center',
            xtype: 'groupList'
        }
        ]
})