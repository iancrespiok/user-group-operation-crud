Ext.define('Users.store.OperationTypes', {
    extend  : 'Ext.data.Store',
    alias   : 'widget.OperationTypes',
    storeId : 'OperationTypes',
    fields: ['type'],
    data: [
        {type: 'A'},
        {type: 'B'},
        {type: 'M'}
    ]
  });
