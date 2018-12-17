define(function(require, exports, module) {
	var IPconfigure = require('IPconfigure'),
		$ = require('jquery')

	$(function() {
		var id;
		var arrylen;
		var num = 5;
		//	var ip = "test.dascomyun.cn/dswifitools";
//		var ip = "192.168.11.197:21010";
			
			console.log(2)
			$.ajax({
				type: "get",
				url: IPconfigure.DascomyunWebsite_1011_15_10,
				async: true,
				dataType: 'json',
				success: function(res) {
					var data =res.data
					console.log(data)
					arrylen = data.length
					for(var i = 0; i < data.length; i++) {
						$('.click-upload').before("<div class='insert' id='" + data[i].id + "'><div class='opc'><img src='img/del-upload.png' class='del' title='删除'/><div class='replace'><input type='file' name='' id='' class='redd' value='' title='替换'/></div></div><img src='http://" + data[i].images + "' class='up-img'/></div>")

					}
					$('.insert').on('mouseover', function() {
						$(this).children('.opc').css('height', '30px')

					})
					$('.insert').on('mouseout', function() {
						$(this).children('.opc').css('height', '0px')
					})
					$('.del').on('click', function() {
						id = $(this).parents('.insert').attr('id')
						$.ajax({
							type: "get",
							url: "http://192.168.11.197:21010/deleteImag?id=" + id + "",
							async: true,
							dataType: 'content-type:application/json',
							complete: function(res) {
								
								console.log(res)
								var data = JSON.parse(res.responseText)
								if(data.code == 101000) {
									alert('删除成功')
									window.location.reload()
									
								} else {
									alert('删除失败')
								}
							}
						});
					})
					$('.redd').each(function() {

						$(this).on('change', function() {
							id = $(this).parents('.insert').attr('id')
							if($(this).val() == '') {
								return
							}
							var formData = new FormData();
							var file = $(this)[0].files[0];
							formData.append('file', file)
							formData.append('id', id)
							$.ajax({
								type: "post",
								url: IPconfigure.DascomyunWebsite_1011_15_9,
								async: true,
								dataType: 'json',
								data: formData,
								contentType: false,
								processData: false,
								success: function(res) {
									
									if(res.code == 101000) {
										//				$('.click-upload').before("<div class='insert'><img src='"+obj.imageUrl+"' class='up-img'/></div>")
										window.location.reload()
									} else{
										alert('上传的文件不是图片格式')
									}
								},
							})
						})
					})
				}
			});

		$('#bdd').on('change', function() {
			if($(this).val() == '') {
				return
			} else {
				var file = $("#bdd")[0].files[0];
				var formData = new FormData();
				formData.append('file', file)
				$.ajax({
					type: "post",
					url: IPconfigure.DascomyunWebsite_1011_15_9,
					async: true,
					dataType: 'json',
					data: formData,
					contentType: false,
					processData: false,
					success: function(res) {
						console.log(res)
						if(res.code == 101000) {
							$('.click-upload').before("<div class='insert'><img src='http://" + res.data + "' class='up-img'/></div>")
							window.location.reload()
						} else{
							alert('上传的文件不是图片格式')
						}
					},
				});
			}
		})
		$('#bdd').on('click', function() {
			if(arrylen >= 5) {
				alert('图片上传达到最大张数')
				return false
			}
		})
		$('.upload-head img').on('click', function() {
			window.location.href = 'index.html'
		})
	})

})