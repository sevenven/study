import groovy.json.JsonOutput

def idCard = ${__input__.idCard}
def cellId = ${__input__.cellId}

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数: " + JsonOutput.toJson(__input__))

// 获取转出到外部组织历史党员信息
def externalTransferredMember = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1, // 只需要检查是否存在党员，不需要获取全部
  "query_criteria": [
    [
      "column_name": 'id_card',
      "value": [idCard],
      "query_type": 0
    ],
		[
      "column_name": 'party_member_source_code',
      "value": ['external_transfer_out'],
      "query_type": 0
    ]
  ]
]))
logger.info("转出到外部组织历史党员信息: " + JsonOutput.toJson(externalTransferredMember))
// 如果找到转出到外部组织的党员信息
if (externalTransferredMember && externalTransferredMember.size() > 0) {
	// 获取转出到外部组织的党员信息
	def member = externalTransferredMember[0]
	logger.info("转出到外部组织的党员信息: " + JsonOutput.toJson(member))
	// 更新旧党组织记录is_current字段
	、
	// 创建一条新的党组织关系转移记录
	def createResult = callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_insert", [
		t_party_members_base_id: member.uid, 
		prev_record_id: member.uid_mth,
		cell_id: cellId,
		is_current: '1',
		party_member_source_code: 'external_transfer',
		is_party_worker: '0'
	])
}