require.config({

	//加载模块
	paths: {
		'jquery': '../jquery.min',
		'IPconfigure': '../APIconfigure/IPconfigure',
		'slideshow': 'slideshow'
	},
	

})

require(['jquery', 'IPconfigure', 'slideshow'], function($, IPconfigure, slideshow) {
		console.log(222)
})