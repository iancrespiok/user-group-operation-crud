Ext.define('Users.view.UserEditForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.usereditform',
	id: 'userEditForm',
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
			//xtype: 'displayfield',
			name: 'id',
			fieldLabel: 'Id',
			hidden: true
		}, {
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
		id: 'button1',
		handler: function (button) {
			console.log('editUser');
			var win = button.up('window');
			var values = win.down('form').getValues();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/users',
				method: 'POST',
				jsonData: values,
				success: function(response) {
					var store = Ext.getStore('Users');
					store.load();
				},
				failure: function(response) {
					Ext.Msg.alert('Status', 'Request Failed.');
				}
			});
			win.close();
		}
	}, {
		text: 'Cancelar',
		handler: function() {
			this.up('window').close();
		}
	}]
});