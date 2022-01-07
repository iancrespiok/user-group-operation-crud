Ext.define('Users.controller.Test', {
	extend: 'Ext.app.Controller',
	views: [
		'UserList', 'UserAddForm', 'UserEditForm', 'Report'
	],
	stores: [
		'Users'
	],
	models: [
		'User'
	],

	init: function () {
		console.log("hola");
	}
})