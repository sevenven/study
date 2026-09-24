// const ctx = exports.ctx;
// const env = exports.env;
// const utils = exports.utils;
// const pageStatus = utils.getPageStatus();
// const http = utils.getHttp(utils.getBasePath());
// const isMobile = utils.getDevice() === 'mobile';

// ============================================================
// 常量 - 字典映射
// ============================================================
const SELECTION_METHOD_MAP = {
	public_bidding: '公开招标',
	announcement_comparison: '公告比选',
	invited_comparison: '邀请比选',
	competitive_negotiation: '竞争性谈判',
	single_source: '单一来源'
};

const IMPLEMENTATION_PHRASE_MAP = {
	self: '由我司自主组织实施',
	entrusted: '委托招标代理机构'
};

// 审批依据默认文案
const DEFAULT_APPROVAL_BASIS = '《成都数据集团股东会、董事会、党委会、总经理办公会决策事项清单（202X年X月X日版）》第X条规定："中介服务机构选聘"由公司办公会审批。';

// ============================================================
// 模板 - 完整提案模板（严格参照文件1样式）
// ============================================================
const templates = {
	proposal: `
<p style="text-align: center;font-family: FZXiaoBiaoSong-B05S, serif; font-size: 22pt;line-height: 34pt; margin: 0; padding: 0;">
    {{dept_name}}关于提请审议{{project_name}}选聘立项的议案
</p>
<p style="text-indent: 2em;line-height: 19pt; margin: 0px; padding: 0px 0px 0px 0px;">
<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  公司办公会：
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  按照{{meeting_reason}}现将相关情况请示如下。
</p>
<p style="text-indent: 2em;font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
    一、选聘项目名称
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{project_name}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
二、选聘项目基本情况
</p>
<!-- 审批状态段落 - 动态显示 -->
{{approval_status_block}}
<!-- 
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{approval_status}}
</p>
 -->
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{project_overview}}
</p>
<p style="text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{is_within_budget_content}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  三、选聘内容
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{procurement_details}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  四、选聘控制价
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  根据选聘内容，{{dept_name}}部通过向市场上{{invitedsupplier_count}}家潜在供应商进行了初步询价，并收到报价反馈，具体如下：
</p>
<table class="supliertable" border="1" height="27" style="border-collapse: collapse; width: 100%; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt;">
<colgroup>
  <col style="width: 10%;">
  <col style="width: 40%;">
  <col style="width: 25%;">
  <col style="width: 25%;">
</colgroup>
<thead>
<tr>
  <td style="text-align: center; border: 1px solid #000; padding: 5px; font-weight: bold;">序号</td>
  <td style="text-align: center; border: 1px solid #000; padding: 5px; font-weight: bold;">公司名称</td>
  <td style="text-align: center; border: 1px solid #000; padding: 5px; font-weight: bold;">初步报价（单位：万元）</td>
  <td style="text-align: center; border: 1px solid #000; padding: 5px; font-weight: bold;">税率</td>
</tr>
</thead>
<tbody>
<!-- SUPPLIER_TABLE_ROWS -->
</tbody>
</table>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{selection_result_content}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  五、选聘方式
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{selection_justification}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  六、审批依据
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  {{approval_basis}}
</p>
<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  七、请示事项
</p>
<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  建议同意{{project_name}}的选聘立项，控制价{{total_project_cost}}万元，采用{{selection_method}}的方式选聘供应商，并{{Implementation}}选聘工作。
</p>
<p style="text-indent: 2em;font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
  现提请公司办公会审批。
</p>
<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">   </p>
<p style="text-indent: 2em;font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">附件: 报价函</p>

<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;"> </p>

<table class="signature-table"  style="width: 100%; border-collapse: collapse; border: none; margin-top: 40pt;">
  <tr>
    <td style="width: 62%; border: none;"></td>
    <td style="width: 38%; text-align: right; vertical-align: top; padding-right: 20pt; border: none;">
      <div style="text-align: center;">
        <p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; margin: 0; padding: 0; line-height: 28pt;">
          {{dept_name}}
        </p>
        <p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; margin: 0; padding: 0; line-height: 28pt;">
          {{current_date_Str}}
        </p>
      </div>
    </td>
  </tr>
</table>
  `
};

