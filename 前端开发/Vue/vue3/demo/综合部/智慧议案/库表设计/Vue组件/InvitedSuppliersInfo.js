const ctx = exports.ctx;
const env = exports.env;
const utils = exports.utils;
const pageStatus = utils.getPageStatus();
const http = utils.getHttp(utils.getBasePath());
const isMobile = utils.getDevice() === 'mobile';

// ---------- 默认值 ----------
const DEFAULT_NEW_SUPPLIERS = [{ company_name: '受邀供应商A', initial_quote: '100', tax_rate: '6' }];

// ---------- 供应商组件 ----------
export const InvitedSuppliersInfo = {
	template: `
  <!-- 供应商 -->
  <div class="table-container">
    <h3>供应商</h3>
    <div style="display: flex; justify-content: flex-start; margin-top: 10px;">
      <button type="button" @click="addSupplierRow" style="padding: 5px 15px; background-color: white; color: #224585; border: 1px solid #224585; border-radius: 4px; cursor: pointer; margin-right: 10px;" v-show="canEdit">添加行</button>
      <button type="button" @click="removeSelectedSupplierRows" style="padding: 5px 15px; background-color: white; color: #f44336; border: 1px solid #f44336; border-radius: 4px; cursor: pointer; margin-right: 10px;" v-show="canEdit">删除选中</button>
    </div>

    <div class="supplier-scroll-container">
      <table class="data-table supplier-scrollable-table">
        <thead>
          <tr>
            <th style="min-width: 40px;">
              <input type="checkbox" :checked="isSupplierAllSelected" @change="toggleSelectAllSuppliers($event)" :disabled="!canEdit" style="margin: 0;">
            </th>
            <th style="min-width: 40px;">序号</th>
            <th style="min-width: 180px;">公司名称<span style="color: red;">*</span></th>
            <th style="min-width: 120px;">初步报价(万元)<span style="color: red;">*</span></th>
            <th style="min-width: 100px;">税率<span style="color: red;">*</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in suppliers" :key="rowIndex">
            <td style="text-align: center;">
              <input type="checkbox" :checked="isSupplierRowSelected(rowIndex)" @change="handleSupplierRowSelect(rowIndex, $event)" :disabled="!canEdit" style="margin: 0;">
            </td>
            <td style="text-align: center;">{{ rowIndex + 1 }}</td>
            <td>
              <input v-model="row.company_name" type="text" style="width: 100%; padding: 5px; box-sizing: border-box;" placeholder="公司名称" :disabled="!canEdit" @keydown.enter.prevent>
            </td>
            <td>
              <input v-model="row.initial_quote" type="text" style="width: 100%; padding: 5px; box-sizing: border-box;" placeholder="初步报价" :disabled="!canEdit" @keydown.enter.prevent>
            </td>
            <td>
              <input v-model="row.tax_rate" type="text" style="width: 100%; padding: 5px; box-sizing: border-box;" placeholder="税率" :disabled="!canEdit" @keydown.enter.prevent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],
	data() {
		return {
			canEdit: true,
			suppliers: (ctx.getState(ctx.rawStore.INSTANCE.t_invited_suppliers_info_uc8g08lq) || []).map(item => ({
				uid: item.uid,
				company_name: item[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$company_name']],
				initial_quote: item[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$initial_quote']],
				tax_rate: item[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$tax_rate']]
			})),
			selectedSupplierRows: []
		};
	},
	computed: {
		// 检查是否全选
		isSupplierAllSelected() {
			return this.suppliers.length > 0 && this.selectedSupplierRows.length === this.suppliers.length;
		}
	},
	watch: {
		// suppliers 变化（含增删改）时，同步到 rawStore / 子表
		suppliers: {
			handler() {
				ctx.setState(
					ctx.rawStore.INSTANCE.t_invited_suppliers_info_uc8g08lq,
					this.suppliers.map(item => ({
						[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$company_name']]: item.company_name,
						[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$initial_quote']]: item.initial_quote,
						[ctx.rawStore.INSTANCE['t_invited_suppliers_info_uc8g08lq$tax_rate']]: item.tax_rate
					}))
				);
				ctx.rawStore.requestMattersGenerate();
			},
			deep: true
		}
	},
	mounted() {
		if (pageStatus === 'new') this.suppliers = DEFAULT_NEW_SUPPLIERS.map(item => this.createSupplier(item)); // 新建时填充默认值
		if (pageStatus === 'view') this.canEdit = false; // 查看时禁用编辑
	},

	methods: {
		// ---------- 工厂方法 ----------
		createSupplier(overrides = {}) {
			return {
				company_name: '',
				initial_quote: '',
				tax_rate: '',
				uid: '',
				...overrides
			};
		},
		// ---------- 选择/取消选择 ----------
		// 检查行是否选中
		isSupplierRowSelected(index) {
			return this.selectedSupplierRows.includes(index);
		},
		// 切换行选中状态
		handleSupplierRowSelect(index, event) {
			const list = this.selectedSupplierRows;
			const pos = list.indexOf(index);
			if (event.target.checked && pos === -1) list.push(index);
			if (!event.target.checked && pos > -1) list.splice(pos, 1);
		},
		// 切换全选状态
		toggleSelectAllSuppliers(event) {
			this.selectedSupplierRows = event.target.checked ? Array.from({ length: this.suppliers.length }, (_, i) => i) : [];
		},
		// 添加行
		addSupplierRow() {
			this.suppliers.push(this.createSupplier());
		},
		// 删除选中行
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
			sortedIndexes?.forEach(index => this.suppliers.splice(index, 1));
			this.selectedSupplierRows = [];
		},
		// ---------- 校验 ----------
		validData() {
			for (let i = 0; i < this.suppliers.length; i++) {
				const s = this.suppliers[i];
				if (!s.company_name || !s.initial_quote || !s.tax_rate) {
					utils.toast(`供应商${i + 1}的信息不完整，请填写完整`, 'error', 'message');
					return false;
				}
			}
			return true;
		}
	}
};
