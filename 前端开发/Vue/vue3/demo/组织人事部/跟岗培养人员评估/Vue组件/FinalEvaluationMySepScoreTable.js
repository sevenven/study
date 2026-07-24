const ctx = exports.ctx;
const env = exports.env;
const utils = exports.utils;
const pageStatus = utils.getPageStatus();
const http = utils.getHttp(utils.getBasePath());
const isMobile = utils.getDevice() === 'mobile';

const { tenant_id, employee_id } = utils.getUserInfo();
const processParam = utils.getProcessParam();
const { byteluckVuePages, dayjs } = env;
const { form_9op0vctrmq } = byteluckVuePages;

const additional_query = JSON.parse(ctx?.externalParams?.url?.additional_query || '{}');

const from = additional_query?.from || 'sep';

export const FinalEvaluationMySepScoreTable = {
	template: `
    <div ref="tableContainer">
      <form_9op0vctrmq
        :key="tableKey"
        :columns="columns"
        :datas="datas"
        :showOperationRow="false"
        :showSelection="false"
        :showIndex="false"
      >
        <!-- 事件名称 -->
        <template v-slot:column-eventName="{ row }">
          <span>{{ row.eventName }}</span>
        </template>
        <!-- 事件目标 -->
        <template v-slot:column-eventGoal="{ row }">
          <span>{{ row.eventGoal }}</span>
        </template>
        <!-- 实施步骤 -->
        <template v-slot:column-steps="{ row }">
          <span>{{ row.steps }}</span>
        </template>
        <!-- 完成时限 -->
        <template v-slot:column-deadline="{ row }">
          <span>{{ row.deadline ? dayjs(row.deadline).format('YYYY-MM-DD') : '' }}</span>
        </template>
        <!-- 验收标准 -->
        <template v-slot:column-acceptanceCriteria="{ row }">
          <span>{{ row.acceptanceCriteria }}</span>
        </template>
        <!-- 完成情况 -->
        <template v-slot:column-selfEvaluation="{ row }">
          <span>{{ row.selfEvaluation || '-' }}</span>
        </template>
        <!-- 评估等级 -->
        <template v-slot:column-grade="{ row, index }">
          <a-select
            v-if="isEdit"
            :value="row.grade"
            :options="gradeOptions"
            @change="(value) => handleGradeChange(value, row, index)"
            placeholder="请选择"
            style="width: 100%"
          />
          <span v-else>{{ gradeLabel(row.grade) || '-' }}</span>
        </template>
        <!-- 对应赋分 -->
        <template v-slot:column-score="{ row, index }">
          <a-input-number
            v-if="isEdit"
            :value="row.score"
            @change="(value) => handleScoreChange(value, row, index)"
            :min="getScoreMin(row.grade)"
            :max="getScoreMax(row.grade)"
            :precision="2"
            placeholder="分数"
            style="width: 100%"
          />
          <span v-else>{{ row.score != null ? row.score : '-' }}</span>
        </template>
        <!-- 评估说明 -->
        <template v-slot:column-comment="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.comment"
            @change="(e) => handleCommentChange(e, row, index)"
            placeholder="请简要说明事件最终完成质量、实际价值、存在不足，若无可不写。"
            :auto-size="{ minRows: 1, maxRows: 5}"
            :maxlength="1000"
          />
          <span v-else>{{ row.comment || '-' }}</span>
        </template>
      </form_9op0vctrmq>
    </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'permissions'],
	emits: ['change'],
	components: { form_9op0vctrmq },
	data() {
		const isEdit = processParam.node_id === 'UserTask_0qod27c' && processParam.type === 'TODO';
		return {
			pageStatus,
			processParam,
			isEdit,
			columns: [
				{ title: '事件名称', key: 'eventName', width: '150px' },
				{ title: '事件目标', key: 'eventGoal', width: '150px' },
				{ title: '实施步骤', key: 'steps', width: '180px' },
				{ title: '完成时限', key: 'deadline', width: '130px' },
				{ title: '验收标准', key: 'acceptanceCriteria', width: '150px' },
				{ title: '完成情况', key: 'selfEvaluation', width: '180px' },
				{ title: '评估等级', key: 'grade', width: '120px', required: true },
				{ title: '对应赋分', key: 'score', width: '100px', required: true },
				{ title: '评估说明', key: 'comment', width: '200px', required: true }
			],
			datas: [],
			sepDetailList: [],
			myDetail: null,
			eventDetails: [],
			gradeOptions: [],
			gradeDictObj: {},
			dayjs,
			tableKey: 0
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			this.sepDetailList = ctx.getState('XCqQqDkcqc') || [];

			console.log('this.sepDetailList~~~', this.sepDetailList);

			this.myDetail = this.sepDetailList.find(item => {
				const reviewers = item.kvhGWNpMdN || [];
				return reviewers.includes(employee_id);
			});

			if (!this.myDetail) {
				console.warn('未找到当前用户的评分明细');
				this.datas = [];
				return;
			}

			// 优化/新增：获取 IDP 得分（从页面数据或状态中获取）
			const evalData = utils.getPageData()?.dataSet?.t_final_evaluation_l76l0srb;

			await this.loadGradeDict();
			await this.fetchEventDetails();
			this.buildTableData();
			this.tableKey += 1;

			if (!this.isEdit) {
				this.calcAndSetAvgScore();
			}
		},
		async loadGradeDict() {
			try {
				const result = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					query: {
						page_index: 1,
						page_size: 100,
						query_criteria: [
							{ column_name: 'type', query_type: 0, value: ['sep_grade'] },
							{ column_name: 'enable', query_type: 0, value: ['1'] }
						],
						sort_criteria: { dict_order: 'asc' }
					},
					svc_code: 't_app_yqtmuhmhwy_global_dict_7fq5m7kc_selectMore'
				});
				const dictList = result?.data?.value || [];
				this.gradeOptions = dictList.map(item => ({
					value: item.item_code,
					label: item.item_label
				}));
				this.gradeDictObj = dictList.reduce((acc, cur) => {
					acc[cur.item_code] = cur.item_label;
					return acc;
				}, {});
			} catch (e) {
				console.error('加载评估等级字典失败', e);
			}
		},
		// 获取等级中文名（只读展示用）
		gradeLabel(code) {
			return this.gradeDictObj[code] || code;
		},
		// 根据等级返回最小分数
		getScoreMin(grade) {
			if (grade === 'exceeded_expectations') return 8;
			if (grade === 'basically_completed') return 6;
			if (grade === 'not_completed') return 0;
			return 0; // 默认
		},
		// 根据等级返回最大分数
		getScoreMax(grade) {
			if (grade === 'exceeded_expectations') return 10;
			if (grade === 'basically_completed') return 7.99; // 8分以下，不含8
			if (grade === 'not_completed') return 5.99;
			return 10; // 默认
		},
		async fetchEventDetails() {
			const detailIds = this.myDetail.kuHtyBS6h8 || [];
			if (!detailIds.length) {
				this.eventDetails = [];
				return;
			}

			try {
				const result = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					query: {
						page_index: 1,
						page_size: detailIds.length,
						query_criteria: [
							{ column_name: 'uid', query_type: 3, value: detailIds },
							{ column_name: 'sys_deleted', query_type: 0, value: ['0'] }
						],
						sort_criteria: { sort: 'asc' }
					},
					svc_code: 't_final_plan_sep_detail_99d7f0ud_selectMore'
				});
				const list = result?.data?.value || [];
				this.eventDetails = detailIds.map(id => list.find(item => item.uid === id)).filter(Boolean);
			} catch (e) {
				console.error('查询标志性事件明细失败', e);
				this.eventDetails = [];
			}
		},
		buildTableData() {
			const detail = this.myDetail;
			const eventList = this.eventDetails;
			// console.log('eventList~~~', eventList);
			if (!eventList.length) {
				this.datas = [];
				return;
			}

			const grades = this.parseArrayField(detail.C7m6WKHnCe);
			const scores = this.parseArrayField(detail.XhqTDmRvjx);
			const comments = this.parseArrayField(detail.EAkuyWOQvW);

			this.datas = eventList.map((event, idx) => ({
				uid: event.uid,
				eventName: event.event_name || '',
				eventGoal: event.event_goal || '',
				steps: event.steps || '',
				deadline: event.deadline || null,
				acceptanceCriteria: event.acceptance_criteria || '',
				selfEvaluation: event.self_evaluation || '', // 新增完成情况字段
				grade: grades[idx] || '',
				score: scores[idx] != null ? Number(scores[idx]) : null,
				comment: comments[idx] || ''
			}));
		},
		parseArrayField(field) {
			if (field === '' || field == null) return [];
			if (Array.isArray(field)) return field;
			if (typeof field === 'number') return [field];
			if (typeof field === 'string') {
				try {
					const parsed = JSON.parse(field);
					return Array.isArray(parsed) ? parsed : [parsed]; // 关键修改
				} catch (e) {
					return field
						.split(',')
						.map(s => s.trim())
						.filter(s => s);
				}
			}
			return [];
		},
		allRolesCompleted() {
			const totalEvents = this.eventDetails.length;
			if (totalEvents === 0) return false;
			// 获取最新的明细列表（因为可能还未更新到状态，直接使用当前的 sepDetailList 引用）
			const list = ctx.getState('XCqQqDkcqc') || [];
			for (const item of list) {
				const scores = this.parseArrayField(item.XhqTDmRvjx);
				if (scores.length !== totalEvents) return false;
				if (scores.some(s => s === '' || s === null || isNaN(Number(s)))) return false;
			}
			return true;
		},
		computeOverallScores() {
			if (!this.allRolesCompleted()) {
				ctx.setField('t_final_evaluation_l76l0srb', 'sep_score', null);
				ctx.setField('t_final_evaluation_l76l0srb', 'final_score', null);
				return;
			}

			const list = ctx.getState('XCqQqDkcqc') || [];
			const totalEvents = this.eventDetails.length;

			// 1. 收集每个用户（去重）的有效评分
			const userScoreMap = new Map(); // key: userId, value: scores[]
			for (const item of list) {
				const userId = item.kvhGWNpMdN && item.kvhGWNpMdN[0] ? item.kvhGWNpMdN[0] : null;
				if (!userId || userScoreMap.has(userId)) continue;
				const scores = this.parseArrayField(item.XhqTDmRvjx).map(Number);
				if (scores.length === totalEvents && !scores.some(s => isNaN(s))) {
					userScoreMap.set(userId, scores);
				}
			}

			// 2. 定义三个评分组及权重
			const groupWeights = {
				leaderGroup: 0.6, // 领导小组组长 + 常务副组长
				memberGroup: 0.3, // 领导小组成员
				expertGroup: 0.1 // 外部专家
			};

			// 3. 按角色分组（同一用户只计入一次）
			const groups = {
				leaderGroup: [],
				memberGroup: [],
				expertGroup: []
			};
			// 用 Set 记录每组已经添加的用户，防止重复
			const addedLeader = new Set();
			const addedMember = new Set();
			const addedExpert = new Set();

			list.forEach(item => {
				const role = item.sHrs23G2wR;
				const userId = item.kvhGWNpMdN && item.kvhGWNpMdN[0] ? item.kvhGWNpMdN[0] : null;
				if (!userId || !userScoreMap.has(userId)) return;
				const scores = userScoreMap.get(userId);

				if (role === 'group_leader' || role === 'executive_deputy_leader') {
					if (!addedLeader.has(userId)) {
						groups.leaderGroup.push(scores);
						addedLeader.add(userId);
					}
				} else if (role === 'group_member') {
					if (!addedMember.has(userId)) {
						groups.memberGroup.push(scores);
						addedMember.add(userId);
					}
				} else if (role === 'external_expert') {
					if (!addedExpert.has(userId)) {
						groups.expertGroup.push(scores);
						addedExpert.add(userId);
					}
				}
			});

			// 4. 计算每个事件的得分
			const eventScores = [];
			for (let i = 0; i < totalEvents; i++) {
				let totalScore = 0;

				const leaderScores = groups.leaderGroup.map(s => s[i]).filter(v => !isNaN(v));
				if (leaderScores.length > 0) {
					const avg = leaderScores.reduce((a, b) => a + b, 0) / leaderScores.length;
					totalScore += avg * groupWeights.leaderGroup;
				}

				const memberScores = groups.memberGroup.map(s => s[i]).filter(v => !isNaN(v));
				if (memberScores.length > 0) {
					const avg = memberScores.reduce((a, b) => a + b, 0) / memberScores.length;
					totalScore += avg * groupWeights.memberGroup;
				}

				const expertScores = groups.expertGroup.map(s => s[i]).filter(v => !isNaN(v));
				if (expertScores.length > 0) {
					const avg = expertScores.reduce((a, b) => a + b, 0) / expertScores.length;
					totalScore += avg * groupWeights.expertGroup;
				}

				eventScores.push(totalScore);
			}

			const sepTotalScore = eventScores.reduce((a, b) => a + b, 0) / eventScores.length;
			ctx.setField('t_final_evaluation_l76l0srb', 'sep_score', sepTotalScore.toFixed(2));
		},
		calcAndSetAvgScore() {
			if (!this.myDetail) return;
			const scores = this.datas.map(row => (row.score != null ? row.score.toString() : ''));
			const validScores = scores.filter(s => s !== '' && s != null && !isNaN(Number(s)));
			if (validScores.length === this.datas.length) {
				let avg = 0;
				if (validScores.length > 0) {
					const sum = validScores.reduce((a, b) => a + Number(b), 0);
					avg = sum / validScores.length;
				}
				this.myDetail.vetbMCsPHd = [avg.toFixed(2)];
				ctx.setState('t4tNTxcUBS', this.myDetail.vetbMCsPHd);
				const weight = Number(this.myDetail.lQOK2lNO2v) || 0;
				this.myDetail.RMhgsv9T94 = (avg * weight).toFixed(2);
			} else {
				// 如果未全部评分，清空当前用户的平均分和加权分
				this.myDetail.vetbMCsPHd = [];
				this.myDetail.RMhgsv9T94 = 0;
				ctx.setState('t4tNTxcUBS', []);
			}
		},
		saveMyDetail() {
			if (!this.myDetail) return;

			const grades = this.datas.map(row => row.grade);
			const scores = this.datas.map(row => (row.score != null ? row.score.toString() : ''));
			const comments = this.datas.map(row => row.comment);

			// 更新当前明细
			this.myDetail.C7m6WKHnCe = grades;
			this.myDetail.XhqTDmRvjx = scores;
			this.myDetail.EAkuyWOQvW = comments;

			// 获取当前用户的 reviewer_user_id
			const currentUserId = this.myDetail.kvhGWNpMdN?.[0];
			const currentUid = this.myDetail.uid;

			// 同步更新同一用户的其他角色明细
			const updatedList = this.sepDetailList.map(item => {
				const itemUserId = item.kvhGWNpMdN?.[0];
				// 跳过自身，只同步同用户的其他明细
				if (itemUserId === currentUserId && item.uid !== currentUid) {
					item.C7m6WKHnCe = grades; // 同步等级
					item.XhqTDmRvjx = scores; // 同步评分
					item.EAkuyWOQvW = comments; // 同步说明

					// 重新计算该条明细的平均分和加权分
					const weight = Number(item.lQOK2lNO2v) || 0;
					const validScores = scores.filter(s => s !== '' && s != null && !isNaN(Number(s)));
					let avg = 0;
					if (validScores.length === item.kuHtyBS6h8?.length && validScores.length > 0) {
						const sum = validScores.reduce((a, b) => a + Number(b), 0);
						avg = sum / validScores.length;
						item.vetbMCsPHd = [avg.toFixed(2)];
						item.RMhgsv9T94 = (avg * weight).toFixed(2);
					} else {
						item.vetbMCsPHd = [];
						item.RMhgsv9T94 = 0;
					}
				}
				return item;
			});

			// 重新计算当前明细的平均分和加权分（复用 calcAndSetAvgScore 逻辑）
			this.calcAndSetAvgScore();

			// 更新全局状态
			ctx.setState('XCqQqDkcqc', updatedList);
			this.sepDetailList = updatedList;

			// 计算整体得分
			this.computeOverallScores();

			this.$emit('change', this.myDetail);
		},
		handleGradeChange(value, row, index) {
			const min = this.getScoreMin(value);
			const max = this.getScoreMax(value);
			if (row.score != null) {
				if (row.score < min) row.score = min;
				else if (row.score > max) row.score = max;
			}
			row.grade = value;
			this.datas = [...this.datas];
			this.saveMyDetail();
		},
		handleScoreChange(value, row, index) {
			row.score = value;
			this.datas = [...this.datas];
			this.saveMyDetail();
		},
		handleCommentChange(e, row, index) {
			row.comment = e.target.value;
			this.datas = [...this.datas];
			this.saveMyDetail();
		}
	}
};
