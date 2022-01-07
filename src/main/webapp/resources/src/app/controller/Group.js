Ext.define('Users.controller.Group', {
	extend: 'Ext.app.Controller',
	views:  ['GroupList','Groups','GroupAddForm','GroupEditForm', 'UsersGroupWindow','UserGroupList', 'NewUserGroupWindow'],
	stores: ['Groups', 'UsersNotOnGroup', 'UsersOfGroup'],
	models: ['Group'],

	init: function() {

		this.control({
			'groups > toolbar > button[action=add]': {
				click: this.showAddForm
			},
			'groups > toolbar > button[action=edit]': {
				click: this.showEditForm
			},
			'groups > toolbar > button[action=delete]': {
				click: this.deleteGroup
			},
			'groups > toolbar > button[action=report]': {
				click: this.showReportForm
			},
			'groupaddform > button[action=add]': {
				click: this.doAddGroup
			},
			'groupeditform > button[action=add]': {
				click: this.editGroup
			},
			'groups > toolbar > button[action=getUsers]' : {
				click: this.getUsers
			},
			'usersgroupwindow button[action=add]':{
				click: this.showAddUserForm
			},
			'newusergroupwindow button[action=add]':{
				click: this.addUser
			}
		});
		console.log("hola");
	},

	showAddForm: function() {
		console.log("showaddform");
		var win = Ext.widget('groupaddform');
		win.setTitle('Add group');
		win.setAction('add');
		win.down('form').getForm().reset();
		win.show();
	},

	showEditForm: function(button) {
		console.log('showEditForm')
		var win = Ext.widget('groupeditform');
		var toolbar = button.up('toolbar'),
			users = toolbar.up('groups'),
			grouplist = users.down('groupList');
			selectionModel = grouplist.getSelectionModel(),
			record = selectionModel.getSelection();
		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun usuario para editarlo');
			return;
		} else {
			win.setTitle('Edit group');
			win.setAction('edit');
			win.down('form').getForm().setValues(record[0].getData());
			win.show();
		}
		selectionModel.deselectAll();
	},

	showReportForm: function(button) {
		var win = Ext.widget('report'),
		text = win.down('textarea');
		var store = Ext.getStore('Groups');
		var numberOfGroupsInStore = store.count();
		text.setValue('La base de datos tiene ' + numberOfGroupsInStore + " grupos.");
		win.show();
	},

	doAddGroup: function(button) {
		console.log('agregar');
		var win = button.up('window'),
			form = win.down('form'),
			values = form.getValues();

		Ext.Ajax.request({
			url: '/SpringMVCHibernateCRUDExample_war/groups',
			method: 'POST',
			jsonData: values,
			success: function(response) {
				var store = Ext.getStore('Groups');
				store.load();
			},
			failure: function(response) {
				Ext.Msg.alert('Status', 'Fallo la peticion.');
			}
		});
		win.close();
	},

	deleteGroup: function(button) {
		console.log('deleting');
		var toolbar = button.up('toolbar'),
			users = toolbar.up('groups'),
			grouplist = users.down('groupList'),
			selectionModel = grouplist.getSelectionModel(),
			record = selectionModel.getSelection();

		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun usuario para borrarlo');
			return;
		} else {
			var groupToDelete = record[0].getData();
			Ext.Ajax.request({
				url: '/SpringMVCHibernateCRUDExample_war_exploded/groups',
				method: 'DELETE',
				jsonData: groupToDelete,
				success: function(response) {
					var store = Ext.getStore('Groups');
					store.load();
				},
				failure: function(response) {
					Ext.Msg.alert('Status', 'Fallo la peticion.');
				}
			});
		}
	},

	editGroup: function(button) {
		console.log('editUser');
		var win = button.up('window');
		var values = win.down('form').getValues();
		Ext.Ajax.request({
			url: '/SpringMVCHibernateCRUDExample_war_exploded/users',
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
	},

	getUsers: function (button) {
		console.log('showEditForm')
		var win = Ext.widget('usersgroupwindow');
		var toolbar = button.up('toolbar'),
			users = toolbar.up('groups'),
			grouplist = users.down('groupList');
		selectionModel = grouplist.getSelectionModel(),
		record = selectionModel.getSelection();

		if (record[0] == null) {
			Ext.Msg.alert('Info', 'Primero se debe seleccionar algun grupo para ver sus usuario');
			return;
		} else {
			var selectedGroup = record[0].getData();
			window.localStorage.setItem("groupId",selectedGroup.id);
			window.localStorage.setItem("groupName",selectedGroup.name);
			Ext.Ajax.request({
				url: `http://localhost:8080/SpringMVCHibernateCRUDExample_war_exploded/groups/${selectedGroup.id}/users`,
				method: "GET",
				timeout: 60000,
				success: function (response) {
					var data = response.responseText;
					var dataJson = JSON.parse(data);
					var userStore = Ext.getStore("UsersOfGroup");
					userStore.removeAll();
					var usersOfGroup = dataJson.users;
					usersOfGroup.forEach((element) => {
						userStore.add({ id: element.id, name: element.name, surname: element.surname, username: element.username, defaultGroupId: element.defaultGroupId });
					});
					console.log(dataJson)
				},
				failure: function (response) {
					Ext.Msg.alert("Status", "Request Failed.");
				},
			});
			console.log(users)
			win.setTitle('Users in group '+ selectedGroup.name);
			win.show();
		}
		selectionModel.deselectAll();
	},

	showAddUserForm: function(button) {
		console.log('addUserToGroup')
		var win = Ext.widget('newusergroupwindow');
		var oldWin = button.up('window');
		win.setTitle('Add user to group ' + window.localStorage.getItem("groupName"));
		var selectedGroup = record[0].getData();
		Ext.Ajax.request({
			url: `http://localhost:8080/SpringMVCHibernateCRUDExample_war_exploded/groups/${window.localStorage.getItem("groupId")}/users`,
			method: "GET",
			timeout: 60000,
			success: function (response) {
				var data = response.responseText;
				var dataJson = JSON.parse(data);
				var usersOfGroup = dataJson.users;
				console.log('usersOfGroup')
				console.log(usersOfGroup)
				Ext.Ajax.request({
					url: 'http://localhost:8080/SpringMVCHibernateCRUDExample_war_exploded/users',
					method: "GET",
					timeout: 60000,
					success: function (response) {
						var data = response.responseText;
						var dataJson = JSON.parse(data);
						var usersNotOnGroupStore = Ext.getStore("UsersNotOnGroup");
						usersNotOnGroupStore.removeAll();
						var allUsers = dataJson.users;
						console.log('allUsers')
						console.log(allUsers)
						var usersNotOnGroup = allUsers.filter(user => !(usersOfGroup.flatMap(e => e.id).includes(user.id)));
						usersNotOnGroup.forEach(element =>
							usersNotOnGroupStore.add({id: element.id, name: element.name, surname: element.surname, username: element.username, defaultGroupId: element.defaultGroupId }))
					},
					failure: function (response) {
						Ext.Msg.alert('Info', 'Primero se debe seleccionar algun grupo para ver sus usuario');
						return;
					}
				})
			},
			failure: function (response) {
				Ext.Msg.alert("Status", "Request Failed.");
			},
		});
		oldWin.close();
		win.show();
	},

	addUser: function (button) {
		console.log('adduser');
		var win = button.up('window'),
			form = win.down('form'),
			values = form.getValues();
		console.log(values.defaultGroupId)
		Ext.Ajax.request({
			url: `/SpringMVCHibernateCRUDExample_war/groups/${window.localStorage.getItem("groupId")}/users/${values.defaultGroupId}`,
			method: 'POST',
			success: function(response) {
			},
			failure: function(response) {
				Ext.Msg.alert('Status', 'Fallo la peticion.');
			}
		});
		win.close();

	}


});