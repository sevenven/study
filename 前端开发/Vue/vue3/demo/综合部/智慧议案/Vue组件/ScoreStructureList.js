// ---------- 评分结构组件 ----------

// 默认评分结构（新建时填充）
const DEFAULT_SCORE_STRUCTURE = [
	{ name: '价格分值', score: 0, uid: '' },
	{ name: '业绩分值', score: 0, uid: '' },
	{ name: '服务团队', score: 0, uid: '' },
	{ name: '方案', score: 0, uid: '' }
];

export const ScoreStructureList = {
	template: `
  <!-- 分值结构表 -->
  <div class="table-container">
    <div style="display: flex; justify-content: flex-start; margin-bottom: 10px;">
      <button type="button" @click="addScoreRow"
        style="padding: 5px 15px; background-color: white; color: #224585; border: 1px solid #224585; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        v-show="canEdit">添加行</button>
      <button type="button" @click="removeSelectedScoreRows"
        style="padding: 5px 15px; background-color: white; color: #f44336; border: 1px solid #f44336; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        v-show="canEdit">删除选中</button>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 5%;">
            <input type="checkbox" :checked="isScoreAllSelected"
              @change="toggleSelectAllScores($event)" :disabled="!canEdit" style="margin: 0;">
          </th>
          <th style="width: 5%;">序号</th>
          <th style="width: 45%;">评分名称<span style="color: red;">*</span></th>
          <th style="width: 45%;">分值<span style="color: red;">*</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in scoreStructure" :key="index">
          <td style="text-align: center;">
            <input type="checkbox" :checked="isScoreRowSelected(index)"
              @change="handleScoreRowSelect(index, $event)" :disabled="!canEdit" style="margin: 0;">
          </td>
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td><input v-model="row.name" type="text" :disabled="!canEdit"
            placeholder="请输入评分名称" @keydown.enter.prevent></td>
          <td><input v-model.number="row.score" type="number" :disabled="!canEdit"
            placeholder="请输入分值" @keydown.enter.prevent></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],

	data() {
		return {
			canEdit: true,
			scoreStructure: (ctx.getState(ctx.rawStore.INSTANCE.t_project_score_struct_rv1wgffa) || []).map(item => ({
				uid: item.uid,
				name: item[ctx.rawStore.INSTANCE['t_project_score_struct_rv1wgffa$name']],
				score: item[ctx.rawStore.INSTANCE['t_project_score_struct_rv1wgffa$score']]
			})),
			selectedScoreRows: []
		};
	},

	computed: {
		// 检查是否全选
		isScoreAllSelected() {
			return this.scoreStructure.length > 0 && this.selectedScoreRows.length === this.scoreStructure.length;
		}
	},

	watch: {
		// scoreStructure 变化（含增删改）时，同步到 rawStore / 子表
		scoreStructure: {
			handler() {
				ctx.setState(
					ctx.rawStore.INSTANCE.t_project_score_struct_rv1wgffa,
					this.scoreStructure.map(item => ({
						uid: item.uid,
						[ctx.rawStore.INSTANCE['t_project_score_struct_rv1wgffa$name']]: item.name,
						[ctx.rawStore.INSTANCE['t_project_score_struct_rv1wgffa$score']]: item.score
					}))
				);
			},
			deep: true
		}
	},

	mounted() {
		if (pageStatus === 'new') this.scoreStructure = DEFAULT_SCORE_STRUCTURE.map(item => this.createScoreRow(item)); // 新建时填充默认值
		if (pageStatus === 'view') this.canEdit = false; // 查看时禁用编辑
	},

	methods: {
		// ---------- 工厂方法 ----------
		createScoreRow(overrides = {}) {
			return {
				name: '',
				score: 0,
				...overrides
			};
		},
		// ---------- 选择/取消选择 ----------
		// 检查行是否选中
		isScoreRowSelected(index) {
			return this.selectedScoreRows.includes(index);
		},
		// 切换行选中状态
		handleScoreRowSelect(index, event) {
			const list = this.selectedScoreRows;
			const pos = list.indexOf(index);
			if (event.target.checked && pos === -1) list.push(index);
			if (!event.target.checked && pos > -1) list.splice(pos, 1);
		},
		// 切换全选状态
		toggleSelectAllScores(event) {
			this.selectedScoreRows = event.target.checked ? Array.from({ length: this.scoreStructure.length }, (_, i) => i) : [];
		},
		// 添加行
		addScoreRow() {
			this.scoreStructure.push(this.createScoreRow());
		},
		// 删除选中行
		removeSelectedScoreRows() {
			if (this.selectedScoreRows.length === 0) {
				utils.toast('请选择要删除的行', 'info', 'message');
				return;
			}
			if (this.scoreStructure.length - this.selectedScoreRows.length < 1) {
				utils.toast('至少保留一行评分规则', 'info', 'message');
				return;
			}
			// 降序删除，避免索引错位
			const sortedIndexes = [...this.selectedScoreRows].sort((a, b) => b - a);
			sortedIndexes.forEach(index => this.scoreStructure.splice(index, 1));
			this.selectedScoreRows = [];
		},
		// ---------- 校验 ----------
		validData() {
			for (let i = 0; i < this.scoreStructure.length; i++) {
				const item = this.scoreStructure[i];
				if (!item.name || !item.score || parseFloat(item.score) <= 0) {
					utils.toast(`评分结构第${i + 1}项不完整，请填写完整的名称和有效的分数`, 'error', 'message');
					return false;
				}
			}
			const total = this.scoreStructure.reduce((s, i) => s + (parseFloat(i.score) || 0), 0);
			if (Math.abs(total - 100) > 0.01) {
				utils.toast(`评分结构总分必须等于100，当前总分为${total}`, 'error', 'message');
				return false;
			}
			return true;
		}
	}
};
