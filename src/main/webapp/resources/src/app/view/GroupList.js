Ext.define('Users.view.GroupList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.groupList',
    title: 'Groups',
    store: 'Groups',

    columns: [
        {header: 'Id', dataIndex: 'id', flex: 1},
        {header: 'Name', dataIndex: 'name', flex: 1},
        {header: 'Description', dataIndex: 'description', flex: 1},
    ]
});