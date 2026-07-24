<template>
	<div>
		<!-- 顶部操作行 -->
		<div v-if="showOperationRow" style="display: flex; align-items: center; padding: 8px; gap: 16px; font-size: 14px; color: var(--bl-n900-c); border: 1px solid var(--bl-n250-c); border-bottom: none; background: #f7f8fa">
			<div @click="addRow" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconadd_row" style="margin-right: 4px"></span>添加明细</div>
			<a-popconfirm v-model:open="copyPopVisible">
				<template #title>
					<div style="display: flex; align-items: center; justify-content: space-between">
						<div style="display: flex; align-items: center; gap: 8px">
							<span>复制</span>
							<a-input-number v-model:value="copyTimes" :min="1" :max="100" size="small" style="width: 80px" />
							<span>次</span>
						</div>
						<a-button style="margin-left: 8px" type="primary" @click="doCopyRows">确认</a-button>
					</div>
				</template>
				<template #icon> </template>
				<template #okButton> </template>
				<template #cancelButton> </template>
				<div @click.prevent="handleCopyClick" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconcopy_row" style="margin-right: 4px"></span>复制行</div>
			</a-popconfirm>
			<div @click="insertRow" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconinsert_row" style="margin-right: 4px"></span>插行</div>
			<div @click="deleteRow" style="display: flex; align-items: center; cursor: pointer"><span class="low-code icondel_row" style="margin-right: 4px"></span>删行</div>
			<div @click="clearData" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconclear" style="margin-right: 4px"></span>清除数据</div>
			<div @click="toggleSelection" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconInvert" style="margin-right: 4px"></span>反选</div>
			<div @click="cancelSelection" style="display: flex; align-items: center; cursor: pointer"><span class="low-code iconcancel_sel" style="margin-right: 4px"></span>取消选择</div>
		</div>

		<!-- 表格 -->
		<table style="border-collapse: collapse; width: 100%; table-layout: fixed; border: 1px solid var(--bl-n250-c); color: var(--bl-n900-c, #1f2329); font-size: 14px">
			<thead>
				<tr>
					<!-- 行选择框列 -->
					<th
						v-if="showSelection"
						:style="{
							width: selectionWidth,
							border: '1px solid var(--bl-n250-c)',
							padding: '10px',
							textAlign: 'center',
							backgroundColor: '#f7f8fa',
							fontSize: '15px',
							fontWeight: 'normal',
							color: 'var(--bl-n900-c, #1f2329)'
						}"
					>
						<a-checkbox class="subtablenew-checkbox" :checked="isAllSelected" @change="toggleAllSelection" />
					</th>

					<!-- 序号列表头 -->
					<th
						v-if="showIndex"
						:style="{
							width: indexWidth,
							border: '1px solid var(--bl-n250-c)',
							padding: '10px',
							textAlign: 'left',
							backgroundColor: '#f7f8fa',
							fontSize: '15px',
							fontWeight: 'normal',
							color: 'var(--bl-n900-c, #1f2329)'
						}"
					>
						{{ indexTitle }}
					</th>

					<!-- 其他列表头 -->
					<template v-for="column in columns" :key="column.key">
						<th
							v-if="column.visible !== false"
							:style="{
								width: column.width,
								border: '1px solid var(--bl-n250-c)',
								padding: '10px',
								textAlign: 'left',
								backgroundColor: '#f7f8fa',
								fontSize: '15px',
								fontWeight: 'normal',
								color: 'var(--bl-n900-c, #1f2329)'
							}"
						>
							<span v-if="column.required" style="color: #ff6459; margin-left: 2px">*</span>
							{{ column.title }}
						</th>
					</template>
				</tr>
			</thead>

			<tbody>
				<!-- 有数据时渲染行 -->
				<template v-if="pagedData.length > 0">
					<tr v-for="(row, idx) in pagedData" :key="row[rowKey] || idx" :style="{ backgroundColor: isSelected(row) ? '#f0f5ff' : '' }">
						<!-- 选择框 -->
						<td
							v-if="showSelection"
							:style="{
								width: selectionWidth,
								border: '1px solid var(--bl-n250-c)',
								padding: '10px',
								verticalAlign: 'top',
								textAlign: 'center',
								color: 'var(--bl-n900-c, #1f2329)'
							}"
						>
							<a-checkbox class="subtablenew-checkbox" :checked="isSelected(row)" @change="() => toggleRowSelection(row, getOriginalIndex(row))" />
						</td>

						<!-- 序号 -->
						<td
							v-if="showIndex"
							:style="{
								width: indexWidth,
								border: '1px solid var(--bl-n250-c)',
								padding: '10px',
								verticalAlign: 'top',
								wordBreak: 'break-all',
								color: 'var(--bl-n900-c, #1f2329)'
							}"
						>
							{{ (currentPage - 1) * pageSize + idx + 1 }}
						</td>

						<!-- 数据列 -->
						<template v-for="column in columns" :key="column.key">
							<td
								v-if="column.visible !== false"
								:style="{
									width: column.width,
									border: '1px solid var(--bl-n250-c)',
									padding: '10px',
									verticalAlign: 'top',
									wordBreak: 'break-all',
									color: 'var(--bl-n900-c, #1f2329)'
								}"
							>
								<template v-if="$slots[getColumnSlotName(column)]">
									<slot :name="getColumnSlotName(column)" :row="row" :index="getOriginalIndex(row)"></slot>
								</template>
								<template v-else>{{ row[column.key] }}</template>
							</td>
						</template>
					</tr>
				</template>

				<!-- 无数据提示 -->
				<tr v-else>
					<td :colspan="visibleColumnsCount" style="text-align: center; padding: 30px 10px; font-size: 16px; color: var(--bl-n600-c); border: 1px solid var(--bl-n250-c)">暂无数据</td>
				</tr>
			</tbody>
		</table>

		<!-- 分页组件 -->
		<div v-if="showPagination" style="display: flex; justify-content: flex-end; margin-top: 12px">
			<a-pagination v-model:current="currentPage" v-model:pageSize="pageSize" :total="props.datas.length" :show-total="total => `共 ${total} 条数据`" :showSizeChanger="true" :pageSizeOptions="['10', '20', '50', '100']" size="small" @showSizeChange="handlePageSizeChange" @change="handlePageChange" />
		</div>
	</div>
