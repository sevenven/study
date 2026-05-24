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

找出reviewer_user_id等于employee_id的数据-只有一条-表格change时更新固定的这条数据;

并展开这条数据生成一个表头为[事件名称、事件目标、实施步骤、完成时限、验收标准]--从t_final_plan_1cwu93rl中取、评估等级、对应赋分、评估说明的表格;
代码参考：
export const FinalPlanSepSubTable = {
  template: `
    <div ref="sepSubTableContainer">
      <form_9op0vctrmq
        :columns="columns"
        :datas="datas"
        :showOperationRow="isEdit"
        :showSelection="isEdit"
        :showIndex="false"
        @add-row="handleAddRow"
        @delete-row="handleDeleteRow"
      >
        <!-- 事件名称 -->
        <template v-slot:column-r517XQPwKH="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.r517XQPwKH"
            @change="(e) => handleInputChange(e, row, index, 'r517XQPwKH')"
            placeholder="请输入"
            :auto-size="{ minRows: 1, maxRows: 4 }"
            :style="validationFailed && (row.r517XQPwKH === '' || row.r517XQPwKH == null) ? 'border: 1px solid var(--bl-danger-c)' : ''"
          />
          <span v-else>{{ row.r517XQPwKH }}11111</span>
        </template>

        <!-- 事件目标 -->
        <template v-slot:column-mvqVI0Gv7f="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.mvqVI0Gv7f"
            @change="(e) => handleInputChange(e, row, index, 'mvqVI0Gv7f')"
            placeholder="请输入"
            :auto-size="{ minRows: 1, maxRows: 4 }"
          />
          <span v-else>{{ row.mvqVI0Gv7f }}</span>
        </template>

        <!-- 实施步骤 -->
        <template v-slot:column-bpXNSZlm9U="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.bpXNSZlm9U"
            @change="(e) => handleInputChange(e, row, index, 'bpXNSZlm9U')"
            placeholder="请输入"
            :auto-size="{ minRows: 1, maxRows: 4 }"
          />
          <span v-else>{{ row.bpXNSZlm9U }}</span>
        </template>

        <!-- 完成时限 -->
        <template v-slot:column-fZMZVhtHZZ="{ row, index }">
          <a-date-picker
            v-if="isEdit"
            :value="row.fZMZVhtHZZ ? dayjs(Number(row.fZMZVhtHZZ)) : null"
            @change="(date, dateString) => handleDateChange(dateString, row, index, 'fZMZVhtHZZ')"
            placeholder="完成时间"
            format="YYYY-MM-DD"
            style="width: 100%"
          />
          <span v-else>{{ row.fZMZVhtHZZ ? dayjs(Number(row.fZMZVhtHZZ)).format('YYYY-MM-DD') : '' }}</span>
        </template>

        <!-- 验收标准 -->
        <template v-slot:column-OEOiKVL36i="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.OEOiKVL36i"
            @change="(e) => handleInputChange(e, row, index, 'OEOiKVL36i')"
            placeholder="请输入"
            :auto-size="{ minRows: 1, maxRows: 4 }"
          />
          <span v-else>{{ row.OEOiKVL36i }}</span>
        </template>

        <!-- 选择理由 -->
        <template v-slot:column-ibB1MbPwEB="{ row, index }">
          <a-textarea
            v-if="isEdit"
            :value="row.ibB1MbPwEB"
            @change="(e) => handleInputChange(e, row, index, 'ibB1MbPwEB')"
            placeholder="请输入"
            :auto-size="{ minRows: 1, maxRows: 4 }"
          />
          <span v-else>{{ row.ibB1MbPwEB }}</span>
        </template>
      </form_9op0vctrmq>
    </div>
  `,
  props: ['instance', 'name', 'value', 'rowIndex', 'permissions'],
  emits: ['change'],
  components: { form_9op0vctrmq },
  data() {
    // 定义可编辑场景：提交、草稿、指定待办节点
    const isEdit = pageStatus === 'submit' || pageStatus === 'draft' || (processParam.node_id === 'UserTask_1' && processParam.type === 'TODO');

    return {
      pageStatus,
      processParam,
      isEdit,
      // 表格列定义（key 与数据字段对应，标题为业务字段名）
      columns: [
        { title: '事件名称', key: 'r517XQPwKH', width: '160px', required: true },
        { title: '事件目标', key: 'mvqVI0Gv7f', width: '160px', required: true },
        { title: '实施步骤', key: 'bpXNSZlm9U', width: '200px', required: true },
        { title: '完成时限', key: 'fZMZVhtHZZ', width: '180px', required: true },
        { title: '验收标准', key: 'OEOiKVL36i', width: '160px', required: true },
        { title: '选择理由', key: 'ibB1MbPwEB', width: '160px', required: true },
      ],
      // 状态数据绑定（请根据实际上下文状态键修改）
      datas: ctx.getState('ZVYcGPcTkM'),
      validationFailed: false,
      dayjs,
    };
  },
  methods: {
    // 通用文本输入处理
    handleInputChange(e, row, index, key) {
      ctx.setState(key, e.target.value, index);
      this.datas = [...ctx.getState('ZVYcGPcTkM')];
    },
    // 日期变更处理
    handleDateChange(dateString, row, index, key) {
      console.log('dateString~~', dateString)
      if (dateString) {
        const timestamp = dayjs(dateString).valueOf();   // 毫秒时间戳

        ctx.setState(key, timestamp, index);
      } else {
        ctx.setState(key, '', index);
      }
      this.datas = [...ctx.getState('ZVYcGPcTkM')];
    },
    // 新增行
    handleAddRow(insertIndex) {
      const stateArr = ctx.getState('ZVYcGPcTkM');
      if (stateArr.length >= 10) {
        utils.toast('期末计划标志性事件明细最多可填写 10 条数据', "error", 'message');
        return;
      }
      const newRow = {
        r517XQPwKH: '',
        mvqVI0Gv7f: '',
        bpXNSZlm9U: '',
        fZMZVhtHZZ: '',
        OEOiKVL36i: '',
        ibB1MbPwEB: '',
      };
      if (insertIndex >= 0) {
        stateArr.splice(insertIndex, 0, newRow);
      } else {
        stateArr.push(newRow);
      }
      this.datas = [...stateArr];
    },
    // 删除行
    async handleDeleteRow(rows) {
      if (!rows || rows.length === 0) return;
      
      let confirmMessage = '';
      if (rows.length === 1) {
        const eventName = rows[0].r517XQPwKH || '未命名事件';
        confirmMessage = `是否确认删除事件“${eventName}”？`;
      } else {
        confirmMessage = `是否确认删除选中的 ${rows.length} 个事件？`;
      }

      const result = await utils.confirm(confirmMessage);
      if (result === true) {
        const stateArr = ctx.getState('ZVYcGPcTkM');
        const indices = rows.map(row => row.index).sort((a, b) => b - a);
        indices.forEach(i => stateArr.splice(i, 1));
        ctx.setState('ZVYcGPcTkM', [...stateArr]);
        this.datas = [...ctx.getState('ZVYcGPcTkM')];
      }
    }
  }
};