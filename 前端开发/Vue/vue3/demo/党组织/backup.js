// 身份证号校验函数-校验通过返回{timestamp: number}，否则返回null
function validateIdCard(idCard) {
	if (!idCard || typeof idCard !== 'string') return null;
	idCard = idCard.trim().toUpperCase();
	const len = idCard.length;
	// 长度和格式校验
	if (len === 15 ? !/^\d{15}$/.test(idCard) : len === 18 ? !/^\d{17}[\dX]$/.test(idCard) : true) return null;
	// 省份代码校验
	const provinceCode = idCard.substring(0, 2);
	const validProvinces = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82'];
	if (!validProvinces.includes(provinceCode)) return null;
	// 提取出生日期
	let year, month, day;
	if (len === 15) {
		year = 1900 + parseInt(idCard.substring(6, 8));
		month = parseInt(idCard.substring(8, 10)) - 1;
		day = parseInt(idCard.substring(10, 12));
	} else {
		// 18位校验码验证
		const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		let sum = 0;
		for (let i = 0; i < 17; i++) sum += parseInt(idCard[i]) * weights[i];
		if (idCard[17] !== checkCodes[sum % 11]) return null;
		year = parseInt(idCard.substring(6, 10));
		month = parseInt(idCard.substring(10, 12)) - 1;
		day = parseInt(idCard.substring(12, 14));
	}
	// 日期有效性验证
	const birthDate = new Date(year, month, day);
	if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month || birthDate.getDate() !== day || birthDate > new Date()) return null;
	return { timestamp: birthDate.getTime() };
}
function getQueryParam(paramName) {
	const url = new URL(window.location.href);
	const paramValue = url.searchParams.get(paramName);
	if (!paramValue) return null;
	try {
		return JSON.parse(decodeURIComponent(paramValue));
	} catch {
		return paramValue; // 如果不是JSON，返回原始字符串
	}
}
function getCurOrgId() {
	const additionalQuery = getQueryParam('additional_query');
	try {
		if (additionalQuery?.curOrgId) {
			return additionalQuery?.curOrgId;
		} else {
			// 从window.parent.location.href获取curOrgId
			const url = new URL(window.parent.location.href);
			const path = url.pathname;
			// 去除开头和结尾的斜杠，然后按斜杠分割成数组
			const pathParts = path
				.trim()
				.replace(/^\/+|\/+$/g, '')
				.split('/');
			// 获取数组的最后一个元素
			const lastPart = pathParts[pathParts.length - 1];
			// 返回结果
			return lastPart || ''; // 如果为空则返回空字符串
		}
	} catch (error) {
		console.error('解析 URL 时发生错误:', error);
		return '';
	}
}
ctx.rawStore.getCurOrgId = getCurOrgId;

