Ext.define('Users.controller.User', {
	extend: 'Ext.app.Controller',
	views:  ['UserList', 'Users', 'Main', 'UserAddForm', 'UserEditForm', 'Report'],
	stores: ['Users'],
	models: ['User'],

	init: function() {

		this.control({
			'main > tabpanel #usersPanel': {
				render: this.reloadStore
			},
			'users > toolbar > button[action=add]': {
				click: this.showAddForm
			},
			'users > toolbar > button[action=edit]': {
				click: this.showEditForm
			},
			'users > toolbar > button[action=delete]': {
				click: this.deleteUser
			},
			'users > toolbar > button[action=report]': {
				click: this.showReportForm
			},
			'useraddform > button[action=add]': {
				click: this.doAddUser
			},
			'usereditform > button[action=add]': {
				click: this.editUser
			}
		});
		console.log("hola");
	},

	reloadStore: function () {
		console.log('reload user store')
	},

	showAddForm: function() {
		console.log("showaddform");
		var win = Ext.widget('useraddform');
		win.setTitle('Add user');
		win.setAction('add');
		win.down('form').getForm().reset();
		win.show();
	},

	showEditForm: function(button) {
		console.log('showEditForm')
		var win = Ext.widget('usereditform');
		var toolbar = button.up('toolbar'),
			users = toolbar.up('users'),
			userlist = users.down('userList');
			selectionModel = userlist.getSelectionModel(),
			record = selectionModel.getSelection();
		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun usuario para editarlo');
			return;
		} else {
			win.setTitle('Edit user');
			win.setAction('edit');
			win.down('form').getForm().setValues(record[0].getData());
			win.show();
		}
		selectionModel.deselectAll();
	},

	showReportForm: function(button) {
		var win = Ext.widget('report'),
		text = win.down('textarea');
		var store = Ext.getStore('Users');
		var numberOfUsersInStore = store.count();
		text.setValue('La base de datos tiene ' + numberOfUsersInStore + " usuarios.");
		win.show();
	},

	doAddUser: function(button) {
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
	},

	deleteUser: function(button) {
		console.log('deleting');
		var toolbar = button.up('toolbar'),
			users = toolbar.up('users'),
			userlist = users.down('userList'),
			selectionModel = userlist.getSelectionModel(),
			record = selectionModel.getSelection();

		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun usuario para borrarlo');
			return;
		} else {
			var userToDelete = record[0].getData();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/users',
				method: 'DELETE',
				jsonData: userToDelete,
				success: function(response) {
					var store = Ext.getStore('Users');
					store.load();
				},
				failure: function(response) {
					Ext.Msg.alert('Status', 'Fallo la peticion.');
				}
			});
		}
	},

	editUser: function(button) {
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
});