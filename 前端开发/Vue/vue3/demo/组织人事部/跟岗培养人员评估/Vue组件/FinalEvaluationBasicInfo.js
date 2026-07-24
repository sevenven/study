export const FinalEvaluationBasicInfo = {
	template: `
    <div class="evaluation-wrapper">
      <!-- 遮罩层（打印加载中） -->
      <div v-if="isDownloading" class="loading-overlay">
        <div class="spinner"></div>
        <div class="status-text">{{ statusMessage }}</div>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }">{{ Math.round(progress) }}%</div>
        </div>
      </div>

      <div class="basic-info-wrapper">
        <div class="left-section">{{ userNameFirstChar }}</div>
        <div class="middle-section">
          <div class="middle-top">
            <span class="user-name">{{ planUserName }}</span>
          </div>
          <div class="middle-bottom">
            <div class="info-item">
              <span class="info-label">跟岗岗位：</span>
              <span class="info-value">{{ post || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">导师：</span>
              <span class="info-value">{{ mentorName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">教练：</span>
              <span class="info-value">{{ coachName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">跟岗周期：</span>
              <span class="info-value">{{ durationStart }} - {{ durationEnd }}</span>
            </div>
          </div>
        </div>
        <div class="right-section">
          <div class="score-box" v-if="type === 'all'">
            <div class="score-label">综合分</div>
            <div class="score-value">{{ displayFinalScore }}</div>
          </div>
          <button class="print-btn" @click="handlePrintPDF">导出PDF</button>
        </div>
      </div>
      <div class="score-cards-container">
        <div class="score-card">
          <div class="score-card-title">标志性事件得分（权重70%）</div>
          <div class="score-value" :style="{ color: '#5a9dcc' }">{{ sepScore ? Number(sepScore)?.toFixed(2) : '-' }}</div>
        </div>
        <div class="score-card" v-if="type === 'all'">
          <div class="score-card-title">IDP得分（权重30%）</div>
          <div class="score-value" :style="{ color: '#daa520' }">{{ idpScore ? Number(idpScore)?.toFixed(2) : '-' }}</div>
        </div>
      </div>
    </div>
  `,
	data() {
		return {
			planUserName: '',
			post: '',
			mentorName: '',
			coachName: '',
			durationStart: '',
			durationEnd: '',
			finalScore: null,
			sepScore: null,
			idpScore: '',
			sepFinalEvaluationStatusCode: '',
			sepDetails: [],
			loading: true,
			type,
			// 打印遮罩相关状态
			isDownloading: false,
			progress: 0,
			statusMessage: ''
		};
	},
	computed: {
		userNameFirstChar() {
			return this.planUserName ? this.planUserName.charAt(0) : '?';
		},
		displayFinalScore() {
			// 修复：使用逻辑与代替按位与
			return this.finalScore != null && this.finalScore !== '' ? Number(this.finalScore).toFixed(2) : '待评分';
		}
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		// 获取测评基本信息（已包含姓名、岗位等）
		async fetchEvaluationInfo(uid) {
			const { data: { value } = {} } = await utils.querySvc({
				app_id: 'app_yqtmuhmhwy',
				save_datas: { uid },
				svc_code: 't_final_evaluation_o1y48pkw'
			});
			return value || {};
		},

		// 获取评分明细（使用新服务，已包含评分人姓名）
		async fetchSepDetails(evaluationId) {
			const { data: { value } = {} } = await utils.querySvc({
				app_id: 'app_yqtmuhmhwy',
				query: {
					page_index: 1,
					page_size: 100,
					query_criteria: [
						{ column_name: 'evaluation_id', query_type: 0, value: [evaluationId] },
						{ column_name: 'sys_deleted', query_type: 0, value: ['0'] }
					]
				},
				svc_code: 't_final_evaluation_sep_detail_2gisw4zy' // 替换为已关联姓名的服务
			});
			return value || [];
		},

		// 主数据请求（已简化，不再单独查询员工和字典）
		async fetchData() {
			const uid = utils.getPageData()?.dataSet?.t_final_evaluation_l76l0srb?.uid || '';
			if (!uid) {
				utils.toast('缺少评估记录 ID', 'error', 'message');
				this.loading = false;
				return;
			}

			try {
				const [evalInfo, sepDetails] = await Promise.all([this.fetchEvaluationInfo(uid), this.fetchSepDetails(uid)]);
				this.sepDetails = sepDetails;

				// 直接使用后端返回的姓名、岗位等
				this.planUserName = evalInfo.plan_user_name || '';
				this.post = evalInfo.post_label || evalInfo.post || '';
				this.mentorName = evalInfo.mentor_name || '';
				this.coachName = evalInfo.coach_name || '';
				this.durationStart = evalInfo.duration_start ? dayjs(evalInfo.duration_start).format('YYYY-MM-DD') : '';
				this.durationEnd = evalInfo.duration_end ? dayjs(evalInfo.duration_end).format('YYYY-MM-DD') : '';
				this.finalScore = evalInfo.final_score;
				this.sepScore = evalInfo.sep_score;
				this.idpScore = evalInfo.idp_score;
				this.sepFinalEvaluationStatusCode = evalInfo.sep_final_evaluation_status_code;
			} catch (e) {
				console.error('获取测评基本信息失败', e);
				utils.toast('获取测评信息失败', 'error', 'message');
			} finally {
				this.loading = false;
			}
		},

		// ==================== 单个 PDF 打印（含遮罩） ====================
		async handlePrintPDF() {
			const uid = ctx.externalParams?.uId;
			if (!uid) {
				utils.toast('缺少评估记录 ID', 'error', 'message');
				return;
			}

			const userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.includes('dingtalk')) {
				utils.toast('请复制链接在浏览器中下载: ' + window.location.href, 'info', 'modal');
				return;
			}

			if (from == 'admin' && type === 'sep' && this.sepFinalEvaluationStatusCode !== 'completed') {
				utils.toast('仅已完成测评的数据支持打印', 'warning', 'message');
				return;
			}

			if (from == 'admin' && type === 'all' && (this.finalScore === '' || this.finalScore == null)) {
				utils.toast('仅已完成测评的数据支持打印', 'warning', 'message');
				return;
			}

			this.isDownloading = true;
			this.progress = 0;
			this.statusMessage = '正在获取数据...';

			try {
				const { data } = await utils.querySvc({
					app_id: 'app_yqtmuhmhwy',
					save_datas: { uids: uid },
					svc_code: 't_final_evaluation_print_7ieudx6v'
				});
				const items = Array.isArray(data) ? data : data?.data || [];
				if (!items.length) {
					this.statusMessage = '未获取到打印数据';
					setTimeout(() => {
						this.isDownloading = false;
					}, 1500);
					return;
				}

				const item = items[0];
				this.progress = 40;
				this.statusMessage = '正在生成PDF...';

				const tempElement = this.createTempElement(item);
				document.body.appendChild(tempElement);

				const blob = await this.generatePDF(tempElement);
				const now = Date.now();
				const year = item.plan_year ? new Date(item.plan_year).getFullYear() : '';
				const person = item.plan_user_name || '跟岗人员';
				const fileName = `${year}期末${person}${type === 'sep' ? '标志性事件' : '评估结果'}_${now}.pdf`;

				this.progress = 90;
				this.statusMessage = '正在下载...';

				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);

				document.body.removeChild(tempElement);
				this.progress = 100;
				this.statusMessage = 'PDF 下载完成';
			} catch (error) {
				console.error('生成 PDF 失败:', error);
				this.statusMessage = '生成 PDF 失败';
			} finally {
				setTimeout(() => {
					this.isDownloading = false;
				}, 1500);
			}
		},
		createTempElement(item) {
			const tempDiv = document.createElement('div');
			tempDiv.style.position = 'absolute';
			tempDiv.style.left = '-9999px';
			tempDiv.style.top = '0';
			tempDiv.style.width = '1200px';
			tempDiv.style.padding = '20px';
			tempDiv.style.background = 'white';

			const template = `
        <div class="print-section" style="max-width: 1200px; width: 100%; overflow: hidden; font-size: 12px; line-height: 16px; margin: 20px 0">
          <div style="width: 100%; text-align: left; border: 1px solid #000; padding: 4px 6px 12px 6px; font-size: 14px;">{{ type === 'sep' ? '期末标志性事件评估详情' : '期末测评报告' }}</div>
          <div class="key-value-row" style="display: flex; flex-wrap: wrap; width: 100%">
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000; border-bottom: 1px solid #000; border-left: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">跟岗人员</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">{{ item.plan_user_name }}</span>
            </div>
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000; border-bottom: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">跟岗岗位</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">{{ item.post_label || '--' }}</span>
            </div>
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000; border-bottom: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">评估阶段</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">
                <div style="display: flex; align-items: center; gap: 20px; box-sizing: border-box;">
                  <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; box-sizing: border-box;">
                    <input type="checkbox" style="width: 16px; cursor: pointer; box-sizing: border-box;" />
                    期中评估
                  </label>
                  <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; box-sizing: border-box;">
                    <input type="checkbox" checked style="width: 16px; cursor: pointer; box-sizing: border-box;" />
                    期末评估
                  </label>
                </div>
              </span>
            </div>
          </div>
          <div class="key-value-row" style="display: flex; flex-wrap: wrap; width: 100%; border-bottom: 1px solid #000">
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000; border-left: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">跟岗期限</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">{{ formatDate(item.duration_start) }} ~ {{ formatDate(item.duration_end) }}</span>
            </div>
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">导师</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">{{ item.mentor_name }}</span>
            </div>
            <div class="key-value-pair" style="display: flex; align-items: center; box-sizing: border-box; width: 33.33%; flex: 0 0 33.33%; border-right: 1px solid #000">
              <span class="key" style="width: 100px; min-width: 100px; border-right: 1px solid #000; display: flex; justify-content: center; align-items: center; padding: 6px; flex-shrink: 0; height: 100%">教练</span>
              <span class="value" style="width: calc(100% - 100px); display: flex; align-items: center; padding: 6px; flex: 1; height: 100%">{{ item.coach_name }}</span>
            </div>
          </div>
          <div style="width: 100%; text-align: left; border-left: 1px solid #000; border-right: 1px solid #000; padding: 4px 6px 12px 6px; font-size: 14px;">标志性事件评分详情</div>
          <!-- ====== 修改点：表格列宽自适应，确保不超出容器 ====== -->
          <table style="border-collapse: collapse; width: 100%; table-layout: fixed; border-left: 1px solid #000; border-right: 1px solid #000; border-bottom: 1px solid #000">
            <thead>
              <tr>
                <th style="width: 120px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; text-align: center; font-weight: normal">评分角色</th>
                <th style="width: 100px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; text-align: center; font-weight: normal">评分人</th>
                <th style="width: 80px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; text-align: center; font-weight: normal">权重</th>
                <!-- 动态事件列：不再设置固定宽度，由浏览器平均分配剩余空间 -->
                <th v-for="(col, idx) in eventColumns" :key="col.key" :style="{ border: '1px solid #000', borderLeft: 'none', borderBottom: 'none', padding: '10px', textAlign: 'center', fontWeight: 'normal' }">{{ col.title }}</th>
                <th style="width: 100px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; text-align: center; font-weight: normal">加权分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in renderedDetails" :key="index">
                <td style="width: 120px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; vertical-align: top; word-break: break-all">{{ getRoleName(row.roleCode) }}</td>
                <td style="width: 100px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; vertical-align: top; word-break: break-all">{{ row.reviewer_name }}</td>
                <td v-if="row.showWeight" :rowspan="row.weightRowspan" style="width: 80px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; vertical-align: middle; word-break: break-all;">{{ row.weightValue }}</td>
                <td v-for="(col, idx) in eventColumns" :key="col.key" style="border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; vertical-align: top; word-break: break-all">{{ getEventScore(row, idx) }}</td>
                <td style="width: 100px; border: 1px solid #000; border-left: none; border-bottom: none; padding: 10px; vertical-align: top; word-break: break-all">{{ row.weighted_score }}</td>
              </tr>
            </tbody>
          </table>
          <!-- 得分行：标签宽度与前三个固定列总宽保持一致，无需调整 -->
          <div style="width:100%; border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #000; padding:0;">
            <div style="display:flex; align-items:center;">
              <span style="width:300px; min-width:300px; border-right:1px solid #000; padding:6px; display:flex; align-items:center; justify-content:flex-start; box-sizing:border-box;">标志性事件得分</span>
              <span style="flex:1; padding:6px; display:flex; align-items:center; justify-content:flex-start;">{{ item.sep_score !== '' && item.sep_score != null ? Number(item.sep_score).toFixed(2) : '未评价' }}</span>
            </div>
          </div>
          <div v-if="type === 'all'" style="width:100%; border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #000; padding:0;">
            <div style="display:flex; align-items:center;">
              <span style="width:300px; min-width:300px; border-right:1px solid #000; padding:6px; display:flex; align-items:center; justify-content:flex-start; box-sizing:border-box;">IDP得分</span>
              <span style="flex:1; padding:6px; display:flex; align-items:center; justify-content:flex-start;">{{ item.idp_score !== '' && item.idp_score != null ? Number(item.idp_score).toFixed(2) : '未评价' }}</span>
            </div>
          </div>
          <div v-if="type === 'all'" style="width:100%; border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #000; padding:0;">
            <div style="display:flex; align-items:center;">
              <span style="width:300px; min-width:300px; border-right:1px solid #000; padding:6px; display:flex; align-items:center; justify-content:flex-start; box-sizing:border-box;">总分（标志性事件得分×70% + IDP得分×30%）</span>
              <span style="flex:1; padding:6px; display:flex; align-items:center; justify-content:flex-start;">{{ item.final_score !== '' && item.final_score != null ? Number(item.final_score).toFixed(2) : '未计算' }}</span>
            </div>
          </div>
        </div>
      `;

			try {
				const compiled = Vue.compile(template);
				const component = {
					props: ['type', 'item', 'eventColumns', 'renderedDetails', 'getRoleName', 'getEventScore', 'formatDate'],
					render: compiled
				};

				const details = item.details || [];
				const sepEvents = item.sepEvents || [];
				const eventIds = details.length > 0 ? details[0].sep_detail_ids.split('#@#') : [];
				const eventColumns = eventIds.map((id, index) => ({
					key: `event_${index}`,
					title: `标志性事件${index + 1}(${sepEvents[index]?.event_name || ''})`
				}));

				// ====== 新增：处理同一人不同角色的评分共享 ======
				// 1. 收集每个人（reviewer_user_id）的实际评分
				const personScoreMap = {};
				details.forEach(d => {
					const uid = (d.reviewer_user_id || '').toString().trim();
					if (!uid || personScoreMap[uid]) return;
					const scores = (d.sep_scores || '').split('#@#').filter(s => s !== '');
					if (scores.length > 0) {
						personScoreMap[uid] = scores;
					}
				});

				// 2. 对每一行，如果没有评分则使用共享评分，并重新计算加权分
				details.forEach(d => {
					const uid = (d.reviewer_user_id || '').toString().trim();
					let scores = (d.sep_scores || '').split('#@#').filter(s => s !== '');
					if (scores.length === 0 && personScoreMap[uid]) {
						scores = personScoreMap[uid];
						d.sep_scores = scores.join('#@#'); // 覆盖原字段，供 getEventScore 使用
					} else if (scores.length > 0 && !personScoreMap[uid]) {
						personScoreMap[uid] = scores;
					}

					// 重新计算加权分
					const weight = parseFloat(d.weight) || 0;
					const validScores = scores.filter(s => !isNaN(Number(s)));
					let avg = 0;
					if (validScores.length > 0) {
						avg = validScores.reduce((sum, v) => sum + Number(v), 0) / validScores.length;
					}
					d.weighted_score = validScores.length > 0 ? (avg * weight).toFixed(2) : '';
				});

				// ====== 以下原逻辑保持不变 ======
				const leaderGroup = [];
				const memberGroup = [];
				const expertGroup = [];
				details.forEach(d => {
					if (d.sep_evaluation_role_code === 'group_leader' || d.sep_evaluation_role_code === 'executive_deputy_leader') {
						leaderGroup.push(d);
					} else if (d.sep_evaluation_role_code === 'group_member') {
						memberGroup.push(d);
					} else if (d.sep_evaluation_role_code === 'external_expert') {
						expertGroup.push(d);
					}
				});
				const renderedDetails = [];
				const addGroup = (group, weightValue) => {
					group.forEach((detail, index) => {
						renderedDetails.push({
							...detail,
							roleCode: detail.sep_evaluation_role_code,
							weightValue: weightValue * 100 + '%',
							showWeight: index === 0,
							weightRowspan: index === 0 ? group.length : 0
						});
					});
				};
				addGroup(leaderGroup, 0.6);
				addGroup(memberGroup, 0.3);
				addGroup(expertGroup, 0.1);

				const app = Vue.createApp(component, {
					type,
					item,
					eventColumns,
					renderedDetails,
					getRoleName: this.getRoleName.bind(this),
					getEventScore: this.getEventScore.bind(this),
					formatDate: this.formatDate.bind(this)
				});

				const container = document.createElement('div');
				app.mount(container);
				tempDiv.appendChild(container);
			} catch (error) {
				console.error('模板编译错误:', error);
			}
			return tempDiv;
		},
		formatDate(timestamp) {
			if (!timestamp) return '';
			const date = new Date(Number(timestamp));
			if (isNaN(date.getTime())) return '';
			const y = date.getFullYear();
			const m = String(date.getMonth() + 1).padStart(2, '0');
			const d = String(date.getDate()).padStart(2, '0');
			return `${y}-${m}-${d}`;
		},

		getRoleName(code) {
			const map = {
				group_leader: '领导小组组长',
				group_member: '领导小组成员',
				executive_deputy_leader: '常务副组长',
				external_expert: '外部专家'
			};
			return map[code] || code;
		},

		getEventScore(detail, idx) {
			const scores = detail.sep_scores?.split('#@#') || [];
			const val = scores[idx];
			return val !== undefined && val !== '' && val !== null ? Number(val).toFixed(2) : '';
		},

		waitForImages(element) {
			return new Promise(resolve => {
				const images = element.getElementsByTagName('img');
				if (images.length === 0) {
					resolve();
					return;
				}
				let loaded = 0;
				const check = () => {
					loaded++;
					if (loaded === images.length) resolve();
				};
				Array.from(images).forEach(img => {
					if (img.complete) check();
					else {
						img.addEventListener('load', check);
						img.addEventListener('error', check);
					}
				});
			});
		},

		processPageBreakElements(container, breakY, elementConfigs) {
			elementConfigs.forEach(config => {
				const elements = container.querySelectorAll(config.selector);
				elements.forEach(element => {
					const rect = element.getBoundingClientRect();
					const containerRect = container.getBoundingClientRect();
					const relativeTop = rect.top - containerRect.top;
					const distance = Math.abs(relativeTop - breakY);
					if (distance < config.threshold) {
						const paddingTop = Math.ceil(breakY - relativeTop);
						config.handler(element, paddingTop);
					}
				});
			});
		},

		async generatePDF(element) {
			return new Promise(async (resolve, reject) => {
				try {
					await this.waitForImages(element);
					const elementWidth = element.getBoundingClientRect().width;
					const elementHeight = element.getBoundingClientRect().height;

					const pdfWidth = 297;
					const pdfHeight = 210;
					const scale = (pdfWidth / elementWidth) * 1;
					const totalPages = Math.ceil((elementHeight * scale) / pdfHeight);

					if (totalPages > 1) {
						const elementHeightPerPage = pdfHeight / scale;
						for (let page = 1; page < totalPages; page++) {
							const breakY = page * elementHeightPerPage;
							const elementConfigs = [
								{
									selector: '.table-row',
									threshold: 75,
									handler: (el, paddingTop) => {
										const cells = el.querySelectorAll('.table-cell');
										cells.forEach(cell => {
											cell.style.paddingTop = `${paddingTop}px`;
										});
									}
								},
								{
									selector: '.key-value-row',
									threshold: 20,
									handler: (el, paddingTop) => {
										const keys = el.querySelectorAll('.key');
										const values = el.querySelectorAll('.value');
										keys.forEach(k => {
											k.style.paddingTop = `${paddingTop}px`;
										});
										values.forEach(v => {
											v.style.paddingTop = `${paddingTop}px`;
										});
									}
								}
							];
							this.processPageBreakElements(element, breakY, elementConfigs);
						}
					}

					const canvas = await html2canvas(element, {
						scale: 3,
						useCORS: true,
						logging: false,
						backgroundColor: '#ffffff',
						width: elementWidth,
						height: elementHeight
					});

					const pdf = new jspdf.jsPDF({
						orientation: 'landscape',
						unit: 'mm',
						format: 'a4'
					});

					const scaledElementHeight = elementHeight * scale;
					const pages = Math.ceil(scaledElementHeight / pdfHeight);

					for (let page = 0; page < pages; page++) {
						if (page > 0) pdf.addPage();
						const sourceY = ((page * pdfHeight) / scale) * (canvas.height / elementHeight);
						const sourceHeight = Math.min((pdfHeight / scale) * (canvas.height / elementHeight), canvas.height - sourceY);
						const tempCanvas = document.createElement('canvas');
						tempCanvas.width = canvas.width;
						tempCanvas.height = Math.ceil(sourceHeight);
						const ctx = tempCanvas.getContext('2d');
						ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
						const pageImgData = tempCanvas.toDataURL('image/jpeg', 1.0);
						const displayHeight = Math.min(pdfHeight, scaledElementHeight - page * pdfHeight);
						pdf.addImage(pageImgData, 'JPEG', (pdfWidth - pdfWidth * 1) / 2, 0, pdfWidth * 1, displayHeight);
					}

					resolve(pdf.output('blob'));
				} catch (e) {
					reject(e);
				}
			});
		}
	}
};
