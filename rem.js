//采取匿名函数闭包自我执行的方式，可以防止全局变量污染
(function (doc, win) {
	/*
		window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
		公式表示就是：window.devicePixelRatio = 物理像素 / dips
		电脑端物理像素和设备独立像素是1比1
	*/
	var dpr = window.devicePixelRatio || 1;
	/*
		documentElement 是整个节点树的根节点root，即<html> 标签，即获取到文档HTML元素
	*/
	var docEl = doc.documentElement,
	/*
		orientationchange 事件是在用户水平或者垂直翻转设备（即方向发生变化）时触发的事件;
		resize是浏览器改变大小时的事件，我们将事件封装成为一个对象，会根据设备和浏览器变化进行自动选择事件
	*/
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
	/*
		定义resizeEvt事件触发的函数
			获取html文档结构的宽度
			如果宽度为0或者不存在则直接返回
			在html标签上定义字体大小的属性为整个屏幕的36分之一，这就代表着是  1 rem
			设置data-dpr属性，留作的css hack之用，这就是一个css属性设置  设置  物理像素和设备独立像素比
	*/
    recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		docEl.style.fontSize = clientWidth / 36 + "px";
		docEl.setAttribute("data-dpr", dpr);
    };
	/*
		如果浏览器不支持事件机制则直接返回
	*/
	if (!doc.addEventListener) return;
	/*
		在设备翻转或者改变文档页面大小的时候触发事件，设置rem基础针对值
	*/
	win.addEventListener(resizeEvt, recalc, false);
	/*
		在页面加载成功时触发事件，设置rem基础针对值
	*/
	doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

