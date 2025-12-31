import groovy.json.JsonOutput

def userIds = ${__input__.uids}
def cellId = ${__input__.cellId}


// 日志输出参数信息
logger.info("Groovy版本: " + GroovySystem.version + ", 用户ID数组: " + userIds)

// 查询参数构建
def result = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf", JsonOutput.toJson([
  "page_index": 1,
  "page_size": userIds.size(),
  "query_criteria": [
    [
      "column_name_list": null,
      "column_name": "uid",
      "value": userIds,
      "query_type": 3
    ]
  ]
]))

// 遍历查询结果
if (result && result instanceof List) {
  // 遍历每条记录
  result.eachWithIndex { record, index ->
    def idCard = record.id_card?.trim()
		String birthDateStr = null
		def formattedBirthDate = null
		if (idCard) birthDateStr = idCard.length() == 18 ? idCard.substring(6, 14) : (idCard.length() == 15 ? "19" + idCard.substring(6, 12) : null)
		if (birthDateStr) formattedBirthDate = birthDateStr.substring(0, 4) + '-' + birthDateStr.substring(4, 6) + '-' + birthDateStr.substring(6, 8) + ' 00:00:00'
		callService("app_mgt503l5m8", "t_party_members_base_np3jz6v4_update", [
			uid: record.uid,
			// process_status: 'DRAFT',
			birth_date: formattedBirthDate
		])
		// 更新党组织关系转移表
		callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [
			uid: record.uid_mth,
			// is_current: '1',
			// process_status: 'DRAFT',
			// party_member_source_code: 'external_transfer' --- 该数据库默认值
		])
		// 更新党员教育信息
		def educationInfo = callService("app_mgt503l5m8", "t_member_education_info_dtgka1we_selectMore", JsonOutput.toJson([
			"page_index": 1,
			"page_size": 1,
			"query_criteria": [
				[
					"column_name_list": null,
					"column_name": "t_party_members_base_id",
					"value": [record.uid],
					"query_type": 0
				]
			]
		]))
		// logger.info("educationInfo: " + educationInfo)
		if (educationInfo && educationInfo[0]?.uid) {
			callService("app_mgt503l5m8", "t_member_education_info_dtgka1we_update", [
				uid: educationInfo[0].uid,
				// process_status: 'DRAFT',
				is_highest_education: '1' // 改数据库默认值是
			])
		}
  }
} else {
  logger.info("查询结果为空或格式不符合预期")
}