let curIndex; // 党员当前党组织关系Index
let curOrgIndex; // 当前编辑的明细行索引
let isHistory = false;
export function onPageLoad(payload) {
	if (pageStatus == 'new') {
		ctx.setState('qWIc1XyJsw', ctx.externalParams.url.cellId);
		ctx.getState('qg6YfU4bf0').map((item, index) => ctx.setState('zIZDkCXGYQ', 0, index)); // 将其他【党员组织关系转移明细子表】的【是否为党员当前党组织关系】置为0
		ctx.getState('qg6YfU4bf0').push({
			Y8ayXBIUhs: ctx.externalParams.url.cellId,
			zIZDkCXGYQ: 1
		});
		curOrgIndex = ctx.getState('qg6YfU4bf0').length - 1;
		ctx.setInstance('Q5pNWSkcKF', 'isHide', true);
		ctx.setInstance('N59NV2Ce66', 'isHide', true);
	} else if (pageStatus === 'temporary' || pageStatus === 'edit' || pageStatus === 'view') {
		curIndex = ctx.getState('qg6YfU4bf0').findIndex(item => item.zIZDkCXGYQ == '1');
		curOrgIndex = ctx.getState('qg6YfU4bf0').findIndex(item => item.Y8ayXBIUhs == getCurOrgId());
		isHistory = curIndex !== curOrgIndex;
		if (curOrgIndex === -1) {
			// 党委或党总支 todo 转出中的党员怎么办
			ctx.setInstance('Q5pNWSkcKF', 'isHide', true); // 隐藏转出到外部组织按钮
			ctx.setInstance('N59NV2Ce66', 'isHide', true); // 隐藏转出到内部组织按钮
			ctx.setInstance('dzc0L9VaaL', 'isHide', false); // 展示变动信息分组
			// 将明细表数据回填到党内信息分组
			ctx.setState('FQcCxnpbn9', ctx.getState('VOZ2eTuqDv', curIndex));
			ctx.setState('qWIc1XyJsw', ctx.getState('Y8ayXBIUhs', curIndex));
			ctx.setState('izKmdSQNcE', ctx.getState('Hg4njBlEwZ', curIndex));
			ctx.setState('dIqi6StHeA', ctx.getState('RMpWGxj9ag', curIndex));
			ctx.setState('QaJRlrj4PH', ctx.getState('UZFe3gamIL', curIndex)); // 党支部职务
			ctx.setState('k3UYtLSR7O', ctx.getState('EXaJSj9T0m', curIndex)); // 党总支职务
			ctx.setState('SZwJvLqgjB', ctx.getState('gpgo4JhgYW', curIndex)); // 党委职务
			ctx.on('fromCellReady', () => {
				ctx.emit('fromCellInit', ctx.getState('Em2FYTdLvq', curIndex));
				ctx.on('fromCellChange', async val => {
					ctx.setState('Em2FYTdLvq', val, curIndex);
				});
			});
		} else {
			// 党支部
			if (isHistory || ctx.getState('xZ9ZWfKzt6') === 'DRAFT') {
				ctx.setInstance('Q5pNWSkcKF', 'isHide', true); // 转出到外部组织按钮
				ctx.setInstance('N59NV2Ce66', 'isHide', true); // 转出到内部组织按钮
			}
			// 将明细表数据回填到党内信息分组
			ctx.setState('FQcCxnpbn9', ctx.getState('VOZ2eTuqDv', curOrgIndex));
			ctx.setState('qWIc1XyJsw', ctx.getState('Y8ayXBIUhs', curOrgIndex));
			ctx.setState('izKmdSQNcE', ctx.getState('Hg4njBlEwZ', curOrgIndex));
			ctx.setState('dIqi6StHeA', ctx.getState('RMpWGxj9ag', curOrgIndex));
			ctx.setState('QaJRlrj4PH', ctx.getState('UZFe3gamIL', curOrgIndex));
			ctx.setState('k3UYtLSR7O', ctx.getState('EXaJSj9T0m', curOrgIndex));
			ctx.setState('SZwJvLqgjB', ctx.getState('gpgo4JhgYW', curOrgIndex));
			// 展示转出信息分组&转出信息分组信息回填
			ctx.getState('VOZ2eTuqDv', curIndex) === 'external_transfer_out' && ctx.setInstance('DXFlW4oDrk', 'isHide', false);
			ctx.setState('zoZAt1k47n', ctx.getState('VOZ2eTuqDv', curIndex));
			ctx.setState('V48Uyq9obW', ctx.getState('Y8ayXBIUhs', curIndex));
			ctx.setState('OpDuH4PXla', ctx.getState('Hg4njBlEwZ', curIndex));
			if (ctx.getState('zIZDkCXGYQ', curOrgIndex) === '3') ctx.setInstance('WKhURsbATD', 'isHide', false); // 展示转出组织申请信息
			ctx.on('fromCellReady', () => {
				ctx.emit('fromCellInit', ctx.getState('Em2FYTdLvq', curOrgIndex));
				ctx.on('fromCellChange', async val => {
					ctx.setState('Em2FYTdLvq', val, curOrgIndex);
				});
			});
		}
		// 政治面貌为预备党员隐藏转正时间
		if (ctx.getState('pYqI6ooVcP') === 'probationary') {
			ctx.setInstance('xigmo2UBhE', 'isHide', true);
		}
	}
}
