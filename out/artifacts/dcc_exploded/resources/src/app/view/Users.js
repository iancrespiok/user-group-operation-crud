Ext.define('Users.view.Users',{
    extend: 'Ext.container.Container',
    alias: 'widget.users',
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
                }]
        },
        {
            region: 'center',
            xtype: 'userList'
        }]
})