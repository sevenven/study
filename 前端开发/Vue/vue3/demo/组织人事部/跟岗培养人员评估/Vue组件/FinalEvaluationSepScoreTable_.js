export const FinalEvaluationSepScoreTable_ = {
	template: `
    <div ref="tableContainer">
      <form_9op0vctrmq
        :columns="columns"
        :datas="datas"
        :showOperationRow="false"
        :showPagination="false"
        :showSelection="false"
        :showIndex="false"
      >
        <!-- 评分方 -->
        <template v-slot:column-evaluator="{ row }">
          <span>{{ row.evaluator }}</span>
        </template>
        <!-- 权重 -->
        <template v-slot:column-weight="{ row }">
          <span>{{ row.weight }}</span>
        </template>
        <!-- 动态事件列 -->
        <template v-for="(col, colIdx) in eventColumns" :key="col.key" v-slot:[getSlotName(col.key)]="{ row }">
          <span>{{ row[col.key] }}</span>
        </template>
        <!-- 加权分 -->
        <template v-slot:column-weightedScore="{ row }">
          <span>{{ row.weightedScore }}</span>
        </template>
      </form_9op0vctrmq>
      <div :style="{ color: '#5a9dcc', textAlign: 'right' }">期末标志性事件加权得分：{{sep_score ? Number(sep_score).toFixed(2) : '-'}}</div>
    </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'permissions'],
	emits: ['change'],
	components: { form_9op0vctrmq },
	data() {
		const {
			dataSet: { t_final_evaluation_l76l0srb: formData }
		} = utils.getPageData();
		return {
			columns: [],
			eventColumns: [], // 动态事件列定义
			datas: [],
			sepDetailList: [],
			reviewerNameMap: {}, // 用户ID -> 姓名
			roleNameMap: {}, // 角色code -> 中文名
			eventNames: [], // 事件名称数组（按明细顺序）
			dayjs,
			sep_score: formData.sep_score
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			// 1. 获取评分明细列表
			this.sepDetailList = ctx.getState('XCqQqDkcqc') || [];

			if (!this.sepDetailList.length) {
				// 无评分明细时，根据 sep_plan_id 获取事件名称，确保动态列显示
				const evalData = utils.getPageData()?.dataSet?.t_final_evaluation_l76l0srb;
				const sepPlanId = evalData?.sep_plan_id;
				if (sepPlanId) {
					await this.fetchEventNamesByPlanId(sepPlanId);
				}
				const eventCount = this.eventNames.length;
				this.buildColumns(eventCount);
				this.buildPlaceholderDatas(); // 生成4行占位数据
				return;
			}

			// 2. 并行加载角色字典、用户姓名、事件名称
			await Promise.all([this.loadRoleDict(), this.loadReviewerNames(), this.fetchEventNames()]);

			// 3. 确定事件数量
			const eventCount = this.eventNames.length;

			// 4. 构建列定义
			this.buildColumns(eventCount);

			// 5. 构建表格数据
			this.buildDatas();
		},
		// 通过计划ID查询事件明细，提取事件名称
		async fetchEventNamesByPlanId(planId) {
			try {
				const result = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					query: {
						page_index: 1,
						page_size: 100,
						query_criteria: [
							{ column_name: 't_final_plan_id', value: [planId], query_type: 0 },
							{ column_name: 'sys_deleted', value: ['0'], query_type: 0 }
						],
						sort_criteria: { sort: 'asc' }
					},
					svc_code: 't_final_plan_sep_detail_99d7f0ud_selectMore'
				});
				const list = result?.data?.value || [];
				this.eventNames = list.map(ev => ev.r517XQPwKH || ev.event_name || '');
			} catch (e) {
				console.error('查询标志性事件名称失败', e);
				this.eventNames = [];
			}
		},
		// 加载评分角色字典
		async loadRoleDict() {
			try {
				const result = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					query: {
						page_index: 1,
						page_size: 100,
						query_criteria: [
							{ column_name: 'type', query_type: 0, value: ['sep_evaluation_role'] },
							{ column_name: 'enable', query_type: 0, value: ['1'] }
						]
					},
					svc_code: 't_app_yqtmuhmhwy_global_dict_7fq5m7kc_selectMore'
				});
				const dictList = result?.data?.value || [];
				this.roleNameMap = dictList.reduce((map, item) => {
					map[item.item_code] = item.item_label;
					return map;
				}, {});
			} catch (e) {
				console.error('加载评分角色字典失败', e);
			}
		},

		// 查询所有评分人姓名
		async loadReviewerNames() {
			const idSet = new Set();
			this.sepDetailList.forEach(item => {
				const reviewers = item.kvhGWNpMdN || [];
				reviewers.forEach(id => idSet.add(id));
			});
			const userIds = Array.from(idSet).filter(id => !!id);
			if (!userIds.length) return;

			try {
				const result = await utils.querySvc({
					app_id: 'btdev_system_app',
					query: {
						page_index: 1,
						page_size: userIds.length,
						query_criteria: [{ column_name: 'employee_id', query_type: 3, value: userIds }]
					},
					svc_code: 'employee_info_selectMore'
				});
				const employees = result?.data?.value || [];
				employees.forEach(emp => {
					this.reviewerNameMap[emp.employee_id] = emp.employee_name;
				});
			} catch (e) {
				console.error('查询评分人姓名失败', e);
			}
		},

		// 查询标志性事件名称
		async fetchEventNames() {
			// 取第一条有效明细的 sep_detail_ids 作为基准
			let baseIds = [];
			for (const item of this.sepDetailList) {
				baseIds = this.parseArrayField(item.kuHtyBS6h8);
				if (baseIds.length) break;
			}
			if (!baseIds.length) {
				this.eventNames = [];
				return;
			}

			try {
				const result = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					query: {
						page_index: 1,
						page_size: baseIds.length,
						query_criteria: [
							{ column_name: 'uid', query_type: 3, value: baseIds },
							{ column_name: 'sys_deleted', query_type: 0, value: ['0'] }
						],
						sort_criteria: { sort: 'asc' } // 按排序字段，但与基准顺序不一定一致
					},
					svc_code: 't_final_plan_sep_detail_99d7f0ud_selectMore'
				});
				const list = result?.data?.value || [];
				// 构建 uid -> 事件名称 映射
				const nameMap = {};
				list.forEach(ev => {
					// 事件名称字段为 r517XQPwKH（参照之前的明细表定义）
					nameMap[ev.uid] = ev.r517XQPwKH || ev.event_name || '';
				});
				// 按基准顺序生成名称数组
				this.eventNames = baseIds.map(id => nameMap[id] || `事件${id}`);
			} catch (e) {
				console.error('查询事件名称失败', e);
				this.eventNames = baseIds.map(id => `事件${id}`); // 降级显示
			}
		},

		// 获取标志性事件数量（备用，不再用于构建列标题）
		getEventCount() {
			for (const item of this.sepDetailList) {
				const detailIds = this.parseArrayField(item.kuHtyBS6h8);
				if (detailIds.length) return detailIds.length;
			}
			return 0;
		},

		// 构建列定义
		buildColumns(eventCount) {
			const baseCols = [
				{ title: '评分方', key: 'evaluator', width: '160px' },
				{ title: '权重', key: 'weight', width: '80px' }
			];

			this.eventColumns = [];
			for (let i = 0; i < eventCount; i++) {
				const key = `event_${i}`;
				this.eventColumns.push({
					title: `标志性事件${i + 1}（${this.eventNames[i]}）`, // 显示事件名称
					key: key,
					width: '100px'
				});
			}

			const endCols = [{ title: '加权分', key: 'weightedScore', width: '100px' }];

			this.columns = [...baseCols, ...this.eventColumns, ...endCols];
		},

		buildPlaceholderDatas() {
			const roles = [
				{ roleCode: 'group_leader', roleName: '领导小组组长：', weight: '60%' },
				{ roleCode: 'executive_deputy_leader', roleName: '常务副组长：', weight: '60%' },
				{ roleCode: 'group_member', roleName: '领导小组成员：', weight: '30%' },
				{ roleCode: 'external_expert', roleName: '外部专家：', weight: '10%' }
			];
			this.datas = roles.map(role => {
				const row = {
					evaluator: role.roleName, // 只显示角色名，不加评分人
					weight: role.weight,
					weightedScore: '-' // 加权分显示 '-'
				};
				this.eventColumns.forEach(col => {
					row[col.key] = '-'; // 事件评分显示 '-'
				});
				return row;
			});
		},

		// 构建行数据
		buildDatas() {
			const roleOrder = {
				group_leader: 1,
				executive_deputy_leader: 2,
				group_member: 3,
				external_expert: 4
			};

			const sortedList = [...this.sepDetailList].sort((a, b) => {
				const orderA = roleOrder[a.sHrs23G2wR] || 99;
				const orderB = roleOrder[b.sHrs23G2wR] || 99;
				return orderA - orderB;
			});

			// 1. 建立 reviewer_user_id -> 实际评分的映射（只取非空评分）
			const personScoreMap = {};
			for (const item of sortedList) {
				const uid = item.kvhGWNpMdN?.[0] || '';
				if (!uid || personScoreMap[uid]) continue; // 已记录过
				const scores = this.parseArrayField(item.XhqTDmRvjx);
				if (scores.length > 0 && scores.some(s => s !== '' && s !== null)) {
					personScoreMap[uid] = scores;
				}
			}

			this.datas = sortedList.map(item => {
				const roleCode = item.sHrs23G2wR;
				const reviewers = item.kvhGWNpMdN || [];
				const reviewerName = reviewers.map(id => this.reviewerNameMap[id] || id).join(',');
				const roleName = this.roleNameMap[roleCode] || roleCode;
				const evaluator = `${roleName}：${reviewerName}`;
				const weightNum = item.lQOK2lNO2v || 0;
				const weight = weightNum * 100 + '%';

				// 2. 获取该人的实际评分（若本行无评分则使用映射中的）
				let scores = this.parseArrayField(item.XhqTDmRvjx);
				const uid = reviewers[0] || '';
				if ((!scores.length || scores.every(s => s === '' || s === null)) && personScoreMap[uid]) {
					scores = personScoreMap[uid];
				}

				// 3. 根据评分和本行权重计算加权分（不再使用原始 RMhgsv9T94）
				const validScores = scores.filter(s => s !== '' && s != null && !isNaN(Number(s)));
				let avg = 0;
				if (validScores.length > 0) {
					avg = validScores.reduce((acc, v) => acc + Number(v), 0) / validScores.length;
				}
				const computedWeightedScore = (avg * weightNum).toFixed(2);
				// 如果没有有效评分则显示 '-'
				const weightedScore = validScores.length > 0 ? computedWeightedScore : '-';

				const row = {
					evaluator,
					weight,
					weightedScore
				};
				// 填充各事件评分
				this.eventColumns.forEach((col, idx) => {
					row[col.key] = scores[idx] !== '' && scores[idx] != null ? Number(scores[idx]).toFixed(2) : '-';
				});
				return row;
			});
		},

		// 辅助：解析数组字段（可能为 JSON 字符串或数组）
		parseArrayField(field) {
			if (!field) return [];
			if (Array.isArray(field)) return field;
			if (typeof field === 'string') {
				try {
					const parsed = JSON.parse(field);
					return Array.isArray(parsed) ? parsed : [];
				} catch (e) {
					return field
						.split(',')
						.map(s => s.trim())
						.filter(s => s);
				}
			}
			return [];
		},

		// 获取动态插槽名称
		getSlotName(key) {
			return `column-${key}`;
		}
	}
};
