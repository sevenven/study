import groovy.json.JsonOutput

// ==================== 输入参数 ====================
def evaluationUids			= ${__input__.evaluationUids}
def groupLeaderUserId		= ${__input__.groupLeaderUserId}
def groupMemberUserId		= ${__input__.groupMemberUserId}
def executiveDeputyUserId	= ${__input__.executiveDeputyUserId}
def externalExpertUserId	= ${__input__.externalExpertUserId}

logger.info("输入参数：" + JsonOutput.toJson([evaluationUids, groupLeaderUserId, groupMemberUserId, executiveDeputyUserId, externalExpertUserId]))

if (!evaluationUids) {
	logger.error("evaluationUids 为空")
	return
}

// 将逗号分隔转为 #@# 分隔的辅助函数---忽略这个 这个是一开始以为人员存储是#@#分隔的 后续发现是逗号分隔的
def convertToHashAtAtHash(String value) {
	if (value == null || value.trim() == '') return ''
	return value.split(',')
				.collect { it.trim() }
				.findAll { it != '' }
				.join(',')
}

def gl = convertToHashAtAtHash(groupLeaderUserId)
def gm = convertToHashAtAtHash(groupMemberUserId)
def ed = convertToHashAtAtHash(executiveDeputyUserId)
def ee = convertToHashAtAtHash(externalExpertUserId)

logger.info("转换后：group_leader_user_id=${gl}, group_member_user_id=${gm}, executive_deputy_user_id=${ed}, external_expert_user_id=${ee}")

def uidList = evaluationUids.split(',').collect { it.trim() }.findAll { it != '' }
logger.info("待更新的评估ID列表：" + uidList)

uidList.each { uid ->
	def updateParams = [
		uid							: uid,
		group_leader_user_id		: gl,
		group_member_user_id		: gm,
		executive_deputy_user_id	: ed,
		external_expert_user_id		: ee
	]

	def result = callService(
		"app_yqtmuhmhwy",
		"t_final_evaluation_l76l0srb_update",
		updateParams
	)
	logger.info("更新评估ID ${uid} 结果: " + result)
}

logger.info("批量更新完成，共处理 ${uidList.size()} 条记录")