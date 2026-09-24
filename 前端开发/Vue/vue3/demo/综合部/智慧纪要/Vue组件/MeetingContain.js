// tips:
// 1. 环境中已有ant-design-vue@4.2.3、mammoth@1.6.0可直接使用
// 2. ok-开头的组件为环境内置组件
// 3.除明确说了要改动的地方 其它的不要做改动 包括注释
// 4.请输出完整的 MeetingRecordOfficeMeeting 组件代码

const ctx = exports.ctx;
const env = exports.env;
const utils = exports.utils;
const pageStatus = utils.getPageStatus();
const http = utils.getHttp(utils.getBasePath());
const isMobile = utils.getDevice() === 'mobile';

const { byteluckVuePages } = env;
const { form_tzow7ia4tz } = byteluckVuePages;

const { url } = ctx.externalParams;

const { department_id } = utils.getUserInfo();

// 女娲对话，返回完整结果（非流式体验）
async function nvWaChat(conversationId, token, params) {
	if (!conversationId) {
		throw new Error('会话ID不存在，请先创建会话');
	}

	const apiUrl = `${window.location.origin}/szzg/api/v1/chat/${conversationId}`;
	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({
			conversationId,
			message: params.message || '',
			attachments: params.attachments || [],
			debug: params.debug || false,
			...params
		})
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder('utf-8');
	let buffer = '';
	let finalResult = null;

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split('\n');
		buffer = lines.pop() || '';

		for (const line of lines) {
			const trimmedLine = line.trim();
			if (!trimmedLine) continue; // 跳过空行

			// 处理以 "data:" 开头的行（可能包含空格或无空格）
			if (trimmedLine.startsWith('data:')) {
				// 提取 JSON 字符串：去掉 "data:" 前缀，并去除前后空格
				let jsonStr = trimmedLine.slice(5).trim();
				if (!jsonStr) continue;

				try {
					const event = JSON.parse(jsonStr);
					if (event.eventType === 'FINAL_RESULT') {
						finalResult = event.data;
					} else if (event.eventType === 'ERROR') {
						throw new Error(event.error || '会话出错');
					}
				} catch (e) {
					console.warn('解析SSE数据失败:', e, jsonStr);
				}
			} else {
				console.debug('非SSE行:', trimmedLine);
			}
		}
	}

	if (!finalResult) {
		throw new Error('未收到最终结果');
	}
	if (!finalResult.success) {
		throw new Error(finalResult.error || '会话执行失败');
	}
	return finalResult.outputText || '';
}

function toChineseNumber(num) {
	const chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	if (num <= 10) return chinese[num];
	if (num < 20) return '十' + (num % 10 === 0 ? '' : chinese[num % 10]);
	if (num < 100) {
		const tens = Math.floor(num / 10);
		const ones = num % 10;
		return chinese[tens] + '十' + (ones === 0 ? '' : chinese[ones]);
	}
	return num.toString();
}

