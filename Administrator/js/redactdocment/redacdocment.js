define(function(require, exports, module) {
	var IPconfigure = require('IPconfigure'),
		$ = require('jquery')

	//		var ip = "test.dascomyun.cn/dswifitools";
	var ip = "192.168.11.197:21010";



		//绑定事件
		$('.se-bo').click(select)
		$('.save').click(unload)
		$('.callback').mousedown(back)







	var num = 1
	//实例化编辑器
	//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
	var ue = UE.getEditor('editor');

	//  ue.setContent('weqweqweqwewewqew');
	var id = sessionStorage.getItem('id')
	var name = sessionStorage.getItem('name')

	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	UE.Editor.prototype.getActionUrl = function(action) {
		if(action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
			return 'http://' + ip + '/imgUpload'; //在这里返回我们实际的上传图片地址
		} else {
			return this._bkGetActionUrl.call(this, action);
		}
	}

	function isFocus(e) {
		alert(UE.getEditor('editor').isFocus());
		UE.dom.domUtils.preventDefault(e)
	}

	function setblur(e) {
		UE.getEditor('editor').blur();
		UE.dom.domUtils.preventDefault(e)
	}

	function insertHtml() {
		var value = prompt('插入html代码', '');
		UE.getEditor('editor').execCommand('insertHtml', value)
	}

	function createEditor() {
		enableBtn();
		UE.getEditor('editor');
	}

	function getAllHtml() {
		alert(UE.getEditor('editor').getAllHtml())
	}

	function getContent() {
		var arr = [];
		arr.push("使用editor.getContent()方法可以获得编辑器的内容");
		arr.push("内容为：");
		arr.push(UE.getEditor('editor').getContent());
		alert(arr.join("\n"));
	}

	function getPlainTxt() {
		var arr = [];
		arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
		arr.push("内容为：");
		arr.push(UE.getEditor('editor').getPlainTxt());
		alert(arr.join('\n'))
	}
	//  function setContent(isAppendTo) {
	//      var arr = [];
	//      arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
	//      UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
	////      alert(arr.join("\n"));
	//  }
	function setDisabled() {
		UE.getEditor('editor').setDisabled('fullscreen');
		disableBtn("enable");
	}

	function setEnabled() {
		UE.getEditor('editor').setEnabled();
		enableBtn();
	}

	function getText() {
		//当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
		var range = UE.getEditor('editor').selection.getRange();
		range.select();
		var txt = UE.getEditor('editor').selection.getText();
		alert(txt)
	}

	function getContentTxt() {
		var arr = [];
		arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
		arr.push("编辑器的纯文本内容为：");
		arr.push(UE.getEditor('editor').getContentTxt());
		alert(arr.join("\n"));
	}

	function hasContent() {
		var arr = [];
		arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
		arr.push("判断结果为：");
		arr.push(UE.getEditor('editor').hasContents());
		alert(arr.join("\n"));
	}

	function setFocus() {
		UE.getEditor('editor').focus();
	}

	function deleteEditor() {
		disableBtn();
		UE.getEditor('editor').destroy();
	}

	function disableBtn(str) {
		var div = document.getElementById('btns');
		var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
		for(var i = 0, btn; btn = btns[i++];) {
			if(btn.id == str) {
				UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
			} else {
				btn.setAttribute("disabled", "true");
			}
		}
	}

	function enableBtn() {
		var div = document.getElementById('btns');
		var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
		for(var i = 0, btn; btn = btns[i++];) {
			UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
		}
	}

	function getLocalData() {
		alert(UE.getEditor('editor').execCommand("getlocaldata"));
	}

	function clearLocalData() {
		UE.getEditor('editor').execCommand("clearlocaldata");
		alert("已清空草稿箱")
	}

	function unload() {
		var content = UE.getEditor('editor').getContent()
		var obj = new Object();
		var valtwo = $("#valtwo").val()
		console.log(valtwo)
		if(!valtwo){
			alert('标题不能为空！')
			return false
		}
		console.log($('.select').children('span')[0].innerText)
		var daa = $('.select').children('span')[0].innerText
		daa = daa.split('/')

		if(daa.length > 1) {
			var ngarde = 2
		} else {
			var ngarde = 1
		}
		if(sessionStorage.getItem('c_id')) {
			var garde = 1
			obj.garde = garde
			obj.id = id
			obj.content = content;
			obj.name = valtwo
			obj.ngarde = ngarde
			obj.n_id = sessionStorage.getItem('c_id')
			if(sessionStorage.getItem('largeid')) {
				obj.n_id = sessionStorage.getItem('largeid')
			}
		} else {

			var garde = 2
			obj.garde = garde
			obj.id = id
			obj.content = content;
			obj.name = valtwo
			obj.ngarde = ngarde
			obj.s_id = sessionStorage.getItem('s_id')
			if(sessionStorage.getItem('largeid')) {
				obj.n_id = sessionStorage.getItem('largeid')

			} else {
				obj.n_id = sessionStorage.getItem('s_id')
			}
		}

		console.log(obj)
		$.ajax({
			type: "post",
			url: IPconfigure.DascomyunWebsite_1011_15_6,
			async: true,
			contentType: "application/json",
			data: JSON.stringify(obj),
			dataType: 'text',
			success: function(data) {
				sessionStorage.clear();
				alert('修改成功')
				window.location.href = 'index.html'
			},
			error: function(data) {
				console.info("失败" + JSON.stringify(data));
				//				sessionStorage.clear();

			}
		});

	}

	function back() {
		window.location.href = 'index.html'
	}

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
	
	
	
		$('#valtwo').val('' + name + '')
		var data_name = sessionStorage.getItem('data_name')
		var con_obj = new Object()

		if(data_name) {
			$('.select span').html(data_name)
			console.log(data_name)
			
			var garde = 1
		} else {
			$('.select span').html(sessionStorage.getItem('s_data_name'))
			var garde = 2
			console.log(sessionStorage.getItem('s_data_name'))
			con_obj.s_id = sessionStorage.getItem('s_id')

		}

		con_obj.garde = garde
		con_obj.id = id

		$.ajax({
			type: "post",
			url: IPconfigure.DascomyunWebsite_1011_15_1,
			async: true,
			dataType: 'json',
			success: function(res) {
				console.log(res)
				var data = res.data
				for(var i = 0; i < data.length; i++) {
					console.log(data[i].documentInfos)
					$('.operate').append('<li idname=' + data[i].id + '>' + data[i].c_name + '</li>')
					if(data[i].secondCatalogueInfo != null) {
						var son_data = data[i].secondCatalogueInfo
						console.log(son_data.length)
						for(var j = 0; j < son_data.length; j++) {
							$('.operate').append('<li idname=' + son_data[j].id + '>' + data[i].c_name + "/" + son_data[j].s_name + '</li>')

						}
					}

				}
				for(var i = 0; i < $('.operate').children('li').length; i++) {
					$('.operate').children('li').eq(i).on('click', function() {
						var a = $(this).html()
						$('.select span').html('' + a + '')
						var b = $(this).attr('idname')
						//						sessionStorage.clear();
						sessionStorage.setItem('largeid', b)
						num = 1
						$('.select img').css('transform', 'rotateZ(0deg)')
						$('.operate').css('transform', 'scaleY(0)')
					})
				}

			}
		})

		$.ajax({
			type: "post",
			url: IPconfigure.DascomyunWebsite_1011_15_2,
			async: true,
			contentType: "application/json",
			data: JSON.stringify(con_obj),
			success: function(res) {
				console.log(res)
				var data = res.data
				var arr = [];
				arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
				setTimeout(function(){ 
					UE.getEditor('editor').setContent('' + data + '');
				
				},10);
				
				
			}
		});


})