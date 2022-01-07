Ext.define('Users.model.Operation', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'id', type: 'int'},
      {name: 'name', type: 'string'},
      {name: 'description',  type: 'string'},
      {name: 'type', type: 'string'},
    ]
});