const TableComponent = Vue.defineComponent({
	name: 'table-component',
	props: {
		// 列配置数组
		columns: {
			type: Array,
			required: true
		},
		// 数据数组
		datas: {
			type: Array,
			default: () => []
		},
		// 是否显示序号列
		showIndex: {
			type: Boolean,
			default: true
		},
		// 序号列标题
		indexTitle: {
			type: String,
			default: '序号'
		},
		// 序号列宽度
		indexWidth: {
			type: String,
			default: '60px'
		},
		// 是否支持行选择
		showSelection: {
			type: Boolean,
			default: true
		},
		// 行选择框列宽度
		selectionWidth: {
			type: String,
			default: '40px'
		},
		// 行数据的唯一标识键名
		rowKey: {
			type: String,
			default: 'uid'
		},
		showOperationRow: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { emit }) {
		// 使用 Vue.ref 替代 data
		const selectedRowKeys = Vue.ref([]);
		const selectedRows = Vue.ref([]);
		const lastSelectedIndex = Vue.ref(-1);

		// 计算属性使用 Vue.computed
		const visibleColumnsCount = Vue.computed(() => {
			return props.columns.filter(column => column.visible !== false).length;
		});

		// 切换行选中状态
		const toggleRowSelection = (row, index) => {
			const rowKey = row[props.rowKey];
			const indexInKeys = selectedRowKeys.value.indexOf(rowKey);

			if (indexInKeys > -1) {
				// 取消选中
				selectedRowKeys.value.splice(indexInKeys, 1);
				selectedRows.value = selectedRows.value.filter(item => item[props.rowKey] !== rowKey);
				// 如果取消的是最后选中的行，更新最后选中行索引
				if (lastSelectedIndex.value === index) {
					lastSelectedIndex.value = -1;
				}
			} else {
				// 选中
				selectedRowKeys.value.push(rowKey);
				selectedRows.value.push(row);
				lastSelectedIndex.value = index;
			}
			// 触发回调，传递选中的行数据
			emit('select-row', selectedRows.value);
		};

		// 全选/取消全选
		const toggleAllSelection = () => {
			if (selectedRowKeys.value.length === props.datas.length) {
				// 取消全选
				selectedRowKeys.value = [];
				selectedRows.value = [];
				lastSelectedIndex.value = -1;
			} else {
				// 全选
				selectedRowKeys.value = props.datas.map(row => row[props.rowKey]);
				selectedRows.value = [...props.datas];
				lastSelectedIndex.value = props.datas.length - 1;
			}

			// 触发回调，传递选中的行数据
			emit('select-row', selectedRows.value);
		};

		// 判断行是否被选中
		const isRowSelected = row => {
			return selectedRowKeys.value.indexOf(row[props.rowKey]) > -1;
		};

		// 添加行（在表格最后添加）
		const addRow = () => {
			if (validateRequiredFields()) {
				emit('add-row', -1); // 传递-1表示添加到最后
			}
		};

		// 插行（在选中行上方添加）
		const insertRow = () => {
			if (validateRequiredFields()) {
				if (lastSelectedIndex.value >= 0) {
					emit('add-row', lastSelectedIndex.value); // 传递选中行的索引
				} else {
					alert('请选择数据后，再进行插行操作！');
				}
			}
		};

		// 删除行
		const deleteRow = () => {
			if (validateRequiredFields()) {
				if (selectedRows.value.length > 0) {
					emit('delete-row', selectedRows.value);
				} else {
					alert('请选择数据后，再进行删行操作！');
				}
			}
		};

		// 获取列的作用域插槽名称
		const getColumnSlotName = column => {
			return (column.slotName || `column-${column.key}`).toLowerCase();
		};

		// 验证必填项
		const validateRequiredFields = () => {
			const requiredColumns = props.columns.filter(col => col.required && col.visible !== false);

			for (let i = 0; i < props.datas.length; i++) {
				const row = props.datas[i];

				for (const column of requiredColumns) {
					const value = row[column.key];

					// 判断值是否为空（根据实际需求可以调整判断条件）
					if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
						const message = `第${i + 1}行的"${column.title}"列为必填项，请填写完整！`;
						alert(message);
						scrollToTable();
						return false;
					}
				}
			}

			return true;
		};

		// 滚动定位到表格
		const scrollToTable = () => {
			const tableElement = document.querySelector('table');
			if (tableElement) {
				tableElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});

				// 为了更好的视觉反馈，给表格添加一个高亮效果
				// tableElement.style.boxShadow = '0 0 0 2px #ff6459';
				// setTimeout(() => {
				// 	tableElement.style.boxShadow = '';
				// }, 2000);
			}
		};

		// 添加一个可以被外部调用的验证方法
		const validate = () => {
			return validateRequiredFields();
		};

		// 返回需要在模板中使用的属性和方法
		return {
			selectedRowKeys,
			selectedRows,
			lastSelectedIndex,
			visibleColumnsCount,
			toggleRowSelection,
			toggleAllSelection,
			isRowSelected,
			addRow,
			insertRow,
			deleteRow,
			getColumnSlotName,
			validateRequiredFields,
			scrollToTable,
			validate
		};
	},
	template: `
    <div>
      <!-- 顶部操作行 -->
      <div v-if="showOperationRow" style="display: flex; align-items: center; padding: 8px; gap: 10px; font-size: 14px; color: var(--bl-n900-c); border: 1px solid var(--bl-n250-c); border-bottom: none; background: #f7f8fa">
        <div @click="addRow" style="display: flex; align-items: center; cursor: pointer;">
          <span class="low-code iconadd_row" style="margin-right: 4px"></span>添加明细
        </div>
        <div @click="insertRow" style="display: flex; align-items: center; cursor: pointer;">
          <span class="low-code iconinsert_row"></span>插行
        </div>
        <div @click="deleteRow" style="display: flex; align-items: center; cursor: pointer;">
          <span class="low-code icondel_row"></span>删行
        </div>
      </div>
      <!-- 表格 -->
      <table style="border-collapse: collapse; width: 100%; table-layout: fixed; border: 1px solid var(--bl-n250-c); color: var(--bl-n900-c, #1f2329); font-size: 14px">
        <thead>
          <tr>
            <!-- 行选择框列 -->
            <th v-if="showSelection" :style="{ width: selectionWidth, border: '1px solid var(--bl-n250-c)', padding: '10px', textAlign: 'center', backgroundColor: '#f7f8fa', fontSize: '15px', fontWeight: 'normal', color: 'var(--bl-n900-c, #1f2329)' }">
              <input type="checkbox" @change="toggleAllSelection" :checked="selectedRowKeys.length === datas.length && datas.length > 0">
            </th>
            <!-- 序号列表头 -->
            <th v-if="showIndex" :style="{ width: indexWidth, border: '1px solid var(--bl-n250-c)', padding: '10px', textAlign: 'left', backgroundColor: '#f7f8fa', fontSize: '15px', fontWeight: 'normal', color: 'var(--bl-n900-c, #1f2329)' }">{{ indexTitle }}</th>
            <!-- 其他列表头 -->
            <template v-for="column in columns">
              <th v-if="column.visible !== false" :key="column.key" :style="{ width: column.width, border: '1px solid var(--bl-n250-c)', padding: '10px', textAlign: 'left', backgroundColor: '#f7f8fa', fontSize: '15px', fontWeight: 'normal', color: 'var(--bl-n900-c, #1f2329)' }">
                <span v-if="column.required" style="color: #ff6459; margin-left: 2px;">*</span>
                {{ column.title }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <!-- 有数据时显示表格行 -->
          <template v-if="datas && datas.length > 0">
            <tr v-for="(row, index) in datas" :key="row[rowKey] || index" :style="{ backgroundColor: isRowSelected(row) ? '#f0f5ff' : '' }">
              <!-- 行选择框 -->
              <td v-if="showSelection" :style="{ width: selectionWidth, border: '1px solid var(--bl-n250-c)', padding: '10px', verticalAlign: 'top', textAlign: 'center', color: 'var(--bl-n900-c, #1f2329)' }">
                <input type="checkbox" @change="toggleRowSelection(row, index)" :checked="isRowSelected(row)">
              </td>
              <!-- 序号列内容 -->
              <td v-if="showIndex" :style="{ width: indexWidth, border: '1px solid var(--bl-n250-c)', padding: '10px', verticalAlign: 'top', wordBreak: 'break-all', color: 'var(--bl-n900-c, #1f2329)' }">{{ index + 1 }}</td>
              <!-- 其他列内容 -->
              <template v-for="column in columns">
                <td v-if="column.visible !== false" :key="column.key" :style="{ width: column.width, border: '1px solid var(--bl-n250-c)', padding: '10px', verticalAlign: 'top', wordBreak: 'break-all', color: 'var(--bl-n900-c, #1f2329)' }">
                  <!-- 优先使用作用域插槽 -->
                  <template v-if="$slots[getColumnSlotName(column)]">
                    <slot :name="getColumnSlotName(column)" :row="row" :index="index"></slot>
                  </template>
                  <!-- 默认渲染 -->
                  <template v-else> {{ row[column.key] }} </template>
                </td>
              </template>
            </tr>
          </template>
          <!-- 无数据时显示提示信息 - 需要计算colspan -->
          <template v-else>
            <tr>
              <td 
                :colspan="(showSelection ? 1 : 0) + (showIndex ? 1 : 0) + visibleColumnsCount" 
                style="text-align: center; padding: 30px 10px; font-size: 16px; color: var(--bl-n600-c); border: 1px solid var(--bl-n250-c);"
              >
                暂无数据
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  `
});

// 注册全局组件
// 在 Vue 3 中，组件注册通常在创建应用实例后进行
