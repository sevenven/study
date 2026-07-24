const ctx = exports.ctx;
const env = exports.env;
const utils = exports.utils;
const pageStatus = utils.getPageStatus();
const http = utils.getHttp(utils.getBasePath());
const isMobile = utils.getDevice() === 'mobile';

export const Print = {
	template: `
    <div>
      <a-button type="primary" @click="initDownload">打印</a-button>
      <div v-if="isDownloading" class="loading-overlay">
        <div class="spinner"></div>
        <div class="status-text">{{ statusMessage }}</div>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }">{{ Math.round(progress) }}%</div>
        </div>
        <a-button danger ghost @click="cancelDownload" style="margin-top: 20px">取消下载</a-button>
      </div>
    </div>
  `,
	props: ['instance', 'name', 'value', 'rowIndex', 'pageStatus', 'permissions'],
	emits: ['change'],
	data() {
		return {
			isDownloading: false,
			cancelRequested: false,
			progress: 0,
			statusMessage: '',
			getSelectedRowData: []
		};
	},
	mounted() {
		// 监听选中行事件
		ctx.on('checked', payload => {
			this.getSelectedRowData = payload.value;
		});
	},
	methods: {
		// 主流程入口
		async initDownload() {
			const userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.includes('dingtalk')) {
				utils.toast('请复制链接在浏览器中下载: ' + window.location.href, 'info', 'modal');
				return;
			}
			if (this.getSelectedRowData.length === 0) {
				utils.toast('至少选择一行数据', 'warning', 'message');
				return;
			}
			if (this.hasNotCompletedEvaluation(this.getSelectedRowData)) {
				utils.toast('仅已完成测评的数据支持打印', 'warning', 'message');
				return;
			}

			this.isDownloading = true;
			this.cancelRequested = false;
			this.progress = 0;
			this.statusMessage = '正在获取数据...';

			try {
				const printData = await this.fetchPrintData();
				if (this.cancelRequested) return;
				await this.downloadAllPDFs(printData);
			} catch (error) {
				console.error('打印失败:', error);
				this.statusMessage = '打印失败: ' + error.message;
			} finally {
				setTimeout(() => {
					this.isDownloading = false;
				}, 1500);
			}
		},
		// 检查是否包含未完成的测评
		hasNotCompletedEvaluation(list) {
			return Array.isArray(list) && list.some(item => item.data_value_map?.final_score === '' || item.data_value_map?.final_score == null);
		},
		// 获取打印数据
		async fetchPrintData() {
			const { data } = await utils.querySvc({
				app_id: 'app_yqtmuhmhwy',
				save_datas: {
					uids: this.getSelectedRowData.map(item => item.uid).join(',')
				},
				svc_code: 't_final_evaluation_print_7ieudx6v'
			});
			return Array.isArray(data) ? data : data?.data || [];
		},

		// 批量生成PDF并打包下载
		async downloadAllPDFs(items) {
			const zip = new JSZip();
			const total = items.length;
			const now = Date.now(); // 统一时间戳

			for (let i = 0; i < total; i++) {
				if (this.cancelRequested) break;
				this.progress = (i / total) * 100;
				this.statusMessage = `正在生成第 ${i + 1}/${total} 个PDF`;

				const item = items[i];
				const tempElement = this.createTempElement(item);
				document.body.appendChild(tempElement);

				try {
					const blob = await this.generatePDF(tempElement);
					// PDF 文件名：{年度}期末{跟岗人员姓名}标志性事件评估结果{时间戳}
					const year = item.plan_year ? new Date(item.plan_year).getFullYear() : '';
					const person = item.plan_user_name || '跟岗人员';
					const fileName = `${year}期末${person}评估结果_${now}.pdf`;
					zip.file(fileName, blob);
				} catch (e) {
					console.error(`第 ${i + 1} 个PDF生成失败`, e);
				} finally {
					document.body.removeChild(tempElement);
				}
			}

			if (this.cancelRequested) return;

			this.statusMessage = '正在打包ZIP...';
			const zipBlob = await zip.generateAsync({ type: 'blob' });
			// 压缩包名称：{年度}期末标志性事件评估结果{时间戳}

			saveAs(zipBlob, `期末评估结果_${now}.zip`);
			this.progress = 100;
			this.statusMessage = '下载完成';
		},

		// 构建临时HTML元素（使用Vue渲染）
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
          <div style="width: 100%; text-align: left; border: 1px solid #000; padding: 4px 6px 12px 6px; font-size: 14px;">期末测评报告</div>
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
                    <input type="checkbox" style="width: 16px; height: 16px; cursor: pointer; box-sizing: border-box;" />
                    期中评估
                  </label>
                  <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; box-sizing: border-box;">
                    <input type="checkbox" checked style="width: 16px; height: 16px; cursor: pointer; box-sizing: border-box;" />
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
          <!-- ====== 改动点：表格列宽自适应，确保不超出容器 ====== -->
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
          <div style="width:100%; border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #000; padding:0;">
            <div style="display:flex; align-items:center;">
              <span style="width:300px; min-width:300px; border-right:1px solid #000; padding:6px; display:flex; align-items:center; justify-content:flex-start; box-sizing:border-box;">IDP得分</span>
              <span style="flex:1; padding:6px; display:flex; align-items:center; justify-content:flex-start;">{{ item.idp_score !== '' && item.idp_score != null ? Number(item.idp_score).toFixed(2) : '未评价' }}</span>
            </div>
          </div>
          <div style="width:100%; border-left:1px solid #000; border-right:1px solid #000; border-bottom:1px solid #000; padding:0;">
            <div style="display:flex; align-items:center;">
              <span style="width:300px; min-width:300px; border-right:1px solid #000; padding:6px; display:flex; align-items:center; justify-content:flex-start; box-sizing:border-box;">总分(标志性事件得分*70%+IDP得分*30%)</span>
              <span style="flex:1; padding:6px; display:flex; align-items:center; justify-content:flex-start;">{{ item.final_score !== '' && item.final_score != null ? Number(item.final_score).toFixed(2) : '未计算' }}</span>
            </div>
          </div>
        </div>
      `;

			try {
				const compiled = Vue.compile(template);
				const component = {
					props: ['item', 'eventColumns', 'renderedDetails', 'getRoleName', 'getEventScore', 'formatDate'],
					render: compiled
				};

				const details = item.details || [];
				const sepEvents = item.sepEvents || [];
				const eventIds = details.length > 0 ? details[0].sep_detail_ids.split('#@#') : [];
				const eventColumns = eventIds.map((id, index) => ({
					key: `event_${index}`,
					title: `标志性事件${index + 1}(${sepEvents[index]?.event_name || ''})`
				}));

				const personScoreMap = {};
				details.forEach(d => {
					const uid = (d.reviewer_user_id || '').toString().trim();
					if (!uid || personScoreMap[uid]) return; // 已记录过评分则跳过
					const scores = (d.sep_scores || '').split('#@#').filter(s => s !== '');
					if (scores.length > 0) {
						personScoreMap[uid] = scores;
					}
				});

				// 2. 遍历所有行，补充缺失评分并重新计算加权分
				details.forEach(d => {
					const uid = (d.reviewer_user_id || '').toString().trim();
					let scores = (d.sep_scores || '').split('#@#').filter(s => s !== '');
					// 如果本行没有评分且存在该用户的评分，则共享评分
					if (scores.length === 0 && personScoreMap[uid]) {
						scores = personScoreMap[uid];
						d.sep_scores = scores.join('#@#'); // 覆盖，供 getEventScore 使用
					} else if (scores.length > 0 && !personScoreMap[uid]) {
						personScoreMap[uid] = scores;
					}

					// 根据当前行的权重重新计算加权分
					const weight = parseFloat(d.weight) || 0;
					const validScores = scores.filter(s => !isNaN(Number(s)));
					let avg = 0;
					if (validScores.length > 0) {
						avg = validScores.reduce((sum, v) => sum + Number(v), 0) / validScores.length;
					}
					d.weighted_score = validScores.length > 0 ? (avg * weight).toFixed(2) : '';
				});

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
		// 辅助方法：格式化日期
		formatDate(timestamp) {
			if (!timestamp) return '';
			const date = new Date(Number(timestamp));
			if (isNaN(date.getTime())) return '';
			const y = date.getFullYear();
			const m = String(date.getMonth() + 1).padStart(2, '0');
			const d = String(date.getDate()).padStart(2, '0');
			return `${y}-${m}-${d}`;
		},

		// 获取角色中文名
		getRoleName(code) {
			const map = {
				group_leader: '领导小组组长',
				group_member: '领导小组成员',
				executive_deputy_leader: '常务副组长',
				external_expert: '外部专家'
			};
			return map[code] || code;
		},
		// 获取某行某个事件的评分
		getEventScore(detail, idx) {
			const scores = detail.sep_scores?.split('#@#') || [];
			const val = scores[idx];
			return val !== undefined && val !== '' && val !== null ? Number(val).toFixed(2) : '';
		},
		// 等待所有图片加载
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

		// 处理分页线附近元素
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

		// 生成PDF
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
		},

		// 取消下载
		cancelDownload() {
			this.cancelRequested = true;
			let countdown = 3;
			this.statusMessage = `取消下载：${countdown}s`;
			const timer = setInterval(() => {
				countdown--;
				if (countdown > 0) this.statusMessage = `取消下载：${countdown}s`;
				else {
					clearInterval(timer);
					this.isDownloading = false;
				}
			}, 1000);
		}
	}
};
