<!-- 前置要求包含以下点： -->
<!-- 1. 环境中已有ant-design-vue@4.2.3、docx@8.5.0、utils、ctx可直接使用  -->
<!-- 2. ok-开头的组件为环境内置组件  -->
<!-- 3. 只改动明确要求改动的地方 包括：在不涉及代码改动情况下 不要删掉或改动原有注释  -->
<!-- 4. 请输出完整的组件代码 -->

<template>
	<!-- 按钮根据 hideButton 控制显示 -->
	<a-button v-if="!hideButton" :loading="exporting" :disabled="exporting || !hasData" type="primary" @click="handleButtonClick"> 导出 </a-button>
	<!-- 全屏 Loading 遮罩 -->
	<a-spin :spinning="exporting" tip="正在导出 Word 文档，请稍候..." />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const utils = exports.utils;
const ctx = exports.ctx;

// ======================== Props 定义 ========================
const props = defineProps({
	// 会议记录数据（来自 meeting_record 字段）
	meetingRecord: {
		type: Object,
		default: null
	},
	// 会议纪要数据（来自 meeting_summary 字段）
	meetingSummary: {
		type: Object,
		default: null
	},
	// 基础数据，包含会议名称等
	basicData: {
		type: Object,
		default: () => ({ meeting_name: '' })
	},
	// 导出类型数组：['record', 'summary', 'resolution'] 的组合
	types: {
		type: Array,
		default: () => ['summary'],
		validator: val => val.every(t => ['record', 'summary', 'resolution'].includes(t))
	},
	// 决议导出指定索引（从0开始），不传则导出全部决议
	resolutionIndexes: {
		type: Array,
		default: null
	},
	// 是否隐藏按钮（仅保留事件总线触发能力）
	hideButton: {
		type: Boolean,
		default: false
	},
	// 会议类型：party_committee 党委会 / office_meeting 办公会
	meetingType: {
		type: String,
		default: null
	}
});

// ======================== 状态与计算属性 ========================
const exporting = ref(false);

// 获取当前会议类型：优先使用传入的 props.meetingType，否则回退到全局状态
const meetingType = computed(() => {
	return props.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
});

// 判断是否有数据可导出
const hasData = computed(() => {
	return props.types.some(t => {
		if (t === 'record') return !!props.meetingRecord;
		if (t === 'summary') return !!props.meetingSummary;
		if (t === 'resolution') {
			return !!(props.meetingSummary?.proposal?.length || props.meetingRecord?.proposal?.length);
		}
		return false;
	});
});

// ======================== 辅助函数 ========================

// 获取导出日期-取当前日期
function getExportDate() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
}

// 中文数字转换（1 -> 一，2 -> 二，……）
function toChineseNumber(num) {
	const chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	if (num <= 10) return chinese[num];
	if (num < 20) return '十' + (num % 10 === 0 ? '' : chinese[num % 10]);
	if (num < 100) {
		const tens = Math.floor(num / 10);
		const ones = num % 10;
		return chinese[tens] + '十' + (ones === 0 ? '' : chinese[ones]);
	}
	return num.toString(); // 超过99直接返回数字
}

// 清洗标题中的数字前缀（如 "1. "、"2、" 等）
function cleanNumberPrefix(title) {
	if (!title) return '';
	return title.replace(/^[\d]+[、.．]\s*/, '');
}

// ======================== 文档生成函数 ========================

