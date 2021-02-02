/* eslint-disable */
// AOP模式 解耦对象调用的耦合 符合开放-封闭原则
Function.prototype.before = function (beforefn) {
	var __self = this // 保存原函数的引用￼
	// 返回包含了原函数和新函数的"代理"函数￼
	return function () {
		// 异步AOP手动执行next 执行下一个函数
		Array.prototype.push.call(arguments, () => {
			beforefn.apply(this, arguments)
		})
		if (beforefn.apply(this, arguments) === false) { // 返回false的情况，直接return 不再实行后面的原函数
			return
		}
		// 也会被原封不动地传入原函数，新函数在原函数之前执行￼
		return __self.apply(this, arguments) // 执行原函数并返回原函数的执行结果
		// 并且保证this不被劫持￼
	}
}
Function.prototype.after = function (afterfn) {
	var __self = this
	return function () {
		// 异步AOP手动执行next 执行下一个函数
		Array.prototype.push.call(arguments, () => {
			afterfn.apply(this, arguments)
		})
		var ret = __self.apply(this, arguments)
		afterfn.apply(this, arguments)
		return ret
	}
}
