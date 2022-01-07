Ext.define('Users.view.OperationAddForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.operationaddform',
	title: 'Add an operation',
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
		handler: function (button) {
			console.log('agregar');
			var win = button.up('window'),
				form = win.down('form'),
				values = form.getValues();

			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war/operations',
				method: 'POST',
				jsonData: values,
				success: function(response) {
					var store = Ext.getStore('Operations');
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