import groovy.json.JsonOutput

// ==================== 输入参数 ====================
def uidsStr = ${__input__.uids}  // 逗号分隔的三重一大事项ID列表
logger.info("输入 uids: " + uidsStr)

if (!uidsStr) {
	logger.error("uids 为空，无法查询")
	return []
}

def uidsList = uidsStr.split(',').collect { it.trim() }.findAll { it }

// ==================== 预加载会议类型字典（uid -> name） ====================
def meetingTypeList = callService(
	"app_g94x9xlscj",
	"t_biz_meeting_type_bxdi9cpf_selectMore",
	JsonOutput.toJson([
		page_index: 1,
		page_size : 100,
	])
) ?: []
logger.info("会议类型列表: " + JsonOutput.toJson(meetingTypeList))
def meetingTypeMap = meetingTypeList.collectEntries { [(it.uid): it.name] }
logger.info("会议类型映射: " + JsonOutput.toJson(meetingTypeMap))

// ==================== 预加载全局字典：表决方式 & 审议权限 ====================
def globalDictList = callService(
	"app_g94x9xlscj",
	"t_app_g94x9xlscj_global_dict_s5wzq5os_selectMore",
	JsonOutput.toJson([
		page_index: 1,
		page_size : 1000,
		query_criteria: [
			[column_name: "enable", value: [1], query_type: 0]
		]
	])
) ?: []

def voteMethodMap = [:]
def reviewAuthorityMap = [:]
globalDictList.each { dict ->
	if (dict.type == 'VOTE_METHOD') {
		voteMethodMap[dict.item_code] = dict.item_label
	} else if (dict.type == 'REVIEW_AUTHORITY') {
		reviewAuthorityMap[dict.item_code] = dict.item_label
	}
}
logger.info("表决方式映射: " + JsonOutput.toJson(voteMethodMap))
logger.info("审议权限映射: " + JsonOutput.toJson(reviewAuthorityMap))

// ==================== 查询每一个事项并组装数据 ====================
def result = []
uidsList.each { uid ->
	// 1. 主表
	def item = callService("app_g94x9xlscj", "t_biz_item_list_rpodqfdm_selectOne", [uid: uid])
	if (!item) {
		logger.warn("事项不存在: " + uid)
		return
	}

	// 2. 关联目录（多对多）
	def relList = callService(
		"app_g94x9xlscj",
		"biz_item_category_rel_2cy61esf_selectMore",
		JsonOutput.toJson([
			page_index: 1,
			page_size : 500,
			query_criteria: [
				[column_name: "biz_item_id", value: [uid], query_type: 0]
			]
		])
	) ?: []

	// 收集目录 full_name
	def categories = []
	relList.each { rel ->
		def dir = callService("app_g94x9xlscj", "t_biz_category_directory_whkmphur_selectOne", [uid: rel.category_id])
		if (dir?.full_name) {
			categories.add(dir.full_name)
		}
	}
	categories = categories.unique()

	// 3. 过会信息（多对多）
	def meetingList = callService(
		"app_g94x9xlscj",
		"biz_item_meeting_bmbqsavm_selectMore",
		JsonOutput.toJson([
			page_index: 1,
			page_size : 100,
			query_criteria: [
				[column_name: "t_biz_item_list_id", value: [uid], query_type: 0]
			],
			sort_criteria: [column_name: "sort_order", sort: "asc"]
		])
	) ?: []

	def meetings = meetingList.collect { m ->
		// meeting_type_id 是会议类型表的 uid，通过 map 翻译为中文名称
		def mtName = meetingTypeMap[m.meeting_type_id] ?: m.meeting_type_id
		return [
			meeting_type_name : mtName,
			sort_order        : m.sort_order,
			attendance_ratio  : m.attendance_ratio,
			vote_method       : voteMethodMap[m.vote_method] ?: m.vote_method,
			review_authority  : reviewAuthorityMap[m.review_authority] ?: m.review_authority
		]
	}

	// 4. 组装当前事项完整信息
	def itemData = [
		uid                  : item.uid,
		version              : item.version,
		item_name            : item.item_name,
		is_legal_review      : item.is_legal_review,
		is_board_authorized  : item.is_board_authorized,
		dept_code            : item.dept_code,
		order                : item.order,
		remark               : item.remark,
		categories           : categories,
		meetings             : meetings
	]
	result.add(itemData)
	logger.info("已获取事项: " + item.item_name)
}

logger.info("查询完成，共获取 " + result.size() + " 条事项")
logger.info("详细结果:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(result)))

// 将结果返回（供后续流程使用）
return result