// 生成会议记录Word文档内容
function buildRecordContent(record) {
	const { Paragraph, TextRun, AlignmentType, convertInchesToTwip, LineRuleType } = window.docx;
	const children = [];

	const mt = meetingType.value;

	// ---- 标题：根据会议类型生成 ----
	// 标题字体：方正小标宋简体二号，行间距：34 磅，居中
	if (mt === 'party_committee') {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '党委会会议记录',
						size: 44, // 二号 = 22pt
						font: '方正小标宋_GBK'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 680, lineRule: LineRuleType.EXACT } // 34磅 = 680 twips
			})
		);
	} else {
		// 办公会标题：公司名称 + 会议记录标题 + 期数（如果有）
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '成都数据集团股份有限公司',
						size: 44,
						font: '方正小标宋_GBK'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 680, lineRule: LineRuleType.EXACT }
			})
		);
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '总经理办公会会议记录',
						size: 44,
						font: '方正小标宋_GBK'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 680, lineRule: LineRuleType.EXACT }
			})
		);
		if (record.issue) {
			children.push(
				new Paragraph({
					children: [
						new TextRun({
							text: `（${record.issue}）`,
							size: 32, // 三号 = 16pt
							font: '仿宋_GB2312'
						})
					],
					alignment: AlignmentType.CENTER,
					spacing: { line: 560, lineRule: LineRuleType.EXACT } // 28磅
				})
			);
		}
	}

	// ---- 标题与正文之空 1 行，行间距：19 磅 ----
	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { line: 380, lineRule: LineRuleType.EXACT } // 19磅 = 380 twips
		})
	);

	// ---- 会议信息 ----
	// label: 一级标题、方正黑体三号、行间距：28磅
	// value: 正文、方正仿宋三号、行间距：28磅
	const infoItems = [
		{ label: '会议时间', value: record.datetime || '' },
		{ label: '会议地点', value: record.venue || '' },
		{ label: '主持', value: mt === 'office_meeting' ? '党委副书记、总经理李泉' : record.chairperson?.name || '' },
		{ label: '出席', value: (record.attendees || []).map(p => p.name).join('，') },
		{ label: '列席', value: (record.observers || []).map(p => p.name).join('，') }
	];

	infoItems.forEach(info => {
		const labelText = info.label;
		let labelRuns = [];
		if (labelText.length === 2) {
			// 两个字：第一个字符加 characterSpacing: 640（间距32磅），第二个字符不加
			labelRuns.push(
				new TextRun({
					text: labelText[0],
					size: 32,
					font: '方正黑体',
					characterSpacing: 640
				})
			);
			labelRuns.push(
				new TextRun({
					text: labelText[1],
					size: 32,
					font: '方正黑体'
				})
			);
		} else {
			// 其他长度（如“会议时间”）不加间距
			labelRuns.push(
				new TextRun({
					text: labelText,
					size: 32,
					font: '方正黑体'
				})
			);
		}

		children.push(
			new Paragraph({
				children: [...labelRuns, new TextRun({ text: '：', size: 32, font: '仿宋_GB2312' }), new TextRun({ text: info.value, size: 32, font: '仿宋_GB2312' })],
				alignment: AlignmentType.LEFT,
				spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
				indent: { firstLine: convertInchesToTwip(0.5) }
			})
		);
	});

	// ---- 空行（会议信息与议题之间） ----
	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { line: 560, lineRule: LineRuleType.EXACT } // 与正文行距一致
		})
	);

	// ---- 展平 proposal 分组并生成议题列表 ----
	if (record.proposal) {
		const allItems = record.proposal.flatMap(group => group.items || []);
		allItems.forEach((item, idx) => {
			const chineseNum = toChineseNumber(idx + 1);
			const cleanTitle = cleanNumberPrefix(item.title);
			const titleText = `${chineseNum}、${cleanTitle}`;

			// 议题标题：一级标题、方正黑体三号、行间距：28磅
			children.push(
				new Paragraph({
					children: [
						new TextRun({
							text: titleText,
							size: 32,
							font: '方正黑体'
						})
					],
					spacing: { before: 200, after: 100, line: 560, lineRule: LineRuleType.EXACT },
					indent: { firstLine: convertInchesToTwip(0.5) }
				})
			);

			// 议题内容：正文、方正仿宋三号、行间距：28磅
			if (item.recordContent) {
				const lines = item.recordContent.split('\n');
				lines.forEach(line => {
					if (line.trim()) {
						children.push(
							new Paragraph({
								children: [
									new TextRun({
										text: line,
										size: 32,
										font: '仿宋_GB2312'
									})
								],
								alignment: AlignmentType.JUSTIFIED,
								spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
								indent: { firstLine: convertInchesToTwip(0.5) }
							})
						);
					}
				});
			}
		});
	}

	return children;
}

