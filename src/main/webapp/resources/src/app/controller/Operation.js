Ext.define('Users.controller.Operation', {
	extend: 'Ext.app.Controller',
	views:  ['Operations','OperationList','OperationAddForm','OperationEditForm'],
	stores: ['Operations', 'OperationTypes'],
	models: ['Operation'],

	init: function() {

		this.control({
			'operations > toolbar > button[action=add]': {
				click: this.showAddForm
			},
			'operations > toolbar > button[action=edit]': {
				click: this.showEditForm
			},
			'operations > toolbar > button[action=delete]': {
				click: this.deleteOperation
			},
			'operations > toolbar > button[action=report]': {
				click: this.showReportForm
			},
			'operationaddform > button[action=add]': {
				click: this.doAddOperation
			},
			'operationeditform > button[action=add]': {
				click: this.editOperation
			}
		});
		 console.log("hola");
	},

	showAddForm: function() {
		console.log("showaddform");
		var win = Ext.widget('operationaddform');
		win.setTitle('Add operation');
		win.setAction('add');
		win.down('form').getForm().reset();
		win.show();
	},

	showEditForm: function(button) {
		console.log('showEditForm')
		var win = Ext.widget('operationeditform');
		var toolbar = button.up('toolbar'),
			operations = toolbar.up('operations'),
			operationList = operations.down('operationList');
			selectionModel = operationList.getSelectionModel(),
			record = selectionModel.getSelection();
		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun usuario para editarlo');
			return;
		} else {
			win.setTitle('Edit operation');
			win.setAction('edit');
			win.down('form').getForm().setValues(record[0].getData());
			win.show();
		}
		selectionModel.deselectAll();
	},

	showReportForm: function(button) {
		var win = Ext.widget('report'),
		text = win.down('textarea');
		var store = Ext.getStore('Operations');
		var numberOfGroupsInStore = store.count();
		text.setValue('La base de datos tiene ' + numberOfGroupsInStore + " grupos.");
		win.show();
	},

	doAddOperation: function(button) {
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
	},

	deleteOperation: function(button) {
		console.log('deleting');
		var toolbar = button.up('toolbar'),
			operations = toolbar.up('operations'),
			operationslist = operations.down('operationList'),
			selectionModel = operationslist.getSelectionModel(),
			record = selectionModel.getSelection();

		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun operacion para borrarlo');
			return;
		} else {
			var groupToDelete = record[0].getData();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/operations',
				method: 'DELETE',
				jsonData: groupToDelete,
				success: function(response) {
					var store = Ext.getStore('Operations');
					store.load();
				},
				failure: function(response) {
					Ext.Msg.alert('Status', 'Fallo la peticion.');
				}
			});
		}
	},

	editOperation: function(button) {
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
});