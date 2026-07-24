import groovy.json.JsonOutput

def uids = ${__input__.uids};

// 处理多个UID，将逗号分隔的字符串拆分为列表
List<String> uidList = uids?.split(",")?.toList() ?: []
logger.info("处理的UID列表: " + uidList)

// 初始化结果数组
def resultArray = []

// 遍历每个UID进行处理
uidList.each { String singleUid ->
	try {
		// 1. 查询期末计划主表
		def planResult = callService(
			"app_yqtmuhmhwy",
			"t_final_evaluation_o1y48pkw",
			[uid: singleUid]
		)

		if (planResult && planResult.uid) {
			// 2. 根据计划类型查询对应的明细表
			def planType = planResult.plan_type_code
			if (planType == "sep_plan") {
				// 查询标志性事件明细
				def sepDetails = callService(
					"app_yqtmuhmhwy",
					"t_final_evaluation_sep_detail_2gisw4zy",
					JsonOutput.toJson([
						page_index: 1,
						page_size: 1000,
						query_criteria: [
							[column_name: "t_final_plan_id", value: [planResult.uid], query_type: 0],
							[column_name: "sys_deleted", value: [0], query_type: 0]
						],
						sort_criteria: [sort: "asc"]
					])
				)
				planResult.details = sepDetails ?: []
			} else if (planType == "idp_plan") {
				// 查询IDP明细
				def idpDetails = callService(
					"app_yqtmuhmhwy",
					"t_final_plan_idp_detail_xhftv7p9_selectMore",
					JsonOutput.toJson([
						page_index: 1,
						page_size: 1000,
						query_criteria: [
							[column_name: "t_final_plan_id", value: [planResult.uid], query_type: 0],
							[column_name: "sys_deleted", value: [0], query_type: 0]
						],
						sort_criteria: [sort: "asc"]
					])
				)
				planResult.details = idpDetails ?: []
			} else {
				planResult.details = []
			}

			// 3. 查询签名信息
			def employeeSignature = null
			def mentorSignature = null
			def coachSignature = null
			def hrDirectorSignature = null
			def executiveDeputyApproverSignature = null

			try {
				// 跟岗人员签名 (plan_user_id)
				if (planResult.plan_user_id) {
					def empSigs = callService(
						"app_uxk38fijac",
						"sxqgl_selectMore",
						JsonOutput.toJson([
							page_index: 1,
							page_size: 1,
							query_criteria: [
								[column_name: "signatory", value: [planResult.plan_user_id], query_type: 0]
							],
							sort_criteria: ["create_time": "DESC"]
						])
					)
					employeeSignature = empSigs && empSigs.size() > 0 ? empSigs[0] : null
				}
				// 导师签名 (mentor_id)
				if (planResult.mentor_id) {
					def mentorSigs = callService(
						"app_uxk38fijac",
						"sxqgl_selectMore",
						JsonOutput.toJson([
							page_index: 1,
							page_size: 1,
							query_criteria: [
								[column_name: "signatory", value: [planResult.mentor_id], query_type: 0]
							],
							sort_criteria: ["create_time": "DESC"]
						])
					)
					mentorSignature = mentorSigs && mentorSigs.size() > 0 ? mentorSigs[0] : null
				}
				// 教练签名 (coach_id)
				if (planResult.coach_id) {
					def coachSigs = callService(
						"app_uxk38fijac",
						"sxqgl_selectMore",
						JsonOutput.toJson([
							page_index: 1,
							page_size: 1,
							query_criteria: [
								[column_name: "signatory", value: [planResult.coach_id], query_type: 0]
							],
							sort_criteria: ["create_time": "DESC"]
						])
					)
					coachSignature = coachSigs && coachSigs.size() > 0 ? coachSigs[0] : null
				}
				// 组织人事部部长签名 (hr_director_id)
				if (planResult.hr_director_id) {
					def hrSigs = callService(
						"app_uxk38fijac",
						"sxqgl_selectMore",
						JsonOutput.toJson([
							page_index: 1,
							page_size: 1,
							query_criteria: [
								[column_name: "signatory", value: [planResult.hr_director_id], query_type: 0]
							],
							sort_criteria: ["create_time": "DESC"]
						])
					)
					hrDirectorSignature = hrSigs && hrSigs.size() > 0 ? hrSigs[0] : null
				}
				// 常务副组织流程审批人签名 (executive_deputy_approver_id)
				if (planResult.executive_deputy_approver_id) {
					def edaSigs = callService(
						"app_uxk38fijac",
						"sxqgl_selectMore",
						JsonOutput.toJson([
							page_index: 1,
							page_size: 1,
							query_criteria: [
								[column_name: "signatory", value: [planResult.executive_deputy_approver_id], query_type: 0]
							],
							sort_criteria: ["create_time": "DESC"]
						])
					)
					executiveDeputyApproverSignature = edaSigs && edaSigs.size() > 0 ? edaSigs[0] : null
				}
			} catch (Exception sigEx) {
				logger.error("查询签名失败: " + sigEx.getMessage())
			}

			planResult.signature = [
				"employee": employeeSignature,
				"mentor": mentorSignature,
				"coach": coachSignature,
				"hrDirector": hrDirectorSignature,
				"executiveDeputyApprover": executiveDeputyApproverSignature
			]

			// 添加到结果数组
			resultArray.add(planResult)
		} else {
			logger.warn("未找到UID " + singleUid + " 对应的期末计划信息")
		}
	} catch (Exception e) {
		logger.error("处理UID " + singleUid + " 时发生错误: " + e.getMessage())
	}
}

return resultArray