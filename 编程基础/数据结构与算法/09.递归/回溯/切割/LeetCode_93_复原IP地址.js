// https://leetcode.cn/problems/restore-ip-addresses/description/

// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s, startIndex = 0, path = [], result = []) {
	if (path.length > 4) return result;
	// 如果已经遍历完字符串，并且路径中的 IP 段正好是 4 个，将其加入结果
	if (startIndex === s.length && path.length === 4) {
		result.push(path.join('.'));
		return result;
	}

	for (let i = startIndex; i < s.length; i++) {
		const num = s.slice(startIndex, i + 1); // slice: 左闭右开
		if (!isValidIpAddresses(num)) break; // 如果当前 IP 段无效，直接跳出循环
		path.push(num);
		restoreIpAddresses(s, i + 1, path, result); // startIndex 隐藏回溯
		path.pop(); // 回溯，移除当前 IP 段
	}

	return result; // 返回所有有效的 IP 地址
};

function isValidIpAddresses(s) {
	if ((s[0] === '0' && s.length > 1) || Number(s) > 255) return false; // 如果 IP 段以 '0' 开头且长度大于 1，或者数值大于 255，则无效
	return true; // 否则有效
}

console.log(restoreIpAddresses('25525511135'));
console.log(restoreIpAddresses('0000'));
console.log(restoreIpAddresses('000'));
