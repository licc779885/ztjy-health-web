
import { bridge } from './dsbridge'
const namespace = bridge.call('getNameSpace') || ''
export function report (type, obj) {
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
	bridge.call(namespace + '.onStatisticEvent', JSON.stringify({
		event: eventId,
		data: obj
	}), function () {
	})
	if (obj.parm !== undefined && obj.parm !== '') {
		umengObj = { eventid: umengId, para: obj.parm }
	} else {
		umengObj = { eventid: umengId }
	};
	bridge.call(namespace + '.onUmengEvent', JSON.stringify(umengObj), function () {})
}
