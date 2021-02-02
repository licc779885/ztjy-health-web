;(function () {
	var a = {
		report: function (type, obj, namespace) {
			/*
			 @event_id 点击事件 id
			 @page     页面预览时的页面名称
			 @type     2=>事件 1=>浏览
			 @parm     额外参数
			 * */
			if (!namespace) return !1
			var eventId = 'sdo_bfn_pv'
			var umengId = ''
			var umengObj = {}

			if (type === 2) {
				eventId = 'sdo_bfn_event'
				umengId = obj.event_id
			} else {
				umengId = obj.page || ''
			}
			window.dsBridge.call(namespace + '.onStatisticEvent', JSON.stringify({
				event: eventId,
				data: obj
			}), function () {
			})
			if (obj.parm !== undefined && obj.parm !== '') {
				umengObj = { eventid: umengId, para: obj.parm }
			} else {
				umengObj = { eventid: umengId }
			};
			window.dsBridge.call(namespace + '.onUmengEvent', JSON.stringify(umengObj), function () {})
		},
		request: function (obj) { // vue請求數據
			obj = obj || {}
			var xhr = new XMLHttpRequest()
			xhr.open((obj.type || 'post'), /* '${ctx}' + */obj.url, true)
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.send(JSON.stringify(obj.data))
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText)
					obj.success && obj.success(obj.bdy ? data : data.body)
				}
			}
		},
		// ajax: function (obj) {
		// 	if (!obj.url) return !1

		// 	if (!obj.load) { // 是否要load
		// 		$('body').append('<div class="mui-body-loading" style="z-index: 9999; position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);"><span class="mui-spinner"></span></div>')
		// 		$('body').append('<div class="layer-mask" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0;background: rgba(0,0,0,0); z-index: 9998"></div>') // 遮罩
		// 	}

		// 	$.ajax({
		// 		url: obj.url,
		// 		data: JSON.stringify(obj.data),
		// 		type: obj.type || 'post',
		// 		contentType: 'application/json',
		// 		dataType: 'json',
		// 		success: function (d) {
		// 			if (d.code == '10000') {
		// 				obj.success(d.body)
		// 			} else {
		// 				mui.toast(d.msg || '請求失败')
		// 			}
		// 			$('.mui-body-loading').remove()
		// 			$('.layer-mask').remove()
		// 		},
		// 		error: function () {
		// 			$('.mui-body-loading').remove()
		// 			$('.layer-mask').remove()
		// 			mui.toast('請求失败')
		// 		},
		// 		timeout: 7000
		// 	})
		// },
		/**
         * 版本比对      curV > reqV = true
         * @param {String} curV    当前版本
         * @param {Object} reqV    比对版本
         */
		compare: function (curV, reqV) {
			if (curV && reqV) {
				// 将两个版本号拆成数字
				var arr1 = curV.split('.')
				var arr2 = reqV.split('.')
				var minLength = Math.min(arr1.length, arr2.length)
				var position = 0
				var diff = 0
				// 依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
				while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) === 0)) {
					position++
				}
				diff = (diff !== 0) ? diff : (arr1.length - arr2.length)
				// 若curV大于reqV，则返回true
				return diff > 0
			} else {
				// 输入为空
				console.log('版本号不能为空')
				return false
			}
		}
	}

	window.szyglb = a
})()
