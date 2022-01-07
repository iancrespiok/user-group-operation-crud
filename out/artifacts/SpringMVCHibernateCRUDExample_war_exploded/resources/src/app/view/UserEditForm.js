Ext.define('Users.view.UserEditForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.usereditform',
	title: 'Edit user',
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
			name: 'name',
			fieldLabel: 'Name'
		}, {
			name: 'surname',
			fieldLabel: 'Surname'
		}, {
			name: 'username',
			fieldLabel: 'Username'
		}, {
			xtype: 'combobox',
			store: 'Groups',
			name: 'defaultGroup',
			fieldLabel: 'Default group',
			displayField: 'name',
			valueField: 'id'
		}]
	}],
	buttons: [{
		text: 'OK',
		action: 'edit'
	}, {
		text: 'Cancelar',
		handler: function() {
			this.up('window').close();
		}
	}]
});