// 生成会议纪要Word文档内容
function buildSummaryContent(summary) {
	const { Paragraph, TextRun, AlignmentType, convertInchesToTwip, LineRuleType, Table, TableRow, TableCell, BorderStyle } = window.docx;
	const children = [];

	const mt = meetingType.value;

	// ---- 红头标题（根据会议类型） ----
	// 红头：方正小标宋简体，42pt（size:84），红色，居中，行距1.4（使用line: 560? 实际用spacing.after控制间距）
	if (mt === 'party_committee') {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '中共成都数据集团股份有限公司委员会',
						size: 84, // 42pt
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 1176, lineRule: LineRuleType.EXACT } // 42pt*1.4=58.8pt ≈1176 twips
			})
		);
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '党委会会议纪要',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { after: 200, line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
	} else {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '成都数据集团股份有限公司',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '总经理办公会会议纪要',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { after: 200, line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
	}

	// 期号（办公会显示在红头下方）
	if (mt === 'office_meeting' && summary.issue) {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: `（${summary.issue}）`,
						size: 32, // 16pt
						font: '方正仿宋'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { before: 0, after: 200, line: 560, lineRule: LineRuleType.EXACT }
			})
		);
	}

	// ========== 创建单行表格（党委会单列，办公会双列） ==========
	let table;
	if (mt === 'party_committee') {
		table = new Table({
			rows: [
				new TableRow({
					children: [
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: summary.datetime || '',
											size: 32,
											font: 'Times New Roman'
										})
									],
									alignment: AlignmentType.RIGHT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 }
						})
					]
				})
			],
			width: { size: 100, type: 'pct' }
		});
	} else {
		table = new Table({
			rows: [
				new TableRow({
					children: [
						// 左单元格：综合管理部
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: '综合管理部',
											size: 32,
											font: '方正仿宋'
										})
									],
									alignment: AlignmentType.LEFT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 },
							width: { size: 50, type: 'pct' }
						}),
						// 右单元格：日期
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: summary.datetime || '',
											size: 32,
											font: 'Times New Roman'
										})
									],
									alignment: AlignmentType.RIGHT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 },
							width: { size: 50, type: 'pct' }
						})
					]
				})
			],
			width: { size: 100, type: 'pct' }
		});
	}

	children.push(table);
	// 分隔线与正文之间空一行（约19磅）
	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { after: 380 } // 19磅
		})
	);

	// ---- 会议摘要（仿宋，三号，两端对齐，首行缩进2字符） ----
	if (summary.summaryText) {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: summary.summaryText,
						size: 32,
						font: '方正仿宋'
					})
				],
				alignment: AlignmentType.JUSTIFIED,
				spacing: {
					before: 0,
					after: 0,
					line: 560, // 28磅行距
					lineRule: LineRuleType.EXACT
				},
				indent: { firstLine: convertInchesToTwip(0.5) }
			})
		);
	}

	// ---- 议题列表 ----
	if (summary.proposal) {
		summary.proposal.forEach((item, idx) => {
			const chineseNum = toChineseNumber(idx + 1);
			const cleanTitle = cleanNumberPrefix(item.title);
			const titleText = `${chineseNum}、${cleanTitle}`;

			// 议题标题：方正黑体，三号，左对齐，首行缩进2字符
			children.push(
				new Paragraph({
					children: [
						new TextRun({
							text: titleText,
							size: 32,
							font: '方正黑体'
						})
					],
					alignment: AlignmentType.LEFT,
					spacing: { before: 200, after: 100, line: 560, lineRule: LineRuleType.EXACT },
					indent: { firstLine: convertInchesToTwip(0.5) }
				})
			);

			if (item.summaryContent) {
				const lines = item.summaryContent.split('\n');
				lines.forEach(line => {
					if (line.trim()) {
						children.push(
							new Paragraph({
								children: [
									new TextRun({
										text: line,
										size: 32,
										font: '方正仿宋'
									})
								],
								alignment: AlignmentType.JUSTIFIED,
								spacing: {
									before: 0,
									after: 0,
									line: 560,
									lineRule: LineRuleType.EXACT
								},
								indent: { firstLine: convertInchesToTwip(0.5) }
							})
						);
					}
				});
			}
		});
	}

	// ========== 底部表格（一行两列，上下黑色边框） ==========
	const bottomTable = new Table({
		rows: [
			new TableRow({
				children: [
					// 左单元格：成都数据集团股份有限公司
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: '成都数据集团股份有限公司',
										size: 28,
										font: '方正仿宋'
									})
								],
								alignment: AlignmentType.LEFT
							})
						],
						borders: {
							top: { color: '000000', size: 4, style: BorderStyle.SINGLE },
							bottom: { color: '000000', size: 4, style: BorderStyle.SINGLE },
							left: { style: BorderStyle.NONE },
							right: { style: BorderStyle.NONE }
						},
						margins: { top: 90, bottom: 90, left: 60, right: 60 },
						width: { size: 50, type: 'pct' }
					}),
					// 右单元格：会议日期+印发
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: `${summary.datetime || ''}印发`,
										size: 28,
										font: '方正仿宋'
									})
								],
								alignment: AlignmentType.RIGHT
							})
						],
						borders: {
							top: { color: '000000', size: 4, style: BorderStyle.SINGLE },
							bottom: { color: '000000', size: 4, style: BorderStyle.SINGLE },
							left: { style: BorderStyle.NONE },
							right: { style: BorderStyle.NONE }
						},
						margins: { top: 90, bottom: 90, left: 60, right: 60 },
						width: { size: 50, type: 'pct' }
					})
				]
			})
		],
		width: { size: 100, type: 'pct' }
	});

	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { after: 3000 } // 底部留白 150磅
		})
	);
	children.push(bottomTable);

	return children;
}

