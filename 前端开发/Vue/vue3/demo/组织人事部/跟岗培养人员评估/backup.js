[
	{
		sHrs23G2wR: 'group_leader', // sep_evaluation_role_code
		lQOK2lNO2v: 0, // weight
		kvhGWNpMdN: [
			// reviewer_user_id
			'sevenldxzzz'
		],
		kuHtyBS6h8: [], // sep_detail_ids
		C7m6WKHnCe: [
			// sep_grades
			'[]'
		],
		XhqTDmRvjx: [
			// sep_scores
			'[]'
		],
		EAkuyWOQvW: [
			// sep_comments
			'[]'
		],
		vetbMCsPHd: [
			// avg_sep_score
			'0.0'
		],
		RMhgsv9T94: 0, // weighted_score
		uid: '1000004'
	},
	{
		sHrs23G2wR: 'group_member',
		lQOK2lNO2v: 0.6,
		kvhGWNpMdN: ['sevenldxzcy'],
		kuHtyBS6h8: ['1a2863d422b74cd3891732ba27274bf1'],
		C7m6WKHnCe: [],
		XhqTDmRvjx: [],
		EAkuyWOQvW: [],
		vetbMCsPHd: ['0.0'],
		RMhgsv9T94: 0,
		uid: '1000017'
	},
	{
		sHrs23G2wR: 'executive_deputy_leader',
		lQOK2lNO2v: 0.3,
		kvhGWNpMdN: ['sevencwfzz'],
		kuHtyBS6h8: ['1a2863d422b74cd3891732ba27274bf1'],
		C7m6WKHnCe: [],
		XhqTDmRvjx: [],
		EAkuyWOQvW: [],
		vetbMCsPHd: ['0.0'],
		RMhgsv9T94: 0,
		uid: '1000018'
	}
];

跟岗培养评估期末测评结果标志性事件评分明细表-t_final_evaluation_sep_detai_5bi149wk-包含以下信息
主键
外键-跟岗培养评估期末测评结果表主键
评分角色code sep_evaluation_role_code
评分权重 weight 
评分用户id reviewer_user_id
标志性事件标志性事件明细id-数组 sep_detail_ids
标志事件评估等级-数组 sep_grades
标志事件评分-数组 sep_scores
标志事件评估说明-数组 sep_comments
标志性事件单项平均得分 avg_sep_score
加权分 weighted_score

跟岗培养评估期末计划主表-t_final_plan_1cwu93rl-包含以下信息
主键
计划类型code plan_type_code
计划阶段code plan_stage_code
跟岗人员ID plan_user_id
计划所属年度-日期 plan_year
跟岗岗位 post
跟岗期限开始日期 duration_start
跟岗期限结束日期 duration_end
导师 mentor_id
教练 coach_id
并签字段 mentor_coach_joint_sign_user_ids
业务状态 final_plan_status_code
填报时间 fill_time
跟岗人员姓名 plan_user_name
计划所属年度中文描述 plan_year_name
计划阶段中文描述 plan_stage_name
计划类型中文描述 plan_type_name


编写一个组件，用于展示跟岗培养评估期末测评结果标志性事件评分明细表中的数据
组件名称：FinalEvaluationSepScoreTable
一条明细一行
表头
评分方-展示【评分角色名：评分人】
权重
标志性事件1（事件名称）
标志性事件2（事件名称）-有多少个标志性事件就有多少个表头
加权分

