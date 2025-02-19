const axios = require('axios');

// 配置对象说明
const config = {
	// 请求的 URL（如果是相对路径，会与 `baseURL` 拼接）
	url: '/user',
	// 请求方法，默认是 `get`
	method: 'get',
	// 请求的基础 URL，会与 `url` 拼接
	baseURL: 'https://some-domain.com/api/',
	// 在发送请求前对请求数据进行处理的函数数组
	transformRequest: [
		function (data, headers) {
			// 可以对请求数据进行处理
			return data;
		}
	],
	// 在接收到响应后对响应数据进行处理的函数数组
	transformResponse: [
		function (data) {
			// 可以对响应数据进行处理
			return data;
		}
	],
	// 自定义请求头
	headers: { 'X-Requested-With': 'XMLHttpRequest' },
	// URL 查询参数（仅适用于 `GET` 请求）
	params: {
		ID: 12345
	},
	// 自定义查询参数序列化函数
	paramsSerializer: function (params) {
		// 使用 Qs 库将参数序列化为字符串
		return Qs.stringify(params, { arrayFormat: 'brackets' });
	},
	// 请求体数据（适用于 `POST`, `PUT`, `PATCH` 请求）
	data: {
		firstName: 'Fred'
	},
	// 请求体数据（字符串形式）
	data: 'Country=Brasil&City=Belo Horizonte',
	// 请求超时时间（单位：毫秒），默认是 `0`永不超时
	timeout: 1000,
	// 是否携带跨域凭证（如 cookies），默认是 `false`
	withCredentials: false,
	// 自定义请求适配器
	adapter: function (config) {
		// 可以自定义请求逻辑
	},
	// HTTP 基本认证，包含 `username` 和 `password`
	auth: {
		username: 'janedoe',
		password: 's00pers3cret'
	},
	// 响应数据类型，默认是 `json`
	responseType: 'json',
	// 响应数据编码，默认是 `utf8`
	responseEncoding: 'utf8',
	// CSRF 令牌的 cookie 名称
	xsrfCookieName: 'XSRF-TOKEN',
	// CSRF 令牌的请求头名称
	xsrfHeaderName: 'X-XSRF-TOKEN',
	// 上传进度回调函数
	onUploadProgress: function (progressEvent) {
		// 可以监控上传进度
	},
	// 下载进度回调函数
	onDownloadProgress: function (progressEvent) {
		// 可以监控下载进度
	},
	// 响应内容的最大长度（单位：字节）
	maxContentLength: 2000,
	// 请求体数据的最大长度（单位：字节）
	maxBodyLength: 2000,
	// 自定义响应状态码的验证逻辑
	validateStatus: function (status) {
		// 默认验证逻辑：状态码在 200 到 299 之间表示成功
		return status >= 200 && status < 300;
	},
	// 最大重定向次数，默认是 5
	maxRedirects: 5,
	// Unix 套接字路径（用于 Node.js 环境）
	socketPath: null,
	// HTTP 代理配置（用于 Node.js 环境）
	// httpAgent: new http.Agent({ keepAlive: true }),
	// HTTPS 代理配置（用于 Node.js 环境）
	// httpsAgent: new https.Agent({ keepAlive: true }),
	// 代理服务器配置
	proxy: {
		protocol: 'https',
		host: '127.0.0.1',
		port: 9000,
		auth: {
			username: 'mikeymike',
			password: 'rapunz3l'
		}
	},
	// 用于取消请求的 `CancelToken` 对象
	// cancelToken: new CancelToken(function (cancel) {
	// 	// 可以通过 `cancel` 函数取消请求
	// }),
	// 是否自动解压响应内容，默认是 `true`
	decompress: true
};

// 设置配置对象默认值
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios
	.get('/items/1')
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		// 处理错误
		console.error('Error:', error);
	});
