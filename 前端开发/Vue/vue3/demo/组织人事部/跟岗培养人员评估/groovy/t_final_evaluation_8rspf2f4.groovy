import groovy.json.JsonOutput

// 1. 查询所有 idp_score 为 null（或空）的测评记录
def evalList = callService(
	"app_yqtmuhmhwy",
	"t_final_evaluation_l76l0srb_selectMore",
	JsonOutput.toJson([
		page_index: 1,
		page_size: 9999,  // 数据量不大，一次性查完
		query_criteria: [
			[column_name: "idp_score", query_type: 13],
			[column_name: "plan_type_code", value: ["idp_plan"], query_type: 0],
		]
	])
)

logger.info("查询所有 idp_score 为空的测评记录结果: " + evalList)

// 遍历处理每条记录
evalList.each { evalRecord ->
	def evalUid = evalRecord.uid
	def posDetail = callService(
		"app_yqtmuhmhwy",
		"t_position_related_detail_azyvlmty_selectMore",
		JsonOutput.toJson([
			page_index: 1,
			page_size: 1,
			query_criteria: [
				[column_name: "name", value: [evalRecord.plan_user_id], query_type: 0],
				[column_name: "annual", value: [evalRecord.plan_year], query_type: 0],  // 直接使用时间戳
			]
		])
	)
	logger.info("查询跟岗人员年度关联信息结果: " + posDetail[0])
	// 3. 更新测评记录：idp_score 和状态
	def updateResult = callService(
		"app_yqtmuhmhwy",
		"t_final_evaluation_l76l0srb_update",
		[
			uid: evalUid,
			idp_score: posDetail[0].final_idp,
			final_evaluation_status_code: posDetail[0].final_idp ? "completed" : "not_started"
		]
	)
	logger.info("更新测评记录 " + evalUid + " 结果: " + updateResult)
}