</template>

<script setup>
const utils = exports.utils;
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

// 定义 props
const props = defineProps({
	columns: {
		type: Array,
		required: true
	},
	datas: {
		type: Array,
		default: () => []
	},
	showIndex: {
		type: Boolean,
		default: true
	},
	indexTitle: {
		type: String,
		default: '序号'
	},
	indexWidth: {
		type: String,
		default: '60px'
	},
	showSelection: {
		type: Boolean,
		default: true
	},
	selectionWidth: {
		type: String,
		default: '40px'
	},
	rowKey: {
		type: String,
		default: 'uid'
	},
	showOperationRow: {
		type: Boolean,
		default: true
	},
	showPagination: {
		type: Boolean,
		default: true
	},
	defaultPageSize: {
		type: Number,
		default: 10
	}
});

// 定义 emit 事件（重新添加 copy-row）
const emit = defineEmits(['select-row', 'add-row', 'delete-row', 'copy-row']);

// 选中状态数据
const selectedRowKeys = ref([]);
const selectedRows = ref([]);
const lastSelectedIndex = ref(-1);

// 分页相关状态
const currentPage = ref(1);
const pageSize = ref(props.defaultPageSize || 10);

// 新增 / 插行后的跳页标记
const pageJumpTarget = ref(null); // 'last' 或 数字索引

// 分页数据计算
const pagedData = computed(() => {
	if (!props.showPagination) return props.datas;
	const start = (currentPage.value - 1) * pageSize.value;
	return props.datas.slice(start, start + pageSize.value);
});

// 获取某行在原始数据中的索引
const getOriginalIndex = row => {
	return props.datas.findIndex(item => item[props.rowKey] === row[props.rowKey]);
};

// 监听数据变化，清理选中 + 处理跳页
watch(
	() => props.datas,
	newDatas => {
		const validKeys = new Set(newDatas.map(row => row[props.rowKey]));
		selectedRowKeys.value = selectedRowKeys.value.filter(key => validKeys.has(key));
		selectedRows.value = selectedRows.value.filter(row => validKeys.has(row[props.rowKey]));
		if (lastSelectedIndex.value >= newDatas.length) {
			lastSelectedIndex.value = -1;
		}

		// 处理添加/插行后的跳页
		if (pageJumpTarget.value) {
			const target = pageJumpTarget.value;
			if (target === 'last') {
				currentPage.value = Math.ceil(props.datas.length / pageSize.value) || 1;
			} else if (typeof target === 'number') {
				currentPage.value = Math.ceil((target + 1) / pageSize.value) || 1;
			}
			pageJumpTarget.value = null;
		}
	},
	{ deep: true }
);

// 当原始数据变化时，若当前页无数据，回退到最后一页（跳页已处理，本 watch 仅作兜底）
watch(
	() => props.datas.length,
	newLen => {
		const totalPages = Math.ceil(newLen / pageSize.value) || 1;
		if (currentPage.value > totalPages) {
			currentPage.value = totalPages;
		}
	}
);

// 计算可见列总数（用于 colspan）
const visibleColumnsCount = computed(() => {
	return (props.showSelection ? 1 : 0) + (props.showIndex ? 1 : 0) + props.columns.filter(col => col.visible !== false).length;
});

// 是否全选（仅当前页）
const isAllSelected = computed(() => {
	if (pagedData.value.length === 0) return false;
	return pagedData.value.every(row => selectedRowKeys.value.includes(row[props.rowKey]));
});

// 获取插槽名称
const getColumnSlotName = column => {
	return column.slotName || `column-${column.key}`;
};

// 判断某行是否被选中
const isSelected = row => {
	return selectedRowKeys.value.includes(row[props.rowKey]);
};

