Ext.define('Users.view.Report', {
	extend: 'Ext.window.Window',
	alias: 'widget.report',
	title: 'Report',
	width: 350,
	layout: 'fit',
	resizable: false,
	closeAction: 'hide',
	modal: true,
	store: 'Users',
	items: [{
		xtype: 'textarea',
		width: 300,
		readOnly: true
	}]
});