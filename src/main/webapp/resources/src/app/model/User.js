Ext.define('Users.model.User', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'id', type: 'int'},
      {name: 'name', type: 'string'},
      {name: 'surname',  type: 'string'},
      {name: 'username', type: 'string'},
      {name: 'defaultGroupId',  type: 'int'}
    ]
});