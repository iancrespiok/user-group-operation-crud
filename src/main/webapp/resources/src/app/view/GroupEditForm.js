Ext.define('Users.view.GroupEditForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.groupeditform',
	id: 'groupEditForm',
	title: 'Edit group',
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
		},	{
			name: 'name',
			fieldLabel: 'Name'
		}, {
			name: 'description',
			fieldLabel: 'Description'
		}]
	}],
	buttons: [{
		text: 'OK',
		action: 'add',
		id: 'button1',
		handler: function (button) {
			console.log('editGroup');
			var win = button.up('window');
			var values = win.down('form').getValues();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/groups',
				method: 'POST',
				jsonData: values,
				success: function(response) {
					var store = Ext.getStore('Groups');
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