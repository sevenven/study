import groovy.json.JsonOutput

// ==================== 输入参数 ====================
def tFinalEvaluationId       = ${__input__.tFinalEvaluationId}
def groupLeaderUserId        = ${__input__.groupLeaderUserId}
def groupMemberUserId        = ${__input__.groupMemberUserId}
def executiveDeputyUserId    = ${__input__.executiveDeputyUserId}
def externalExpertUserId     = ${__input__.externalExpertUserId}

logger.info("输入参数：" + JsonOutput.toJson([tFinalEvaluationId, groupLeaderUserId, groupMemberUserId, executiveDeputyUserId, externalExpertUserId]))

// ==================== 本次期望的角色-用户映射 ====================
def expectedRoleUser = [
	"group_leader"           : groupLeaderUserId?.toString()?.trim(),
	"group_member"           : groupMemberUserId?.toString()?.trim(),
	"executive_deputy_leader": executiveDeputyUserId?.toString()?.trim(),
	"external_expert"        : externalExpertUserId?.toString()?.trim()
].findAll { it.value != null && it.value != '' }

// ==================== 1. 查询评估记录，获取 sep_plan_id ====================
def evaluation = callService(
	"app_yqtmuhmhwy",
	"t_final_evaluation_l76l0srb_selectOne",
	[uid: tFinalEvaluationId]
)
def sepPlanId = evaluation?.sep_plan_id
if (!sepPlanId) {
	logger.error("未找到评估记录或 sep_plan_id 为空，评估ID: " + tFinalEvaluationId)
	return
}

// ==================== 2. 查询标志性事件明细 ID 列表 ====================
def sepDetails = callService(
	"app_yqtmuhmhwy",
	"t_final_plan_sep_detail_99d7f0ud_selectMore",
	JsonOutput.toJson([
		page_index  : 1,
		page_size   : 100,
		query_criteria: [
			[column_name: "t_final_plan_id",     value: [sepPlanId], query_type: 0],
			[column_name: "sys_deleted", value: [0],         query_type: 0]
		],
		sort_criteria: [sort: "asc"]
	])
)
def detailIds = sepDetails ? sepDetails.collect { it.uid } : []
// 使用 #@# 拼接，空数组时默认空字符串
def detailIdsStr = detailIds ? detailIds.join("#@#") : ""
logger.info("标志性事件明细ID拼接字符串: " + detailIdsStr)

// ==================== 3. 删除该评估下所有旧的评分明细 ====================
def oldDetails = callService(
	"app_yqtmuhmhwy",
	"t_final_evaluation_sep_detai_5bi149wk_selectMore",
	JsonOutput.toJson([
		page_index  : 1,
		page_size   : 500,
		query_criteria: [
			[column_name: "t_final_evaluation_id", value: [tFinalEvaluationId], query_type: 0],
			[column_name: "sys_deleted",           value: [0],                   query_type: 0]
		]
	])
) ?: []

def deleteCount = 0
oldDetails.each { detail ->
	callService("app_yqtmuhmhwy", "t_final_evaluation_sep_detai_5bi149wk_delete", [uid: detail.uid])
	deleteCount++
	logger.info("删除旧明细 (uid: " + detail.uid + ")，角色: " + detail.sep_evaluation_role_code + "，用户: " + detail.reviewer_user_id)
}
logger.info("共删除 " + deleteCount + " 条旧明细")

// ==================== 4. 插入新的评分明细 ====================
def roleWeightMap = [
	"group_leader"           : 0.6,
	"group_member"           : 0.6,
	"executive_deputy_leader": 0.3,
	"external_expert"        : 0.1
]

def insertCount = 0
expectedRoleUser.each { roleCode, userId ->
	def weight = roleWeightMap[roleCode] ?: 0.0
	def insertResult = callService(
		"app_yqtmuhmhwy",
		"t_final_evaluation_sep_detai_5bi149wk_insert",
		[
			t_final_evaluation_id           : tFinalEvaluationId,
			sep_evaluation_role_code        : roleCode,
			weight                          : weight,
			reviewer_user_id                : userId,
			sep_detail_ids: detailIdsStr,
			sep_grades                      : "",
			sep_scores                      : "",
			sep_comments                    : "",
			avg_sep_score                   : 0.0,
			weighted_score                  : 0.0,
			sys_deleted                     : 0
		]
	)
	insertCount++
	logger.info("新增角色 " + roleCode + " 明细，用户: " + userId + "，权重: " + weight + "，明细IDs: " + detailIdsStr + "，结果: " + insertResult)
}

// 更新评估状态为“进行中”
callService("app_yqtmuhmhwy", "t_final_evaluation_l76l0srb_update", [uid: tFinalEvaluationId, final_evaluation_status_code: 'in_progress'])

logger.info("评分明细重置完成，评估ID: " + tFinalEvaluationId + "，删除 " + deleteCount + " 条，新增 " + insertCount + " 条")