// 生成单个会议决议Word文档内容
function buildSingleResolutionContent(record, item) {
	const { Paragraph, TextRun, AlignmentType, convertInchesToTwip, LineRuleType, Table, TableRow, TableCell, BorderStyle } = window.docx;
	const children = [];

	const mt = meetingType.value;
	const dateStr = record.datetime || '';
	const cleanTitle = cleanNumberPrefix(item.title);

	// ---- 红头标题（根据会议类型） ----
	// 红头：方正小标宋简体，42pt（size:84），红色，居中，行距1.4（line:1176）
	if (mt === 'party_committee') {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '中共成都数据集团股份有限公司委员会',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '党委会会议决议',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { after: 200, line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
	} else {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '成都数据集团股份有限公司',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: '总经理办公会会议决议',
						size: 84,
						color: 'FF0000',
						font: '方正小标宋简体'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { after: 200, line: 1176, lineRule: LineRuleType.EXACT }
			})
		);
	}

	// 期号（办公会显示在红头下方）
	if (mt === 'office_meeting' && record.issue) {
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: `（${record.issue}）`,
						size: 32, // 16pt
						font: '方正仿宋'
					})
				],
				alignment: AlignmentType.CENTER,
				spacing: { before: 0, after: 200, line: 560, lineRule: LineRuleType.EXACT }
			})
		);
	}

	// ========== 创建单行表格（党委会单列，办公会双列） ==========
	let table;
	if (mt === 'party_committee') {
		table = new Table({
			rows: [
				new TableRow({
					children: [
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: dateStr,
											size: 32,
											font: 'Times New Roman'
										})
									],
									alignment: AlignmentType.RIGHT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 }
						})
					]
				})
			],
			width: { size: 100, type: 'pct' }
		});
	} else {
		table = new Table({
			rows: [
				new TableRow({
					children: [
						// 左单元格：综合管理部
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: '综合管理部',
											size: 32,
											font: '方正仿宋'
										})
									],
									alignment: AlignmentType.LEFT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 },
							width: { size: 50, type: 'pct' }
						}),
						// 右单元格：日期
						new TableCell({
							children: [
								new Paragraph({
									children: [
										new TextRun({
											text: dateStr,
											size: 32,
											font: 'Times New Roman'
										})
									],
									alignment: AlignmentType.RIGHT
								})
							],
							borders: {
								bottom: { color: 'FF0000', size: 18, style: BorderStyle.SINGLE },
								top: { style: BorderStyle.NONE },
								left: { style: BorderStyle.NONE },
								right: { style: BorderStyle.NONE }
							},
							margins: { top: 160, bottom: 160, left: 160, right: 160 },
							width: { size: 50, type: 'pct' }
						})
					]
				})
			],
			width: { size: 100, type: 'pct' }
		});
	}

	children.push(table);
	// 分隔线与正文之间空一行（约19磅）
	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { after: 380 } // 19磅
		})
	);

	// ---- 会议信息（左对齐，仿宋，16pt，行距1.8即28.8磅≈576twips，保持与摘要一致用560） ----
	const infoItems = [
		{ label: '会议时间', value: dateStr },
		{ label: '会议地点', value: record.venue || '' },
		{ label: '主持', value: mt === 'office_meeting' ? '党委副书记、总经理李泉' : (record.chairperson?.position ? `${record.chairperson.position}${record.chairperson.name}` : record.chairperson?.name) || '' },
		{ label: '出席', value: (record.attendees || []).map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('，') },
		{ label: '列席', value: (record.observers || []).map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('，') }
	];

	infoItems.forEach(info => {
		const labelText = info.label;
		let labelRuns = [];
		if (labelText.length === 2) {
			// 两个字：第一个字符加 characterSpacing: 640（间距32磅），第二个字符不加
			labelRuns.push(
				new TextRun({
					text: labelText[0],
					size: 32,
					font: '方正黑体',
					characterSpacing: 640
				})
			);
			labelRuns.push(
				new TextRun({
					text: labelText[1],
					size: 32,
					font: '方正黑体'
				})
			);
		} else {
			// 其他长度（如“会议时间”）不加间距
			labelRuns.push(
				new TextRun({
					text: labelText,
					size: 32,
					font: '方正黑体'
				})
			);
		}

		children.push(
			new Paragraph({
				children: [...labelRuns, new TextRun({ text: '：', size: 32, font: '方正仿宋' }), new TextRun({ text: info.value, size: 32, font: '方正仿宋' })],
				alignment: AlignmentType.LEFT,
				spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
				indent: { firstLine: 0 } // 左对齐，无缩进
			})
		);
	});

	// ---- 空行（会议信息与决议正文之间） ----
	children.push(
		new Paragraph({
			children: [new TextRun({ text: '', size: 1 })],
			spacing: { after: 400 }
		})
	);

	// ---- 决议正文 ----
	// 党委会：直接显示“中共成都数据集团股份有限公司委员会召开党委会，{{ item.title }}” + item.summaryContent
	// 办公会：显示日期 + 研究内容 + item.summaryContent
	// 注意：HTML中党委会没有单独的分隔句，而是直接在正文中呈现，但我们保持一致性：将固定格式与内容放在同一段落或分段落。
	// 为符合HTML样式，我们单独处理第一行固定文本，然后追加内容。
	if (mt === 'party_committee') {
		// 党委会固定开头
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: `中共成都数据集团股份有限公司委员会召开党委会，${item.title}`,
						size: 32,
						font: '方正仿宋'
					})
				],
				alignment: AlignmentType.JUSTIFIED,
				spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
				indent: { firstLine: convertInchesToTwip(0.5) }
			})
		);
	} else {
		// 办公会固定开头
		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: `${dateStr}，成都数据集团${record.issue || '召开总经理办公会'}研究《${cleanTitle}》。`,
						size: 32,
						font: '方正仿宋'
					})
				],
				alignment: AlignmentType.JUSTIFIED,
				spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
				indent: { firstLine: convertInchesToTwip(0.5) }
			})
		);
	}

	// 追加 item.summaryContent（若有）
	if (item.summaryContent) {
		const lines = item.summaryContent.split('\n');
		lines.forEach(line => {
			if (line.trim()) {
				children.push(
					new Paragraph({
						children: [
							new TextRun({
								text: line,
								size: 32,
								font: '方正仿宋'
							})
						],
						alignment: AlignmentType.JUSTIFIED,
						spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT },
						indent: { firstLine: convertInchesToTwip(0.5) }
					})
				);
			}
		});
	}

	// ---- 落款（右下角） ----
	children.push(
		new Paragraph({
			children: [
				new TextRun({
					text: mt === 'party_committee' ? '中共成都数据集团股份有限公司委员会' : '成都数据集团股份有限公司',
					size: 32,
					font: '方正仿宋'
				})
			],
			alignment: AlignmentType.RIGHT,
			spacing: { before: 400, after: 0, line: 560, lineRule: LineRuleType.EXACT }
		})
	);
	children.push(
		new Paragraph({
			children: [
				new TextRun({
					text: dateStr,
					size: 32,
					font: '方正仿宋'
				})
			],
			alignment: AlignmentType.RIGHT,
			spacing: { before: 0, after: 0, line: 560, lineRule: LineRuleType.EXACT }
		})
	);

	return children;
}

