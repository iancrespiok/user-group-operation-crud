Ext.define('Users.view.UserGroupList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.userGroupList',
	title: 'UserGroupList',
	store: 'UsersOfGroup',

	columns: [
		{header: 'Id', dataIndex: 'id', flex: 1},
		{header: 'Name', dataIndex: 'name', flex: 1},
		{header: 'Surname', dataIndex: 'surname', flex: 1},
		{header: 'Username', dataIndex: 'username', flex: 1},
		{header: 'Default group', dataIndex: 'defaultGroupId', flex: 1}
	]
});