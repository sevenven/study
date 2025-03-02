// 工具对象，用于处理不同类型的值
const promiseUtil = {
	// 根据值的类型决定如何处理
	_processValueByType(value, resolve, reject) {
		// 如果值是 Promise 实例，则调用其 then 方法
		if (value instanceof Promise) {
			value.then(
				_value => resolve(_value), // 成功时 resolve
				_reason => reject(_reason) // 失败时 reject
			);
		} else {
			// 否则直接 resolve 该值
			resolve(value);
		}
	}
};

// Promise 类
class Promise {
	// 构造函数，接收一个 executor 函数
	constructor(executor) {
		// Promise 的状态，初始为 "pending"
		this.promiseState = 'pending';
		// Promise 的结果值，初始为 null
		this.promiseResult = null;
		// 存储回调函数的数组
		this.callbacks = [];

		// resolve 函数，用于将 Promise 状态改为 "fulfilled"
		const resolve = value => {
			// 如果状态不是 "pending"，直接返回
			if (this.promiseState !== 'pending') return;
			// 更新状态为 "fulfilled"
			this.promiseState = 'fulfilled';
			// 更新结果值
			this.promiseResult = value;
			// 执行所有已注册的 onResolved 回调
			this.callbacks.forEach(item => item.onResolved());
		};

		// reject 函数，用于将 Promise 状态改为 "rejected"
		const reject = reason => {
			// 如果状态不是 "pending"，直接返回
			if (this.promiseState !== 'pending') return;
			// 更新状态为 "rejected"
			this.promiseState = 'rejected';
			// 更新结果值
			this.promiseResult = reason;
			// 执行所有已注册的 onRejected 回调
			this.callbacks.forEach(item => item.onRejected());
		};

		// 尝试执行 executor 函数
		try {
			executor(resolve, reject);
		} catch (error) {
			// 如果 executor 抛出错误，直接 reject
			reject(error);
		}
	}

	// then 方法，用于注册回调函数
	then(onResolved, onRejected) {
		// 如果 onResolved 不是函数，则提供一个默认函数
		if (typeof onResolved !== 'function') onResolved = value => value;
		// 如果 onRejected 不是函数，则提供一个默认函数
		if (typeof onRejected !== 'function')
			onRejected = reason => {
				throw reason;
			};

		// 返回一个新的 Promise
		return new Promise((resolve, reject) => {
			// 定义一个通用的回调处理函数
			const onCallback = callback => {
				try {
					// 执行回调函数并获取结果
					const result = callback(this.promiseResult);
					// 根据结果类型处理
					promiseUtil._processValueByType(result, resolve, reject);
				} catch (error) {
					// 如果回调函数抛出错误，直接 reject
					reject(error);
				}
			};

			// 如果当前状态是 "fulfilled"，执行 onResolved
			if (this.promiseState === 'fulfilled') {
				onCallback(onResolved);
			}
			// 如果当前状态是 "rejected"，执行 onRejected
			else if (this.promiseState === 'rejected') {
				onCallback(onRejected);
			}
			// 如果当前状态是 "pending"，将回调函数存入 callbacks 数组
			else {
				this.callbacks.push({
					onResolved: () => onCallback(onResolved),
					onRejected: () => onCallback(onRejected)
				});
			}
		});
	}

	// catch 方法，用于捕获错误
	catch(onRejected) {
		// 调用 then 方法，只传入 onRejected
		return this.then(null, onRejected);
	}

	// Promise.resolve 静态方法，用于创建一个已 resolve 的 Promise
	static resolve(value) {
		return new Promise((resolve, reject) => {
			// 根据值的类型处理
			promiseUtil._processValueByType(value, resolve, reject);
		});
	}

	// Promise.reject 静态方法，用于创建一个已 reject 的 Promise
	static reject(reason) {
		return new Promise((resolve, reject) => reject(reason));
	}

	// Promise.all 静态方法，用于处理多个 Promise
	static all(promises) {
		return new Promise((resolve, reject) => {
			// 存储结果的数组
			let arr = [];
			// 记录已完成的 Promise 数量
			let count = 0;
			// Promise 的总数
			const num = promises.length;

			// 遍历所有 Promise
			promises.forEach(promise => {
				promise.then(
					value => {
						// 将结果存入数组
						arr.push(value);
						// 增加已完成计数
						count++;
						// 如果所有 Promise 都已完成，resolve 结果数组
						if (count === num) {
							resolve(arr);
						}
					},
					reason => {
						// 如果任意一个 Promise 失败，直接 reject
						reject(reason);
					}
				);
			});
		});
	}

	// Promise.race 静态方法，用于处理多个 Promise，返回最先完成的 Promise
	static race(promises) {
		return new Promise((resolve, reject) => {
			// 遍历所有 Promise
			promises.forEach(promise => {
				promise.then(
					value => resolve(value), // 任意一个 Promise 成功，直接 resolve
					reason => reject(reason) // 任意一个 Promise 失败，直接 reject
				);
			});
		});
	}
}
