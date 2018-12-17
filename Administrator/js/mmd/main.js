require.config({

	//加载模块
	paths: {
		'jquery': '../jquery.min',
		'IPconfigure': '../APIconfigure/IPconfigure',
		'mmd': 'mmd'
	},
	

})

require(['jquery', 'IPconfigure', 'mmd'], function($, IPconfigure, mmd) {
		console.log(222)
})