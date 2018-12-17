require.config({

	//加载模块
	paths: {
		'jquery': '../jquery.min',
		'IPconfigure': '../APIconfigure/IPconfigure',
		'document': 'document',
//		'ueditor.config':'../../static/ueditor.config',
//		'ueditor':'../../static/ueditor.all',
//		'ueditor.zh-cn':'../../static/lang/zh-cn/zh-cn',
//		'ZeroClipboard':'../../static/third-party/zeroclipboard/ZeroClipboard.main'
		
	},
	'shim':{
		'ueditor.zh-cn':['ueditor.config','ueditor']
	}
	

})

require(['jquery', 'IPconfigure', 'document',], function($, IPconfigure,document){
		console.log(222)
		
})