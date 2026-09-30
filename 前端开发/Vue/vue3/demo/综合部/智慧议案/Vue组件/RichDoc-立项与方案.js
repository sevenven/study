// const ctx = exports.ctx;
// const env = exports.env;
// const utils = exports.utils;
// const pageStatus = utils.getPageStatus();
// const http = utils.getHttp(utils.getBasePath());
// const isMobile = utils.getDevice() === 'mobile';

// 文档默认数据
const DEFAULT_FORM_DATA = {
	title: '关于XXX项目的议案',
	dept_name: 'XXX部',
	project_name: 'XX采购项目',
	meeting_reason: '相关工作安排，'
};

// ============================================================
// 模板 - 完整提案模板（DOM 结构完全由模板掌控）
// ============================================================
const templates = {
	proposal: `
		<p style="text-align: center;font-family: FZXiaoBiaoSong-B05S, serif; font-size: 22pt;line-height: 34pt; margin: 0; padding: 0;">
				{{dept_name}}关于提请审议{{project_name}}选聘立项的议案
		</p>
		<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			公司总经理办公会
		</p>
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			按照{{meeting_reason}}。现将相关情况请示如下。
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
		{{#each project_overview_blocks}}
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">{{this}}</p>
		{{/each}}
		<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			三、选聘内容
		</p>
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			{{procurement_details}}
		</p>
		<p style="text-indent: 2em; font-family: FZHei-B01S, 方正黑体, Heiti, 黑体, sans-serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			四、选聘控制价
		</p>
		{{#if selection_control_price.is_supplier_type}}
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			根据选聘内容，{{selection_control_price.dept_label}}部通过向市场上{{selection_control_price.supplier_count}}家潜在供应商进行了初步询价，并收到报价反馈，具体如下：
		</p>
		<table class="supliertable" border="1" style="border-collapse: collapse; width: 100%; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt;">
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
				{{#each selection_control_price.suppliers}}
				<tr>
					<td style="text-align: center; border: 1px solid #000; padding: 5px;">{{@index}}</td>
					<td style="text-align: left; border: 1px solid #000; padding: 5px;">{{company_name}}</td>
					<td style="text-align: center; border: 1px solid #000; padding: 5px;">{{initial_quote}}</td>
					<td style="text-align: center; border: 1px solid #000; padding: 5px;">{{tax_rate}}</td>
				</tr>
				{{/each}}
			</tbody>
		</table>
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			{{selection_control_price.review_text}}
		</p>
		{{/if}}
		{{#if selection_control_price.is_motion_type}}
		<p style="text-align: justify; text-indent: 2em; font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			{{selection_control_price.review_text}}
		</p>
		{{/if}}
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
			{{request_matters}}
		</p>
		
		<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">   </p>
		{{#if attachment_list.length}}
		<p style="text-indent: 2em;font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">附件：</p>
		{{#each attachment_list}}
		<p style="text-indent: 2em;font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;">
			{{@index}}.{{file_name}}
		</p>
		{{/each}}
		{{/if}}
		<p style="font-family: FZFangSong-Z02, 方正仿宋, FangSong, 仿宋, serif; font-size: 16pt; line-height: 28pt; margin: 0; padding: 0;"> </p>

		<table class="signature-table" style="width: 100%; border-collapse: collapse; border: none; margin-top: 40pt;">
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

// 文档样式（用于 docx 导出）
const DOC_STYLE = {
	title: { font: '方正小标宋简体', size: 44, line: 680 },
	pageMargin: { top: 2098, right: 1474, bottom: 1985, left: 1588, footer: 1418 }
};

// ============================================================
// 工具方法（纯函数）
// ============================================================
function escapeHtml(str) {
	if (str === undefined || str === null) return '';
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getCurrentDateStr() {
	const d = new Date();
	return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
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
            <button id="loadProposalTemplateBtn" class="template" v-show="btnShow">同步生成文档模版</button>
            <button @click="showPreview" class="preview">预览文档</button>
            <button @click="clearContent" class="danger" v-show="btnShow">清空内容</button>
            <button id="saveBtn" class="secondary" v-show="btnShow">保存</button>
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
		if (pageStatus === 'view') this.btnShow = false;
		ctx.eventBus.$on('loadProposalTemplate', this.loadProposalTemplate);
		this.moveElementToTarget(document.querySelector('[data-cid="save"][data-name="save"]'), 'loadProposalTemplateBtn');
		this.moveElementToTarget(document.querySelector('[data-cid="buLUGRrvW9"][data-name="buLUGRrvW9"]'), 'saveBtn');
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
					placeholder: '点击"同步生成文档模板"开始编辑...',
					content_style: `
            body { font-family: 'Microsoft YaHei', 'SimSun', sans-serif; font-size: 12pt; line-height: 1.6; }
            p { margin: 0 0 1em 0; }
          `,
					setup: editor => {
						editor.on('init', () => {
							this.editor = editor;
							if (pageStatus === 'edit' || pageStatus === 'view') this.loadProposalTemplate();
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
		// 从 ctx 上下文构建 formData（只返回数据，不拼 HTML）
		// ============================================================
		async buildFormDataFromCtx(extra = {}) {
			const INST = ctx.rawStore.INSTANCE;

			// ---------- 基础字段 ----------
			const deptName = (await utils.getCacheDisplay(ctx.getInstance(INST.dept_id), ctx.getState(INST.dept_id)))[0]?.department_name || '';
			const projectName = ctx.getState(INST.project_name) || extra.project_name || '';
			const meetingReason = ctx.getState(INST.meeting_reason) || extra.meeting_reason || '';
			const currentDateStr = extra.current_date_Str || getCurrentDateStr();

			// ---------- 供应商列表 ----------
			const supplierList = ctx.getState(INST.t_invited_suppliers_info_uc8g08lq) || [];

			// ---------- 选聘方式 / 实施方式 ----------
			const selectionMethodRaw = ctx.getState(INST.selection_method);
			const implementationRaw = ctx.getState(INST.Implementation);
			const selectionMethodLabel = ctx.rawStore.SELECTION_METHOD_MAP[selectionMethodRaw] || '';
			const implementationPhrase = ctx.rawStore.IMPLEMENTATION_TEXT[implementationRaw] || '';

			// ---------- 内容字段 ----------
			const procurementDetails = ctx.getState(INST.procurement_details);
			const selectionJustification = ctx.getState(INST.selection_justification);

			// ---------- 最低报价 ----------
			const minQuote = getMinQuoteFromList(supplierList);

			// ---------- 附件 ----------
			const attachmentList = this.buildAttachmentList(await utils.getCacheDisplay(ctx.getInstance(INST.attachment), ctx.getState(INST.attachment)));

			return {
				// 简单数据
				dept_name: deptName,
				project_name: projectName,
				meeting_reason: meetingReason,
				procurement_details: procurementDetails,
				selection_justification: selectionJustification,
				approval_basis: ctx.getState(INST.approval_basis),
				total_project_cost: minQuote,
				selection_method: selectionMethodLabel,
				Implementation: implementationPhrase,
				request_matters: ctx.getState(INST.request_matters),
				current_date_Str: currentDateStr,
				// 项目基本情况：纯文本数组
				project_overview_blocks: this.buildProjectOverviewBlocks(),
				// 选聘控制价：数据对象
				selection_control_price: this.buildSelectionControlPriceData(deptName, supplierList),
				// 附件：数据对象
				attachment_list: attachmentList || []
			};
		},

		/**
		 * 构建项目基本情况纯文本块（基本情况1~4）
		 * - 承建类项目：输出 情况1 / 情况2 / 情况3 / 情况4
		 * - 非承建类项目：跳过承建类情况，原情况4变更为情况3
		 * 返回：字符串数组，每项已含"基本情况N：..."前缀
		 */
		buildProjectOverviewBlocks() {
			const INST = ctx.rawStore.INSTANCE;
			const isYes = v => v === '1' || v === 1 || v === true;

			const blocks = [];
			let seq = 0;

			// 前置审批情况
			const approvalStatus = ctx.getState(INST.approval_status);
			if (approvalStatus) {
				seq++;
				blocks.push(`基本情况${seq}：${approvalStatus}。`);
			}

			// 采购项目基本情况
			const projectOverview = ctx.getState(INST.project_overview);
			if (projectOverview) {
				seq++;
				blocks.push(`基本情况${seq}：${projectOverview}。`);
			}

			// 承建类项目情况（仅承建类输出）
			if (isYes(ctx.getState(INST.is_construction_project))) {
				const cpd = ctx.getState(INST.construction_project_details);
				if (cpd) {
					seq++;
					blocks.push(`基本情况${seq}：${cpd}`);
				}
			}

			// 季度采购计划审批情况
			if (isYes(ctx.getState(INST.is_quarterly_plan_approved))) {
				const qpa = ctx.getState(INST.quarterly_plan_approval);
				if (qpa) {
					seq++;
					blocks.push(`基本情况${seq}：${qpa}。`);
				}
			}

			return blocks;
		},

		/**
		 * 构建选聘控制价数据对象
		 * - is_supplier_type / is_motion_type：模板 if 判断用
		 * - dept_label / supplier_count / suppliers / review_text：模板渲染用
		 */
		buildSelectionControlPriceData(deptName, supplierList) {
			const INST = ctx.rawStore.INSTANCE;
			const type = ctx.getState(INST.selection_control_price_type);
			const reviewText = ctx.getState(INST.third_party_review_details) || '';

			const data = {
				is_supplier_type: false,
				is_motion_type: false,
				dept_label: '',
				supplier_count: 0,
				suppliers: [],
				review_text: reviewText.replace(/\n/g, '<br>')
			};

			if (type === 'supplier_type') {
				data.is_supplier_type = true;
				data.dept_label = String(deptName || '').replace(/部$/, '');
				data.supplier_count = Array.isArray(supplierList) ? supplierList.length : 0;
				data.suppliers = this.buildSupplierRows(supplierList);
			} else if (type === 'motion_type') {
				data.is_motion_type = true;
			}

			return data;
		},

		/**
		 * 构建受邀供应商表格行数据（纯数据，转义文本）
		 * 字段来源：INST['t_invited_suppliers_info_uc8g08lq$*']
		 */
		buildSupplierRows(list) {
			const INST = ctx.rawStore.INSTANCE;
			const nameKey = INST['t_invited_suppliers_info_uc8g08lq$company_name'];
			const quoteKey = INST['t_invited_suppliers_info_uc8g08lq$initial_quote'];
			const taxKey = INST['t_invited_suppliers_info_uc8g08lq$tax_rate'];

			if (!Array.isArray(list) || !list.length) {
				return [{ company_name: '', initial_quote: '', tax_rate: '' }];
			}

			return list.map(item => ({
				company_name: escapeHtml(item?.[nameKey] ?? ''),
				initial_quote: escapeHtml(item?.[quoteKey] ?? ''),
				tax_rate: escapeHtml(item?.[taxKey] ?? '')
			}));
		},

		// ============================================================
		// 生成 / 预览 / 清空
		// ============================================================
		async loadProposalTemplate() {
			if (!this.ensureEditor()) return;

			try {
				const data = await this.buildFormDataFromCtx(this.formData || {});
				const content = this.renderTemplate(templates.proposal, data);

				this.editor.setContent(content);
				this.showNotificationMessage('文档生成成功');

				setTimeout(() => {
					this.htmlContent = this.editor.getContent();
				}, 100);
			} catch (error) {
				console.error('生成文档失败:', error);
				this.showNotificationMessage('文档生成失败', 'error');
			}
		},
		buildAttachmentList(list) {
			if (!Array.isArray(list)) return [];
			return list.map(item => ({
				file_name: escapeHtml(item?.file_name ?? ''),
				download_url: item?.download_url ?? '',
				online_view_url: item?.online_view_url ?? '',
				file_id: item?.file_id ?? ''
			}));
		},
		/**
		 * 轻量模板引擎
		 * 支持：
		 *   - {{key}}、{{a.b.c}}        简单变量 / 嵌套路径
		 *   - {{@index}}                 循环内序号（从 1 开始）
		 *   - {{this}}                   数组元素本身
		 *   - {{#each path}} ... {{/each}}
		 *   - {{#if path}} ... {{/if}}
		 */
		renderTemplate(tpl, data) {
			const getNestedValue = (obj, path) => {
				if (obj == null || !path) return undefined;
				return String(path)
					.split('.')
					.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
			};

			const render = (str, scope) => {
				let result = String(str || '');
				let prev;
				let maxIter = 100;

				do {
					prev = result;

					// ---------- 先处理 #each ----------
					result = result.replace(/\{\{#each\s+([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (m, path, body) => {
						const arr = getNestedValue(scope, path);
						if (!Array.isArray(arr)) return '';
						return arr
							.map((item, index) => {
								const itemScope = { ...scope, '@index': index + 1 };
								if (item && typeof item === 'object') {
									Object.assign(itemScope, item);
								} else {
									itemScope['this'] = item;
								}
								return render(body, itemScope);
							})
							.join('');
					});

					// ---------- 再处理 #if ----------
					result = result.replace(/\{\{#if\s+([\w.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, path, body) => {
						const val = getNestedValue(scope, path);
						return val ? render(body, scope) : '';
					});
				} while (result !== prev && --maxIter > 0);

				// ---------- 处理 {{@index}} ----------
				result = result.replace(/\{\{@index\}\}/g, scope['@index'] === undefined ? '' : String(scope['@index']));

				// ---------- 处理 {{this}} ----------
				result = result.replace(/\{\{this\}\}/g, scope['this'] === undefined ? '' : String(scope['this']));

				// ---------- 处理简单变量 ----------
				Object.entries(scope).forEach(([key, value]) => {
					if (key.startsWith('@')) return;
					if (typeof value === 'object' && value !== null) return;
					const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
					const regex = new RegExp(`\\{\\{${escaped}\\}\\}`, 'g');
					result = result.replace(regex, value === undefined || value === null ? '' : String(value));
				});

				// ---------- 处理嵌套路径 {{a.b.c}} ----------
				result = result.replace(/\{\{([a-zA-Z_][\w.]*)\}\}/g, (match, path) => {
					const val = getNestedValue(scope, path);
					return val === undefined || val === null ? '' : String(val);
				});

				return result;
			};

			return render(tpl, data || {});
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
		// 通知 / 确认弹窗
		// ============================================================
		showNotificationMessage(message, type = 'success') {
			this.notificationMessage = message;
			this.notificationType = type;
			this.showNotification = true;
			setTimeout(() => {
				this.showNotification = false;
			}, 3000);
		},

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
		// 打印
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
		// 导出 Word
		// ============================================================
		async exportToWord() {
			if (!(await this.customConfirm('导出将自动执行保存操作，是否继续？'))) return;

			try {
				const docx = window.docx;
				const saveAs = window.saveAs;
				if (!docx || !saveAs) {
					this.showNotificationMessage('Word导出库未加载', 'error');
					return;
				}

				const { Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, Packer, Footer, PageNumber, LineRuleType } = docx || {};
				if (!Document || !Paragraph || !TextRun || !Packer) {
					this.showNotificationMessage('Word导出库组件不完整', 'error');
					return;
				}

				// ---------- 常量 ----------
				const CN_FONT = '仿宋';
				const HEI_FONT = '黑体';
				const TITLE_FONT = '方正小标宋简体';
				const SIZE = 32; // 16pt = 32 half-points
				const TITLE_SIZE = 44; // 22pt
				const LINE = 560;
				const INDENT = 640; // 2 字符缩进（16pt 字号约 2em）

				// lineRule 兼容取值
				let lineRule = 1;
				if (LineRuleType) {
					for (const n of ['EXACT', 'AT_LEAST', 'AUTO', 'exact', 'atLeast', 'auto']) {
						if (LineRuleType[n] !== undefined) {
							lineRule = LineRuleType[n];
							break;
						}
					}
				}

				const borderStyle = (BorderStyle && BorderStyle.SINGLE) || 'single';
				const widthPct = (WidthType && WidthType.PERCENTAGE) || 'pct';

				// ---------- 数据 ----------
				const data = await this.buildFormDataFromCtx(this.formData || {});
				const scp = data.selection_control_price || {};

				// 常用段落工厂（本方法内部使用，非独立子函数）
				const p = (text, opts = {}) =>
					new Paragraph({
						spacing: { line: LINE, lineRule },
						indent: { firstLine: INDENT },
						alignment: AlignmentType.JUSTIFIED,
						children: [new TextRun({ text: text == null ? '' : String(text), font: opts.font || CN_FONT, size: SIZE })]
					});
				const pHei = text => p(text, { font: HEI_FONT });
				const pCenter = (text, font, size) =>
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: { line: LINE, lineRule },
						children: [new TextRun({ text: text == null ? '' : String(text), font, size })]
					});
				const pRight = text =>
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						spacing: { line: LINE, lineRule },
						children: [new TextRun({ text: text == null ? '' : String(text), font: CN_FONT, size: SIZE })]
					});
				const pEmpty = () => new Paragraph({ children: [new TextRun({ text: '', font: CN_FONT, size: SIZE })] });

				// 将含 <br> 的文本拆成多个段落（避免 docx 不识别 HTML 换行）
				const pushMultiline = (children, text) => {
					String(text || '')
						.split(/<br\s*\/?>/gi)
						.forEach(line => {
							children.push(p(line));
						});
				};

				// ---------- 组装 ----------
				const children = [];

				// 标题
				const titleText = data.dept_name && data.project_name ? `${data.dept_name}关于提请审议${data.project_name}选聘立项的议案` : this.formData.title || '';
				if (titleText) {
					children.push(
						new Paragraph({
							alignment: AlignmentType.CENTER,
							spacing: { line: 680, lineRule },
							children: [new TextRun({ text: titleText, font: TITLE_FONT, size: TITLE_SIZE })]
						})
					);
				}

				// 公司总经理办公会
				children.push(p('公司总经理办公会', CN_FONT, SIZE));

				// 按照 xxx。现将相关情况请示如下。
				children.push(p(`按照${data.meeting_reason || ''}。现将相关情况请示如下。`));

				// 一、选聘项目名称
				children.push(pHei('一、选聘项目名称'));
				children.push(p(data.project_name || ''));

				// 二、选聘项目基本情况
				children.push(pHei('二、选聘项目基本情况'));
				(data.project_overview_blocks || []).forEach(block => children.push(p(block)));

				// 三、选聘内容
				children.push(pHei('三、选聘内容'));
				children.push(p(data.procurement_details || ''));

				// 四、选聘控制价
				children.push(pHei('四、选聘控制价'));

				if (scp.is_supplier_type) {
					children.push(p(`根据选聘内容，${scp.dept_label || ''}部通过向市场上${scp.supplier_count || 0}家潜在供应商进行了初步询价，并收到报价反馈，具体如下：`));

					// 表格
					const cellBorder = { style: borderStyle, size: 6, color: '000000' };
					const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
					const makeCell = (text, widthPercent, align) =>
						new TableCell({
							width: { size: widthPercent, type: widthPct },
							borders,
							margins: { top: 60, bottom: 60, left: 80, right: 80 },
							children: [
								new Paragraph({
									alignment: align,
									children: [new TextRun({ text: String(text ?? ''), font: CN_FONT, size: 28 })]
								})
							]
						});

					const rows = [
						new TableRow({
							tableHeader: true,
							children: [makeCell('序号', 10, AlignmentType.CENTER), makeCell('公司名称', 40, AlignmentType.CENTER), makeCell('初步报价（单位：万元）', 25, AlignmentType.CENTER), makeCell('税率', 25, AlignmentType.CENTER)]
						}),
						...(scp.suppliers || []).map(
							(s, i) =>
								new TableRow({
									children: [makeCell(String(i + 1), 10, AlignmentType.CENTER), makeCell(s.company_name, 40, AlignmentType.LEFT), makeCell(s.initial_quote, 25, AlignmentType.CENTER), makeCell(s.tax_rate, 25, AlignmentType.CENTER)]
								})
						)
					];

					children.push(
						new Table({
							width: { size: 100, type: widthPct },
							rows
						})
					);

					if (scp.review_text) pushMultiline(children, scp.review_text);
				} else if (scp.is_motion_type && scp.review_text) {
					pushMultiline(children, scp.review_text);
				}

				// 五、选聘方式
				children.push(pHei('五、选聘方式'));
				children.push(p(data.selection_justification || ''));

				// 六、审批依据
				children.push(pHei('六、审批依据'));
				children.push(p(data.approval_basis || ''));

				// 七、请示事项
				children.push(pHei('七、请示事项'));
				children.push(p(data.request_matters || ''));

				// 空行
				children.push(pEmpty());

				// 附件
				if (Array.isArray(data.attachment_list) && data.attachment_list.length) {
					children.push(p('附件：'));
					data.attachment_list.forEach((att, i) => {
						children.push(p(`${i + 1}.${att.file_name || ''}`));
					});
				}

				// 落款（空行 + 部门 + 日期，右对齐）
				children.push(pEmpty());
				children.push(pEmpty());
				children.push(pRight(`${data.dept_name || ''}    `));
				children.push(pRight(`${data.current_date_Str || ''}    `));

				// 页脚
				let footers = { default: null, even: null, first: null };
				if (Footer && PageNumber) {
					const makeFooter = alignment =>
						new Footer({
							children: [
								new Paragraph({
									alignment,
									children: [new TextRun({ text: '-  ', font: '宋体', size: 28 }), new TextRun({ children: [PageNumber.CURRENT], font: '宋体', size: 28 }), new TextRun({ text: '  -', font: '宋体', size: 28 })]
								})
							]
						});
					const odd = makeFooter(AlignmentType.RIGHT);
					const even = makeFooter(AlignmentType.LEFT);
					footers = { default: odd, even, first: odd };
				}

				// 生成并保存
				const doc = new Document({
					sections: [
						{
							properties: {
								page: { margin: DOC_STYLE.pageMargin },
								titlePage: false,
								differentFirstPageHeaderFooter: false,
								differentOddEvenPageHeadersFooters: true
							},
							children,
							footers
						}
					]
				});

				const blob = await Packer.toBlob(doc);
				const safeTitle = (this.formData.title || data.project_name || '文档').replace(/[\\/:*?"<>|]/g, '_');
				const filename = `${safeTitle}_${new Date().toISOString().split('T')[0]}.docx`;
				saveAs(blob, filename);

				this.showNotificationMessage('Word文档导出成功');
			} catch (error) {
				console.error('导出Word失败:', error);
				this.showNotificationMessage(`导出失败: ${error.message}`, 'error');
			}
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
			window.addEventListener('scroll', sync, true);
			return () => {
				window.removeEventListener('resize', sync);
				window.removeEventListener('scroll', sync, true);
			};
		}
	}
};
