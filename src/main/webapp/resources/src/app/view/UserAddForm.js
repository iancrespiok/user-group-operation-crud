Ext.define('Users.view.UserAddForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.useraddform',
	title: 'Add an user',
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
			name: 'defaultGroupId',
			fieldLabel: 'Default group',
			displayField: 'name',
			valueField: 'id'
		}]
	}],
	buttons: [{
		text: 'OK',
		action: 'add',
		handler: function (button) {
			console.log('agregar');
			var win = button.up('window'),
				form = win.down('form'),
				values = form.getValues();

			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war/users',
				method: 'POST',
				jsonData: values,
				success: function(response) {
					var store = Ext.getStore('Users');
					store.load();
				},
				failure: function(response) {
					Ext.Msg.alert('Status', 'Fallo la peticion.');
				}
			});
			win.close();
		}
	}, {
		text: 'Reset',
		handler: function() {
			this.up('window').down('form').getForm().reset();
		}
	}, {
		text: 'Cancelar',
		handler: function() {
			this.up('window').close();
		}
	}]
});