// ========== 步骤组件：会议方案 ==========
const StepPlan = {
	template: `
		<a-spin :spinning="loading" tip="正在处理会议文件...">
			<div style="display: flex; flex: 1; gap: 16px; height: calc(100% - 375px); overflow: auto;">
				<!-- 左侧区域 -->
				<div style="flex: 1; display: flex; flex-direction: column; border: 1px solid #f0f0f0; border-radius: 4px; padding: 16px; overflow: auto;">
					<!-- 部门选择器和会议名称：左右排列 -->
					<div class="step-plan-form" style="display: flex; gap: 12px; margin-bottom: 16px;">
						<a-form-item label="所属部门" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" style="flex: 1; margin-bottom: 0;" required>
							<ok-department-select
								:disabled="isViewMode"
								.value="deptCode"
								.update="onDeptCodeChange"
								placeholder="请选择部门"
								style="width: 100%;"
							/>
						</a-form-item>
						<a-form-item label="会议名称" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" style="flex: 1; margin-bottom: 0;" required>
							<a-input
								:disabled="isViewMode"
								:maxlength="20"
								v-model:value="meetingName"
								@change="onMeetingNameChange"
								placeholder="请输入会议名称"
								style="width: 100%;"
							/>
						</a-form-item>
					</div>
					<!-- 文件上传 -->
					<div class="step-plan-upload">
						<a-upload
							:disabled="isViewMode"
							accept=".docx"
							// action="/szzg/api/v1/file/upload?type='store'"
							action="/szzg/api/v1/file/upload"
							:headers="{ Authorization: meetingType === 'party_committee' ? 'ak-3ea5e96f93a84aea8811d17de2861338' : 'ak-6d5cc5e1c08743689061cee1f57dbda1' }"
							:file-list="planFileList"
							:upload-file="planFileList"
							:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }"
							:maxCount="1"
							:show-download="true"
							:before-upload="beforeUpload"
							@change="onPlanFileChange"
							@remove="handleRemove"
							@preview="handlePreview"
							drag
							style="flex: 1;"
						>
							<div class="step-plan-upload-icon">
								<svg t="1622689766057" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="53224" width="44" height="44">
									<path fill="currentColor" d="M768 810.705455a42.682182 42.682182 0 1 1 0-85.41091c94.114909 0 170.705455-76.590545 170.705455-170.682181 0-89.6-70.097455-164.305455-159.511273-170.123637l-25.204364-1.489454-10.705454-22.690909C701.114182 271.010909 610.327273 213.294545 512 213.294545s-189.090909 57.716364-231.307636 147.013819l-10.705455 22.690909-25.088 1.605818c-89.506909 5.794909-159.488 80.500364-159.488 170.100364 0 94.091636 76.590545 170.682182 170.682182 170.682181a42.682182 42.682182 0 1 1 0 85.410909c-141.195636 0-256-114.804364-256-256 0-126.091636 92.509091-232.494545 214.714182-252.392727C274.804364 195.700364 388.887273 128 512 128c123.112727 0 237.195636 67.700364 297.309091 174.196364 122.181818 19.898182 214.690909 126.394182 214.690909 252.509091 0 141.102545-114.804364 256-256 256z" p-id="53225"></path>
									<path fill="currentColor" d="M640 789.294545c-10.891636 0-21.806545-4.189091-30.208-12.497454L512 679.005091l-97.792 97.792a42.542545 42.542545 0 0 1-60.299636 0 42.542545 42.542545 0 0 1 0-60.276364l128-128a42.542545 42.542545 0 0 1 60.276363 0l128 128a42.542545 42.542545 0 0 1 0 60.276364c-8.378182 8.401455-19.293091 12.497455-30.184727 12.497454z" p-id="53226"></path>
									<path fill="currentColor" d="M512 960a42.682182 42.682182 0 0 1-42.705455-42.705455v-298.58909a42.682182 42.682182 0 1 1 85.41091 0v298.682181c0 23.505455-19.106909 42.612364-42.705455 42.612364z" p-id="53227"></path>
								</svg>
								<p class="ant-upload-text"><span style="color: var(--bl-font-n900-c, #1f2329);">将文件拖到此处或</span><span>点击上传</span></p>
								<p class="ant-upload-hint">最大支持上传1个文件，单个文件大小不超过5MB。</p>
							</div>
						</a-upload>
					</div>
				</div>
				<!-- 右侧区域 -->
				<div style="flex: 1; border: 1px solid #f0f0f0; border-radius: 4px; padding: 16px; overflow: auto;">
					<div v-if="planContentHtml" v-html="planContentHtml"></div>
					<div v-else style="color: #999; text-align: center; padding-top: 40px;">
						请上传会议方案文件（.docx），此处将显示解析内容
					</div>
				</div>
			</div>
		</a-spin>
	`,
	data() {
		// 安全获取 plan_file_path，并尝试提取 uid
		const planFilePath = ctx.getField('t_meeting_minutes_gjdxaf5c', 'plan_file_path');
		let planFileUid = '';
		if (planFilePath) {
			const match = planFilePath.match(/\/store\/([^/?.]+)\./);
			if (match && match[1]) {
				planFileUid = match[1];
			}
		}
		return {
			deptCode: Array.isArray(ctx.getField('t_meeting_minutes_gjdxaf5c', 'dept_code')) && ctx.getField('t_meeting_minutes_gjdxaf5c', 'dept_code').length > 0 ? ctx.getField('t_meeting_minutes_gjdxaf5c', 'dept_code')[0] : [department_id],
			meetingName: ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_name'),
			planFileList: planFilePath ? [{ uid: planFileUid, name: ctx.getField('t_meeting_minutes_gjdxaf5c', 'plan_file_name'), url: planFilePath, status: 'done' }] : [],
			planContentHtml: '',
			loading: false,
			positions: []
		};
	},
	computed: {
		meetingType() {
			return url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
		},
		isViewMode() {
			return url?.showAsView === 'true';
		}
	},
	mounted() {
		this.getPositions();
		if (ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_record')) {
			this.planContentHtml = this.renderMeetingPlan(ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_record'));
		}
	},
	methods: {
		onDeptCodeChange(selectedIds) {
			const val = Array.isArray(selectedIds) ? selectedIds[0] : selectedIds;
			this.deptCode = val;
			ctx.setField('t_meeting_minutes_gjdxaf5c', 'dept_code', val);
		},
		onMeetingNameChange(e) {
			this.meetingName = e.target.value;
			ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_name', e.target.value);
		},
		// 文件上传前校验
		beforeUpload(file) {
			// const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx');
			// if (!isDocx) {
			// 	utils.toast('仅支持 .docx 格式文件', 'warning', 'message');
			// 	return false;
			// }
			const isLt5M = file.size / 1024 / 1024 < 5;
			if (!isLt5M) {
				utils.toast('文件大小不能超过 5MB', 'warning', 'message');
				return false;
			}
			return true;
		},
		async handleRemove(file, fileList) {
			if (await utils.confirm('是否确认删除文件？删除后会议记录、会议纪要、决议将一并删除，请谨慎操作！')) {
				// 清空文件列表
				this.planFileList = [];
				// 清空预览内容
				this.planContentHtml = '';
				// 清空 ctx 相关字段
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_file_name', '');
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_file_path', '');
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_content', '');
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_record', null);
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_summary', null);
				return true;
			}
			return false;
		},
		handlePreview() {
			return false;
		},
		async onPlanFileChange({ file, fileList }) {
			this.planFileList = fileList.slice(-1) || [];
			// 上传成功后提取文件信息
			if (file && file.status === 'done') {
				const response = file.response;
				if (response && response.success && response.data) {
					const { url, fileName } = response.data;
					// 同步到外部数据表
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_file_name', fileName);
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_file_path', url);
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_content', '');
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_record', null);
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_summary', null);
				}
				// 并行加载文档内容和会议记录 JSON
				this.loading = true;
				try {
					// await this.loadMeetingRecord(file);
					await this.loadMeetingRecordByNvWaChat(file);
				} catch (err) {
					console.error('并行加载失败', err);
				} finally {
					this.loading = false;
				}
			}
		},
		// 加载会议记录 JSON-调用女娲接口-先注释保留
		async loadMeetingRecordByNvWaChat(file) {
			try {
				const filePath = ctx.getField('t_meeting_minutes_gjdxaf5c', 'plan_file_path');
				if (!filePath) {
					console.warn('没有 plan_file_path，无法获取会议记录');
					return;
				}

				const conversationId2 = ctx.getField('t_meeting_minutes_gjdxaf5c', 'summary_skeleton_session_ids');
				const token2 = (url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type')) === 'party_committee' ? 'ak-3ea5e96f93a84aea8811d17de2861338' : 'ak-6d5cc5e1c08743689061cee1f57dbda1';
				const result = await nvWaChat(conversationId2, token2, {
					debug: false,
					message: this.meetingType === 'party_committee' ? '帮我处理一下这个党委会会议纪要' : '根据办公会会议纪要，生成决议',
					attachments: [
						{
							fileUrl: filePath,
							mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						}
					]
				});

				console.log('result~~~', result);

				const match = result.match(/```json\s*([\s\S]*?)\s*```/);
				const record = JSON.parse((match && match[1]) || '{}');
				console.log('成功解析会议记录~~~', record);

				if (Object.keys(record).length) {
					this.loadMeetingRecord(file);
				} else {
					this.applyPositionsAndRender(record);
					console.log('成功解析会议记录', record);
				}
			} catch (err) {
				console.error('nvWaChat接口获取会议记录失败', err);
				this.loadMeetingRecord(file);
			}
		},
		// 加载会议记录 JSON-硬编码-目前的实现方案-无法对应上三重一大相关信息
		async loadMeetingRecord(file) {
			try {
				// 1. 获取文件 ArrayBuffer
				const originFile = file.originFileObj || file;
				if (!originFile) return;
				const arrayBuffer = await originFile.arrayBuffer();

				// 2. 检查 mammoth 库是否已加载
				if (typeof window.mammoth === 'undefined') {
					throw new Error('mammoth 库未加载，请检查环境');
				}

				// 3. 使用 convertToHtml 保留文档结构与编号
				const result = await window.mammoth.convertToHtml({ arrayBuffer });
				const html = result.value;

				console.log('html', html);

				// 4. 调用 parseMeetingText 解析 HTML
				const record = this.parseMeetingText(html);

				// 5. 调用公共方法处理职务赋值、渲染和保存
				this.applyPositionsAndRender(record);
				console.log('成功解析会议记录', record);
			} catch (err) {
				console.error('解析会议记录失败', err);
				utils.toast('解析会议记录失败', 'error', 'message');
			}
		},
		applyPositionsAndRender(record) {
			// 1. 职务赋值
			if (this.positions.length > 0) {
				// 处理 chairperson
				if (record.chairperson && record.chairperson.position == null) {
					const found = this.positions.find(p => p.name === record.chairperson.name);
					if (found) record.chairperson.position = found.position;
				}
				// 处理 attendees
				if (Array.isArray(record.attendees)) {
					record.attendees.forEach(person => {
						if (person && person.position == null) {
							const found = this.positions.find(p => p.name === person.name);
							if (found) person.position = found.position;
						}
					});
				}
				// 处理 observers
				if (Array.isArray(record.observers)) {
					record.observers.forEach(person => {
						if (person && person.position == null) {
							const found = this.positions.find(p => p.name === person.name);
							if (found) person.position = found.position;
						}
					});
				}
			}

			// 2. 渲染会议方案内容
			this.planContentHtml = this.renderMeetingPlan(record);

			// 3. 保存到 ctx
			ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_record', record);

			return record;
		},
		parseMeetingText(html) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const body = doc.body;
			return this.parseMeeting(body, this.meetingType);
		},
		parseMeeting(body, meetingType) {
			const result = {
				title: '',
				issue: '',
				datetime: '',
				venue: '',
				chairperson: { name: '', position: null },
				attendees: [],
				observers: [],
				proposal: [] // 分组数组，每个元素 { groupTitle, items: [...] }
			};

			// 1. 提取基本信息（从 <p> 中）
			const allP = body.querySelectorAll('p');
			let observerSegments = [];
			let isObserverCollecting = false;

			for (const p of allP) {
				const text = p.textContent.trim();
				if (!text) continue;

				if (text.includes('会议时间：')) {
					result.datetime = text.replace('会议时间：', '').trim();
				} else if (text.includes('会议地点：')) {
					result.venue = text.replace('会议地点：', '').trim();
				} else if (text.includes('主持：')) {
					// 仅党委会有此字段，办公会忽略
					if (meetingType === 'party_committee') {
						const name = text.replace('主持：', '').trim();
						result.chairperson.name = name;
					}
				} else if (text.includes('出席：') || text.includes('出    席：')) {
					const names = text.replace(/出\s*席：/, '').trim();
					result.attendees = names.split(/、|，/).map(s => ({ name: s.trim() }));
				} else if (text.includes('列席：') || text.includes('列    席：')) {
					const names = text.replace(/列\s*席：/, '').trim();
					if (names) observerSegments.push(names);
					isObserverCollecting = true;
				} else if (isObserverCollecting) {
					const excludeKeywords = ['会议时间：', '会议地点：', '主持：', '出席：', '汇报单位', '列席单位'];
					const isExclude = excludeKeywords.some(kw => text.includes(kw));
					if (!isExclude && text) {
						observerSegments.push(text);
					} else {
						isObserverCollecting = false;
					}
				} else if (!result.issue && meetingType === 'office_meeting') {
					// 办公会提取期号
					const periodMatch = text.match(/（([^）]*第\d+期[^）]*)）/);
					if (periodMatch) result.issue = periodMatch[1];
				}
			}

			if (observerSegments.length > 0) {
				const full = observerSegments.join('、');
				const names = full
					.split(/、|，/)
					.map(s => s.trim())
					.filter(s => s);
				result.observers = names.map(name => ({ name }));
			}

			// 2. 标题：通常由前两个 <p> 组成
			const titleP = body.querySelectorAll('p');
			if (titleP.length >= 2) {
				const first = titleP[0].textContent.trim();
				const second = titleP[1].textContent.trim();
				if (first && second) {
					result.title = (first + second).replace(/\s+/g, '');
				}
			}
			if (!result.title) {
				result.title = meetingType === 'party_committee' ? '成都数据集团党委会会议方案' : '成都数据集团股份有限公司总经理办公会议案一览';
			}

			// 3. 办公会主持固定值
			if (meetingType === 'office_meeting') {
				result.chairperson = { name: '李泉', position: '党委副书记、总经理' };
			}

			// 4. 提取 proposal：使用 currentGroup 维护最近分组
			let currentGroup = null;

			function getDirectText(el) {
				let text = '';
				for (const child of el.childNodes) {
					if (child.nodeType === Node.TEXT_NODE) {
						text += child.textContent;
					}
				}
				return text.trim();
			}

			const processList = listNode => {
				const items = listNode.querySelectorAll(':scope > li');
				for (const li of items) {
					const subList = li.querySelector(':scope > ol, :scope > ul');
					const directText = getDirectText(li);
					if (subList) {
						if (directText) {
							// 有直接文本 → 创建分组
							const group = {
								groupTitle: directText,
								items: []
							};
							result.proposal.push(group);
							currentGroup = group;
							processList(subList);
						} else {
							// 无直接文本 → 直接处理子列表
							processList(subList);
						}
					} else {
						// 当前 li 是议题
						if (!currentGroup) {
							const defaultGroup = {
								groupTitle: '会议议题',
								items: []
							};
							result.proposal.push(defaultGroup);
							currentGroup = defaultGroup;
						}
						const item = {
							id: uuid.v4(),
							type: 'PROPOSAL',
							title: li.textContent.trim(),
							content: [],
							recordContent: '',
							match_id: null,
							match_item: null
						};
						currentGroup.items.push(item);
					}
				}
			};

			const children = Array.from(body.childNodes);
			for (const node of children) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					const tag = node.tagName.toLowerCase();
					if (tag === 'ol' || tag === 'ul') {
						processList(node);
					} else if (tag === 'p') {
						const text = node.textContent.trim();
						if (!text) continue;
						if (currentGroup && currentGroup.items.length > 0) {
							const currentItem = currentGroup.items[currentGroup.items.length - 1];
							if (text.includes('汇报单位：')) {
								const raw = text.replace('汇报单位：', '').trim();
								const parts = raw.split(/\s{2,}/).filter(s => s);
								if (parts.length >= 2) {
									const department = parts[0].trim();
									const person = parts[1].trim();
									currentItem.content.push({
										type: meetingType === 'office_meeting' ? 'reportPerson' : 'reportUnit',
										list: [{ department: meetingType === 'office_meeting' ? '' : department, person }]
									});
								} else if (parts.length === 1) {
									const person = parts[0].trim();
									currentItem.content.push({
										type: meetingType === 'office_meeting' ? 'reportPerson' : 'reportUnit',
										list: [{ department: '', person }]
									});
								}
							} else if (text.includes('列席单位：')) {
								const raw = text.replace('列席单位：', '').trim();
								const parts = raw.split(/\s{2,}/).filter(s => s);
								const list = [];
								if (meetingType === 'party_committee') {
									// 成对处理：部门 + 人员
									for (let i = 0; i < parts.length; i += 2) {
										const dept = parts[i] ? parts[i].trim() : '';
										const person = i + 1 < parts.length ? parts[i + 1].trim() : '';
										list.push({ department: dept, person });
									}
								} else {
									// 办公会：每个部分为一个单位
									for (const part of parts) {
										list.push({ department: part.trim(), person: '' });
									}
								}
								if (list.length > 0) {
									currentItem.content.push({
										type: 'observerUnit',
										list
									});
								}
							} else if (!text.includes('：') && text) {
								// 可能是列席单位的续行
								const lastContent = currentItem.content[currentItem.content.length - 1];
								if (lastContent && lastContent.type === 'observerUnit') {
									const parts = text.split(/\s{2,}/).filter(s => s);
									if (meetingType === 'party_committee') {
										for (let i = 0; i < parts.length; i += 2) {
											const dept = parts[i] ? parts[i].trim() : '';
											const person = i + 1 < parts.length ? parts[i + 1].trim() : '';
											lastContent.list.push({ department: dept, person });
										}
									} else {
										for (const part of parts) {
											lastContent.list.push({ department: part.trim(), person: '' });
										}
									}
								}
							}
						}
					}
				}
			}

			// 5. 根据分组标题调整议题类型（如“传达学习” → SPIRIT）
			for (const group of result.proposal) {
				if (group.groupTitle.includes('传达学习')) {
					for (const item of group.items) {
						item.type = 'SPIRIT';
					}
				}
				if (meetingType === 'office_meeting') {
					for (const item of group.items) {
						if (item.title.includes('通报')) {
							item.type = 'MATURITY';
						}
					}
				}
			}

			return result;
		},
		// 将会议方案 JSON 数据渲染为 HTML 字符串
		renderMeetingPlan(data) {
			const { issue, datetime, venue, chairperson, attendees, observers, proposal } = data;

			// 根据会议类型构建标题 HTML
			let titleHtml = '';
			if (this.meetingType === 'party_committee') {
				titleHtml = `
					<div style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 22pt; line-height: 34pt; text-align: center; margin: 0;">成都数据集团党委会</div>
					<div style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 22pt; line-height: 34pt; text-align: center; margin: 0 0 20px 0;">会议方案</div>
				`;
			} else {
				titleHtml = `
					<div style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 22pt; line-height: 34pt; text-align: center; margin: 0;">成都数据集团股份有限公司</div>
					<div style="font-size: 22pt; line-height: 34pt; text-align: center; margin: 0; margin-top: 8px;">总经理办公会议案一览</div>
					${issue ? `<div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; text-align: center;">${issue}</div>` : ''}
				`;
			}

			// 此处添加一个空行 行高19磅
			titleHtml += '<div style="height: 19pt; line-height: 19pt;"></div>';

			// 构建基本信息块
			const infoItems = [
				{ label: '会议时间：', value: datetime },
				{ label: '会议地点：', value: venue },
				{ label: '主  持：', value: chairperson?.name || '党委副书记、总经理李泉' },
				{ label: '出  席：', value: attendees.map(a => a.name).join('、') },
				{ label: '列  席：', value: observers.map(a => a.name).join('、') }
			];
			const infoHtml = infoItems
				.map(
					item =>
						`<div style="display: flex; font-size: 16pt; line-height: 28pt;">
							<div style="font-family: '方正黑体', 'SimHei', '黑体', 'Hei', sans-serif; flex-shrink: 0;">${item.label}</div><div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif;">${item.value}</div>
						</div>`
				)
				.join('');

			// 渲染提案（分组 + 序号）
			let proposalHtml = '';
			proposal.forEach((group, gIdx) => {
				// 一级序号（中文）
				const groupNumber = toChineseNumber(gIdx + 1);
				proposalHtml += `<div style="font-family: '方正黑体', 'SimHei', '黑体', 'Hei', sans-serif; font-size: 16pt;">${groupNumber}、${group.groupTitle}</div>`;

				group.items.forEach((item, iIdx) => {
					// 二级序号（阿拉伯数字）
					const itemNumber = iIdx + 1;
					proposalHtml += `<div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 28pt; text-indent: 2em;">${itemNumber}. ${item.title}</div>`;

					// 处理 PROPOSAL 类型的扩展内容（汇报人和列席单位）
					if (item.type === 'PROPOSAL' && Array.isArray(item.content) && item.content.length > 0) {
						// ===== 汇报单位 / 汇报人 =====
						const report = item.content.find(d => d.type === 'reportPerson' || d.type === 'reportUnit');
						if (report && report.list && report.list.length > 0) {
							if (this.meetingType === 'office_meeting') {
								const reporters = report.list.map(r => r.person || r.name).join('、');
								proposalHtml += `
									<div style="display: flex; padding-left: 3.5em; font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 28pt;">
										<div style="flex-shrink: 0;">汇报人：</div>
										<div style="flex: 1;">${reporters}</div>
									</div>
								`;
							} else {
								const reportItems = report.list.map(r => `<div>${r.department} ${r.person}</div>`).join('');
								proposalHtml += `
									<div style="display: flex; padding-left: 3.5em; font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 28pt;">
										<div style="flex-shrink: 0;">汇报单位：</div>
										<div style="flex: 1;">${reportItems}</div>
									</div>
								`;
							}
						}
						// ===== 列席单位 =====
						const observerUnit = item.content.find(d => d.type === 'observerUnit');
						if (observerUnit && observerUnit.list && observerUnit.list.length > 0) {
							if (this.meetingType === 'office_meeting') {
								const units = observerUnit.list.map(u => u.department).filter(Boolean);
								const rows = [];
								for (let i = 0; i < units.length; i += 2) {
									const rowUnits = units.slice(i, i + 2).join('  ');
									rows.push(`<div>${rowUnits}</div>`);
								}
								const unitsHtml = rows.join('');
								proposalHtml += `
									<div style="display: flex; padding-left: 3.5em; font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 28pt;">
										<div style="flex-shrink: 0;">列席单位：</div>
										<div style="flex: 1;">${unitsHtml}</div>
									</div>
								`;
							} else {
								const attendingItems = observerUnit.list.map(u => `<div>${u.department} ${u.person}</div>`).join('');
								proposalHtml += `
									<div style="display: flex; padding-left: 3.5em; font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 28pt;">
										<div style="flex-shrink: 0;">列席单位：</div>
										<div style="flex: 1;">${attendingItems}</div>
									</div>
								`;
							}
						}
					}
				});
			});

			const html = `
				<div style="font-family: '仿宋', 'FangSong', '宋体', serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #000;">
					<!-- 主标题 -->
					${titleHtml}
					<!-- 基本信息 -->
					<div style="margin-bottom: 20px;">${infoHtml}</div>
					<!-- 提案 -->
					${proposalHtml}
				</div>
			`;

			this.planContentHtml = html;
			ctx.setField('t_meeting_minutes_gjdxaf5c', 'plan_content', html);
			return html;
		},
		async getPositions() {
			const { data: { value } = {} } = await utils.querySvc({
				app_id: 'app_g94x9xlscj',
				query: {
					page_index: 1,
					page_size: 50,
					query_criteria: []
				},
				svc_code: 't_g94x9xlscj_position_io8z5a7c_wtu1gxcz'
			});
			this.positions = value || [];
		}
	}
};

