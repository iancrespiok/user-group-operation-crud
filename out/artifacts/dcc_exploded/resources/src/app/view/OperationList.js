Ext.define('Users.view.OperationList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.operationList',
    title: 'Operations',
    store: 'Operations',

    columns: [
        {header: 'Id', dataIndex: 'id', flex: 1},
        {header: 'Name', dataIndex: 'name', flex: 1},
        {header: 'Description', dataIndex: 'description', flex: 1},
        {header: 'Type', dataIndex: 'type', flex: 1},
    ]
});