// 文档默认数据
const DEFAULT_FORM_DATA = {
	title: '关于XXX项目的议案',
	dept_name: 'XXX部',
	project_name: 'XX采购项目',
	meeting_reason: '相关工作安排，',
	approval_status_block: '',
	approval_status: '',
	project_overview: '',
	is_within_budget_content: '',
	procurement_details: '',
	invitedsupplier_count: 0,
	selection_result_content: '',
	selection_justification: '',
	approval_basis: DEFAULT_APPROVAL_BASIS,
	total_project_cost: 'XX',
	selection_method: '',
	Implementation: '',
	current_date_Str: '',
	__supplierTableRows: ''
};

// 文档样式（用于 docx 导出）
const DOC_STYLE = {
	title: { font: '方正小标宋简体', size: 44, line: 680 },
	pageMargin: { top: 2098, right: 1474, bottom: 1985, left: 1588, footer: 1418 }
};

// 中英文分段正则
const EN_PATTERN = /([a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/g;

// ============================================================
// 工具方法（纯函数）
// ============================================================
function escapeHtml(str) {
	if (str === undefined || str === null) return '';
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function safeGetState(key, def = '') {
	if (!key) return def;
	try {
		const v = ctx.getState(key);
		return v === undefined || v === null || v === '' ? def : v;
	} catch (e) {
		return def;
	}
}

function getCurrentDateStr() {
	const d = new Date();
	return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function getDeptName() {
	try {
		const user = ctx.user || ctx.userInfo || {};
		return user.deptName || user.orgName || user.departmentName || 'XXX部';
	} catch (e) {
		return 'XXX部';
	}
}

// 从受邀供应商子表中取最低报价（万元）
function getMinQuoteFromList(list) {
	const INST = ctx.rawStore.INSTANCE;
	if (!Array.isArray(list) || list.length === 0) return 'XX';
	const quoteKey = INST['t_invited_suppliers_info_uc8g08lq$initial_quote'];
	const prices = list
		.map(item =>
			Number(
				String(item?.[quoteKey] ?? '')
					.replace(/,/g, '')
					.trim()
			)
		)
		.filter(n => Number.isFinite(n) && n > 0);
	if (!prices.length) return 'XX';
	return String(Number(Math.min(...prices).toFixed(2)));
}

// ============================================================
// 预览模态框组件
// ============================================================
export const DocPreviewModal = {
	name: 'DocPreviewModal',
	template: `
    <div class="preview-modal" v-if="visible" @click.self="handleClose">
      <div class="preview-modal-content">
        <div class="preview-modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="handleClose">×</button>
        </div>
        <div class="preview-modal-body">
          <div class="preview-area" v-html="content || emptyText"></div>
        </div>
        <div class="preview-modal-footer">
          <slot name="footer">
            <button @click="handleClose" class="primary">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  `,
	props: {
		visible: { type: Boolean, default: false },
		title: { type: String, default: '文档预览' },
		content: { type: String, default: '' },
		emptyText: { type: String, default: '暂无内容' }
	},
	emits: ['update:visible', 'close'],
	methods: {
		handleClose() {
			this.$emit('update:visible', false);
			this.$emit('close');
		}
	}
};

// ============================================================
// 富文本文档组件
// ============================================================
export const RichDoc = {
	name: 'RichDoc',
	components: { DocPreviewModal },
	template: `
    <!-- 通知提示 -->
    <div class="notification" :class="{ show: showNotification, error: notificationType === 'error' }">
      {{ notificationMessage }}
    </div>

    <!-- 预览模态框 -->
    <doc-preview-modal
      v-model:visible="showPreviewModal"
      title="文档预览"
      :content="htmlContent"
    >
      <template #footer>
        <button @click="exportToWord" class="secondary">导出Word</button>
        <button @click="printContent" class="secondary">打印</button>
        <button @click="showPreviewModal = false" class="primary">关闭</button>
      </template>
    </doc-preview-modal>

    <div class="app-box">
      <div class="table-container">
        <!-- 工具栏 -->
        <div class="template-panel">
          <div class="template-buttons">
            <button @click="loadProposalTemplate" id="loadProposalTemplateBtn" class="template" v-show="btnShow">同步生成文档模版</button>
            <button @click="showPreview" class="preview">预览文档</button>
            <button @click="clearContent" class="danger" v-show="btnShow">清空内容</button>
						<button id="saveBtn" class="secondary" v-show="btnShow" >保存</button>
          </div>
        </div>

        <!-- 编辑器 -->
        <div class="main-layout">
          <div class="right-panel">
            <div class="editor-area">
              <div class="editor-container">
                <textarea id="editor-container"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 自定义确认弹窗 -->
        <div v-if="showConfirmDialog" class="custom-confirm">
          <div class="confirm-content">
            <p>{{ confirmMessage }}</p>
            <button @click="handleConfirm(true)">确定</button>
            <button @click="handleConfirm(false)">取消</button>
          </div>
        </div>
      </div>
    </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],
	emits: ['change'],

	data() {
		return {
			btnShow: true,
			htmlContent: '',
			editor: null,
			showNotification: false,
			notificationMessage: '',
			notificationType: 'success',
			showPreviewModal: false,
			formData: { ...DEFAULT_FORM_DATA },
			showConfirmDialog: false,
			confirmMessage: '',
			confirmResolve: null
		};
	},

	mounted() {
		setTimeout(() => this.initEditor(), 100);

		ctx.on('custom:setToMultText', params => {
			// 外部传入数据优先，未提供的字段由 ctx 上下文补全
			this.formData = { ...DEFAULT_FORM_DATA, ...(params || {}) };
			this.loadProposalTemplate();
		});

		if (pageStatus === 'view') {
			this.btnShow = false;
		}
		// this.moveElementToTarget(document.querySelector('[data-cid="save"][data-name="save"]'), 'loadProposalTemplateBtn');
		// this.moveElementToTarget(document.querySelector('[data-cid="buLUGRrvW9"][data-name="buLUGRrvW9"]'), 'saveBtn');
	},

	beforeUnmount() {
		if (this.editor) {
			tinymce.remove(this.editor);
			this.editor = null;
		}
	},

	methods: {
		// ============================================================
		// 编辑器
		// ============================================================
		initEditor() {
			if (typeof tinymce === 'undefined') {
				console.error('TinyMCE 未加载');
				this.showNotificationMessage('富文本编辑器加载失败', 'error');
				return;
			}

			try {
				tinymce.init({
					selector: '#editor-container',
					plugins: 'lists link table wordcount',
					toolbar: false,
					menubar: false,
					readonly: true,
					min_height: 800,
					max_height: 1600,
					resize: true,
					branding: false,
					promotion: false,
					content_style: `
            body { font-family: 'Microsoft YaHei', 'SimSun', sans-serif; font-size: 12pt; line-height: 1.6; }
            p { margin: 0 0 1em 0; }
          `,
					setup: editor => {
						editor.on('init', () => {
							this.editor = editor;
							this.showNotificationMessage('编辑器加载成功');
							if (pageStatus === 'view') editor.mode.set('readonly');
						});
					}
				});
			} catch (error) {
				console.error('编辑器初始化失败:', error);
				this.showNotificationMessage('编辑器初始化失败', 'error');
			}
		},

		// ============================================================
		// 从 ctx 上下文构建 formData
		// ============================================================
		buildFormDataFromCtx(extra = {}) {
			const INST = ctx.rawStore.INSTANCE;

			// 基础字段
			const projectName = safeGetState(INST.project_name, extra.project_name || 'XX采购项目');
			const deptName = extra.dept_name || getDeptName();
			const currentDateStr = extra.current_date_Str || getCurrentDateStr();

			// 供应商列表
			const supplierList = safeGetState(INST.t_invited_suppliers_info_uc8g08lq, []);
			const supplierCount = Array.isArray(supplierList) ? supplierList.length : 0;

			// 选聘方式 / 实施方式
			const selectionMethodRaw = safeGetState(INST.selection_method);
			const implementationRaw = safeGetState(INST.Implementation);
			const selectionMethodLabel = SELECTION_METHOD_MAP[selectionMethodRaw] || '';
			const implementationPhrase = IMPLEMENTATION_PHRASE_MAP[implementationRaw] || '';

			// 内容字段
			const procurementDetails = safeGetState(INST.procurement_details, extra.procurement_details || '');
			const thirdPartyReview = safeGetState(INST.third_party_review_details, extra.selection_result_content || '');
			const selectionJustification = safeGetState(INST.selection_justification, extra.selection_justification || '');

			// 最低报价
			const minQuote = getMinQuoteFromList(supplierList);

			// 项目基本情况（基本情况1~4 拼接）
			const projectOverview = this.buildProjectOverview();

			// 审批状态块
			const approvalStatusBlock = this.buildApprovalStatusBlock();

			// 供应商表格行
			const supplierTableRows = this.buildSupplierTableRows(supplierList);

			return {
				...DEFAULT_FORM_DATA,
				// 覆盖上下文
				dept_name: deptName,
				project_name: projectName,
				meeting_reason: extra.meeting_reason || DEFAULT_FORM_DATA.meeting_reason,
				approval_status_block: approvalStatusBlock,
				approval_status: '',
				project_overview: projectOverview,
				is_within_budget_content: extra.is_within_budget_content || '',
				procurement_details: procurementDetails,
				invitedsupplier_count: supplierCount,
				selection_result_content: thirdPartyReview,
				selection_justification: selectionJustification,
				approval_basis: extra.approval_basis || DEFAULT_APPROVAL_BASIS,
				total_project_cost: minQuote,
				selection_method: selectionMethodLabel,
				Implementation: implementationPhrase,
				current_date_Str: currentDateStr,
				// 特殊占位符
				__supplierTableRows: supplierTableRows
			};
		},

		/**
		 * 构建项目基本情况（基本情况1~4）
		 * 使用 <br> 换行，保持同一段落内多行
		 */
		buildProjectOverview() {
			const INST = ctx.rawStore.INSTANCE;
			const parts = [];

			// 基本情况1 - 前置审批情况（通用描述）
			parts.push('基本情况1：发起本采购项目前置项目的审批情况，如固定资产投资建设项目立项审批和方案审批情况/承接建设项目立项审批情况/科研项目计划立项审批和方案审批情况。');

			// 基本情况2 - 采购项目基本情况
			parts.push('基本情况2：采购项目基本情况，如采购的目的和采购的标的类型、构成、具体内容概述。');

			// 基本情况3 - 承建类项目情况
			const construction = safeGetState(INST.construction_project_details);
			if (construction) {
				parts.push('基本情况3：' + construction);
			}

			// 基本情况4 - 季度采购计划审批情况
			const quarterly = safeGetState(INST.quarterly_plan_approval);
			if (quarterly) {
				parts.push('基本情况4：' + quarterly);
			}

			return parts.join('<br>');
		},

		/**
		 * 审批状态块（动态显示）
		 * 默认不显示，返回空字符串
		 */
		buildApprovalStatusBlock() {
			const status = safeGetState(ctx.rawStore.INSTANCE.quarterly_plan_approval);
			if (!status) return '';
			// 如需在基本情况前额外展示，可在此处返回 <p> 元素
			return '';
		},

		/**
		 * 构建受邀供应商表格行
		 */
		buildSupplierTableRows(list) {
			const INST = ctx.rawStore.INSTANCE;
			const nameKey = INST['t_invited_suppliers_info_uc8g08lq$company_name'] || 'VJ6vmeAfSq';
			const quoteKey = INST['t_invited_suppliers_info_uc8g08lq$initial_quote'] || 'cMGnwoUGQy';
			const taxKey = INST['t_invited_suppliers_info_uc8g08lq$tax_rate'] || 'Hz44rHisag';

			const cellStyle = 'text-align: center; border: 1px solid #000; padding: 5px;';
			const emptyRow = `
<tr>
  <td style="${cellStyle}">1</td>
  <td style="${cellStyle}">&nbsp;</td>
  <td style="${cellStyle}">&nbsp;</td>
  <td style="${cellStyle}">&nbsp;</td>
</tr>`;

			if (!Array.isArray(list) || !list.length) return emptyRow;

			return list
				.map((item, index) => {
					const name = item?.[nameKey] ?? '';
					const quote = item?.[quoteKey] ?? '';
					const tax = item?.[taxKey] ?? '';
					return `
<tr>
  <td style="${cellStyle}">${index + 1}</td>
  <td style="${cellStyle}">${escapeHtml(name)}</td>
  <td style="${cellStyle}">${escapeHtml(quote)}</td>
  <td style="${cellStyle}">${escapeHtml(tax)}</td>
</tr>`;
				})
				.join('');
		},

		// ============================================================
		// 生成 / 预览 / 清空
		// ============================================================
		loadProposalTemplate() {
			if (!this.ensureEditor()) return;

			try {
				// 优先使用外部传入的 formData，其它字段从 ctx 上下文补全
				const ctxData = this.buildFormDataFromCtx(this.formData || {});
				const data = { ...ctxData, ...(this.formData || {}) };

				const content = this.renderTemplate(templates.proposal, data);
				this.editor.setContent(content);
				this.showNotificationMessage('文档生成成功');

				// 缓存 HTML（供预览 / 打印用）
				setTimeout(() => {
					this.htmlContent = this.editor.getContent();
				}, 100);
			} catch (error) {
				console.error('生成文档失败:', error);
				this.showNotificationMessage('文档生成失败', 'error');
			}
		},

		/**
		 * 渲染模板：替换 {{key}} 占位符 + 特殊占位符 <!-- SUPPLIER_TABLE_ROWS -->
		 */
		renderTemplate(tpl, data) {
			let result = String(tpl || '');

			// 特殊占位符：供应商表格行
			if (data && data.__supplierTableRows !== undefined) {
				result = result.replace('<!-- SUPPLIER_TABLE_ROWS -->', data.__supplierTableRows || '');
			}

			// 普通 {{key}} 占位符
			Object.entries(data || {}).forEach(([key, value]) => {
				if (key.startsWith('__')) return;
				const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const regex = new RegExp(`\\{\\{${escaped}\\}\\}`, 'g');
				result = result.replace(regex, value === undefined || value === null ? '' : String(value));
			});

			return result;
		},

		showPreview() {
			if (!this.ensureEditor()) return;
			this.htmlContent = this.editor.getContent();
			this.showPreviewModal = true;
		},

		clearContent() {
			if (!this.editor) return;
			this.editor.setContent('');
			this.htmlContent = '';
			this.showNotificationMessage('内容已清空');
		},

		ensureHtmlContent() {
			if (!this.htmlContent && this.editor) {
				this.htmlContent = this.editor.getContent();
			}
			return this.htmlContent;
		},

		ensureEditor() {
			if (!this.editor) {
				this.showNotificationMessage('编辑器未初始化', 'error');
				return false;
			}
			return true;
		},

		// ============================================================
		// 通知
		// ============================================================
		showNotificationMessage(message, type = 'success') {
			this.notificationMessage = message;
			this.notificationType = type;
			this.showNotification = true;
			setTimeout(() => {
				this.showNotification = false;
			}, 3000);
		},

		// ============================================================
		// 确认弹窗
		// ============================================================
		customConfirm(message) {
			return new Promise(resolve => {
				this.confirmMessage = message;
				this.showConfirmDialog = true;
				this.confirmResolve = resolve;
			});
		},

		handleConfirm(result) {
			this.showConfirmDialog = false;
			if (this.confirmResolve) this.confirmResolve(result);
		},

		// ============================================================
		// 打印（走 HTML）
		// ============================================================
		async printContent() {
			if (!(await this.customConfirm('打印将自动执行保存操作，是否继续？'))) return;

			const html = this.ensureHtmlContent();
			if (!html) {
				this.showNotificationMessage('没有内容可打印', 'error');
				return;
			}
			this.printHtml(html);
		},

		printHtml(html) {
			const iframe = document.createElement('iframe');
			Object.assign(iframe.style, {
				position: 'absolute',
				width: '0',
				height: '0',
				border: 'none'
			});
			document.body.appendChild(iframe);

			const doc = iframe.contentDocument || iframe.contentWindow.document;
			doc.open();
			doc.write(`<!DOCTYPE html><html><head><title>打印文档</title>
        <style>
          body { font-family: "Microsoft YaHei", sans-serif; line-height: 1.6; padding: 20px; }
          img { max-width: 100%; height: auto; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000; padding: 8px; }
          @media print { body { padding: 0; } }
        </style></head><body>${html}</body></html>`);
			doc.close();

			setTimeout(() => {
				iframe.contentWindow.focus();
				iframe.contentWindow.print();

				const cleanup = () => {
					if (document.body.contains(iframe)) document.body.removeChild(iframe);
					iframe.contentWindow.removeEventListener('afterprint', cleanup);
				};
				iframe.contentWindow.addEventListener('afterprint', cleanup);
				setTimeout(cleanup, 5000);
			}, 200);
		},

		// ============================================================
		// 导出 Word（数据直出，仅 title）
		// ============================================================
		async exportToWord() {
			if (!(await this.customConfirm('导出将自动执行保存操作，是否继续？'))) return;

			if (!this.formData) {
				this.showNotificationMessage('没有内容可导出', 'error');
				return;
			}

			try {
				const docx = window.docx;
				const saveAs = window.saveAs;
				if (!docx || !saveAs) {
					this.showNotificationMessage('Word导出库未加载', 'error');
					return;
				}

				const docxApi = this.buildDocxApi(docx);
				if (!docxApi) {
					this.showNotificationMessage('Word导出库组件不完整', 'error');
					return;
				}

				// 数据 → docx 元素（不经过 HTML / DOM）
				const children = this.buildDocumentFromData(this.formData, docxApi);

				// 组装文档
				const doc = new docx.Document({
					sections: [
						{
							properties: {
								page: { margin: DOC_STYLE.pageMargin },
								titlePage: false,
								differentFirstPageHeaderFooter: false,
								differentOddEvenPageHeadersFooters: true
							},
							children,
							footers: this.buildFooters(docxApi)
						}
					]
				});

				const blob = await docx.Packer.toBlob(doc);
				const safeTitle = (this.formData.title || this.formData.project_name || '文档').replace(/[\\/:*?"<>|]/g, '_');
				const filename = `${safeTitle}_${new Date().toISOString().split('T')[0]}.docx`;
				saveAs(blob, filename);

				this.showNotificationMessage('Word文档导出成功');
			} catch (error) {
				console.error('导出Word失败:', error);
				this.showNotificationMessage(`导出失败: ${error.message}`, 'error');
			}
		},

		// ============================================================
		// 数据 → docx 元素
		// ============================================================
		buildDocumentFromData(data, api) {
			const elements = [];
			const titleText = data.title || (data.dept_name && data.project_name ? `${data.dept_name}关于提请审议${data.project_name}选聘立项的议案` : '');

			if (titleText) {
				elements.push(this.makeTitleParagraph(titleText, api));
			}

			return elements;
		},

		// ---------- 标题 ----------
		makeTitleParagraph(text, api) {
			const { Paragraph, TextRun, AlignmentType } = api;
			return new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: { line: DOC_STYLE.title.line, lineRule: api.lineRule },
				children: [
					new TextRun({
						text: text || '',
						font: DOC_STYLE.title.font,
						size: DOC_STYLE.title.size
					})
				]
			});
		},

		// ============================================================
		// 构建 docx API 上下文
		// ============================================================
		buildDocxApi(docx) {
			const { Document, Paragraph, TextRun, Footer, PageNumber, AlignmentType, Packer, LineRuleType } = docx || {};
			if (!Document || !Paragraph || !TextRun || !Packer) return null;

			const lineRule = (() => {
				if (!LineRuleType) return 1;
				for (const name of ['EXACT', 'AT_LEAST', 'AUTO', 'exact', 'atLeast', 'auto']) {
					if (LineRuleType[name] !== undefined) return LineRuleType[name];
				}
				return 1;
			})();

			return {
				Document,
				Paragraph,
				TextRun,
				Footer,
				PageNumber,
				AlignmentType,
				Packer,
				LineRuleType,
				lineRule
			};
		},

		// ============================================================
		// 页脚
		// ============================================================
		buildFooters({ Footer, PageNumber, AlignmentType, Paragraph, TextRun }) {
			if (!Footer || !PageNumber || !AlignmentType) {
				return { default: null, even: null, first: null };
			}
			const make = alignment =>
				new Footer({
					children: [
						new Paragraph({
							alignment,
							children: [new TextRun({ text: '-  ', font: '宋体', size: 28 }), new TextRun({ children: [PageNumber.CURRENT], font: '宋体', size: 28 }), new TextRun({ text: '  -', font: '宋体', size: 28 })]
						})
					]
				});
			const odd = make(AlignmentType.RIGHT);
			const even = make(AlignmentType.LEFT);
			return { default: odd, even, first: odd };
		},

		moveElementToTarget(sourceEl, targetId = 'loadProposalTemplateBtn') {
			if (!sourceEl) return;
			const targetEl = document.getElementById(targetId);
			if (!targetEl) return;

			const sync = () => {
				const rect = targetEl.getBoundingClientRect();
				Object.assign(sourceEl.style, {
					position: 'absolute',
					top: `${rect.top + window.scrollY}px`,
					left: `${rect.left + window.scrollX}px`,
					maxWidth: `${rect.width}px`,
					width: `${rect.width}px`,
					maxHeight: `${rect.height}px`,
					height: `${rect.height}px`,
					margin: '0',
					zIndex: '9999',
					opacity: '0'
				});
			};

			if (sourceEl.parentElement !== document.body) document.body.appendChild(sourceEl);
			sync();

			window.addEventListener('resize', sync);
			window.addEventListener('scroll', sync, true); // true 捕获内部滚动容器
			// 需要时返回解绑方法
			return () => {
				window.removeEventListener('resize', sync);
				window.removeEventListener('scroll', sync, true);
			};
		}
	}
};
