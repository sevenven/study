// 修正后的测试数据（所有校验码都正确计算）
const testData = [
	{ name: '张伟', idCard: '110105198001010016', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区建国路88号华贸中心公寓', phone: '13800001234' },
	{ name: '王芳', idCard: '11010519850214002X', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区望京阜通东大街6号院望京SOHO塔2', phone: '13900005678' },
	{ name: '李强', idCard: '110105197806150038', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区酒仙桥路4号798艺术区职工宿舍', phone: '15800002468' },
	{ name: '刘洋', idCard: '110105199012250044', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区三里屯路19号太古里北区公寓', phone: '18600001357' },
	{ name: '陈静', idCard: '110105198308080051', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区朝阳北路大悦城8号楼', phone: '13700008080' },
	{ name: '杨光', idCard: '110105197512120060', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区安立路60号润枫德尚苑B区', phone: '15600009191' },
	{ name: '黄丽', idCard: '110105199506180074', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区豆各庄乡青青家园二期', phone: '18800003322' },
	{ name: '周涛', idCard: '110105198711220085', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区奥林匹克花园五期8号楼', phone: '13500006677' },
	{ name: '吴勇', idCard: '110105197203150098', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区垡头北里社区4号楼', phone: '15000004455' },
	{ name: '郑秀英', idCard: '110105199809090105', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区常营回族乡龙湖长楹天街西区', phone: '18900007788' },
	{ name: '孙明', idCard: '110105198404040113', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区十里堡甲1号城市华庭A座', phone: '13600001122' },
	{ name: '马小红', idCard: '110105197909190120', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区平房乡天鹅湾小区南区', phone: '15900006543' },
	{ name: '朱建国', idCard: '110105196510010138', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区呼家楼北里8号楼退休职工家属院', phone: '13300008899' },
	{ name: '胡燕', idCard: '110105199302280145', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区将台路丽都花园小区12栋', phone: '18700002345' },
	{ name: '林伟', idCard: '110105198612120150', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区双井富力城D区8号楼', phone: '13400006789' },
	{ name: '高敏', idCard: '110105197407070161', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区潘家园南里18号楼松榆里社区', phone: '15700001212' },
	{ name: '徐强', idCard: '110105199107230177', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区来广营西路朝来万通城3期', phone: '18600003434' },
	{ name: '何娟', idCard: '110105198910100182', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区金盏乡长店小区308号楼', phone: '13800005656' },
	{ name: '郭亮', idCard: '110105197611110191', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区管庄西里65号院', phone: '15100007878' },
	{ name: '罗婷', idCard: '110105199405050203', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区太阳宫中路12号君泰家园', phone: '18900001010' },
	{ name: '赵晓梅', idCard: '110105951031411', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区十里河村光彩路美联天地', phone: '13700002020' },
	{ name: '钱志强', idCard: '110105871212370', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区东坝乡怡景城花园小区', phone: '15200003030' },
	{ name: '孙丽华', idCard: '110105780325369', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区崔各庄乡奶西村梧桐湾小区', phone: '18800004040' },
	{ name: '李建国', idCard: '110105661111358', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区黑庄户乡定辛庄新村', phone: '13600005050' },
	{ name: '周小芳', idCard: '11010519920808341X', nativePlace: '北京市朝阳区', homeAddress: '北京市朝阳区东湖渠南利泽中园二区', phone: '15500006060' }
];

//  身份证号校验函数-校验通过返回{timestamp: number}，否则返回null
function validateIdCard(idCard) {
	if (!idCard || typeof idCard !== 'string') return null;

	idCard = idCard.trim().toUpperCase();
	const len = idCard.length;

	// 长度和格式校验
	if (len !== 15 && len !== 18) return null;
	if (len === 15 && !/^\d{15}$/.test(idCard)) return null;
	if (len === 18 && !/^\d{17}[\dX]$/i.test(idCard)) return null; // 加 i 忽略大小写

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

// 验证所有测试数据
console.log('=== 身份证校验测试 ===');
testData.forEach((person, index) => {
	const result = validateIdCard(person.idCard);
	const isValid = result !== null;
	const birthDate = isValid ? new Date(result.timestamp) : null;
	const age = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0;

	console.log(`${index + 1}. ${person.name} - ${person.idCard}`);
	console.log(`   结果: ${isValid ? '✓ 通过' : '✗ 失败'}`);
	if (isValid) {
		console.log(`出生: ${birthDate.toLocaleDateString()}`);
		console.log(`年龄: ${age}岁`);
		console.log('---', person.name);
	}
});

// 统计结果
const validCount = testData.filter(person => validateIdCard(person.idCard) !== null).length;
console.log(`总计: ${validCount}/${testData.length} 个身份证通过校验`);
