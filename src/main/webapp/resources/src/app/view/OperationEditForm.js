Ext.define('Users.view.OperationEditForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.operationeditform',
	id: 'operationEditForm',
	title: 'Edit operation',
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
			name: 'description',
			fieldLabel: 'Description'
		}, {
			xtype: 'combobox',
			store: 'OperationTypes',
			name: 'type',
			fieldLabel: 'Type',
			displayField: 'type',
			valueField: 'type'
		}]
	}],
	buttons: [{
		text: 'OK',
		action: 'add',
		id: 'button1',
		handler: function (button) {
			console.log('editOperation');
			var win = button.up('window');
			var values = win.down('form').getValues();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/operations',
				method: 'POST',
				jsonData: values,
				success: function(response) {
					var store = Ext.getStore('Operations');
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