// ========== 提取 JSON 代码块中的 content 字段（独立函数，不依赖组件实例） ==========
function extractContentFromJsonBlock(block) {
	// 去除首尾空白
	let jsonStr = block.trim();

	// 处理 ```json 代码块标记
	const jsonStart = jsonStr.indexOf('```json');
	if (jsonStart !== -1) {
		const start = jsonStart + 7;
		const jsonEnd = jsonStr.lastIndexOf('```');
		let end = jsonStr.length;
		if (jsonEnd > start) {
			end = jsonEnd;
		}
		jsonStr = jsonStr.substring(start, end).trim();
	}

	// 定位 "content": " 并提取 content 值
	const key = '"content": "';
	const startIdx = jsonStr.indexOf(key);
	if (startIdx === -1) {
		return null;
	}
	const contentStart = startIdx + key.length;

	// 尝试找到结束位置
	let endIdx = -1;
	const closeQuoteBrace = jsonStr.lastIndexOf('"}');
	if (closeQuoteBrace !== -1 && closeQuoteBrace >= contentStart) {
		endIdx = closeQuoteBrace;
	} else {
		const brace = jsonStr.lastIndexOf('}');
		if (brace !== -1 && brace >= contentStart) {
			endIdx = brace;
			if (jsonStr[endIdx - 1] === '"') {
				endIdx--;
			}
		} else {
			endIdx = jsonStr.length;
		}
	}

	let content = jsonStr.slice(contentStart, endIdx);
	// 将字面量转义符还原为真实字符，供 textarea 正常显示换行
	content = content
		.replace(/\\r\\n/g, '\n')
		.replace(/\\n/g, '\n')
		.replace(/\\r/g, '\n')
		.replace(/\\"/g, '"')
		.replace(/\\\\/g, '\\');
	// 清理可能残留的结尾空白
	content = content.replace(/\s+$/, '');
	return content;
}

// ========== AI 生成弹窗组件 ==========
const AiGenerateModal = {
	template: `
		<a-modal
			v-model:visible="visible"
			title="AI生成"
			:footer="null"
			@cancel="handleCancel"
		>
			<template v-if="item">
				<!-- SPIRIT 类型：仅写作要求 -->
				<div v-if="item.type === 'SPIRIT' || item.type === 'MATURITY'">
					<a-form-item label="写作要求" required>
						<div class="form-item-requirement-content" style="border: 1px solid #dee0e3; padding: 4px 11px; border-radius: 4px; max-height: 420px; overflow-y: auto;">
							<div style="color: #999;">原文：{{ item.recordContent || '暂无内容'}}</div>
							<a-textarea
								v-model:value="form.requirement"
								placeholder="请输入写作要求"
								:rows="3"
							/>
						</div>
					</a-form-item>
				</div>

				<!-- PROPOSAL 类型：上传文件 + 写作要求 -->
				<div v-else-if="item.type === 'PROPOSAL'">
					<a-form-item label="上传文件" required>
						<a-upload
							v-model:file-list="form.fileList"
							action="/szzg/api/v1/file/upload?type='store'"
							:headers="{ Authorization: 'ak-3beb5c135a134f9e9f478371022a750b' }"
							accept=".docx"
							:multiple="false"
							:before-upload="beforeUpload"
							@change="onFileChange"
						>
							<a-button>上传文件</a-button>
						</a-upload>
					</a-form-item>
					<a-form-item label="写作要求" required>
						<a-textarea
							v-model:value="form.requirement"
							placeholder="请输入写作要求"
							:rows="3"
						/>
					</a-form-item>
				</div>

				<!-- 发送按钮（居右） -->
				<div style="text-align: right; margin: 12px 0;">
					<a-button type="primary" :loading="sending" @click="handleSend">发送</a-button>
				</div>

				<!-- 生成内容表单项（只读） -->
				<a-form-item label="生成内容">
					<a-textarea
						v-model:value="generatedContent"
						:rows="6"
						readonly
						placeholder="点击「发送」后，AI生成的内容将显示于此"
					/>
				</a-form-item>

				<!-- 应用按钮（居右） -->
				<div style="text-align: right; margin: 12px 0;">
					<a-button type="primary" :disabled="!generatedContent" @click="handleApply">应用</a-button>
				</div>
			</template>
		</a-modal>
	`,
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		item: {
			type: Object,
			default: null
		},
		meetingType: {
			type: String,
			required: true
		}
	},
	emits: ['update:visible', 'success'],
	data() {
		return {
			sending: false,
			generatedContent: '',
			form: {
				requirement: '',
				fileList: []
			}
		};
	},
	watch: {
		visible(newVal) {
			if (!newVal) {
				this.resetForm();
			}
		},
		item: {
			handler(newVal) {
				if (newVal) {
					this.resetForm();
				}
			},
			immediate: false
		}
	},
	methods: {
		resetForm() {
			this.form.requirement = '';
			this.form.fileList = [];
			this.generatedContent = '';
			this.sending = false;
		},
		// ========== 新增：文件上传前校验（参考 StepPlan） ==========
		beforeUpload(file) {
			// 可选的格式校验，若需要可取消注释
			// const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx');
			// if (!isDocx) {
			// 	utils.toast('仅支持 .docx 格式文件', 'warning', 'message');
			// 	return false;
			// }
			const isLt5M = file.size / 1024 / 1024 < 5;
			if (!isLt5M) {
				utils.toast('文件大小不能超过 5MB', 'warning', 'message');
				return false;
			}
			return true;
		},
		// ========== 新增：文件列表变化处理（保留最新文件） ==========
		onFileChange({ file, fileList }) {
			// 只保留最新上传的文件
			this.form.fileList = fileList.slice(-1);
		},
		// ========== 补全后的 handleSend ==========
		async handleSend() {
			// 1. 必填校验
			if (this.item) {
				const requirement = this.form.requirement?.trim();
				if (!requirement) {
					utils.toast('请填写写作要求', 'warning', 'message');
					return;
				}
				if (this.item.type === 'PROPOSAL') {
					const hasUploadedFile = this.form.fileList.some(f => f.status === 'done');
					if (!hasUploadedFile) {
						utils.toast('请上传文件', 'warning', 'message');
						return;
					}
				}
			}

			this.sending = true;
			let message = '';
			let attachments = [];

			try {
				// 2. 构建消息和附件
				if (this.item && (this.item.type === 'SPIRIT' || this.item.type === 'MATURITY')) {
					message = `原文：${this.item.recordContent || ''}\n写作要求：${this.form.requirement}`;
				} else if (this.item && this.item.type === 'PROPOSAL') {
					message = `写作要求：${this.form.requirement}`;
					// 获取上传成功的文件信息
					const uploadedFile = this.form.fileList.find(f => f.status === 'done');
					if (uploadedFile && uploadedFile.response && uploadedFile.response.data) {
						const fileData = uploadedFile.response.data;
						attachments = [
							{
								fileUrl: fileData.url,
								fileName: fileData.fileName || uploadedFile.name,
								mimeType: fileData.mimeType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								fileKey: fileData.key
							}
						];
					}
				}

				// 3. 调用女娲接口
				const result = await nvWaChat(ctx.getField('t_meeting_minutes_gjdxaf5c', 'summary_item_session_ids'), 'ak-3beb5c135a134f9e9f478371022a750b', {
					debug: false,
					message,
					attachments
				});

				// 4. 直接调用外部函数提取 content（不再依赖 this）
				this.generatedContent = extractContentFromJsonBlock(result);
				if (this.generatedContent) {
					utils.toast('内容生成成功', 'success', 'message');
				}
			} catch (err) {
				console.error('调用 女娲会话接口 失败', err);
				utils.toast('生成失败：' + err.message, 'error', 'message');
			} finally {
				this.sending = false;
			}
		},
		handleApply() {
			if (!this.generatedContent) return;
			this.$emit('success', this.generatedContent);
			this.$emit('update:visible', false);
		},
		handleCancel() {
			this.$emit('update:visible', false);
		}
	}
};

