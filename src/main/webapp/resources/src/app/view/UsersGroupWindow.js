Ext.define('Users.view.UsersGroupWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.usersgroupwindow',
	id: 'usersgroupwindow',
	title: 'Users from group',
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
		xtype: 'userGroupList'
	}],
	buttons: [{
		text: 'Add user',
		action: 'add',
	}, {
		text: 'Cancelar',
		handler: function() {
			this.up('window').close();
		}
	}]
});