define(function(require, exports, module) {
	var IPconfigure = require('IPconfigure'),
		$ = require('jquery')
	$(function() {
		//	var ip = "test.dascomyun.cn/dswifitools";
//		var ip = "192.168.11.197:21010";
		$('.new').on('click', function() {
			window.location.href = 'document.html'
		})
		$('.catalogue').on('click', function() {
			window.location.href = 'mmd.html'
		})
		$('.compile').on('click', function() {
			var gg = sessionStorage.getItem('id')
			if(gg != null) {
				window.location.href = 'redactdocument.html'
			} else {
				alert('请先选择你要操作的文档')
			}
		})
		//监听浏览器的滚动事件
		$(window).scroll(function() {
			var backtop = document.documentElement.scrollTop || document.body.scrollTop;
			if(backtop > 300) {
				//			alert(123)
				$('.backtop').css('display', 'block')
			} else if(backtop < 250) {
				$('.backtop').css('display', 'none')
			}
		})
		$('.backtop').on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 500);
			return false
		})
		$('.new').on('mouseenter', function() {
			$('.bubbletwo').css('opacity', '1')
		})
		$('.catalogue').on('mouseenter', function() {
			$('.bubble').css('opacity', '1')
		})
		$('.compile').on('mouseenter', function() {
			$('.bubblethree').css('opacity', '1')
		})
		$('.new').on('mouseout', function() {
			$('.bubbletwo').css('opacity', '0')
		})
		$('.catalogue').on('mouseout', function() {
			$('.bubble').css('opacity', '0')
		})
		$('.compile').on('mouseout', function() {
			$('.bubblethree').css('opacity', '0')
		})
		$('.list').on('click', function() {
			$('.same-shade').css('display', 'block')
		})
		$('.viewpager').on('click', function() {
			window.location.href = 'slideshow.html'
		})

		$('.confirm').on('click', function() {
			$('.same-shade').css('display', 'none')
		})

		var num = 1
		$('.arrows').on('click', function() {
			if(num == 1) {
				num = 0
				$('.arrows').css('transform', 'rotateZ(180deg)')
				$('.operate').css('transform', 'scaleY(1)')

			} else if(num == 0) {
				num = 1
				$('.arrows').css('transform', 'rotateZ(0deg)')
				$('.operate').css('transform', 'scaleY(0)')

			}
		})

		//查询
			$.ajax({
				type: "post",
				url: IPconfigure.DascomyunWebsite_1011_15_1,
				async: true,
				dataType: 'json',
				success: function(res) {
					var data = res.data
					var num = 0
					//				console.log(data[0].documentInfos.length)
					//				console.log(JSON.parse(data))
					console.log(data)
					for(var i = 0; i < data.length; i++) {
						$('.float-document').append('<li><div class="font-img"><img src="img/catalogue.png" class="place"/>' + data[i].c_name + '<i><img src="img/down.png" class="rotate"/></i></div></li>')
						$('.float-document li').eq(i).after('<div class="children"></div>')

						var second = data[i].secondCatalogueInfo
						//					console.log(second)
						if(second != null) {

							for(var j = 0; j < second.length; j++) {
								$('.children').eq(i).append('<div class="son_second">' + second[j].s_name + '<i><img src="img/down.png" class="rotate"/></i></div>')
								$('.children').eq(i).children('.son_second').eq(j).after('<div class="second_children"></div>')
								var that = $('.second_children').eq(i)
								console.log(i)
								//							console.log(second[j].documentInfos)
								if(second[j].documentInfos != null) {

									for(var k = 0; k < second[j].documentInfos.length; k++) {
										//									console.log(second[j].documentInfos.length)
										//									console.log(data[i].secondCatalogueInfo[j].id)
										$('.children').eq(i).children('.second_children').eq(j).append('<span s_data_name=' +data[i].c_name+'/'+data[i].secondCatalogueInfo[j].s_name+ ' s_id_name=' + data[i].secondCatalogueInfo[j].id + ' id_name=' + second[j].documentInfos[k].id + '>' + second[j].documentInfos[k].name + '</span>')
										//查看三级文档
										$('.children').eq(i).children('.second_children').eq(j).children('span').eq(k).click(function() {
											console.log($(this).html())
											console.log($(this).html())
											var name = $(this).html()
											var id_name = $(this).attr('id_name')
											var s_id_name = $(this).attr('s_id_name')
											var s_data_name = $(this).attr('s_data_name')
											var obj = new Object()

											sessionStorage.clear()
											sessionStorage.setItem('id', id_name)
											sessionStorage.setItem('s_id', s_id_name)
											sessionStorage.setItem('s_data_name', s_data_name)
											sessionStorage.setItem('name', name)
											obj.id = id_name
											obj.s_id = s_id_name
											obj.garde = 2
											//							alert($(this).attr('idname'))
											$.ajax({
												type: "post",
												url: IPconfigure.DascomyunWebsite_1011_15_2,
												contentType: "application/json",
												async: true,
												data: JSON.stringify(obj),
												success: function(res) {
													var data = res.data
													$('.body-document').empty().append(data)
												}
											});
										})
									}
								}
							}
						}

						var arrlen = data[i].documentInfos
						//					alert(arrlen)
						if(arrlen != null) {
							for(var j = 0; j < data[i].documentInfos.length; j++) {
								$('.children').eq(i).append('<span data_name=' + data[i].c_name + ' c_id_name=' + data[i].id + ' idname=' + data[i].documentInfos[j].id + '>' + data[i].documentInfos[j].name + '</span>')

								//查看二级文档
								$('.children').eq(i).children('span').eq(j).on('click', function() {
									var name = $(this).html()
									var idname = $(this).attr('idname')
									var c_id = $(this).attr('c_id_name')
									var data_name = $(this).attr('data_name')
									var obj = new Object()

									sessionStorage.clear() //清空缓存

									sessionStorage.setItem('id', idname)
									sessionStorage.setItem('name', name)
									sessionStorage.setItem('c_id', c_id)
									sessionStorage.setItem('data_name', data_name)
									obj.id = idname
									obj.garde = 1
									//							alert($(this).attr('idname'))
									$.ajax({
										type: "post",
										url: IPconfigure.DascomyunWebsite_1011_15_2,
										contentType: "application/json",
										async: true,
										data: JSON.stringify(obj),
										success: function(res) {
											var data = res.data
											$('.body-document').empty().append(data)
										}
									});
								})
							}
						}
					}
					$('.float-document li').each(function() {

						$(this).addClass('first')
						$(this).on('click', function() {
							//					console.log(22)

							if($(this).hasClass('first')) {
								$(this).children('div').children('i').children('.rotate').css('transform', 'rotateZ(180deg)')
								$(this).next().css('display', 'block')
								$(this).attr('class', 'second')
							} else if($(this).hasClass('second')) {
								$(this).children('div').children('i').children('.rotate').css('transform', 'rotateZ(0deg)')
								$(this).next().css('display', 'none')
								$(this).attr('class', 'first')
							}
						})

						$('.son_second').each(function() {

							$(this).addClass('first')
							$(this).click(function(e) {
								//						console.log(2222)
								//						console.log(e.isPropagationStopped())
								if(!e.isPropagationStopped()) { //确定stopPropagation是否被调用过
									if($(this).hasClass('first')) {
										//								console.log(2)
										$(this).next().css('display', 'block')
										$(this).children('i').children('.rotate').css('transform', 'rotateZ(180deg)')
										$(this).addClass('second')
										$(this).removeClass('first')
									} else if($(this).hasClass('second')) {
										$(this).next().css('display', 'none')
										$(this).children('i').children('.rotate').css('transform', 'rotateZ(0deg)')

										$(this).addClass('first')
										$(this).removeClass('second')

									}
								}

								e.stopPropagation(); //必须要，不然e.isPropagationStopped()无法判断stopPropagation是否调用过
								////						$(this).next().css('display', 'none')
								////						$(this).children('i').children('.rotate').css('transform', 'rotateZ(180deg)')
							})
						})

					})

				}
			});
		$('.delete').on('click', function() {
			var gg = sessionStorage.getItem('id')
			if(gg != null) {
				$('.delete-shade').css('display', 'block')
			} else {
				alert('请先选择你要删除的文档')
			}
		})
		$('.closethree,.cancelthree').on('click', function() {
			$('.delete-shade').css('display', 'none')
		})
		$('.confirmthree').on('click', function() {
			var id = sessionStorage.getItem('id')
			var garde = 1
			var obj = new Object()
			if(sessionStorage.getItem('s_id')) {
				var s_id = sessionStorage.getItem('s_id')
				garde = 2
				obj.s_id = s_id
				console.log(555)
			}
			obj.id = id
			obj.garde = garde
			$.ajax({
				type: "post",
				url: IPconfigure.DascomyunWebsite_1011_15_3,
				async: true,
				contentType: "application/json",
				data: JSON.stringify(obj),
				success: function() {
					sessionStorage.clear()
					$('.delete-shade').css('display', 'none')
					window.location.reload()
				}
			});
		})
	})
})