// ========== 会议记录组件 ==========
const MeetingRecord = {
	template: `
    <div style="padding: 20px; height: 100%; overflow-y: auto; width: 100%;">
      <!-- 会议标题 -->
      <div v-if="meetingRecord.title" style="text-align: center; font-weight: bold; font-size: 20px; margin-bottom: 8px;">{{ meetingRecord.title }}</div>
      <!-- 办公会期号 -->
      <div v-if="meetingType === 'office_meeting' && meetingRecord.issue" style="text-align: center; font-size: 18px; margin-bottom: 16px;">（{{ meetingRecord.issue }}）</div>

      <!-- 党委会标题（兼容旧格式） -->
      <h2 v-if="meetingType === 'party_committee' && !meetingRecord.title" style="text-align: center; margin-bottom: 20px;">成都数据集团党委会会议记录</h2>

      <!-- 会议基本信息 -->
      <div style="margin-bottom: 16px; line-height: 1.8;">
        <div><strong>会议时间：</strong>{{ meetingRecord.datetime }}</div>
        <div><strong>会议地点：</strong>{{ meetingRecord.venue }}</div>
        <div v-if="meetingType === 'office_meeting'"><strong>主  持：</strong>党委副书记、总经理李泉</div>
        <div v-else-if="meetingRecord.chairperson && meetingRecord.chairperson.name"><strong>主  持：</strong>{{ meetingRecord.chairperson.name }}</div>
        <div><strong>出  席：</strong>{{ formatNames(meetingRecord.attendees) }}</div>
        <div><strong>列  席：</strong>{{ formatNames(meetingRecord.observers) }}</div>
      </div>

      <!-- 提案列表（展平分组） -->
      <div
        v-for="(item, idx) in flatProposal"
        :key="item.id || idx"
        style="margin-bottom: 24px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px;"
      >
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 500;">{{ toChineseNumber(idx + 1) }}、{{ item.title }}</h3>
          <div v-if="!isViewMode" @click="onAIGenerate(item)" style="display: flex; flex-shrink: 0; align-items: center; cursor: pointer;">
            <img class="form-label-ai-icon" src="/apps/aa3d492637b4d315ee05ae732da9c774.svg" alt="AI">
            <div style="margin-left: 8px; color: #4c78fc;">AI生成</div>
          </div>
        </div>
        <a-textarea
          :disabled="isViewMode"
          :value="item.recordContent"
          @change="(e) => onContentChange(item._groupIdx, item._itemIdx, e.target.value)"
          :rows="6"
          placeholder="请输入内容"
          style="width: 100%;"
        />
      </div>

      <!-- AI 生成弹窗子组件 -->
      <AiGenerateModal
        v-model:visible="aiModalVisible"
        :item="aiModalItem"
        :meetingType="meetingType"
        @success="handleAiSuccess"
      />
    </div>
  `,
	components: {
		AiGenerateModal
	},
	props: {
		meetingRecord: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			aiModalVisible: false,
			aiModalItem: null
		};
	},
	computed: {
		meetingType() {
			return url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
		},
		isViewMode() {
			return url?.showAsView === 'true';
		},
		// 展平 proposal 分组，为每个 item 添加 _groupIdx、_itemIdx、recordContent
		flatProposal() {
			const result = [];
			const proposal = this.meetingRecord.proposal || [];
			proposal.forEach((group, gIdx) => {
				if (group.items && Array.isArray(group.items)) {
					group.items.forEach((item, iIdx) => {
						// 文本内容使用 recordContent（若不存在则初始化为空）
						result.push({
							...item,
							recordContent: item.recordContent || '', // 文本内容
							_groupIdx: gIdx,
							_itemIdx: iIdx
						});
					});
				}
			});
			return result;
		}
	},
	watch: {
		meetingRecord: {
			handler(newVal) {
				this.initDefaultContent();
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		toChineseNumber,
		formatNames(arr) {
			return arr.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('，');
		},
		// 生成默认内容
		getDefaultContent(item) {
			const record = this.meetingRecord;
			if (!record) return '';
			const lines = [];

			// 获取出席人员姓名（直接使用原始名称，不拆分）
			const attendeeNames = record.attendees ? record.attendees.map(p => p.name || '') : [];
			const chairName = record?.chairperson?.position ? `${record.chairperson.position}${record.chairperson.name || ''}` : record.chairperson.name || '';

			if (this.meetingType === 'party_committee') {
				// 党委会：汇报人、出席、列席（每人一行）、主持人、会议议定
				lines.push('汇报人：');
				attendeeNames.forEach(name => {
					lines.push(name + '：');
				});
				// 提取当前提案的列席人员（observerUnit 中的 person）
				let observerPersons = [];
				if (item && item.content && Array.isArray(item.content)) {
					const observerUnit = item.content.find(d => d.type === 'observerUnit');
					if (observerUnit && observerUnit.list) {
						observerPersons = observerUnit.list.map(u => u.person).filter(p => p);
					}
				}
				observerPersons.forEach(name => {
					lines.push(name + '：');
				});
				if (chairName) {
					lines.push(chairName + '：');
				}
				lines.push('会议议定：');
			} else {
				// 办公会：列席人员（一行）、汇报人、出席、主持人
				// 提取当前提案的列席单位（observerUnit 中的 department）
				let observerUnits = [];
				if (item && item.content && Array.isArray(item.content)) {
					const observerUnit = item.content.find(d => d.type === 'observerUnit');
					if (observerUnit && observerUnit.list) {
						observerUnits = observerUnit.list.map(u => u.department).filter(p => p);
					}
				}
				if (observerUnits.length > 0) {
					lines.push('列席单位：' + observerUnits.join('、'));
				}
				lines.push(`汇报人${item.content.find(d => d.type === 'reportPerson')?.list[0]?.person || ''}：`);
				attendeeNames.forEach(name => {
					lines.push(name + '：');
				});
				if (chairName) {
					lines.push(chairName + '：');
				}
			}
			return lines.join('\n');
		},
		// 初始化默认内容（遍历所有分组 items，为 PROPOSAL 类型设置 recordContent）
		initDefaultContent() {
			const record = this.meetingRecord;
			if (!record || !record.proposal) return;
			let needUpdate = false;

			const newProposal = record.proposal.map(group => {
				const newItems = group.items.map(item => {
					if (item.type === 'PROPOSAL' && !item.recordContent) {
						needUpdate = true;
						const defaultContent = this.getDefaultContent(item);
						return { ...item, recordContent: defaultContent };
					}
					return item;
				});
				return { ...group, items: newItems };
			});

			if (needUpdate) {
				const updatedRecord = { ...record, proposal: newProposal };
				this.$emit('update:meetingRecord', updatedRecord);
			}
		},
		// 内容变更（通过 groupIdx 和 itemIdx 定位，更新 recordContent）
		onContentChange(groupIdx, itemIdx, newValue) {
			const proposal = this.meetingRecord.proposal || [];
			if (!proposal[groupIdx] || !proposal[groupIdx].items[itemIdx]) return;
			const updatedProposal = proposal.map((group, gIdx) => {
				if (gIdx === groupIdx) {
					const newItems = group.items.map((item, iIdx) => {
						if (iIdx === itemIdx) {
							return { ...item, recordContent: newValue };
						}
						return item;
					});
					return { ...group, items: newItems };
				}
				return group;
			});
			const updatedRecord = { ...this.meetingRecord, proposal: updatedProposal };
			this.$emit('update:meetingRecord', updatedRecord);
		},
		// ========== AI 生成相关 ==========
		onAIGenerate(item) {
			console.log('item~~~~', item);
			this.aiModalItem = item;
			this.aiModalVisible = true;
		},
		// AI 生成成功回调，更新 recordContent
		handleAiSuccess(generatedContent) {
			if (!this.aiModalItem) return;
			const flat = this.flatProposal;
			const idx = flat.findIndex(p => p.id === this.aiModalItem.id);
			if (idx !== -1) {
				const target = flat[idx];
				this.onContentChange(target._groupIdx, target._itemIdx, generatedContent);
			}
			this.aiModalItem = null;
		}
	}
};

// ========== 会议纪要组件 ==========
const MeetingMinutes = {
	template: `
    <div style="padding: 20px; height: 100%; overflow-y: auto; width: 100%; background: #ffffff; font-family: '仿宋', 'FangSong', '宋体', serif; color: #000000;">
      <!-- 顶部按钮 -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; justify-content: flex-end;">
        <a-button @click="generateSummary" v-if="!isViewMode">生成纪要</a-button>
        <a-button @click="handlePreview">预览</a-button>
        <form_tzow7ia4tz :meetingRecord="meetingRecord" :meetingSummary="meetingSummary" :types="['summary']" />
      </div>

      <!-- 空状态 -->
      <a-empty v-if="!meetingSummary" description="暂无会议数据，请先点击「生成纪要」" />

      <!-- 有数据时：使用 MinutesContent 组件（可编辑） -->
      <MinutesContent
        v-else
        :meetingRecord="meetingRecord"
        :meetingSummary="meetingSummary"
        :meetingType="meetingType"
        :editable="true"
        :editingId="editingId"
        :isViewMode="isViewMode"
        @startEdit="startEdit"
        @saveEdit="saveEdit"
        @cancelEdit="cancelEdit"
      />

      <!-- 预览模态框（只读） -->
      <a-modal
        v-model:visible="showPreview"
        title="会议纪要预览"
        width="50%"
        :footer="null"
        @cancel="showPreview = false"
      >
        <div style="height: 85vh; overflow-y: auto; padding: 20px;">
          <MinutesContent
            v-if="meetingSummary"
            :meetingRecord="meetingRecord"
            :meetingSummary="meetingSummary"
            :meetingType="meetingType"
            :editable="false"
          />
        </div>
      </a-modal>
    </div>
  `,
	props: {
		meetingRecord: {
			type: Object,
			required: true
		}
	},
	components: {
		form_tzow7ia4tz,
		// 内联的纪要内容组件（支持党委会/办公会不同红头）
		MinutesContent: {
			props: {
				meetingRecord: { type: Object, required: true },
				meetingSummary: { type: Object, required: true },
				meetingType: { type: String, required: true },
				editable: { type: Boolean, default: true },
				editingId: { type: [Number, String], default: null },
				isViewMode: { type: Boolean, default: false }
			},
			emits: ['startEdit', 'saveEdit', 'cancelEdit'],
			template: `
        <div>
          <!-- 红头文件标题区域（根据会议类型动态显示） -->
          <div style="text-align: center; margin-bottom: 8px;">
            <div v-if="meetingType === 'party_committee'" style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              中共成都数据集团股份有限公司委员会
            </div>
            <div v-else style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              成都数据集团股份有限公司
            </div>
            <div style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              {{ meetingType === 'party_committee' ? '党委会会议纪要' : '总经理办公会会议纪要' }}
            </div>
          </div>
					<div v-if="meetingType === 'office_meeting'" style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; text-align: center; margin-top: 8px; margin-bottom: 20px;">（{{ meetingRecord.issue }}）</div>

          <!-- 红色分隔线上方区域（党委会：仅右侧日期；办公会：左右结构综合管理部+日期） -->
          <div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; margin-bottom: 20px;">
            <!-- 党委会：仅右侧日期 -->
            <div v-if="meetingType === 'party_committee'" style="text-align: right; color: #000000;">
              {{ meetingSummary.datetime || '' }}
            </div>
            <!-- 办公会：左右结构，左侧综合管理部，右侧日期 -->
            <div v-else style="display: flex; justify-content: space-between; align-items: center; color: #000000;">
              <span>综合管理部</span>
              <span>{{ meetingSummary.datetime || '' }}</span>
            </div>
            <!-- 红色分隔线 -->
            <hr style="border: none; border-bottom: 3px solid #FF0000; margin: 4px 0 0 0;" />
          </div>
					<div style="height: 52pt"></div>

          <!-- 纪要摘要 - Word风格 -->
          <div v-if="meetingSummary.summaryText" style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 1.8; text-indent: 2em; margin-bottom: 24px; white-space: pre-wrap; text-align: justify;">
            {{ meetingSummary.summaryText }}
          </div>

          <!-- 议题列表 -->
          <div
            v-for="(item, idx) in meetingSummary.proposal"
            :key="item.id"
            style="margin-bottom: 28px; padding-bottom: 0;"
          >
            <!-- 议题标题 + 编辑按钮（仅可编辑时显示） -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <h3 style="font-family: '方正黑体_GBK', 'SimHei', '黑体', 'Hei', sans-serif; font-size: 16pt; margin: 0; text-indent: 2em; color: #000000;">
                <span>{{ toChineseNumber(idx + 1) }}、{{ item.title }}</span>
              </h3>
							<!-- 仅当 editable 为 true 且非只读模式时显示编辑相关按钮 -->
              <span v-if="editable && !isViewMode">
                <span v-if="editingId !== item.id">
                  <a-button size="large" type="link" @click="$emit('startEdit', item.id)">编辑</a-button>
                </span>
                <span v-else>
                  <a-button size="large" type="link" @click="$emit('saveEdit', item.id)">保存</a-button>
                  <a-button size="large" type="link" @click="$emit('cancelEdit', item.id)">取消</a-button>
                </span>
              </span>
            </div>

            <!-- 内容显示：查看态（只读） -->
            <div
              v-if="!editable || editingId !== item.id"
              style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height:28pt ;white-space: pre-wrap; min-height: 30px; padding: 0; text-indent: 2em; line-height: 1.8; text-align: justify;"
            >
              {{ item.summaryContent || '（暂无内容）' }}
            </div>

            <!-- 编辑态（仅可编辑且正在编辑该项时显示） -->
            <div v-else-if="editable && editingId === item.id">
              <a-textarea
                v-model:value="item.summaryContent"
                :rows="6"
                placeholder="请输入内容"
                style="width: 100%; font-family: '仿宋', 'FangSong', serif; font-size: 12pt; line-height: 1.8; text-indent: 2em"
              />
            </div>
          </div>
        </div>
      `,
			methods: {
				toChineseNumber
			}
		}
	},
	data() {
		return {
			meetingSummary: ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_summary'),
			editingId: null,
			editBackup: null,
			showPreview: false,
			bizItemInfoList: []
		};
	},
	computed: {
		meetingType() {
			return url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
		},
		isViewMode() {
			return url?.showAsView === 'true';
		},
		// 从分组结构中提取扁平提案列表（用于生成 summary）
		flatProposalForSummary() {
			const proposal = this.meetingRecord.proposal || [];
			const result = [];
			proposal.forEach(group => {
				if (group.items) {
					group.items.forEach(item => {
						result.push({
							...item,
							recordContent: item.recordContent || ''
						});
					});
				}
			});
			return result;
		}
	},
	watch: {
		meetingSummary: {
			handler(newVal) {
				if (newVal && Object.keys(newVal).length > 0) {
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_summary', newVal);
				}
			},
			deep: true,
			immediate: false
		},
		meetingRecord: {
			handler(newVal) {
				const uids = (this.flatProposalForSummary || [])
					.map(item => item.match_id)
					.filter(Boolean)
					.join(',');
				if (uids && this.bizItemInfoList.length === 0) {
					this.getBizItemInfoList(uids);
				}
			},
			deep: true,
			immediate: true // 立即执行一次，若初始已有数据则请求
		}
	},
	methods: {
		formatNames(arr) {
			return arr.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('，');
		},
		generateSummary() {
			if (!this.meetingRecord) return;
			const record = this.meetingRecord;
			const { datetime, venue, chairperson, attendees, observers } = record;

			let summaryText = '';
			if (this.meetingType === 'party_committee') {
				const chairStr = chairperson.position ? `${chairperson.position}${chairperson.name}` : chairperson.name;
				const attendeesStr = attendees.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('、');
				const observersStr = observers.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('、');
				summaryText = `${datetime}，成都数据集团${chairStr}同志在集团${venue}主持召开党委会，${attendeesStr}参加会议。集团领导班子其他成员${observersStr}列席会议。`;
			} else {
				const attendeeList = attendees.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('、');
				const observerList = observers
					.map(p => {
						if (p.department) {
							return p.department;
						}
						return p.position ? `${p.position}${p.name}` : p.name;
					})
					.join('、');
				const meetingIssue = record.issue || '2026年第X期办公会';
				summaryText = `${datetime}，成都数据集团在${venue}召开${meetingIssue}办公会，研究讨论经营管理等相关工作。${attendeeList}出席会议。${observerList}列席会议。`;
			}

			const bizList = this.bizItemInfoList || [];

			// 从分组中提取扁平 proposal 用于生成摘要
			const flatItems = this.flatProposalForSummary;
			const proposalCopy = flatItems.map(item => {
				const newItem = {
					id: item.id || '',
					title: item.title || '',
					summaryContent: item.recordContent || ''
				};
				if (item.type === 'PROPOSAL') {
					// 按行分割记录内容
					const lines = (item.recordContent || '').split('\n');
					// 查找包含“会议议定：”的行索引
					const targetIndex = lines.findIndex(line => line.includes('会议议定：'));
					if (targetIndex !== -1) {
						let targetLine = lines[targetIndex];
						// 若有 match_id 且匹配到业务信息，构建后缀
						if (item.match_id) {
							const matched = bizList.find(b => b.uid === item.match_id);
							if (matched && matched.meetings && matched.meetings.length > 0) {
								const authorities = matched.meetings.map(m => `${m.meeting_type_name}${m.review_authority}`).filter(Boolean);
								if (authorities.length > 0) {
									const suffix = `，按程序报${authorities.join('、')}。`;
									// 在“会议议定：”行末尾添加后缀
									targetLine = targetLine + suffix;
									lines[targetIndex] = targetLine;
									// 将修改后的整段文本作为 summaryContent
									newItem.summaryContent = lines.join('\n');
								}
							}
						}
						// 若未匹配到后缀，则保留原始内容（不修改）
					}
				}
				return newItem;
			});

			this.meetingSummary = {
				datetime: record.datetime,
				summaryText: summaryText,
				proposal: proposalCopy
			};
		},
		handlePreview() {
			if (this.meetingSummary) {
				this.showPreview = true;
			}
		},
		startEdit(id) {
			console.log('startEdit', id);
			this.editingId = id;
			const item = this.meetingSummary.proposal.find(p => p.id === id);
			if (item) {
				this.editBackup = item.summaryContent;
			}
		},
		saveEdit(id) {
			this.editingId = null;
			this.editBackup = null;
			ctx.eventBus.$emit('saveEdit');
		},
		cancelEdit(id) {
			const item = this.meetingSummary.proposal.find(p => p.id === id);
			if (item && this.editBackup !== null) {
				item.summaryContent = this.editBackup;
			}
			this.editingId = null;
			this.editBackup = null;
		},
		async getBizItemInfoList(uids) {
			const data = await utils.querySvc({
				app_id: 'app_g94x9xlscj',
				save_datas: {
					uids
				},
				svc_code: 'get_biz_item_info_list_s4z5gvue'
			});
			this.bizItemInfoList = data?.data || [];
		}
	}
};

// ========== 步骤组件：会议纪要 ==========
const StepMinutes = {
	template: `
		<div class="step-minutes-contain">
			<a-spin :spinning="false" tip="正在加载会议数据...">
				<div style="display: flex; flex: 1; gap: 16px; min-height: 0; height: calc(100% - 375px); overflow: auto;">
					<!-- 左侧：会议记录 -->
					<div style="flex: 1; border: 1px solid #f0f0f0; border-radius: 4px; overflow: auto;">
						<MeetingRecord
              :meetingRecord="sharedMeetingRecord"
              @update:meetingRecord="sharedMeetingRecord = $event"
            />
					</div>
					<!-- 右侧：会议纪要 -->
					<div style="flex: 1; border: 1px solid #f0f0f0; border-radius: 4px; overflow: auto;">
						 <MeetingMinutes
							:meetingRecord="sharedMeetingRecord"
						/>
					</div>
				</div>
			</a-spin>
		</div>
	`,
	components: {
		MeetingRecord,
		MeetingMinutes
	},
	data() {
		return {
			sharedMeetingRecord: {
				datetime: '',
				venue: '',
				chairperson: { name: '', position: '' },
				attendees: [],
				observers: [],
				proposal: []
			}
		};
	},
	computed: {
		meetingType() {
			return url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
		}
	},
	watch: {
		// 监听会议记录变化，同步到 ctx
		sharedMeetingRecord: {
			handler(newVal) {
				if (newVal && Object.keys(newVal).length > 0) {
					ctx.setField('t_meeting_minutes_gjdxaf5c', 'meeting_record', newVal);
				}
			},
			deep: true,
			immediate: false // 不立即执行，避免初始空对象覆盖已有数据
		}
	},
	async mounted() {
		const meetingRecord = ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_record');
		if (meetingRecord) this.sharedMeetingRecord = meetingRecord;
	},
	methods: {}
};

// ========== 步骤组件：会议决议 ==========
const StepResolution = {
	template: `
    <div style="padding: 20px; height: 100%; overflow-y: auto; width: 100%;">
      <!-- 按钮组 -->
      <div style="display: flex; gap: 12px; margin-bottom: 16px; justify-content: flex-end;">
        <a-button @click="handlePreview">预览</a-button>
        <form_tzow7ia4tz :meetingRecord="meetingRecord" :meetingSummary="meetingSummary" :types="['resolution']" :resolutionIndexes="[currentIndex]" />
      </div>

      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane
          v-for="(item, index) in proposalList"
          :key="'决议' + (index + 1)"
          :tab="'决议' + (index + 1)"
        >
          <!-- 决议内容 -->
          <resolution-content :item="item" :issue="issue" :datetime="datetime" :venue="venue" :chairperson="chairperson" :attendees="attendees" :observers="observers" :format-names="formatNames" :meeting-type="meetingType" />
        </a-tab-pane>
      </a-tabs>

      <!-- 预览模态框 -->
      <a-modal
        v-model:visible="showPreview"
        title="决议预览"
        width="50%"
        :footer="null"
        @cancel="showPreview = false"
      >
        <div style="height: 85vh; overflow-y: auto; padding: 20px;">
          <resolution-content
            v-if="currentItem"
            :item="currentItem"
            :issue="issue"
            :datetime="datetime"
            :venue="venue"
            :chairperson="chairperson"
            :attendees="attendees"
            :observers="observers"
            :format-names="formatNames"
            :meeting-type="meetingType"
          />
        </div>
      </a-modal>
    </div>
  `,
	components: {
		form_tzow7ia4tz,
		// 内联决议内容组件（样式与 MinutesContent 保持一致）
		ResolutionContent: {
			props: ['item', 'issue', 'datetime', 'venue', 'chairperson', 'attendees', 'observers', 'formatNames', 'meetingType'],
			template: `
        <div style="padding: 0 16px; color: #000000;">
          <!-- 红头文件标题区域（根据会议类型动态显示） -->
          <div style="text-align: center; margin-bottom: 8px;">
            <div v-if="meetingType === 'party_committee'" style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              中共成都数据集团股份有限公司委员会
            </div>
            <div v-else style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              成都数据集团股份有限公司
            </div>
            <div style="font-family: '方正小标宋简体', 'FZXiaoBiaoSong-B05S', '小标宋', 'SimSun', '宋体', serif; font-size: 42pt; line-height: 1.4; color: #FF0000; letter-spacing: 2px;">
              {{ meetingType === 'party_committee' ? '党委会会议决议' : '总经理办公会会议决议' }}
            </div>
          </div>
          <div v-if="meetingType === 'office_meeting'" style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; text-align: center; margin-top: 8px; margin-bottom: 20px;">（{{ issue }}）</div>

          <!-- 红色分隔线上方区域（党委会：仅右侧日期；办公会：左右结构综合管理部+日期） -->
          <div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; margin-bottom: 20px;">
            <!-- 党委会：仅右侧日期 -->
            <div v-if="meetingType === 'party_committee'" style="text-align: right; color: #000000;">
              {{ datetime || '' }}
            </div>
            <!-- 办公会：左右结构，左侧综合管理部，右侧日期 -->
            <div v-else style="display: flex; justify-content: space-between; align-items: center; color: #000000;">
              <span>综合管理部</span>
              <span>{{ datetime || '' }}</span>
            </div>
            <!-- 红色分隔线 -->
            <hr style="border: none; border-bottom: 3px solid #FF0000; margin: 4px 0 0 0;" />
          </div>
          <div style="height: 52pt;"></div>

          <!-- 会议信息（左对齐，仿宋） -->
          <div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 1.8; margin-bottom: 20px;">
            <div><strong>会议时间：</strong>{{ datetime }}</div>
            <div><strong>会议地点：</strong>{{ venue }}</div>
            <div><strong>主  持：</strong>{{ meetingType === 'office_meeting' ? '党委副书记、总经理李泉' : (chairperson.name + (chairperson.position ? '（' + chairperson.position + '）' : '')) }}</div>
            <div><strong>出  席：</strong>{{ formatNames(attendees) }}</div>
            <div><strong>列  席：</strong>{{ formatNames(observers) }}</div>
          </div>

          <!-- 决议正文 -->
          <div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 1.8; text-indent: 2em; white-space: pre-wrap; text-align: justify; margin-bottom: 40px;">
            <!-- 党委会：原有格式 -->
            <div v-if="meetingType === 'party_committee'">
              <div>中共成都数据集团股份有限公司委员会召开党委会，{{ item.title }}</div>
            </div>
            <!-- 办公会：在 item.content 之前拼接固定格式说明 -->
            <div v-else>
              <div>{{ datetime }}，成都数据集团{{ issue }}研究《{{ item.title }}》。</div>
            </div>
            <div>{{ item.summaryContent || '（内容待补充）' }}</div>
          </div>

          <!-- 落款（右下角） -->
          <div style="font-family: '方正仿宋', 'FangSong_GB2312', 'FangSong', '仿宋', 'FZFS', serif; font-size: 16pt; line-height: 1.8; text-align: right; margin-top: 40px;">
            <div>{{ meetingType === 'party_committee' ? '中共成都数据集团股份有限公司委员会' : '成都数据集团股份有限公司' }}</div>
            <div>{{ datetime }}</div>
          </div>
        </div>
      `
		}
	},
	computed: {
		meetingRecord() {
			return ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_record') || {};
		},
		meetingSummary() {
			return ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_summary') || {};
		},
		issue() {
			return this.meetingRecord.issue || '';
		},
		datetime() {
			return this.meetingRecord.datetime || this.meetingSummary.datetime || '';
		},
		venue() {
			return this.meetingRecord.venue || '';
		},
		chairperson() {
			return this.meetingRecord.chairperson || { name: '', position: '' };
		},
		attendees() {
			return this.meetingRecord.attendees || [];
		},
		observers() {
			return this.meetingRecord.observers || [];
		},
		proposalList() {
			return this.meetingSummary.proposal || [];
		},
		currentItem() {
			const index = parseInt(this.activeKey.replace('决议', '')) - 1;
			return this.proposalList[index] || null;
		},
		currentIndex() {
			const index = parseInt(this.activeKey.replace('决议', '')) - 1;
			return isNaN(index) ? 0 : index;
		},
		meetingType() {
			return url?.meetingType || ctx.getField('t_meeting_minutes_gjdxaf5c', 'meeting_type');
		},
		isViewMode() {
			return url?.showAsView === 'true';
		}
	},
	data() {
		return {
			activeKey: '决议1',
			showPreview: false
		};
	},
	methods: {
		formatNames(arr) {
			return arr.map(p => (p.position ? `${p.position}${p.name}` : p.name)).join('，');
		},
		handlePreview() {
			if (this.currentItem) {
				this.showPreview = true;
			}
		}
	}
};

// ========== 主容器组件 ==========
export const MeetingContain = {
	template: `
    <div style="display: flex; flex-direction: column; height: 100%; padding: 16px; box-sizing: border-box;">
      <!-- 步骤条 -->
      <div style="flex-shrink: 0; margin-bottom: 20px;">
        <a-steps
          :current="currentStepIndex"
          :items="stepItems"
          @change="onStepChange"
        ></a-steps>
      </div>
      <!-- 主体内容：由步骤组件填充 -->
      <div style="width: 100%; height: calc(100% - 375px);">
        <StepPlan v-if="curStep === 'plan'" />
        <StepMinutes v-else-if="curStep === 'minutes'" />
        <StepResolution v-else-if="curStep === 'resolution'" />
      </div>
    </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],
	emits: ['change'],
	components: {
		StepPlan,
		StepMinutes,
		StepResolution
	},
	data() {
		return {
			curStep: '',
			stepItems: [
				{ title: '会议方案', description: '上传会议方案', key: 'plan' },
				{ title: '会议纪要', description: '生成会议纪要', key: 'minutes' },
				{ title: '会议决议', description: '生成会议决议', key: 'resolution' }
			]
		};
	},
	computed: {
		currentStepIndex() {
			const index = this.stepItems.findIndex(item => item.key === this.curStep);
			return index >= 0 ? index : 0;
		},
		isViewMode() {
			return url?.showAsView === 'true';
		}
	},
	mounted() {
		// 监听外部事件
		ctx.eventBus.$on('load', () => {
			this.setStep('plan');
		});
		ctx.eventBus.$on('prev', () => {
			const currentIndex = this.currentStepIndex;
			if (currentIndex > 0) {
				this.setStep(this.stepItems[currentIndex - 1].key);
			}
		});
		ctx.eventBus.$on('next', () => {
			const currentIndex = this.currentStepIndex;
			if (currentIndex < this.stepItems.length - 1) {
				this.setStep(this.stepItems[currentIndex + 1].key);
			}
		});
	},
	methods: {
		// 统一步骤切换方法
		setStep(stepKey) {
			if (this.curStep !== stepKey) {
				this.curStep = stepKey;
				ctx.setField('t_meeting_minutes_gjdxaf5c', 'cur_step', stepKey);
				if (stepKey === 'plan') {
					// 展示
					!this.isViewMode && ctx.setInstance('save', 'isHide', false); // 保存
					ctx.setInstance('twdbEpMfc0', 'isHide', false); // 下一步
					ctx.setInstance('cancel', 'isHide', false); // 取消
					// 隐藏
					!this.isViewMode && ctx.setInstance('nP1vB4ckEX', 'isHide', true); // 确认
					ctx.setInstance('AAD795Y6Tu', 'isHide', true); // 上一步
				} else if (stepKey === 'minutes') {
					// 展示
					!this.isViewMode && ctx.setInstance('save', 'isHide', false); // 保存
					ctx.setInstance('AAD795Y6Tu', 'isHide', false); // 上一步
					ctx.setInstance('twdbEpMfc0', 'isHide', false); // 下一步
					ctx.setInstance('cancel', 'isHide', false); // 取消
					// 隐藏
					!this.isViewMode && ctx.setInstance('nP1vB4ckEX', 'isHide', true); // 确认
				} else if (stepKey === 'resolution') {
					// 展示
					ctx.setInstance('AAD795Y6Tu', 'isHide', false); // 上一步
					!this.isViewMode && ctx.setInstance('nP1vB4ckEX', 'isHide', false); // 确认
					ctx.setInstance('cancel', 'isHide', false); // 取消
					// 隐藏
					!this.isViewMode && ctx.setInstance('save', 'isHide', true); // 保存
					ctx.setInstance('twdbEpMfc0', 'isHide', true); // 下一步
				}
			}
		},
		// 点击步骤条的处理（若需要启用，可取消注释并实现；当前保持不切换）
		onStepChange(stepIndex) {
			// 若希望点击步骤切换，可取消注释：
			// const key = this.stepItems[stepIndex]?.key;
			// if (key) this.setStep(key);
			// 当前需求是点击步骤条不切换，故留空
		}
	}
};
