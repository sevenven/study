function reactive(obj) {
	return new Proxy(obj, {
		get(target, key) {
			// 依赖收集
			track(target, key);
			return typeof target[key] === 'object' ? reactive(target[key]) : target[key];
		},
		set(target, key, val) {
			target[key] = val;
			// 派发更新
			trigger(target, key);
		},
		deleteProperty(target, key) {
			delete target[key];
			trigger(target, key);
		}
	});
}

// 临时存储响应式函数
const effectStack = [];

// 将传入fn转换为一个响应式函数
function effect(fn, options = {}) {
	const e = createReactiveEffect(fn);
	e();
	return e;
}

function createReactiveEffect(fn) {
	// 封装一个高阶函数，除了执行fn，还要将自己放入effectStack为依赖收集做准备
	const effect = function (...args) {
		if (!effectStack.includes(effect)) {
			try {
				// 1.effect入栈
				effectStack.push(effect);
				// 2.执行fn
				return fn(...args);
			} finally {
				// 3.effect出栈
				effectStack.pop();
			}
		}
	};
	return effect;
}

// 存放响应式函数和目标、键之间的映射关系
const targetMap = new WeakMap();
console.log(targetMap);

// 依赖收集：建立target-key与fn之间映射关系
function track(target, key) {
	// 获取响应式函数
	const effect = effectStack[effectStack.length - 1];
	if (effect) {
		// 获取target映射关系map，不存在则创建
		let depMap = targetMap.get(target);
		!depMap && targetMap.set(target, (depMap = new Map()));
		// 获取key对应依赖集合，不存在则创建
		let deps = depMap.get(key);
		!deps && depMap.set(key, (deps = new Set()));
		// 将响应函数添加到依赖集合
		deps.add(effect);
	}
}

// 派发更新：当某个响应式数据发生变化，根据taeget-key获取对应的fn并执行他们
function trigger(target, key) {
	// 获取target对应依赖map
	const depMap = targetMap.get(target);
	if (!depMap) return;
	// 获取key对应集合
	const deps = depMap.get(key);
	// 执行所有响应函数
	deps && deps.forEach(dep => dep());
}

const state = reactive({
	foo: 'foo',
	bar: {
		baz: 1
	}
});

// effect(() => {
//   console.log("effect1", state.foo);
// });

// effect(() => {
//   console.log("effect2", state.bar);
// });

// state.foo = "foooo";
// state.bar = 123;
