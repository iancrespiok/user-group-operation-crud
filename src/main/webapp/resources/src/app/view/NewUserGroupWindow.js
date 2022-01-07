Ext.define('Users.view.NewUserGroupWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.newusergroupwindow',
	id: 'newusergroupwindow',
	width: 350,
	layout: 'fit',
	resizable: false,
	closeAction: 'hide',
	modal: true,
	config: {
		recordIndex: 0,
		action: ''
	},
	items: [{
		xtype: 'form',
		layout: 'anchor',
		bodyStyle: {
			background: 'none',
			padding: '10px',
			border: '0'
		},
		defaults: {
			xtype: 'textfield',
			anchor: '100%'
		},
		items: [{
			xtype: 'combobox',
			store: 'UsersNotOnGroup',
			name: 'defaultGroupId',
			fieldLabel: 'User to add',
			displayField: 'name',
			queryMode: 'local',
			valueField: 'id'
		}]
	}],
	buttons: [{
		text: 'Add user',
		action: 'add',
	}, {
		text: 'Cancelar',
		handler: function() {
			this.up('window').close();
		}
	}]
});