require.config({

	//加载模块
	paths: {
		'jquery': '../jquery.min',
		'IPconfigure': '../APIconfigure/IPconfigure',
		'index': 'index'
	},
	

})

require(['jquery', 'IPconfigure', 'index'], function($, IPconfigure, index) {
		console.log(222)
})