// ======================== 核心导出逻辑 ========================

// 下载单个文档（Blob）
const downloadBlob = (blob, filename) => {
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
};

// 生成单个文档的 Blob
const generateDocBlob = children => {
	const { Document, Packer, convertInchesToTwip } = window.docx;
	const doc = new Document({
		sections: [
			{
				properties: {
					page: {
						margin: {
							top: convertInchesToTwip(3.7 / 2.54),
							bottom: convertInchesToTwip(3.6 / 2.54),
							left: convertInchesToTwip(2.8 / 2.54),
							right: convertInchesToTwip(2.5 / 2.54)
						}
					}
				},
				children
			}
		]
	});
	return Packer.toBlob(doc);
};

// 根据类型数组生成文档并下载（或打包）
const generateDocument = async types => {
	if (typeof window.docx === 'undefined') {
		utils.toast('docx 库未加载，请确保环境已引入 docx@8.5.0', 'error', 'message');
		return;
	}

	const validTypes = types.filter(t => ['record', 'summary', 'resolution'].includes(t));

	if (validTypes.length === 0) {
		utils.toast('未指定有效的导出类型', 'warning', 'message');
		return;
	}

	const missingTypes = [];
	validTypes.forEach(t => {
		if (t === 'record' && !props.meetingRecord) {
			missingTypes.push('会议记录');
		} else if (t === 'summary' && !Object.keys(props.meetingSummary).length) {
			missingTypes.push('会议纪要');
		} else if (t === 'resolution' && !props.meetingSummary?.proposal?.length) {
			missingTypes.push('会议决议');
		}
	});
	if (missingTypes.length > 0) {
		const msg = `选中下载的${missingTypes.join('、')}尚无内容`;
		utils.toast(msg, 'warning', 'message');
		return;
	}

	exporting.value = true;
	try {
		const dateNum = getExportDate();
		// 获取会议标题：优先 basicData.meeting_name，兼容 meetingName
		const meetingTitle = props.basicData?.meeting_name || props.basicData?.meetingName || '会议文档';
		const docItems = [];

		for (const type of validTypes) {
			if (type === 'record') {
				const children = buildRecordContent(props.meetingRecord);
				const filename = `${meetingTitle}会议记录${dateNum}.docx`;
				docItems.push({ filename, blobPromise: generateDocBlob(children) });
			} else if (type === 'summary') {
				const children = buildSummaryContent(props.meetingSummary);
				const filename = `${meetingTitle}会议纪要${dateNum}.docx`;
				docItems.push({ filename, blobPromise: generateDocBlob(children) });
			} else if (type === 'resolution') {
				const allProposal = props.meetingSummary?.proposal || [];
				let resolutionList = allProposal;
				let originalIndexes = null;

				if (props.resolutionIndexes && props.resolutionIndexes.length > 0) {
					const filtered = [];
					const indexes = [];
					props.resolutionIndexes.forEach(idx => {
						if (allProposal[idx] !== undefined) {
							filtered.push(allProposal[idx]);
							indexes.push(idx);
						}
					});
					resolutionList = filtered;
					originalIndexes = indexes;
				}

				// if (resolutionList.length === 0) {
				// 	utils.toast('暂无决议可导出', 'warning', 'message');
				// 	continue;
				// }

				resolutionList.forEach((item, idx) => {
					const originalIdx = originalIndexes ? originalIndexes[idx] : idx;
					const chineseIndex = toChineseNumber(originalIdx + 1);
					const children = buildSingleResolutionContent(props.meetingRecord, item);
					const filename = `${meetingTitle}会议决议${chineseIndex}${dateNum}.docx`;
					docItems.push({ filename, blobPromise: generateDocBlob(children) });
				});
			}
		}

		if (docItems.length === 0) {
			utils.toast('未生成任何文档', 'warning', 'message');
			return;
		}

		if (docItems.length === 1) {
			const { filename, blobPromise } = docItems[0];
			const blob = await blobPromise;
			downloadBlob(blob, filename);
			utils.toast('导出成功', 'success', 'message');
			return;
		}

		if (typeof window.JSZip === 'undefined' || typeof window.saveAs === 'undefined') {
			utils.toast('JSZip 或 FileSaver 库未加载，请确保环境已引入相应库', 'error', 'message');
			return;
		}

		const JSZip = window.JSZip;
		const saveAs = window.saveAs;
		const zip = new JSZip();
		for (const item of docItems) {
			const blob = await item.blobPromise;
			zip.file(item.filename, blob);
		}

		const zipBlob = await zip.generateAsync({ type: 'blob' });
		const zipFilename = `${meetingTitle}${dateNum}.zip`;
		saveAs(zipBlob, zipFilename);
		utils.toast('导出成功', 'success', 'message');
	} catch (err) {
		console.error('导出 Word 失败:', err);
		utils.toast('导出失败：' + err.message, 'error', 'message');
	} finally {
		exporting.value = false;
	}
};

// ======================== 触发导出 ========================

const handleButtonClick = () => {
	generateDocument(props.types);
};

const eventBusHandler = payload => {
	const targetTypes = payload?.types;
	if (Array.isArray(targetTypes) && targetTypes.length > 0) {
		generateDocument(targetTypes);
	} else {
		console.warn('导出事件缺少有效的 types 数组', payload);
	}
};

onMounted(() => {
	ctx.eventBus?.$on('export', eventBusHandler);
});

onBeforeUnmount(() => {
	ctx.eventBus?.$off('export', eventBusHandler);
});
</script>

<style scoped>
/* 全屏遮罩调整（适配 ant-design-vue 的 spin 定位） */
:deep(.css-1c8xu0r.blr-spin.blr-spin-spinning.blr-spin-show-text) {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
}
</style>
