import groovy.json.JsonOutput

// 从输入获取计划ID（假设前端传入 planId）
def planId = ${__input__.planId}

if (!planId) {
  logger.error("缺少必要参数 planId")
  return
}

//查询组织人事部部长id
def queryJson = JsonOutput.toJson([
	page_index: 1,
	page_size: 1000,
	sort_criteria: [create_time: "DESC"],
	query_criteria: [
		[
			column_name: "group_code",
			value: ["zuzhirenshibubuzhang"],
			query_type: 0
		]
	],
	data_filters: [],
	permission_filters: []
])
def zzrsbbz = callService("app_yqtmuhmhwy", "get_user_role_group_0z4x3wsm", queryJson)

logger.info(zzrsbbz.toString())
 
// 更新计划hr_director_id
if (zzrsbbz && zzrsbbz.size() > 0 && zzrsbbz[0].employee_id) {
	def updateResult = callService(
		"app_yqtmuhmhwy",
		"t_final_plan_1cwu93rl_update",
		[uid: planId, hr_director_id: zzrsbbz[0].employee_id]
	)
}