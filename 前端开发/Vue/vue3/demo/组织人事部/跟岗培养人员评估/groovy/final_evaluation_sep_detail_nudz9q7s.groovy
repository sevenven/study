import groovy.json.JsonOutput

// ==================== 输入参数 ====================
def tFinalEvaluationId = ${__input__.tFinalEvaluationId} // 评估 ID
def groupLeaderUserId = ${__input__.groupLeaderUserId} // 领导用户 ID
def groupMemberUserId = ${__input__.groupMemberUserId} // 成员用户 ID
def executiveDeputyUserId = ${__input__.executiveDeputyUserId} // 主任用户 ID
def externalExpertUserId = ${__input__.externalExpertUserId} // 外部专家用户 ID

logger.info("输入参数：" + JsonOutput.toJson([tFinalEvaluationId, groupLeaderUserId, groupMemberUserId, executiveDeputyUserId, externalExpertUserId]))

// ==================== 本次期望的角色-用户映射 ====================
// 键：角色 code ，值：用户 ID 字符串（如果为空字符串或 null 则视为该角色无成员）
def expectedRoleUser = [
	"group_leader"           : groupLeaderUserId?.toString()?.trim(),
	"group_member"           : groupMemberUserId?.toString()?.trim(),
	"executive_deputy_leader": executiveDeputyUserId?.toString()?.trim(),
	"external_expert"        : externalExpertUserId?.toString()?.trim()
].findAll { it.value != null && it.value != '' }   // 只保留非空用户

// ==================== 1. 查询该评估下已有的所有评分明细 ====================
def existingDetails = callService(
	"app_yqtmuhmhwy",
	"t_final_evaluation_sep_detai_5bi149wk_selectMore",
	JsonOutput.toJson([
		page_index: 1,
		page_size: 500,
		query_criteria: [
			[column_name: "t_final_evaluation_id", value: [tFinalEvaluationId], query_type: 0],
			[column_name: "sys_deleted",    value: [0],                query_type: 0]
		]
	])
) ?: []

// 将现有明细按角色分组，方便比对
def existingByRole = [:] // Map<角色code, List<明细Map>>
existingDetails.each { detail ->
	def role = detail?.sep_evaluation_role_code
	if (role) {
		if (!existingByRole[role]) existingByRole[role] = []
		existingByRole[role] << detail
	}
}
logger.info("existingByRole：" + existingByRole)

// ==================== 2. 同步明细：先删后增 ====================

// 用于日志的辅助变量
def deleteCount = 0
def insertCount = 0

// 遍历本次所有可能出现的角色（包括预期为空的）
def allRoles = ["group_leader", "group_member", "executive_deputy_leader", "external_expert"]

allRoles.each { roleCode ->
	def expectedUserId = expectedRoleUser[roleCode]   // 可能为 null（即该角色无成员）
	def existingList   = existingByRole[roleCode] ?: []

	if (expectedUserId == null) {
		// 该角色本次未传入有效用户 -> 删除该角色下所有已有明细
		existingList.each { detail ->
			def delResult = callService(
				"app_yqtmuhmhwy",
				"t_final_evaluation_sep_detai_5bi149wk_delete",
				[uid: detail.uid]
			)
			deleteCount++
			logger.info("删除角色 " + roleCode + " 明细 (uid: " + detail.uid + ")，用户: " + detail.reviewer_user_id)
		}
	} else {
		// 该角色本次有预期用户 -> 删除该角色下其他用户的明细，保留（或新建）预期用户的明细
		def targetExists = false
		existingList.each { detail ->
			if (detail.reviewer_user_id?.toString()?.trim() == expectedUserId) {
				targetExists = true   // 已存在目标用户明细，不删
			} else {
				// 用户不匹配，删除
				def delResult = callService(
					"app_yqtmuhmhwy",
					"t_final_evaluation_sep_detai_5bi149wk_delete",
					[uid: detail.uid]
				)
				deleteCount++
				logger.info("删除角色 " + roleCode + " 旧用户明细 (uid: " + detail.uid + ")，旧用户: " + detail.reviewer_user_id)
			}
		}

		// 如果不存在目标用户明细，则新增一条
		if (!targetExists) {
			def insertResult = callService(
				"app_yqtmuhmhwy",
				"t_final_evaluation_sep_detai_5bi149wk_insert",
				[
					evaluation_id                    : tFinalEvaluationId,
					sep_evaluation_role_code        : roleCode,
					weight                          : 0.0,
					reviewer_user_id                : expectedUserId,
					final_plan_sep_detail_detail_ids: "[]",
					sep_grades                      : "[]",
					sep_scores                      : "[]",
					sep_comments                    : "[]",
					avg_sep_score                   : 0.0,
					weighted_score                  : 0.0,
					sys_deleted                     : 0
				]
			)
			insertCount++
			logger.info("新增角色 " + roleCode + " 明细，用户: " + expectedUserId + "，结果: " + insertResult)
		} else {
			logger.info("角色 " + roleCode + " 明细已存在（用户: " + expectedUserId + "），无需新增")
		}
	}
}

callService("app_yqtmuhmhwy", "t_final_evaluation_l76l0srb_update", [uid: tFinalEvaluationId, final_evaluation_status_code: 'in_progress'])

logger.info("评分明细同步完成，评估ID: " + tFinalEvaluationId + "，删除 " + deleteCount + " 条，新增 " + insertCount + " 条")