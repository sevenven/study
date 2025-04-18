(function(w){
	var tools = {
		// 对象合并
		extend: function(o,n){
			for (var p in n){
				o[p]=n[p];
			}
		},
		// 添加类
		addClass: function(node,className){
			var reg=new RegExp("\\b"+className+"\\b");
			if(!reg.test(node.className)){
				node.className +=(" "+className); 
			}
		},
		//删除类
		removeClass: function(node,className){
			if(node.className){
				var reg=new RegExp("\\b"+className+"\\b");
				var classes = node.className;
				node.className=classes.replace(reg,"");
				if(/^\s*$/g.test(node.className)){
					node.removeAttribute("class");
				}
			}else{
				node.removeAttribute("class");
			}
		},
		// 字符串转换为Dom
		parseDom: function(str) {
		　　 var objE = document.createElement("div");
		　　 objE.innerHTML = str;
		　　 return objE.childNodes[0];
		},
		// 获取第n个元素
		nth: function(parent,ele,num){
			var _ele=Array.prototype.slice.call(parent.childNodes),eleArray=[];
			//将父节点的子节点转换成数组_ele;eleArray为只储存元素节点的数组
			for(var i= 0,len=_ele.length;i<len;i++){
				if(_ele[i].nodeType==1){
					eleArray.push(_ele[i]);//过滤掉非元素节点
				}
			}
			if(arguments.length===2){
				//如果只传入2个参数，则如果第二个参数是数字，则选取父节点下的第几个元素
				//如果第二个参数是字符串，则选取父节点下的所有参数代表的节点
				if(typeof arguments[1]==="string"){
					_ele=Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]));
					return _ele;
				}else if(typeof arguments[1]==="number"){
					return eleArray[arguments[1]];
				}
			}else{
				//如果参数齐全，则返回第几个某节点,索引从0开始
				_ele=Array.prototype.slice.call(parent.getElementsByTagName(ele));
				return _ele[num];
			}
		},
		replaceChildNodes: function(element, lists){
			var fragment = document.createDocumentFragment();
			for(var i in lists){
				fragment.appendChild(lists[i]);
			}
			element.innerHTML = "";
			element.appendChild(fragment);
		},
		// 生成随机数
		rndNum: function(n){
			var rnd="";
			for(var i=0;i<n;i++)
				rnd+=Math.floor(Math.random()*10);
			return rnd;
		},
		/*t:当前是哪一次
		b:初始位置
		c:最终位置与初始位置之间的差值
		d:总次数
		s:回弹距离
		*/
		Tween: {
			Linear: function(t,b,c,d){ return c*t/d + b; },
			Back: function(t,b,c,d,s){ if (s == undefined) s = 1.70158; return c*(t/=d)*t*((s+1)*t - s) + b; }
		},
		// css2D的读写
		css2D: function(node,type,val){
			if(typeof node ==="object" && typeof node["transform"] ==="undefined" ){
				node["transform"]={};
			}
			if(arguments.length>=3){
				//设置
				var text ="";
				node["transform"][type] = val;
				
				for( item in node["transform"]){
					if(node["transform"].hasOwnProperty(item)){
						switch (item){
							case "translateX":
							case "translateY":
							case "translateZ":
								text +=  item+"("+node["transform"][item]+"px)";
								break;
							case "scale":
								text +=  item+"("+node["transform"][item]+")";
								break;
							case "rotate":
								text +=  item+"("+node["transform"][item]+"deg)";
								break;
						}
					}
				}
				node.style.transform = node.style.webkitTransform = text;
			}else if(arguments.length==2){
				//读取
				val =node["transform"][type];
				if(typeof val === "undefined"){
					switch (type){
						case "translateX":
						case "translateY":
						case "rotate":
							val =0;
							break;
						case "scale":
							val =1;
							break;
					}
				}
				return val;
			}
		},
		// 添加遮罩层
		addMask: function(){
			document.querySelector(".page").appendChild(this.parseDom('<div class="mask"></div>'));
		},
		// 删除遮罩层
		removeMak: function(){
			var mask = document.querySelector(".mask");
			if(mask) document.querySelector(".page").removeChild(mask);
		},
		// 根据起始日期和结束日期获取初始化数组
		getDateArr: function(startDate, endDate){
			var startDateArr = startDate.split("-");
			var endDateArr = endDate.split("-");
			var data = [[], [], []];
			for(var i = startDateArr[0]; i <= endDateArr[0]; i++){
				data[0].push(i + "");
			}
			data[1] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
			if(startDateArr[0] == endDateArr[0]){
				for(var i = startDateArr[1]; i <= endDateArr[1]; i++){
					if(i < 10) i = "0" + i;
					data[1].push(i + "")
				}
			}
			var dayStart = 1;
			var d = this.mGetDate(data[0][0], data[1][0]);
			if(startDateArr[0] == endDateArr[0] && startDateArr[1] == endDateArr[1]){
				dayStart = startDateArr[2];
				d = endDateArr[2];
			}
			for(i = dayStart; i <= d; i++){
				if(i < 10) i = "0" + i;
				data[2].push(i + "")
			}
			return data;
		},
		// 获取当月有多少天
		mGetDate: function(year, month){
			var d = new Date(year, month, 0);
			return d.getDate();
		}
	}
	
	var util = {};
	w.util = util;
	
	// 无缝滑屏
	var Swiper = function(elementId, imgArr){
		this.options = {};
		this.options.elementId = elementId; // 组件ID
		this.options.carouselWrap = document.querySelector(elementId); // 元素
		this.options.needSeamless = this.options.carouselWrap.getAttribute("needSeamless") === null ? false : true; // 无缝轮播
		this.options.needAuto = this.options.carouselWrap.getAttribute("needAuto") === null ? false : true; // 自动轮播
		this.options.ulNode = null; // 图片容器
		this.options.pointsWrap = document.querySelector(elementId + " .carousel-points"); // 分页器容器
		this.options.points = null; // 分页器
		this.options.pointsLength = imgArr.length; // 分页器数量
		this.options.imgArr =  this.options.needSeamless ? imgArr.concat(imgArr) : imgArr; // 初始化图片
		this.options.imgLength = this.options.imgArr.length; // 图片初始化数量
		this.options.timer = 0; // 定时器
		this.options.index = 0; // 当前图片下标
		this.options.elementX = 0 // touchstart时元素的位置
		this.options.startX = 0; // touchstart时手指的位置
		this.options.startY = 0; // touchstart时手指在y轴的位置 防抖动
		this.options.isX = true; // 首次滑屏方向 防抖动
		this.options.isFirst = true; // 是否是第一次滑屏 防抖动
		this.options.dir = "toRight"; // 记录滑屏方向 取消橡皮筋效果		
		// 组件初始化
		init(this.options);
		// 添加滑屏监听
		addSlideEven(this.options);
		
		// 组件初始化
		function init(options) {
			if(options.carouselWrap){
				options.ulNode = document.createElement("ul");
				options.ulNode.classList.add("carousel-list");
				options.ulNode.style.width = options.imgLength + "00%";
				for(var i = 0; i < options.imgLength; i++){
					options.ulNode.innerHTML += '<li style="width: ' + (100/options.imgLength) + '%"><a href="javascript:;"><img src="' + options.imgArr[i] + '" /></a></li>';
				}
				options.carouselWrap.appendChild(options.ulNode);
				var imgNode = document.querySelector(options.elementId + " .carousel-list > li > a > img");
				imgNode.onload = function () {
					options.carouselWrap.style.height = imgNode.offsetHeight + "px";
				}
				if(options.pointsWrap){   
					for(var i = 0; i < options.pointsLength; i++){
						if(i == 0){
							options.pointsWrap.innerHTML += '<span class="active"></span>'
						}else{
							options.pointsWrap.innerHTML += '<span></span>'
						}
					}
					options.points = document.querySelectorAll(options.elementId + " .carousel-points > span")
				}
				if(options.needAuto){
					auto(options)
				}
			}
		}
		
		// 添加滑屏监听
		function addSlideEven(options){
			/* 
				滑屏
				1.拿到元素一开始的位置
				2.拿到手指一开始点击的位置
				3.拿到手指move的实时距离
				4.将手指移动的距离加给元素
			*/
			options.carouselWrap.addEventListener("touchstart", function(ev){
				ev=ev||event;
				var touchC = ev.changedTouches[0];
				// 无缝
				// 点击第一组的第一张时 瞬间跳到第二组的第一张
				// 点击第二组的最后一张时 瞬间跳到第一组的最后一张
				if(options.needSeamless){
					var index = Math.round(tools.css2D(options.ulNode, "translateX") / document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1));
					if(index === 0){
						index = -options.pointsLength;
					}
					if(-index == (options.imgLength-1)){
						index = -(options.pointsLength - 1);
					}
					tools.css2D(options.ulNode, "translateX", index * (document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1)));
				}
				if(options.needAuto){
					clearInterval(options.timer)
				}
				options.ulNode.style.transition = "none"
				options.startX = touchC.clientX;
				options.elementX = tools.css2D(options.ulNode, "translateX");
				options.startY = touchC.clientY;
				options.isX = true;
				options.isFirst = true;
			});
			options.carouselWrap.addEventListener("touchmove", function(ev){
				if(!options.isX) return; // 防抖动
				ev=ev||event;
				var touchC = ev.changedTouches[0];
				var nowX = touchC.clientX;
				var nowY = touchC.clientY;
				var disX = nowX - options.startX;
				var disY = nowY - options.startY;
				options.dir = "toRight"
				if(disX > 0) options.dir = "toLeft"
				if(options.isFirst){
					options.isFirst = false;
					if(Math.abs(disY) > Math.abs(disX)){
						options.isX = false;
						// 首次防抖动
						return;
					} 
				}
				tools.css2D(options.ulNode, "translateX", options.elementX + disX)
			});
			options.carouselWrap.addEventListener("touchend", function(ev){
				ev = ev || event;
				if(options.dir === "toRight"){
					options.index = Math.floor(tools.css2D(options.ulNode, "translateX") / document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1));
				}else {
					options.index = Math.ceil(tools.css2D(options.ulNode, "translateX") / document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1));
				}
				// 超出控制
				if(options.index > 0){
					options.index = 0;
				}else if(options.index < 1 - options.imgLength){
					options.index = 1 - options.imgLength;
				}
				circleFlag(options);
				options.ulNode.style.transition = "0.5s transform";
				tools.css2D(options.ulNode, "translateX", options.index * (document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1)));
				if(options.needAuto){
					auto(options);
				} 
			});
		}
		
		// 自动轮播
		function auto(options){
			clearInterval(options.timer);
			options.timer = setInterval(function(){
				// 无缝
				// 当前是第一组的第一张时 瞬间跳到第二组的第一张
				// 当前是第二组的最后一张时 瞬间跳到第一组的最后一张
				if(options.needSeamless){
					if(options.index == (1 - options.imgLength)){
						options.index = 1 - options.pointsLength;
						options.ulNode.style.transition = "none";
						tools.css2D(options.ulNode, "translateX", options.index * (document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1)));
					}
				}else{
					if(options.index == 1 - options.imgLength){
						options.index = 0;
						options.ulNode.style.transition = "none";
						tools.css2D(options.ulNode, "translateX", options.index * (document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1)));
						options.index++;
					}
				}
				options.index--;
				setTimeout(function(){
					options.ulNode.style.transition = "0.5s transform";
					circleFlag(options);
					tools.css2D(options.ulNode, "translateX", options.index * (document.querySelector(options.elementId + " .carousel-list > li").getBoundingClientRect().width.toFixed(1))); 
				}, 50) 
			}, 2000)
		}
		
		// 分页器改变	
		function circleFlag(options){
			if(!options.pointsWrap) return;
			for(var i = 0; i < options.pointsLength; i++){
				options.points[i].classList.remove("active");
			}
			options.points[-options.index%options.pointsLength].classList.add("active");
		}
	}
	Swiper.prototype.destroy = function(){
		delete this;
	}
	w.Swiper = Swiper;
	
	// 拖拽导航
	function DragNav(elementId){
		this.options = {};
		this.options.elementId = elementId;
		this.options.wrap = document.querySelector(elementId + ".nav-wrap"); // 滑屏区域
		this.options.ulNode = document.querySelector(elementId + ".nav-wrap .nav-list"); // 滑动元素
		this.options.minX = this.options.wrap.clientWidth - this.options.ulNode.offsetWidth; // 元素向左滑动有橡皮筋效果的距离
		this.options.lastTime = 0; // 手指在上一次位置的时间
		this.options.lastPoint = 0; // 手指的上一次位置
		this.options.lastPointY = 0; // 手指的上一次位置在y轴的位置 防抖动
		this.options.timeDis = 1; // 时间差距 防NaN
		this.options.pointDis = 0; // 距离差距
		this.options.isX = true; // 首次滑屏方向 防抖动
		this.options.isFirst = true; // 是否是第一次滑屏 防抖动
		this.options.isMove = false; // 是否滑动
		// 滑动事件监听
		addSlideEvet(this.options);
		// 导航点击监听
		addTapEvet(this.options);
		
		// 滑动事件监听
		function addSlideEvet(options){
			options.wrap.addEventListener("touchstart", function(ev){
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				options.ulNode.style.transition = "none";
				options.lastTime = new Date().getTime();
				options.lastPoint = touchC.clientX;
				options.lastPointY = touchC.clientY;
				// 清除速度的残留
				options.pointDis = 0;
				// 防抖动
				options.isX = true;
				options.isFirst = true;
			});
			options.wrap.addEventListener("touchmove", function(ev){
				if(!options.isX) return; // 防抖动
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				var nowTime = new Date().getTime();
				var nowPoint = touchC.clientX;
				var nowPointY = touchC.clientY;
				var pointDisY = nowPointY - options.lastPointY;
				options.timeDis = nowTime - options.lastTime;
				options.pointDis = nowPoint - options.lastPoint;
				options.lastTime = nowTime;
				options.lastPoint = nowPoint;
				if(options.isFirst){
					options.isFirst = false;
					if(Math.abs(pointDisY) > Math.abs(options.pointDis)){
						options.isX = false;
						// 首次防抖动
						return;
					} 
				}
				var translateX = tools.css2D(options.ulNode, "translateX") + options.pointDis;
				/* 
				橡皮筋效果
				在move的过程中 手指滑动平均距离的元素的滑动距离慢慢变小
				*/
				if(translateX > 0){
					var scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + translateX) * 2);
					translateX = tools.css2D(options.ulNode, "translateX") + options.pointDis * scale;
					options.ulNode.handleMove = true;
				}else if(translateX < options.minX){
					var over = options.minX -translateX;
					var scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + over) * 2);
					translateX = tools.css2D(options.ulNode, "translateX") + options.pointDis * scale;
					options.ulNode.handleMove = true;
				}
				tools.css2D(options.ulNode, "translateX", translateX);
			});
			options.wrap.addEventListener("touchend", function(ev){
				ev = ev || event;
				// 速度越大 位移越远
				var speed = Math.abs(options.pointDis / options.timeDis) < 0.5 ? 0 : (options.pointDis / options.timeDis);
				var targetX = tools.css2D(options.ulNode, "translateX") + speed * 200;
				var bsr = "";
				var time = (Math.abs(speed) * 0.2) < 0.8 ? 0.8 : ((Math.abs(speed) * 0.2) > 1.5 ? 1.5 : (Math.abs(speed) * 0.2));
				if(targetX > 0){
					targetX = 0;
					// 处理橡皮筋效果的冲突
					if(!options.ulNode.handleMove){
						bsr = "cubic-bezier(.25,1.71,.73,1.6)";
					}
				}else if(targetX < options.minX){
					targetX = options.minX;
					if(!options.ulNode.handleMove){
						bsr = "cubic-bezier(.25,1.71,.73,1.6)";
					}
				}
				options.ulNode.style.transition = time + "s " + bsr + " transform";
				tools.css2D(options.ulNode, "translateX", targetX);
				options.ulNode.handleMove = false;
			});
		}
		// 导航点击监听
		function addTapEvet(options){
			options.ulNode.addEventListener("touchstart", function(){
				options.isMove = false;
			});
			options.ulNode.addEventListener("touchmove", function(){
				options.isMove = true;
			});
			options.ulNode.addEventListener("touchend", function(ev){
				ev = ev || event;
				if(options.isMove) return;
				var touchC = ev.changedTouches[0];
				tools.removeClass(document.querySelector(options.elementId + " ul li.active"), "active");
				if(touchC.target.nodeName.toUpperCase() === "A"){
					tools.addClass(touchC.target.parentNode, "active")
				}
				if(touchC.target.nodeName.toUpperCase() === "LI"){
					tools.addClass(touchC.target, "active")
				}
			});
		}
	}
	// 销毁实例
	DragNav.prototype.destroy = function(){
		delete this;
	}
	w.DragNav = DragNav;
	
	// 滑屏导航
	var slideNavInit;
	function SlideNav(elementId, callback){
		this.options = {};
		this.options.elementId = elementId; // 组件id
		this.options.tapWrap = document.querySelector(elementId + " .tap-wrap"); //滑动元素
		this.options.contentNode = document.querySelector(elementId + " .tap-content"); // 滑屏区域
		this.options.ulList = document.querySelector(elementId + " .nav-list"); // 列表区域
		this.options.width = this.options.contentNode.getBoundingClientRect().width.toFixed(1); // 滑屏区域的宽
		this.options.startPoint = { x: 0, y: 0 }; // 手指一开始的位置
		this.options.elementPoint = { x: 0, y: 0 };// 元素一开始的位置
		this.options.isX = true; // 防抖动
		this.options.isFirst = true; // 防抖动
		this.options.isOver = false; // 防止多次junmp
		this.options.callback = callback; // 回调函数
		this.options.transitionendHandle; // transitionend回调函数
		this.options.isMove = false; // 点击导航是否滑动
		this.options.isDone = true; // 请求是否执行完毕
		slideNavInit = init;
		// 初始化
		init(this.options);
		// 点击导航监听
		ulListClickEvent(this.options);
		// 滑动事件监听
		addSlideEvet(this.options);
		// 初始化
		function init(options){
			tools.css2D(options.tapWrap, "translateX", -options.width);
			loadingshow(options, false);
		}
		// 点击导航监听
		function ulListClickEvent(options){
			options.ulList.addEventListener("touchstart", function(ev){
				ev = ev || event;
				options.isMove = false;
			});
			options.ulList.addEventListener("touchmove", function(ev){
				ev = ev || event;
				options.isMove = true;
			});
			options.ulList.addEventListener("touchend", function(ev){
				if(options.isMove) return;
				if(!options.isDone) return;
				ev = ev || event;
				var liItems = document.querySelectorAll(options.elementId + " .nav-list li");
				var index = [].indexOf.call(ev.target.parentElement.children, ev.target);
				var liActive = document.querySelector(options.elementId + " .nav-list li.active");
				var activeIndex = [].indexOf.call(liActive.parentElement.children, liActive);
				tools.removeClass(liActive, "active")
				tools.addClass(liItems[index], "active");
				options.tapWrap.style.transition = "1.5s transform";
				index < activeIndex ? tools.css2D(options.tapWrap, "translateX", 0) : tools.css2D(options.tapWrap, "translateX", -options.width * 2);
				// loading显示与隐藏
				loadingshow(options, true);
				// 监听动画执行完毕
				transitionendEvent(options);
				options.isDone = false;
			});
		}
		// 滑动事件监听
		function addSlideEvet(options){
			options.contentNode.addEventListener("touchstart", function(ev){
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				options.startPoint.x = touchC.clientX;
				options.startPoint.y = touchC.clientY;
				options.elementPoint.x = tools.css2D(options.tapWrap, "translateX");
				options.isX = true;
				options.isFirst = true;
				options.isOver = false;
				options.tapWrap.style.transition = "";
			});
			options.contentNode.addEventListener("touchmove", function(ev){
				if(!options.isX) return; // 防抖动
				if(options.isOver) return;
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				var nowPoint = { x: 0, y: 0 };
				nowPoint.x = touchC.clientX;
				nowPoint.y = touchC.clientY;
				var dis = { x: 0, y: 0 };;
				dis.x = nowPoint.x - options.startPoint.x;
				dis.y = nowPoint.y - options.startPoint.y;
				if(options.isFirst){
					options.isFirst = false;
					if(Math.abs(dis.x) < Math.abs(dis.y)){
						options.isX = false;
						return; //首次防抖动
					}
				}
				tools.css2D(options.tapWrap, "translateX", options.elementPoint.x + dis.x);
				// 1/2跳转
				jump(options, dis.x);
			});
			options.contentNode.addEventListener("touchend", function(ev){
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				var nowPointX = touchC.clientX;
				var disX = nowPointX - options.startPoint.x;
				if(Math.abs(disX) <= options.width / 3){
					options.tapWrap.style.transition = "1s transform"
					tools.css2D(options.tapWrap, "translateX", -options.width);
				}
			});
		}
		
		// 1/2跳转
		function jump(options, disX){
			if(Math.abs(disX) > options.width / 3){
				options.isOver = true;
				options.tapWrap.style.transition = "1s transform";
				disX > 0 ? tools.css2D(options.tapWrap, "translateX", 0) : tools.css2D(options.tapWrap, "translateX", -options.width * 2);
				// loading显示与隐藏
				loadingshow(options, true);
				// 改变当前的li项
				liChange(options, disX)
				// 监听动画执行完毕
				transitionendEvent(options)
			}
		}
		
		// 改变当前的li项
		function liChange(options, disX){
			var liItems = document.querySelectorAll(options.elementId + " .nav-list li");
			var liActive = document.querySelector(options.elementId + " .nav-list li.active");
			var index = [].indexOf.call(liActive.parentElement.children, liActive);
			if(disX < 0){
				if(index != liItems.length - 1){
					index ++;
				}else{
					index = 0;
				}
			}else{
				if(index != 0){
					index--;
				}else{
					index = liItems.length - 1;
				}
			}
			tools.removeClass(liActive, "active");
			tools.addClass(liItems[index], "active");
		}
		
		// 监听动画执行完毕
		function transitionendEvent(options){
			// 动画执行完毕之后请求
			options.transitionendHandle = transitionendHandle(options);
			options.tapWrap.addEventListener("transitionend", options.transitionendHandle);
			options.tapWrap.addEventListener("webkitTransitionEnd", options.transitionendHandle);
		}
		
		// 动画执行完毕事件回调函数
		function transitionendHandle(options){
			return function(){
				options.tapWrap.removeEventListener("transitionend", options.transitionendHandle);
				options.tapWrap.addEventListener("webkitTransitionEnd", options.transitionendHandle);
				options.tapWrap.style.transition = "";
				options.callback(document.querySelector(options.elementId + " .nav-list li.active").getAttribute("data-value"));
			}
		}
		
		// loading层的显示与隐藏
		function loadingshow(options, isShow){
			loadings = document.querySelectorAll(options.elementId + " .tap-loading");
			for(var i = 0; i < loadings.length; i++){
				if(isShow){
					loadings[i].style.opacity = 1;
				}else{
					loadings[i].style.opacity = 0;
				}
			}
		}
	}
	// 销毁实例
	SlideNav.prototype.destroy = function(){
		delete this;
	}
	// 回到初始化的位置
	SlideNav.prototype.pullToRefreshDone = function(){
		slideNavInit(this.options);
		this.options.isDone = true;
	}
	w.SlideNav = SlideNav;
	
	// 竖向滑屏
	function VerticalMove(elementId, options){
		this.options = {};
		this.options.elementId = elementId;
		this.options.wrap = document.querySelector(elementId); // 滑屏区域
		this.options.moveItem = this.options.wrap.querySelector(".content-block"); // 滑动元素
		this.options.minY = this.options.wrap.clientHeight - this.options.moveItem.offsetHeight; // 元素向左滑动有橡皮筋效果的距离
		this.options.lastTime = 0; // 手指在上一次位置的时间
		this.options.lastPoint = 0; // 手指的上一次位置
		this.options.lastPointX = 0; // 手指的上一次位置在y轴的位置 防抖动
		this.options.timeDis = 1; // 时间差距 防NaN
		this.options.pointDis = 0; // 距离差距
		this.options.isY = true; // 首次滑屏方向 防抖动
		this.options.isFirst = true; // 是否是第一次滑屏 防抖动
		this.options.isMove = false; // 点击触发插件元素的时候是否滑动
		this.options.forbitTopBackRubberBanding = false; // 禁止手动滑屏头部回弹
		this.options.forbitBottomBackRubberBanding = false; // 禁止手动滑屏底部回弹
		this.options.forbitBottomRubberBanding = false; // 禁止手动滑屏底部橡皮筋效果 
		this.options.clearTimer = 0; // 快速滑屏无限循环
		if(typeof options === 'object') tools.extend(this.options, options);
		// 插件初始化
		init(this.options)
		// 滑动事件监听
		addSlideEvet(this.options);
		
		// 插件初始化
		function init(options){
			tools.css2D(options.moveItem, "translateZ" , 0);
		}
	
		// 滑动事件监听
		function addSlideEvet(options){
			options.wrap.addEventListener("touchstart", function(ev){
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				options.minY = options.wrap.clientHeight - options.moveItem.offsetHeight;
				options.moveItem.style.transition = "none";
				options.lastTime = new Date().getTime();
				options.lastPoint = touchC.clientY;
				options.lastPointX = touchC.clientX;
				// 清除速度的残留
				options.pointDis = 0;
				// 防抖动
				options.isY = true;
				options.isFirst = true;
				// 即点即停
				clearInterval(options.clearTimer);
				// touchstart回调
				if(options.startCallback && typeof options.startCallback === "function") options.startCallback(options);
			});
			options.wrap.addEventListener("touchmove", function(ev){
				if(!options.isY) return; // 防抖动
				ev = ev || event;
				var touchC = ev.changedTouches[0];
				var nowTime = new Date().getTime();
				var nowPoint = touchC.clientY;
				var nowPointX = touchC.clientX;
				var pointDisX = nowPointX - options.lastPointX;
				options.timeDis = nowTime - options.lastTime;
				options.pointDis = nowPoint - options.lastPoint;
				options.lastTime = nowTime;
				options.lastPoint = nowPoint;
				if(options.isFirst){
					options.isFirst = false;
					if(Math.abs(pointDisX) > Math.abs(options.pointDis)){
						options.isY = false;
						// 首次防抖动
						return;
					} 
				}
				// 当滑动区域小于滑屏区域时且forbitTopBackRubberBanding为false时，禁止向上的滑屏
				if(options.pointDis >= 0 && options.minY > 0 && !options.forbitTopBackRubberBanding) return;
				// 当滑动区域小于滑屏区域时，禁止向下的滑屏
				if(options.pointDis <= 0 && options.minY > 0) return;
				var translateY = tools.css2D(options.moveItem, "translateY") + options.pointDis;
				/* 
				手动滑屏橡皮筋效果
				在move的过程中 手指滑动平均距离的元素的滑动距离慢慢变小
				*/
				if(translateY > 0){  // 手动滑动头部橡皮筋效果
					var scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + translateY) * 2);
					translateY = tools.css2D(options.moveItem, "translateY") + options.pointDis * scale;
					options.moveItem.handleMove = true;
				}else if(translateY < options.minY){ // 手动滑动底部橡皮筋效果
					// 禁止手动滑屏底部橡皮筋效果
					if(options.forbitBottomRubberBanding) return;
					var over = options.minY -translateY;
					var scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + over) * 2);
					translateY = tools.css2D(options.moveItem, "translateY") + options.pointDis * scale;
					options.moveItem.handleMove = true;
				}
				tools.css2D(options.moveItem, "translateY", translateY);
				// touchmove回调(手动滑屏)
				if(options.moveCallback && typeof options.moveCallback === "function") options.moveCallback(options);
			});
			options.wrap.addEventListener("touchend", function(ev){
				// 当滑动区域小于滑屏区域时且forbitTopBackRubberBanding为false时，禁止向上的滑屏
				if(options.pointDis >= 0 && options.minY > 0 && !options.forbitTopBackRubberBanding) return;
				// 当滑动区域小于滑屏区域时，禁止向下的滑屏
				if(options.pointDis <= 0 && options.minY > 0) return;
				ev = ev || event;
				// 快速滑屏 速度越大 位移越远
				var speed = Math.abs(options.pointDis / options.timeDis) < 0.5 ? 0 : (options.pointDis / options.timeDis);
				var targetY = tools.css2D(options.moveItem, "translateY") + speed * 200;
				var time = (Math.abs(speed) * 0.2) < 0.6 ? 0.6 : ((Math.abs(speed) * 0.2) > 1 ? 1 : (Math.abs(speed) * 0.2));
				var type = "Linear";
				if(targetY > 0){ // 拉到了头顶
					// 禁止手动滑屏头部回弹
					if(options.forbitTopBackRubberBanding){
						if(options.endCallback && typeof options.endCallback === "function") options.endCallback(options);
						return;
					}
					targetY = 0;
					if(!options.moveItem.handleMove){ // 手动滑动头部回弹橡皮筋效果
						type = "Back";
					}
				}else if(targetY < options.minY){ // 拉到了底部
					// 禁止手动滑屏底部回弹
					if(options.forbitBottomBackRubberBanding){
						if(options.endCallback && typeof options.endCallback === "function") options.endCallback(options);
						return;
					}
					targetY = options.minY;
					if(!options.moveItem.handleMove){ // 手动滑动底部回弹橡皮筋效果
						type = "Back";
					}
				}
				bsr(options, targetY, time, type);
				options.moveItem.handleMove = false;
			 
			});
		}
		
		// 运动轨迹
		function bsr(options,targetY, time, type){
			clearInterval(options.clearTimer);
			var t = 0; // 当前次数
			var b = tools.css2D(options.moveItem, "translateY"); // 初始位置
			var c = targetY - b; // 最终位置-初始位置
			var d = time*1000 / (1000/60); // 总次数
			options.clearTimer = setInterval(function(){
				t++;
				if(t > d){
					clearInterval(options.clearTimer);
					// touchend回调
					if(options.endCallback && typeof options.endCallback === "function") options.endCallback(options);
					return;
				}
				var point = tools.Tween[type](t, b, c, d)
				tools.css2D(options.moveItem, "translateY", point);
				// touchmove回调(快速滑屏)
				if(options.moveCallback && typeof options.moveCallback === "function") options.moveCallback(options);
			}, 1000/60);
		}
	}

	// 销毁实例
	VerticalMove.prototype.destroy = function(){
		delete this;
	}
	w.VerticalMove = VerticalMove;
	
	// 日期选择器
	function DatePicker(elementId, options){
		this.options = {};
		this.options.elementId = elementId;
		this.options.startDate = "2009-01-01";
		this.options.endDate = "2029-12-31";   
		if(typeof options === 'object') tools.extend(this.options, options);
		if(new Date(this.options.startDate) >= new Date(this.options.endDate)) return;
		var data = tools.getDateArr(this.options.startDate, this.options.endDate);
		new Picker(elementId, data, _endCallback, {connector: "-"});
		// 滑动结束回调函数
		function _endCallback(options){
			var childNodes = document.querySelector(options.elementId).parentNode.childNodes;
			if(document.querySelector(options.elementId) == childNodes[0]) return;
			var year = childNodes[0].querySelector(".picker-slot-content-item.selected").getAttribute("data-key");
			var month = childNodes[1].querySelector(".picker-slot-content-item.selected").getAttribute("data-key");
			var days = tools.mGetDate(year, month);
			var oldDays = childNodes[2].querySelectorAll(".picker-slot-content-item").length;
			if(days == oldDays) return;
			if(days < oldDays){
				var nowPoint = tools.css2D(childNodes[2].querySelector(".picker-slot-content"), "translateY");
				var height = childNodes[2].querySelector(".picker-slot-content-item").offsetHeight;
				for(var i = oldDays - 1 ; i >= days; i--){
					childNodes[2].childNodes[0].removeChild(childNodes[2].querySelectorAll(".picker-slot-content-item")[i])
				}
				if(height*4 - childNodes[2].querySelector(".picker-slot-content").offsetHeight > nowPoint){
					tools.css2D(childNodes[2].querySelector(".picker-slot-content"), "translateY",  height*4 - childNodes[2].querySelector(".picker-slot-content").offsetHeight)
				} 
			}
			if(days > oldDays){
				for(var i = oldDays; i < days; i++){
					var str = '<div class="picker-slot-content-item" data-key="' + (i+1) + '">' +  (i+1) + '</div>';
					childNodes[2].childNodes[0].appendChild(tools.parseDom(str));
				}
			}
		}
	}
	// 销毁实例
	DatePicker.prototype.destroy = function(){
		delete this;
	}
	w.DatePicker = DatePicker;
	
	var cityData = {"110000":{"name":"北京市","child":{"110100":{"name":"市辖区","child":{"110101":"东城区","110102":"西城区","110105":"朝阳区","110106":"丰台区","110107":"石景山区","110108":"海淀区","110109":"门头沟区","110111":"房山区","110112":"通州区","110113":"顺义区","110114":"昌平区","110115":"大兴区","110116":"怀柔区","110117":"平谷区","110118":"密云区","110119":"延庆区"}}}},"120000":{"name":"天津市","child":{"120100":{"name":"市辖区","child":{"120101":"和平区","120102":"河东区","120103":"河西区","120104":"南开区","120105":"河北区","120106":"红桥区","120110":"东丽区","120111":"西青区","120112":"津南区","120113":"北辰区","120114":"武清区","120115":"宝坻区","120116":"滨海新区","120117":"宁河区","120118":"静海区","120119":"蓟州区"}}}},"130000":{"name":"河北省","child":{"130100":{"name":"石家庄市","child":{"130101":"市辖区","130102":"长安区","130104":"桥西区","130105":"新华区","130107":"井陉矿区","130108":"裕华区","130109":"藁城区","130110":"鹿泉区","130111":"栾城区","130121":"井陉县","130123":"正定县","130125":"行唐县","130126":"灵寿县","130127":"高邑县","130128":"深泽县","130129":"赞皇县","130130":"无极县","130131":"平山县","130132":"元氏县","130133":"赵县","130183":"晋州市","130184":"新乐市"}},"130200":{"name":"唐山市","child":{"130201":"市辖区","130202":"路南区","130203":"路北区","130204":"古冶区","130205":"开平区","130207":"丰南区","130208":"丰润区","130209":"曹妃甸区","130223":"滦县","130224":"滦南县","130225":"乐亭县","130227":"迁西县","130229":"玉田县","130281":"遵化市","130283":"迁安市"}},"130300":{"name":"秦皇岛市","child":{"130301":"市辖区","130302":"海港区","130303":"山海关区","130304":"北戴河区","130306":"抚宁区","130321":"青龙满族自治县","130322":"昌黎县","130324":"卢龙县"}},"130400":{"name":"邯郸市","child":{"130401":"市辖区","130402":"邯山区","130403":"丛台区","130404":"复兴区","130406":"峰峰矿区","130421":"邯郸县","130423":"临漳县","130424":"成安县","130425":"大名县","130426":"涉县","130427":"磁县","130428":"肥乡县","130429":"永年县","130430":"邱县","130431":"鸡泽县","130432":"广平县","130433":"馆陶县","130434":"魏县","130435":"曲周县","130481":"武安市"}},"130500":{"name":"邢台市","child":{"130501":"市辖区","130502":"桥东区","130503":"桥西区","130521":"邢台县","130522":"临城县","130523":"内丘县","130524":"柏乡县","130525":"隆尧县","130526":"任县","130527":"南和县","130528":"宁晋县","130529":"巨鹿县","130530":"新河县","130531":"广宗县","130532":"平乡县","130533":"威县","130534":"清河县","130535":"临西县","130581":"南宫市","130582":"沙河市"}},"130600":{"name":"保定市","child":{"130601":"市辖区","130602":"竞秀区","130606":"莲池区","130607":"满城区","130608":"清苑区","130609":"徐水区","130623":"涞水县","130624":"阜平县","130626":"定兴县","130627":"唐县","130628":"高阳县","130629":"容城县","130630":"涞源县","130631":"望都县","130632":"安新县","130633":"易县","130634":"曲阳县","130635":"蠡县","130636":"顺平县","130637":"博野县","130638":"雄县","130681":"涿州市","130683":"安国市","130684":"高碑店市"}},"130700":{"name":"张家口市","child":{"130701":"市辖区","130702":"桥东区","130703":"桥西区","130705":"宣化区","130706":"下花园区","130708":"万全区","130709":"崇礼区","130722":"张北县","130723":"康保县","130724":"沽源县","130725":"尚义县","130726":"蔚县","130727":"阳原县","130728":"怀安县","130730":"怀来县","130731":"涿鹿县","130732":"赤城县"}},"130800":{"name":"承德市","child":{"130801":"市辖区","130802":"双桥区","130803":"双滦区","130804":"鹰手营子矿区","130821":"承德县","130822":"兴隆县","130823":"平泉县","130824":"滦平县","130825":"隆化县","130826":"丰宁满族自治县","130827":"宽城满族自治县","130828":"围场满族蒙古族自治县"}},"130900":{"name":"沧州市","child":{"130901":"市辖区","130902":"新华区","130903":"运河区","130921":"沧县","130922":"青县","130923":"东光县","130924":"海兴县","130925":"盐山县","130926":"肃宁县","130927":"南皮县","130928":"吴桥县","130929":"献县","130930":"孟村回族自治县","130981":"泊头市","130982":"任丘市","130983":"黄骅市","130984":"河间市"}},"131000":{"name":"廊坊市","child":{"131001":"市辖区","131002":"安次区","131003":"广阳区","131022":"固安县","131023":"永清县","131024":"香河县","131025":"大城县","131026":"文安县","131028":"大厂回族自治县","131081":"霸州市","131082":"三河市"}},"131100":{"name":"衡水市","child":{"131101":"市辖区","131102":"桃城区","131103":"冀州区","131121":"枣强县","131122":"武邑县","131123":"武强县","131124":"饶阳县","131125":"安平县","131126":"故城县","131127":"景县","131128":"阜城县","131182":"深州市"}},"139000":{"name":"省直辖县级行政区划","child":{"139001":"定州市","139002":"辛集市"}}}},"140000":{"name":"山西省","child":{"140100":{"name":"太原市","child":{"140101":"市辖区","140105":"小店区","140106":"迎泽区","140107":"杏花岭区","140108":"尖草坪区","140109":"万柏林区","140110":"晋源区","140121":"清徐县","140122":"阳曲县","140123":"娄烦县","140181":"古交市"}},"140200":{"name":"大同市","child":{"140201":"市辖区","140202":"城区","140203":"矿区","140211":"南郊区","140212":"新荣区","140221":"阳高县","140222":"天镇县","140223":"广灵县","140224":"灵丘县","140225":"浑源县","140226":"左云县","140227":"大同县"}},"140300":{"name":"阳泉市","child":{"140301":"市辖区","140302":"城区","140303":"矿区","140311":"郊区","140321":"平定县","140322":"盂县"}},"140400":{"name":"长治市","child":{"140401":"市辖区","140402":"城区","140411":"郊区","140421":"长治县","140423":"襄垣县","140424":"屯留县","140425":"平顺县","140426":"黎城县","140427":"壶关县","140428":"长子县","140429":"武乡县","140430":"沁县","140431":"沁源县","140481":"潞城市"}},"140500":{"name":"晋城市","child":{"140501":"市辖区","140502":"城区","140521":"沁水县","140522":"阳城县","140524":"陵川县","140525":"泽州县","140581":"高平市"}},"140600":{"name":"朔州市","child":{"140601":"市辖区","140602":"朔城区","140603":"平鲁区","140621":"山阴县","140622":"应县","140623":"右玉县","140624":"怀仁县"}},"140700":{"name":"晋中市","child":{"140701":"市辖区","140702":"榆次区","140721":"榆社县","140722":"左权县","140723":"和顺县","140724":"昔阳县","140725":"寿阳县","140726":"太谷县","140727":"祁县","140728":"平遥县","140729":"灵石县","140781":"介休市"}},"140800":{"name":"运城市","child":{"140801":"市辖区","140802":"盐湖区","140821":"临猗县","140822":"万荣县","140823":"闻喜县","140824":"稷山县","140825":"新绛县","140826":"绛县","140827":"垣曲县","140828":"夏县","140829":"平陆县","140830":"芮城县","140881":"永济市","140882":"河津市"}},"140900":{"name":"忻州市","child":{"140901":"市辖区","140902":"忻府区","140921":"定襄县","140922":"五台县","140923":"代县","140924":"繁峙县","140925":"宁武县","140926":"静乐县","140927":"神池县","140928":"五寨县","140929":"岢岚县","140930":"河曲县","140931":"保德县","140932":"偏关县","140981":"原平市"}},"141000":{"name":"临汾市","child":{"141001":"市辖区","141002":"尧都区","141021":"曲沃县","141022":"翼城县","141023":"襄汾县","141024":"洪洞县","141025":"古县","141026":"安泽县","141027":"浮山县","141028":"吉县","141029":"乡宁县","141030":"大宁县","141031":"隰县","141032":"永和县","141033":"蒲县","141034":"汾西县","141081":"侯马市","141082":"霍州市"}},"141100":{"name":"吕梁市","child":{"141101":"市辖区","141102":"离石区","141121":"文水县","141122":"交城县","141123":"兴县","141124":"临县","141125":"柳林县","141126":"石楼县","141127":"岚县","141128":"方山县","141129":"中阳县","141130":"交口县","141181":"孝义市","141182":"汾阳市"}}}},"150000":{"name":"内蒙古自治区","child":{"150100":{"name":"呼和浩特市","child":{"150101":"市辖区","150102":"新城区","150103":"回民区","150104":"玉泉区","150105":"赛罕区","150121":"土默特左旗","150122":"托克托县","150123":"和林格尔县","150124":"清水河县","150125":"武川县"}},"150200":{"name":"包头市","child":{"150201":"市辖区","150202":"东河区","150203":"昆都仑区","150204":"青山区","150205":"石拐区","150206":"白云鄂博矿区","150207":"九原区","150221":"土默特右旗","150222":"固阳县","150223":"达尔罕茂明安联合旗"}},"150300":{"name":"乌海市","child":{"150301":"市辖区","150302":"海勃湾区","150303":"海南区","150304":"乌达区"}},"150400":{"name":"赤峰市","child":{"150401":"市辖区","150402":"红山区","150403":"元宝山区","150404":"松山区","150421":"阿鲁科尔沁旗","150422":"巴林左旗","150423":"巴林右旗","150424":"林西县","150425":"克什克腾旗","150426":"翁牛特旗","150428":"喀喇沁旗","150429":"宁城县","150430":"敖汉旗"}},"150500":{"name":"通辽市","child":{"150501":"市辖区","150502":"科尔沁区","150521":"科尔沁左翼中旗","150522":"科尔沁左翼后旗","150523":"开鲁县","150524":"库伦旗","150525":"奈曼旗","150526":"扎鲁特旗","150581":"霍林郭勒市"}},"150600":{"name":"鄂尔多斯市","child":{"150601":"市辖区","150602":"东胜区","150603":"康巴什区","150621":"达拉特旗","150622":"准格尔旗","150623":"鄂托克前旗","150624":"鄂托克旗","150625":"杭锦旗","150626":"乌审旗","150627":"伊金霍洛旗"}},"150700":{"name":"呼伦贝尔市","child":{"150701":"市辖区","150702":"海拉尔区","150703":"扎赉诺尔区","150721":"阿荣旗","150722":"莫力达瓦达斡尔族自治旗","150723":"鄂伦春自治旗","150724":"鄂温克族自治旗","150725":"陈巴尔虎旗","150726":"新巴尔虎左旗","150727":"新巴尔虎右旗","150781":"满洲里市","150782":"牙克石市","150783":"扎兰屯市","150784":"额尔古纳市","150785":"根河市"}},"150800":{"name":"巴彦淖尔市","child":{"150801":"市辖区","150802":"临河区","150821":"五原县","150822":"磴口县","150823":"乌拉特前旗","150824":"乌拉特中旗","150825":"乌拉特后旗","150826":"杭锦后旗"}},"150900":{"name":"乌兰察布市","child":{"150901":"市辖区","150902":"集宁区","150921":"卓资县","150922":"化德县","150923":"商都县","150924":"兴和县","150925":"凉城县","150926":"察哈尔右翼前旗","150927":"察哈尔右翼中旗","150928":"察哈尔右翼后旗","150929":"四子王旗","150981":"丰镇市"}},"152200":{"name":"兴安盟","child":{"152201":"乌兰浩特市","152202":"阿尔山市","152221":"科尔沁右翼前旗","152222":"科尔沁右翼中旗","152223":"扎赉特旗","152224":"突泉县"}},"152500":{"name":"锡林郭勒盟","child":{"152501":"二连浩特市","152502":"锡林浩特市","152522":"阿巴嘎旗","152523":"苏尼特左旗","152524":"苏尼特右旗","152525":"东乌珠穆沁旗","152526":"西乌珠穆沁旗","152527":"太仆寺旗","152528":"镶黄旗","152529":"正镶白旗","152530":"正蓝旗","152531":"多伦县"}},"152900":{"name":"阿拉善盟","child":{"152921":"阿拉善左旗","152922":"阿拉善右旗","152923":"额济纳旗"}}}},"210000":{"name":"辽宁省","child":{"210100":{"name":"沈阳市","child":{"210101":"市辖区","210102":"和平区","210103":"沈河区","210104":"大东区","210105":"皇姑区","210106":"铁西区","210111":"苏家屯区","210112":"浑南区","210113":"沈北新区","210114":"于洪区","210115":"辽中区","210123":"康平县","210124":"法库县","210181":"新民市"}},"210200":{"name":"大连市","child":{"210201":"市辖区","210202":"中山区","210203":"西岗区","210204":"沙河口区","210211":"甘井子区","210212":"旅顺口区","210213":"金州区","210214":"普兰店区","210224":"长海县","210281":"瓦房店市","210283":"庄河市"}},"210300":{"name":"鞍山市","child":{"210301":"市辖区","210302":"铁东区","210303":"铁西区","210304":"立山区","210311":"千山区","210321":"台安县","210323":"岫岩满族自治县","210381":"海城市"}},"210400":{"name":"抚顺市","child":{"210401":"市辖区","210402":"新抚区","210403":"东洲区","210404":"望花区","210411":"顺城区","210421":"抚顺县","210422":"新宾满族自治县","210423":"清原满族自治县"}},"210500":{"name":"本溪市","child":{"210501":"市辖区","210502":"平山区","210503":"溪湖区","210504":"明山区","210505":"南芬区","210521":"本溪满族自治县","210522":"桓仁满族自治县"}},"210600":{"name":"丹东市","child":{"210601":"市辖区","210602":"元宝区","210603":"振兴区","210604":"振安区","210624":"宽甸满族自治县","210681":"东港市","210682":"凤城市"}},"210700":{"name":"锦州市","child":{"210701":"市辖区","210702":"古塔区","210703":"凌河区","210711":"太和区","210726":"黑山县","210727":"义县","210781":"凌海市","210782":"北镇市"}},"210800":{"name":"营口市","child":{"210801":"市辖区","210802":"站前区","210803":"西市区","210804":"鲅鱼圈区","210811":"老边区","210881":"盖州市","210882":"大石桥市"}},"210900":{"name":"阜新市","child":{"210901":"市辖区","210902":"海州区","210903":"新邱区","210904":"太平区","210905":"清河门区","210911":"细河区","210921":"阜新蒙古族自治县","210922":"彰武县"}},"211000":{"name":"辽阳市","child":{"211001":"市辖区","211002":"白塔区","211003":"文圣区","211004":"宏伟区","211005":"弓长岭区","211011":"太子河区","211021":"辽阳县","211081":"灯塔市"}},"211100":{"name":"盘锦市","child":{"211101":"市辖区","211102":"双台子区","211103":"兴隆台区","211104":"大洼区","211122":"盘山县"}},"211200":{"name":"铁岭市","child":{"211201":"市辖区","211202":"银州区","211204":"清河区","211221":"铁岭县","211223":"西丰县","211224":"昌图县","211281":"调兵山市","211282":"开原市"}},"211300":{"name":"朝阳市","child":{"211301":"市辖区","211302":"双塔区","211303":"龙城区","211321":"朝阳县","211322":"建平县","211324":"喀喇沁左翼蒙古族自治县","211381":"北票市","211382":"凌源市"}},"211400":{"name":"葫芦岛市","child":{"211401":"市辖区","211402":"连山区","211403":"龙港区","211404":"南票区","211421":"绥中县","211422":"建昌县","211481":"兴城市"}}}},"220000":{"name":"吉林省","child":{"220100":{"name":"长春市","child":{"220101":"市辖区","220102":"南关区","220103":"宽城区","220104":"朝阳区","220105":"二道区","220106":"绿园区","220112":"双阳区","220113":"九台区","220122":"农安县","220182":"榆树市","220183":"德惠市"}},"220200":{"name":"吉林市","child":{"220201":"市辖区","220202":"昌邑区","220203":"龙潭区","220204":"船营区","220211":"丰满区","220221":"永吉县","220281":"蛟河市","220282":"桦甸市","220283":"舒兰市","220284":"磐石市"}},"220300":{"name":"四平市","child":{"220301":"市辖区","220302":"铁西区","220303":"铁东区","220322":"梨树县","220323":"伊通满族自治县","220381":"公主岭市","220382":"双辽市"}},"220400":{"name":"辽源市","child":{"220401":"市辖区","220402":"龙山区","220403":"西安区","220421":"东丰县","220422":"东辽县"}},"220500":{"name":"通化市","child":{"220501":"市辖区","220502":"东昌区","220503":"二道江区","220521":"通化县","220523":"辉南县","220524":"柳河县","220581":"梅河口市","220582":"集安市"}},"220600":{"name":"白山市","child":{"220601":"市辖区","220602":"浑江区","220605":"江源区","220621":"抚松县","220622":"靖宇县","220623":"长白朝鲜族自治县","220681":"临江市"}},"220700":{"name":"松原市","child":{"220701":"市辖区","220702":"宁江区","220721":"前郭尔罗斯蒙古族自治县","220722":"长岭县","220723":"乾安县","220781":"扶余市"}},"220800":{"name":"白城市","child":{"220801":"市辖区","220802":"洮北区","220821":"镇赉县","220822":"通榆县","220881":"洮南市","220882":"大安市"}},"222400":{"name":"延边朝鲜族自治州","child":{"222401":"延吉市","222402":"图们市","222403":"敦化市","222404":"珲春市","222405":"龙井市","222406":"和龙市","222424":"汪清县","222426":"安图县"}}}},"230000":{"name":"黑龙江省","child":{"230100":{"name":"哈尔滨市","child":{"230101":"市辖区","230102":"道里区","230103":"南岗区","230104":"道外区","230108":"平房区","230109":"松北区","230110":"香坊区","230111":"呼兰区","230112":"阿城区","230113":"双城区","230123":"依兰县","230124":"方正县","230125":"宾县","230126":"巴彦县","230127":"木兰县","230128":"通河县","230129":"延寿县","230183":"尚志市","230184":"五常市"}},"230200":{"name":"齐齐哈尔市","child":{"230201":"市辖区","230202":"龙沙区","230203":"建华区","230204":"铁锋区","230205":"昂昂溪区","230206":"富拉尔基区","230207":"碾子山区","230208":"梅里斯达斡尔族区","230221":"龙江县","230223":"依安县","230224":"泰来县","230225":"甘南县","230227":"富裕县","230229":"克山县","230230":"克东县","230231":"拜泉县","230281":"讷河市"}},"230300":{"name":"鸡西市","child":{"230301":"市辖区","230302":"鸡冠区","230303":"恒山区","230304":"滴道区","230305":"梨树区","230306":"城子河区","230307":"麻山区","230321":"鸡东县","230381":"虎林市","230382":"密山市"}},"230400":{"name":"鹤岗市","child":{"230401":"市辖区","230402":"向阳区","230403":"工农区","230404":"南山区","230405":"兴安区","230406":"东山区","230407":"兴山区","230421":"萝北县","230422":"绥滨县"}},"230500":{"name":"双鸭山市","child":{"230501":"市辖区","230502":"尖山区","230503":"岭东区","230505":"四方台区","230506":"宝山区","230521":"集贤县","230522":"友谊县","230523":"宝清县","230524":"饶河县"}},"230600":{"name":"大庆市","child":{"230601":"市辖区","230602":"萨尔图区","230603":"龙凤区","230604":"让胡路区","230605":"红岗区","230606":"大同区","230621":"肇州县","230622":"肇源县","230623":"林甸县","230624":"杜尔伯特蒙古族自治县"}},"230700":{"name":"伊春市","child":{"230701":"市辖区","230702":"伊春区","230703":"南岔区","230704":"友好区","230705":"西林区","230706":"翠峦区","230707":"新青区","230708":"美溪区","230709":"金山屯区","230710":"五营区","230711":"乌马河区","230712":"汤旺河区","230713":"带岭区","230714":"乌伊岭区","230715":"红星区","230716":"上甘岭区","230722":"嘉荫县","230781":"铁力市"}},"230800":{"name":"佳木斯市","child":{"230801":"市辖区","230803":"向阳区","230804":"前进区","230805":"东风区","230811":"郊区","230822":"桦南县","230826":"桦川县","230828":"汤原县","230881":"同江市","230882":"富锦市","230883":"抚远市"}},"230900":{"name":"七台河市","child":{"230901":"市辖区","230902":"新兴区","230903":"桃山区","230904":"茄子河区","230921":"勃利县"}},"231000":{"name":"牡丹江市","child":{"231001":"市辖区","231002":"东安区","231003":"阳明区","231004":"爱民区","231005":"西安区","231025":"林口县","231081":"绥芬河市","231083":"海林市","231084":"宁安市","231085":"穆棱市","231086":"东宁市"}},"231100":{"name":"黑河市","child":{"231101":"市辖区","231102":"爱辉区","231121":"嫩江县","231123":"逊克县","231124":"孙吴县","231181":"北安市","231182":"五大连池市"}},"231200":{"name":"绥化市","child":{"231201":"市辖区","231202":"北林区","231221":"望奎县","231222":"兰西县","231223":"青冈县","231224":"庆安县","231225":"明水县","231226":"绥棱县","231281":"安达市","231282":"肇东市","231283":"海伦市"}},"232700":{"name":"大兴安岭地区","child":{"232721":"呼玛县","232722":"塔河县","232723":"漠河县"}}}},"310000":{"name":"上海市","child":{"310100":{"name":"市辖区","child":{"310101":"黄浦区","310104":"徐汇区","310105":"长宁区","310106":"静安区","310107":"普陀区","310109":"虹口区","310110":"杨浦区","310112":"闵行区","310113":"宝山区","310114":"嘉定区","310115":"浦东新区","310116":"金山区","310117":"松江区","310118":"青浦区","310120":"奉贤区","310151":"崇明区"}}}},"320000":{"name":"江苏省","child":{"320100":{"name":"南京市","child":{"320101":"市辖区","320102":"玄武区","320104":"秦淮区","320105":"建邺区","320106":"鼓楼区","320111":"浦口区","320113":"栖霞区","320114":"雨花台区","320115":"江宁区","320116":"六合区","320117":"溧水区","320118":"高淳区"}},"320200":{"name":"无锡市","child":{"320201":"市辖区","320205":"锡山区","320206":"惠山区","320211":"滨湖区","320213":"梁溪区","320214":"新吴区","320281":"江阴市","320282":"宜兴市"}},"320300":{"name":"徐州市","child":{"320301":"市辖区","320302":"鼓楼区","320303":"云龙区","320305":"贾汪区","320311":"泉山区","320312":"铜山区","320321":"丰县","320322":"沛县","320324":"睢宁县","320381":"新沂市","320382":"邳州市"}},"320400":{"name":"常州市","child":{"320401":"市辖区","320402":"天宁区","320404":"钟楼区","320411":"新北区","320412":"武进区","320413":"金坛区","320481":"溧阳市"}},"320500":{"name":"苏州市","child":{"320501":"市辖区","320505":"虎丘区","320506":"吴中区","320507":"相城区","320508":"姑苏区","320509":"吴江区","320581":"常熟市","320582":"张家港市","320583":"昆山市","320585":"太仓市"}},"320600":{"name":"南通市","child":{"320601":"市辖区","320602":"崇川区","320611":"港闸区","320612":"通州区","320621":"海安县","320623":"如东县","320681":"启东市","320682":"如皋市","320684":"海门市"}},"320700":{"name":"连云港市","child":{"320701":"市辖区","320703":"连云区","320706":"海州区","320707":"赣榆区","320722":"东海县","320723":"灌云县","320724":"灌南县"}},"320800":{"name":"淮安市","child":{"320801":"市辖区","320803":"淮安区","320804":"淮阴区","320812":"清江浦区","320813":"洪泽区","320826":"涟水县","320830":"盱眙县","320831":"金湖县"}},"320900":{"name":"盐城市","child":{"320901":"市辖区","320902":"亭湖区","320903":"盐都区","320904":"大丰区","320921":"响水县","320922":"滨海县","320923":"阜宁县","320924":"射阳县","320925":"建湖县","320981":"东台市"}},"321000":{"name":"扬州市","child":{"321001":"市辖区","321002":"广陵区","321003":"邗江区","321012":"江都区","321023":"宝应县","321081":"仪征市","321084":"高邮市"}},"321100":{"name":"镇江市","child":{"321101":"市辖区","321102":"京口区","321111":"润州区","321112":"丹徒区","321181":"丹阳市","321182":"扬中市","321183":"句容市"}},"321200":{"name":"泰州市","child":{"321201":"市辖区","321202":"海陵区","321203":"高港区","321204":"姜堰区","321281":"兴化市","321282":"靖江市","321283":"泰兴市"}},"321300":{"name":"宿迁市","child":{"321301":"市辖区","321302":"宿城区","321311":"宿豫区","321322":"沭阳县","321323":"泗阳县","321324":"泗洪县"}}}},"330000":{"name":"浙江省","child":{"330100":{"name":"杭州市","child":{"330101":"市辖区","330102":"上城区","330103":"下城区","330104":"江干区","330105":"拱墅区","330106":"西湖区","330108":"滨江区","330109":"萧山区","330110":"余杭区","330111":"富阳区","330122":"桐庐县","330127":"淳安县","330182":"建德市","330185":"临安市"}},"330200":{"name":"宁波市","child":{"330201":"市辖区","330203":"海曙区","330204":"江东区","330205":"江北区","330206":"北仑区","330211":"镇海区","330212":"鄞州区","330225":"象山县","330226":"宁海县","330281":"余姚市","330282":"慈溪市","330283":"奉化市"}},"330300":{"name":"温州市","child":{"330301":"市辖区","330302":"鹿城区","330303":"龙湾区","330304":"瓯海区","330305":"洞头区","330324":"永嘉县","330326":"平阳县","330327":"苍南县","330328":"文成县","330329":"泰顺县","330381":"瑞安市","330382":"乐清市"}},"330400":{"name":"嘉兴市","child":{"330401":"市辖区","330402":"南湖区","330411":"秀洲区","330421":"嘉善县","330424":"海盐县","330481":"海宁市","330482":"平湖市","330483":"桐乡市"}},"330500":{"name":"湖州市","child":{"330501":"市辖区","330502":"吴兴区","330503":"南浔区","330521":"德清县","330522":"长兴县","330523":"安吉县"}},"330600":{"name":"绍兴市","child":{"330601":"市辖区","330602":"越城区","330603":"柯桥区","330604":"上虞区","330624":"新昌县","330681":"诸暨市","330683":"嵊州市"}},"330700":{"name":"金华市","child":{"330701":"市辖区","330702":"婺城区","330703":"金东区","330723":"武义县","330726":"浦江县","330727":"磐安县","330781":"兰溪市","330782":"义乌市","330783":"东阳市","330784":"永康市"}},"330800":{"name":"衢州市","child":{"330801":"市辖区","330802":"柯城区","330803":"衢江区","330822":"常山县","330824":"开化县","330825":"龙游县","330881":"江山市"}},"330900":{"name":"舟山市","child":{"330901":"市辖区","330902":"定海区","330903":"普陀区","330921":"岱山县","330922":"嵊泗县"}},"331000":{"name":"台州市","child":{"331001":"市辖区","331002":"椒江区","331003":"黄岩区","331004":"路桥区","331021":"玉环县","331022":"三门县","331023":"天台县","331024":"仙居县","331081":"温岭市","331082":"临海市"}},"331100":{"name":"丽水市","child":{"331101":"市辖区","331102":"莲都区","331121":"青田县","331122":"缙云县","331123":"遂昌县","331124":"松阳县","331125":"云和县","331126":"庆元县","331127":"景宁畲族自治县","331181":"龙泉市"}}}},"340000":{"name":"安徽省","child":{"340100":{"name":"合肥市","child":{"340101":"市辖区","340102":"瑶海区","340103":"庐阳区","340104":"蜀山区","340111":"包河区","340121":"长丰县","340122":"肥东县","340123":"肥西县","340124":"庐江县","340181":"巢湖市"}},"340200":{"name":"芜湖市","child":{"340201":"市辖区","340202":"镜湖区","340203":"弋江区","340207":"鸠江区","340208":"三山区","340221":"芜湖县","340222":"繁昌县","340223":"南陵县","340225":"无为县"}},"340300":{"name":"蚌埠市","child":{"340301":"市辖区","340302":"龙子湖区","340303":"蚌山区","340304":"禹会区","340311":"淮上区","340321":"怀远县","340322":"五河县","340323":"固镇县"}},"340400":{"name":"淮南市","child":{"340401":"市辖区","340402":"大通区","340403":"田家庵区","340404":"谢家集区","340405":"八公山区","340406":"潘集区","340421":"凤台县","340422":"寿县"}},"340500":{"name":"马鞍山市","child":{"340501":"市辖区","340503":"花山区","340504":"雨山区","340506":"博望区","340521":"当涂县","340522":"含山县","340523":"和县"}},"340600":{"name":"淮北市","child":{"340601":"市辖区","340602":"杜集区","340603":"相山区","340604":"烈山区","340621":"濉溪县"}},"340700":{"name":"铜陵市","child":{"340701":"市辖区","340705":"铜官区","340706":"义安区","340711":"郊区","340722":"枞阳县"}},"340800":{"name":"安庆市","child":{"340801":"市辖区","340802":"迎江区","340803":"大观区","340811":"宜秀区","340822":"怀宁县","340824":"潜山县","340825":"太湖县","340826":"宿松县","340827":"望江县","340828":"岳西县","340881":"桐城市"}},"341000":{"name":"黄山市","child":{"341001":"市辖区","341002":"屯溪区","341003":"黄山区","341004":"徽州区","341021":"歙县","341022":"休宁县","341023":"黟县","341024":"祁门县"}},"341100":{"name":"滁州市","child":{"341101":"市辖区","341102":"琅琊区","341103":"南谯区","341122":"来安县","341124":"全椒县","341125":"定远县","341126":"凤阳县","341181":"天长市","341182":"明光市"}},"341200":{"name":"阜阳市","child":{"341201":"市辖区","341202":"颍州区","341203":"颍东区","341204":"颍泉区","341221":"临泉县","341222":"太和县","341225":"阜南县","341226":"颍上县","341282":"界首市"}},"341300":{"name":"宿州市","child":{"341301":"市辖区","341302":"埇桥区","341321":"砀山县","341322":"萧县","341323":"灵璧县","341324":"泗县"}},"341500":{"name":"六安市","child":{"341501":"市辖区","341502":"金安区","341503":"裕安区","341504":"叶集区","341522":"霍邱县","341523":"舒城县","341524":"金寨县","341525":"霍山县"}},"341600":{"name":"亳州市","child":{"341601":"市辖区","341602":"谯城区","341621":"涡阳县","341622":"蒙城县","341623":"利辛县"}},"341700":{"name":"池州市","child":{"341701":"市辖区","341702":"贵池区","341721":"东至县","341722":"石台县","341723":"青阳县"}},"341800":{"name":"宣城市","child":{"341801":"市辖区","341802":"宣州区","341821":"郎溪县","341822":"广德县","341823":"泾县","341824":"绩溪县","341825":"旌德县","341881":"宁国市"}}}},"350000":{"name":"福建省","child":{"350100":{"name":"福州市","child":{"350101":"市辖区","350102":"鼓楼区","350103":"台江区","350104":"仓山区","350105":"马尾区","350111":"晋安区","350121":"闽侯县","350122":"连江县","350123":"罗源县","350124":"闽清县","350125":"永泰县","350128":"平潭县","350181":"福清市","350182":"长乐市"}},"350200":{"name":"厦门市","child":{"350201":"市辖区","350203":"思明区","350205":"海沧区","350206":"湖里区","350211":"集美区","350212":"同安区","350213":"翔安区"}},"350300":{"name":"莆田市","child":{"350301":"市辖区","350302":"城厢区","350303":"涵江区","350304":"荔城区","350305":"秀屿区","350322":"仙游县"}},"350400":{"name":"三明市","child":{"350401":"市辖区","350402":"梅列区","350403":"三元区","350421":"明溪县","350423":"清流县","350424":"宁化县","350425":"大田县","350426":"尤溪县","350427":"沙县","350428":"将乐县","350429":"泰宁县","350430":"建宁县","350481":"永安市"}},"350500":{"name":"泉州市","child":{"350501":"市辖区","350502":"鲤城区","350503":"丰泽区","350504":"洛江区","350505":"泉港区","350521":"惠安县","350524":"安溪县","350525":"永春县","350526":"德化县","350527":"金门县","350581":"石狮市","350582":"晋江市","350583":"南安市"}},"350600":{"name":"漳州市","child":{"350601":"市辖区","350602":"芗城区","350603":"龙文区","350622":"云霄县","350623":"漳浦县","350624":"诏安县","350625":"长泰县","350626":"东山县","350627":"南靖县","350628":"平和县","350629":"华安县","350681":"龙海市"}},"350700":{"name":"南平市","child":{"350701":"市辖区","350702":"延平区","350703":"建阳区","350721":"顺昌县","350722":"浦城县","350723":"光泽县","350724":"松溪县","350725":"政和县","350781":"邵武市","350782":"武夷山市","350783":"建瓯市"}},"350800":{"name":"龙岩市","child":{"350801":"市辖区","350802":"新罗区","350803":"永定区","350821":"长汀县","350823":"上杭县","350824":"武平县","350825":"连城县","350881":"漳平市"}},"350900":{"name":"宁德市","child":{"350901":"市辖区","350902":"蕉城区","350921":"霞浦县","350922":"古田县","350923":"屏南县","350924":"寿宁县","350925":"周宁县","350926":"柘荣县","350981":"福安市","350982":"福鼎市"}}}},"360000":{"name":"江西省","child":{"360100":{"name":"南昌市","child":{"360101":"市辖区","360102":"东湖区","360103":"西湖区","360104":"青云谱区","360105":"湾里区","360111":"青山湖区","360112":"新建区","360121":"南昌县","360123":"安义县","360124":"进贤县"}},"360200":{"name":"景德镇市","child":{"360201":"市辖区","360202":"昌江区","360203":"珠山区","360222":"浮梁县","360281":"乐平市"}},"360300":{"name":"萍乡市","child":{"360301":"市辖区","360302":"安源区","360313":"湘东区","360321":"莲花县","360322":"上栗县","360323":"芦溪县"}},"360400":{"name":"九江市","child":{"360401":"市辖区","360402":"濂溪区","360403":"浔阳区","360421":"九江县","360423":"武宁县","360424":"修水县","360425":"永修县","360426":"德安县","360428":"都昌县","360429":"湖口县","360430":"彭泽县","360481":"瑞昌市","360482":"共青城市","360483":"庐山市"}},"360500":{"name":"新余市","child":{"360501":"市辖区","360502":"渝水区","360521":"分宜县"}},"360600":{"name":"鹰潭市","child":{"360601":"市辖区","360602":"月湖区","360622":"余江县","360681":"贵溪市"}},"360700":{"name":"赣州市","child":{"360701":"市辖区","360702":"章贡区","360703":"南康区","360721":"赣县","360722":"信丰县","360723":"大余县","360724":"上犹县","360725":"崇义县","360726":"安远县","360727":"龙南县","360728":"定南县","360729":"全南县","360730":"宁都县","360731":"于都县","360732":"兴国县","360733":"会昌县","360734":"寻乌县","360735":"石城县","360781":"瑞金市"}},"360800":{"name":"吉安市","child":{"360801":"市辖区","360802":"吉州区","360803":"青原区","360821":"吉安县","360822":"吉水县","360823":"峡江县","360824":"新干县","360825":"永丰县","360826":"泰和县","360827":"遂川县","360828":"万安县","360829":"安福县","360830":"永新县","360881":"井冈山市"}},"360900":{"name":"宜春市","child":{"360901":"市辖区","360902":"袁州区","360921":"奉新县","360922":"万载县","360923":"上高县","360924":"宜丰县","360925":"靖安县","360926":"铜鼓县","360981":"丰城市","360982":"樟树市","360983":"高安市"}},"361000":{"name":"抚州市","child":{"361001":"市辖区","361002":"临川区","361021":"南城县","361022":"黎川县","361023":"南丰县","361024":"崇仁县","361025":"乐安县","361026":"宜黄县","361027":"金溪县","361028":"资溪县","361029":"东乡县","361030":"广昌县"}},"361100":{"name":"上饶市","child":{"361101":"市辖区","361102":"信州区","361103":"广丰区","361121":"上饶县","361123":"玉山县","361124":"铅山县","361125":"横峰县","361126":"弋阳县","361127":"余干县","361128":"鄱阳县","361129":"万年县","361130":"婺源县","361181":"德兴市"}}}},"370000":{"name":"山东省","child":{"370100":{"name":"济南市","child":{"370101":"市辖区","370102":"历下区","370103":"市中区","370104":"槐荫区","370105":"天桥区","370112":"历城区","370113":"长清区","370124":"平阴县","370125":"济阳县","370126":"商河县","370181":"章丘市"}},"370200":{"name":"青岛市","child":{"370201":"市辖区","370202":"市南区","370203":"市北区","370211":"黄岛区","370212":"崂山区","370213":"李沧区","370214":"城阳区","370281":"胶州市","370282":"即墨市","370283":"平度市","370285":"莱西市"}},"370300":{"name":"淄博市","child":{"370301":"市辖区","370302":"淄川区","370303":"张店区","370304":"博山区","370305":"临淄区","370306":"周村区","370321":"桓台县","370322":"高青县","370323":"沂源县"}},"370400":{"name":"枣庄市","child":{"370401":"市辖区","370402":"市中区","370403":"薛城区","370404":"峄城区","370405":"台儿庄区","370406":"山亭区","370481":"滕州市"}},"370500":{"name":"东营市","child":{"370501":"市辖区","370502":"东营区","370503":"河口区","370505":"垦利区","370522":"利津县","370523":"广饶县"}},"370600":{"name":"烟台市","child":{"370601":"市辖区","370602":"芝罘区","370611":"福山区","370612":"牟平区","370613":"莱山区","370634":"长岛县","370681":"龙口市","370682":"莱阳市","370683":"莱州市","370684":"蓬莱市","370685":"招远市","370686":"栖霞市","370687":"海阳市"}},"370700":{"name":"潍坊市","child":{"370701":"市辖区","370702":"潍城区","370703":"寒亭区","370704":"坊子区","370705":"奎文区","370724":"临朐县","370725":"昌乐县","370781":"青州市","370782":"诸城市","370783":"寿光市","370784":"安丘市","370785":"高密市","370786":"昌邑市"}},"370800":{"name":"济宁市","child":{"370801":"市辖区","370811":"任城区","370812":"兖州区","370826":"微山县","370827":"鱼台县","370828":"金乡县","370829":"嘉祥县","370830":"汶上县","370831":"泗水县","370832":"梁山县","370881":"曲阜市","370883":"邹城市"}},"370900":{"name":"泰安市","child":{"370901":"市辖区","370902":"泰山区","370911":"岱岳区","370921":"宁阳县","370923":"东平县","370982":"新泰市","370983":"肥城市"}},"371000":{"name":"威海市","child":{"371001":"市辖区","371002":"环翠区","371003":"文登区","371082":"荣成市","371083":"乳山市"}},"371100":{"name":"日照市","child":{"371101":"市辖区","371102":"东港区","371103":"岚山区","371121":"五莲县","371122":"莒县"}},"371200":{"name":"莱芜市","child":{"371201":"市辖区","371202":"莱城区","371203":"钢城区"}},"371300":{"name":"临沂市","child":{"371301":"市辖区","371302":"兰山区","371311":"罗庄区","371312":"河东区","371321":"沂南县","371322":"郯城县","371323":"沂水县","371324":"兰陵县","371325":"费县","371326":"平邑县","371327":"莒南县","371328":"蒙阴县","371329":"临沭县"}},"371400":{"name":"德州市","child":{"371401":"市辖区","371402":"德城区","371403":"陵城区","371422":"宁津县","371423":"庆云县","371424":"临邑县","371425":"齐河县","371426":"平原县","371427":"夏津县","371428":"武城县","371481":"乐陵市","371482":"禹城市"}},"371500":{"name":"聊城市","child":{"371501":"市辖区","371502":"东昌府区","371521":"阳谷县","371522":"莘县","371523":"茌平县","371524":"东阿县","371525":"冠县","371526":"高唐县","371581":"临清市"}},"371600":{"name":"滨州市","child":{"371601":"市辖区","371602":"滨城区","371603":"沾化区","371621":"惠民县","371622":"阳信县","371623":"无棣县","371625":"博兴县","371626":"邹平县"}},"371700":{"name":"菏泽市","child":{"371701":"市辖区","371702":"牡丹区","371703":"定陶区","371721":"曹县","371722":"单县","371723":"成武县","371724":"巨野县","371725":"郓城县","371726":"鄄城县","371728":"东明县"}}}},"410000":{"name":"河南省","child":{"410100":{"name":"郑州市","child":{"410101":"市辖区","410102":"中原区","410103":"二七区","410104":"管城回族区","410105":"金水区","410106":"上街区","410108":"惠济区","410122":"中牟县","410181":"巩义市","410182":"荥阳市","410183":"新密市","410184":"新郑市","410185":"登封市"}},"410200":{"name":"开封市","child":{"410201":"市辖区","410202":"龙亭区","410203":"顺河回族区","410204":"鼓楼区","410205":"禹王台区","410211":"金明区","410212":"祥符区","410221":"杞县","410222":"通许县","410223":"尉氏县","410225":"兰考县"}},"410300":{"name":"洛阳市","child":{"410301":"市辖区","410302":"老城区","410303":"西工区","410304":"瀍河回族区","410305":"涧西区","410306":"吉利区","410311":"洛龙区","410322":"孟津县","410323":"新安县","410324":"栾川县","410325":"嵩县","410326":"汝阳县","410327":"宜阳县","410328":"洛宁县","410329":"伊川县","410381":"偃师市"}},"410400":{"name":"平顶山市","child":{"410401":"市辖区","410402":"新华区","410403":"卫东区","410404":"石龙区","410411":"湛河区","410421":"宝丰县","410422":"叶县","410423":"鲁山县","410425":"郏县","410481":"舞钢市","410482":"汝州市"}},"410500":{"name":"安阳市","child":{"410501":"市辖区","410502":"文峰区","410503":"北关区","410505":"殷都区","410506":"龙安区","410522":"安阳县","410523":"汤阴县","410526":"滑县","410527":"内黄县","410581":"林州市"}},"410600":{"name":"鹤壁市","child":{"410601":"市辖区","410602":"鹤山区","410603":"山城区","410611":"淇滨区","410621":"浚县","410622":"淇县"}},"410700":{"name":"新乡市","child":{"410701":"市辖区","410702":"红旗区","410703":"卫滨区","410704":"凤泉区","410711":"牧野区","410721":"新乡县","410724":"获嘉县","410725":"原阳县","410726":"延津县","410727":"封丘县","410728":"长垣县","410781":"卫辉市","410782":"辉县市"}},"410800":{"name":"焦作市","child":{"410801":"市辖区","410802":"解放区","410803":"中站区","410804":"马村区","410811":"山阳区","410821":"修武县","410822":"博爱县","410823":"武陟县","410825":"温县","410882":"沁阳市","410883":"孟州市"}},"410900":{"name":"濮阳市","child":{"410901":"市辖区","410902":"华龙区","410922":"清丰县","410923":"南乐县","410926":"范县","410927":"台前县","410928":"濮阳县"}},"411000":{"name":"许昌市","child":{"411001":"市辖区","411002":"魏都区","411023":"许昌县","411024":"鄢陵县","411025":"襄城县","411081":"禹州市","411082":"长葛市"}},"411100":{"name":"漯河市","child":{"411101":"市辖区","411102":"源汇区","411103":"郾城区","411104":"召陵区","411121":"舞阳县","411122":"临颍县"}},"411200":{"name":"三门峡市","child":{"411201":"市辖区","411202":"湖滨区","411203":"陕州区","411221":"渑池县","411224":"卢氏县","411281":"义马市","411282":"灵宝市"}},"411300":{"name":"南阳市","child":{"411301":"市辖区","411302":"宛城区","411303":"卧龙区","411321":"南召县","411322":"方城县","411323":"西峡县","411324":"镇平县","411325":"内乡县","411326":"淅川县","411327":"社旗县","411328":"唐河县","411329":"新野县","411330":"桐柏县","411381":"邓州市"}},"411400":{"name":"商丘市","child":{"411401":"市辖区","411402":"梁园区","411403":"睢阳区","411421":"民权县","411422":"睢县","411423":"宁陵县","411424":"柘城县","411425":"虞城县","411426":"夏邑县","411481":"永城市"}},"411500":{"name":"信阳市","child":{"411501":"市辖区","411502":"浉河区","411503":"平桥区","411521":"罗山县","411522":"光山县","411523":"新县","411524":"商城县","411525":"固始县","411526":"潢川县","411527":"淮滨县","411528":"息县"}},"411600":{"name":"周口市","child":{"411601":"市辖区","411602":"川汇区","411621":"扶沟县","411622":"西华县","411623":"商水县","411624":"沈丘县","411625":"郸城县","411626":"淮阳县","411627":"太康县","411628":"鹿邑县","411681":"项城市"}},"411700":{"name":"驻马店市","child":{"411701":"市辖区","411702":"驿城区","411721":"西平县","411722":"上蔡县","411723":"平舆县","411724":"正阳县","411725":"确山县","411726":"泌阳县","411727":"汝南县","411728":"遂平县","411729":"新蔡县"}},"419000":{"name":"省直辖县级行政区划","child":{"419001":"济源市"}}}},"420000":{"name":"湖北省","child":{"420100":{"name":"武汉市","child":{"420101":"市辖区","420102":"江岸区","420103":"江汉区","420104":"硚口区","420105":"汉阳区","420106":"武昌区","420107":"青山区","420111":"洪山区","420112":"东西湖区","420113":"汉南区","420114":"蔡甸区","420115":"江夏区","420116":"黄陂区","420117":"新洲区"}},"420200":{"name":"黄石市","child":{"420201":"市辖区","420202":"黄石港区","420203":"西塞山区","420204":"下陆区","420205":"铁山区","420222":"阳新县","420281":"大冶市"}},"420300":{"name":"十堰市","child":{"420301":"市辖区","420302":"茅箭区","420303":"张湾区","420304":"郧阳区","420322":"郧西县","420323":"竹山县","420324":"竹溪县","420325":"房县","420381":"丹江口市"}},"420500":{"name":"宜昌市","child":{"420501":"市辖区","420502":"西陵区","420503":"伍家岗区","420504":"点军区","420505":"猇亭区","420506":"夷陵区","420525":"远安县","420526":"兴山县","420527":"秭归县","420528":"长阳土家族自治县","420529":"五峰土家族自治县","420581":"宜都市","420582":"当阳市","420583":"枝江市"}},"420600":{"name":"襄阳市","child":{"420601":"市辖区","420602":"襄城区","420606":"樊城区","420607":"襄州区","420624":"南漳县","420625":"谷城县","420626":"保康县","420682":"老河口市","420683":"枣阳市","420684":"宜城市"}},"420700":{"name":"鄂州市","child":{"420701":"市辖区","420702":"梁子湖区","420703":"华容区","420704":"鄂城区"}},"420800":{"name":"荆门市","child":{"420801":"市辖区","420802":"东宝区","420804":"掇刀区","420821":"京山县","420822":"沙洋县","420881":"钟祥市"}},"420900":{"name":"孝感市","child":{"420901":"市辖区","420902":"孝南区","420921":"孝昌县","420922":"大悟县","420923":"云梦县","420981":"应城市","420982":"安陆市","420984":"汉川市"}},"421000":{"name":"荆州市","child":{"421001":"市辖区","421002":"沙市区","421003":"荆州区","421022":"公安县","421023":"监利县","421024":"江陵县","421081":"石首市","421083":"洪湖市","421087":"松滋市"}},"421100":{"name":"黄冈市","child":{"421101":"市辖区","421102":"黄州区","421121":"团风县","421122":"红安县","421123":"罗田县","421124":"英山县","421125":"浠水县","421126":"蕲春县","421127":"黄梅县","421181":"麻城市","421182":"武穴市"}},"421200":{"name":"咸宁市","child":{"421201":"市辖区","421202":"咸安区","421221":"嘉鱼县","421222":"通城县","421223":"崇阳县","421224":"通山县","421281":"赤壁市"}},"421300":{"name":"随州市","child":{"421301":"市辖区","421303":"曾都区","421321":"随县","421381":"广水市"}},"422800":{"name":"恩施土家族苗族自治州","child":{"422801":"恩施市","422802":"利川市","422822":"建始县","422823":"巴东县","422825":"宣恩县","422826":"咸丰县","422827":"来凤县","422828":"鹤峰县"}},"429000":{"name":"省直辖县级行政区划","child":{"429004":"仙桃市","429005":"潜江市","429006":"天门市","429021":"神农架林区"}}}},"430000":{"name":"湖南省","child":{"430100":{"name":"长沙市","child":{"430101":"市辖区","430102":"芙蓉区","430103":"天心区","430104":"岳麓区","430105":"开福区","430111":"雨花区","430112":"望城区","430121":"长沙县","430124":"宁乡县","430181":"浏阳市"}},"430200":{"name":"株洲市","child":{"430201":"市辖区","430202":"荷塘区","430203":"芦淞区","430204":"石峰区","430211":"天元区","430221":"株洲县","430223":"攸县","430224":"茶陵县","430225":"炎陵县","430281":"醴陵市"}},"430300":{"name":"湘潭市","child":{"430301":"市辖区","430302":"雨湖区","430304":"岳塘区","430321":"湘潭县","430381":"湘乡市","430382":"韶山市"}},"430400":{"name":"衡阳市","child":{"430401":"市辖区","430405":"珠晖区","430406":"雁峰区","430407":"石鼓区","430408":"蒸湘区","430412":"南岳区","430421":"衡阳县","430422":"衡南县","430423":"衡山县","430424":"衡东县","430426":"祁东县","430481":"耒阳市","430482":"常宁市"}},"430500":{"name":"邵阳市","child":{"430501":"市辖区","430502":"双清区","430503":"大祥区","430511":"北塔区","430521":"邵东县","430522":"新邵县","430523":"邵阳县","430524":"隆回县","430525":"洞口县","430527":"绥宁县","430528":"新宁县","430529":"城步苗族自治县","430581":"武冈市"}},"430600":{"name":"岳阳市","child":{"430601":"市辖区","430602":"岳阳楼区","430603":"云溪区","430611":"君山区","430621":"岳阳县","430623":"华容县","430624":"湘阴县","430626":"平江县","430681":"汨罗市","430682":"临湘市"}},"430700":{"name":"常德市","child":{"430701":"市辖区","430702":"武陵区","430703":"鼎城区","430721":"安乡县","430722":"汉寿县","430723":"澧县","430724":"临澧县","430725":"桃源县","430726":"石门县","430781":"津市市"}},"430800":{"name":"张家界市","child":{"430801":"市辖区","430802":"永定区","430811":"武陵源区","430821":"慈利县","430822":"桑植县"}},"430900":{"name":"益阳市","child":{"430901":"市辖区","430902":"资阳区","430903":"赫山区","430921":"南县","430922":"桃江县","430923":"安化县","430981":"沅江市"}},"431000":{"name":"郴州市","child":{"431001":"市辖区","431002":"北湖区","431003":"苏仙区","431021":"桂阳县","431022":"宜章县","431023":"永兴县","431024":"嘉禾县","431025":"临武县","431026":"汝城县","431027":"桂东县","431028":"安仁县","431081":"资兴市"}},"431100":{"name":"永州市","child":{"431101":"市辖区","431102":"零陵区","431103":"冷水滩区","431121":"祁阳县","431122":"东安县","431123":"双牌县","431124":"道县","431125":"江永县","431126":"宁远县","431127":"蓝山县","431128":"新田县","431129":"江华瑶族自治县"}},"431200":{"name":"怀化市","child":{"431201":"市辖区","431202":"鹤城区","431221":"中方县","431222":"沅陵县","431223":"辰溪县","431224":"溆浦县","431225":"会同县","431226":"麻阳苗族自治县","431227":"新晃侗族自治县","431228":"芷江侗族自治县","431229":"靖州苗族侗族自治县","431230":"通道侗族自治县","431281":"洪江市"}},"431300":{"name":"娄底市","child":{"431301":"市辖区","431302":"娄星区","431321":"双峰县","431322":"新化县","431381":"冷水江市","431382":"涟源市"}},"433100":{"name":"湘西土家族苗族自治州","child":{"433101":"吉首市","433122":"泸溪县","433123":"凤凰县","433124":"花垣县","433125":"保靖县","433126":"古丈县","433127":"永顺县","433130":"龙山县"}}}},"440000":{"name":"广东省","child":{"440100":{"name":"广州市","child":{"440101":"市辖区","440103":"荔湾区","440104":"越秀区","440105":"海珠区","440106":"天河区","440111":"白云区","440112":"黄埔区","440113":"番禺区","440114":"花都区","440115":"南沙区","440117":"从化区","440118":"增城区"}},"440200":{"name":"韶关市","child":{"440201":"市辖区","440203":"武江区","440204":"浈江区","440205":"曲江区","440222":"始兴县","440224":"仁化县","440229":"翁源县","440232":"乳源瑶族自治县","440233":"新丰县","440281":"乐昌市","440282":"南雄市"}},"440300":{"name":"深圳市","child":{"440301":"市辖区","440303":"罗湖区","440304":"福田区","440305":"南山区","440306":"宝安区","440307":"龙岗区","440308":"盐田区"}},"440400":{"name":"珠海市","child":{"440401":"市辖区","440402":"香洲区","440403":"斗门区","440404":"金湾区"}},"440500":{"name":"汕头市","child":{"440501":"市辖区","440507":"龙湖区","440511":"金平区","440512":"濠江区","440513":"潮阳区","440514":"潮南区","440515":"澄海区","440523":"南澳县"}},"440600":{"name":"佛山市","child":{"440601":"市辖区","440604":"禅城区","440605":"南海区","440606":"顺德区","440607":"三水区","440608":"高明区"}},"440700":{"name":"江门市","child":{"440701":"市辖区","440703":"蓬江区","440704":"江海区","440705":"新会区","440781":"台山市","440783":"开平市","440784":"鹤山市","440785":"恩平市"}},"440800":{"name":"湛江市","child":{"440801":"市辖区","440802":"赤坎区","440803":"霞山区","440804":"坡头区","440811":"麻章区","440823":"遂溪县","440825":"徐闻县","440881":"廉江市","440882":"雷州市","440883":"吴川市"}},"440900":{"name":"茂名市","child":{"440901":"市辖区","440902":"茂南区","440904":"电白区","440981":"高州市","440982":"化州市","440983":"信宜市"}},"441200":{"name":"肇庆市","child":{"441201":"市辖区","441202":"端州区","441203":"鼎湖区","441204":"高要区","441223":"广宁县","441224":"怀集县","441225":"封开县","441226":"德庆县","441284":"四会市"}},"441300":{"name":"惠州市","child":{"441301":"市辖区","441302":"惠城区","441303":"惠阳区","441322":"博罗县","441323":"惠东县","441324":"龙门县"}},"441400":{"name":"梅州市","child":{"441401":"市辖区","441402":"梅江区","441403":"梅县区","441422":"大埔县","441423":"丰顺县","441424":"五华县","441426":"平远县","441427":"蕉岭县","441481":"兴宁市"}},"441500":{"name":"汕尾市","child":{"441501":"市辖区","441502":"城区","441521":"海丰县","441523":"陆河县","441581":"陆丰市"}},"441600":{"name":"河源市","child":{"441601":"市辖区","441602":"源城区","441621":"紫金县","441622":"龙川县","441623":"连平县","441624":"和平县","441625":"东源县"}},"441700":{"name":"阳江市","child":{"441701":"市辖区","441702":"江城区","441704":"阳东区","441721":"阳西县","441781":"阳春市"}},"441800":{"name":"清远市","child":{"441801":"市辖区","441802":"清城区","441803":"清新区","441821":"佛冈县","441823":"阳山县","441825":"连山壮族瑶族自治县","441826":"连南瑶族自治县","441881":"英德市","441882":"连州市"}},"441900":{"name":"东莞市","child":[]},"442000":{"name":"中山市","child":[]},"445100":{"name":"潮州市","child":{"445101":"市辖区","445102":"湘桥区","445103":"潮安区","445122":"饶平县"}},"445200":{"name":"揭阳市","child":{"445201":"市辖区","445202":"榕城区","445203":"揭东区","445222":"揭西县","445224":"惠来县","445281":"普宁市"}},"445300":{"name":"云浮市","child":{"445301":"市辖区","445302":"云城区","445303":"云安区","445321":"新兴县","445322":"郁南县","445381":"罗定市"}}}},"450000":{"name":"广西壮族自治区","child":{"450100":{"name":"南宁市","child":{"450101":"市辖区","450102":"兴宁区","450103":"青秀区","450105":"江南区","450107":"西乡塘区","450108":"良庆区","450109":"邕宁区","450110":"武鸣区","450123":"隆安县","450124":"马山县","450125":"上林县","450126":"宾阳县","450127":"横县"}},"450200":{"name":"柳州市","child":{"450201":"市辖区","450202":"城中区","450203":"鱼峰区","450204":"柳南区","450205":"柳北区","450206":"柳江区","450222":"柳城县","450223":"鹿寨县","450224":"融安县","450225":"融水苗族自治县","450226":"三江侗族自治县"}},"450300":{"name":"桂林市","child":{"450301":"市辖区","450302":"秀峰区","450303":"叠彩区","450304":"象山区","450305":"七星区","450311":"雁山区","450312":"临桂区","450321":"阳朔县","450323":"灵川县","450324":"全州县","450325":"兴安县","450326":"永福县","450327":"灌阳县","450328":"龙胜各族自治县","450329":"资源县","450330":"平乐县","450331":"荔浦县","450332":"恭城瑶族自治县"}},"450400":{"name":"梧州市","child":{"450401":"市辖区","450403":"万秀区","450405":"长洲区","450406":"龙圩区","450421":"苍梧县","450422":"藤县","450423":"蒙山县","450481":"岑溪市"}},"450500":{"name":"北海市","child":{"450501":"市辖区","450502":"海城区","450503":"银海区","450512":"铁山港区","450521":"合浦县"}},"450600":{"name":"防城港市","child":{"450601":"市辖区","450602":"港口区","450603":"防城区","450621":"上思县","450681":"东兴市"}},"450700":{"name":"钦州市","child":{"450701":"市辖区","450702":"钦南区","450703":"钦北区","450721":"灵山县","450722":"浦北县"}},"450800":{"name":"贵港市","child":{"450801":"市辖区","450802":"港北区","450803":"港南区","450804":"覃塘区","450821":"平南县","450881":"桂平市"}},"450900":{"name":"玉林市","child":{"450901":"市辖区","450902":"玉州区","450903":"福绵区","450921":"容县","450922":"陆川县","450923":"博白县","450924":"兴业县","450981":"北流市"}},"451000":{"name":"百色市","child":{"451001":"市辖区","451002":"右江区","451021":"田阳县","451022":"田东县","451023":"平果县","451024":"德保县","451026":"那坡县","451027":"凌云县","451028":"乐业县","451029":"田林县","451030":"西林县","451031":"隆林各族自治县","451081":"靖西市"}},"451100":{"name":"贺州市","child":{"451101":"市辖区","451102":"八步区","451103":"平桂区","451121":"昭平县","451122":"钟山县","451123":"富川瑶族自治县"}},"451200":{"name":"河池市","child":{"451201":"市辖区","451202":"金城江区","451221":"南丹县","451222":"天峨县","451223":"凤山县","451224":"东兰县","451225":"罗城仫佬族自治县","451226":"环江毛南族自治县","451227":"巴马瑶族自治县","451228":"都安瑶族自治县","451229":"大化瑶族自治县","451281":"宜州市"}},"451300":{"name":"来宾市","child":{"451301":"市辖区","451302":"兴宾区","451321":"忻城县","451322":"象州县","451323":"武宣县","451324":"金秀瑶族自治县","451381":"合山市"}},"451400":{"name":"崇左市","child":{"451401":"市辖区","451402":"江州区","451421":"扶绥县","451422":"宁明县","451423":"龙州县","451424":"大新县","451425":"天等县","451481":"凭祥市"}}}},"460000":{"name":"海南省","child":{"460100":{"name":"海口市","child":{"460101":"市辖区","460105":"秀英区","460106":"龙华区","460107":"琼山区","460108":"美兰区"}},"460200":{"name":"三亚市","child":{"460201":"市辖区","460202":"海棠区","460203":"吉阳区","460204":"天涯区","460205":"崖州区"}},"460300":{"name":"三沙市","child":[]},"460400":{"name":"儋州市","child":[]},"469000":{"name":"省直辖县级行政区划","child":{"469001":"五指山市","469002":"琼海市","469005":"文昌市","469006":"万宁市","469007":"东方市","469021":"定安县","469022":"屯昌县","469023":"澄迈县","469024":"临高县","469025":"白沙黎族自治县","469026":"昌江黎族自治县","469027":"乐东黎族自治县","469028":"陵水黎族自治县","469029":"保亭黎族苗族自治县","469030":"琼中黎族苗族自治县"}}}},"500000":{"name":"重庆市","child":{"500100":{"name":"市辖区","child":{"500101":"万州区","500102":"涪陵区","500103":"渝中区","500104":"大渡口区","500105":"江北区","500106":"沙坪坝区","500107":"九龙坡区","500108":"南岸区","500109":"北碚区","500110":"綦江区","500111":"大足区","500112":"渝北区","500113":"巴南区","500114":"黔江区","500115":"长寿区","500116":"江津区","500117":"合川区","500118":"永川区","500119":"南川区","500120":"璧山区","500151":"铜梁区","500152":"潼南区","500153":"荣昌区","500154":"开州区"}},"500200":{"name":"县","child":{"500228":"梁平县","500229":"城口县","500230":"丰都县","500231":"垫江县","500232":"武隆县","500233":"忠县","500235":"云阳县","500236":"奉节县","500237":"巫山县","500238":"巫溪县","500240":"石柱土家族自治县","500241":"秀山土家族苗族自治县","500242":"酉阳土家族苗族自治县","500243":"彭水苗族土家族自治县"}}}},"510000":{"name":"四川省","child":{"510100":{"name":"成都市","child":{"510101":"市辖区","510104":"锦江区","510105":"青羊区","510106":"金牛区","510107":"武侯区","510108":"成华区","510112":"龙泉驿区","510113":"青白江区","510114":"新都区","510115":"温江区","510116":"双流区","510121":"金堂县","510124":"郫县","510129":"大邑县","510131":"蒲江县","510132":"新津县","510181":"都江堰市","510182":"彭州市","510183":"邛崃市","510184":"崇州市","510185":"简阳市"}},"510300":{"name":"自贡市","child":{"510301":"市辖区","510302":"自流井区","510303":"贡井区","510304":"大安区","510311":"沿滩区","510321":"荣县","510322":"富顺县"}},"510400":{"name":"攀枝花市","child":{"510401":"市辖区","510402":"东区","510403":"西区","510411":"仁和区","510421":"米易县","510422":"盐边县"}},"510500":{"name":"泸州市","child":{"510501":"市辖区","510502":"江阳区","510503":"纳溪区","510504":"龙马潭区","510521":"泸县","510522":"合江县","510524":"叙永县","510525":"古蔺县"}},"510600":{"name":"德阳市","child":{"510601":"市辖区","510603":"旌阳区","510623":"中江县","510626":"罗江县","510681":"广汉市","510682":"什邡市","510683":"绵竹市"}},"510700":{"name":"绵阳市","child":{"510701":"市辖区","510703":"涪城区","510704":"游仙区","510705":"安州区","510722":"三台县","510723":"盐亭县","510725":"梓潼县","510726":"北川羌族自治县","510727":"平武县","510781":"江油市"}},"510800":{"name":"广元市","child":{"510801":"市辖区","510802":"利州区","510811":"昭化区","510812":"朝天区","510821":"旺苍县","510822":"青川县","510823":"剑阁县","510824":"苍溪县"}},"510900":{"name":"遂宁市","child":{"510901":"市辖区","510903":"船山区","510904":"安居区","510921":"蓬溪县","510922":"射洪县","510923":"大英县"}},"511000":{"name":"内江市","child":{"511001":"市辖区","511002":"市中区","511011":"东兴区","511024":"威远县","511025":"资中县","511028":"隆昌县"}},"511100":{"name":"乐山市","child":{"511101":"市辖区","511102":"市中区","511111":"沙湾区","511112":"五通桥区","511113":"金口河区","511123":"犍为县","511124":"井研县","511126":"夹江县","511129":"沐川县","511132":"峨边彝族自治县","511133":"马边彝族自治县","511181":"峨眉山市"}},"511300":{"name":"南充市","child":{"511301":"市辖区","511302":"顺庆区","511303":"高坪区","511304":"嘉陵区","511321":"南部县","511322":"营山县","511323":"蓬安县","511324":"仪陇县","511325":"西充县","511381":"阆中市"}},"511400":{"name":"眉山市","child":{"511401":"市辖区","511402":"东坡区","511403":"彭山区","511421":"仁寿县","511423":"洪雅县","511424":"丹棱县","511425":"青神县"}},"511500":{"name":"宜宾市","child":{"511501":"市辖区","511502":"翠屏区","511503":"南溪区","511521":"宜宾县","511523":"江安县","511524":"长宁县","511525":"高县","511526":"珙县","511527":"筠连县","511528":"兴文县","511529":"屏山县"}},"511600":{"name":"广安市","child":{"511601":"市辖区","511602":"广安区","511603":"前锋区","511621":"岳池县","511622":"武胜县","511623":"邻水县","511681":"华蓥市"}},"511700":{"name":"达州市","child":{"511701":"市辖区","511702":"通川区","511703":"达川区","511722":"宣汉县","511723":"开江县","511724":"大竹县","511725":"渠县","511781":"万源市"}},"511800":{"name":"雅安市","child":{"511801":"市辖区","511802":"雨城区","511803":"名山区","511822":"荥经县","511823":"汉源县","511824":"石棉县","511825":"天全县","511826":"芦山县","511827":"宝兴县"}},"511900":{"name":"巴中市","child":{"511901":"市辖区","511902":"巴州区","511903":"恩阳区","511921":"通江县","511922":"南江县","511923":"平昌县"}},"512000":{"name":"资阳市","child":{"512001":"市辖区","512002":"雁江区","512021":"安岳县","512022":"乐至县"}},"513200":{"name":"阿坝藏族羌族自治州","child":{"513201":"马尔康市","513221":"汶川县","513222":"理县","513223":"茂县","513224":"松潘县","513225":"九寨沟县","513226":"金川县","513227":"小金县","513228":"黑水县","513230":"壤塘县","513231":"阿坝县","513232":"若尔盖县","513233":"红原县"}},"513300":{"name":"甘孜藏族自治州","child":{"513301":"康定市","513322":"泸定县","513323":"丹巴县","513324":"九龙县","513325":"雅江县","513326":"道孚县","513327":"炉霍县","513328":"甘孜县","513329":"新龙县","513330":"德格县","513331":"白玉县","513332":"石渠县","513333":"色达县","513334":"理塘县","513335":"巴塘县","513336":"乡城县","513337":"稻城县","513338":"得荣县"}},"513400":{"name":"凉山彝族自治州","child":{"513401":"西昌市","513422":"木里藏族自治县","513423":"盐源县","513424":"德昌县","513425":"会理县","513426":"会东县","513427":"宁南县","513428":"普格县","513429":"布拖县","513430":"金阳县","513431":"昭觉县","513432":"喜德县","513433":"冕宁县","513434":"越西县","513435":"甘洛县","513436":"美姑县","513437":"雷波县"}}}},"520000":{"name":"贵州省","child":{"520100":{"name":"贵阳市","child":{"520101":"市辖区","520102":"南明区","520103":"云岩区","520111":"花溪区","520112":"乌当区","520113":"白云区","520115":"观山湖区","520121":"开阳县","520122":"息烽县","520123":"修文县","520181":"清镇市"}},"520200":{"name":"六盘水市","child":{"520201":"钟山区","520203":"六枝特区","520221":"水城县","520222":"盘县"}},"520300":{"name":"遵义市","child":{"520301":"市辖区","520302":"红花岗区","520303":"汇川区","520304":"播州区","520322":"桐梓县","520323":"绥阳县","520324":"正安县","520325":"道真仡佬族苗族自治县","520326":"务川仡佬族苗族自治县","520327":"凤冈县","520328":"湄潭县","520329":"余庆县","520330":"习水县","520381":"赤水市","520382":"仁怀市"}},"520400":{"name":"安顺市","child":{"520401":"市辖区","520402":"西秀区","520403":"平坝区","520422":"普定县","520423":"镇宁布依族苗族自治县","520424":"关岭布依族苗族自治县","520425":"紫云苗族布依族自治县"}},"520500":{"name":"毕节市","child":{"520501":"市辖区","520502":"七星关区","520521":"大方县","520522":"黔西县","520523":"金沙县","520524":"织金县","520525":"纳雍县","520526":"威宁彝族回族苗族自治县","520527":"赫章县"}},"520600":{"name":"铜仁市","child":{"520601":"市辖区","520602":"碧江区","520603":"万山区","520621":"江口县","520622":"玉屏侗族自治县","520623":"石阡县","520624":"思南县","520625":"印江土家族苗族自治县","520626":"德江县","520627":"沿河土家族自治县","520628":"松桃苗族自治县"}},"522300":{"name":"黔西南布依族苗族自治州","child":{"522301":"兴义市","522322":"兴仁县","522323":"普安县","522324":"晴隆县","522325":"贞丰县","522326":"望谟县","522327":"册亨县","522328":"安龙县"}},"522600":{"name":"黔东南苗族侗族自治州","child":{"522601":"凯里市","522622":"黄平县","522623":"施秉县","522624":"三穗县","522625":"镇远县","522626":"岑巩县","522627":"天柱县","522628":"锦屏县","522629":"剑河县","522630":"台江县","522631":"黎平县","522632":"榕江县","522633":"从江县","522634":"雷山县","522635":"麻江县","522636":"丹寨县"}},"522700":{"name":"黔南布依族苗族自治州","child":{"522701":"都匀市","522702":"福泉市","522722":"荔波县","522723":"贵定县","522725":"瓮安县","522726":"独山县","522727":"平塘县","522728":"罗甸县","522729":"长顺县","522730":"龙里县","522731":"惠水县","522732":"三都水族自治县"}}}},"530000":{"name":"云南省","child":{"530100":{"name":"昆明市","child":{"530101":"市辖区","530102":"五华区","530103":"盘龙区","530111":"官渡区","530112":"西山区","530113":"东川区","530114":"呈贡区","530122":"晋宁县","530124":"富民县","530125":"宜良县","530126":"石林彝族自治县","530127":"嵩明县","530128":"禄劝彝族苗族自治县","530129":"寻甸回族彝族自治县","530181":"安宁市"}},"530300":{"name":"曲靖市","child":{"530301":"市辖区","530302":"麒麟区","530303":"沾益区","530321":"马龙县","530322":"陆良县","530323":"师宗县","530324":"罗平县","530325":"富源县","530326":"会泽县","530381":"宣威市"}},"530400":{"name":"玉溪市","child":{"530401":"市辖区","530402":"红塔区","530403":"江川区","530422":"澄江县","530423":"通海县","530424":"华宁县","530425":"易门县","530426":"峨山彝族自治县","530427":"新平彝族傣族自治县","530428":"元江哈尼族彝族傣族自治县"}},"530500":{"name":"保山市","child":{"530501":"市辖区","530502":"隆阳区","530521":"施甸县","530523":"龙陵县","530524":"昌宁县","530581":"腾冲市"}},"530600":{"name":"昭通市","child":{"530601":"市辖区","530602":"昭阳区","530621":"鲁甸县","530622":"巧家县","530623":"盐津县","530624":"大关县","530625":"永善县","530626":"绥江县","530627":"镇雄县","530628":"彝良县","530629":"威信县","530630":"水富县"}},"530700":{"name":"丽江市","child":{"530701":"市辖区","530702":"古城区","530721":"玉龙纳西族自治县","530722":"永胜县","530723":"华坪县","530724":"宁蒗彝族自治县"}},"530800":{"name":"普洱市","child":{"530801":"市辖区","530802":"思茅区","530821":"宁洱哈尼族彝族自治县","530822":"墨江哈尼族自治县","530823":"景东彝族自治县","530824":"景谷傣族彝族自治县","530825":"镇沅彝族哈尼族拉祜族自治县","530826":"江城哈尼族彝族自治县","530827":"孟连傣族拉祜族佤族自治县","530828":"澜沧拉祜族自治县","530829":"西盟佤族自治县"}},"530900":{"name":"临沧市","child":{"530901":"市辖区","530902":"临翔区","530921":"凤庆县","530922":"云县","530923":"永德县","530924":"镇康县","530925":"双江拉祜族佤族布朗族傣族自治县","530926":"耿马傣族佤族自治县","530927":"沧源佤族自治县"}},"532300":{"name":"楚雄彝族自治州","child":{"532301":"楚雄市","532322":"双柏县","532323":"牟定县","532324":"南华县","532325":"姚安县","532326":"大姚县","532327":"永仁县","532328":"元谋县","532329":"武定县","532331":"禄丰县"}},"532500":{"name":"红河哈尼族彝族自治州","child":{"532501":"个旧市","532502":"开远市","532503":"蒙自市","532504":"弥勒市","532523":"屏边苗族自治县","532524":"建水县","532525":"石屏县","532527":"泸西县","532528":"元阳县","532529":"红河县","532530":"金平苗族瑶族傣族自治县","532531":"绿春县","532532":"河口瑶族自治县"}},"532600":{"name":"文山壮族苗族自治州","child":{"532601":"文山市","532622":"砚山县","532623":"西畴县","532624":"麻栗坡县","532625":"马关县","532626":"丘北县","532627":"广南县","532628":"富宁县"}},"532800":{"name":"西双版纳傣族自治州","child":{"532801":"景洪市","532822":"勐海县","532823":"勐腊县"}},"532900":{"name":"大理白族自治州","child":{"532901":"大理市","532922":"漾濞彝族自治县","532923":"祥云县","532924":"宾川县","532925":"弥渡县","532926":"南涧彝族自治县","532927":"巍山彝族回族自治县","532928":"永平县","532929":"云龙县","532930":"洱源县","532931":"剑川县","532932":"鹤庆县"}},"533100":{"name":"德宏傣族景颇族自治州","child":{"533102":"瑞丽市","533103":"芒市","533122":"梁河县","533123":"盈江县","533124":"陇川县"}},"533300":{"name":"怒江傈僳族自治州","child":{"533301":"泸水市","533323":"福贡县","533324":"贡山独龙族怒族自治县","533325":"兰坪白族普米族自治县"}},"533400":{"name":"迪庆藏族自治州","child":{"533401":"香格里拉市","533422":"德钦县","533423":"维西傈僳族自治县"}}}},"540000":{"name":"西藏自治区","child":{"540100":{"name":"拉萨市","child":{"540101":"市辖区","540102":"城关区","540103":"堆龙德庆区","540121":"林周县","540122":"当雄县","540123":"尼木县","540124":"曲水县","540126":"达孜县","540127":"墨竹工卡县"}},"540200":{"name":"日喀则市","child":{"540202":"桑珠孜区","540221":"南木林县","540222":"江孜县","540223":"定日县","540224":"萨迦县","540225":"拉孜县","540226":"昂仁县","540227":"谢通门县","540228":"白朗县","540229":"仁布县","540230":"康马县","540231":"定结县","540232":"仲巴县","540233":"亚东县","540234":"吉隆县","540235":"聂拉木县","540236":"萨嘎县","540237":"岗巴县"}},"540300":{"name":"昌都市","child":{"540302":"卡若区","540321":"江达县","540322":"贡觉县","540323":"类乌齐县","540324":"丁青县","540325":"察雅县","540326":"八宿县","540327":"左贡县","540328":"芒康县","540329":"洛隆县","540330":"边坝县"}},"540400":{"name":"林芝市","child":{"540402":"巴宜区","540421":"工布江达县","540422":"米林县","540423":"墨脱县","540424":"波密县","540425":"察隅县","540426":"朗县"}},"540500":{"name":"山南市","child":{"540501":"市辖区","540502":"乃东区","540521":"扎囊县","540522":"贡嘎县","540523":"桑日县","540524":"琼结县","540525":"曲松县","540526":"措美县","540527":"洛扎县","540528":"加查县","540529":"隆子县","540530":"错那县","540531":"浪卡子县"}},"542400":{"name":"那曲地区","child":{"542421":"那曲县","542422":"嘉黎县","542423":"比如县","542424":"聂荣县","542425":"安多县","542426":"申扎县","542427":"索县","542428":"班戈县","542429":"巴青县","542430":"尼玛县","542431":"双湖县"}},"542500":{"name":"阿里地区","child":{"542521":"普兰县","542522":"札达县","542523":"噶尔县","542524":"日土县","542525":"革吉县","542526":"改则县","542527":"措勤县"}}}},"610000":{"name":"陕西省","child":{"610100":{"name":"西安市","child":{"610101":"市辖区","610102":"新城区","610103":"碑林区","610104":"莲湖区","610111":"灞桥区","610112":"未央区","610113":"雁塔区","610114":"阎良区","610115":"临潼区","610116":"长安区","610117":"高陵区","610122":"蓝田县","610124":"周至县","610125":"户县"}},"610200":{"name":"铜川市","child":{"610201":"市辖区","610202":"王益区","610203":"印台区","610204":"耀州区","610222":"宜君县"}},"610300":{"name":"宝鸡市","child":{"610301":"市辖区","610302":"渭滨区","610303":"金台区","610304":"陈仓区","610322":"凤翔县","610323":"岐山县","610324":"扶风县","610326":"眉县","610327":"陇县","610328":"千阳县","610329":"麟游县","610330":"凤县","610331":"太白县"}},"610400":{"name":"咸阳市","child":{"610401":"市辖区","610402":"秦都区","610403":"杨陵区","610404":"渭城区","610422":"三原县","610423":"泾阳县","610424":"乾县","610425":"礼泉县","610426":"永寿县","610427":"彬县","610428":"长武县","610429":"旬邑县","610430":"淳化县","610431":"武功县","610481":"兴平市"}},"610500":{"name":"渭南市","child":{"610501":"市辖区","610502":"临渭区","610503":"华州区","610522":"潼关县","610523":"大荔县","610524":"合阳县","610525":"澄城县","610526":"蒲城县","610527":"白水县","610528":"富平县","610581":"韩城市","610582":"华阴市"}},"610600":{"name":"延安市","child":{"610601":"市辖区","610602":"宝塔区","610603":"安塞区","610621":"延长县","610622":"延川县","610623":"子长县","610625":"志丹县","610626":"吴起县","610627":"甘泉县","610628":"富县","610629":"洛川县","610630":"宜川县","610631":"黄龙县","610632":"黄陵县"}},"610700":{"name":"汉中市","child":{"610701":"市辖区","610702":"汉台区","610721":"南郑县","610722":"城固县","610723":"洋县","610724":"西乡县","610725":"勉县","610726":"宁强县","610727":"略阳县","610728":"镇巴县","610729":"留坝县","610730":"佛坪县"}},"610800":{"name":"榆林市","child":{"610801":"市辖区","610802":"榆阳区","610803":"横山区","610821":"神木县","610822":"府谷县","610824":"靖边县","610825":"定边县","610826":"绥德县","610827":"米脂县","610828":"佳县","610829":"吴堡县","610830":"清涧县","610831":"子洲县"}},"610900":{"name":"安康市","child":{"610901":"市辖区","610902":"汉滨区","610921":"汉阴县","610922":"石泉县","610923":"宁陕县","610924":"紫阳县","610925":"岚皋县","610926":"平利县","610927":"镇坪县","610928":"旬阳县","610929":"白河县"}},"611000":{"name":"商洛市","child":{"611001":"市辖区","611002":"商州区","611021":"洛南县","611022":"丹凤县","611023":"商南县","611024":"山阳县","611025":"镇安县","611026":"柞水县"}}}},"620000":{"name":"甘肃省","child":{"620100":{"name":"兰州市","child":{"620101":"市辖区","620102":"城关区","620103":"七里河区","620104":"西固区","620105":"安宁区","620111":"红古区","620121":"永登县","620122":"皋兰县","620123":"榆中县"}},"620200":{"name":"嘉峪关市","child":{"620201":"市辖区"}},"620300":{"name":"金昌市","child":{"620301":"市辖区","620302":"金川区","620321":"永昌县"}},"620400":{"name":"白银市","child":{"620401":"市辖区","620402":"白银区","620403":"平川区","620421":"靖远县","620422":"会宁县","620423":"景泰县"}},"620500":{"name":"天水市","child":{"620501":"市辖区","620502":"秦州区","620503":"麦积区","620521":"清水县","620522":"秦安县","620523":"甘谷县","620524":"武山县","620525":"张家川回族自治县"}},"620600":{"name":"武威市","child":{"620601":"市辖区","620602":"凉州区","620621":"民勤县","620622":"古浪县","620623":"天祝藏族自治县"}},"620700":{"name":"张掖市","child":{"620701":"市辖区","620702":"甘州区","620721":"肃南裕固族自治县","620722":"民乐县","620723":"临泽县","620724":"高台县","620725":"山丹县"}},"620800":{"name":"平凉市","child":{"620801":"市辖区","620802":"崆峒区","620821":"泾川县","620822":"灵台县","620823":"崇信县","620824":"华亭县","620825":"庄浪县","620826":"静宁县"}},"620900":{"name":"酒泉市","child":{"620901":"市辖区","620902":"肃州区","620921":"金塔县","620922":"瓜州县","620923":"肃北蒙古族自治县","620924":"阿克塞哈萨克族自治县","620981":"玉门市","620982":"敦煌市"}},"621000":{"name":"庆阳市","child":{"621001":"市辖区","621002":"西峰区","621021":"庆城县","621022":"环县","621023":"华池县","621024":"合水县","621025":"正宁县","621026":"宁县","621027":"镇原县"}},"621100":{"name":"定西市","child":{"621101":"市辖区","621102":"安定区","621121":"通渭县","621122":"陇西县","621123":"渭源县","621124":"临洮县","621125":"漳县","621126":"岷县"}},"621200":{"name":"陇南市","child":{"621201":"市辖区","621202":"武都区","621221":"成县","621222":"文县","621223":"宕昌县","621224":"康县","621225":"西和县","621226":"礼县","621227":"徽县","621228":"两当县"}},"622900":{"name":"临夏回族自治州","child":{"622901":"临夏市","622921":"临夏县","622922":"康乐县","622923":"永靖县","622924":"广河县","622925":"和政县","622926":"东乡族自治县","622927":"积石山保安族东乡族撒拉族自治县"}},"623000":{"name":"甘南藏族自治州","child":{"623001":"合作市","623021":"临潭县","623022":"卓尼县","623023":"舟曲县","623024":"迭部县","623025":"玛曲县","623026":"碌曲县","623027":"夏河县"}}}},"630000":{"name":"青海省","child":{"630100":{"name":"西宁市","child":{"630101":"市辖区","630102":"城东区","630103":"城中区","630104":"城西区","630105":"城北区","630121":"大通回族土族自治县","630122":"湟中县","630123":"湟源县"}},"630200":{"name":"海东市","child":{"630202":"乐都区","630203":"平安区","630222":"民和回族土族自治县","630223":"互助土族自治县","630224":"化隆回族自治县","630225":"循化撒拉族自治县"}},"632200":{"name":"海北藏族自治州","child":{"632221":"门源回族自治县","632222":"祁连县","632223":"海晏县","632224":"刚察县"}},"632300":{"name":"黄南藏族自治州","child":{"632321":"同仁县","632322":"尖扎县","632323":"泽库县","632324":"河南蒙古族自治县"}},"632500":{"name":"海南藏族自治州","child":{"632521":"共和县","632522":"同德县","632523":"贵德县","632524":"兴海县","632525":"贵南县"}},"632600":{"name":"果洛藏族自治州","child":{"632621":"玛沁县","632622":"班玛县","632623":"甘德县","632624":"达日县","632625":"久治县","632626":"玛多县"}},"632700":{"name":"玉树藏族自治州","child":{"632701":"玉树市","632722":"杂多县","632723":"称多县","632724":"治多县","632725":"囊谦县","632726":"曲麻莱县"}},"632800":{"name":"海西蒙古族藏族自治州","child":{"632801":"格尔木市","632802":"德令哈市","632821":"乌兰县","632822":"都兰县","632823":"天峻县"}}}},"640000":{"name":"宁夏回族自治区","child":{"640100":{"name":"银川市","child":{"640101":"市辖区","640104":"兴庆区","640105":"西夏区","640106":"金凤区","640121":"永宁县","640122":"贺兰县","640181":"灵武市"}},"640200":{"name":"石嘴山市","child":{"640201":"市辖区","640202":"大武口区","640205":"惠农区","640221":"平罗县"}},"640300":{"name":"吴忠市","child":{"640301":"市辖区","640302":"利通区","640303":"红寺堡区","640323":"盐池县","640324":"同心县","640381":"青铜峡市"}},"640400":{"name":"固原市","child":{"640401":"市辖区","640402":"原州区","640422":"西吉县","640423":"隆德县","640424":"泾源县","640425":"彭阳县"}},"640500":{"name":"中卫市","child":{"640501":"市辖区","640502":"沙坡头区","640521":"中宁县","640522":"海原县"}}}},"650000":{"name":"新疆维吾尔自治区","child":{"650100":{"name":"乌鲁木齐市","child":{"650101":"市辖区","650102":"天山区","650103":"沙依巴克区","650104":"新市区","650105":"水磨沟区","650106":"头屯河区","650107":"达坂城区","650109":"米东区","650121":"乌鲁木齐县"}},"650200":{"name":"克拉玛依市","child":{"650201":"市辖区","650202":"独山子区","650203":"克拉玛依区","650204":"白碱滩区","650205":"乌尔禾区"}},"650400":{"name":"吐鲁番市","child":{"650402":"高昌区","650421":"鄯善县","650422":"托克逊县"}},"650500":{"name":"哈密市","child":{"650502":"伊州区","650521":"巴里坤哈萨克自治县","650522":"伊吾县"}},"652300":{"name":"昌吉回族自治州","child":{"652301":"昌吉市","652302":"阜康市","652323":"呼图壁县","652324":"玛纳斯县","652325":"奇台县","652327":"吉木萨尔县","652328":"木垒哈萨克自治县"}},"652700":{"name":"博尔塔拉蒙古自治州","child":{"652701":"博乐市","652702":"阿拉山口市","652722":"精河县","652723":"温泉县"}},"652800":{"name":"巴音郭楞蒙古自治州","child":{"652801":"库尔勒市","652822":"轮台县","652823":"尉犁县","652824":"若羌县","652825":"且末县","652826":"焉耆回族自治县","652827":"和静县","652828":"和硕县","652829":"博湖县"}},"652900":{"name":"阿克苏地区","child":{"652901":"阿克苏市","652922":"温宿县","652923":"库车县","652924":"沙雅县","652925":"新和县","652926":"拜城县","652927":"乌什县","652928":"阿瓦提县","652929":"柯坪县"}},"653000":{"name":"克孜勒苏柯尔克孜自治州","child":{"653001":"阿图什市","653022":"阿克陶县","653023":"阿合奇县","653024":"乌恰县"}},"653100":{"name":"喀什地区","child":{"653101":"喀什市","653121":"疏附县","653122":"疏勒县","653123":"英吉沙县","653124":"泽普县","653125":"莎车县","653126":"叶城县","653127":"麦盖提县","653128":"岳普湖县","653129":"伽师县","653130":"巴楚县","653131":"塔什库尔干塔吉克自治县"}},"653200":{"name":"和田地区","child":{"653201":"和田市","653221":"和田县","653222":"墨玉县","653223":"皮山县","653224":"洛浦县","653225":"策勒县","653226":"于田县","653227":"民丰县"}},"654000":{"name":"伊犁哈萨克自治州","child":{"654002":"伊宁市","654003":"奎屯市","654004":"霍尔果斯市","654021":"伊宁县","654022":"察布查尔锡伯自治县","654023":"霍城县","654024":"巩留县","654025":"新源县","654026":"昭苏县","654027":"特克斯县","654028":"尼勒克县"}},"654200":{"name":"塔城地区","child":{"654201":"塔城市","654202":"乌苏市","654221":"额敏县","654223":"沙湾县","654224":"托里县","654225":"裕民县","654226":"和布克赛尔蒙古自治县"}},"654300":{"name":"阿勒泰地区","child":{"654301":"阿勒泰市","654321":"布尔津县","654322":"富蕴县","654323":"福海县","654324":"哈巴河县","654325":"青河县","654326":"吉木乃县"}},"659000":{"name":"自治区直辖县级行政区划","child":{"659001":"石河子市","659002":"阿拉尔市","659003":"图木舒克市","659004":"五家渠市","659006":"铁门关市"}}}}}
	// 省市县选择器
	function CityPicker(elementId, options){
		this.options = {};
		this.options.elementId = elementId; // 插件Id
		this.options.cityData = cityData; // 插件数据
		this.options.level = 2; // 0 省 1市 2县
		if(typeof options === 'object') tools.extend(this.options, options);
		var _cityData = this.options.cityData;
		// 获取初始化数据
		var data =  getInitData(this.options);
		var picker = new Picker(elementId, data, _endCallback, {triggerCallback: triggerCallback});
		// 获取初始化数据
		function getInitData(options){
			var data = [{}, {}, {}];
			var firstCity = true;
			var firstCounty = true;
			// 遍历地区数据 找出符合条件的数据
			for(var i in options.cityData){
				data[0][i] = options.cityData[i].name;
				if(firstCity){
					if(options.cityData[i].child){
						for(var j in options.cityData[i].child){
							data[1][j] = options.cityData[i].child[j].name;
							if(firstCounty){
								if(options.cityData[i].child[j].child){
									for(var k in options.cityData[i].child[j].child){
										if(options.cityData[i].child[j].child[k] == "市辖区") continue;
										data[2][k] = options.cityData[i].child[j].child[k];
									}
								}
								firstCounty = false;
							}
						}
					}
					firstCity = false;
				}
			}
			if(options.level == 0) data.length = 1;
			if(options.level == 1) data.length = 2;
			if(options.level == 2) data.length = 3;
			return data;
		}
		
		// 触发插件回调
		function triggerCallback(options){
			var childNodes = options.picker.querySelector(".picker-content").childNodes;
			var keyArr = options.triggerItem.getAttribute("data-key").split(options.connector);
			options.data[1] = {};
			options.data[2] = {};
			var lists = [];
			for(var i in _cityData[keyArr[0]].child){
				options.data[1][i] = _cityData[keyArr[0]].child[i].name;
				lists.push(tools.parseDom('<div class="picker-slot-content-item" data-key="' + i + '">' + _cityData[keyArr[0]].child[i].name + '</div>'));
			}
			tools.replaceChildNodes(childNodes[1].querySelector(".picker-slot-content"), lists);
			lists = [];
			for(var i in _cityData[keyArr[0]].child[keyArr[1]].child){
				if(_cityData[keyArr[0]].child[keyArr[1]].child[i] == "市辖区") continue;
				options.data[2][i] = _cityData[keyArr[0]].child[keyArr[1]].child[i];
				lists.push(tools.parseDom('<div class="picker-slot-content-item" data-key="' + i + '">' + _cityData[keyArr[0]].child[keyArr[1]].child[i] + '</div>'));
			}
			tools.replaceChildNodes(childNodes[2].querySelector(".picker-slot-content"), lists);
		}
		
		// 滑动结束回调函数
		function _endCallback(options){
			var childNodes = document.querySelector(options.elementId).parentNode.childNodes;
			if(document.querySelector(options.elementId) == childNodes[2]) return;
			var proviceKey = childNodes[0].querySelector(".picker-slot-content-item.selected").getAttribute("data-key");
			var cityKey = childNodes[1].querySelector(".picker-slot-content-item.selected").getAttribute("data-key");
			var height = options.moveItem.querySelector(".picker-slot-content-item").offsetHeight;
			if(document.querySelector(options.elementId) == childNodes[0]){
				setCity(_cityData[proviceKey].child, childNodes, height);
				cityKey = childNodes[1].querySelector(".picker-slot-content-item.selected").getAttribute("data-key");
				setCountry(_cityData[proviceKey].child[cityKey].child, childNodes, height);
			}else if(document.querySelector(options.elementId) == childNodes[1]){
				setCountry(_cityData[proviceKey].child[cityKey].child, childNodes, height);
			}
		}
		
		// 城市数据更新
		function setCity(cityLists, childNodes, height){
			var lists = [];
			var isFirst = true;
			for(var i in cityLists){
				var list = tools.parseDom('<div class="picker-slot-content-item" data-key="' + i + '">' + cityLists[i].name + '</div>');
				if(isFirst){
					list = tools.parseDom('<div class="picker-slot-content-item selected" data-key="' + i + '">' + cityLists[i].name + '</div>');
					isFirst = false;
				}
				lists.push(list);
			}
			tools.replaceChildNodes(childNodes[1].querySelector(".picker-slot-content"), lists);
			tools.css2D(childNodes[1].querySelector(".picker-slot-content"), "translateY",  height*3)
		}
		
		// 市县数据更新
		function setCountry(countryLists, childNodes, height){
			var lists = [];
			var isFirst = true;
			for(var i in countryLists){
				if(countryLists[i] == "市辖区") continue;	
				var list = tools.parseDom('<div class="picker-slot-content-item" data-key="' + i + '">' + countryLists[i] + '</div>');
				if(isFirst){
					list = tools.parseDom('<div class="picker-slot-content-item selected" data-key="' + i + '">' + countryLists[i] + '</div>');
					isFirst = false;
				}
				lists.push(list);
			}
			tools.replaceChildNodes(childNodes[2].querySelector(".picker-slot-content"), lists);
			tools.css2D(childNodes[2].querySelector(".picker-slot-content"), "translateY",  height*3)
		}
	}
	// 销毁实例
	CityPicker.prototype.destroy = function(){
		delete this;
	}
	w.CityPicker = CityPicker;
	
	// 选择器
	function Picker(elementId, data, endCallback, options){
		this.options = {};
		this.options.elementId = elementId; // 插件Id
		this.options.data = data; // 插件数据
		this.options.triggerItem = document.querySelector(elementId); // 触发插件的元素
		this.options.picker; // 插件
		this.options.suffix = tools.rndNum(8); // 随机数
		this.options.isMove = false; // 触发插件元素点击时候是否有移动
		this.options.connector = " ";
		if(typeof options === 'object') tools.extend(this.options, options);
		// 触发插件元素添加Tap事件监听
		addTapEvet(this.options);
		// 插件初始化
		init(this.options);
		// 确定
		addDetermineEvent(this.options);
		// 取消
		addCancelEvent(this.options);
		// 插件初始化
		function init(options){
			var str = "";
			str += '<div id="' + options.elementId + options.suffix +'" class="picker">'
				str += '<div class="picker-title">'
					str += '<div class="cancel">取消</div>'
					str += '<div class="text">选择器</div>'
					str += '<div class="determine">确定</div>'
				str += '</div>'
				str += '<div class="picker-content">'
					var firstKeyArr = [];
					var firstValueArr = [];
					var firstKey;
					var firstValue;
					var isArray = false; 
					if(options.data[0] instanceof Array) isArray = true;
					for(var index in options.data){
						firstKey = "";
						firstValue = "";
						str += '<div id="pickerSlot' + index + options.suffix + '" class="picker-slot">'
							str += '<div class="picker-slot-content content-block">'
						for(var i in options.data[index]){
							var key = i;
							if(isArray) key = options.data[index][i];
							if(!firstKey) firstKey = key;
							if(!firstValue) firstValue =  options.data[index][i];
							str += '<div class="picker-slot-content-item" data-key="' + key + '">' +  options.data[index][i] + '</div>'
						}
							str += '</div>'
						str += '</div>'
						firstKeyArr.push(firstKey);
						firstValueArr.push(firstValue);
					}
				str += '</div>'
				str += '<div class="select-column"></div>'
			str += '</div>'
			if(!options.triggerItem.getAttribute("data-key")){
				options.triggerItem.setAttribute("data-key", firstKeyArr.join(options.connector));
				options.triggerItem.innerText = firstValueArr.join(options.connector);
			}
			document.querySelector(".page").appendChild(tools.parseDom(str));
			options.picker = document.getElementById(options.elementId + options.suffix);
			tools.css2D(options.picker, "translateY", options.picker.offsetHeight);
			options.picker.addEventListener("transitionend", function(){
				if(tools.css2D(options.picker, "translateY") == "0") return;
				tools.removeMak();
			});
			var pickerSlot = options.picker.getElementsByClassName("picker-slot");
			for(var i = 0; i < pickerSlot.length; i++){
				new VerticalMove("#" + pickerSlot[i].getAttribute("id"), {startCallback: _startCallback, endCallback: _endCallback, forbitTopBackRubberBanding: true, forbitBottomBackRubberBanding: true});
			}
		}
		// 触发插件元素添加Tap事件监听
		function addTapEvet(options){
			options.triggerItem.addEventListener("touchstart", function(){
				options.isMove = false;
			});
			options.triggerItem.addEventListener("touchmove", function(){
				options.isMove = true;
			});
			options.triggerItem.addEventListener("touchend", function(ev){
				ev = ev || event;
				if(options.isMove) return;
				options.picker.style.transition = ".2s ease-out transform";
				tools.css2D(options.picker, "translateY", 0);
				tools.addMask();
				var maskMove = false;
				var mask = document.querySelector(".mask")
				mask.addEventListener("touchstart", function(){
					maskMove = false;
				});
				mask.addEventListener("touchmove", function(){
					maskMove = true;
				});
				mask.addEventListener("touchend", function(ev){
					if(maskMove) return;
					tools.css2D(options.picker, "translateY", options.picker.offsetHeight);
				});
				if(options.triggerCallback && typeof options.triggerCallback == "function") options.triggerCallback(options);
				var pickerSlot = options.picker.getElementsByClassName("picker-slot");
				var EqualIndex = 0; // 第几列
				var equalPosition; // 哪个位置
				var keyArr = options.triggerItem.getAttribute("data-key").split(options.connector);
				var isArray = false; 
				if(options.data[0] instanceof Array) isArray = true;
				for(var index in options.data){
					equalPosition = 0;
					for(var i in options.data[index]){
						var key = i;
						if(isArray) key = options.data[index][i];
						equalPosition++;
						if(key == keyArr[EqualIndex]){
							EqualIndex++;
							break;
						}
					}
					tools.css2D(pickerSlot[EqualIndex - 1].querySelector(".picker-slot-content"), "translateY", options.picker.querySelector(".picker-slot-content-item").offsetHeight * (4 - equalPosition))
					if(pickerSlot[EqualIndex - 1].querySelector(".picker-slot-content-item.selected")) tools.removeClass(pickerSlot[EqualIndex - 1].querySelector(".picker-slot-content-item.selected"),"selected");
					tools.addClass(tools.nth(pickerSlot[EqualIndex - 1], "div", equalPosition), "selected");
				}
			});
		}
		
		// 确定
		function addDetermineEvent(options){
			var determineItem = options.picker.querySelector(".determine");
			var isMove = false;
			determineItem.addEventListener("touchstart", function(){
				isMove = false;
			});
			determineItem.addEventListener("touchmove", function(){
				isMove = true;
			});
			determineItem.addEventListener("touchend", function(ev){
				ev.stopPropagation();
				if(isMove) return;
				var keyArr =[];
				var valueArr =[];
				var pickerSlot = options.picker.getElementsByClassName("picker-slot");
				for(var i = 0; i < pickerSlot.length; i++){
					keyArr.push(pickerSlot[i].querySelector(".picker-slot-content-item.selected").getAttribute("data-key"));
					valueArr.push(pickerSlot[i].querySelector(".picker-slot-content-item.selected").innerText);
				}
				options.triggerItem.setAttribute("data-key", keyArr.join(options.connector));
				options.triggerItem.innerText = valueArr.join(options.connector);
				tools.css2D(options.picker, "translateY", options.picker.offsetHeight);
			});
		}
		
		// 取消
		function addCancelEvent(options){
			var cancelItem = options.picker.querySelector(".cancel");
			var isMove = false;
			cancelItem.addEventListener("touchstart", function(ev){
				isMove = false;
			});
			cancelItem.addEventListener("touchmove", function(ev){
				isMove = true;
			});
			cancelItem.addEventListener("touchend", function(ev){
				ev.stopPropagation();
				if(isMove) return;
				tools.css2D(options.picker, "translateY", options.picker.offsetHeight);
			});
		}
		
		// 滑动开始回调
		function _startCallback(options){
			options.startPoint = tools.css2D(options.moveItem, "translateY");
		}
		// 滑动结束回调
		function _endCallback(options){
			var height = options.moveItem.querySelector(".picker-slot-content-item").offsetHeight;
			var nowPoint = tools.css2D(options.moveItem, "translateY")
			var selectPosition = Math.round(nowPoint / height);
			var selectIndex;
			options.moveItem.style.transition = "1s transform";
			if(nowPoint > height * 3){
				selectIndex = 0;
				tools.css2D(options.moveItem, "translateY",  height * 3)
			}else if(nowPoint < height*4-options.moveItem.offsetHeight){
				selectIndex = parseInt(options.moveItem.offsetHeight/height);
				if(selectIndex >= options.moveItem.querySelectorAll(".picker-slot-content-item").length) selectIndex = options.moveItem.querySelectorAll(".picker-slot-content-item").length - 1;
				tools.css2D(options.moveItem, "translateY",  height*4-options.moveItem.offsetHeight)
			}else{
				selectIndex = 3 - selectPosition;
				options.moveItem.style.transition = "0.5s transform";
				tools.css2D(options.moveItem, "translateY", height * selectPosition) 
			}
			if(options.moveItem.querySelector(".picker-slot-content-item.selected")) tools.removeClass(options.moveItem.querySelector(".picker-slot-content-item.selected"),"selected");
			tools.addClass(tools.nth(options.moveItem, "div", selectIndex), "selected");
			if(endCallback && typeof endCallback == "function") endCallback(options);
		}
	}
	// 销毁实例
	Picker.prototype.destroy = function(){
		delete this;
	}
	w.Picker = Picker;
	
	// 下拉刷新
	var pullLayer, pullStartCallback, pullMoveCallback, pullEndCallback;
	util.pullRefresh = function(callback){
		scrollVerticalMove.options.wrap.insertBefore(tools.parseDom('<div class="pull-refresh-layer"><div class="pull-icon"></div></div>'), scrollVerticalMove.options.moveItem);
		pullLayer = scrollVerticalMove.options.wrap.querySelector(".pull-refresh-layer");
		tools.css2D(pullLayer, "translateY", -pullLayer.offsetHeight);
		var deg;
		var timer
		pullStartCallback = function(options){
			clearInterval(timer)
			timer = null;
			deg = 0;
			pullLayer.querySelector(".pull-icon").style.transform = "rotate(" + deg + "deg)";
		}
		pullMoveCallback = function(options){
			pullLayer.style.transition = "";
			scrollVerticalMove.options.forbitTopBackRubberBanding = false;
			pullEndCallback = null;
			tools.css2D(pullLayer, "translateY", -pullLayer.offsetHeight + tools.css2D(options.moveItem, "translateY"));
			if(tools.css2D(pullLayer, "translateY") >= 0){
				scrollVerticalMove.options.forbitTopBackRubberBanding = true;
				pullEndCallback = callback;
				if(timer) return;
				timer = setInterval(function(){
					deg += 180/(1000/60);
					if(deg >= 180) deg = 180;
					pullLayer.querySelector(".pull-icon").style.transform = "rotate(" + deg + "deg)";
					if(deg == 180){
						clearInterval(timer);
						timer = null;
					}
				}, 1000/60)
			}
		}
	}
	util.pullRefreshDone = function(){
		scrollVerticalMove.options.moveItem.style.transition = "1s transform";
		pullLayer.style.transition = "1s transform";
		tools.css2D(scrollVerticalMove.options.moveItem, "translateY",  0);
		tools.css2D(pullLayer, "translateY", -pullLayer.offsetHeight);
	}
	
	// 无限滚动
	var infiniteLayer, infiniteStartCallback, infiniteMoveCallback, infiniteEndCallback;
	util.infinite = function(callback){
		scrollVerticalMove.options.moveItem.appendChild(tools.parseDom('<div class="infinite-layer" style="display:none"><div class="infinite-icon"></div></div>'));
		infiniteLayer = scrollVerticalMove.options.wrap.querySelector(".infinite-layer");
		scrollVerticalMove.options.forbitBottomRubberBanding = true;
		infiniteMoveCallback = function(options){
			infiniteLayer.style.display = "block";
			scrollVerticalMove.options.minY = scrollVerticalMove.options.wrap.clientHeight - scrollVerticalMove.options.moveItem.offsetHeight;
			infiniteEndCallback = callback;
		}
	}
	util.loadingEnd = function(){
		infiniteLayer.style.display = "none";
		scrollVerticalMove.options.minY = scrollVerticalMove.options.wrap.clientHeight - scrollVerticalMove.options.moveItem.offsetHeight;
		 
	}
	
	var scrollVerticalMove;
	// 全局初始化
	globalInit();
	function globalInit(){
		var page = document.querySelector(".page");
		page.addEventListener("touchstart",function(ev){
			ev=ev||event;
			// 禁掉文字选中的默认行为 以及下拉的系统橡皮筋效果
			ev.preventDefault();
		})
		// 禁止掉默认行为后，对于a标签跳转需要自己手动写一下
		var aNodes =  document.getElementsByTagName("a");
		for(var i=0;i<aNodes.length;i++){
			aNodes[i].addEventListener("touchstart",function(){
				this.isMoved=false;
			});
			aNodes[i].addEventListener("touchmove",function(){
				this.isMoved=true;
			});
			aNodes[i].addEventListener("touchend",function(){
				if(!this.isMoved){
					location.href=this.href;
				}
			});
		}
		
		var pageContainer = document.querySelector(".page-container");
		if(!pageContainer) return;
		pageContainer.appendChild(tools.parseDom('<div class="scrollBar"></div>'))
		var content = document.querySelector(".page-container .content-block");
		var bar = document.querySelector(".scrollBar");
		scrollVerticalMove = new VerticalMove(".page-container", {
			startCallback: startCallback,
			moveCallback: moveCallback,
			endCallback: endCallback,
		});
		// 竖向滑屏一开始时触发
		function startCallback(options){
			if(content.offsetHeight <= pageContainer.offsetHeight) return;
			bar.style.height = (pageContainer.offsetHeight / content.offsetHeight) * pageContainer.offsetHeight + "px";
			bar.style.opacity = 1;
			if(tools.css2D(options.moveItem, "translateY") >= 0 && pullStartCallback && typeof pullStartCallback == "function") pullStartCallback(options);
		}
		// 竖向滑屏滑动中持续触发
		function moveCallback(options){
			// 滚动条滚动的实时距离/滚动条能滚动的最远距离 = 内容滚动的实时距离 / 内容能滚动的最远距离
			var scale = tools.css2D(options.moveItem, "translateY") / (content.offsetHeight - pageContainer.offsetHeight);
			tools.css2D(bar, "translateY", -scale*(pageContainer.offsetHeight-bar.offsetHeight));
			if(tools.css2D(options.moveItem, "translateY") >= 0 && pullMoveCallback && typeof pullMoveCallback == "function") pullMoveCallback(options);
			if(Math.ceil(tools.css2D(options.moveItem, "translateY")) <= options.minY + 50){
				if(infiniteMoveCallback && typeof infiniteMoveCallback == "function") infiniteMoveCallback(options);
			}
		}
		// 竖向滑屏结束时触发
		function endCallback(options){
			bar.style.opacity = 0;
			if(tools.css2D(options.moveItem, "translateY") >= 0 && pullEndCallback && typeof pullEndCallback == "function") pullEndCallback(options);
			if(Math.ceil(tools.css2D(options.moveItem, "translateY")) <= options.minY + 50){
				if(infiniteEndCallback && typeof infiniteEndCallback == "function") infiniteEndCallback(options);
			}
		}
	}
	w.globalInit = globalInit;
	
})(window)