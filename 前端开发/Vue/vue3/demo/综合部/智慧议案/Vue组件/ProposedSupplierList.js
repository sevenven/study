// ---------- 拟邀请供应商 ----------

// 基本情况默认值
const BASIC_INFO_DEFAULT_TEXT = '简要描述供应商基本情况，说明其具有承担本项目的能力，如成功案例、资格荣誉、企业信誉等';

// 新建时默认填充一行（公司名称为空）
const DEFAULT_NEW_PROPOSED_SUPPLIERS = [{ company_name: '', basic_info: BASIC_INFO_DEFAULT_TEXT, scores: [0] }];

export const ProposedSupplierList = {
	template: `
  <!-- 拟邀请供应商 -->
  <div class="table-container">
		<div style="font-size: 14px; color: rgb(255, 151, 51);">除单一来源外，一般为选聘数量的3-5倍）供应商参与本次选聘</div>
    <div style="display: flex; justify-content: flex-start; margin-top: 10px;">
      <button type="button" @click="addSupplierRow"
        style="padding: 5px 15px; background-color: white; color: #224585; border: 1px solid #224585; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        v-show="canEdit">添加行</button>
      <button type="button" @click="removeSelectedSupplierRows"
        style="padding: 5px 15px; background-color: white; color: #f44336; border: 1px solid #f44336; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        v-show="canEdit">删除选中</button>
    </div>

    <div class="supplier-scroll-container">
      <table class="data-table supplier-scrollable-table">
        <thead>
          <tr>
            <th style="min-width: 40px;">
              <input type="checkbox" :checked="isSupplierAllSelected"
                @change="toggleSelectAllSuppliers($event)" :disabled="!canEdit" style="margin: 0;">
            </th>
            <th style="min-width: 40px;">序号</th>
            <th style="min-width: 180px;">公司名称<span style="color: red;">*</span></th>
            <th style="min-width: 220px;">基本情况<span style="color: red;">*</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in suppliers" :key="rowIndex">
            <td style="text-align: center;">
              <input type="checkbox" :checked="isSupplierRowSelected(rowIndex)"
                @change="handleSupplierRowSelect(rowIndex, $event)" :disabled="!canEdit" style="margin: 0;">
            </td>
            <td style="text-align: center;">{{ rowIndex + 1 }}</td>
            <td>
              <input v-model="row.company_name" type="text"
                style="width: 100%; padding: 5px; box-sizing: border-box;"
                placeholder="公司名称" :disabled="!canEdit" @keydown.enter.prevent>
            </td>
            <td>
              <textarea v-model="row.basic_info" rows="4"
                style="width: 100%; padding: 5px; box-sizing: border-box; resize: vertical;"
                placeholder="简要描述供应商基本情况，说明其具有承担本项目的能力，如成功案例、资格荣誉等"
                :disabled="!canEdit" @keydown.enter.stop></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],
	emits: ['change'],

	data() {
		const INST = ctx.rawStore.INSTANCE;
		const T = INST.t_pro_supplier_detail_5m2r3nty;
		return {
			canEdit: true,
			suppliers: (ctx.getState(T) || []).map(item => ({
				uid: item.uid,
				company_name: item[INST['t_pro_supplier_detail_5m2r3nty$company_name']],
				basic_info: item[INST['t_pro_supplier_detail_5m2r3nty$basic_info']],
				scores: item[INST['t_pro_supplier_detail_5m2r3nty$scores']] || []
			})),
			selectedSupplierRows: []
		};
	},

	computed: {
		isSupplierAllSelected() {
			return this.suppliers.length > 0 && this.selectedSupplierRows.length === this.suppliers.length;
		}
	},

	watch: {
		// 增删改时同步到 rawStore / 子表
		suppliers: {
			handler() {
				const INST = ctx.rawStore.INSTANCE;

				ctx.setState(
					INST.t_pro_supplier_detail_5m2r3nty,
					this.suppliers.map(item => ({
						uid: item.uid,
						[INST['t_pro_supplier_detail_5m2r3nty$company_name']]: item.company_name,
						[INST['t_pro_supplier_detail_5m2r3nty$basic_info']]: item.basic_info,
						[INST['t_pro_supplier_detail_5m2r3nty$scores']]: item.scores
					}))
				);
			},
			deep: true
		}
	},

	mounted() {
		if (pageStatus === 'new') this.suppliers = DEFAULT_NEW_PROPOSED_SUPPLIERS.map(item => this.createSupplier(item)); // 新建时填充默认值
		if (pageStatus === 'view') this.canEdit = false; // 查看时禁用编辑
	},

	methods: {
		// ---------- 工厂方法 ----------
		createSupplier(overrides = {}) {
			return {
				company_name: '',
				basic_info: BASIC_INFO_DEFAULT_TEXT, // 新增行时，基本情况列默认值
				scores: [0],
				...overrides
			};
		},

		// ---------- 选择 / 取消 ----------
		isSupplierRowSelected(index) {
			return this.selectedSupplierRows.includes(index);
		},

		handleSupplierRowSelect(index, event) {
			const list = this.selectedSupplierRows;
			const pos = list.indexOf(index);
			if (event.target.checked && pos === -1) list.push(index);
			if (!event.target.checked && pos > -1) list.splice(pos, 1);
		},

		toggleSelectAllSuppliers(event) {
			this.selectedSupplierRows = event.target.checked ? Array.from({ length: this.suppliers.length }, (_, i) => i) : [];
		},

		// ---------- 增删 ----------
		addSupplierRow() {
			this.suppliers.push(this.createSupplier());
		},

		removeSelectedSupplierRows() {
			if (this.selectedSupplierRows.length === 0) {
				utils.toast('请选择要删除的行', 'info', 'message');
				return;
			}
			if (this.suppliers.length - this.selectedSupplierRows.length < 1) {
				utils.toast('至少保留一行供应商', 'info', 'message');
				return;
			}
			// 降序删除，避免索引错位
			const sortedIndexes = [...this.selectedSupplierRows].sort((a, b) => b - a);
			sortedIndexes.forEach(index => this.suppliers.splice(index, 1));
			this.selectedSupplierRows = [];
		},

		// ---------- 校验 ----------
		validData() {
			for (let i = 0; i < this.suppliers.length; i++) {
				const s = this.suppliers[i];
				if (!s.company_name || !s.basic_info) {
					utils.toast(`拟邀请供应商${i + 1}的基本信息不完整，请填写完整`, 'error', 'message');
					return false;
				}
			}
			return true;
		}
	}
};