参考
export const FinalEvaluationMySepScoreTable = {
  template: `
    <div ref="tableContainer">
      <!-- 调试信息（生产可删除） -->
      <div>数据: {{ datas }}</div>
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
          <span v-else>{{ row.grade || '--' }}</span>
        </template>
        <!-- 对应赋分 -->
        <template v-slot:column-score="{ row, index }">
          <a-input-number
            v-if="isEdit"
            :value="row.score"
            @change="(value) => handleScoreChange(value, row, index)"
            :min="0"
            :max="100"
            placeholder="分数"
            style="width: 100%"
          />
          <span v-else>{{ row.score != null ? row.score : '--' }}</span>
        </template>
        <!-- 评估说明 -->
        <template v-slot:column-comment="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.comment"
            @change="(e) => handleCommentChange(e, row, index)"
            placeholder="请简要说明事件最终完成质量、实际价值、存在不足，若无可不写。"
            :auto-size="{ minRows: 1, maxRows: 4 }"
          />
          <span v-else>{{ row.comment || '--' }}</span>
        </template>
      </form_9op0vctrmq>
    </div>
  `,
  props: ['instance', 'name', 'value', 'rowIndex', 'permissions'],
  emits: ['change'],
  components: { form_9op0vctrmq },
  data() {
    const isEdit = (processParam.node_id === 'UserTask_0qod27c' && processParam.type === 'TODO');
    console.log('isEdit~~~', isEdit);
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
        { title: '评估等级', key: 'grade', width: '120px' },
        { title: '对应赋分', key: 'score', width: '100px' },
        { title: '评估说明', key: 'comment', width: '200px' },
      ],
      datas: [],
      sepDetailList: [],
      myDetail: null,
      eventDetails: [],
      gradeOptions: [],
      gradeDictObj: {},
      dayjs,
      tableKey: 0,       // 强制刷新表格的 key
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 1. 获取评分明细列表（请根据实际状态 key 调整）
      this.sepDetailList = ctx.getState('XCqQqDkcqc') || [];
      
      // 2. 查找当前用户的评分明细（假定 reviewer_user_id 字段为 kvhGWNpMdN）
      this.myDetail = this.sepDetailList.find(item => {
        const reviewers = item.kvhGWNpMdN || [];
        return reviewers.includes(employee_id);
      });
      
      if (!this.myDetail) {
        console.warn('未找到当前用户的评分明细');
        this.datas = [];
        return;
      }
      
      // 3. 加载评估等级字典 
      await this.loadGradeDict();
      
      // 4. 查询标志性事件明细
      await this.fetchEventDetails();
      
      // 5. 构建表格数据
      this.buildTableData();
      
      // 6. 强制刷新子组件（确保表格重新渲染）
      this.tableKey += 1;
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
        // 按照 detailIds 顺序排列
        this.eventDetails = detailIds.map(id => list.find(item => item.uid === id)).filter(Boolean);
      } catch (e) {
        console.error('查询标志性事件明细失败', e);
        this.eventDetails = [];
      }
    },
    
    buildTableData() {
      const detail = this.myDetail;
      const eventList = this.eventDetails;
      console.log('eventList~~~', eventList);
      if (!eventList.length) {
        this.datas = [];
        return;
      }
      
      // 解析评分数组
      const grades = this.parseArrayField(detail.C7m6WKHnCe);
      const scores = this.parseArrayField(detail.XhqTDmRvjx);
      const comments = this.parseArrayField(detail.EAkuyWOQvW);
      
      // 构建表格数据，字段映射到实际事件明细字段
      this.datas = eventList.map((event, idx) => ({
        uid: event.uid,
        eventName: event.event_name || '',
        eventGoal: event.event_goal || '',
        steps: event.steps || '',
        deadline: event.deadline || null,
        acceptanceCriteria: event.acceptance_criteria || '',
        grade: grades[idx] || '',
        score: scores[idx] != null ? Number(scores[idx]) : null,
        comment: comments[idx] || ''
      }));
    },
    
    parseArrayField(field) {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          return field.split(',').map(s => s.trim()).filter(s => s);
        }
      }
      return [];
    },
    
    saveMyDetail() {
      if (!this.myDetail) return;
      const grades = this.datas.map(row => row.grade);
      const scores = this.datas.map(row => row.score != null ? row.score : '');
      const comments = this.datas.map(row => row.comment);
      
      this.myDetail.C7m6WKHnCe = grades;
      this.myDetail.XhqTDmRvjx = scores;
      this.myDetail.EAkuyWOQvW = comments;
      
      // 计算平均分
      const validScores = scores.filter(s => s !== '' && s !== null && !isNaN(Number(s)));
      let avg = 0;
      if (validScores.length > 0) {
        const sum = validScores.reduce((a, b) => a + Number(b), 0);
        avg = sum / validScores.length;
      }
      this.myDetail.vetbMCsPHd = [avg.toFixed(2)];
      
      // 计算加权分
      const weight = Number(this.myDetail.lQOK2lNO2v) || 0;
      this.myDetail.RMhgsv9T94 = avg * weight;
      
      // 更新状态
      const list = this.sepDetailList.map(item => 
        item.uid === this.myDetail.uid ? this.myDetail : item
      );
      ctx.setState('XCqQqDkcqc', list);
      console.log("ctx.getState('XCqQqDkcqc')", ctx.getState('XCqQqDkcqc'));
      this.sepDetailList = list;
      
      this.$emit('change', this.myDetail);
    },
    
    handleGradeChange(value, row, index) {
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
 