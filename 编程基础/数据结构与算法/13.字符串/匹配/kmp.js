function kmp(text, pattern) {
	if (pattern.length === 0) return 0;
	let j = 0,
		next = getNext(pattern);
	for (let i = 0; i < text.length; i++) {
		// 不相等且j > 0
		while (text[i] !== pattern[j] && j > 0) j = next[j - 1];
		// 相等
		if (text[i] === pattern[j]) j++;
		if (j === pattern.length) return i - pattern.length + 1;
	}
	return -1;
}

// next数组版本1 aabaab-010123
function getNext(pattern) {
	let next = [],
		L = 0; // 子串相等前缀末尾指针
	next.push(0); // 初始化
	// R-子串末尾指针
	for (let R = 1; R < pattern.length; R++) {
		// 不相等-缩短相等前缀长度
		while (pattern[L] !== pattern[R] && L > 0) L = next[L - 1];
		// 相等-新子串最长公共前后缀在旧子串最长公共前后缀的基础上最多+1
		if (pattern[L] === pattern[R]) L++;
		next.push(L); // 更新next数组
	}
	return next;
}

console.log(kmp('aaabaaabcaabaabe', 'aabaab'));
// next数组版本2
// next数组版本3
// next数组版本4
// nextval数组版本1
// nextval数组版本2
// nextval数组版本3
// nextval数组版本4

// console.log(kmp('aabaabaad', 'aabaaf'));
// console.log(kmp('BBCABCDABABCDABDABDE', 'ABCDABD'));
