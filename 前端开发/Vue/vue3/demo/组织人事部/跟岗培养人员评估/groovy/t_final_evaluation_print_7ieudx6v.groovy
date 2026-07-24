import groovy.json.JsonOutput

def uids = ${__input__.uids};

List<String> uidList = uids?.split(",")?.toList() ?: []
logger.info("处理的期末评价UID列表: " + uidList)

def resultArray = []

uidList.each { String singleUid ->
	try {
		def evalResult = callService(
			"app_yqtmuhmhwy",
			"t_final_evaluation_o1y48pkw",
			[uid: singleUid]
		)

		logger.info("评价记录: " + evalResult)

		if (evalResult && evalResult.uid) {
			if (evalResult.plan_type_code == "sep_plan") {
				def sepDetails = callService(
					"app_yqtmuhmhwy",
					"t_final_evaluation_sep_detail_2gisw4zy",
					JsonOutput.toJson([
						page_index     : 1,
						page_size      : 1000,
						query_criteria : [
							[column_name: "t_final_evaluation_id", value: [evalResult.uid], query_type: 0],
							[column_name: "sys_deleted", value: [0], query_type: 0]
						]
					])
				) ?: []
				 
				def eventList = callService(
					"app_yqtmuhmhwy",
					"t_final_plan_sep_detail_99d7f0ud_selectMore",
					JsonOutput.toJson([
						page_index: 1,
						page_size: 100,
						query_criteria : [
							[column_name: "t_final_plan_id", value: [evalResult.sep_plan_id], query_type: 0],
							[column_name: "sys_deleted", value: [0], query_type: 0]
						]
					])
				)

				logger.info("事件列表: " + eventList)

				evalResult.sepEvents = eventList
				evalResult.details = sepDetails
				resultArray.add(evalResult)
			} else {
				logger.warn("评价记录 " + singleUid + " 非标志性事件计划，暂不打印")
			}
		} else {
			logger.warn("未找到UID " + singleUid + " 对应的期末评价记录")
		}
	} catch (Exception e) {
		logger.error("处理UID " + singleUid + " 时发生错误: " + e.getMessage())
	}
}

return resultArray