// 切换单行选择（index 为原始索引）
const toggleRowSelection = (row, index) => {
	const key = row[props.rowKey];
	const indexInKeys = selectedRowKeys.value.indexOf(key);

	if (indexInKeys > -1) {
		selectedRowKeys.value.splice(indexInKeys, 1);
		selectedRows.value = selectedRows.value.filter(r => r[props.rowKey] !== key);
		if (lastSelectedIndex.value === index) {
			lastSelectedIndex.value = -1;
		}
	} else {
		selectedRowKeys.value.push(key);
		selectedRows.value.push({
			...row,
			index
		});
		lastSelectedIndex.value = index;
	}

	emit('select-row', selectedRows.value);
};

// 全选/取消全选（仅当前页）
const toggleAllSelection = () => {
	const currentPageKeys = pagedData.value.map(row => row[props.rowKey]);
	const allCurrentSelected = currentPageKeys.every(key => selectedRowKeys.value.includes(key));

	if (allCurrentSelected) {
		selectedRowKeys.value = selectedRowKeys.value.filter(key => !currentPageKeys.includes(key));
	} else {
		const newKeys = new Set([...selectedRowKeys.value, ...currentPageKeys]);
		selectedRowKeys.value = Array.from(newKeys);
	}

	// 同步 selectedRows
	selectedRows.value = [];
	props.datas.forEach((row, idx) => {
		if (selectedRowKeys.value.includes(row[props.rowKey])) {
			selectedRows.value.push({ ...row, index: idx });
		}
	});

	emit('select-row', selectedRows.value);
};

// 添加行（添加到末尾）
const addRow = () => {
	pageJumpTarget.value = 'last';
	emit('add-row', -1);
};

// ===== 复制行相关状态 =====
const copyPopVisible = ref(false); // popconfirm 显示控制
const copyTimes = ref(1); // 复制次数

// 点击复制行按钮，先校验选中状态
const handleCopyClick = () => {
	// if (selectedRows.value.length === 0) {
	// 	utils.toast('请选择数据后，再进行复制行动作！', 'warning', 'message');
	// 	return;
	// }
	copyPopVisible.value = true;
};

// 确认复制：不再直接操作 datas，而是将复制需求 emit 给父组件
const doCopyRows = () => {
	if (selectedRows.value.length === 0) {
		utils.toast('请选择数据后，再进行复制行动作！', 'warning', 'message');
		return;
	}
	const times = copyTimes.value;
	// 按原始索引降序排序，方便父组件从后往前插入，避免索引偏移
	const sortedRows = [...selectedRows.value].sort((a, b) => b.index - a.index);

	emit('copy-row', { rows: sortedRows, times });

	// 重置状态
	copyPopVisible.value = false;
	copyTimes.value = 1;
};

// 插行
const insertRow = () => {
	if (lastSelectedIndex.value >= 0) {
		pageJumpTarget.value = lastSelectedIndex.value;
		emit('add-row', lastSelectedIndex.value);
	} else {
		utils.toast('请选择数据后，再进行插行动作！', 'warning', 'message');
	}
};

// 删除行
const deleteRow = () => {
	if (selectedRows.value.length > 0) {
		emit('delete-row', selectedRows.value);
	} else {
		utils.toast('请选择数据后，再进行删行动作！', 'warning', 'message');
	}
};

// 清除选中行数据（保留行，仅清空列对应的字段）
const clearData = () => {
	if (selectedRows.value.length === 0) {
		utils.toast('请选择数据后，再进行清除动作！', 'warning', 'message');
		return;
	}
	const columnKeys = props.columns.filter(col => col.visible !== false).map(col => col.key);
	selectedRowKeys.value.forEach(key => {
		const row = props.datas.find(r => r[props.rowKey] === key);
		if (row) {
			columnKeys.forEach(ck => {
				row[ck] = '';
			});
		}
	});
};

// 反选（基于全部数据）
const toggleSelection = () => {
	const newSelectedKeys = [];
	const newSelectedRows = [];
	props.datas.forEach((row, index) => {
		if (!selectedRowKeys.value.includes(row[props.rowKey])) {
			newSelectedKeys.push(row[props.rowKey]);
			newSelectedRows.push({ ...row, index });
		}
	});
	selectedRowKeys.value = newSelectedKeys;
	selectedRows.value = newSelectedRows;
	lastSelectedIndex.value = newSelectedRows.length > 0 ? newSelectedRows[newSelectedRows.length - 1].index : -1;
	emit('select-row', selectedRows.value);
};

// 取消选择
const cancelSelection = () => {
	selectedRowKeys.value = [];
	selectedRows.value = [];
	lastSelectedIndex.value = -1;
	emit('select-row', selectedRows.value);
};

// 分页回调（可选，用于处理逻辑）
const handlePageChange = () => {};
const handlePageSizeChange = () => {};
</script>

<style scoped>
/* 增大分页元素间距 */
:deep(.blr-pagination-prev),
:deep(.blr-pagination-item) {
	margin-right: 8px !important;
}
:deep(.blr-pagination-next) {
	margin-right: 6px !important;
}
</style>
