define(function(require, exports, module) {
	var IPconfigure = require('IPconfigure'),
		$ = require('jquery')

	$(function() {
		//按钮
		//	var ip="test.dascomyun.cn/dswifitools";
		var ip = "192.168.11.197:21010";
		var num = 1
		$('.back').on('click', function() {
			window.location.href = 'index.html'
		})
		$('.adddocument').on('click', function() {
			sessionStorage.setItem('largeids', undefined)
			$('.shade').css('display', 'block')
		})
		$('.closeone,.cancel').on('click', function() {
			$('.shade').css('display', 'none')
		})
		$('.closetwo,.canceltwo').on('click', function() {
			$('.shadetwo').css('display', 'none')
		})
		$('.closethree,.cancelthree').on('click', function() {
			$('.delete-shade').css('display', 'none')
		})
		//查询
			$.ajax({
				type: "post",
				url: IPconfigure.DascomyunWebsite_1011_15_1,
				async: true,
				dataType: 'json',
				success: function(res) {
					console.log(res)
					var data = res.data
					//				console.log(data[0].documentInfos.length)
					//				console.log(JSON.parse(data))
					var id
					for(var i = 0; i < data.length; i++) {

						$('.operate').append('<li idname=' + data[i].id + '>' + data[i].c_name + '</li>')

						$('.scroll').append('<div class="title-name"><span class="caption" id_name=' + data[i].id + '>' + data[i].c_name + '</span><span class="order">' + data[i].order + '</span><span style="width: 100px;"><div class="redact">编辑</div><div class="delete">删除</div></span></div>')

						//					console.log(data[i].secondCatalogueInfo)
						if(data[i].secondCatalogueInfo != null) {
							var son_data = data[i].secondCatalogueInfo
							for(var j = 0; j < son_data.length; j++) {
								console.log(data[i].c_name)
								$('.scroll').append('<div class="title-name"><span class="caption" num_garde="2" data_name=' + data[i].c_name + ' c_id_name=' + son_data[j].id + ' id_name=' + data[i].id + '>-- ' + son_data[j].s_name + '</span><span class="order">' + son_data[j].order + '</span><span style="width: 100px;"><div class="redact" >编辑</div><div class="delete">删除</div></span></div>')
							}
						}

					}
					for(var i = 0; i < $('.scroll').children('div').length; i++) {
						//点击编辑目录名
						$('.title-name').eq(i).children('span').children('.redact').on('click', function() {
							$('.shadetwo').css('display', 'block')
							var headline = $(this).parents('.title-name').children('.caption').html()
							var serial_data = $(this).parents('.title-name').children('.order').html()
							var data_name = $(this).parents('.title-name').children('.caption').attr('data_name')
							var obj = new Object();
							///12月6号
							obj.garde = 1
							headline = headline.split(' ')
							if(headline.length == 2) {
								console.log($(this).parents('.title-name').children('.caption').attr('id_name'))
								obj.c_id = $(this).parents('.title-name').children('.caption').attr('id_name')
								obj.garde = 2
								obj.id = $(this).parents('.title-name').children('.caption').attr('c_id_name')
							} else {
								id = $(this).parents('.title-name').children('.caption').attr('id_name')
								obj.id = id
							}

							headline = headline.reverse()[0]
							console.log(data_name)
							console.log(obj)

							$('.popuptwo .select').children('span').html(data_name)
							$('.change').val(headline)
							$('.serial').val(serial_data)
							changeval = $('.change').val();

							sessionStorage.setItem('obj', JSON.stringify(obj))

						})

						//删除目录
						$('.title-name').eq(i).children('span').children('.delete').on('click', function() {
							$('.delete-shade').css('display', 'block')

							garde = $(this).parents('.title-name').children('.caption').attr('num_garde')
							if(garde == 2) {
								id = $(this).parents('.title-name').children('.caption').attr('c_id_name')
							} else {
								id = $(this).parents('.title-name').children('.caption').attr('id_name')
							}
							console.log(id)
							console.log(garde)
						})
					}
					for(var i = 0; i < $('.operate').children('li').length; i++) {
						$('.operate').children('li').eq(i).on('click', function() {
							var a = $(this).html()
							$('.select span').html('' + a + '')
							var b = $(this).attr('idname')
							//						sessionStorage.clear();
							sessionStorage.setItem('largeids', b)
							num = 1
							$('.select img').css('transform', 'rotateZ(0deg)')
							$('.operate').css('transform', 'scaleY(0)')
						})
					}

					$('.confirmtwo').on('click', function() {

						var obj = JSON.parse(sessionStorage.getItem('obj'))
						var name = $('.change').val()
						console.log(c_id)
						if(sessionStorage.getItem('largeids')) {
							console.log(2)
							var c_id = sessionStorage.getItem('largeids')
						}
						if(c_id) {
							obj.c_id = c_id
						}

						obj.name = name
						obj.order = $('.serial').val()
						console.log(obj)
						$.ajax({
							type: "post",
							url: IPconfigure.DascomyunWebsite_1011_15_4,
							contentType: 'application/json',
							async: true,
							data: JSON.stringify(obj),
							success: function() {
								window.location.reload()
							}
						});
					})
					$('.confirmthree').on('click', function() {
						var obj = new Object();
						obj.id = id
						//						console.log(garde)
						obj.garde = garde

						if(garde == undefined) {
							obj.garde = 1
						}
						console.log(obj)
						$.ajax({
							type: "post",
							url: IPconfigure.DascomyunWebsite_1011_15_8,
							contentType: 'application/json',
							async: true,
							data: JSON.stringify(obj),
							success: function() {
								window.location.reload()
							}
						});
					})
				}
			});
		//点击添加目录
		$('.confirm').on('click', function() {
			var value = $('#creat').val()
			var obj = new Object();
			var c_id = sessionStorage.getItem('largeids')
			var garde = 1
			if(c_id != 'undefined') {
				garde = 2
				obj.c_id = c_id
			}
			obj.name = value
			obj.garde = garde
			$.ajax({
				type: "post",
				url: IPconfigure.DascomyunWebsite_1011_15_7,
				async: true,
				contentType: "application/json",
				data: JSON.stringify(obj),
				success: function() {
					$('.shade').css('display', 'none')
					window.location.reload()
				}
			});
		})

		$('.select').click(function() {
			select()
		})
		//目录
		function select() {

			if(num == 1) {
				num = 0
				$('.select img').css('transform', 'rotateZ(180deg)')
				$('.operate').css('transform', 'scaleY(1)')
			} else if(num == 0) {
				num = 1
				$('.select img').css('transform', 'rotateZ(0deg)')
				$('.operate').css('transform', 'scaleY(0)')
			}
		}
	})
})